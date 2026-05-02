import type { Metadata } from "next"
import { StatsSection } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Stats Section",
  description: "A marketing statistics row with large bold numbers and labels.",
}

export default function StatsSectionPage() {
  return (
    <BlockPage
      name="Stats Section"
      category="Marketing"
      description="A marketing statistics row displaying large bold numbers with labels and optional descriptions. Dividers separate columns on desktop; items stack on mobile."
      cliInstall="npx aether-ui add stats-section"
      previewHeight="200px"
      importCode={`import { StatsSection } from "@aetherstack/blocks"`}
      usageCode={`import { StatsSection } from "@aetherstack/blocks"

export default function StatsPage() {
  return (
    <StatsSection
      stats={[
        { value: "50k+", label: "Developers", description: "Using Aether UI in production" },
        { value: "38", label: "Components", description: "Primitives, patterns, and blocks" },
        { value: "264", label: "Tests", description: "Covering all packages" },
        { value: "MIT", label: "License", description: "Free forever, no lock-in" },
      ]}
    />
  )
}`}
      preview={
        <StatsSection
          stats={[
            { value: "50k+", label: "Developers", description: "Using Aether UI in production" },
            { value: "38", label: "Components", description: "Primitives, patterns, and blocks" },
            { value: "264", label: "Tests", description: "Covering all packages" },
            { value: "MIT", label: "License", description: "Free forever, no lock-in" },
          ]}
        />
      }
      props={[
        { name: "stats", type: "{ value: string; label: string; description?: string }[]", required: true, description: "Array of stat items." },
        { name: "cols", type: "2 | 3 | 4", default: "4", description: "Grid column count. Auto-inferred from stats length when ≤ 4." },
        { name: "className", type: "string", description: "Additional classes on the section wrapper." },
      ]}
      a11yNotes={[
        "Uses semantic <section> element.",
        "Numbers are rendered as plain text — screen readers will announce them naturally.",
      ]}
    />
  )
}
