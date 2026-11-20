#!/usr/bin/env tsx
/**
 * Read-only inventory of what the repository actually ships: source modules
 * per layer, package barrel reachability, registry entries, generated
 * registry artefacts and docs routes. Prints a JSON report to stdout.
 *
 * Run with: pnpm --filter @aetherstack/scripts audit-inventory
 */
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs"
import { join, relative, resolve } from "node:path"

const ROOT = resolve(__dirname, "../../../")

type Layer = "ui" | "patterns" | "blocks"

interface ManifestFile {
  path: string
  target?: string
}

interface ManifestItem {
  name: string
  type: string
  files?: ManifestFile[]
  registryDependencies?: string[]
  ai?: unknown
}

interface Manifest {
  items: ManifestItem[]
}

const LAYERS: Record<Layer, { dir: string; registryType: string; docsDir: string }> = {
  ui: { dir: "packages/ui/src", registryType: "registry:ui", docsDir: "components" },
  patterns: { dir: "packages/patterns/src", registryType: "registry:pattern", docsDir: "patterns" },
  blocks: { dir: "packages/blocks/src", registryType: "registry:block", docsDir: "blocks" },
}

const TARGET_PREFIX: Record<string, string> = {
  "registry:ui": "components/ui/",
  "registry:pattern": "components/patterns/",
  "registry:block": "components/blocks/",
}

function readJson<T>(path: string): T {
  return JSON.parse(readFileSync(resolve(ROOT, path), "utf-8")) as T
}

function listDirs(path: string): string[] {
  const abs = resolve(ROOT, path)
  if (!existsSync(abs)) return []
  return readdirSync(abs)
    .filter((entry) => statSync(join(abs, entry)).isDirectory())
    .sort()
}

/** Component modules under `<src>/components`, as repo-relative paths. */
function listComponentModules(srcDir: string): string[] {
  const out: string[] = []
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir).sort()) {
      const abs = join(dir, entry)
      if (statSync(abs).isDirectory()) {
        walk(abs)
      } else if (entry.endsWith(".tsx")) {
        out.push(relative(ROOT, abs))
      }
    }
  }
  walk(resolve(ROOT, srcDir, "components"))
  return out
}

/** Modules reachable from a barrel through `from "./x"` re-exports. */
function reachableFromBarrel(barrel: string): Set<string> {
  const seen = new Set<string>()
  const visit = (file: string) => {
    if (seen.has(file)) return
    seen.add(file)
    const source = readFileSync(file, "utf-8")
    for (const match of source.matchAll(/from\s+["'](\.{1,2}\/[^"']+)["']/g)) {
      const spec = match[1]
      if (spec === undefined) continue
      const base = resolve(file, "..", spec)
      const candidate = [`${base}.tsx`, `${base}.ts`, join(base, "index.ts")].find((p) =>
        existsSync(p),
      )
      if (candidate) visit(candidate)
    }
  }
  visit(resolve(ROOT, barrel))
  return new Set([...seen].map((abs) => relative(ROOT, abs)))
}

function findCycles(items: ManifestItem[]): string[][] {
  const deps = new Map(items.map((item) => [item.name, item.registryDependencies ?? []]))
  const cycles: string[][] = []
  const state = new Map<string, "visiting" | "done">()
  const stack: string[] = []
  const visit = (name: string) => {
    const current = state.get(name)
    if (current === "done") return
    if (current === "visiting") {
      cycles.push([...stack.slice(stack.indexOf(name)), name])
      return
    }
    state.set(name, "visiting")
    stack.push(name)
    for (const dep of deps.get(name) ?? []) {
      if (deps.has(dep)) visit(dep)
    }
    stack.pop()
    state.set(name, "done")
  }
  for (const name of deps.keys()) visit(name)
  return cycles
}

const manifest = readJson<Manifest>("registry/public/registry.json")
const proManifest = readJson<Manifest>("registry/pro/registry.json")
const items = manifest.items
const names = items.map((item) => item.name)
const nameSet = new Set(names)
const registeredPaths = new Set(items.flatMap((item) => (item.files ?? []).map((f) => f.path)))

const layers = Object.fromEntries(
  (Object.keys(LAYERS) as Layer[]).map((layer) => {
    const { dir, registryType, docsDir } = LAYERS[layer]
    const modules = listComponentModules(dir)
    const reachable = reachableFromBarrel(`${dir}/index.ts`)
    const layerItems = items.filter((item) => item.type === registryType)
    const docsRoutes = listDirs(`apps/docs/src/app/(docs)/${docsDir}`)
    return [
      layer,
      {
        sourceModules: modules.length,
        sourceModulesAi: modules.filter((m) => m.includes("/components/ai/")).length,
        notExportedFromBarrel: modules.filter((m) => !reachable.has(m)),
        registryItems: layerItems.length,
        sourceModulesNotInRegistry: modules.filter((m) => !registeredPaths.has(m)),
        docsRoutes: docsRoutes.length,
        docsRoutesWithoutRegistryItem: docsRoutes.filter((route) => !nameSet.has(route)),
        registryItemsWithoutDocsRoute: layerItems
          .map((item) => item.name)
          .filter((name) => !docsRoutes.includes(name)),
      },
    ]
  }),
)

const generatedDir = "apps/registry-public/public/r"
const generated = existsSync(resolve(ROOT, generatedDir))
  ? readdirSync(resolve(ROOT, generatedDir))
      .filter((f) => f.endsWith(".json") && f !== "registry.json")
      .map((f) => f.replace(/\.json$/, ""))
      .sort()
  : []

const packages = ["packages", "tooling", "apps"].flatMap((group) =>
  listDirs(group).map((dir) => {
    const pkg = readJson<{ name: string; version: string; private?: boolean; license?: string }>(
      `${group}/${dir}/package.json`,
    )
    return {
      path: `${group}/${dir}`,
      name: pkg.name,
      version: pkg.version,
      private: pkg.private === true,
      license: pkg.license ?? null,
    }
  }),
)

const report = {
  generatedFrom: "working tree",
  layers,
  registry: {
    total: items.length,
    byType: items.reduce<Record<string, number>>((acc, item) => {
      acc[item.type] = (acc[item.type] ?? 0) + 1
      return acc
    }, {}),
    proItems: proManifest.items.length,
    duplicateNames: names.filter((name, index) => names.indexOf(name) !== index),
    missingAiMetadata: items.filter((item) => !item.ai).map((item) => item.name),
    missingSourceFiles: items.flatMap((item) =>
      (item.files ?? [])
        .filter((file) => !existsSync(resolve(ROOT, file.path)))
        .map((file) => `${item.name}: ${file.path}`),
    ),
    nonStandardTargets: items.flatMap((item) =>
      (item.files ?? [])
        .filter((file) => !file.target?.startsWith(TARGET_PREFIX[item.type] ?? "\0"))
        .map((file) => `${item.name}: ${file.target ?? "(none)"}`),
    ),
    danglingDependencies: items.flatMap((item) =>
      (item.registryDependencies ?? [])
        .filter((dep) => !nameSet.has(dep))
        .map((dep) => `${item.name} -> ${dep}`),
    ),
    cycles: findCycles(items),
  },
  generatedArtefacts: {
    perItemFiles: generated.length,
    missing: names.filter((name) => !generated.includes(name)),
    stale: generated.filter((name) => !nameSet.has(name)),
  },
  packages,
}

process.stdout.write(JSON.stringify(report, null, 2) + "\n")
