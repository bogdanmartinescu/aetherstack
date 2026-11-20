"use client"

import * as React from "react"
import { Button } from "./button"
import { RadioGroup, RadioGroupItem } from "./radio-group"

export interface TimeSlot {
  id: string
  label: string
  disabled?: boolean
}

export interface TimeSlotsProps {
  timeZoneLabel: string
  slots: readonly TimeSlot[]
  value?: string
  onValueChange?: (id: string) => void
  onConfirm?: (id: string) => void
  confirmLabel?: string
  className?: string
}

export function TimeSlots({
  timeZoneLabel,
  slots,
  value,
  onValueChange,
  onConfirm,
  confirmLabel = "Confirm",
  className,
}: TimeSlotsProps) {
  const [internal, setInternal] = React.useState<string | undefined>(undefined)

  const resolvedValue = value !== undefined ? value : internal ?? ""
  const confirmDisabled = resolvedValue === ""

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (value === undefined) {
        setInternal(next)
      }
      onValueChange?.(next)
    },
    [onValueChange, value],
  )

  const handleConfirm = React.useCallback(() => {
    if (resolvedValue === "" || onConfirm === undefined) return
    onConfirm(resolvedValue)
  }, [onConfirm, resolvedValue])

  return (
    <div {...(className !== undefined ? { className } : {})}>
      <p className="text-sm text-muted-foreground">{timeZoneLabel}</p>
      <RadioGroup
        aria-label="Times"
        className="mt-3"
        value={resolvedValue}
        onValueChange={handleValueChange}
      >
        {slots.map((slot) => (
          <RadioGroupItem
            key={slot.id}
            value={slot.id}
            className="flex items-center gap-2 text-sm font-medium leading-none"
            {...(slot.disabled === true ? { disabled: true } : {})}
          >
            {slot.label}
          </RadioGroupItem>
        ))}
      </RadioGroup>
      <Button
        type="button"
        className="mt-4"
        disabled={confirmDisabled}
        onClick={handleConfirm}
      >
        {confirmLabel}
      </Button>
    </div>
  )
}