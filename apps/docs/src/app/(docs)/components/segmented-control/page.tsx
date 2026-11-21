"use client"

import { useState } from "react"
import { SegmentedControl } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { SEGMENTED_CONTROL_SOURCE } from "@/lib/registry-source"

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
] as const

export default function SegmentedControlPage() {
  const [value, setValue] = useState("week")

  return (
    <ComponentPage
      name="Segmented Control"
      description="Single-select control with a sliding thumb."
      features={[
        "Built on Radio Group — one option at a time",
        "Sliding thumb tracks the selected segment",
        "Arrow keys move to the next enabled option",
        "Controlled and uncontrolled usage",
      ]}
      preview={
        <SegmentedControl
          aria-label="Range"
          options={options}
          value={value}
          onValueChange={setValue}
        />
      }
      previewCode={`"use client"

import { SegmentedControl } from "@/components/ui/segmented-control"

const options = [
  { value: "day", label: "Day" },
  { value: "week", label: "Week" },
  { value: "month", label: "Month" },
]

export function SegmentedControlDemo() {
  return (
  <SegmentedControl aria-label="Range" options={options} defaultValue="week" />
  )
}`}
      cliInstall="npx @aetherstack/cli add segmented-control"
      manualInstallCode={SEGMENTED_CONTROL_SOURCE}
      manualSteps={[
        {
          title: "Add the radio-group registry dependency",
          code: "npx @aetherstack/cli add radio-group",
          filename: "terminal",
        },
      ]}
      examples={[]}
      props={[
        {
          name: "options",
          type: "readonly SegmentedOption[]",
          default: "—",
          description: "Segments to show. Each entry has value, label, and optional disabled.",
        },
        {
          name: "value",
          type: "string",
          description: "Selected value for controlled usage.",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "Initial value when uncontrolled.",
        },
        {
          name: "onValueChange",
          type: "(value: string) => void",
          description: "Called when the selection changes.",
        },
        {
          name: "aria-label",
          type: "string",
          required: true,
          description: "Accessible name for the radiogroup.",
        },
      ]}
      a11yNotes={[
        "Uses a radiogroup with one radio per option; each label is exposed as the radio name.",
        "ArrowLeft and ArrowRight move selection to the previous or next enabled segment.",
      ]}
    />
  )
}
