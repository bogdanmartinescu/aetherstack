import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { PasswordField } from "../components/password-field"

describe("PasswordField", () => {
  it("toggles visibility and presses the toggle", async () => {
    const user = userEvent.setup()
    render(<PasswordField label="Password" autoComplete="current-password" />)
    const input = screen.getByLabelText("Password")
    expect(input).toHaveAttribute("type", "password")
    expect(input).toHaveAttribute("autocomplete", "current-password")
    await user.click(screen.getByRole("button", { name: "Show password" }))
    expect(input).toHaveAttribute("type", "text")
    expect(screen.getByRole("button", { name: "Hide password" })).toHaveAttribute(
      "aria-pressed",
      "true",
    )
  })

  it("warns when Caps Lock is on", () => {
    render(<PasswordField label="Password" />)
    const input = screen.getByLabelText("Password")
    const event = new KeyboardEvent("keydown", { key: "A", bubbles: true, cancelable: true })
    vi.spyOn(event, "getModifierState").mockImplementation((key) => key === "CapsLock")
    input.dispatchEvent(event)
    expect(screen.getByRole("status")).toHaveTextContent("Caps Lock is on")
  })
})
