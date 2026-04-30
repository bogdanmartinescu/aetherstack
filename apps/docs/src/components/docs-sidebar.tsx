"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@aetherstack/utils"
import { ThemeToggle, FontPicker } from "./theme-font-controls"
import {
  CommandPaletteDialog,
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandGroup,
  CommandItem,
} from "@aetherstack/patterns"

// ── Navigation data ───────────────────────────────────────────────────────────

const nav = [
  {
    group: "Getting started",
    section: "docs",
    items: [
      { label: "Introduction", href: "/introduction" },
      { label: "Installation", href: "/installation" },
      { label: "CLI", href: "/cli" },
      { label: "AI & LLMs", href: "/llms" },
      { label: "Pricing", href: "/pricing" },
    ],
  },
  {
    group: "Foundation",
    section: "docs",
    items: [
      { label: "Tokens", href: "/tokens" },
      { label: "Icons", href: "/icons" },
      { label: "Fonts", href: "/fonts" },
      { label: "Charts", href: "/charts" },
    ],
  },
  {
    group: "Components",
    section: "components",
    items: [
      { label: "Overview", href: "/components" },
      { label: "Accordion", href: "/components/accordion" },
      { label: "Alert", href: "/components/alert" },
      { label: "Alert Dialog", href: "/components/alert-dialog" },
      { label: "Avatar", href: "/components/avatar" },
      { label: "Badge", href: "/components/badge" },
      { label: "Button", href: "/components/button" },
      { label: "Calendar", href: "/components/calendar" },
      { label: "Card", href: "/components/card" },
      { label: "Checkbox", href: "/components/checkbox" },
      { label: "Collapsible", href: "/components/collapsible" },
      { label: "Combobox", href: "/components/combobox" },
      { label: "Context Menu", href: "/components/context-menu" },
      { label: "Dialog", href: "/components/dialog" },
      { label: "Drawer", href: "/components/drawer" },
      { label: "Dropdown Menu", href: "/components/dropdown-menu" },
      { label: "Hover Card", href: "/components/hover-card" },
      { label: "Input", href: "/components/input" },
      { label: "Kbd", href: "/components/kbd" },
      { label: "Label", href: "/components/label" },
      { label: "Pagination", href: "/components/pagination" },
      { label: "Popover", href: "/components/popover" },
      { label: "Progress", href: "/components/progress" },
      { label: "Radio Group", href: "/components/radio-group" },
      { label: "Scroll Area", href: "/components/scroll-area" },
      { label: "Select", href: "/components/select" },
      { label: "Separator", href: "/components/separator" },
      { label: "Sheet", href: "/components/sheet" },
      { label: "Skeleton", href: "/components/skeleton" },
      { label: "Slider", href: "/components/slider" },
      { label: "Spinner", href: "/components/spinner" },
      { label: "Switch", href: "/components/switch" },
      { label: "Table", href: "/components/table" },
      { label: "Tabs", href: "/components/tabs" },
      { label: "Textarea", href: "/components/textarea" },
      { label: "Toast", href: "/components/toast" },
      { label: "Toggle", href: "/components/toggle" },
      { label: "Toggle Group", href: "/components/toggle-group" },
      { label: "Tooltip", href: "/components/tooltip" },
    ],
  },
  {
    group: "Patterns",
    section: "patterns",
    items: [
      { label: "Overview", href: "/patterns" },
      { label: "Activity Feed", href: "/patterns/activity-feed" },
      { label: "Breadcrumb", href: "/patterns/breadcrumb" },
      { label: "Color Picker", href: "/patterns/color-picker" },
      { label: "Command Palette", href: "/patterns/command-palette" },
      { label: "Data Table", href: "/patterns/data-table" },
      { label: "Empty State", href: "/patterns/empty-state" },
      { label: "Error State", href: "/patterns/error-state" },
      { label: "File Dropzone", href: "/patterns/file-dropzone" },
      { label: "Filter Toolbar", href: "/patterns/filter-toolbar" },
      { label: "Form Field", href: "/patterns/form-field" },
      { label: "Login Form", href: "/patterns/login-form" },
      { label: "Sign Up Form", href: "/patterns/signup-form" },
      { label: "Profile Form", href: "/patterns/profile-form" },
      { label: "Contact Form", href: "/patterns/contact-form" },
      { label: "Kanban", href: "/patterns/kanban" },
      { label: "Loading State", href: "/patterns/loading-state" },
      { label: "Metric Card", href: "/patterns/metric-card" },
      { label: "Page Header", href: "/patterns/page-header" },
      { label: "Section Header", href: "/patterns/section-header" },
      { label: "Settings Section", href: "/patterns/settings-section" },
      { label: "Sidebar Nav", href: "/patterns/nav" },
      { label: "Stat Group", href: "/patterns/stat-group" },
      { label: "Stepper", href: "/patterns/stepper" },
      { label: "Table Toolbar", href: "/patterns/table-toolbar" },
    ],
  },
  {
    group: "Forms",
    section: "forms",
    items: [
      { label: "React Hook Form", href: "/forms/react-hook-form" },
    ],
  },
  {
    group: "Blocks",
    section: "blocks",
    items: [
      { label: "Overview", href: "/blocks" },
      { label: "Dashboard Shell", href: "/blocks/dashboard-shell" },
      { label: "Login", href: "/blocks/login-block" },
      { label: "Sign Up", href: "/blocks/signup-block" },
      { label: "Empty Dashboard", href: "/blocks/empty-dashboard" },
      { label: "Onboarding Checklist", href: "/blocks/onboarding-checklist" },
      { label: "Account Settings", href: "/blocks/account-settings" },
      { label: "Team Settings", href: "/blocks/team-settings" },
      { label: "Billing Overview", href: "/blocks/billing-overview" },
      { label: "Notification Center", href: "/blocks/notification-center" },
      { label: "Pricing Section", href: "/blocks/pricing-section" },
    ],
  },
]

// Flat list of all items used for search
const allItems = nav.flatMap((g) =>
  g.items.map((item) => ({ ...item, group: g.group })),
)

// Top-level header nav links
const topNav = [
  { label: "Docs", href: "/introduction", match: ["/introduction", "/installation", "/cli", "/tokens", "/icons", "/fonts", "/llms", "/pricing", "/charts"] },
  { label: "Components", href: "/components", match: ["/components"] },
  { label: "Patterns", href: "/patterns", match: ["/patterns"] },
  { label: "Forms", href: "/forms/react-hook-form", match: ["/forms"] },
  { label: "Blocks", href: "/blocks", match: ["/blocks"] },
]

// Determine which section the current pathname belongs to
function getSection(pathname: string): string {
  if (pathname.startsWith("/components")) return "components"
  if (pathname.startsWith("/patterns")) return "patterns"
  if (pathname.startsWith("/forms")) return "forms"
  if (pathname.startsWith("/blocks")) return "blocks"
  return "docs"
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function GitHubIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0 0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
    </svg>
  )
}

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

// ── Sidebar nav item ──────────────────────────────────────────────────────────

function NavItem({ href, label }: { href: string; label: string }) {
  const pathname = usePathname()
  const active = pathname === href
  return (
    <Link
      href={href}
      className={cn(
        "block rounded-md px-3 py-1.5 text-sm transition-colors",
        active
          ? "bg-accent text-accent-foreground font-medium"
          : "text-muted-foreground hover:text-foreground hover:bg-muted",
      )}
    >
      {label}
    </Link>
  )
}

// ── Top nav link ──────────────────────────────────────────────────────────────

function TopNavLink({
  href,
  label,
  match,
}: {
  href: string
  label: string
  match: string[]
}) {
  const pathname = usePathname()
  const active = match.some((prefix) => pathname === prefix || pathname.startsWith(prefix + "/"))
  return (
    <Link
      href={href}
      className={cn(
        "text-sm transition-colors",
        active
          ? "text-foreground font-medium"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {label}
    </Link>
  )
}

// ── DocsSearch ────────────────────────────────────────────────────────────────

function DocsSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const openSearch = useCallback(() => setOpen(true), [])

  // ⌘K / Ctrl+K shortcut
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        openSearch()
      }
    }
    document.addEventListener("keydown", handleKey)
    return () => document.removeEventListener("keydown", handleKey)
  }, [openSearch])

  function handleSelect(href: string) {
    setOpen(false)
    router.push(href)
  }

  // Group items by their nav group for display
  const groups = nav.map((g) => ({ group: g.group, items: g.items }))

  return (
    <>
      <button
        onClick={openSearch}
        className="hidden h-8 items-center gap-2 rounded-md border border-border bg-muted/40 px-3 text-xs text-muted-foreground transition-colors hover:bg-muted hover:text-foreground sm:flex"
        aria-label="Search documentation"
      >
        <SearchIcon />
        <span>Search docs...</span>
        <kbd className="ml-2 hidden rounded border border-border bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground lg:inline-flex">
          ⌘K
        </kbd>
      </button>

      <CommandPaletteDialog open={open} onOpenChange={setOpen}>
        <CommandPalette>
          <CommandPaletteInput placeholder="Search docs…" />
          <CommandPaletteList>
            <CommandPaletteEmpty>No results found.</CommandPaletteEmpty>
            {groups.map((g) => (
              <CommandGroup key={g.group} heading={g.group}>
                {g.items.map((item) => (
                  <CommandItem
                    key={item.href}
                    value={`${g.group} ${item.label} ${item.href}`}
                    onSelect={() => handleSelect(item.href)}
                  >
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ))}
          </CommandPaletteList>
        </CommandPalette>
      </CommandPaletteDialog>
    </>
  )
}

// ── Sidebar ───────────────────────────────────────────────────────────────────

export function DocsSidebar() {
  const pathname = usePathname()
  const section = getSection(pathname)
  const visibleGroups = nav.filter((g) => g.section === section)

  return (
    <nav className="space-y-6">
      {visibleGroups.map((g) => (
        <div key={g.group}>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {g.group}
          </p>
          <div className="space-y-0.5">
            {g.items.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

// ── Mobile toggle ─────────────────────────────────────────────────────────────

export function MobileSidebarToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center justify-center rounded-md p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground lg:hidden"
      aria-label={open ? "Close navigation" : "Open navigation"}
    >
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        {open ? (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        ) : (
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        )}
      </svg>
    </button>
  )
}

// ── DocsShell ─────────────────────────────────────────────────────────────────

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-14 max-w-[90rem] items-center gap-4 px-4 sm:px-6">

          {/* Logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center gap-2"
            aria-label="Aether UI home"
          >
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary text-[10px] font-bold text-primary-foreground">
              A
            </div>
            <span className="font-semibold text-foreground text-sm">Aether UI</span>
          </Link>

          {/* Separator */}
          <div className="hidden h-5 w-px shrink-0 bg-border sm:block" aria-hidden="true" />

          {/* Top-level nav links */}
          <nav className="hidden items-center gap-5 sm:flex" aria-label="Main navigation">
            {topNav.map((link) => (
              <TopNavLink key={link.href} href={link.href} label={link.label} match={link.match} />
            ))}
          </nav>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right-side controls */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <DocsSearch />

            {/* Controls */}
            <div className="hidden items-center gap-2 sm:flex">
              <FontPicker />
              <ThemeToggle />
            </div>

            {/* GitHub */}
            <a
              href="https://github.com/aetherstack/aetherstack"
              target="_blank"
              rel="noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="GitHub repository"
            >
              <GitHubIcon />
            </a>

            {/* Mobile menu toggle */}
            <MobileSidebarToggle
              open={mobileOpen}
              onToggle={() => setMobileOpen((v) => !v)}
            />
          </div>
        </div>
      </header>

      {/* Page body */}
      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden w-56 shrink-0 py-10 lg:block">
            <div className="sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto pr-2">
              <DocsSidebar />
            </div>
          </aside>

          {/* Mobile sidebar overlay */}
          {mobileOpen && (
            <div className="fixed inset-0 z-30 lg:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileOpen(false)}
              />
              <aside className="absolute left-0 top-14 bottom-0 w-64 overflow-y-auto border-r border-border bg-background p-4">
                <DocsSidebar />
              </aside>
            </div>
          )}

          {/* Main content */}
          <main className="min-w-0 flex-1 py-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
