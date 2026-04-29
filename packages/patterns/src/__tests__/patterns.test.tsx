import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import {
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  useFormField,
} from "../components/form-field"
import { PageHeader, Breadcrumb } from "../components/page-header"
import { SectionHeader, SettingsSection } from "../components/section-header"
import { EmptyState } from "../components/empty-state"
import { LoadingState } from "../components/loading-state"
import { ErrorState } from "../components/error-state"
import { MetricCard } from "../components/metric-card"
import { FilterPill, FilterToolbar, TableToolbar } from "../components/table-toolbar"
import { NavItem, NavGroup, SidebarNav } from "../components/nav"

// ─── FormField ────────────────────────────────────────────────────────────────

describe("FormField", () => {
  it("renders children", () => {
    render(
      <FormField name="email">
        <span>child</span>
      </FormField>,
    )
    expect(screen.getByText("child")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <FormField name="email" className="custom-class">
        <span>x</span>
      </FormField>,
    )
    expect(container.firstChild).toHaveClass("custom-class")
  })
})

describe("FormLabel", () => {
  it("renders label text", () => {
    render(
      <FormField name="email">
        <FormLabel>Email</FormLabel>
      </FormField>,
    )
    expect(screen.getByText("Email")).toBeInTheDocument()
  })

  it("shows required asterisk when required prop is set", () => {
    render(
      <FormField name="email" required>
        <FormLabel>Email</FormLabel>
      </FormField>,
    )
    expect(screen.getByText("*")).toBeInTheDocument()
  })

  it("does not show asterisk without required", () => {
    render(
      <FormField name="email">
        <FormLabel>Email</FormLabel>
      </FormField>,
    )
    expect(screen.queryByText("*")).not.toBeInTheDocument()
  })
})

describe("FormControl", () => {
  it("passes id from context to child element", () => {
    render(
      <FormField name="email">
        <FormControl>
          <input type="email" />
        </FormControl>
      </FormField>,
    )
    expect(screen.getByRole("textbox")).toHaveAttribute("id", "field-email")
  })

  it("sets aria-invalid when error is present", () => {
    render(
      <FormField name="email" error="Invalid email">
        <FormControl>
          <input type="email" />
        </FormControl>
      </FormField>,
    )
    expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true")
  })

  it("does not set aria-invalid without error", () => {
    render(
      <FormField name="email">
        <FormControl>
          <input type="email" />
        </FormControl>
      </FormField>,
    )
    expect(screen.getByRole("textbox")).not.toHaveAttribute("aria-invalid")
  })
})

describe("FormDescription", () => {
  it("renders description text", () => {
    render(
      <FormField name="email">
        <FormDescription>Enter your work email</FormDescription>
      </FormField>,
    )
    expect(screen.getByText("Enter your work email")).toBeInTheDocument()
  })
})

describe("FormMessage", () => {
  it("renders error message from prop", () => {
    render(
      <FormField name="email" error="Invalid email">
        <FormMessage />
      </FormField>,
    )
    expect(screen.getByRole("alert")).toHaveTextContent("Invalid email")
  })

  it("renders children as message when no error", () => {
    render(
      <FormField name="email">
        <FormMessage>Helper text</FormMessage>
      </FormField>,
    )
    expect(screen.getByText("Helper text")).toBeInTheDocument()
  })

  it("renders nothing when neither error nor children", () => {
    render(
      <FormField name="email">
        <FormMessage />
      </FormField>,
    )
    expect(screen.queryByRole("alert")).not.toBeInTheDocument()
  })

  it("prefers error over children", () => {
    render(
      <FormField name="email" error="Error message">
        <FormMessage>Child text</FormMessage>
      </FormField>,
    )
    expect(screen.getByRole("alert")).toHaveTextContent("Error message")
    expect(screen.queryByText("Child text")).not.toBeInTheDocument()
  })
})

describe("useFormField — outside context", () => {
  it("throws when used outside FormField", () => {
    const Probe = () => {
      useFormField()
      return null
    }
    expect(() => render(<Probe />)).toThrow(
      "useFormField must be used within a FormField",
    )
  })
})

// ─── Breadcrumb ───────────────────────────────────────────────────────────────

describe("Breadcrumb", () => {
  it("renders all item labels", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Settings", href: "/settings" },
          { label: "Profile" },
        ]}
      />,
    )
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Settings")).toBeInTheDocument()
    expect(screen.getByText("Profile")).toBeInTheDocument()
  })

  it("renders intermediate items as links", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Profile" },
        ]}
      />,
    )
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/")
  })

  it("renders last item as non-link with aria-current", () => {
    render(
      <Breadcrumb
        items={[
          { label: "Home", href: "/" },
          { label: "Profile" },
        ]}
      />,
    )
    const last = screen.getByText("Profile")
    expect(last.tagName).toBe("SPAN")
    expect(last).toHaveAttribute("aria-current", "page")
  })

  it("has nav landmark with accessible label", () => {
    render(<Breadcrumb items={[{ label: "Home" }]} />)
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument()
  })
})

// ─── PageHeader ───────────────────────────────────────────────────────────────

describe("PageHeader", () => {
  it("renders title", () => {
    render(<PageHeader title="Users" />)
    expect(screen.getByRole("heading", { name: "Users" })).toBeInTheDocument()
  })

  it("renders optional description", () => {
    render(<PageHeader title="Users" description="Manage your team members" />)
    expect(screen.getByText("Manage your team members")).toBeInTheDocument()
  })

  it("does not render description when omitted", () => {
    render(<PageHeader title="Users" />)
    expect(screen.queryByText("Manage your team members")).not.toBeInTheDocument()
  })

  it("renders breadcrumb when provided", () => {
    render(
      <PageHeader
        title="Profile"
        breadcrumb={[{ label: "Settings", href: "/settings" }, { label: "Profile" }]}
      />,
    )
    expect(screen.getByRole("navigation", { name: "Breadcrumb" })).toBeInTheDocument()
  })

  it("renders actions slot", () => {
    render(<PageHeader title="Users" actions={<button>Invite</button>} />)
    expect(screen.getByRole("button", { name: "Invite" })).toBeInTheDocument()
  })

  it("does not render breadcrumb nav when breadcrumb is empty", () => {
    render(<PageHeader title="Users" breadcrumb={[]} />)
    expect(screen.queryByRole("navigation", { name: "Breadcrumb" })).not.toBeInTheDocument()
  })
})

// ─── SectionHeader ────────────────────────────────────────────────────────────

describe("SectionHeader", () => {
  it("renders title", () => {
    render(<SectionHeader title="General" />)
    expect(screen.getByRole("heading", { name: "General" })).toBeInTheDocument()
  })

  it("defaults to h2", () => {
    render(<SectionHeader title="General" />)
    expect(screen.getByRole("heading", { name: "General" }).tagName).toBe("H2")
  })

  it("respects `as` prop", () => {
    render(<SectionHeader title="General" as="h3" />)
    expect(screen.getByRole("heading", { name: "General" }).tagName).toBe("H3")
  })

  it("renders optional description", () => {
    render(<SectionHeader title="General" description="Basic settings" />)
    expect(screen.getByText("Basic settings")).toBeInTheDocument()
  })

  it("renders action slot", () => {
    render(<SectionHeader title="General" action={<button>Edit</button>} />)
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument()
  })
})

// ─── SettingsSection ──────────────────────────────────────────────────────────

describe("SettingsSection", () => {
  it("renders title in header", () => {
    render(<SettingsSection title="Profile"><p>content</p></SettingsSection>)
    expect(screen.getByRole("heading", { name: "Profile" })).toBeInTheDocument()
  })

  it("renders children in content area", () => {
    render(<SettingsSection title="Profile"><p>content</p></SettingsSection>)
    expect(screen.getByText("content")).toBeInTheDocument()
  })

  it("renders optional footer", () => {
    render(
      <SettingsSection title="Profile" footer={<button>Save</button>}>
        <p>content</p>
      </SettingsSection>,
    )
    expect(screen.getByRole("button", { name: "Save" })).toBeInTheDocument()
  })

  it("does not render footer when not provided", () => {
    const { container } = render(
      <SettingsSection title="Profile"><p>content</p></SettingsSection>,
    )
    expect(container.querySelector(".rounded-b-lg")).not.toBeInTheDocument()
  })
})

// ─── EmptyState ───────────────────────────────────────────────────────────────

describe("EmptyState", () => {
  it("renders title", () => {
    render(<EmptyState title="No results" />)
    expect(screen.getByRole("heading", { name: "No results" })).toBeInTheDocument()
  })

  it("renders optional description", () => {
    render(<EmptyState title="No results" description="Try a different search" />)
    expect(screen.getByText("Try a different search")).toBeInTheDocument()
  })

  it("renders primary action", () => {
    render(<EmptyState title="No results" action={<button>Add item</button>} />)
    expect(screen.getByRole("button", { name: "Add item" })).toBeInTheDocument()
  })

  it("renders secondary action", () => {
    render(
      <EmptyState
        title="No results"
        action={<button>Add item</button>}
        secondaryAction={<button>Import</button>}
      />,
    )
    expect(screen.getByRole("button", { name: "Import" })).toBeInTheDocument()
  })

  it("renders icon slot", () => {
    render(<EmptyState title="No results" icon={<svg data-testid="icon" />} />)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("does not render icon wrapper when icon is omitted", () => {
    render(<EmptyState title="No results" />)
    expect(screen.queryByTestId("icon")).not.toBeInTheDocument()
  })
})

// ─── LoadingState ─────────────────────────────────────────────────────────────

describe("LoadingState", () => {
  it("renders spinner variant by default with aria-busy", () => {
    const { container } = render(<LoadingState />)
    expect(container.firstChild).toHaveAttribute("aria-busy", "true")
  })

  it("renders default loading text", () => {
    render(<LoadingState />)
    expect(screen.getByText("Loading…")).toBeInTheDocument()
  })

  it("renders custom text", () => {
    render(<LoadingState text="Fetching data…" />)
    expect(screen.getByText("Fetching data…")).toBeInTheDocument()
  })

  it("renders skeleton variant", () => {
    const { container } = render(<LoadingState variant="skeleton" />)
    expect(container.firstChild).toHaveAttribute("aria-busy", "true")
  })

  it("skeleton renders correct number of rows", () => {
    const { container } = render(<LoadingState variant="skeleton" rows={3} />)
    const rows = container.querySelectorAll(".flex.items-center.gap-3")
    expect(rows).toHaveLength(3)
  })
})

// ─── ErrorState ───────────────────────────────────────────────────────────────

describe("ErrorState", () => {
  it("renders default title", () => {
    render(<ErrorState />)
    expect(screen.getByText("Something went wrong")).toBeInTheDocument()
  })

  it("renders custom title", () => {
    render(<ErrorState title="Load failed" />)
    expect(screen.getByText("Load failed")).toBeInTheDocument()
  })

  it("renders description", () => {
    render(<ErrorState description="Check your connection" />)
    expect(screen.getByText("Check your connection")).toBeInTheDocument()
  })

  it("renders action slot", () => {
    render(<ErrorState action={<button>Retry</button>} />)
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument()
  })

  it("has role alert for screen readers", () => {
    render(<ErrorState />)
    expect(screen.getByRole("alert")).toBeInTheDocument()
  })
})

// ─── MetricCard ───────────────────────────────────────────────────────────────

describe("MetricCard", () => {
  it("renders label and value", () => {
    render(<MetricCard label="Revenue" value="$12,400" />)
    expect(screen.getByText("Revenue")).toBeInTheDocument()
    expect(screen.getByText("$12,400")).toBeInTheDocument()
  })

  it("renders numeric value", () => {
    render(<MetricCard label="Users" value={1024} />)
    expect(screen.getByText("1024")).toBeInTheDocument()
  })

  it("renders optional sublabel", () => {
    render(<MetricCard label="Revenue" value="$12,400" sublabel="vs last month" />)
    expect(screen.getByText("vs last month")).toBeInTheDocument()
  })

  it("renders change badge", () => {
    render(<MetricCard label="Revenue" value="$12,400" change="+8%" trend="up" />)
    expect(screen.getByText("+8%")).toBeInTheDocument()
  })

  it("renders icon slot", () => {
    render(<MetricCard label="Revenue" value="$12,400" icon={<svg data-testid="icon" />} />)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("does not render change badge when change is omitted", () => {
    render(<MetricCard label="Revenue" value="$12,400" />)
    expect(screen.queryByText("+8%")).not.toBeInTheDocument()
  })
})

// ─── FilterPill ───────────────────────────────────────────────────────────────

describe("FilterPill", () => {
  it("renders label text", () => {
    render(<FilterPill label="Status: Active" />)
    expect(screen.getByText("Status: Active")).toBeInTheDocument()
  })

  it("renders remove button when onRemove is provided", () => {
    render(<FilterPill label="Status: Active" onRemove={() => {}} />)
    expect(screen.getByRole("button", { name: /Remove filter: Status: Active/i })).toBeInTheDocument()
  })

  it("does not render remove button without onRemove", () => {
    render(<FilterPill label="Status: Active" />)
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("calls onRemove when remove button is clicked", async () => {
    const onRemove = vi.fn()
    render(<FilterPill label="Status: Active" onRemove={onRemove} />)
    await userEvent.click(screen.getByRole("button"))
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})

// ─── FilterToolbar ────────────────────────────────────────────────────────────

describe("FilterToolbar", () => {
  it("renders without crashing when no filters", () => {
    const { container } = render(<FilterToolbar />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders active filter pills", () => {
    const filters = [
      { id: "1", label: "Status: Active", onRemove: () => {} },
      { id: "2", label: "Role: Admin", onRemove: () => {} },
    ]
    render(<FilterToolbar activeFilters={filters} />)
    expect(screen.getByText("Status: Active")).toBeInTheDocument()
    expect(screen.getByText("Role: Admin")).toBeInTheDocument()
  })

  it("renders Clear all button when onClearAll and filters are present", () => {
    const filters = [{ id: "1", label: "Status: Active", onRemove: () => {} }]
    render(<FilterToolbar activeFilters={filters} onClearAll={() => {}} />)
    expect(screen.getByRole("button", { name: "Clear all" })).toBeInTheDocument()
  })

  it("calls onClearAll when clicked", async () => {
    const onClearAll = vi.fn()
    const filters = [{ id: "1", label: "Status: Active", onRemove: () => {} }]
    render(<FilterToolbar activeFilters={filters} onClearAll={onClearAll} />)
    await userEvent.click(screen.getByRole("button", { name: "Clear all" }))
    expect(onClearAll).toHaveBeenCalledTimes(1)
  })

  it("does not render Clear all when there are no filters", () => {
    render(<FilterToolbar activeFilters={[]} onClearAll={() => {}} />)
    expect(screen.queryByRole("button", { name: "Clear all" })).not.toBeInTheDocument()
  })

  it("renders children slot", () => {
    render(<FilterToolbar><button>Filter</button></FilterToolbar>)
    expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument()
  })
})

// ─── TableToolbar ─────────────────────────────────────────────────────────────

describe("TableToolbar", () => {
  it("renders without crashing when all slots are empty", () => {
    const { container } = render(<TableToolbar />)
    expect(container.firstChild).toBeInTheDocument()
  })

  it("renders search slot", () => {
    render(<TableToolbar search={<input placeholder="Search…" />} />)
    expect(screen.getByPlaceholderText("Search…")).toBeInTheDocument()
  })

  it("renders filters slot", () => {
    render(<TableToolbar filters={<button>Filter</button>} />)
    expect(screen.getByRole("button", { name: "Filter" })).toBeInTheDocument()
  })

  it("renders actions slot", () => {
    render(<TableToolbar actions={<button>Export</button>} />)
    expect(screen.getByRole("button", { name: "Export" })).toBeInTheDocument()
  })

  it("does not render actions wrapper when actions is omitted", () => {
    const { container } = render(<TableToolbar search={<input />} />)
    const actionSlots = container.querySelectorAll(".shrink-0")
    expect(actionSlots).toHaveLength(0)
  })
})

// ─── NavItem ──────────────────────────────────────────────────────────────────

describe("NavItem", () => {
  it("renders label", () => {
    render(<NavItem label="Dashboard" href="/dashboard" />)
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
  })

  it("is an anchor with correct href", () => {
    render(<NavItem label="Dashboard" href="/dashboard" />)
    expect(screen.getByRole("link", { name: "Dashboard" })).toHaveAttribute(
      "href",
      "/dashboard",
    )
  })

  it("has aria-current=page when active", () => {
    render(<NavItem label="Dashboard" href="/dashboard" active />)
    expect(screen.getByRole("link")).toHaveAttribute("aria-current", "page")
  })

  it("has no aria-current when not active", () => {
    render(<NavItem label="Dashboard" href="/dashboard" />)
    expect(screen.getByRole("link")).not.toHaveAttribute("aria-current")
  })

  it("has aria-disabled and tabIndex=-1 when disabled", () => {
    render(<NavItem label="Dashboard" href="/dashboard" disabled />)
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("aria-disabled", "true")
    expect(link).toHaveAttribute("tabindex", "-1")
  })

  it("renders badge", () => {
    render(<NavItem label="Notifications" href="/notifications" badge={5} />)
    expect(screen.getByText("5")).toBeInTheDocument()
  })

  it("renders icon slot", () => {
    render(<NavItem label="Dashboard" href="/dashboard" icon={<svg data-testid="icon" />} />)
    expect(screen.getByTestId("icon")).toBeInTheDocument()
  })

  it("calls onClick handler", async () => {
    const onClick = vi.fn()
    render(<NavItem label="Dashboard" href="/dashboard" onClick={onClick} />)
    await userEvent.click(screen.getByRole("link"))
    expect(onClick).toHaveBeenCalledTimes(1)
  })
})

// ─── NavGroup ─────────────────────────────────────────────────────────────────

describe("NavGroup", () => {
  it("renders children", () => {
    render(
      <NavGroup label="Main">
        <NavItem label="Dashboard" href="/dashboard" />
      </NavGroup>,
    )
    expect(screen.getByText("Dashboard")).toBeInTheDocument()
  })

  it("renders label as static text when not collapsible", () => {
    render(
      <NavGroup label="Main">
        <span>item</span>
      </NavGroup>,
    )
    expect(screen.getByText("Main")).toBeInTheDocument()
    expect(screen.queryByRole("button")).not.toBeInTheDocument()
  })

  it("renders label as button when collapsible", () => {
    render(
      <NavGroup label="Main" collapsible>
        <span>item</span>
      </NavGroup>,
    )
    expect(screen.getByRole("button", { name: "Main" })).toBeInTheDocument()
  })

  it("toggles children on button click when collapsible", async () => {
    render(
      <NavGroup label="Main" collapsible>
        <span>item</span>
      </NavGroup>,
    )
    expect(screen.getByText("item")).toBeInTheDocument()
    await userEvent.click(screen.getByRole("button"))
    expect(screen.queryByText("item")).not.toBeInTheDocument()
    await userEvent.click(screen.getByRole("button"))
    expect(screen.getByText("item")).toBeInTheDocument()
  })

  it("starts collapsed when defaultCollapsed=true", () => {
    render(
      <NavGroup label="Main" collapsible defaultCollapsed>
        <span>item</span>
      </NavGroup>,
    )
    expect(screen.queryByText("item")).not.toBeInTheDocument()
  })
})

// ─── SidebarNav ───────────────────────────────────────────────────────────────

describe("SidebarNav", () => {
  it("renders with nav landmark", () => {
    render(
      <SidebarNav>
        <NavItem label="Home" href="/" />
      </SidebarNav>,
    )
    expect(
      screen.getByRole("navigation", { name: "Sidebar navigation" }),
    ).toBeInTheDocument()
  })

  it("renders children", () => {
    render(
      <SidebarNav>
        <NavItem label="Home" href="/" />
        <NavItem label="Settings" href="/settings" />
      </SidebarNav>,
    )
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Settings")).toBeInTheDocument()
  })
})
