"use client"

import * as React from "react"
import { SendHorizonal, Square } from "lucide-react"
import { cn } from "@aetherstack/utils"

interface PromptInputProps {
  /** Controlled value. Omit to let the component manage its own state. */
  value?: string
  /** Initial value when uncontrolled. Cleared automatically after submit. */
  defaultValue?: string
  onValueChange?: (v: string) => void
  onSubmit?: (value: string) => void
  /** When provided, the submit button becomes a stop button while `isLoading`. */
  onStop?: () => void
  placeholder?: string
  disabled?: boolean
  isLoading?: boolean
  maxLength?: number
  /** Maximum height in px before the textarea scrolls. Defaults to 200. */
  maxHeight?: number
  attachSlot?: React.ReactNode
  autoFocus?: boolean
  "aria-label"?: string
  className?: string
}

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect

const PromptInput = React.forwardRef<HTMLTextAreaElement, PromptInputProps>(
  function PromptInput(
    {
      value: valueProp,
      defaultValue = "",
      onValueChange,
      onSubmit,
      onStop,
      placeholder = "Ask anything…",
      disabled = false,
      isLoading = false,
      maxLength,
      maxHeight = 200,
      attachSlot,
      autoFocus,
      "aria-label": ariaLabel,
      className,
    },
    ref,
  ) {
    const isControlled = valueProp !== undefined
    const [internalValue, setInternalValue] = React.useState(defaultValue)
    const value = isControlled ? valueProp : internalValue

    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null)
    const counterId = React.useId()

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node
        if (typeof ref === "function") ref(node)
        else if (ref) ref.current = node
      },
      [ref],
    )

    // Resize on every value change, including external resets after submit.
    useIsomorphicLayoutEffect(() => {
      const el = textareaRef.current
      if (!el) return
      el.style.height = "auto"
      el.style.height = `${Math.min(el.scrollHeight, maxHeight)}px`
    }, [value, maxHeight])

    function setValue(next: string) {
      if (!isControlled) setInternalValue(next)
      onValueChange?.(next)
    }

    const canSubmit = value.trim().length > 0 && !disabled && !isLoading
    const showStop = isLoading && onStop !== undefined

    function submit() {
      if (!canSubmit) return
      onSubmit?.(value)
      if (!isControlled) setInternalValue("")
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
      if (e.key !== "Enter" || e.shiftKey || e.nativeEvent.isComposing) return
      e.preventDefault()
      submit()
    }

    const nearLimit = maxLength !== undefined && value.length >= maxLength * 0.9

    return (
      <div
        data-disabled={disabled || undefined}
        className={cn(
          "flex flex-col gap-2 rounded-xl border border-input bg-background px-3 py-2 shadow-sm",
          "ring-offset-background transition-shadow focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2",
          "data-[disabled]:cursor-not-allowed data-[disabled]:opacity-60",
          className,
        )}
      >
        {attachSlot && <div className="flex flex-wrap items-center gap-1">{attachSlot}</div>}
        <div className="flex items-end gap-2">
          <textarea
            ref={setRefs}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            aria-label={ariaLabel ?? placeholder}
            aria-describedby={maxLength !== undefined ? counterId : undefined}
            disabled={disabled}
            maxLength={maxLength}
            autoFocus={autoFocus}
            rows={1}
            style={{ maxHeight }}
            className="min-h-[24px] flex-1 resize-none bg-transparent py-1 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed"
          />
          <button
            type="button"
            onClick={showStop ? onStop : submit}
            disabled={showStop ? false : !canSubmit}
            aria-label={showStop ? "Stop generating" : "Submit"}
            className={cn(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground",
              "ring-offset-background transition-opacity hover:bg-primary/90",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
              "disabled:pointer-events-none disabled:opacity-40",
            )}
          >
            {showStop ? (
              <Square className="h-3.5 w-3.5" fill="currentColor" aria-hidden="true" />
            ) : isLoading ? (
              <span
                aria-hidden="true"
                className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent motion-reduce:animate-none"
              />
            ) : (
              <SendHorizonal className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {maxLength !== undefined && (
          <div className="flex justify-end">
            <span
              id={counterId}
              className={cn(
                "text-xs tabular-nums",
                nearLimit ? "text-destructive" : "text-muted-foreground",
              )}
            >
              {value.length} / {maxLength}
            </span>
          </div>
        )}
      </div>
    )
  },
)
PromptInput.displayName = "PromptInput"

export { PromptInput }
export type { PromptInputProps }
