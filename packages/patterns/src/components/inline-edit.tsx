"use client"

import * as React from "react"
import { Pencil } from "lucide-react"
import { Input } from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

export interface InlineEditProps {
  value: string
  onValueChange?: (v: string) => void
  placeholder?: string
  className?: string
  inputClassName?: string
  renderDisplay?: (value: string) => React.ReactNode
  disabled?: boolean
}

export function InlineEdit({
  value,
  onValueChange,
  placeholder = "Click to edit",
  className,
  inputClassName,
  renderDisplay,
  disabled = false,
}: InlineEditProps) {
  const [editing, setEditing] = React.useState(false)
  const [draft, setDraft] = React.useState(value)
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (editing) {
      setDraft(value)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [editing, value])

  const commit = () => {
    setEditing(false)
    onValueChange?.(draft)
  }

  const cancel = () => {
    setEditing(false)
    setDraft(value)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      commit()
    } else if (e.key === "Escape") {
      e.preventDefault()
      cancel()
    }
  }

  if (editing) {
    return (
      <Input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        className={inputClassName}
        aria-label="Edit value"
      />
    )
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-label={`Edit: ${value || placeholder}`}
      aria-disabled={disabled}
      onClick={() => !disabled && setEditing(true)}
      onKeyDown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault()
          setEditing(true)
        }
      }}
      className={cn(
        "group inline-flex cursor-pointer items-center gap-1.5 rounded-md px-1 py-0.5 transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        disabled && "cursor-default opacity-60 hover:bg-transparent",
        className,
      )}
    >
      {renderDisplay ? (
        renderDisplay(value)
      ) : (
        <span className={cn(!value && "text-muted-foreground")}>{value || placeholder}</span>
      )}
      {!disabled && (
        <Pencil
          className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          aria-hidden="true"
        />
      )}
    </div>
  )
}
