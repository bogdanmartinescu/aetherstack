"use client"

import * as React from "react"
import { CalendarIcon } from "lucide-react"
import { Button, Calendar, Popover, PopoverContent, PopoverTrigger } from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

export interface DateRange {
  from?: Date
  to?: Date
}

export interface DateRangePickerProps {
  value?: DateRange
  onValueChange?: (range: DateRange | undefined) => void
  placeholder?: string
  disabled?: boolean
  className?: string
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

export function DateRangePicker({
  value,
  onValueChange,
  placeholder = "Pick a date range",
  disabled = false,
  className,
}: DateRangePickerProps) {
  const [open, setOpen] = React.useState(false)

  const displayValue = React.useMemo(() => {
    if (!value?.from) return placeholder
    if (!value.to) return formatDate(value.from)
    return `${formatDate(value.from)} – ${formatDate(value.to)}`
  }, [value, placeholder])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className={cn(
            "justify-start gap-2 text-left font-normal",
            !value?.from && "text-muted-foreground",
            className,
          )}
          aria-label="Open date range picker"
          aria-expanded={open}
          aria-haspopup="dialog"
        >
          <CalendarIcon className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{displayValue}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          mode="range"
          selected={value as { from: Date; to: Date }}
          onSelect={(range) => onValueChange?.(range as DateRange | undefined)}
          numberOfMonths={2}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
