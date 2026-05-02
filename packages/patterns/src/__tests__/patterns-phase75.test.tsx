import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { SearchInput } from "../components/search-input"
import { ConfirmDialog } from "../components/confirm-dialog"
import { NotificationBell } from "../components/notification-bell"
import { ProfileDropdown } from "../components/profile-dropdown"
import { InlineEdit } from "../components/inline-edit"
import { ThemeSwitcher } from "../components/theme-switcher"
import { ChatMessageList } from "../components/chat-message-list"
import { UploadProgress } from "../components/upload-progress"
import { TimelineFeed } from "../components/timeline-feed"
import { DateRangePicker } from "../components/date-range-picker"
import { MultiSelect } from "../components/multi-select"
import { SortableList } from "../components/sortable-list"

// ─── SearchInput ──────────────────────────────────────────────────────────────

describe("SearchInput", () => {
  it("renders an input", () => {
    render(<SearchInput />)
    expect(screen.getByRole("searchbox")).toBeInTheDocument()
  })

  it("shows placeholder text", () => {
    render(<SearchInput placeholder="Search users…" />)
    expect(screen.getByPlaceholderText("Search users…")).toBeInTheDocument()
  })

  it("calls onValueChange as user types", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<SearchInput onValueChange={onValueChange} />)
    await user.type(screen.getByRole("searchbox"), "abc")
    expect(onValueChange).toHaveBeenCalledTimes(3)
  })

  it("shows clear button when value is present", async () => {
    const user = userEvent.setup()
    render(<SearchInput />)
    await user.type(screen.getByRole("searchbox"), "hello")
    expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument()
  })

  it("clears value on clear button click", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<SearchInput onValueChange={onValueChange} />)
    const input = screen.getByRole("searchbox")
    await user.type(input, "abc")
    await user.click(screen.getByRole("button", { name: /clear/i }))
    expect(onValueChange).toHaveBeenLastCalledWith("")
  })

  it("renders shortcut badge when shortcut is provided", () => {
    render(<SearchInput shortcut="⌘K" />)
    expect(screen.getByText("⌘K")).toBeInTheDocument()
  })
})

// ─── ConfirmDialog ────────────────────────────────────────────────────────────

describe("ConfirmDialog", () => {
  it("renders trigger slot when provided as children", () => {
    render(
      <ConfirmDialog title="Delete item" onConfirm={() => {}}>
        <button>Delete</button>
      </ConfirmDialog>,
    )
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument()
  })

  it("opens on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <ConfirmDialog title="Confirm action" onConfirm={() => {}}>
        <button>Open</button>
      </ConfirmDialog>,
    )
    await user.click(screen.getByRole("button", { name: "Open" }))
    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Confirm action" })).toBeInTheDocument()
  })

  it("calls onConfirm when confirm button is clicked", async () => {
    const user = userEvent.setup()
    const onConfirm = vi.fn()
    render(
      <ConfirmDialog
        title="Delete"
        open
        onOpenChange={() => {}}
        onConfirm={onConfirm}
      />,
    )
    await user.click(screen.getByRole("button", { name: /confirm/i }))
    expect(onConfirm).toHaveBeenCalledOnce()
  })

  it("calls onCancel when cancel button is clicked", async () => {
    const user = userEvent.setup()
    const onCancel = vi.fn()
    render(
      <ConfirmDialog
        title="Delete"
        open
        onOpenChange={() => {}}
        onConfirm={() => {}}
        onCancel={onCancel}
      />,
    )
    await user.click(screen.getByRole("button", { name: /cancel/i }))
    expect(onCancel).toHaveBeenCalledOnce()
  })
})

// ─── NotificationBell ────────────────────────────────────────────────────────

describe("NotificationBell", () => {
  it("renders the bell trigger button", () => {
    render(<NotificationBell />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("renders unread count badge when count is provided", () => {
    render(<NotificationBell count={5} />)
    expect(screen.getByText("5")).toBeInTheDocument()
  })

  it("does not render badge when count is 0", () => {
    render(<NotificationBell count={0} />)
    expect(screen.queryByText("0")).not.toBeInTheDocument()
  })

  it("opens dropdown on trigger click", async () => {
    const user = userEvent.setup()
    render(
      <NotificationBell
        notifications={[
          { id: "1", title: "New message", timestamp: "just now" },
        ]}
      />,
    )
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("New message")).toBeInTheDocument()
  })
})

// ─── ProfileDropdown ─────────────────────────────────────────────────────────

describe("ProfileDropdown", () => {
  const aliceUser = { name: "Alice", email: "alice@example.com" }
  const bobUser = { name: "Bob", email: "bob@example.com" }

  it("renders trigger button", () => {
    render(<ProfileDropdown user={aliceUser} />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("opens dropdown and shows name + email on trigger click", async () => {
    const user = userEvent.setup()
    render(<ProfileDropdown user={aliceUser} />)
    await user.click(screen.getByRole("button"))
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText("alice@example.com")).toBeInTheDocument()
  })

  it("renders sign out option in dropdown", async () => {
    const user = userEvent.setup()
    render(<ProfileDropdown user={bobUser} onSignOut={() => {}} />)
    await user.click(screen.getByRole("button"))
    expect(screen.getByRole("menuitem", { name: /sign out/i })).toBeInTheDocument()
  })

  it("calls onSignOut when sign out is clicked", async () => {
    const user = userEvent.setup()
    const onSignOut = vi.fn()
    render(<ProfileDropdown user={bobUser} onSignOut={onSignOut} />)
    await user.click(screen.getByRole("button"))
    await user.click(screen.getByRole("menuitem", { name: /sign out/i }))
    expect(onSignOut).toHaveBeenCalledOnce()
  })
})

// ─── InlineEdit ───────────────────────────────────────────────────────────────

describe("InlineEdit", () => {
  it("renders value in display mode", () => {
    render(<InlineEdit value="Initial text" />)
    expect(screen.getByText("Initial text")).toBeInTheDocument()
  })

  it("enters edit mode on click", async () => {
    const user = userEvent.setup()
    render(<InlineEdit value="Click me" />)
    await user.click(screen.getByText("Click me"))
    expect(screen.getByRole("textbox")).toBeInTheDocument()
  })

  it("calls onValueChange when edit is saved", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<InlineEdit value="Old text" onValueChange={onValueChange} />)
    await user.click(screen.getByText("Old text"))
    const input = screen.getByRole("textbox")
    await user.clear(input)
    await user.type(input, "New text")
    await user.keyboard("{Enter}")
    expect(onValueChange).toHaveBeenCalledWith("New text")
  })

  it("does not open edit mode when disabled and clicked", async () => {
    const user = userEvent.setup()
    render(<InlineEdit value="Read only" disabled />)
    const displayEl = screen.getByText("Read only")
    await user.click(displayEl)
    expect(screen.queryByRole("textbox")).not.toBeInTheDocument()
  })
})

// ─── ThemeSwitcher ────────────────────────────────────────────────────────────

describe("ThemeSwitcher", () => {
  it("renders trigger button", () => {
    render(<ThemeSwitcher />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("opens dropdown with theme options", async () => {
    const user = userEvent.setup()
    render(<ThemeSwitcher />)
    await user.click(screen.getByRole("button"))
    expect(screen.getByRole("menuitem", { name: /light/i })).toBeInTheDocument()
    expect(screen.getByRole("menuitem", { name: /dark/i })).toBeInTheDocument()
    expect(screen.getByRole("menuitem", { name: /system/i })).toBeInTheDocument()
  })
})

// ─── ChatMessageList ──────────────────────────────────────────────────────────

describe("ChatMessageList", () => {
  const messages = [
    { id: "1", role: "user" as const, content: "Hello there", name: "Alice" },
    { id: "2", role: "assistant" as const, content: "Hi! How can I help?", name: "AI" },
  ]

  it("renders all messages", () => {
    render(<ChatMessageList messages={messages} />)
    expect(screen.getByText("Hello there")).toBeInTheDocument()
    expect(screen.getByText("Hi! How can I help?")).toBeInTheDocument()
  })

  it("renders sender names", () => {
    render(<ChatMessageList messages={messages} />)
    expect(screen.getByText("Alice")).toBeInTheDocument()
    expect(screen.getByText("AI")).toBeInTheDocument()
  })
})

// ─── UploadProgress ───────────────────────────────────────────────────────────

describe("UploadProgress", () => {
  const files = [
    { id: "1", name: "document.pdf", progress: 60, status: "uploading" as const },
    { id: "2", name: "image.png", progress: 100, status: "done" as const },
    { id: "3", name: "broken.zip", progress: 0, status: "error" as const, error: "Upload failed" },
  ]

  it("renders file names", () => {
    render(<UploadProgress files={files} />)
    expect(screen.getByText("document.pdf")).toBeInTheDocument()
    expect(screen.getByText("image.png")).toBeInTheDocument()
    expect(screen.getByText("broken.zip")).toBeInTheDocument()
  })

  it("renders error message for errored files", () => {
    render(<UploadProgress files={files} />)
    expect(screen.getByText("Upload failed")).toBeInTheDocument()
  })

  it("renders progress bars for uploading files", () => {
    render(<UploadProgress files={files} />)
    expect(screen.getAllByRole("progressbar").length).toBeGreaterThan(0)
  })

  it("calls onRemove when remove is clicked on a done file", async () => {
    const user = userEvent.setup()
    const onRemove = vi.fn()
    render(<UploadProgress files={[files[1]]} onRemove={onRemove} />)
    await user.click(screen.getByRole("button", { name: /remove/i }))
    expect(onRemove).toHaveBeenCalledWith("2")
  })
})

// ─── TimelineFeed ─────────────────────────────────────────────────────────────

describe("TimelineFeed", () => {
  const items = [
    { id: "1", title: "Project created", timestamp: "Jan 1, 2024" },
    { id: "2", title: "First commit", description: "Initial setup", timestamp: "Jan 2, 2024" },
  ]

  it("renders timeline entry titles", () => {
    render(<TimelineFeed items={items} />)
    expect(screen.getByText("Project created")).toBeInTheDocument()
    expect(screen.getByText("First commit")).toBeInTheDocument()
  })

  it("renders descriptions when provided", () => {
    render(<TimelineFeed items={items} />)
    expect(screen.getByText("Initial setup")).toBeInTheDocument()
  })

  it("renders timestamps", () => {
    render(<TimelineFeed items={items} />)
    expect(screen.getByText("Jan 1, 2024")).toBeInTheDocument()
    expect(screen.getByText("Jan 2, 2024")).toBeInTheDocument()
  })
})

// ─── DateRangePicker ──────────────────────────────────────────────────────────

describe("DateRangePicker", () => {
  it("renders trigger button", () => {
    render(<DateRangePicker />)
    expect(screen.getByRole("button")).toBeInTheDocument()
  })

  it("shows placeholder text when no date selected", () => {
    render(<DateRangePicker placeholder="Pick a range" />)
    expect(screen.getByText("Pick a range")).toBeInTheDocument()
  })

  it("opens calendar on trigger click", async () => {
    const user = userEvent.setup()
    render(<DateRangePicker />)
    await user.click(screen.getByRole("button"))
    expect(screen.getAllByRole("grid").length).toBeGreaterThan(0)
  })

  it("is disabled when disabled prop is set", () => {
    render(<DateRangePicker disabled />)
    expect(screen.getByRole("button")).toBeDisabled()
  })
})

// ─── MultiSelect ─────────────────────────────────────────────────────────────

describe("MultiSelect", () => {
  const options = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "svelte", label: "Svelte" },
  ]

  it("renders trigger button with placeholder", () => {
    render(<MultiSelect options={options} placeholder="Select frameworks" />)
    expect(screen.getByText("Select frameworks")).toBeInTheDocument()
  })

  it("opens dropdown on trigger click", async () => {
    const user = userEvent.setup()
    render(<MultiSelect options={options} />)
    await user.click(screen.getByRole("combobox"))
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("Vue")).toBeInTheDocument()
  })

  it("calls onValueChange when an option is selected", async () => {
    const user = userEvent.setup()
    const onValueChange = vi.fn()
    render(<MultiSelect options={options} onValueChange={onValueChange} />)
    await user.click(screen.getByRole("combobox"))
    await user.click(screen.getByText("React"))
    expect(onValueChange).toHaveBeenCalledWith(["react"])
  })

  it("shows selected values as badges", () => {
    render(<MultiSelect options={options} value={["react", "vue"]} />)
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("Vue")).toBeInTheDocument()
  })
})

// ─── SortableList ─────────────────────────────────────────────────────────────

describe("SortableList", () => {
  const items = [
    { id: "1", label: "First item" },
    { id: "2", label: "Second item" },
    { id: "3", label: "Third item" },
  ]

  it("renders all items", () => {
    render(
      <SortableList
        items={items}
        onReorder={() => {}}
        renderItem={(item) => <span>{item.label}</span>}
      />,
    )
    expect(screen.getByText("First item")).toBeInTheDocument()
    expect(screen.getByText("Second item")).toBeInTheDocument()
    expect(screen.getByText("Third item")).toBeInTheDocument()
  })

  it("applies custom className", () => {
    const { container } = render(
      <SortableList
        items={items}
        onReorder={() => {}}
        renderItem={(item) => <span>{item.label}</span>}
        className="custom-sortable"
      />,
    )
    expect(container.firstChild).toHaveClass("custom-sortable")
  })
})
