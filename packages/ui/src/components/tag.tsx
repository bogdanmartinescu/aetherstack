"use client"

import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@aetherstack/utils"

export interface TagProps {
  label: string
  onRemove?: () => void
  className?: string
}

const chipClass =
  "inline-flex items-center gap-1 rounded-md border border-border bg-muted px-2 py-0.5 text-xs"

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"

export function Tag({ label, onRemove, className }: TagProps) {
  return (
    <span className={cn(chipClass, className)}>
      {label}
      {onRemove ? (
        <button
          type="button"
          aria-label={`Remove ${label}`}
          onClick={onRemove}
          className={cn("rounded-sm opacity-70 hover:opacity-100", focusRing)}
        >
          <X className="h-3 w-3" aria-hidden />
        </button>
      ) : null}
    </span>
  )
}

export interface TagItem {
  id: string
  label: string
}

export interface TagGroupProps {
  label: string
  items: readonly TagItem[]
  selection?: "single" | "multiple"
  value?: readonly string[]
  onValueChange?: (value: string[]) => void
  className?: string
}

export function TagGroup({
  label,
  items,
  selection,
  value,
  onValueChange,
  className,
}: TagGroupProps) {
  const [active, setActive] = React.useState(0)
  const moved = React.useRef(false)
  const buttonRefs = React.useRef<(HTMLButtonElement | null)[]>([])

  const tabStopIndex = items.length === 0 ? 0 : Math.min(active, items.length - 1)

  React.useEffect(() => {
    if (!moved.current) return
    buttonRefs.current[tabStopIndex]?.focus()
    moved.current = false
  }, [tabStopIndex])

  const moveActive = React.useCallback(
    (next: number) => {
      if (items.length === 0) return
      setActive(next)
      moved.current = true
    },
    [items.length],
  )

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number,
  ) => {
    if (items.length === 0) return
    if (event.key === "ArrowRight") {
      event.preventDefault()
      moveActive((index + 1) % items.length)
    } else if (event.key === "ArrowLeft") {
      event.preventDefault()
      moveActive((index - 1 + items.length) % items.length)
    } else if (event.key === "Home") {
      event.preventDefault()
      moveActive(0)
    } else if (event.key === "End") {
      event.preventDefault()
      moveActive(items.length - 1)
    }
  }

  const handleItemClick = (id: string) => {
    if (selection === undefined || onValueChange === undefined) return
    if (selection === "single") {
      onValueChange([id])
      return
    }
    const current = value ?? []
    if (current.includes(id)) {
      onValueChange(current.filter((itemId) => itemId !== id))
    } else {
      onValueChange([...current, id])
    }
  }

  return (
    <div
      role="group"
      aria-label={label}
      className={cn("inline-flex flex-wrap gap-1", className)}
    >
      {items.map((item, index) => (
        <button
          key={item.id}
          ref={(node) => {
            buttonRefs.current[index] = node
          }}
          type="button"
          tabIndex={index === tabStopIndex ? 0 : -1}
          aria-pressed={value?.includes(item.id) ?? false}
          onFocus={() => setActive(index)}
          onClick={() => handleItemClick(item.id)}
          onKeyDown={(event) => handleKeyDown(event, index)}
          className={cn(chipClass, focusRing)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}