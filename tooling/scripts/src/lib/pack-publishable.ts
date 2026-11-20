/**
 * Build publish-ready package.json for consumer installs.
 *
 * `npm pack` does NOT apply `publishConfig` and leaves `workspace:*` intact.
 * Changeset/`npm publish` does apply publishConfig; this helper mirrors that
 * so packed tarballs behave like published artifacts outside the monorepo.
 */
import {
  copyFileSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { basename, dirname, join, resolve } from "node:path"
import { execFileSync } from "node:child_process"

export interface PackageManifest {
  name: string
  version: string
  main?: string
  module?: string
  types?: string
  exports?: unknown
  files?: string[]
  bin?: Record<string, string> | string
  dependencies?: Record<string, string>
  peerDependencies?: Record<string, string>
  devDependencies?: Record<string, string>
  publishConfig?: Record<string, unknown>
  [key: string]: unknown
}

export interface PackedArtifact {
  name: string
  version: string
  tarball: string
}

const WORKSPACE_SPEC = /^workspace:/

/** Merge publishConfig onto the root fields and drop workspace-only metadata. */
export function toPublishManifest(
  pkg: PackageManifest,
  workspaceVersions: Map<string, string>,
): PackageManifest {
  const publishConfig = { ...(pkg.publishConfig ?? {}) }
  const next: PackageManifest = {
    ...pkg,
    ...publishConfig,
    name: pkg.name,
    version: pkg.version,
  }
  delete next.publishConfig
  delete next.devDependencies
  delete next.scripts
  delete next.private

  if (next.dependencies) {
    const rewritten: Record<string, string> = {}
    for (const [dep, spec] of Object.entries(next.dependencies)) {
      if (WORKSPACE_SPEC.test(spec)) {
        const version = workspaceVersions.get(dep)
        if (!version) {
          throw new Error(
            `${pkg.name} depends on ${dep} via workspace:*, but no version map entry exists.`,
          )
        }
        rewritten[dep] = version
      } else {
        rewritten[dep] = spec
      }
    }
    next.dependencies = rewritten
  }

  return next
}

function readManifest(packageDir: string): PackageManifest {
  return JSON.parse(readFileSync(join(packageDir, "package.json"), "utf-8")) as PackageManifest
}

/** Collect name→version for every package under packages/. */
export function collectWorkspaceVersions(repoRoot: string): Map<string, string> {
  const packagesDir = join(repoRoot, "packages")
  const map = new Map<string, string>()
  for (const entry of readdirSync(packagesDir)) {
    const manifestPath = join(packagesDir, entry, "package.json")
    if (!existsSync(manifestPath)) continue
    const pkg = JSON.parse(readFileSync(manifestPath, "utf-8")) as PackageManifest
    map.set(pkg.name, pkg.version)
  }
  return map
}

/**
 * Pack a package directory into `outDir` with a publish-ready package.json.
 * Returns the absolute path to the `.tgz`.
 */
export function packPublishable(
  packageDir: string,
  outDir: string,
  workspaceVersions: Map<string, string>,
): PackedArtifact {
  const absolutePkg = resolve(packageDir)
  const pkg = readManifest(absolutePkg)
  const publishManifest = toPublishManifest(pkg, workspaceVersions)

  mkdirSync(outDir, { recursive: true })
  const staging = mkdtempSync(join(tmpdir(), `aether-pack-${basename(absolutePkg)}-`))

  try {
    writeFileSync(join(staging, "package.json"), JSON.stringify(publishManifest, null, 2) + "\n")

    const files = pkg.files ?? ["dist"]
    for (const entry of files) {
      const src = join(absolutePkg, entry)
      if (!existsSync(src)) {
        throw new Error(`Cannot pack ${pkg.name}: missing files entry "${entry}" at ${src}`)
      }
      const dest = join(staging, entry)
      cpSync(src, dest, { recursive: true })
    }

    // Optional docs that npm pack usually includes when present.
    for (const extra of ["README.md", "CHANGELOG.md", "LICENSE"]) {
      const src = join(absolutePkg, extra)
      if (existsSync(src) && !existsSync(join(staging, extra))) {
        copyFileSync(src, join(staging, extra))
      }
    }

    const output = execFileSync("npm", ["pack", "--pack-destination", outDir], {
      cwd: staging,
      encoding: "utf-8",
      env: { ...process.env, npm_config_ignore_scripts: "true" },
    }).trim()

    const filename = output.split("\n").filter(Boolean).at(-1)
    if (!filename) {
      throw new Error(`npm pack produced no tarball for ${pkg.name}`)
    }

    return {
      name: pkg.name,
      version: pkg.version,
      tarball: resolve(outDir, filename),
    }
  } finally {
    rmSync(staging, { recursive: true, force: true })
  }
}

export function assertEngines(): void {
  const major = Number(process.versions.node.split(".")[0])
  if (!Number.isFinite(major) || major < 20) {
    throw new Error(`Node >= 20 required (found ${process.version}).`)
  }
}
