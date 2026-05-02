import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import {
  fetchRegistry,
  fetchRegistryItem,
  resolveItem,
  formatItemType,
} from "../registry"

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

const ITEM = MANIFEST.items[0]

function jsonResponse(data: unknown, init: ResponseInit = {}): Response {
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
    ...init,
  })
}

function notFound(): Response {
  return new Response("not found", { status: 404, statusText: "Not Found" })
}

beforeEach(() => {
  vi.stubGlobal("fetch", vi.fn())
})

afterEach(() => {
  vi.unstubAllGlobals()
  vi.restoreAllMocks()
})

describe("fetchRegistry", () => {
  it("fetches and validates a manifest", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse(MANIFEST))

    const registry = await fetchRegistry(BASE)
    expect(registry.items).toHaveLength(1)
    expect(registry.items[0]?.name).toBe("button")

    const calledUrl = vi.mocked(fetch).mock.calls[0]?.[0]
    expect(calledUrl).toBe(`${BASE}/r/registry.json`)
  })

  it("strips trailing slash from base URL when constructing manifest URL", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse(MANIFEST))

    await fetchRegistry(`${BASE}/`)
    const calledUrl = vi.mocked(fetch).mock.calls[0]?.[0]
    expect(calledUrl).toBe(`${BASE}/r/registry.json`)
  })

  it("throws when registry is unreachable", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("ECONNREFUSED"))

    await expect(fetchRegistry(BASE)).rejects.toThrow(/Could not reach registry/)
  })

  it("throws on non-200 response", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(
      new Response("err", { status: 500, statusText: "Internal Server Error" }),
    )

    await expect(fetchRegistry(BASE)).rejects.toThrow(/500 Internal Server Error/)
  })

  it("throws when manifest fails schema validation", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ items: "nope" }))

    await expect(fetchRegistry(BASE)).rejects.toThrow(/invalid/)
  })
})

describe("fetchRegistryItem", () => {
  it("fetches a single item from the per-item endpoint", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse(ITEM))

    const item = await fetchRegistryItem(BASE, "button")
    expect(item?.name).toBe("button")

    const calledUrl = vi.mocked(fetch).mock.calls[0]?.[0]
    expect(calledUrl).toBe(`${BASE}/r/button.json`)
  })

  it("returns null when item endpoint 404s", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(notFound())

    const item = await fetchRegistryItem(BASE, "missing")
    expect(item).toBeNull()
  })

  it("returns null on validation failure", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse({ broken: true }))

    const item = await fetchRegistryItem(BASE, "broken")
    expect(item).toBeNull()
  })

  it("returns null on network error (no throw)", async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error("network"))

    const item = await fetchRegistryItem(BASE, "button")
    expect(item).toBeNull()
  })
})

describe("resolveItem", () => {
  it("uses per-item endpoint when available", async () => {
    vi.mocked(fetch).mockResolvedValueOnce(jsonResponse(ITEM))

    const item = await resolveItem(BASE, "button")
    expect(item?.name).toBe("button")
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(1)
  })

  it("falls back to aggregate manifest when per-item is missing", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(notFound())
      .mockResolvedValueOnce(jsonResponse(MANIFEST))

    const item = await resolveItem(BASE, "button")
    expect(item?.name).toBe("button")
    expect(vi.mocked(fetch)).toHaveBeenCalledTimes(2)
  })

  it("returns null when item is in neither endpoint", async () => {
    vi.mocked(fetch)
      .mockResolvedValueOnce(notFound())
      .mockResolvedValueOnce(jsonResponse(MANIFEST))

    const item = await resolveItem(BASE, "missing")
    expect(item).toBeNull()
  })
})

describe("formatItemType", () => {
  it("strips the registry: prefix", () => {
    expect(formatItemType("registry:ui")).toBe("ui")
    expect(formatItemType("registry:pattern")).toBe("pattern")
    expect(formatItemType("registry:block")).toBe("block")
  })
})
