"use client"

import { PatternPage } from "@/components/pattern-page"
import { MultiSelectPreview } from "./preview"

export default function MultiSelectPage() {
  return (
    <PatternPage
      name="Multi Select"
      description="A combobox-style multi-select with removable tag chips and search. Options are filtered as the user types; selected values appear as dismissable chips in the trigger."
      cliInstall="npx aether-ui add multi-select"
      importCode={`import { MultiSelect } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { MultiSelect } from "@aetherstack/patterns"

const OPTIONS = [
  { value: "next", label: "Next.js" },
  { value: "react", label: "React" },
  { value: "typescript", label: "TypeScript" },
]

export function MyMultiSelect() {
  const [value, setValue] = React.useState<string[]>([])
  return (
    <MultiSelect
      options={OPTIONS}
      value={value}
      onValueChange={setValue}
      placeholder="Select frameworks…"
      maxSelected={3}
    />
  )
}`}
      preview={<MultiSelectPreview />}
      props={[
        { name: "options", type: "{ value: string; label: string }[]", required: true, description: "List of selectable options." },
        { name: "value", type: "string[]", required: true, description: "Controlled array of selected option values." },
        { name: "onValueChange", type: "(value: string[]) => void", required: true, description: "Callback fired when the selection changes." },
        { name: "placeholder", type: "string", default: '"Select…"', description: "Hint text shown when nothing is selected." },
        { name: "maxSelected", type: "number", description: "Maximum number of items that can be selected simultaneously." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the control." },
        { name: "className", type: "string", description: "Additional classes on the trigger wrapper." },
      ]}
      a11yNotes={[
        "Trigger uses role=\"combobox\" with aria-expanded and aria-haspopup=\"listbox\".",
        "Each option in the dropdown has role=\"option\" and aria-selected reflecting its state.",
        "Chip remove buttons carry aria-label=\"Remove {label}\" for screen readers.",
        "Arrow keys navigate the option list; Enter toggles selection.",
      ]}
    />
  )
}
