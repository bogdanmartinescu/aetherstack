import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Tag, TagGroup } from "../components/tag"

const items = [
  { id: "bug", label: "Bug" },
  { id: "docs", label: "Docs" },
  { id: "ui", label: "UI" },
] as const

describe("Tag", () => {
  it("removes itself through the named button", async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<Tag label="Beta" onRemove={onRemove} />)
    await user.click(screen.getByRole("button", { name: "Remove Beta" }))
    expect(onRemove).toHaveBeenCalledOnce()
  })
})

describe("TagGroup", () => {
  it("moves roving focus with the arrow keys and does not move focus on mount", async () => {
    const user = userEvent.setup()
    render(<TagGroup label="Labels" items={items} />)
    const bug = screen.getByRole("button", { name: "Bug" })
    expect(bug).toHaveAttribute("tabindex", "0")
    expect(screen.getByRole("button", { name: "Docs" })).toHaveAttribute("tabindex", "-1")
    expect(bug).not.toHaveFocus()
    bug.focus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("button", { name: "Docs" })).toHaveFocus()
    await user.keyboard("{ArrowLeft}")
    expect(bug).toHaveFocus()
  })

  it("moves from the clicked chip on arrow keys", async () => {
    const user = userEvent.setup()
    render(<TagGroup label="Labels" items={items} />)
    await user.click(screen.getByRole("button", { name: "UI" }))
    await user.keyboard("{ArrowLeft}")
    expect(screen.getByRole("button", { name: "Docs" })).toHaveFocus()
  })

  it("keeps a tab stop when items shrink", () => {
    const single = [{ id: "bug", label: "Bug" }] as const
    const { rerender } = render(<TagGroup label="Labels" items={items} />)
    rerender(<TagGroup label="Labels" items={single} />)
    expect(screen.getByRole("button", { name: "Bug" })).toHaveAttribute("tabindex", "0")
  })

  it("replaces the selection in single mode", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <TagGroup
        label="Labels"
        items={items}
        selection="single"
        value={["bug"]}
        onValueChange={onValueChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Docs" }))
    expect(onValueChange).toHaveBeenCalledWith(["docs"])
  })

  it("toggles membership in multiple mode", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(
      <TagGroup
        label="Labels"
        items={items}
        selection="multiple"
        value={["bug"]}
        onValueChange={onValueChange}
      />,
    )
    await user.click(screen.getByRole("button", { name: "Docs" }))
    expect(onValueChange).toHaveBeenCalledWith(["bug", "docs"])
    await user.click(screen.getByRole("button", { name: "Bug" }))
    expect(onValueChange).toHaveBeenCalledWith([])
  })
})