/**
 * Verifies generate's registry fetch uses the shared `/r/registry.json` path
 * and Zod validation (via fetchRegistry), not the old bare `/registry.json`.
 */
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { fetchRegistry } from "../lib/registry"

const BASE = "https://registry.example.com"

const MANIFEST = {
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

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn())
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe("generate registry fetch contract (M0-04)", () => {
  it("loads the manifest from /r/registry.json and validates with Zod", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify(MANIFEST), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    )

    const registry = await fetchRegistry(BASE)
    expect(vi.mocked(fetch).mock.calls[0]?.[0]).toBe(`${BASE}/r/registry.json`)
    expect(registry.items[0]?.name).toBe("button")
  })

  it("rejects malformed manifests instead of casting", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response(JSON.stringify({ items: "nope" }), { status: 200 }),
    )

    await expect(fetchRegistry(BASE)).rejects.toThrow(/invalid/)
  })

  it("surfaces network failures", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("ECONNREFUSED"))
    await expect(fetchRegistry(BASE)).rejects.toThrow(/Could not reach registry/)
  })
})
