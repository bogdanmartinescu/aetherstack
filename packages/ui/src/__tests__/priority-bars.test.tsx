import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { PriorityBars } from "../components/priority-bars"

describe("PriorityBars", () => {
  it("speaks the priority and fills that many bars", () => {
    const { rerender } = render(<PriorityBars priority="low" />)
    const img = screen.getByRole("img", { name: "Low priority" })
    expect(img.querySelectorAll('[data-filled="true"]')).toHaveLength(1)
    rerender(<PriorityBars priority="high" />)
    expect(screen.getByRole("img", { name: "High priority" }).querySelectorAll('[data-filled="true"]')).toHaveLength(3)
  })

  it("uses an urgent mark instead of bars", () => {
    render(<PriorityBars priority="urgent" />)
    const img = screen.getByRole("img", { name: "Urgent priority" })
    expect(img.querySelectorAll('[data-filled="true"]')).toHaveLength(0)
    expect(img).toHaveAttribute("data-urgent", "true")
  })

  it("is decorative when asked, with no image role", () => {
    render(<PriorityBars priority="medium" decorative />)
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })
})