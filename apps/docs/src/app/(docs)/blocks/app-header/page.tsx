import type { Metadata } from "next"
import { AppHeader } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"
import { Button } from "@aetherstack/ui"

export const metadata: Metadata = {
  title: "App Header",
  description: "A sticky application top navigation bar with logo, nav links, and action slots.",
}

export default function AppHeaderPage() {
  return (
    <BlockPage
      name="App Header"
      category="App navigation"
      description="A sticky application top navigation bar with logo, nav links that highlight the active route, and a right-side actions slot. Collapses to a sheet on mobile."
      cliInstall="npx aether-ui add app-header"
      previewHeight="72px"
      importCode={`import { AppHeader } from "@aetherstack/blocks"`}
      usageCode={`import { AppHeader } from "@aetherstack/blocks"
import { Button } from "@aetherstack/ui"

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader
        appName="MyApp"
        navItems={[
          { label: "Dashboard", href: "/dashboard", active: true },
          { label: "Projects", href: "/projects" },
          { label: "Settings", href: "/settings" },
        ]}
        actions={
          <>
            <Button variant="outline" size="sm">Invite</Button>
            <Button size="sm">Upgrade</Button>
          </>
        }
      />
      {children}
    </>
  )
}`}
      preview={
        <AppHeader
          appName="MyApp"
          navItems={[
            { label: "Dashboard", href: "#", active: true },
            { label: "Projects", href: "#" },
            { label: "Analytics", href: "#" },
            { label: "Settings", href: "#" },
          ]}
          actions={
            <>
              <Button variant="outline" size="sm">Invite</Button>
              <Button size="sm">Upgrade</Button>
            </>
          }
        />
      }
      props={[
        { name: "appName", type: "string", description: "Application name text." },
        { name: "logo", type: "ReactNode", description: "Custom logo element." },
        { name: "navItems", type: "{ label: string; href: string; active?: boolean }[]", description: "Navigation items. Set active: true on the current route." },
        { name: "actions", type: "ReactNode", description: "Right-side action slot (buttons, avatar, etc.)." },
        { name: "className", type: "string", description: "Additional classes on the header element." },
      ]}
      a11yNotes={[
        "Active nav item receives aria-current='page'.",
        "Desktop nav wrapped in <nav aria-label='Main navigation'>.",
        "Mobile toggle button includes aria-label='Open navigation'.",
      ]}
    />
  )
}
