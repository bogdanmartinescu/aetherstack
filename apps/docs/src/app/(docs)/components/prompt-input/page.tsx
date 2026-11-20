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
          description: "Controlled textarea value. Omit to use the component uncontrolled.",
        },
        {
          name: "defaultValue",
          type: "string",
          default: '""',
          description: "Initial value when uncontrolled. The input clears itself after submit.",
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
          name: "onStop",
          type: "() => void",
          description: "When set, the submit button becomes a stop button while isLoading is true.",
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
          name: "maxHeight",
          type: "number",
          default: "200",
          description: "Height in px the textarea grows to before scrolling.",
        },
        {
          name: "aria-label",
          type: "string",
          description: "Accessible name for the textarea. Defaults to the placeholder.",
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
        "With onStop set, the button is labelled 'Stop generating' during loading so screen readers reflect the current action.",
        "Keyboard shortcut: Enter submits, Shift+Enter inserts a newline. Enter during IME composition never submits.",
        "The character counter is linked to the textarea via aria-describedby and turns destructive at 90% of the limit.",
        "The textarea is labelled by aria-label, falling back to the placeholder.",
      ]}
    />
  )
}
