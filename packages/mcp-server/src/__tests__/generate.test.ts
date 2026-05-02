import { describe, expect, it } from "vitest"
import type { Registry } from "@aetherstack/registry-schema"
import { resolveGenerate } from "../generate"

const MOCK_REGISTRY: Registry = {
  name: "aether-ui",
  homepage: "https://aether-ui.dev",
  version: "0.0.1",
  items: [
    { name: "button", type: "registry:ui", title: "Button" },
    { name: "card", type: "registry:ui", title: "Card" },
    { name: "input", type: "registry:ui", title: "Input" },
    { name: "table", type: "registry:ui", title: "Table" },
    { name: "badge", type: "registry:ui", title: "Badge" },
    { name: "form-field", type: "registry:pattern", title: "Form Field" },
    { name: "metric-card", type: "registry:pattern", title: "Metric Card" },
    { name: "table-toolbar", type: "registry:pattern", title: "Table Toolbar" },
    { name: "page-header", type: "registry:pattern", title: "Page Header" },
    { name: "section-header", type: "registry:pattern", title: "Section Header" },
    { name: "empty-state", type: "registry:pattern", title: "Empty State" },
    { name: "loading-state", type: "registry:pattern", title: "Loading State" },
    { name: "error-state", type: "registry:pattern", title: "Error State" },
    { name: "nav", type: "registry:pattern", title: "Sidebar Nav" },
    {
      name: "dashboard-shell",
      type: "registry:block",
      title: "Dashboard Shell",
      ai: { prompts: ["build me a SaaS dashboard", "add a dashboard layout"] },
    },
    { name: "login-block", type: "registry:block", title: "Login" },
    { name: "signup-block", type: "registry:block", title: "Sign Up" },
  ],
}

describe("resolveGenerate — canonical recipes", () => {
  it('resolves "saas dashboard" to dashboard-shell + supporting items', () => {
    const plan = resolveGenerate("build me a SaaS dashboard", MOCK_REGISTRY)
    expect(plan.components).toContain("dashboard-shell")
    expect(plan.components).toContain("metric-card")
    expect(plan.components).toContain("table")
    expect(plan.starterCode).toBeDefined()
  })

  it('resolves "admin dashboard" to the dashboard recipe', () => {
    const plan = resolveGenerate("create an admin dashboard", MOCK_REGISTRY)
    expect(plan.components).toContain("dashboard-shell")
  })

  it('resolves "login page" to login-block', () => {
    const plan = resolveGenerate("add a login page", MOCK_REGISTRY)
    expect(plan.components).toContain("login-block")
    expect(plan.starterCode).toBeDefined()
  })

  it('resolves "sign up page" to signup-block', () => {
    const plan = resolveGenerate("sign up page", MOCK_REGISTRY)
    expect(plan.components).toContain("signup-block")
  })

  it('resolves "settings page" to settings components', () => {
    const plan = resolveGenerate("settings page", MOCK_REGISTRY)
    expect(plan.components).toContain("section-header")
    expect(plan.components).toContain("form-field")
    expect(plan.components).toContain("button")
  })

  it('resolves "data table" to table + toolbar', () => {
    const plan = resolveGenerate("data table", MOCK_REGISTRY)
    expect(plan.components).toContain("table")
    expect(plan.components).toContain("table-toolbar")
  })
})

describe("resolveGenerate — keyword fallback", () => {
  it("resolves a description with a button keyword", () => {
    const plan = resolveGenerate("I need a submit button", MOCK_REGISTRY)
    expect(plan.components).toContain("button")
  })

  it("resolves a description with a modal keyword", () => {
    const plan = resolveGenerate("add a confirmation modal", MOCK_REGISTRY)
    // dialog is not in MOCK_REGISTRY so it shouldn't appear
    expect(plan.components.every((c) => MOCK_REGISTRY.items.map((i) => i.name).includes(c))).toBe(true)
  })

  it("resolves a metric keyword to metric-card", () => {
    const plan = resolveGenerate("show some KPI numbers", MOCK_REGISTRY)
    expect(plan.components).toContain("metric-card")
  })
})

describe("resolveGenerate — edge cases", () => {
  it("returns an empty plan with a notes message for unrecognised descriptions", () => {
    const plan = resolveGenerate("xyzzy completely unknown thing", MOCK_REGISTRY)
    expect(plan.components).toHaveLength(0)
    expect(plan.notes).toBeDefined()
  })

  it("only returns items that exist in the registry", () => {
    const plan = resolveGenerate("a button and something imaginary", MOCK_REGISTRY)
    const validNames = new Set(MOCK_REGISTRY.items.map((i) => i.name))
    for (const c of plan.components) {
      expect(validNames.has(c)).toBe(true)
    }
  })
})
