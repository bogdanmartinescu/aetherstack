import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Badge } from "../components/badge"
import { Button } from "../components/button"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../components/card"
import { Checkbox } from "../components/checkbox"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../components/dialog"
import { Input } from "../components/input"
import { Label } from "../components/label"
import { RadioGroup, RadioGroupItem } from "../components/radio-group"
import { Skeleton } from "../components/skeleton"
import { Switch } from "../components/switch"
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/table"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/tabs"
import { Textarea } from "../components/textarea"
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
} from "../components/tooltip"

// ─── Badge ───────────────────────────────────────────────────────────────────

describe("Badge", () => {
  it("renders with text", () => {
    render(<Badge>New</Badge>)
    expect(screen.getByText("New")).toBeInTheDocument()
  })

  it("applies default variant classes", () => {
    const { container } = render(<Badge>Test</Badge>)
    expect(container.firstChild).toHaveClass("bg-primary")
  })

  it("applies secondary variant classes", () => {
    const { container } = render(<Badge variant="secondary">Test</Badge>)
    expect(container.firstChild).toHaveClass("bg-secondary")
  })

  it("applies destructive variant classes", () => {
    const { container } = render(<Badge variant="destructive">Test</Badge>)
    expect(container.firstChild).toHaveClass("bg-destructive")
  })

  it("applies outline variant classes", () => {
    const { container } = render(<Badge variant="outline">Test</Badge>)
    expect(container.firstChild).toHaveClass("text-foreground")
  })

  it("merges custom className", () => {
    const { container } = render(<Badge className="custom-class">Test</Badge>)
    expect(container.firstChild).toHaveClass("custom-class")
  })
})

// ─── Button ──────────────────────────────────────────────────────────────────

describe("Button", () => {
  it("renders with text", () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
  })

  it("fires onClick", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Click</Button>)
    await user.click(screen.getByRole("button"))
    expect(onClick).toHaveBeenCalledOnce()
  })

  it("is disabled when disabled prop is set", () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByRole("button")).toBeDisabled()
  })

  it("does not fire onClick when disabled", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button disabled onClick={onClick}>Disabled</Button>)
    await user.click(screen.getByRole("button"))
    expect(onClick).not.toHaveBeenCalled()
  })

  it("applies default variant", () => {
    const { container } = render(<Button>Default</Button>)
    expect(container.firstChild).toHaveClass("bg-primary")
  })

  it("applies destructive variant", () => {
    const { container } = render(<Button variant="destructive">Del</Button>)
    expect(container.firstChild).toHaveClass("bg-destructive")
  })

  it("applies outline variant", () => {
    const { container } = render(<Button variant="outline">Out</Button>)
    expect(container.firstChild).toHaveClass("border")
  })

  it("applies sm size", () => {
    const { container } = render(<Button size="sm">Sm</Button>)
    expect(container.firstChild).toHaveClass("h-9")
  })

  it("applies lg size", () => {
    const { container } = render(<Button size="lg">Lg</Button>)
    expect(container.firstChild).toHaveClass("h-11")
  })

  it("applies icon size", () => {
    const { container } = render(<Button size="icon">X</Button>)
    expect(container.firstChild).toHaveClass("h-10", "w-10")
  })

  it("renders as child element with asChild", () => {
    render(
      <Button asChild>
        <a href="/home">Home</a>
      </Button>,
    )
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
  })

  it("is keyboard-accessible with Enter key", async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Button onClick={onClick}>Press</Button>)
    screen.getByRole("button").focus()
    await user.keyboard("{Enter}")
    expect(onClick).toHaveBeenCalled()
  })
})

// ─── Card ────────────────────────────────────────────────────────────────────

describe("Card", () => {
  it("renders all sub-components", () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Title</CardTitle>
          <CardDescription>Description</CardDescription>
        </CardHeader>
        <CardContent>Content</CardContent>
        <CardFooter>Footer</CardFooter>
      </Card>,
    )
    expect(screen.getByText("Title")).toBeInTheDocument()
    expect(screen.getByText("Description")).toBeInTheDocument()
    expect(screen.getByText("Content")).toBeInTheDocument()
    expect(screen.getByText("Footer")).toBeInTheDocument()
  })

  it("applies card border and background classes", () => {
    const { container } = render(<Card>Test</Card>)
    expect(container.firstChild).toHaveClass("rounded-lg", "border", "bg-card")
  })
})

// ─── Checkbox ────────────────────────────────────────────────────────────────

describe("Checkbox", () => {
  it("renders as a checkbox", () => {
    render(<Checkbox aria-label="Accept terms" />)
    expect(screen.getByRole("checkbox")).toBeInTheDocument()
  })

  it("is unchecked by default", () => {
    render(<Checkbox aria-label="Accept terms" />)
    expect(screen.getByRole("checkbox")).not.toBeChecked()
  })

  it("can be checked via user interaction", async () => {
    const user = userEvent.setup()
    render(<Checkbox aria-label="Accept terms" />)
    await user.click(screen.getByRole("checkbox"))
    expect(screen.getByRole("checkbox")).toBeChecked()
  })

  it("is disabled when disabled prop is set", () => {
    render(<Checkbox aria-label="Disabled" disabled />)
    expect(screen.getByRole("checkbox")).toBeDisabled()
  })

  it("reflects controlled checked state", () => {
    render(<Checkbox checked aria-label="Checked" onCheckedChange={() => {}} />)
    expect(screen.getByRole("checkbox")).toBeChecked()
  })
})

// ─── Input ───────────────────────────────────────────────────────────────────

describe("Input", () => {
  it("renders an input element", () => {
    render(<Input placeholder="Enter text" />)
    expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
  })

  it("accepts user input", async () => {
    const user = userEvent.setup()
    render(<Input placeholder="Type here" />)
    const input = screen.getByPlaceholderText("Type here")
    await user.type(input, "hello")
    expect(input).toHaveValue("hello")
  })

  it("is disabled when disabled prop is set", () => {
    render(<Input disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled()
  })

  it("applies correct base classes", () => {
    render(<Input placeholder="test" />)
    const input = screen.getByPlaceholderText("test")
    expect(input).toHaveClass("flex", "h-10", "w-full", "rounded-md")
  })
})

// ─── Label ───────────────────────────────────────────────────────────────────

describe("Label", () => {
  it("renders with text", () => {
    render(<Label>Email</Label>)
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  it("associates with an input via htmlFor", () => {
    render(
      <>
        <Label htmlFor="email">Email</Label>
        <Input id="email" placeholder="email" />
      </>,
    )
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
  })
})

// ─── Radio Group ─────────────────────────────────────────────────────────────

describe("RadioGroup", () => {
  it("renders radio buttons", () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    )
    const radios = screen.getAllByRole("radio")
    expect(radios).toHaveLength(2)
  })

  it("has the default value selected", () => {
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    )
    expect(screen.getByLabelText("Option A")).toBeChecked()
    expect(screen.getByLabelText("Option B")).not.toBeChecked()
  })

  it("moves focus with arrow keys", async () => {
    const user = userEvent.setup()
    render(
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="Option A" />
        <RadioGroupItem value="b" aria-label="Option B" />
      </RadioGroup>,
    )
    screen.getByLabelText("Option A").focus()
    await user.keyboard("{ArrowDown}")
    expect(screen.getByLabelText("Option B")).toHaveFocus()
  })
})

// ─── Skeleton ────────────────────────────────────────────────────────────────

describe("Skeleton", () => {
  it("renders a div", () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("applies animate-pulse class", () => {
    const { container } = render(<Skeleton />)
    expect(container.firstChild).toHaveClass("animate-pulse")
  })

  it("merges custom className", () => {
    const { container } = render(<Skeleton className="h-4 w-24" />)
    expect(container.firstChild).toHaveClass("h-4", "w-24")
  })
})

// ─── Switch ──────────────────────────────────────────────────────────────────

describe("Switch", () => {
  it("renders as a switch", () => {
    render(<Switch aria-label="Toggle" />)
    expect(screen.getByRole("switch")).toBeInTheDocument()
  })

  it("is unchecked by default", () => {
    render(<Switch aria-label="Toggle" />)
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "unchecked")
  })

  it("can be toggled via user interaction", async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Toggle" />)
    await user.click(screen.getByRole("switch"))
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked")
  })

  it("is disabled when disabled prop is set", () => {
    render(<Switch aria-label="Disabled" disabled />)
    expect(screen.getByRole("switch")).toBeDisabled()
  })

  it("can be toggled with Space key", async () => {
    const user = userEvent.setup()
    render(<Switch aria-label="Toggle" />)
    screen.getByRole("switch").focus()
    await user.keyboard(" ")
    expect(screen.getByRole("switch")).toHaveAttribute("data-state", "checked")
  })
})

// ─── Table ───────────────────────────────────────────────────────────────────

describe("Table", () => {
  it("renders a table with all expected parts", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Alice</TableCell>
            <TableCell>alice@example.com</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByRole("table")).toBeInTheDocument()
    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText("alice@example.com")).toBeInTheDocument()
  })

  it("renders column headers in thead", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Column</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    )
    expect(screen.getByRole("columnheader", { name: "Column" })).toBeInTheDocument()
  })
})

// ─── Tabs ────────────────────────────────────────────────────────────────────

describe("Tabs", () => {
  it("renders tabs with panels", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Panel 1</TabsContent>
        <TabsContent value="tab2">Panel 2</TabsContent>
      </Tabs>,
    )
    expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument()
    expect(screen.getByText("Panel 1")).toBeVisible()
  })

  it("default selected tab is active", () => {
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Panel 1</TabsContent>
        <TabsContent value="tab2">Panel 2</TabsContent>
      </Tabs>,
    )
    expect(screen.getByRole("tab", { name: "Tab 1" })).toHaveAttribute(
      "data-state",
      "active",
    )
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
      "data-state",
      "inactive",
    )
  })

  it("switches panel on tab click", async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Panel 1</TabsContent>
        <TabsContent value="tab2">Panel 2</TabsContent>
      </Tabs>,
    )
    await user.click(screen.getByRole("tab", { name: "Tab 2" }))
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveAttribute(
      "data-state",
      "active",
    )
  })

  it("navigates tabs with arrow keys", async () => {
    const user = userEvent.setup()
    render(
      <Tabs defaultValue="tab1">
        <TabsList>
          <TabsTrigger value="tab1">Tab 1</TabsTrigger>
          <TabsTrigger value="tab2">Tab 2</TabsTrigger>
        </TabsList>
        <TabsContent value="tab1">Panel 1</TabsContent>
        <TabsContent value="tab2">Panel 2</TabsContent>
      </Tabs>,
    )
    screen.getByRole("tab", { name: "Tab 1" }).focus()
    await user.keyboard("{ArrowRight}")
    expect(screen.getByRole("tab", { name: "Tab 2" })).toHaveFocus()
  })
})

// ─── Textarea ────────────────────────────────────────────────────────────────

describe("Textarea", () => {
  it("renders a textarea", () => {
    render(<Textarea placeholder="Enter message" />)
    expect(screen.getByPlaceholderText("Enter message")).toBeInTheDocument()
  })

  it("accepts user input", async () => {
    const user = userEvent.setup()
    render(<Textarea placeholder="Type here" />)
    const textarea = screen.getByPlaceholderText("Type here")
    await user.type(textarea, "hello world")
    expect(textarea).toHaveValue("hello world")
  })

  it("is disabled when disabled prop is set", () => {
    render(<Textarea disabled placeholder="Disabled" />)
    expect(screen.getByPlaceholderText("Disabled")).toBeDisabled()
  })

  it("applies correct base classes", () => {
    render(<Textarea placeholder="test" />)
    const textarea = screen.getByPlaceholderText("test")
    expect(textarea).toHaveClass("flex", "min-h-[80px]", "w-full", "rounded-md")
  })
})

// ─── Tooltip ─────────────────────────────────────────────────────────────────

describe("Tooltip", () => {
  it("renders the trigger", () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button>Hover me</button>
          </TooltipTrigger>
          <TooltipContent>Tooltip text</TooltipContent>
        </Tooltip>
      </TooltipProvider>,
    )
    expect(screen.getByRole("button", { name: "Hover me" })).toBeInTheDocument()
  })
})

// ─── Dialog ──────────────────────────────────────────────────────────────────

describe("Dialog", () => {
  it("does not show content before open", () => {
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button>Open</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Modal title</DialogTitle>
          <DialogDescription>Modal description</DialogDescription>
        </DialogContent>
      </Dialog>,
    )
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("shows dialog when trigger is clicked", async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button>Open</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Modal title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    )
    await user.click(screen.getByRole("button", { name: "Open" }))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByText("Modal title")).toBeInTheDocument()
  })

  it("closes dialog with Escape key", async () => {
    const user = userEvent.setup()
    render(
      <Dialog>
        <DialogTrigger asChild>
          <button>Open</button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Modal title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogContent>
      </Dialog>,
    )
    await user.click(screen.getByRole("button", { name: "Open" }))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    await user.keyboard("{Escape}")
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})
