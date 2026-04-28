import type { Metadata } from "next"
import { PageHeader } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Page Header",
  description: "Title, description, breadcrumb, and actions slot for page-level headings.",
}

export default function PageHeaderPage() {
  return (
    <PatternPage
      name="Page Header"
      description="A consistent top-of-page structure: breadcrumb trail, title, optional description, and a right-aligned actions slot."
      cliInstall="npx aether-ui add page-header"
      importCode={`import { PageHeader } from "@aetherstack/patterns"`}
      usageCode={`// Basic
<PageHeader
  title="Team Members"
  description="Manage your team and their account permissions."
/>

// With breadcrumb and actions
<PageHeader
  title="Team Members"
  description="Manage your team and their account permissions."
  breadcrumb={[
    { label: "Settings", href: "/settings" },
    { label: "Team" },
  ]}
  actions={
    <Button>
      <Plus />
      Invite member
    </Button>
  }
/>`}
      preview={
        <div className="w-full max-w-xl">
          <PageHeader
            title="Team Members"
            description="Manage your team and their account permissions."
            breadcrumb={[
              { label: "Settings", href: "#" },
              { label: "Team" },
            ]}
            actions={<Button size="sm">Invite member</Button>}
          />
        </div>
      }
      props={[
        { name: "title", type: "string", required: true, description: "Page title rendered as an h1." },
        { name: "description", type: "string", description: "Optional subtitle below the title." },
        { name: "breadcrumb", type: "BreadcrumbItem[]", description: "Crumb trail rendered above the title." },
        { name: "actions", type: "ReactNode", description: "Right-aligned slot for primary actions." },
        { name: "className", type: "string", description: "Additional classes on the wrapper div." },
      ]}
      a11yNotes={[
        "Title renders as <h1> — ensure only one PageHeader exists per page.",
        "Breadcrumb uses a <nav aria-label=\"Breadcrumb\"> with an ordered list.",
        "The current page crumb has aria-current=\"page\" applied automatically.",
      ]}
    />
  )
}
