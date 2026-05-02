import { describe, expect, it } from "vitest"
import {
  registryItemSchema,
  registrySchema,
  registryItemTypeSchema,
  registryItemFileSchema,
  registryItemCssVarsSchema,
  registryItemTailwindSchema,
  registryItemAiSchema,
} from "../registry"

const VALID_ITEM = {
  name: "button",
  type: "registry:ui" as const,
  title: "Button",
  description: "A button.",
  author: "aetherstack",
  dependencies: ["class-variance-authority"],
  files: [
    {
      path: "button.tsx",
      type: "registry:ui" as const,
      target: "components/ui/button.tsx",
    },
  ],
}

const VALID_REGISTRY = {
  name: "aether-ui",
  homepage: "https://aether-ui.dev",
  version: "0.0.1",
  items: [VALID_ITEM],
}

describe("registryItemTypeSchema", () => {
  it("accepts every supported item type", () => {
    const types = [
      "registry:ui",
      "registry:block",
      "registry:component",
      "registry:pattern",
      "registry:example",
      "registry:hook",
      "registry:util",
      "registry:page",
      "registry:theme",
    ]
    for (const type of types) {
      expect(registryItemTypeSchema.safeParse(type).success).toBe(true)
    }
  })

  it("rejects unknown item types", () => {
    expect(registryItemTypeSchema.safeParse("registry:unknown").success).toBe(false)
    expect(registryItemTypeSchema.safeParse("ui").success).toBe(false)
  })
})

describe("registryItemFileSchema", () => {
  it("requires path and type", () => {
    expect(
      registryItemFileSchema.safeParse({ path: "x.tsx", type: "registry:ui" })
        .success,
    ).toBe(true)

    expect(registryItemFileSchema.safeParse({ path: "x.tsx" }).success).toBe(false)
    expect(registryItemFileSchema.safeParse({ type: "registry:ui" }).success).toBe(
      false,
    )
  })

  it("accepts optional content and target", () => {
    const parsed = registryItemFileSchema.safeParse({
      path: "x.tsx",
      type: "registry:ui",
      content: "export const X = () => null",
      target: "ui/x.tsx",
    })
    expect(parsed.success).toBe(true)
  })
})

describe("registryItemSchema", () => {
  it("accepts a minimal valid item", () => {
    const result = registryItemSchema.safeParse({
      name: "x",
      type: "registry:ui",
    })
    expect(result.success).toBe(true)
  })

  it("accepts a fully populated valid item", () => {
    expect(registryItemSchema.safeParse(VALID_ITEM).success).toBe(true)
  })

  it("rejects items missing required name", () => {
    const result = registryItemSchema.safeParse({
      type: "registry:ui",
      title: "No name",
    })
    expect(result.success).toBe(false)
  })

  it("rejects empty name strings", () => {
    expect(
      registryItemSchema.safeParse({ name: "", type: "registry:ui" }).success,
    ).toBe(false)
  })

  it("rejects unknown registry item type", () => {
    expect(
      registryItemSchema.safeParse({ name: "x", type: "registry:bogus" }).success,
    ).toBe(false)
  })

  it("accepts the optional pro flag", () => {
    const parsed = registryItemSchema.safeParse({
      name: "x",
      type: "registry:block",
      pro: true,
    })
    expect(parsed.success).toBe(true)
    expect(parsed.success && parsed.data.pro).toBe(true)
  })
})

describe("registrySchema", () => {
  it("accepts a valid manifest", () => {
    const result = registrySchema.safeParse(VALID_REGISTRY)
    expect(result.success).toBe(true)
  })

  it("rejects when items is not an array", () => {
    expect(
      registrySchema.safeParse({ ...VALID_REGISTRY, items: "nope" }).success,
    ).toBe(false)
  })

  it("rejects when name is missing", () => {
    const { name: _name, ...rest } = VALID_REGISTRY
    void _name
    expect(registrySchema.safeParse(rest).success).toBe(false)
  })

  it("rejects when homepage is not a URL", () => {
    expect(
      registrySchema.safeParse({ ...VALID_REGISTRY, homepage: "not-a-url" })
        .success,
    ).toBe(false)
  })

  it("rejects when an item is invalid", () => {
    expect(
      registrySchema.safeParse({
        ...VALID_REGISTRY,
        items: [{ name: "x", type: "registry:bogus" }],
      }).success,
    ).toBe(false)
  })

  it("permits empty items array", () => {
    expect(
      registrySchema.safeParse({ ...VALID_REGISTRY, items: [] }).success,
    ).toBe(true)
  })
})

describe("registryItemCssVarsSchema", () => {
  it("accepts light + dark token records", () => {
    expect(
      registryItemCssVarsSchema.safeParse({
        light: { background: "0 0% 100%" },
        dark: { background: "0 0% 0%" },
      }).success,
    ).toBe(true)
  })

  it("rejects non-string token values", () => {
    expect(
      registryItemCssVarsSchema.safeParse({ light: { background: 123 } }).success,
    ).toBe(false)
  })
})

describe("registryItemTailwindSchema", () => {
  it("accepts a config with content and theme", () => {
    expect(
      registryItemTailwindSchema.safeParse({
        config: {
          content: ["./src/**/*.tsx"],
          theme: { extend: { colors: { brand: "#000" } } },
        },
      }).success,
    ).toBe(true)
  })
})

describe("registryItemAiSchema", () => {
  it("accepts an empty object", () => {
    expect(registryItemAiSchema.safeParse({}).success).toBe(true)
  })

  it("accepts a fully populated ai block", () => {
    expect(
      registryItemAiSchema.safeParse({
        intent: "Display a small inline label",
        prompts: ["add a badge", "show a status pill"],
        composition: ["button", "card"],
        slots: ["children"],
      }).success,
    ).toBe(true)
  })

  it("rejects non-string intent", () => {
    expect(registryItemAiSchema.safeParse({ intent: 42 }).success).toBe(false)
  })

  it("rejects non-array prompts", () => {
    expect(registryItemAiSchema.safeParse({ prompts: "add a badge" }).success).toBe(false)
  })

  it("rejects prompts array with non-string entries", () => {
    expect(registryItemAiSchema.safeParse({ prompts: [1, 2] }).success).toBe(false)
  })

  it("rejects non-array composition", () => {
    expect(registryItemAiSchema.safeParse({ composition: "button" }).success).toBe(false)
  })

  it("rejects non-array slots", () => {
    expect(registryItemAiSchema.safeParse({ slots: "children" }).success).toBe(false)
  })
})

describe("registryItemSchema — ai field", () => {
  it("accepts an item with a full ai block", () => {
    const result = registryItemSchema.safeParse({
      name: "badge",
      type: "registry:ui",
      ai: {
        intent: "Display a small inline label",
        prompts: ["add a badge"],
        composition: ["button"],
        slots: ["children"],
      },
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.ai?.intent).toBe("Display a small inline label")
    }
  })

  it("accepts an item without an ai block (backward-compatible)", () => {
    const result = registryItemSchema.safeParse({
      name: "badge",
      type: "registry:ui",
    })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.ai).toBeUndefined()
    }
  })
})
