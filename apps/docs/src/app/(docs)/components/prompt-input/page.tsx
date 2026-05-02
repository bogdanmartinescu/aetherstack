"use client"

import { PatternPage } from "@/components/pattern-page"
import { PromptInputPreview } from "./preview"

export default function PromptInputPage() {
  return (
    <PatternPage
      name="PromptInput"
      description="A multi-line textarea with a submit button designed for AI chat interfaces, supporting loading states and attachment slots."
      packageName="@aetherstack/ui"
      preview={<PromptInputPreview />}
      importCode={`import { PromptInput } from "@aetherstack/ui"`}
      usageCode={`const [value, setValue] = React.useState("")

<PromptInput
  value={value}
  onValueChange={setValue}
  onSubmit={(v) => console.log("submit:", v)}
  placeholder="Ask anything…"
  isLoading={false}
  maxLength={4000}
/>`}
      cliInstall="npx aether-ui add prompt-input"
      props={[
        {
          name: "value",
          type: "string",
          default: '""',
          description: "Controlled textarea value.",
        },
        {
          name: "onValueChange",
          type: "(v: string) => void",
          description: "Callback on value change.",
        },
        {
          name: "onSubmit",
          type: "(value: string) => void",
          description: "Called when user submits via Enter key or the submit button.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Ask anything…"',
          description: "Textarea placeholder text.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the input and submit button.",
        },
        {
          name: "isLoading",
          type: "boolean",
          default: "false",
          description: "Shows a spinner on the submit button while a response is in flight.",
        },
        {
          name: "maxLength",
          type: "number",
          description: "Character limit; a counter is shown near the submit button when set.",
        },
        {
          name: "attachSlot",
          type: "React.ReactNode",
          description: "Slot rendered above the textarea — typically AttachmentChip components.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        "Submit button label changes to 'Stop' during loading so screen readers reflect the current action.",
        "Keyboard shortcut: Enter submits, Shift+Enter inserts a newline.",
        "Character counter is announced via aria-live when approaching the limit.",
      ]}
    />
  )
}
