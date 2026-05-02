import type { Metadata } from "next"
import { ThinkingIndicator } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "ThinkingIndicator",
  description: "Animated dots with a label used to signal that an AI model is processing or loading.",
}

export default function ThinkingIndicatorPage() {
  return (
    <PatternPage
      name="ThinkingIndicator"
      description="Animated dots with a label used to signal that an AI model is processing or loading."
      packageName="@aetherstack/ui"
      preview={<ThinkingIndicator />}
      importCode={`import { ThinkingIndicator } from "@aetherstack/ui"`}
      usageCode={`<ThinkingIndicator />

{/* Custom label */}
<ThinkingIndicator label="Processing…" />

{/* Loading state */}
<ThinkingIndicator state="loading" label="Loading response…" />`}
      cliInstall="npx aether-ui add thinking-indicator"
      props={[
        {
          name: "state",
          type: '"thinking" | "loading"',
          default: '"thinking"',
          description: "Controls animation style — thinking shows pulsing dots, loading shows a spinner.",
        },
        {
          name: "label",
          type: "string",
          default: '"Thinking…"',
          description: "Text label shown beside the animation.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        'The container has role="status" and aria-live="polite" so screen readers announce the thinking state.',
        "Label text is always visible — do not rely on the animation alone to convey meaning.",
      ]}
    />
  )
}
