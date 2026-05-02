"use client"

import * as React from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Command as CommandPrimitive } from "cmdk"
import { Badge, Button, Popover, PopoverContent, PopoverTrigger } from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

export interface MultiSelectOption {
  value: string
  label: string
}

export interface MultiSelectProps {
  options: MultiSelectOption[]
  value?: string[]
  onValueChange?: (values: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  disabled?: boolean
  className?: string
  maxSelected?: number
}

export function MultiSelect({
  options,
  value = [],
  onValueChange,
  placeholder = "Select...",
  searchPlaceholder = "Search...",
  disabled = false,
  className,
  maxSelected,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [search, setSearch] = React.useState("")

  const selected = React.useMemo(
    () => options.filter((o) => value.includes(o.value)),
    [options, value],
  )

  const toggle = (optionValue: string) => {
    if (value.includes(optionValue)) {
      onValueChange?.(value.filter((v) => v !== optionValue))
    } else {
      if (maxSelected !== undefined && value.length >= maxSelected) return
      onValueChange?.([...value, optionValue])
    }
  }

  const clearAll = () => onValueChange?.([])

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {selected.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {selected.map((opt) => (
            <Badge key={opt.value} variant="secondary" className="gap-1 pr-1">
              {opt.label}
              <button
                type="button"
                aria-label={`Remove ${opt.label}`}
                disabled={disabled}
                onClick={() => toggle(opt.value)}
                className="ml-0.5 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              >
                <X className="h-3 w-3" aria-hidden="true" />
              </button>
            </Badge>
          ))}
          <button
            type="button"
            disabled={disabled}
            onClick={clearAll}
            className="rounded text-xs text-muted-foreground underline-offset-2 hover:underline focus:outline-none focus:ring-1 focus:ring-ring"
          >
            Clear all
          </button>
        </div>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            aria-label="Select options"
            disabled={disabled}
            className={cn(
              "w-full justify-between font-normal",
              !selected.length && "text-muted-foreground",
            )}
          >
            <span>
              {selected.length === 0 ? placeholder : `${selected.length} selected`}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" aria-hidden="true" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[--radix-popover-trigger-width] p-0" align="start">
          <CommandPrimitive>
            <div className="flex items-center border-b border-border px-3">
              <CommandPrimitive.Input
                placeholder={searchPlaceholder}
                value={search}
                onValueChange={setSearch}
                className="flex h-10 w-full bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <CommandPrimitive.List className="max-h-60 overflow-y-auto overflow-x-hidden p-1">
              <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
                No options found.
              </CommandPrimitive.Empty>
              {options.map((opt) => {
                const isSelected = value.includes(opt.value)
                const isAtMax =
                  maxSelected !== undefined && value.length >= maxSelected && !isSelected
                return (
                  <CommandPrimitive.Item
                    key={opt.value}
                    value={opt.label}
                    disabled={isAtMax}
                    onSelect={() => toggle(opt.value)}
                    className="relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none aria-selected:bg-accent aria-selected:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
                  >
                    <span
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center",
                        isSelected ? "opacity-100" : "opacity-0",
                      )}
                    >
                      <Check className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {opt.label}
                  </CommandPrimitive.Item>
                )
              })}
            </CommandPrimitive.List>
          </CommandPrimitive>
        </PopoverContent>
      </Popover>
    </div>
  )
}
