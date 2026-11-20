import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SegmentedControl } from "../components/segmented-control"

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
]

describe("SegmentedControl", () => {
  it("exposes a radio for each option and checks the value", () => {
    render(<SegmentedControl aria-label="Range" options={options} value="week" />)
    expect(screen.getByRole("radio", { name: "Week" })).toBeChecked()
    expect(screen.getByRole("radio", { name: "Day" })).not.toBeChecked()
    expect(screen.getByTestId("segment-thumb")).toHaveAttribute("data-index", "1")
  })

  it("selects the next option from the keyboard", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <SegmentedControl
        aria-label="Range"
        options={options}
        defaultValue="day"
        onValueChange={onValueChange}
      />,
    )
    await user.click(screen.getByRole("radio", { name: "Day" }))
    await user.keyboard("{ArrowRight}")
    expect(onValueChange).toHaveBeenCalledWith("week")
    expect(screen.getByRole("radio", { name: "Week" })).toBeChecked()
  })

  it("hides the thumb when the value matches no option", () => {
    render(<SegmentedControl aria-label="Range" options={options} value="year" />)
    expect(screen.queryByTestId("segment-thumb")).not.toBeInTheDocument()
    expect(screen.getByRole("radio", { name: "Day" })).not.toBeChecked()
    expect(screen.getByRole("radio", { name: "Week" })).not.toBeChecked()
    expect(screen.getByRole("radio", { name: "Month" })).not.toBeChecked()
  })

  it("does not select a disabled option", () => {
    render(
      <SegmentedControl
        aria-label="Range"
        options={[...options.slice(0, 2), { value: "month", label: "Month", disabled: true }]}
        value="day"
      />,
    )
    expect(screen.getByRole("radio", { name: "Month" })).toBeDisabled()
  })
})
