import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { TokenCounterPreview } from "./preview"

export const metadata: Metadata = {
  title: "TokenCounter",
  description: "Displays token usage against a context window limit with a progress bar and formatted counts.",
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
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        "The progress bar uses role='progressbar' with aria-valuenow, aria-valuemin, and aria-valuemax attributes.",
        "Counts are formatted with locale-aware number formatting for readability.",
      ]}
    />
  )
}
