import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { FloatingDock } from "../components/floating-dock"

describe("FloatingDock", () => {
  it("pins to the bottom-right of the viewport by default", () => {
    render(
      <FloatingDock>
        <p>Call</p>
      </FloatingDock>,
    )
    const dock = screen.getByRole("region", { name: "Dock" })
    expect(dock).toHaveAttribute("data-corner", "bottom-right")
    expect(dock).toHaveClass("fixed")
    expect(screen.getByText("Call")).toBeInTheDocument()
  })

  it("anchors inside a parent when contained", () => {
    render(
      <FloatingDock corner="top-left" contained label="Player">
        <p>Track</p>
      </FloatingDock>,
    )
    const dock = screen.getByRole("region", { name: "Player" })
    expect(dock).toHaveAttribute("data-corner", "top-left")
    expect(dock).toHaveClass("absolute")
    expect(dock).not.toHaveClass("fixed")
  })
})
