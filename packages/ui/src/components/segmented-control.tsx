"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import { RadioGroup, RadioGroupItem } from "./radio-group"

export interface SegmentedOption {
  value: string
  label: string
  disabled?: boolean
}

export interface SegmentedControlProps {
  options: readonly SegmentedOption[]
  value?: string
  defaultValue?: string
  onValueChange?: (value: string) => void
  "aria-label": string
  className?: string
}

function enabledIndexAt(
  options: readonly SegmentedOption[],
  fromIndex: number,
  direction: 1 | -1,
): number | null {
  if (options.length === 0) return null
  let index = fromIndex
  for (let step = 0; step < options.length; step += 1) {
    index = (index + direction + options.length) % options.length
    const option = options[index]
    if (option && !option.disabled) return index
  }
  return null
}

export function SegmentedControl({
  options,
  value,
  defaultValue,
  onValueChange,
  className,
  "aria-label": ariaLabel,
}: SegmentedControlProps) {
  const [internalValue, setInternalValue] = React.useState(defaultValue)

  const resolvedValue = value !== undefined ? value : (internalValue ?? defaultValue)
  const resolvedIndex =
    resolvedValue !== undefined ? options.findIndex((option) => option.value === resolvedValue) : -1
  const showThumb = resolvedValue === undefined || resolvedIndex >= 0
  const thumbIndex = resolvedValue === undefined ? 0 : resolvedIndex
  const count = options.length

  const handleValueChange = React.useCallback(
    (next: string) => {
      if (value === undefined) {
        setInternalValue(next)
      }
      onValueChange?.(next)
    },
    [onValueChange, value],
  )

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (onValueChange === undefined) return
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return

    if (resolvedValue === undefined) return

    const currentIndex = options.findIndex((option) => option.value === resolvedValue)
    if (currentIndex < 0) return

    const direction = event.key === "ArrowRight" ? 1 : -1
    const nextIndex = enabledIndexAt(options, currentIndex, direction)
    if (nextIndex === null) return

    const nextOption = options[nextIndex]
    if (!nextOption) return

    event.preventDefault()
    handleValueChange(nextOption.value)
  }

  const radioValueChange =
    value === undefined || onValueChange !== undefined ? handleValueChange : undefined

  return (
    <RadioGroup
      aria-label={ariaLabel}
      className={cn("relative inline-grid gap-0 p-1", className)}
      style={{ gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))` }}
      onKeyDown={handleKeyDown}
      {...(resolvedValue !== undefined ? { value: resolvedValue } : {})}
      {...(radioValueChange !== undefined ? { onValueChange: radioValueChange } : {})}
    >
      {showThumb ? (
        <span
          data-testid="segment-thumb"
          data-index={String(thumbIndex)}
          aria-hidden="true"
          className={cn(
            "bg-background pointer-events-none absolute inset-y-1 left-1 rounded-md",
            "motion-safe:transition-transform",
          )}
          style={{
            width: `calc((100% - 0.5rem) / ${count})`,
            transform: `translateX(calc(${thumbIndex} * 100%))`,
          }}
        />
      ) : null}
      {options.map((option) => (
        <RadioGroupItem
          key={option.value}
          value={option.value}
          className={cn(
            "relative z-10 aspect-auto h-8 w-auto rounded-md border-0 bg-transparent px-3",
            "text-sm font-medium shadow-none",
            "data-[state=checked]:text-foreground data-[state=checked]:bg-transparent",
            "[&>span[data-state]]:hidden",
          )}
          {...(option.disabled === true ? { disabled: true } : {})}
        >
          {option.label}
        </RadioGroupItem>
      ))}
    </RadioGroup>
  )
}
