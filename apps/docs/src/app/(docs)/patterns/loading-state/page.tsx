import type { Metadata } from "next"
import { LoadingState } from "@aetherstack/patterns"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Loading State",
  description: "Spinner or skeleton-row variant for async loading views.",
}

export default function LoadingStatePage() {
  return (
    <PatternPage
      name="Loading State"
      description="Two variants for communicating async work: a centered spinner for initial loads, and skeleton rows for content-shaped placeholders."
      cliInstall="npx aether-ui add loading-state"
      importCode={`import { LoadingState } from "@aetherstack/patterns"`}
      usageCode={`// Spinner (default)
<LoadingState text="Fetching data…" />

// Skeleton rows
<LoadingState variant="skeleton" rows={5} />

// Custom text
<LoadingState text="Saving changes…" />`}
      preview={
        <div className="flex w-full max-w-lg flex-col gap-6">
          <LoadingState text="Loading members…" />
          <LoadingState variant="skeleton" rows={3} />
        </div>
      }
      props={[
        { name: "variant", type: '"spinner" | "skeleton"', default: '"spinner"', description: "Display style." },
        { name: "rows", type: "number", default: "4", description: "Number of skeleton rows. Only used when variant=\"skeleton\"." },
        { name: "text", type: "string", default: '"Loading…"', description: "Screen reader label and visible caption for the spinner variant." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
      a11yNotes={[
        "The wrapper has aria-busy=\"true\" and aria-label set to the text prop — screen readers announce loading state.",
        "Use variant=\"skeleton\" when the content shape is known — it reduces layout shift on resolve.",
        "Do not leave the page interactive while LoadingState is shown — disable relevant controls.",
      ]}
    />
  )
}
