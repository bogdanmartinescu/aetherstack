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
      {
        icon: <LayoutDashboard className="h-4 w-4" />,
        label: "Dashboard",
        href: "/dashboard",
        active: true,
      },
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
        <span className="bg-primary/15 text-primary rounded-full px-1.5 py-0.5 text-[10px] font-medium">
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
    <div className={cn("bg-background flex h-screen overflow-hidden", className)}>
      {/* ── Sidebar ──────────────────────────────────────────────────────── */}
      <aside
        className={cn(
          "border-sidebar-border bg-sidebar-background flex shrink-0 flex-col border-r transition-all duration-200",
          sidebarOpen ? "w-60" : "w-[60px]",
        )}
      >
        {/* Logo / app name */}
        <div className="border-sidebar-border flex h-14 items-center gap-2.5 border-b px-3">
          <div className="bg-primary text-primary-foreground flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[11px] font-bold">
            {appName.charAt(0)}
          </div>
          {sidebarOpen && (
            <span className="text-sidebar-foreground truncate text-sm font-semibold">
              {appName}
            </span>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-4 overflow-y-auto px-2 py-3">
          {navGroups.map((group, gi) => (
            <div key={gi} className="space-y-0.5">
              {group.label && sidebarOpen && (
                <p className="text-sidebar-foreground/40 mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider">
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
                      "mx-auto flex h-9 w-9 items-center justify-center rounded-md text-sm transition-colors",
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
        <div className="border-sidebar-border border-t p-2">
          {sidebarOpen ? (
            <div className="hover:bg-sidebar-accent/50 flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-2 transition-colors">
              <div className="bg-primary/15 text-primary flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold">
                {userName.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sidebar-foreground truncate text-xs font-medium">{userName}</p>
                <p className="text-sidebar-foreground/50 truncate text-[10px]">{userEmail}</p>
              </div>
              <LogOut className="text-sidebar-foreground/40 h-3.5 w-3.5 shrink-0" />
            </div>
          ) : (
            <div className="bg-primary/15 text-primary mx-auto flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-xs font-semibold">
              {userName.charAt(0)}
            </div>
          )}
        </div>
      </aside>

      {/* ── Main ─────────────────────────────────────────────────────────── */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <header className="border-border bg-background flex h-14 shrink-0 items-center gap-3 border-b px-4">
          <button
            onClick={() => setSidebarOpen((v) => !v)}
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex h-8 w-8 items-center justify-center rounded-md transition-colors"
            aria-label={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>

          {typeof pageTitle === "string" ? (
            <div className="flex items-center gap-1.5 text-sm">
              <span className="text-muted-foreground">Home</span>
              <ChevronRight className="text-muted-foreground h-3.5 w-3.5" />
              <span className="text-foreground font-medium">{pageTitle}</span>
            </div>
          ) : (
            pageTitle
          )}

          <div className="ml-auto flex items-center gap-2">
            <div className="relative hidden sm:block">
              <Search className="text-muted-foreground absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2" />
              <Input placeholder="Search…" className="h-8 w-48 pl-8 text-xs" />
            </div>
            <button
              className="text-muted-foreground hover:bg-muted hover:text-foreground relative flex h-8 w-8 items-center justify-center rounded-md transition-colors"
              aria-label="Notifications"
            >
              <Bell className="h-4 w-4" />
              <span className="bg-primary absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full" />
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
