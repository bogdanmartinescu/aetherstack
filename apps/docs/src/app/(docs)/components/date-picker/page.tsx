import type { Metadata } from "next"
import { DatePicker } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Date Picker",
  description: "A date selection field composing Calendar and Popover with formatted display.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

export interface DatePickerProps {
  value?: Date
  onValueChange?: (date: Date | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

// Full source: packages/ui/src/components/date-picker.tsx`

export default function DatePickerPage() {
  return (
    <ComponentPage
      name="Date Picker"
      description="A date selection field that composes Calendar and Popover with a formatted display trigger. Supports controlled and uncontrolled modes with clear selection support."
      features={[
        "Controlled and uncontrolled modes",
        "Formats selected date via toLocaleDateString()",
        "Opens Calendar in a Popover on click",
        "Clear selection support",
      ]}
      preview={<DatePicker placeholder="Pick a date" />}
      previewCode={`"use client"

import { DatePicker } from "@/components/ui/date-picker"

export function DatePickerDemo() {
  return <DatePicker placeholder="Pick a date" />
}`}
      cliInstall={`npx aether-ui add date-picker`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-popover lucide-react`,
          filename: "terminal",
        },
        {
          title: "Ensure Calendar and Popover are installed",
          code: `npx aether-ui add calendar popover`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Uncontrolled",
          description: "Basic usage without external state management.",
          preview: <DatePicker placeholder="Pick a date" />,
          code: `<DatePicker placeholder="Pick a date" />`,
        },
        {
          title: "Disabled",
          description: "Use disabled to prevent interaction.",
          preview: <DatePicker placeholder="Not available" disabled />,
          code: `<DatePicker placeholder="Not available" disabled />`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "Date | undefined",
          description: "Controlled selected date value.",
        },
        {
          name: "onValueChange",
          type: "(date: Date | undefined) => void",
          description: "Callback fired when the user selects or clears a date.",
        },
        {
          name: "placeholder",
          type: "string",
          default: '"Pick a date"',
          description: "Text shown in the trigger when no date is selected.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the trigger button and prevents calendar from opening.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional Tailwind classes on the trigger button.",
        },
      ]}
      a11yNotes={[
        "The trigger is a Button — it receives focus and is keyboard activatable via Enter or Space.",
        "The Calendar inside the Popover uses Radix UI Calendar keyboard navigation (arrow keys, Tab).",
        "The Popover closes on Escape key press, returning focus to the trigger.",
        "Pair with a Label component using htmlFor to associate the label with the trigger button id.",
      ]}
    />
  )
}
