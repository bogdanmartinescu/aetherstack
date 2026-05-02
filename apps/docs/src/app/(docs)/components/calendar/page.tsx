"use client"

import { Calendar } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

const MANUAL_SOURCE = `"use client"

import { DayPicker, type DayPickerProps } from "react-day-picker"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { buttonVariants } from "./button"

export type CalendarProps = DayPickerProps

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        month_caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        button_previous: cn(
          buttonVariants({ variant: "outline" }),
          "absolute left-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        button_next: cn(
          buttonVariants({ variant: "outline" }),
          "absolute right-1 h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100",
        ),
        month_grid: "w-full border-collapse space-y-1",
        weekdays: "flex",
        weekday: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        week: "flex w-full mt-2",
        day: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
        day_button: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
        ),
        range_end: "day-range-end",
        selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        today: "bg-accent text-accent-foreground",
        outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
        disabled: "text-muted-foreground opacity-50",
        range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        hidden: "invisible",
        ...classNames,
      }}
      components={{
        Chevron: ({ orientation, ...rest }) =>
          orientation === "left" ? (
            <ChevronLeft className="h-4 w-4" {...rest} />
          ) : (
            <ChevronRight className="h-4 w-4" {...rest} />
          ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }`

export default function CalendarPage() {
  return (
    <ComponentPage
      name="Calendar"
      description="A fully styled date-picker calendar built on react-day-picker v9. Supports single, multiple, and range selection modes with full token styling — no extra CSS import required."
      features={[
        "Built on react-day-picker v9",
        "Single, multiple, and range selection modes",
        "Full token styling — uses design system colors, border-radius, and spacing",
        "No CSS import required — all styles applied via className props",
        "Outside days visible by default, easily hidden via showOutsideDays={false}",
        "Navigation arrows built with Lucide icons, styled to match Button variants",
      ]}
      preview={
        <div className="flex justify-center">
          <Calendar />
        </div>
      }
      previewCode={`import { Calendar } from "@/components/ui/calendar"

export function CalendarDemo() {
  return <Calendar />
}`}
      cliInstall={`npx aether-ui add calendar`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install react-day-picker`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Single date selection",
          description: "Controlled single-date picker using the mode=\"single\" prop.",
          preview: (
            <div className="flex justify-center">
              <Calendar mode="single" />
            </div>
          ),
          code: `"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"

export function SingleDatePicker() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
    />
  )
}`,
        },
        {
          title: "Date range selection",
          description: "Range mode highlights a start and end date along with all days in between.",
          preview: (
            <div className="flex justify-center">
              <Calendar mode="range" />
            </div>
          ),
          code: `"use client"

import { useState } from "react"
import { DateRange } from "react-day-picker"
import { Calendar } from "@/components/ui/calendar"

export function DateRangePicker() {
  const [range, setRange] = useState<DateRange | undefined>()

  return (
    <Calendar
      mode="range"
      selected={range}
      onSelect={setRange}
    />
  )
}`,
        },
      ]}
      props={[
        {
          name: "mode",
          type: '"single" | "multiple" | "range" | "default"',
          default: '"default"',
          description: "Selection mode. Use 'single' for one date, 'multiple' for several, 'range' for a start–end span.",
        },
        {
          name: "selected",
          type: "Date | Date[] | DateRange | undefined",
          description: "The currently selected date(s). Type depends on the mode prop.",
        },
        {
          name: "onSelect",
          type: "(value: ...) => void",
          description: "Callback fired when the user selects a date. Receives the new selected value.",
        },
        {
          name: "showOutsideDays",
          type: "boolean",
          default: "true",
          description: "Whether to render days from the previous and next months in the current month grid.",
        },
        {
          name: "disabled",
          type: "Matcher | Matcher[]",
          description: "Dates or date matchers that should be disabled and non-interactive.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional class names applied to the root DayPicker element.",
        },
      ]}
      a11yNotes={[
        "Uses native button elements for day cells — fully keyboard navigable with arrow keys.",
        "Selected and disabled states are communicated via aria-selected and aria-disabled.",
        "Navigation buttons include visible focus rings and meet contrast requirements.",
        "Screen readers announce month/year via the caption element.",
      ]}
      radixSource="https://react-day-picker.js.org"
    />
  )
}
