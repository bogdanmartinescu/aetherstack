"use client"

import { PatternPage } from "@/components/pattern-page"
import { InlineEditPreview } from "./preview"

export default function InlineEditPage() {
  return (
    <PatternPage
      name="Inline Edit"
      description="Click-to-edit text field with save on Enter and cancel on Escape. The value is displayed as static text until the user activates editing; unsaved changes are discarded on Escape."
      cliInstall="npx aether-ui add inline-edit"
      importCode={`import { InlineEdit } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { InlineEdit } from "@aetherstack/patterns"

export function PageTitle() {
  const [title, setTitle] = React.useState("Untitled project")
  return (
    <InlineEdit
      value={title}
      onValueChange={setTitle}
      placeholder="Enter a title…"
    />
  )
}`}
      preview={<InlineEditPreview />}
      props={[
        { name: "value", type: "string", required: true, description: "Controlled current value." },
        { name: "onValueChange", type: "(value: string) => void", required: true, description: "Called with the new value when the user saves (Enter or blur)." },
        { name: "placeholder", type: "string", description: "Shown in the input when value is empty." },
        { name: "disabled", type: "boolean", default: "false", description: "Prevents entering edit mode." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={[
        "The static display element has role=\"button\" and tabIndex={0} so keyboard users can activate it.",
        "When editing, the underlying <input> receives focus immediately.",
        "Enter confirms; Escape restores the previous value and exits edit mode.",
        "A visually-hidden hint (\"Press Enter to save, Escape to cancel\") is announced on focus.",
      ]}
    />
  )
}
