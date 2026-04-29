import { describe, expect, it } from "vitest"
import type { RegistryItem } from "@aetherstack/registry-schema"
import { resolveGenerate } from "../lib/generate"

const ITEMS: RegistryItem[] = [
  { name: "button", type: "registry:ui", title: "Button" },
  { name: "card", type: "registry:ui", title: "Card" },
  { name: "input", type: "registry:ui", title: "Input" },
  { name: "table", type: "registry:ui", title: "Table" },
  { name: "badge", type: "registry:ui", title: "Badge" },
  { name: "dialog", type: "registry:ui", title: "Dialog" },
  { name: "select", type: "registry:ui", title: "Select" },
  { name: "switch", type: "registry:ui", title: "Switch" },
  { name: "textarea", type: "registry:ui", title: "Textarea" },
  { name: "form-field", type: "registry:pattern", title: "Form Field" },
  { name: "metric-card", type: "registry:pattern", title: "Metric Card" },
  { name: "table-toolbar", type: "registry:pattern", title: "Table Toolbar" },
  { name: "page-header", type: "registry:pattern", title: "Page Header" },
  { name: "section-header", type: "registry:pattern", title: "Section Header" },
  { name: "empty-state", type: "registry:pattern", title: "Empty State" },
  { name: "loading-state", type: "registry:pattern", title: "Loading State" },
  { name: "error-state", type: "registry:pattern", title: "Error State" },
  { name: "nav", type: "registry:pattern", title: "Sidebar Nav" },
  { name: "dashboard-shell", type: "registry:block", title: "Dashboard Shell" },
  { name: "login-block", type: "registry:block", title: "Login" },
  { name: "signup-block", type: "registry:block", title: "Sign Up" },
]

describe("resolveGenerate", () => {
  it('resolves "saas dashboard" to dashboard-shell and supporting items', () => {
    const plan = resolveGenerate("build me a SaaS dashboard", ITEMS)
    expect(plan.components).toContain("dashboard-shell")
    expect(plan.components).toContain("metric-card")
    expect(plan.components.length).toBeGreaterThan(3)
    expect(plan.starterCode).toBeDefined()
  })

  it('resolves "login page" to login-block', () => {
    const plan = resolveGenerate("login page", ITEMS)
    expect(plan.components).toContain("login-block")
    expect(plan.starterCode).toBeDefined()
  })

  it('resolves "sign up page" to signup-block', () => {
    const plan = resolveGenerate("sign up page", ITEMS)
    expect(plan.components).toContain("signup-block")
  })

  it('resolves "settings page" to settings components', () => {
    const plan = resolveGenerate("settings page", ITEMS)
    expect(plan.components).toContain("section-header")
    expect(plan.components).toContain("form-field")
  })

  it('resolves "data table" to table + toolbar', () => {
    const plan = resolveGenerate("data table with users", ITEMS)
    expect(plan.components).toContain("table")
    expect(plan.components).toContain("table-toolbar")
  })

  it("only returns items that exist in the items list", () => {
    const plan = resolveGenerate("a dashboard with lots of things", ITEMS)
    const validNames = new Set(ITEMS.map((i) => i.name))
    for (const c of plan.components) {
      expect(validNames.has(c)).toBe(true)
    }
  })

  it("returns empty components with notes for unrecognised descriptions", () => {
    const plan = resolveGenerate("xyzzy completely unknown ui", ITEMS)
    expect(plan.components).toHaveLength(0)
    expect(plan.notes).toMatch(/could not match/i)
  })

  it("falls back to keyword matching for partial descriptions", () => {
    const plan = resolveGenerate("need a confirmation dialog", ITEMS)
    expect(plan.components).toContain("dialog")
  })
})
