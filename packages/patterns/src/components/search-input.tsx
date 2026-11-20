"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { Input, Spinner } from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

export interface SearchInputProps {
  value?: string
  onValueChange?: (v: string) => void
  placeholder?: string
  shortcut?: string
  loading?: boolean
  className?: string
  defaultValue?: string
}

export function SearchInput({
  value,
  onValueChange,
  placeholder = "Search...",
  shortcut,
  loading = false,
  className,
  defaultValue,
}: SearchInputProps) {
  const isControlled = value !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue ?? "")
  const displayValue = isControlled ? value : internalValue

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const next = e.target.value
    if (!isControlled) setInternalValue(next)
    onValueChange?.(next)
  }

  const handleClear = () => {
    if (!isControlled) setInternalValue("")
    onValueChange?.("")
  }

  const showClear = !loading && Boolean(displayValue)
  const showShortcut = !loading && !displayValue && Boolean(shortcut)

  return (
    <div className={cn("relative flex items-center", className)}>
      <Search
        className="text-muted-foreground pointer-events-none absolute left-3 h-4 w-4"
        aria-hidden="true"
      />
      <Input
        type="search"
        role="searchbox"
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        aria-label={placeholder}
        className={cn("pl-9", (showClear || showShortcut || loading) && "pr-9")}
      />
      <div className="absolute right-3 flex items-center gap-1.5">
        {loading && <Spinner size="sm" aria-label="Loading search results" />}
        {showClear && (
          <button
            type="button"
            aria-label="Clear search"
            onClick={handleClear}
            className="text-muted-foreground hover:text-foreground focus:ring-ring rounded transition-colors focus:outline-none focus:ring-1"
          >
            <X className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        )}
        {showShortcut && (
          <kbd className="border-border bg-muted text-muted-foreground pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium">
            {shortcut}
          </kbd>
        )}
      </div>
    </div>
  )
}
