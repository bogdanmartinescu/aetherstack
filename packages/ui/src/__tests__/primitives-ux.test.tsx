import type * as React from "react"
import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Button } from "../components/button"
import { Progress } from "../components/progress"
import { Avatar, AvatarFallback, AvatarGroup } from "../components/avatar"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../components/pagination"
import { SidebarMenuButton, SidebarProvider } from "../components/sidebar"

// ─── Button: loading ─────────────────────────────────────────────────────────

describe("Button loading state", () => {
  it("marks the button busy while keeping it focusable", () => {
    render(<Button loading>Save</Button>)
    const button = screen.getByRole("button", { name: "Save" })
    expect(button).toBeEnabled()
    expect(button).toHaveAttribute("aria-disabled", "true")
    expect(button).toHaveAttribute("aria-busy", "true")
    expect(button).toHaveAttribute("data-loading", "true")
    button.focus()
    expect(button).toHaveFocus()
  })

  it("keeps focus when loading starts", () => {
    const { rerender } = render(<Button>Save</Button>)
    const button = screen.getByRole("button")
    button.focus()
    rerender(<Button loading>Save</Button>)
    expect(screen.getByRole("button")).toHaveFocus()
  })

  it("does not submit an enclosing form while loading", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    render(
      <form onSubmit={onSubmit}>
        <Button type="submit" loading>
          Save
        </Button>
      </form>,
    )
    await user.click(screen.getByRole("button"))
    await user.keyboard("{Enter}")
    expect(onSubmit).not.toHaveBeenCalled()
  })

  it("submits again once loading finishes", async () => {
    const user = userEvent.setup()
    const onSubmit = vi.fn((e: React.FormEvent) => e.preventDefault())
    const { rerender } = render(
      <form onSubmit={onSubmit}>
        <Button type="submit" loading>
          Save
        </Button>
      </form>,
    )
    rerender(
      <form onSubmit={onSubmit}>
        <Button type="submit">Save</Button>
      </form>,
    )
    await user.click(screen.getByRole("button"))
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it("replaces the leading icon with the spinner and hides the trailing icon", () => {
    render(
      <Button loading icon={<svg data-testid="lead" />} iconRight={<svg data-testid="trail" />}>
        Run
      </Button>,
    )
    expect(screen.queryByTestId("lead")).not.toBeInTheDocument()
    expect(screen.queryByTestId("trail")).not.toBeInTheDocument()
    expect(screen.getByRole("button").querySelector(".animate-spin")).toBeInTheDocument()
  })

  it("sweeps the label on filled variants but not on text-only ones", () => {
    const { rerender } = render(<Button loading>Run</Button>)
    expect(screen.getByRole("button").querySelector(".animate-button-sweep")).toBeInTheDocument()
    rerender(
      <Button loading variant="quiet">
        Run
      </Button>,
    )
    expect(
      screen.getByRole("button").querySelector(".animate-button-sweep"),
    ).not.toBeInTheDocument()
  })

  it("renders a decorative spinner before the label", () => {
    render(<Button loading>Save</Button>)
    const spinner = screen.getByRole("button").querySelector("svg")
    expect(spinner).toHaveAttribute("aria-hidden", "true")
    expect(spinner).toHaveClass("animate-spin")
  })

  it("does not fire onClick while loading", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    )
    await user.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("omits busy attributes when not loading", () => {
    render(<Button>Save</Button>)
    const button = screen.getByRole("button")
    expect(button).not.toHaveAttribute("aria-busy")
    expect(button).toBeEnabled()
  })

  it("renders the spinner inside a slotted child when asChild", () => {
    render(
      <Button asChild loading>
        <a href="/save">Save</a>
      </Button>,
    )
    const link = screen.getByRole("link", { name: "Save" })
    expect(link).toHaveAttribute("aria-busy", "true")
    expect(link.querySelector(".animate-spin")).toBeInTheDocument()
    expect(link.parentElement?.tagName).not.toBe("BUTTON")
  })

  it("ignores clicks on a loading asChild link", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(
      <Button asChild loading onClick={onClick}>
        <a href="#save">Save</a>
      </Button>,
    )
    await user.click(screen.getByRole("link"))
    expect(onClick).not.toHaveBeenCalled()
  })
})

// ─── Button: icons, sizes, variants ──────────────────────────────────────────

describe("Button icons and states", () => {
  it("renders leading and trailing icons around the label", () => {
    render(
      <Button icon={<svg data-testid="lead" />} iconRight={<svg data-testid="trail" />}>
        Run
      </Button>,
    )
    const button = screen.getByRole("button", { name: "Run" })
    const children = Array.from(button.childNodes)
    expect(children[0]).toBe(screen.getByTestId("lead"))
    expect(children[children.length - 1]).toBe(screen.getByTestId("trail"))
  })

  it("becomes square when it has an icon and no label", () => {
    const { rerender } = render(<Button icon={<svg />} aria-label="Settings" />)
    expect(screen.getByRole("button", { name: "Settings" })).toHaveClass("w-10")
    rerender(<Button icon={<svg />} size="xs" aria-label="Settings" />)
    expect(screen.getByRole("button")).toHaveClass("w-8")
  })

  it("supports icons inside asChild links", () => {
    render(
      <Button asChild icon={<svg data-testid="lead" />}>
        <a href="/docs">Docs</a>
      </Button>,
    )
    expect(screen.getByRole("link", { name: "Docs" })).toContainElement(screen.getByTestId("lead"))
  })

  it("offers an xs size", () => {
    render(<Button size="xs">Zoom</Button>)
    expect(screen.getByRole("button")).toHaveClass("h-8", "text-xs")
  })

  it("renders the quiet variant at text size with no press scale", () => {
    render(<Button variant="quiet">Show more</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("h-auto", "px-0")
    expect(button.className).not.toContain("scale-[0.97]")
  })

  it("presses filled variants in", () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole("button").className).toContain("active:scale-[0.97]")
  })

  it("keeps a not-allowed cursor when disabled and guards hover", () => {
    render(<Button disabled>Save</Button>)
    const button = screen.getByRole("button")
    expect(button).toHaveClass("disabled:cursor-not-allowed")
    expect(button).not.toHaveClass("hover:bg-primary/90")
    expect(button).not.toHaveClass("disabled:pointer-events-none")
  })

  it("grows on coarse pointers for touch targets", () => {
    render(<Button>Save</Button>)
    expect(screen.getByRole("button")).toHaveClass("[@media(pointer:coarse)]:h-11")
  })
})

// ─── Progress ─────────────────────────────────────────────────────────────────

describe("Progress enhancements", () => {
  it("applies indicatorClassName to the indicator", () => {
    const { container } = render(<Progress value={40} indicatorClassName="bg-destructive" />)
    const indicator = container.querySelector("[data-state]")?.firstElementChild
    expect(indicator).toHaveClass("bg-destructive")
  })

  it("clamps values above max", () => {
    render(<Progress value={150} />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "100")
  })

  it("clamps negative values to zero", () => {
    render(<Progress value={-10} />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuenow", "0")
  })

  it("is indeterminate when value is null", () => {
    render(<Progress value={null} />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("data-state", "indeterminate")
  })

  it("respects a custom max", () => {
    const { container } = render(<Progress value={5} max={10} />)
    const indicator = container.querySelector("[data-state]")?.firstElementChild
    expect(indicator).toHaveStyle({ transform: "translateX(-50%)" })
  })
})

// ─── AvatarGroup ──────────────────────────────────────────────────────────────

describe("AvatarGroup overflow", () => {
  it("labels the overflow avatar for assistive tech", () => {
    render(
      <AvatarGroup max={1}>
        <Avatar>
          <AvatarFallback>AB</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>CD</AvatarFallback>
        </Avatar>
        <Avatar>
          <AvatarFallback>EF</AvatarFallback>
        </Avatar>
      </AvatarGroup>,
    )
    expect(screen.getByRole("img", { name: "2 more" })).toBeInTheDocument()
    expect(screen.queryByText("CD")).not.toBeInTheDocument()
  })
})

// ─── Pagination ───────────────────────────────────────────────────────────────

describe("Pagination enhancements", () => {
  it("sizes previous/next links to fit their labels", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    )
    expect(screen.getByLabelText("Go to previous page")).not.toHaveClass("w-10")
    expect(screen.getByLabelText("Go to next page")).not.toHaveClass("w-10")
  })

  it("keeps numbered links square by default", () => {
    render(<PaginationLink href="#">3</PaginationLink>)
    expect(screen.getByText("3")).toHaveClass("w-10")
  })

  it("renders an inert link when isDisabled", () => {
    render(<PaginationPrevious href="/page/0" isDisabled />)
    const link = screen.getByLabelText("Go to previous page")
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).toHaveAttribute("tabindex", "-1")
    expect(link).not.toHaveAttribute("href")
  })
})

// ─── SidebarMenuButton ────────────────────────────────────────────────────────

describe("SidebarMenuButton asChild", () => {
  it("renders the child element instead of a button", () => {
    render(
      <SidebarProvider>
        <SidebarMenuButton asChild isActive>
          <a href="/settings">Settings</a>
        </SidebarMenuButton>
      </SidebarProvider>,
    )
    const link = screen.getByRole("link", { name: "Settings" })
    expect(link).toHaveAttribute("data-active", "true")
    expect(link).toHaveAttribute("aria-current", "page")
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("does not leak asChild onto the DOM", () => {
    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
    render(
      <SidebarProvider>
        <SidebarMenuButton>Inbox</SidebarMenuButton>
      </SidebarProvider>,
    )
    expect(screen.getByRole("button", { name: "Inbox" })).not.toHaveAttribute("asChild")
    expect(errorSpy).not.toHaveBeenCalled()
    errorSpy.mockRestore()
  })
})
