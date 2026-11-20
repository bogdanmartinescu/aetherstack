import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { UptimeBar } from "../components/uptime-bar"

const days = [
  { id: "1", label: "Mon", status: "up" as const },
  { id: "2", label: "Tue", status: "up" as const },
  { id: "3", label: "Wed", status: "up" as const },
  { id: "4", label: "Thu", status: "down" as const },
  { id: "5", label: "Fri", status: "unknown" as const },
]

describe("UptimeBar", () => {
  it("summarises uptime without counting unknown days", () => {
    render(<UptimeBar days={days} />)
    expect(screen.getByRole("listbox")).toHaveAccessibleName(/75%/)
  })

  it("uses one tab stop and arrow keys between days", async () => {
    const user = userEvent.setup()
    const onSelect = vi.fn()
    render(<UptimeBar days={days} onSelect={onSelect} />)
    await user.tab()
    expect(screen.getByRole("option", { name: "Mon, up" })).toHaveFocus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("option", { name: "Tue, up" })).toHaveFocus()
    await user.keyboard("{Enter}")
    expect(onSelect).toHaveBeenCalledWith("2")
  })
})
