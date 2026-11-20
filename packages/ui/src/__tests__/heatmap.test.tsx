import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Heatmap } from "../components/heatmap"

describe("Heatmap", () => {
  it("names the focused cell and moves with the arrows", async () => {
    const user = userEvent.setup()
    render(
      <Heatmap
        aria-label="Deploys"
        rowLabels={["Mon", "Tue"]}
        columnLabels={["9am", "10am"]}
        values={[
          [0.2, 0.8],
          [1, 0],
        ]}
      />,
    )
    await user.tab()
    expect(screen.getByRole("gridcell", { name: "Mon, 9am, 0.2" })).toHaveFocus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("gridcell", { name: "Mon, 10am, 0.8" })).toHaveFocus()
    await user.keyboard("{ArrowDown}")
    expect(screen.getByRole("gridcell", { name: "Tue, 10am, 0" })).toHaveFocus()
  })

  it("rejects a values grid that does not match the labels", () => {
    expect(() =>
      render(
        <Heatmap aria-label="Deploys" rowLabels={["Mon"]} columnLabels={["9am"]} values={[[1, 2]]} />,
      ),
    ).toThrow(/values/)
  })
})