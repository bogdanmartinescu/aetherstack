#!/usr/bin/env node
/**
 * M0-07: Pack publishable artifacts and prove they install/build in isolated
 * Next.js and Vite fixtures. Also smoke-tests `aether-ui add` against a local
 * registry static server.
 *
 * Usage (from repo root):
 *   pnpm --filter @aetherstack/scripts consumer-install
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { execFileSync, spawn, type ChildProcess } from "node:child_process"
import {
  assertEngines,
  collectWorkspaceVersions,
  packPublishable,
  type PackedArtifact,
} from "./lib/pack-publishable"

const REPO_ROOT = resolve(__dirname, "../../..")
const FIXTURES_DIR = join(REPO_ROOT, "tooling/fixtures")
const REGISTRY_DIR = join(REPO_ROOT, "apps/registry-public/public/r")

const PACKAGES_TO_PACK = ["utils", "ui", "cli"] as const

function log(message: string): void {
  process.stdout.write(`${message}\n`)
}

function run(command: string, args: string[], cwd: string, env?: NodeJS.ProcessEnv): void {
  log(`$ ${command} ${args.join(" ")}  (cwd=${cwd})`)
  execFileSync(command, args, {
    cwd,
    stdio: "inherit",
    env: { ...process.env, ...env },
  })
}

function buildPackages(): void {
  run("pnpm", ["--filter", "@aetherstack/utils", "build"], REPO_ROOT)
  run("pnpm", ["--filter", "@aetherstack/ui", "build"], REPO_ROOT)
  run("pnpm", ["--filter", "@aetherstack/cli", "build"], REPO_ROOT)
  run("pnpm", ["--filter", "@aetherstack/scripts", "build-registry"], REPO_ROOT)
}

function packArtifacts(outDir: string): PackedArtifact[] {
  const versions = collectWorkspaceVersions(REPO_ROOT)
  mkdirSync(outDir, { recursive: true })
  const packed: PackedArtifact[] = []
  for (const dir of PACKAGES_TO_PACK) {
    packed.push(packPublishable(join(REPO_ROOT, "packages", dir), outDir, versions))
  }
  return packed
}

function assertNoWorkspaceSpecs(tarballDir: string, artifacts: PackedArtifact[]): void {
  for (const artifact of artifacts) {
    const extract = mkdtempSync(join(tmpdir(), "aether-inspect-"))
    try {
      execFileSync("tar", ["-xzf", artifact.tarball, "-C", extract], { stdio: "pipe" })
      const pkg = JSON.parse(readFileSync(join(extract, "package/package.json"), "utf-8")) as {
        main?: string
        dependencies?: Record<string, string>
        publishConfig?: unknown
      }
      if (pkg.publishConfig) {
        throw new Error(`${artifact.name}: packed package.json still has publishConfig`)
      }
      if (pkg.main?.endsWith(".ts")) {
        throw new Error(`${artifact.name}: packed main still points at TypeScript source (${pkg.main})`)
      }
      for (const [name, spec] of Object.entries(pkg.dependencies ?? {})) {
        if (spec.startsWith("workspace:")) {
          throw new Error(`${artifact.name}: packed dependency ${name} is still ${spec}`)
        }
      }
      log(`✓ ${artifact.name}@${artifact.version} publish-ready (${artifact.tarball})`)
    } finally {
      rmSync(extract, { recursive: true, force: true })
    }
  }
  void tarballDir
}

function installFixture(
  fixtureName: "next-app" | "vite-app",
  workRoot: string,
  artifacts: PackedArtifact[],
): string {
  const template = join(FIXTURES_DIR, fixtureName)
  const dest = join(workRoot, fixtureName)
  cpSync(template, dest, { recursive: true })

  const utils = artifacts.find((a) => a.name === "@aetherstack/utils")
  const ui = artifacts.find((a) => a.name === "@aetherstack/ui")
  if (!utils || !ui) throw new Error("Missing packed utils/ui artifacts")

  // Use npm for fixture installs so local pnpm 10+/12 "ignored builds" policies
  // (e.g. esbuild) cannot block CI-equivalent consumer verification.
  run("npm", ["install", "--no-fund", "--no-audit"], dest)
  run("npm", ["install", "--no-fund", "--no-audit", utils.tarball], dest)
  run("npm", ["install", "--no-fund", "--no-audit", ui.tarball], dest)
  return dest
}

function buildFixture(fixtureDir: string): void {
  run("npm", ["run", "build"], fixtureDir)
  log(`✓ build ok — ${fixtureDir}`)
}

/**
 * Serve registry JSON from a **child process**. A same-process HTTP server cannot
 * answer while `execFileSync` blocks the event loop (CLI fetch would time out).
 */
function startRegistryServer(workRoot: string): { child: ChildProcess; baseUrl: string } {
  if (!existsSync(REGISTRY_DIR)) {
    throw new Error(`Registry output missing at ${REGISTRY_DIR}. Run build-registry first.`)
  }

  const portFile = join(workRoot, "registry-port")
  const script = `
const http = require("http");
const fs = require("fs");
const path = require("path");
const dir = ${JSON.stringify(REGISTRY_DIR)};
const portFile = ${JSON.stringify(portFile)};
const server = http.createServer((req, res) => {
  const url = new URL(req.url || "/", "http://127.0.0.1");
  const match = url.pathname.match(/^\\/r\\/([\\w.-]+\\.json)$/);
  if (!match) { res.statusCode = 404; res.end("not found"); return; }
  const file = path.join(dir, match[1]);
  if (!fs.existsSync(file)) { res.statusCode = 404; res.end("not found"); return; }
  res.setHeader("Content-Type", "application/json");
  res.end(fs.readFileSync(file));
});
server.listen(0, "127.0.0.1", () => {
  const addr = server.address();
  fs.writeFileSync(portFile, String(addr.port));
});
`

  const child = spawn(process.execPath, ["-e", script], {
    stdio: ["ignore", "ignore", "inherit"],
    detached: false,
  })

  const started = Date.now()
  while (Date.now() - started < 10_000) {
    if (existsSync(portFile)) {
      const listenPort = readFileSync(portFile, "utf-8").trim()
      if (/^\d+$/.test(listenPort)) {
        return { child, baseUrl: `http://127.0.0.1:${listenPort}` }
      }
    }
    execFileSync(process.execPath, ["-e", "Atomics.wait(new Int32Array(new SharedArrayBuffer(4)),0,0,50)"])
  }

  child.kill("SIGTERM")
  throw new Error("Registry server did not publish a port file in time")
}

function cliAddSmoke(workRoot: string, artifacts: PackedArtifact[], registryUrl: string): void {
  const cli = artifacts.find((a) => a.name === "@aetherstack/cli")
  if (!cli) throw new Error("Missing packed CLI artifact")

  const project = join(workRoot, "cli-consumer")
  mkdirSync(project, { recursive: true })
  writeFileSync(
    join(project, "package.json"),
    JSON.stringify({ name: "aether-cli-consumer", private: true, version: "0.0.0" }, null, 2) + "\n",
  )
  writeFileSync(
    join(project, "aether.json"),
    JSON.stringify(
      {
        registry: registryUrl,
        aliases: {
          components: "src/components/ui",
          utils: "src/lib",
        },
      },
      null,
      2,
    ) + "\n",
  )

  run("npm", ["install", "--no-fund", "--no-audit", cli.tarball], project)

  // Probe registry before invoking CLI (surfaces server issues clearly).
  execFileSync(
    process.execPath,
    [
      "-e",
      `
      (async () => {
        const r = await fetch(${JSON.stringify(`${registryUrl}/r/button.json`)});
        if (!r.ok) throw new Error("probe status " + r.status);
        const j = await r.json();
        if (j.name !== "button") throw new Error("bad item");
        console.log("registry ok");
      })().catch((e) => { console.error(e); process.exit(1); });
      `,
    ],
    { stdio: "inherit" },
  )

  const cliBin = join(project, "node_modules", "@aetherstack", "cli", "dist", "index.js")
  run(process.execPath, [cliBin, "add", "button", "--registry", registryUrl], project)

  const installed = join(project, "components/ui/button.tsx")
  if (!existsSync(installed)) {
    throw new Error(`CLI add button did not write ${installed}`)
  }
  log(`✓ CLI add button wrote ${installed}`)
}

function main(): void {
  assertEngines()
  log(`Node ${process.version}; repo ${REPO_ROOT}`)

  const workRoot = mkdtempSync(join(tmpdir(), "aether-consumer-"))
  const tarballDir = join(workRoot, "tarballs")
  log(`Work root: ${workRoot}`)

  try {
    buildPackages()
    const artifacts = packArtifacts(tarballDir)
    assertNoWorkspaceSpecs(tarballDir, artifacts)

    const nextDir = installFixture("next-app", workRoot, artifacts)
    buildFixture(nextDir)

    const viteDir = installFixture("vite-app", workRoot, artifacts)
    buildFixture(viteDir)

    const { child, baseUrl } = startRegistryServer(workRoot)
    try {
      cliAddSmoke(workRoot, artifacts, baseUrl)
    } finally {
      child.kill("SIGTERM")
    }

    log("")
    log("M0-07 consumer-install: all checks passed.")
  } finally {
    // Keep artifacts on failure for debugging when KEEP_CONSUMER_WORK=1.
    if (process.env["KEEP_CONSUMER_WORK"] === "1") {
      log(`KEEP_CONSUMER_WORK=1 — left ${workRoot}`)
    } else {
      rmSync(workRoot, { recursive: true, force: true })
    }
  }
}

try {
  main()
} catch (err: unknown) {
  process.stderr.write(`consumer-install failed: ${err instanceof Error ? err.message : String(err)}\n`)
  process.exit(1)
}
