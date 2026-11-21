#!/usr/bin/env node
/**
 * Inspects every publishable workspace package as an actual pnpm tarball.
 * --offline: safe for PR verification, with no npm credentials or registry access.
 * --online: additionally enforces release-version monotonicity against npm
 *           before an explicitly approved Changesets publish.
 *
 * This script never publishes or changes a package version.
 */
import assert from "node:assert/strict"
import { execFileSync } from "node:child_process"
import { mkdtempSync, readFileSync, readdirSync, rmSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"

const root = resolve(import.meta.dirname, "..")
const packages = join(root, "packages")
const online = process.argv.includes("--online")
assert.ok(online || process.argv.includes("--offline"), "Pass --offline or --online explicitly")
assert.ok(!(online && process.argv.includes("--offline")), "Select exactly one preflight mode")

const parseVersion = (version) => {
  assert.match(version, /^\d+\.\d+\.\d+$/, `Expected a stable semver version: ${version}`)
  return version.split(".").map(Number)
}

function compareVersion(left, right) {
  const a = parseVersion(left)
  const b = parseVersion(right)
  for (let index = 0; index < 3; index++) {
    if (a[index] !== b[index]) return a[index] > b[index] ? 1 : -1
  }
  return 0
}

async function publishedVersion(name) {
  const url = `https://registry.npmjs.org/${encodeURIComponent(name)}/latest`
  const response = await fetch(url, { signal: AbortSignal.timeout(15_000) })
  if (response.status === 404) return null
  assert.equal(response.status, 200, `npm registry request for ${name} returned HTTP ${response.status}`)
  const metadata = await response.json()
  assert.equal(metadata.name, name, `npm returned unexpected package for ${name}`)
  assert.equal(typeof metadata.version, "string")
  return metadata.version
}

const publicPackages = readdirSync(packages, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => {
    const directory = join(packages, entry.name)
    const manifest = JSON.parse(readFileSync(join(directory, "package.json"), "utf8"))
    return { directory, manifest }
  })
  .filter(({ manifest }) => !manifest.private)
  .sort((a, b) => a.manifest.name.localeCompare(b.manifest.name))

assert.ok(publicPackages.length >= 9, "Publishable package inventory unexpectedly small")
const candidateNames = new Set()
const temp = mkdtempSync(join(tmpdir(), "aetherstack-npm-preflight-"))

try {
  for (const { directory, manifest } of publicPackages) {
    assert.match(manifest.name, /^@aetherstack\/[a-z0-9-]+$/, "Unexpected public npm namespace")
    parseVersion(manifest.version)
    assert.ok(!candidateNames.has(manifest.name), `Duplicate public package ${manifest.name}`)
    candidateNames.add(manifest.name)

    const archiveDir = join(temp, manifest.name.split("/")[1])
    // pnpm pack rewrites workspace:* dependencies to actual publishable versions.
    execFileSync("pnpm", ["pack", "--pack-destination", archiveDir], {
      cwd: directory,
      stdio: "pipe",
      timeout: 60_000,
    })
    const archiveNames = readdirSync(archiveDir).filter((name) => name.endsWith(".tgz"))
    assert.equal(archiveNames.length, 1, `Expected one tarball for ${manifest.name}`)
    const archive = join(archiveDir, archiveNames[0])
    const packed = JSON.parse(
      execFileSync("tar", ["-xOzf", archive, "package/package.json"], {
        encoding: "utf8",
      }),
    )
    assert.equal(packed.name, manifest.name)
    assert.equal(packed.version, manifest.version)

    for (const field of ["dependencies", "optionalDependencies", "peerDependencies"]) {
      for (const [name, version] of Object.entries(packed[field] ?? {})) {
        assert.ok(typeof version === "string" && !version.startsWith("workspace:"),
          `Unresolved workspace dependency in ${manifest.name}: ${field}.${name}`)
      }
    }

    const files = new Set(
      execFileSync("tar", ["-tzf", archive], { encoding: "utf8" })
        .trim()
        .split("\n")
        .map((name) => name.replace(/^package\//, "").replace(/^\.\//, "")),
    )
    const entrypoints = [
      packed.main,
      ...Object.values(packed.bin ?? {}),
      ...Object.values(packed.exports ?? {}).filter((value) => typeof value === "string"),
    ].filter((value) => typeof value === "string" && value.startsWith("./"))

    for (const entrypoint of entrypoints) {
      const normalized = entrypoint.slice(2)
      assert.ok(files.has(normalized),
        `Publishable archive for ${manifest.name} is missing ${entrypoint}`)
    }

    if (online) {
      const remote = await publishedVersion(manifest.name)
      const status = remote === null ? "new" : compareVersion(manifest.version, remote)
      assert.ok(status === "new" || status >= 0,
        `Refusing to publish downgrade: ${manifest.name} local ${manifest.version} < npm ${remote}`)
      if (status === "new" || status > 0) {
        console.log(`PUBLISH ${manifest.name}@${manifest.version} (npm latest: ${remote ?? "not published"})`)
      } else {
        console.log(`SKIP ${manifest.name}@${manifest.version} (already published)`)
      }
    } else {
      console.log(`PACK OK ${manifest.name}@${manifest.version}`)
    }
  }
} finally {
  rmSync(temp, { recursive: true, force: true })
}

console.log(`Validated ${publicPackages.length} publishable package tarballs`)
