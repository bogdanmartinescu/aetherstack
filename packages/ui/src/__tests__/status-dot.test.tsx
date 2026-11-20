import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { StatusDot } from "../components/status-dot"

describe("StatusDot", () => {
  it("exposes the default spoken label for the status", () => {
    render(<StatusDot status="busy" />)
    expect(screen.getByRole("img", { name: "Busy" })).toBeInTheDocument()
  })

  it("uses a custom label when one is passed", () => {
    render(<StatusDot status="failed" label="Deploy failed" />)
    expect(screen.getByRole("img", { name: "Deploy failed" })).toBeInTheDocument()
  })

  it("pulses only while busy, unless pulse is forced off", () => {
    const { rerender } = render(<StatusDot status="busy" />)
    expect(screen.getByRole("img", { name: "Busy" }).firstElementChild).toHaveClass(
      "motion-safe:animate-pulse",
    )
    rerender(<StatusDot status="idle" />)
    expect(screen.getByRole("img", { name: "Idle" }).firstElementChild).not.toHaveClass(
      "motion-safe:animate-pulse",
    )
    rerender(<StatusDot status="busy" pulse={false} />)
    expect(screen.getByRole("img", { name: "Busy" }).firstElementChild).not.toHaveClass(
      "motion-safe:animate-pulse",
    )
  })
})
