/**
 * Pack/install smoke: after a local build, the published-like tarball must
 * include a registry.json whose item count matches the canonical public
 * registry. This catches the stale-bundle failure that shipped as 58/71.
 */
import { execFileSync } from "node:child_process"
import { existsSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { afterAll, beforeAll, describe, expect, it } from "vitest"

const PKG_ROOT = resolve(__dirname, "../..")
const CANONICAL = resolve(PKG_ROOT, "../../registry/public/registry.json")
const DIST_REGISTRY = resolve(PKG_ROOT, "dist/registry.json")

describe("MCP pack smoke (M0-05)", () => {
  beforeAll(() => {
    execFileSync("pnpm", ["exec", "tsup"], {
      cwd: PKG_ROOT,
      stdio: "pipe",
      env: process.env,
    })
  }, 60_000)

  afterAll(() => {
    // leave dist in place for other suite consumers
  })

  it("bundles registry.json with the same item count as the canonical registry", () => {
    expect(existsSync(CANONICAL)).toBe(true)
    expect(existsSync(DIST_REGISTRY)).toBe(true)

    const expected = JSON.parse(readFileSync(CANONICAL, "utf-8")) as { items: unknown[] }
    const bundled = JSON.parse(readFileSync(DIST_REGISTRY, "utf-8")) as { items: unknown[] }

    expect(bundled.items.length).toBe(expected.items.length)
    expect(bundled.items.length).toBeGreaterThan(100)
  })

  it("npm pack includes dist/registry.json and reports matching item count", () => {
    const packDir = mkdtempSync(resolve(tmpdir(), "aether-mcp-pack-"))
    try {
      const output = execFileSync("npm", ["pack", "--pack-destination", packDir, "--json"], {
        cwd: PKG_ROOT,
        encoding: "utf-8",
        env: { ...process.env, npm_config_ignore_scripts: "true" },
      })
      const parsed = JSON.parse(output) as Array<{ filename: string }>
      const tarball = resolve(packDir, parsed[0]!.filename)

      execFileSync("tar", ["-xzf", tarball, "-C", packDir], { stdio: "pipe" })
      const packedRegistry = resolve(packDir, "package/dist/registry.json")
      expect(existsSync(packedRegistry)).toBe(true)

      const expected = JSON.parse(readFileSync(CANONICAL, "utf-8")) as { items: unknown[] }
      const packed = JSON.parse(readFileSync(packedRegistry, "utf-8")) as { items: unknown[] }
      expect(packed.items.length).toBe(expected.items.length)

      // Touch a marker so failures are easier to debug in CI logs.
      writeFileSync(
        resolve(packDir, "smoke-result.json"),
        JSON.stringify({ items: packed.items.length }, null, 2),
      )
    } finally {
      rmSync(packDir, { recursive: true, force: true })
    }
  }, 60_000)
})
