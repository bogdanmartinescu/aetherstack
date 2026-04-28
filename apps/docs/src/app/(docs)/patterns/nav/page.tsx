import type { Metadata } from "next"
import { SidebarNav, NavGroup, NavItem } from "@aetherstack/patterns"
import { LayoutDashboard, Users, Settings, Bell, BarChart2, Shield } from "lucide-react"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Sidebar Nav",
  description: "NavItem, NavGroup, and SidebarNav composable sidebar navigation building blocks.",
}

export default function NavPage() {
  return (
    <PatternPage
      name="Sidebar Nav"
      description="Composable building blocks for sidebar navigation: NavItem for individual links, NavGroup for labelled sections, and SidebarNav as the root container."
      cliInstall="npx aether-ui add nav"
      importCode={`import { SidebarNav, NavGroup, NavItem } from "@aetherstack/patterns"`}
      usageCode={`import { SidebarNav, NavGroup, NavItem } from "@aetherstack/patterns"
import { LayoutDashboard, Users, Settings } from "lucide-react"

<SidebarNav>
  <NavGroup label="Main">
    <NavItem
      href="/dashboard"
      label="Dashboard"
      icon={<LayoutDashboard className="h-4 w-4" />}
      active={pathname === "/dashboard"}
    />
    <NavItem
      href="/team"
      label="Team"
      icon={<Users className="h-4 w-4" />}
      badge={3}
    />
  </NavGroup>

  <NavGroup label="Settings" collapsible>
    <NavItem
      href="/settings"
      label="General"
      icon={<Settings className="h-4 w-4" />}
    />
  </NavGroup>
</SidebarNav>`}
      preview={
        <div className="w-56 rounded-lg border border-border bg-card p-3">
          <SidebarNav>
            <NavGroup label="Main">
              <NavItem href="#" label="Dashboard" icon={<LayoutDashboard className="h-4 w-4" />} active />
              <NavItem href="#" label="Analytics" icon={<BarChart2 className="h-4 w-4" />} />
              <NavItem href="#" label="Team" icon={<Users className="h-4 w-4" />} badge={3} />
              <NavItem href="#" label="Notifications" icon={<Bell className="h-4 w-4" />} />
            </NavGroup>
            <NavGroup label="Settings" collapsible>
              <NavItem href="#" label="Security" icon={<Shield className="h-4 w-4" />} />
              <NavItem href="#" label="General" icon={<Settings className="h-4 w-4" />} />
            </NavGroup>
          </SidebarNav>
        </div>
      }
      props={[
        { name: "NavItem.href", type: "string", required: true, description: "Link destination." },
        { name: "NavItem.label", type: "string", required: true, description: "Link text." },
        { name: "NavItem.icon", type: "ReactNode", description: "Icon to the left of the label. Recommended: Lucide icon, h-4 w-4." },
        { name: "NavItem.badge", type: "string | number", description: "Count badge shown on the right." },
        { name: "NavItem.active", type: "boolean", description: "Highlights the item as the current page." },
        { name: "NavItem.disabled", type: "boolean", description: "Makes the item non-interactive." },
        { name: "NavGroup.label", type: "string", description: "Section heading above the group." },
        { name: "NavGroup.collapsible", type: "boolean", default: "false", description: "Makes the group toggleable." },
        { name: "NavGroup.defaultCollapsed", type: "boolean", default: "false", description: "Whether the group starts collapsed." },
      ]}
      a11yNotes={[
        "SidebarNav renders as <nav aria-label=\"Sidebar navigation\"> — a landmark region.",
        "Active NavItem gets aria-current=\"page\" automatically.",
        "Disabled NavItem gets aria-disabled=\"true\" and tabIndex={-1}.",
        "Collapsible NavGroup toggles aria-expanded on the heading button.",
      ]}
    />
  )
}
