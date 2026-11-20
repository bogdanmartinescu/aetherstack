import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { AnimatedNumber } from "../components/animated-number"

describe("AnimatedNumber", () => {
  it("formats currency", () => {
    render(
      <AnimatedNumber
        value={48210}
        format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
      />,
    )
    expect(screen.getByText("$48,210")).toBeInTheDocument()
  })

  it("formats percents", () => {
    render(<AnimatedNumber value={0.125} format={{ style: "percent", maximumFractionDigits: 1 }} />)
    expect(screen.getByText("12.5%")).toBeInTheDocument()
  })
})
