import type { Metadata } from "next"
import { CompareOutput } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Compare Output",
  description: "A side-by-side grid for comparing responses from two or more AI models.",
}

const DEMO_OUTPUTS = [
  {
    model: "gpt-4o",
    content:
      "React Server Components allow you to render components on the server and stream them to the client. This reduces the JavaScript bundle sent to the browser and enables direct server-side data access without an extra API layer.",
    timestamp: "1.2s",
  },
  {
    model: "claude-3-5-sonnet",
    content:
      "React Server Components (RSC) are a new paradigm where components run exclusively on the server. They can fetch data directly, access server resources, and render to HTML — all without shipping their code to the client's JavaScript bundle.",
    timestamp: "0.9s",
  },
]

export default function CompareOutputPage() {
  return (
    <BlockPage
      name="Compare Output"
      category="AI"
      description="A responsive grid for placing two or more AI model responses side by side. Each column shows the model name badge, an optional timestamp, and the response content. Adapts from a single column on mobile to a two-column layout on larger screens."
      cliInstall="npx aether-ui add compare-output"
      previewHeight="360px"
      importCode={`import { CompareOutput } from "@aetherstack/blocks"`}
      usageCode={`import { CompareOutput } from "@aetherstack/blocks"

export function ModelComparison() {
  return (
    <CompareOutput
      outputs={[
        {
          model: "gpt-4o",
          content: "React Server Components allow you to render on the server…",
          timestamp: "1.2s",
        },
        {
          model: "claude-3-5-sonnet",
          content: "React Server Components (RSC) are a new paradigm…",
          timestamp: "0.9s",
        },
      ]}
    />
  )
}`}
      preview={
        <div className="p-4 h-full overflow-auto">
          <CompareOutput outputs={DEMO_OUTPUTS} />
        </div>
      }
      props={[
        { name: "outputs", type: "OutputItem[]", required: true, description: "Array of model output objects to display side by side." },
        { name: "className", type: "string", description: "Additional classes on the grid container." },
      ]}
      a11yNotes={[
        "Each output card has a semantic CardTitle containing the model badge.",
        "Timestamps are rendered in a <span> beside the title and do not carry semantic weight.",
        "Content is rendered in a <div> with whitespace-pre-wrap to preserve formatting.",
      ]}
    />
  )
}
