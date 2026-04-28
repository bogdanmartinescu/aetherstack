import type { Metadata } from "next"
import { SectionHeader } from "@aetherstack/patterns"
import { Button } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Section Header",
  description: "Lightweight section heading with title, description, and optional action.",
}

export default function SectionHeaderPage() {
  return (
    <PatternPage
      name="Section Header"
      description="A lightweight block heading for grouping related content within a page. Lighter than PageHeader — no breadcrumb, smaller type."
      cliInstall="npx aether-ui add section-header"
      importCode={`import { SectionHeader } from "@aetherstack/patterns"`}
      usageCode={`// Basic
<SectionHeader title="Connected accounts" />

// With description and action
<SectionHeader
  title="Connected accounts"
  description="Manage third-party integrations for your account."
  action={
    <Button variant="outline" size="sm">Add integration</Button>
  }
/>

// Change heading level
<SectionHeader title="Notifications" as="h3" />`}
      preview={
        <div className="w-full max-w-xl">
          <SectionHeader
            title="Connected accounts"
            description="Manage third-party integrations for your account."
            action={<Button variant="outline" size="sm">Add integration</Button>}
          />
        </div>
      }
      props={[
        { name: "title", type: "string", required: true, description: "Section heading text." },
        { name: "description", type: "string", description: "Optional sub-text below the title." },
        { name: "action", type: "ReactNode", description: "Optional right-aligned element." },
        { name: "as", type: '"h1" | "h2" | "h3" | "h4"', default: '"h2"', description: "Heading element to render." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
    />
  )
}
