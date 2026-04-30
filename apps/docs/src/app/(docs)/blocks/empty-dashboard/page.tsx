import type { Metadata } from "next"
import { EmptyDashboard } from "@aetherstack/blocks"
import { Button } from "@aetherstack/ui"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Empty Dashboard",
  description: "Zero-state landing screen for new users with illustration and CTA actions.",
}

export default function EmptyDashboardPage() {
  return (
    <BlockPage
      name="Empty Dashboard"
      category="Dashboard"
      description="A polished zero-state screen shown to new users who haven't set anything up yet. Features a subtle dot-grid background, an illustration placeholder, customisable title, description, and actions slot."
      cliInstall="npx aether-ui add empty-dashboard"
      importCode={`import { EmptyDashboard } from "@aetherstack/blocks"`}
      usageCode={`import { EmptyDashboard } from "@aetherstack/blocks"
import { Button } from "@aetherstack/ui"

export default function DashboardPage() {
  return (
    <EmptyDashboard
      title="Welcome to your workspace"
      description="Create your first project to get started."
      actions={
        <>
          <Button onClick={() => openCreateDialog()}>Create project</Button>
          <Button variant="outline">Import data</Button>
        </>
      }
    />
  )
}`}
      preview={
        <EmptyDashboard
          title="Welcome to your workspace"
          description="Create your first project to get started, or import existing data."
          actions={
            <>
              <Button>Create project</Button>
              <Button variant="outline">Import data</Button>
            </>
          }
        />
      }
      previewHeight="500px"
      props={[
        { name: "title", type: "string", default: '"Welcome to your dashboard"', description: "Heading text." },
        { name: "description", type: "string", description: "Supporting description below the heading." },
        { name: "actions", type: "ReactNode", description: "CTA buttons or other actions rendered below the description." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
      a11yNotes={[
        "The dot-grid background is aria-hidden so it doesn't pollute screen reader output.",
        "The SVG illustration is also aria-hidden — it is purely decorative.",
        "Action buttons are rendered as standard accessible <button> elements via the Button primitive.",
      ]}
    />
  )
}
