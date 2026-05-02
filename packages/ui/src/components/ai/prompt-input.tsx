"use client"

import * as React from "react"
import { SendHorizonal } from "lucide-react"
import { cn } from "@aetherstack/utils"

interface PromptInputProps {
  value?: string
  onValueChange?: (v: string) => void
  onSubmit?: (value: string) => void
  placeholder?: string
  disabled?: boolean
  isLoading?: boolean
  maxLength?: number
  attachSlot?: React.ReactNode
  className?: string
}

function PromptInput({
  value = "",
  onValueChange,
  onSubmit,
  placeholder = "Ask anything…",
  disabled = false,
  isLoading = false,
  maxLength,
  attachSlot,
  className,
}: PromptInputProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  function resize() {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 200)}px`
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      if (value.trim() && !disabled && !isLoading) {
        onSubmit?.(value)
      }
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    onValueChange?.(e.target.value)
    resize()
  }

  const canSubmit = value.trim().length > 0 && !disabled && !isLoading

  return (
    <div
      className={cn(
        "flex flex-col gap-2 rounded-xl border border-input bg-background px-3 py-2 shadow-sm focus-within:ring-2 focus-within:ring-ring",
        className,
      )}
    >
      {attachSlot && <div className="flex items-center gap-1">{attachSlot}</div>}
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          maxLength={maxLength}
          rows={1}
          className="flex-1 resize-none bg-transparent text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50 max-h-[200px] min-h-[24px]"
        />
        <button
          onClick={() => canSubmit && onSubmit?.(value)}
          disabled={!canSubmit}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
          aria-label="Submit"
        >
          {isLoading ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
          ) : (
            <SendHorizonal className="h-4 w-4" />
          )}
        </button>
      </div>
      {maxLength !== undefined && (
        <div className="flex justify-end">
          <span className="text-xs text-muted-foreground">
            {value.length} / {maxLength}
          </span>
        </div>
      )}
    </div>
  )
}

export { PromptInput }
