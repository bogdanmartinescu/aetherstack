import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { checkPassword, generatePassword, scorePassword, PasswordStrength } from "../components/password-strength"

describe("password helpers", () => {
  it("scores by length and character classes", () => {
    expect(scorePassword("")).toBe(0)
    expect(scorePassword("short")).toBe(1)
    expect(scorePassword("abcdefgh")).toBe(2)
    expect(scorePassword("Abcdefg1")).toBe(3)
    expect(scorePassword("Abcdefghij1!")).toBe(4)
  })

  it("checks each rule", () => {
    expect(checkPassword("abc")).toEqual({
      length: false,
      lowercase: true,
      uppercase: false,
      number: false,
      symbol: false,
    })
  })

  it("generates a password that meets every rule", () => {
    const password = generatePassword(12, () => 0)
    expect(password).toHaveLength(12)
    expect(checkPassword(password)).toEqual({
      length: true,
      lowercase: true,
      uppercase: true,
      number: true,
      symbol: true,
    })
  })
})

describe("PasswordStrength", () => {
  it("exposes the score and generates into the callback", async () => {
    const user = userEvent.setup()
    const onPasswordChange = vi.fn()
    render(<PasswordStrength password="short" onPasswordChange={onPasswordChange} />)
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuenow", "1")
    expect(screen.getByRole("meter")).toHaveAttribute("aria-valuemax", "4")
    await user.click(screen.getByRole("button", { name: "Generate password" }))
    const next = onPasswordChange.mock.calls[0]?.[0] as string
    expect(checkPassword(next).length).toBe(true)
  })
})