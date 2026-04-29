import { describe, expect, it } from "vitest"
import { buildRegistry, sortRegistryItems } from "../build"
import type { RegistryItem } from "@aetherstack/registry-schema"

const ITEM = (
  name: string,
  type: RegistryItem["type"],
  extras: Partial<RegistryItem> = {},
): RegistryItem => ({
  name,
  type,
  ...extras,
})

describe("buildRegistry", () => {
  it("returns the registry when valid", () => {
    const data = {
      name: "test",
      items: [{ name: "a", type: "registry:ui" }],
    }
    const result = buildRegistry(data)
    expect(result.registry.items).toHaveLength(1)
    expect(result.warnings).toEqual([])
  })

  it("throws on schema validation failures", () => {
    expect(() => buildRegistry({ items: "nope" })).toThrow(
      /Registry validation failed/,
    )
  })

  it("warns about missing registry dependencies (non-strict)", () => {
    const data = {
      name: "test",
      items: [
        { name: "a", type: "registry:ui", registryDependencies: ["missing"] },
      ],
    }
    const result = buildRegistry(data)
    expect(result.warnings).toHaveLength(1)
    expect(result.warnings[0]).toContain("Missing registry dependencies")
    expect(result.warnings[0]).toContain("a → missing")
  })

  it("throws on missing dependencies in strict mode", () => {
    const data = {
      name: "test",
      items: [
        { name: "a", type: "registry:ui", registryDependencies: ["missing"] },
      ],
    }
    expect(() => buildRegistry(data, { strict: true })).toThrow(
      /Missing registry dependencies/,
    )
  })

  it("does not warn when all deps resolve", () => {
    const data = {
      name: "test",
      items: [
        { name: "a", type: "registry:ui" },
        { name: "b", type: "registry:ui", registryDependencies: ["a"] },
      ],
    }
    const result = buildRegistry(data)
    expect(result.warnings).toEqual([])
  })
})

describe("sortRegistryItems", () => {
  it("places themes before everything else", () => {
    const sorted = sortRegistryItems([
      ITEM("button", "registry:ui"),
      ITEM("default", "registry:theme"),
    ])
    expect(sorted[0]?.type).toBe("registry:theme")
  })

  it("groups by type then sorts by name", () => {
    const sorted = sortRegistryItems([
      ITEM("zebra", "registry:ui"),
      ITEM("apple", "registry:block"),
      ITEM("banana", "registry:ui"),
    ])
    expect(sorted.map((s) => s.name)).toEqual(["apple", "banana", "zebra"])
  })

  it("sorts alphabetically within the same type", () => {
    const sorted = sortRegistryItems([
      ITEM("c", "registry:ui"),
      ITEM("a", "registry:ui"),
      ITEM("b", "registry:ui"),
    ])
    expect(sorted.map((s) => s.name)).toEqual(["a", "b", "c"])
  })

  it("does not mutate the input array", () => {
    const items = [ITEM("z", "registry:ui"), ITEM("a", "registry:ui")]
    const original = items.map((i) => i.name)
    sortRegistryItems(items)
    expect(items.map((i) => i.name)).toEqual(original)
  })
})
