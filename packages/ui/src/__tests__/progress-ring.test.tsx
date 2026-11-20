import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { ProgressRing } from "../components/progress"

describe("ProgressRing", () => {
  it("exposes a determinate value", () => {
    render(<ProgressRing value={25} aria-label="Upload" />)
    const bar = screen.getByRole("progressbar", { name: "Upload" })
    expect(bar).toHaveAttribute("aria-valuenow", "25")
    expect(bar).toHaveAttribute("aria-valuemax", "100")
  })

  it("omits the value while indeterminate", () => {
    render(<ProgressRing indeterminate aria-label="Loading" />)
    expect(screen.getByRole("progressbar", { name: "Loading" })).not.toHaveAttribute("aria-valuenow")
  })
})