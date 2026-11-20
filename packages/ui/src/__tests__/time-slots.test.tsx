import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { TimeSlots } from "../components/time-slots"

const slots = [
  { id: "a", label: "09:00" },
  { id: "b", label: "09:30", disabled: true },
]

describe("TimeSlots", () => {
  it("shows the time zone and confirms the chosen slot", async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(<TimeSlots timeZoneLabel="Europe/Bucharest" slots={slots} onConfirm={onConfirm} />)
    expect(screen.getByText("Europe/Bucharest")).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: "09:30" })).toBeDisabled()
    expect(screen.getByRole("button", { name: "Confirm" })).toBeDisabled()
    await user.click(screen.getByRole("radio", { name: "09:00" }))
    expect(screen.getByRole("button", { name: "Confirm" })).toBeEnabled()
    await user.click(screen.getByRole("button", { name: "Confirm" }))
    expect(onConfirm).toHaveBeenCalledWith("a")
  })
})
