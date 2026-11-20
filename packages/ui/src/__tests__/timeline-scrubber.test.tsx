import { describe, it, expect, vi } from "vitest"
import { render, screen, fireEvent } from "@testing-library/react"
import { TimelineScrubber } from "../components/timeline-scrubber"

describe("TimelineScrubber", () => {
  it("reports the new value and shows it", () => {
    const onValueChange = vi.fn()
    render(
      <TimelineScrubber
        label="Position"
        min={0}
        max={10}
        step={1}
        value={3}
        onValueChange={onValueChange}
      />,
    )
    expect(screen.getByRole("slider", { name: "Position" })).toHaveAttribute("aria-valuenow", "3")
    fireEvent.change(screen.getByRole("slider", { name: "Position" }), { target: { value: "4" } })
    expect(onValueChange).toHaveBeenCalledWith(4)
    expect(screen.getByText("3")).toBeInTheDocument()
  })
})
