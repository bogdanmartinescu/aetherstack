"use client"

import { BlockPage } from "@/components/block-page"
import { AIAssistantPanelPreview } from "./preview"

export default function AIAssistantPanelPage() {
  return (
    <BlockPage
      name="AI Assistant Panel"
      category="AI"
      description="A 420 px wide slide-over Sheet panel for embedding an AI chat assistant alongside any page content. Supports a configurable title, a scrollable content area, an optional footer slot, and both left and right anchor positions."
      cliInstall="npx aether-ui add ai-assistant-panel"
      previewHeight="420px"
      importCode={`import { AIAssistantPanel } from "@aetherstack/blocks"`}
      usageCode={`"use client"

import * as React from "react"
import { AIAssistantPanel } from "@aetherstack/blocks"
import { Button } from "@aetherstack/ui"
import { PromptInput } from "@aetherstack/ui"

export function PageWithAssistant() {
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <Button onClick={() => setOpen(true)}>Open AI Assistant</Button>

      <AIAssistantPanel
        open={open}
        onOpenChange={setOpen}
        title="AI Assistant"
        footer={
          <PromptInput
            value=""
            onChange={() => {}}
            onSubmit={() => {}}
            placeholder="Ask me anything…"
          />
        }
      >
        {/* render conversation thread here */}
      </AIAssistantPanel>
    </>
  )
}`}
      preview={<AIAssistantPanelPreview />}
      props={[
        { name: "open", type: "boolean", description: "Controlled open state. Omit to use uncontrolled." },
        { name: "onOpenChange", type: "(open: boolean) => void", description: "Called when the Sheet open state changes." },
        { name: "title", type: "string", default: '"AI Assistant"', description: "Heading displayed in the panel header." },
        { name: "children", type: "ReactNode", description: "Scrollable body content — typically a conversation thread." },
        { name: "footer", type: "ReactNode", description: "Fixed footer slot — typically a prompt input." },
        { name: "side", type: '"right" | "left"', default: '"right"', description: "Which edge of the viewport the panel slides in from." },
        { name: "className", type: "string", description: "Additional classes on the SheetContent element." },
      ]}
      a11yNotes={[
        "Built on the Sheet primitive which uses role='dialog' with an aria-labelledby pointing to the panel title.",
        "Focus is trapped inside the panel while it is open.",
        "Pressing Escape closes the panel.",
        "The close button in the header is keyboard-focusable.",
      ]}
    />
  )
}
