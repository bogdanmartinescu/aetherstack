"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  LogOut,
  ChevronRight,
  CreditCard,
  FileText,
  HelpCircle,
} from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Input } from "@aetherstack/ui"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DashboardNavItem {
  icon?: React.ReactNode
  label: string
  href: string
  badge?: string | number
  active?: boolean
}

export interface DashboardNavGroup {
  label?: string
  items: DashboardNavItem[]
}

export interface DashboardShellProps {
  /** App / product name shown in the sidebar header */
  appName?: string
  /** Navigation groups */
  navGroups?: DashboardNavGroup[]
  /** User display name */
  userName?: string
  /** User email / role shown below name */
  userEmail?: string
  /** User avatar URL */
  userAvatarUrl?: string
  /** Topbar: page title or breadcrumb */
  pageTitle?: React.ReactNode
  /** Topbar: right-side actions */
  headerActions?: React.ReactNode
  /** Page content */
  children: React.ReactNode
  className?: string
}

// ── Default nav ────────────────────────────────────────────────────────────────

const DEFAULT_NAV: DashboardNavGroup[] = [
  {
    items: [
      { icon: <LayoutDashboard className="h-4 w-4" />, label: "Dashboard", href: "/dashboard", active: true },
      { icon: <Users className="h-4 w-4" />, label: "Users", href: "/users", badge: 4 },
      { icon: <BarChart3 className="h-4 w-4" />, label: "Analytics", href: "/analytics" },
      { icon: <CreditCard className="h-4 w-4" />, label: "Billing", href: "/billing" },
      { icon: <FileText className="h-4 w-4" />, label: "Reports", href: "/reports" },
    ],
  },
  {
    label: "Settings",
    items: [
      { icon: <Settings className="h-4 w-4" />, label: "General", href: "/settings" },
      { icon: <HelpCircle className="h-4 w-4" />, label: "Help & Support", href: "/support" },
    ],
  },
]

// ── NavItem ────────────────────────────────────────────────────────────────────

function SidebarNavItem({ item }: { item: DashboardNavItem }) {
  return (
    <a
      href={item.href}
      aria-current={item.active ? "page" : undefined}
      className={cn(
        "group flex items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
        item.active
          ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium"
          : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
      )}
    >
      {item.icon && (
        <span className="flex h-4 w-4 shrink-0 items-center justify-center">{item.icon}</span>
      )}
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge !== undefined && (
        <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-medium text-primary">
          {item.badge}
        </span>
      )}
    </a>
  )
}

// ── DashboardShell ─────────────────────────────────────────────────────────────

export function DashboardShell({
  appName = "Acme",
  navGroups = DEFAULT_NAV,
  userName = "Alex Johnson",
  userEmail = "alex@acme.com",
  pageTitle = "Dashboard",
  headerActions,
  children,
  className,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = React.useState(true)

  return (
    <div className={cn("flex h-screen overflow-hidden bg-background", className)}>
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside
        className={cn(
          "flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar-background transition-all duration-200",
          sidebarOpen ? "w-60" : "w-[60px]",
        )}
      >
        {/* Logo / app name */}
        <div className="flex h-14 items-center gap-2.5 border-b border-sidebar-border px-3">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-primary text-[11px] font-bold text-primary-foreground">
            {appName.charAt(0)}
          </div>
          {sidebarOpen && (
            <span className="truncate text-sm font-semibold text-sidebar-foreground">
              {appName}
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {navGroups.map((group, gi) => (
            <div key={gi} className="space-y-0.5">
              {group.label && sidebarOpen && (
                <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                  {group.label}
                </p>
              )}
              {group.items.map((item) =>
                sidebarOpen ? (
                  <SidebarNavItem key={item.href} item={item} />
                ) : (
                  <a
                    key={item.href}
                    href={item.href}
                    title={item.label}
                    aria-current={item.active ? "page" : undefined}
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors mx-auto",
                      item.active
                        ? "bg-sidebar-accent text-sidebar-accent-foreground"
                        : "text-sidebar-foreground/60 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                    )}
                  >
                    {item.icon}
                  </a>
                ),
              )}
            </div>
          ))}
        </nav>

        {/* User / bottom */}
        <div className="border-t border-sidebar-border p-2">
          {sidebarOpen ? (
            <div className="flex items-center gap-2.5 rounded-md px-2 py-2 hover:bg-sidebar-accent/50 transition-colors cursor-pointer">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                {userName.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-xs font-medium text-sidebar-foreground">{userName}</p>
                <p className="truncate text-[10px] text-sidebar-foreground/50">{userEmail}</p>
              </div>
              <LogOut className="h-3.5 w-3.5 shrink-0 text-sidebar-foreground/40" />
            </div>
          ) : (
            <div className="flex h-9 w-9 mx-auto items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary cursor-pointer">
              {userName.charAt(0)}
            </div>
          )}
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background px-4">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          {typeof pageTitle === "string" ? (
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">Home</span>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-medium text-foreground">{pageTitle}</span>
            </div>
          ) : (
            pageTitle
          )}

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search…"
                className="h-8 w-48 pl-8 text-xs"
              />
            </div>
            <button
              className="relative flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
            </button>
            {headerActions}
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  )
}
