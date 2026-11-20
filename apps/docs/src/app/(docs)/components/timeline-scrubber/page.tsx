"use client"

import { useState } from "react"
import { TimelineScrubber } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { TIMELINE_SCRUBBER_SOURCE } from "@/lib/registry-source"

export default function TimelineScrubberPage() {
  const [value, setValue] = useState(0)

  return (
    <ComponentPage
      name="Timeline Scrubber"
      description="Move one marker along a time range."
      features={[
        "Native range input for scrubbing",
        "Controlled value with onValueChange",
        "Shows the current position",
      ]}
      preview={
        <TimelineScrubber
          label="Position"
          min={0}
          max={60}
          step={1}
          value={value}
          onValueChange={setValue}
        />
      }
      previewCode={`"use client"

import { useState } from "react"
import { TimelineScrubber } from "@/components/ui/timeline-scrubber"

export function TimelineScrubberDemo() {
  const [value, setValue] = useState(0)

  return (
    <TimelineScrubber
      label="Position"
      min={0}
      max={60}
      step={1}
      value={value}
      onValueChange={setValue}
    />
  )
}`}
      cliInstall="npx aether-ui add timeline-scrubber"
      manualInstallCode={TIMELINE_SCRUBBER_SOURCE}
      examples={[]}
      props={[
        {
          name: "label",
          type: "string",
          default: "—",
          description: "Accessible name for the range input.",
        },
        { name: "min", type: "number", default: "—", description: "Minimum value of the range." },
        { name: "max", type: "number", default: "—", description: "Maximum value of the range." },
        { name: "step", type: "number", default: "1", description: "Step between values." },
        {
          name: "value",
          type: "number",
          default: "—",
          description: "Current position (controlled).",
        },
        {
          name: "onValueChange",
          type: "(value: number) => void",
          default: "—",
          description: "Called when the user moves the scrubber.",
        },
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Extra classes on the root element.",
        },
      ]}
      a11yNotes={[
        "The range input uses aria-label from the label prop and exposes the current value as aria-valuenow.",
      ]}
    />
  )
}
