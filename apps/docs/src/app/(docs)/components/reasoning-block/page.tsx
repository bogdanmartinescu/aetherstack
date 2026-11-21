import type { Metadata } from "next"
import { ReasoningBlock } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "ReasoningBlock",
  description:
    "A collapsible block that surfaces an AI model's chain-of-thought reasoning, collapsed by default to keep responses clean.",
}

const SAMPLE_REASONING = `Let me think through this step by step.

1. First, I need to understand the problem...
2. Then I'll consider possible approaches...
3. The best solution seems to be...`

export default function ReasoningBlockPage() {
  return (
    <PatternPage
      name="ReasoningBlock"
      description="A collapsible block that surfaces an AI model's chain-of-thought reasoning, collapsed by default to keep responses clean."
      packageName="@aetherstack/ui"
      preview={<ReasoningBlock content={SAMPLE_REASONING} defaultOpen />}
      importCode={`import { ReasoningBlock } from "@aetherstack/ui"`}
      usageCode={`<ReasoningBlock
  content={response.thinking}
  defaultOpen={false}
/>`}
      cliInstall="npx @aetherstack/cli add reasoning-block"
      props={[
        {
          name: "content",
          type: "React.ReactNode",
          description:
            "Reasoning content — strings are shown as preformatted text inside the block.",
          required: true,
        },
        {
          name: "title",
          type: "string",
          description: "Overrides the header label.",
        },
        {
          name: "isStreaming",
          type: "boolean",
          default: "false",
          description: "Shows a live 'Thinking…' header while the model is still reasoning.",
        },
        {
          name: "duration",
          type: "number",
          description: "Reasoning time in seconds, rendered as 'Thought for Ns' once finished.",
        },
        {
          name: "open",
          type: "boolean",
          description: "Controlled open state.",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          default: "false",
          description: "Whether the block starts expanded.",
        },
        {
          name: "onOpenChange",
          type: "(open: boolean) => void",
          description: "Called when the block is toggled.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        "Uses a disclosure widget — the toggle button has aria-expanded reflecting open/closed state.",
        "Hidden content is removed from the accessibility tree when collapsed.",
      ]}
    />
  )
}
