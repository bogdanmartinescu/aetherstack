import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { TokenCounterPreview } from "./preview"

export const metadata: Metadata = {
  title: "TokenCounter",
  description:
    "Displays token usage against a context window limit with a progress bar and formatted counts.",
}

export default function TokenCounterPage() {
  return (
    <PatternPage
      name="TokenCounter"
      description="Displays token usage against a context window limit with a progress bar and formatted counts."
      packageName="@aetherstack/ui"
      preview={<TokenCounterPreview />}
      importCode={`import { TokenCounter } from "@aetherstack/ui"`}
      usageCode={`<TokenCounter used={12400} max={128000} />`}
      cliInstall="npx aether-ui add token-counter"
      props={[
        {
          name: "used",
          type: "number",
          description: "Number of tokens used in the current context.",
          required: true,
        },
        {
          name: "max",
          type: "number",
          description: "Maximum token limit of the model context window.",
          required: true,
        },
        {
          name: "label",
          type: "string",
          default: '"Context window"',
          description: "Visible label, also used as the progress bar's accessible name.",
        },
        {
          name: "warnAt",
          type: "number",
          default: "0.8",
          description:
            "Fraction of max (0–1) at which the counter turns amber. It turns destructive at 100%.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        "The progress bar uses role='progressbar' with aria-valuenow, aria-valuemin, and aria-valuemax attributes, plus an aria-valuetext like '1,000 of 4,000 tokens used'.",
        "Counts are formatted with locale-aware number formatting for readability.",
      ]}
    />
  )
}
