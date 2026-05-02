import { describe, expect, it } from "vitest"
import {
  validateRegistry,
  validateRegistryItem,
  findMissingDependencies,
} from "../validate"
import type { Registry } from "@aetherstack/registry-schema"

const VALID_ITEM = {
  name: "button",
  type: "registry:ui" as const,
  title: "Button",
  files: [{ path: "button.tsx", type: "registry:ui" as const }],
}

const VALID_REGISTRY: Registry = {
  name: "aether-ui",
  homepage: "https://aether-ui.dev",
  version: "0.0.1",
  items: [VALID_ITEM],
}

describe("validateRegistry", () => {
  it("returns valid for a well-formed manifest", () => {
    const result = validateRegistry(VALID_REGISTRY)
    expect(result.valid).toBe(true)
    expect(result.errors).toEqual([])
  })

  it("returns errors for malformed manifests", () => {
    const result = validateRegistry({ items: "nope" })
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
    expect(result.errors[0]).toContain("[")
  })

  it("includes the failed path in error messages", () => {
    const result = validateRegistry({
      name: "x",
      items: [{ name: "ok", type: "registry:ui" }, { name: "" }],
    })
    expect(result.valid).toBe(false)
    expect(result.errors.some((e) => e.includes("items"))).toBe(true)
  })

  it("rejects when name is missing", () => {
    const result = validateRegistry({ items: [] })
    expect(result.valid).toBe(false)
  })
})

describe("validateRegistryItem", () => {
  it("returns valid for a well-formed item", () => {
    expect(validateRegistryItem(VALID_ITEM).valid).toBe(true)
  })

  it("returns errors for malformed items", () => {
    const result = validateRegistryItem({ name: "x", type: "registry:bogus" })
    expect(result.valid).toBe(false)
    expect(result.errors.length).toBeGreaterThan(0)
  })
})

describe("findMissingDependencies", () => {
  it("returns no missing deps when every reference resolves", () => {
    const reg: Registry = {
      name: "test",
      items: [
        { name: "a", type: "registry:ui" },
        { name: "b", type: "registry:ui", registryDependencies: ["a"] },
      ],
    }
    expect(findMissingDependencies(reg)).toEqual([])
  })

  it("returns each missing reference", () => {
    const reg: Registry = {
      name: "test",
      items: [
        { name: "a", type: "registry:ui", registryDependencies: ["nope"] },
        { name: "b", type: "registry:ui", registryDependencies: ["also-nope"] },
      ],
    }
    const missing = findMissingDependencies(reg)
    expect(missing).toContain("a → nope")
    expect(missing).toContain("b → also-nope")
    expect(missing).toHaveLength(2)
  })

  it("ignores items with no registryDependencies", () => {
    const reg: Registry = {
      name: "test",
      items: [{ name: "a", type: "registry:ui" }],
    }
    expect(findMissingDependencies(reg)).toEqual([])
  })

  it("does not report self-references when the name exists", () => {
    const reg: Registry = {
      name: "test",
      items: [
        { name: "a", type: "registry:ui", registryDependencies: ["a"] },
      ],
    }
    expect(findMissingDependencies(reg)).toEqual([])
  })
})
