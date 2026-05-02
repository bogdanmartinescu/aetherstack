import type { Metadata } from "next"
import { ModelBadge } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "ModelBadge",
  description: "A compact badge that displays the AI model name with an optional provider prefix.",
}

export default function ModelBadgePage() {
  return (
    <PatternPage
      name="ModelBadge"
      description="A compact badge that displays the AI model name with an optional provider prefix."
      packageName="@aetherstack/ui"
      preview={
        <div className="flex items-center gap-2 flex-wrap">
          <ModelBadge model="gpt-4o" provider="openai" />
          <ModelBadge model="claude-3-5-sonnet" provider="anthropic" />
          <ModelBadge model="gemini-2.0-flash" provider="google" />
        </div>
      }
      importCode={`import { ModelBadge } from "@aetherstack/ui"`}
      usageCode={`<ModelBadge model="gpt-4o" provider="openai" />
<ModelBadge model="claude-3-5-sonnet" provider="anthropic" />

{/* Model name only */}
<ModelBadge model="gemini-2.0-flash" />`}
      cliInstall="npx aether-ui add model-badge"
      props={[
        {
          name: "model",
          type: "string",
          description: "Model name displayed in the badge.",
          required: true,
        },
        {
          name: "provider",
          type: "string",
          description: "Provider name shown as a muted prefix before the model name.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
    />
  )
}
