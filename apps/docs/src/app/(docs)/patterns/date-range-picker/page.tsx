"use client"

import { PatternPage } from "@/components/pattern-page"
import { DateRangePickerPreview } from "./preview"

export default function DateRangePickerPage() {
  return (
    <PatternPage
      name="Date Range Picker"
      description="A date range selector composing Calendar in range mode with a Popover trigger. Displays a formatted summary of the selected from/to dates in the trigger button."
      cliInstall="npx aether-ui add date-range-picker"
      importCode={`import { DateRangePicker } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { DateRangePicker } from "@aetherstack/patterns"

export function MyDateRange() {
  const [value, setValue] = React.useState<{ from?: Date; to?: Date }>({})
  return (
    <DateRangePicker
      value={value}
      onValueChange={setValue}
      placeholder="Pick a date range"
    />
  )
}`}
      preview={<DateRangePickerPreview />}
      props={[
        { name: "value", type: "{ from?: Date; to?: Date }", required: true, description: "Controlled selected date range." },
        { name: "onValueChange", type: "(value: { from?: Date; to?: Date }) => void", required: true, description: "Callback fired when the range changes." },
        { name: "placeholder", type: "string", default: '"Pick a date range"', description: "Trigger button text when no range is selected." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables the trigger button." },
        { name: "className", type: "string", description: "Additional classes on the popover trigger." },
      ]}
      a11yNotes={[
        "The trigger button carries an accessible label derived from the selected range or the placeholder.",
        "Calendar uses a grid role with arrow-key navigation; Enter selects a date.",
        "Popover closes on Escape and when focus leaves the floating panel.",
      ]}
    />
  )
}
