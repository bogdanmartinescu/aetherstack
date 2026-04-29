"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  Settings,
  CreditCard,
  BarChart3,
  HelpCircle,
} from "lucide-react"
import { DashboardShell, type DashboardNavGroup } from "@aetherstack/blocks"

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/users": "Users",
  "/settings": "Settings",
}

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navGroups: DashboardNavGroup[] = [
    {
      items: [
        {
          icon: <LayoutDashboard className="h-4 w-4" />,
          label: "Dashboard",
          href: "/dashboard",
          active: pathname === "/dashboard",
        },
        {
          icon: <Users className="h-4 w-4" />,
          label: "Users",
          href: "/users",
          badge: 4,
          active: pathname === "/users",
        },
        {
          icon: <BarChart3 className="h-4 w-4" />,
          label: "Analytics",
          href: "/analytics",
        },
        {
          icon: <CreditCard className="h-4 w-4" />,
          label: "Billing",
          href: "/billing",
        },
      ],
    },
    {
      label: "Workspace",
      items: [
        {
          icon: <Settings className="h-4 w-4" />,
          label: "Settings",
          href: "/settings",
          active: pathname === "/settings",
        },
        {
          icon: <HelpCircle className="h-4 w-4" />,
          label: "Help & Support",
          href: "/support",
        },
      ],
    },
  ]

  const pageTitle = PAGE_TITLES[pathname] ?? "Aether UI"

  return (
    <DashboardShell
      appName="Acme"
      navGroups={navGroups}
      userName="Alex Johnson"
      userEmail="alex@acme.com"
      pageTitle={pageTitle}
    >
      {children}
    </DashboardShell>
  )
}
