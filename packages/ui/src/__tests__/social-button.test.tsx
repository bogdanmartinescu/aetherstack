import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { SocialButton } from "../components/social-button"

describe("SocialButton", () => {
  it("names the verb and the provider", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<SocialButton provider="google" verb="Sign up" onClick={onClick} />)
    await user.click(screen.getByRole("button", { name: "Sign up with Google" }))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("uses an accessible name when there is no visible text", () => {
    render(<SocialButton provider="github" variant="icon" />)
    expect(screen.getByRole("button", { name: "Sign in with GitHub" })).toBeInTheDocument()
  })

  it("stays busy without submitting", () => {
    render(<SocialButton provider="apple" loading />)
    const button = screen.getByRole("button", { name: "Sign in with Apple" })
    expect(button).toHaveAttribute("aria-busy", "true")
    expect(button).toHaveAttribute("type", "button")
  })

  it("marks the brand variant", () => {
    render(<SocialButton provider="microsoft" variant="brand" />)
    expect(screen.getByRole("button", { name: "Sign in with Microsoft" })).toHaveAttribute(
      "data-provider",
      "microsoft",
    )
  })
})