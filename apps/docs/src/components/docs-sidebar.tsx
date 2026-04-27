"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@aetherstack/utils"

const nav = [
  {
    group: "Getting started",
    items: [
      { label: "Introduction", href: "/introduction" },
      { label: "Installation", href: "/installation" },
      { label: "CLI", href: "/cli" },
    ],
  },
  {
    group: "Foundation",
    items: [
      { label: "Tokens", href: "/tokens" },
      { label: "Icons", href: "/icons" },
    ],
  },
  {
    group: "Components",
    items: [
      { label: "Overview", href: "/components" },
      { label: "Badge", href: "/components/badge" },
      { label: "Button", href: "/components/button" },
      { label: "Card", href: "/components/card" },
      { label: "Checkbox", href: "/components/checkbox" },
      { label: "Dialog", href: "/components/dialog" },
      { label: "Input", href: "/components/input" },
      { label: "Label", href: "/components/label" },
      { label: "Radio Group", href: "/components/radio-group" },
      { label: "Select", href: "/components/select" },
      { label: "Sheet", href: "/components/sheet" },
      { label: "Skeleton", href: "/components/skeleton" },
      { label: "Switch", href: "/components/switch" },
      { label: "Table", href: "/components/table" },
      { label: "Tabs", href: "/components/tabs" },
      { label: "Textarea", href: "/components/textarea" },
      { label: "Tooltip", href: "/components/tooltip" },
    ],
  },
]

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

export function DocsSidebar() {
  return (
    <nav className="space-y-6">
      {nav.map((section) => (
        <div key={section.group}>
          <p className="mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {section.group}
          </p>
          <div className="space-y-0.5">
            {section.items.map((item) => (
              <NavItem key={item.href} href={item.href} label={item.label} />
            ))}
          </div>
        </div>
      ))}
    </nav>
  )
}

export function MobileSidebarToggle({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted lg:hidden"
      aria-label={open ? "Close navigation" : "Open navigation"}
    >
      <svg
        className="h-4 w-4"
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
      Menu
    </button>
  )
}

export function DocsShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-[90rem] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-sm font-bold text-foreground">Aether UI</span>
            </Link>
            <span className="hidden text-muted-foreground sm:block">/</span>
            <Link
              href="/components/button"
              className="hidden text-sm text-muted-foreground hover:text-foreground transition-colors sm:block"
            >
              Components
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <MobileSidebarToggle open={mobileOpen} onToggle={() => setMobileOpen((v) => !v)} />
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-2 rounded-md border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground sm:flex"
            >
              GitHub
            </a>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[90rem] px-4 sm:px-6">
        <div className="flex gap-8">
          {/* Sidebar — desktop */}
          <aside className="hidden w-56 shrink-0 py-10 lg:block">
            <div className="sticky top-20">
              <DocsSidebar />
            </div>
          </aside>

          {/* Mobile sidebar */}
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
