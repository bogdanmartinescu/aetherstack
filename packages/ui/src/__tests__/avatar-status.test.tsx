import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { Avatar, AvatarFallback } from "../components/avatar"

describe("Avatar status", () => {
  it("renders a status dot when status is set", () => {
    render(
      <Avatar status="busy">
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>,
    )
    const statusDot = screen.getByRole("img", { name: "Busy" })
    expect(statusDot).toBeInTheDocument()
    expect(statusDot.closest('[class*="overflow-hidden"]')).toBeNull()
    expect(screen.getByText("AM")).toBeInTheDocument()
  })

  it("renders no status dot by default", () => {
    render(
      <Avatar>
        <AvatarFallback>AM</AvatarFallback>
      </Avatar>,
    )
    expect(screen.queryByRole("img")).not.toBeInTheDocument()
  })
})