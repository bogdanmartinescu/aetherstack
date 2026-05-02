"use client"

import * as React from "react"
import { DateRangePicker, type DateRange } from "@aetherstack/patterns"

export function DateRangePickerPreview() {
  const [value, setValue] = React.useState<DateRange>({
    from: new Date(2024, 0, 10),
    to: new Date(2024, 0, 24),
  })

  return (
    <div className="w-full max-w-sm space-y-4">
      <DateRangePicker
        value={value}
        onValueChange={(range) => range && setValue(range)}
        placeholder="Pick a date range"
      />
      <p className="text-xs text-muted-foreground text-center">
        {value.from && value.to
          ? `${value.from.toLocaleDateString()} → ${value.to.toLocaleDateString()}`
          : "No range selected"}
      </p>
    </div>
  )
}
