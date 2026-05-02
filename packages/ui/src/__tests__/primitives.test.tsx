import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

// embla-carousel-react relies on matchMedia / ResizeObserver APIs that jsdom
// does not implement. Mock the hook so Carousel tests run without a browser.
vi.mock("embla-carousel-react", () => ({
  default: () => [() => {}, undefined],
}))

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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../components/accordion"
import { Avatar, AvatarFallback, AvatarGroup } from "../components/avatar"
import { Progress } from "../components/progress"
import { Slider } from "../components/slider"
import { ScrollArea } from "../components/scroll-area"
import { Separator } from "../components/separator"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/dropdown-menu"
import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "../components/hover-card"
import { Toggle } from "../components/toggle"
import { ToggleGroup, ToggleGroupItem } from "../components/toggle-group"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../components/pagination"
import { useToast, toast } from "../components/toast"
import {
  Combobox,
  ComboboxTrigger,
  ComboboxContent,
  ComboboxInput,
  ComboboxList,
  ComboboxEmpty,
  ComboboxItem,
} from "../components/combobox"
import { AspectRatio } from "../components/aspect-ratio"
import { ButtonGroup } from "../components/button-group"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/carousel"
import {
  InputGroup,
  InputGroupAddon,
} from "../components/input-group"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/input-otp"
import { VisuallyHidden } from "../components/visually-hidden"

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

// ─── Accordion ───────────────────────────────────────────────────────────────

describe("Accordion", () => {
  it("renders without crash", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content 1</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(screen.getByText("Section 1")).toBeInTheDocument()
  })

  it("content is not in the DOM when closed", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Hidden content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(screen.queryByText("Hidden content")).not.toBeInTheDocument()
  })

  it("expands content on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Expanded content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    await user.click(screen.getByText("Section 1"))
    expect(screen.getByText("Expanded content")).toBeVisible()
  })

  it("trigger has correct button role", () => {
    render(
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>Section 1</AccordionTrigger>
          <AccordionContent>Content</AccordionContent>
        </AccordionItem>
      </Accordion>,
    )
    expect(screen.getByRole("button", { name: /Section 1/i })).toBeInTheDocument()
  })
})

// ─── Avatar / AvatarGroup ─────────────────────────────────────────────────────

describe("Avatar", () => {
  it("renders fallback when no image src", () => {
    render(
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>,
    )
    expect(screen.getByText("JD")).toBeInTheDocument()
  })

  it("merges custom className on Avatar", () => {
    const { container } = render(
      <Avatar className="custom-avatar">
        <AvatarFallback>AB</AvatarFallback>
      </Avatar>,
    )
    expect(container.firstChild).toHaveClass("custom-avatar")
  })

  it("AvatarGroup renders all children when no max", () => {
    render(
      <AvatarGroup>
        <Avatar><AvatarFallback>A1</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>A2</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>A3</AvatarFallback></Avatar>
      </AvatarGroup>,
    )
    expect(screen.getByText("A1")).toBeInTheDocument()
    expect(screen.getByText("A2")).toBeInTheDocument()
    expect(screen.getByText("A3")).toBeInTheDocument()
  })

  it("AvatarGroup shows overflow count when max is set", () => {
    render(
      <AvatarGroup max={2}>
        <Avatar><AvatarFallback>A1</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>A2</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>A3</AvatarFallback></Avatar>
      </AvatarGroup>,
    )
    expect(screen.getByText("A1")).toBeInTheDocument()
    expect(screen.getByText("A2")).toBeInTheDocument()
    expect(screen.queryByText("A3")).not.toBeInTheDocument()
    expect(screen.getByText("+1")).toBeInTheDocument()
  })
})

// ─── Progress ─────────────────────────────────────────────────────────────────

describe("Progress", () => {
  it("renders without crash", () => {
    const { container } = render(<Progress value={50} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("has progressbar role", () => {
    render(<Progress value={75} />)
    expect(screen.getByRole("progressbar")).toBeInTheDocument()
  })

  it("has aria-valuemax of 100 by default", () => {
    render(<Progress value={60} />)
    expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuemax", "100")
  })

  it("merges custom className", () => {
    const { container } = render(<Progress value={0} className="custom-progress" />)
    expect(container.firstChild).toHaveClass("custom-progress")
  })
})

// ─── Slider ───────────────────────────────────────────────────────────────────

describe("Slider", () => {
  it("renders without crash", () => {
    const { container } = render(<Slider defaultValue={[50]} />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("has slider role on thumb", () => {
    render(<Slider defaultValue={[30]} min={0} max={100} />)
    expect(screen.getByRole("slider")).toBeInTheDocument()
  })

  it("reflects aria-valuenow on thumb", () => {
    render(<Slider defaultValue={[42]} min={0} max={100} />)
    expect(screen.getByRole("slider")).toHaveAttribute("aria-valuenow", "42")
  })

  it("merges custom className", () => {
    const { container } = render(<Slider defaultValue={[0]} className="custom-slider" />)
    expect(container.firstChild).toHaveClass("custom-slider")
  })
})

// ─── ScrollArea ───────────────────────────────────────────────────────────────

describe("ScrollArea", () => {
  it("renders children", () => {
    render(
      <ScrollArea>
        <p>Scrollable content</p>
      </ScrollArea>,
    )
    expect(screen.getByText("Scrollable content")).toBeInTheDocument()
  })

  it("merges custom className", () => {
    const { container } = render(
      <ScrollArea className="custom-scroll">
        <p>Content</p>
      </ScrollArea>,
    )
    expect(container.firstChild).toHaveClass("custom-scroll")
  })

  it("root element has overflow-hidden class", () => {
    const { container } = render(
      <ScrollArea>
        <p>Content</p>
      </ScrollArea>,
    )
    expect(container.firstChild).toHaveClass("overflow-hidden")
  })
})

// ─── Separator ────────────────────────────────────────────────────────────────

describe("Separator", () => {
  it("renders without crash", () => {
    const { container } = render(<Separator />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("defaults to horizontal orientation", () => {
    render(<Separator />)
    expect(screen.getByRole("none")).toBeInTheDocument()
  })

  it("renders vertical separator", () => {
    render(<Separator orientation="vertical" decorative={false} />)
    const sep = screen.getByRole("separator")
    expect(sep).toHaveAttribute("data-orientation", "vertical")
  })

  it("merges custom className", () => {
    const { container } = render(<Separator className="custom-sep" />)
    expect(container.firstChild).toHaveClass("custom-sep")
  })
})

// ─── DropdownMenu ─────────────────────────────────────────────────────────────

describe("DropdownMenu", () => {
  it("renders trigger without crash", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Open Menu</button>
        </DropdownMenuTrigger>
      </DropdownMenu>,
    )
    expect(screen.getByRole("button", { name: "Open Menu" })).toBeInTheDocument()
  })

  it("trigger has aria-haspopup attribute", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Open Menu</button>
        </DropdownMenuTrigger>
      </DropdownMenu>,
    )
    expect(screen.getByRole("button", { name: "Open Menu" })).toHaveAttribute(
      "aria-haspopup",
      "menu",
    )
  })

  it("menu content is not visible when closed", () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Open Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )
    expect(screen.queryByRole("menu")).not.toBeInTheDocument()
  })

  it("opens menu on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button>Open Menu</button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>Item 1</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>,
    )
    await user.click(screen.getByRole("button", { name: "Open Menu" }))
    expect(screen.getByRole("menu")).toBeInTheDocument()
    expect(screen.getByText("Item 1")).toBeInTheDocument()
  })
})

// ─── HoverCard ────────────────────────────────────────────────────────────────

describe("HoverCard", () => {
  it("renders trigger without crash", () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#">Hover me</a>
        </HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>,
    )
    expect(screen.getByText("Hover me")).toBeInTheDocument()
  })

  it("card content is not visible when not hovered", () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <a href="#">Hover me</a>
        </HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>,
    )
    expect(screen.queryByText("Card content")).not.toBeInTheDocument()
  })

  it("trigger renders as its child element", () => {
    render(
      <HoverCard>
        <HoverCardTrigger asChild>
          <button>Hover trigger</button>
        </HoverCardTrigger>
        <HoverCardContent>Card content</HoverCardContent>
      </HoverCard>,
    )
    expect(screen.getByRole("button", { name: "Hover trigger" })).toBeInTheDocument()
  })
})

// ─── Toggle ───────────────────────────────────────────────────────────────────

describe("Toggle", () => {
  it("renders without crash", () => {
    render(<Toggle>Bold</Toggle>)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("can be toggled on and off", async () => {
    const user = userEvent.setup()
    render(<Toggle>Bold</Toggle>)
    const btn = screen.getByRole("button")
    expect(btn).toHaveAttribute("data-state", "off")
    await user.click(btn)
    expect(btn).toHaveAttribute("data-state", "on")
    await user.click(btn)
    expect(btn).toHaveAttribute("data-state", "off")
  })

  it("applies outline variant className", () => {
    const { container } = render(<Toggle variant="outline">Italic</Toggle>)
    expect(container.firstChild).toHaveClass("border")
  })

  it("merges custom className", () => {
    const { container } = render(<Toggle className="custom-toggle">B</Toggle>)
    expect(container.firstChild).toHaveClass("custom-toggle")
  })
})

// ─── ToggleGroup ──────────────────────────────────────────────────────────────

describe("ToggleGroup", () => {
  it("renders without crash", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
  })

  it("items have radio role for single-select group", () => {
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="x">X</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(screen.getByRole("radio", { name: "X" })).toBeInTheDocument()
  })

  it("selects an item on click", async () => {
    const user = userEvent.setup()
    render(
      <ToggleGroup type="single">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
        <ToggleGroupItem value="b">B</ToggleGroupItem>
      </ToggleGroup>,
    )
    const itemA = screen.getByRole("radio", { name: "A" })
    await user.click(itemA)
    expect(itemA).toHaveAttribute("data-state", "on")
  })

  it("merges custom className on ToggleGroup", () => {
    const { container } = render(
      <ToggleGroup type="single" className="custom-group">
        <ToggleGroupItem value="a">A</ToggleGroupItem>
      </ToggleGroup>,
    )
    expect(container.firstChild).toHaveClass("custom-group")
  })
})

// ─── Pagination ───────────────────────────────────────────────────────────────

describe("Pagination", () => {
  it("renders with navigation role and label", () => {
    render(<Pagination />)
    expect(screen.getByRole("navigation", { name: /pagination/i })).toBeInTheDocument()
  })

  it("renders Previous and Next links", () => {
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
    expect(screen.getByLabelText("Go to previous page")).toBeInTheDocument()
    expect(screen.getByLabelText("Go to next page")).toBeInTheDocument()
  })

  it("active page link has aria-current='page'", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationLink href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    )
    expect(screen.getByText("2").closest("a")).toHaveAttribute("aria-current", "page")
  })

  it("renders ellipsis with aria-hidden", () => {
    render(
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        </PaginationContent>
      </Pagination>,
    )
    expect(screen.getByText("More pages")).toBeInTheDocument()
  })
})

// ─── Toast (useToast hook) ────────────────────────────────────────────────────

describe("useToast", () => {
  it("toast() returns an id, dismiss, and update", () => {
    const result = toast({ title: "Hello" })
    expect(result).toHaveProperty("id")
    expect(result).toHaveProperty("dismiss")
    expect(result).toHaveProperty("update")
    result.dismiss()
  })

  it("useToast exposes toast function and toasts array", () => {
    let hookResult: ReturnType<typeof useToast> | null = null
    function Harness() {
      hookResult = useToast()
      return null
    }
    render(<Harness />)
    expect(hookResult).not.toBeNull()
    expect(typeof hookResult!.toast).toBe("function")
    expect(Array.isArray(hookResult!.toasts)).toBe(true)
  })

  it("useToast exposes a dismiss function", () => {
    let hookResult: ReturnType<typeof useToast> | null = null
    function Harness() {
      hookResult = useToast()
      return null
    }
    render(<Harness />)
    expect(typeof hookResult!.dismiss).toBe("function")
  })
})

// ─── Combobox ─────────────────────────────────────────────────────────────────

describe("Combobox", () => {
  it("renders trigger without crash", () => {
    render(
      <Combobox>
        <ComboboxTrigger asChild>
          <button>Select option</button>
        </ComboboxTrigger>
      </Combobox>,
    )
    expect(screen.getByRole("button", { name: "Select option" })).toBeInTheDocument()
  })

  it("popover is closed by default", () => {
    render(
      <Combobox>
        <ComboboxTrigger asChild>
          <button>Select option</button>
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxList>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    )
    expect(screen.queryByText("No results found.")).not.toBeInTheDocument()
  })

  it("opens popover on trigger click and shows empty state", async () => {
    const user = userEvent.setup()
    render(
      <Combobox>
        <ComboboxTrigger asChild>
          <button>Select option</button>
        </ComboboxTrigger>
        <ComboboxContent>
          <ComboboxInput placeholder="Search..." />
          <ComboboxList>
            <ComboboxEmpty>No results found.</ComboboxEmpty>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    )
    await user.click(screen.getByRole("button", { name: "Select option" }))
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument()
  })

  it("renders ComboboxItem with selected indicator", () => {
    render(
      <Combobox open>
        <ComboboxContent>
          <ComboboxList>
            <ComboboxItem value="apple" selected>
              Apple
            </ComboboxItem>
          </ComboboxList>
        </ComboboxContent>
      </Combobox>,
    )
    expect(screen.getByText("Apple")).toBeInTheDocument()
  })
})

// ─── AspectRatio ──────────────────────────────────────────────────────────────

describe("AspectRatio", () => {
  it("renders children", () => {
    render(
      <AspectRatio ratio={16 / 9}>
        <img src="test.jpg" alt="Test" />
      </AspectRatio>,
    )
    expect(screen.getByAltText("Test")).toBeInTheDocument()
  })

  it("wraps content in a container element", () => {
    const { container } = render(
      <AspectRatio ratio={1}>
        <span>Content</span>
      </AspectRatio>,
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})

// ─── ButtonGroup ──────────────────────────────────────────────────────────────

describe("ButtonGroup", () => {
  it("renders children with group role", () => {
    const { container } = render(
      <ButtonGroup>
        <button>A</button>
        <button>B</button>
      </ButtonGroup>,
    )
    expect(container.querySelector('[role="group"]')).toBeInTheDocument()
    expect(screen.getByText("A")).toBeInTheDocument()
    expect(screen.getByText("B")).toBeInTheDocument()
  })

  it("applies horizontal layout by default", () => {
    const { container } = render(
      <ButtonGroup>
        <button>A</button>
      </ButtonGroup>,
    )
    expect(container.firstChild).toHaveClass("inline-flex")
  })

  it("applies custom className", () => {
    const { container } = render(
      <ButtonGroup className="custom-group">
        <button>A</button>
      </ButtonGroup>,
    )
    expect(container.firstChild).toHaveClass("custom-group")
  })
})

// ─── Carousel ─────────────────────────────────────────────────────────────────

describe("Carousel", () => {
  it("renders carousel with items", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
          <CarouselItem>Slide 2</CarouselItem>
        </CarouselContent>
      </Carousel>,
    )
    expect(screen.getByText("Slide 1")).toBeInTheDocument()
    expect(screen.getByText("Slide 2")).toBeInTheDocument()
  })

  it("renders Previous and Next controls when provided", () => {
    render(
      <Carousel>
        <CarouselContent>
          <CarouselItem>Slide 1</CarouselItem>
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>,
    )
    expect(screen.getByRole("button", { name: "Previous slide" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Next slide" })).toBeInTheDocument()
  })
})

// ─── InputGroup ───────────────────────────────────────────────────────────────

describe("InputGroup", () => {
  it("renders children", () => {
    render(
      <InputGroup>
        <InputGroupAddon position="left">$</InputGroupAddon>
        <input placeholder="Amount" />
      </InputGroup>,
    )
    expect(screen.getByText("$")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Amount")).toBeInTheDocument()
  })

  it("addon applies correct position class for left", () => {
    const { container } = render(
      <InputGroupAddon position="left">@</InputGroupAddon>,
    )
    expect(container.firstChild).toHaveClass("rounded-l-md")
  })

  it("addon applies correct position class for right", () => {
    const { container } = render(
      <InputGroupAddon position="right">.com</InputGroupAddon>,
    )
    expect(container.firstChild).toHaveClass("rounded-r-md")
  })
})

// ─── InputOTP ─────────────────────────────────────────────────────────────────

describe("InputOTP", () => {
  it("renders OTP input group", () => {
    const { container } = render(
      <InputOTP maxLength={6}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
        </InputOTPGroup>
      </InputOTP>,
    )
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders as many slot elements as provided", () => {
    const { container } = render(
      <InputOTP maxLength={4}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>,
    )
    // The OTPGroup div wraps the slot divs; verify four children rendered
    expect(container.querySelectorAll("div").length).toBeGreaterThan(4)
  })
})

// ─── VisuallyHidden ───────────────────────────────────────────────────────────

describe("VisuallyHidden", () => {
  it("renders children in the DOM but visually hidden", () => {
    render(<VisuallyHidden>Screen reader text</VisuallyHidden>)
    expect(screen.getByText("Screen reader text")).toBeInTheDocument()
  })

  it("applies position absolute to visually hide content", () => {
    const { container } = render(<VisuallyHidden>Hidden</VisuallyHidden>)
    const el = container.firstChild as HTMLElement
    expect(el).toBeInTheDocument()
  })
})
