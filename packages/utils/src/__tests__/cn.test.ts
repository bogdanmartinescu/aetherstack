import { describe, it, expect } from "vitest"
import { cn } from "../cn"

describe("cn", () => {
  it("returns empty string for no arguments", () => {
    expect(cn()).toBe("")
  })

  it("returns a single class unchanged", () => {
    expect(cn("flex")).toBe("flex")
  })

  it("merges multiple classes", () => {
    expect(cn("flex", "items-center")).toBe("flex items-center")
  })

  it("ignores falsy values", () => {
    expect(cn("flex", false, null, undefined, "gap-4")).toBe("flex gap-4")
  })

  it("includes conditional classes when condition is true", () => {
    const isActive = true
    expect(cn("base", isActive && "active")).toBe("base active")
  })

  it("excludes conditional classes when condition is false", () => {
    const isActive = false
    expect(cn("base", isActive && "active")).toBe("base")
  })

  it("merges conflicting Tailwind classes, last one wins", () => {
    expect(cn("px-4", "px-2")).toBe("px-2")
  })

  it("merges conflicting padding classes correctly", () => {
    expect(cn("p-4", "pt-2")).toBe("p-4 pt-2")
  })

  it("handles array syntax from clsx", () => {
    expect(cn(["flex", "items-center"], "gap-4")).toBe("flex items-center gap-4")
  })

  it("handles object syntax from clsx", () => {
    expect(cn({ flex: true, hidden: false })).toBe("flex")
  })

  it("deduplicates identical classes via tailwind-merge", () => {
    expect(cn("text-sm", "text-sm")).toBe("text-sm")
  })

  it("handles complex conflicting Tailwind utilities", () => {
    const result = cn("bg-red-500 text-white", "bg-blue-500")
    expect(result).toBe("text-white bg-blue-500")
  })
})
