import {
  mkdtempSync,
  rmSync,
  writeFileSync,
  mkdirSync,
  copyFileSync,
  existsSync,
  readFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { resolve } from "node:path"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { clearRegistryCache, loadRegistry } from "../registry"

const VALID = {
  name: "aether-ui",
  homepage: "https://aether-ui.dev",
  version: "0.0.1",
  items: [
    {
      name: "button",
      type: "registry:ui",
      title: "Button",
      author: "aetherstack",
      files: [{ path: "button.tsx", type: "registry:ui", target: "ui/button.tsx" }],
    },
  ],
}

let tmp: string
const ORIGINAL_ENV = { ...process.env }

beforeEach(() => {
  clearRegistryCache()
  tmp = mkdtempSync(resolve(tmpdir(), "aether-mcp-reg-"))
  delete process.env["AETHER_REGISTRY_URL"]
  delete process.env["AETHER_REGISTRY_FILE"]
})

afterEach(() => {
  clearRegistryCache()
  rmSync(tmp, { recursive: true, force: true })
  process.env = { ...ORIGINAL_ENV }
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe("loadRegistry", () => {
  it("loads and validates a local registry file", async () => {
    const file = resolve(tmp, "registry.json")
    writeFileSync(file, JSON.stringify(VALID))
    process.env["AETHER_REGISTRY_FILE"] = file

    const registry = await loadRegistry()
    expect(registry.items).toHaveLength(1)
    expect(registry.items[0]?.name).toBe("button")
  })

  it("throws when the registry file is missing", async () => {
    process.env["AETHER_REGISTRY_FILE"] = resolve(tmp, "missing.json")
    await expect(loadRegistry()).rejects.toThrow(/not found/i)
  })

  it("throws when the registry file is invalid JSON", async () => {
    const file = resolve(tmp, "bad.json")
    writeFileSync(file, "{ nope")
    process.env["AETHER_REGISTRY_FILE"] = file
    await expect(loadRegistry()).rejects.toThrow(/Failed to parse/)
  })

  it("throws when the registry fails schema validation", async () => {
    const file = resolve(tmp, "invalid.json")
    writeFileSync(file, JSON.stringify({ items: "nope" }))
    process.env["AETHER_REGISTRY_FILE"] = file
    await expect(loadRegistry()).rejects.toThrow(/Invalid registry format/)
  })

  it("fetches from AETHER_REGISTRY_URL", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(VALID), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      ),
    )
    process.env["AETHER_REGISTRY_URL"] = "https://registry.example.com/r/registry.json"

    const registry = await loadRegistry()
    expect(registry.items[0]?.name).toBe("button")
  })

  it("throws on remote HTTP errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(new Response("err", { status: 404, statusText: "Not Found" })),
    )
    process.env["AETHER_REGISTRY_URL"] = "https://registry.example.com/missing.json"
    await expect(loadRegistry()).rejects.toThrow(/404/)
  })

  it("throws on network failure", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("ECONNREFUSED")))
    process.env["AETHER_REGISTRY_URL"] = "https://registry.example.com/r/registry.json"
    await expect(loadRegistry()).rejects.toThrow(/Failed to reach registry/)
  })

  it("loads the bundled registry when no env overrides are set", async () => {
    const canonical = resolve(__dirname, "../../../../registry/public/registry.json")
    if (!existsSync(canonical)) {
      throw new Error("canonical registry missing — unexpected in this workspace")
    }

    // Point the loader at a temp dist-like layout with a fresh copy.
    const distDir = resolve(tmp, "dist")
    mkdirSync(distDir, { recursive: true })
    copyFileSync(canonical, resolve(distDir, "registry.json"))

    // Simulate running from compiled dist by temporarily rewriting candidates:
    // loadRegistry looks at __dirname/registry.json then ../dist/registry.json.
    // From src/__tests__, the second candidate resolves to packages/mcp-server/dist.
    // Ensure that file exists for this assertion.
    const packageDist = resolve(__dirname, "../../dist")
    mkdirSync(packageDist, { recursive: true })
    copyFileSync(canonical, resolve(packageDist, "registry.json"))

    const registry = await loadRegistry()
    expect(registry.items.length).toBeGreaterThan(0)
    const expected = JSON.parse(readFileSync(canonical, "utf-8")) as { items: unknown[] }
    expect(registry.items.length).toBe(expected.items.length)
  })
})
