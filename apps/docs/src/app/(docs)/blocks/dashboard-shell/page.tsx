import type { Metadata } from "next"
import { DashboardShell } from "@aetherstack/blocks"
import { MetricCard } from "@aetherstack/patterns"
import { DollarSign, Users, TrendingUp, Activity } from "lucide-react"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Dashboard Shell",
  description: "Full-page SaaS app shell with collapsible sidebar, topbar, and content slot.",
}

function DemoContent() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <MetricCard label="Revenue" value="$48,295" change="+12.5%" trend="up" icon={<DollarSign className="h-5 w-5" />} />
      <MetricCard label="Users" value="2,841" change="+8.1%" trend="up" icon={<Users className="h-5 w-5" />} />
      <MetricCard label="Conversion" value="3.24%" change="-0.4%" trend="down" icon={<TrendingUp className="h-5 w-5" />} />
      <MetricCard label="Uptime" value="99.9%" change="0%" trend="neutral" icon={<Activity className="h-5 w-5" />} />
    </div>
  )
}

export default function DashboardShellPage() {
  return (
    <BlockPage
      name="Dashboard Shell"
      category="Shells"
      description="A full-page SaaS application shell with a collapsible sidebar, topbar with search and notifications, and a flexible content slot. Composable nav groups and user info are passed as props."
      cliInstall="npx aether-ui add dashboard-shell"
      previewScale={0.5}
      previewHeight="460px"
      importCode={`import { DashboardShell } from "@aetherstack/blocks"`}
      usageCode={`import { DashboardShell } from "@aetherstack/blocks"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardShell
      appName="Acme"
      pageTitle="Dashboard"
      userName="Alice Martin"
      userEmail="alice@example.com"
    >
      {children}
    </DashboardShell>
  )
}`}
      preview={
        <DashboardShell pageTitle="Dashboard" appName="Acme">
          <DemoContent />
        </DashboardShell>
      }
      props={[
        { name: "children", type: "ReactNode", required: true, description: "Page content rendered in the main content area." },
        { name: "appName", type: "string", default: '"Aether UI"', description: "Product name shown in the sidebar header." },
        { name: "pageTitle", type: "ReactNode", description: "Title or breadcrumb shown in the topbar." },
        { name: "navGroups", type: "DashboardNavGroup[]", description: "Custom navigation groups. Each group has an optional label and an items array." },
        { name: "userName", type: "string", description: "User display name shown in the sidebar footer." },
        { name: "userEmail", type: "string", description: "User email or role shown below the name." },
        { name: "userAvatarUrl", type: "string", description: "Avatar image URL for the user section." },
        { name: "headerActions", type: "ReactNode", description: "Extra actions rendered in the topbar right slot." },
        { name: "className", type: "string", description: "Additional classes on the shell wrapper." },
      ]}
      a11yNotes={[
        "The sidebar has role=\"navigation\" with aria-label for screen reader landmark navigation.",
        "The mobile menu toggle button has aria-expanded and aria-controls attributes.",
        "Keyboard navigation works through the sidebar links with visible focus rings.",
      ]}
    />
  )
}
