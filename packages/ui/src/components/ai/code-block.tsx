"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@aetherstack/utils"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  /** 1-based line numbers to emphasise, e.g. `[2, 3]`. */
  highlightLines?: readonly number[]
  className?: string
}

const COPIED_RESET_MS = 2000

function useCopyToClipboard() {
  const [copied, setCopied] = React.useState(false)
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    },
    [],
  )

  const copy = React.useCallback((text: string) => {
    if (typeof navigator === "undefined" || !navigator.clipboard) return
    navigator.clipboard.writeText(text).then(
      () => {
        setCopied(true)
        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => setCopied(false), COPIED_RESET_MS)
      },
      () => setCopied(false),
    )
  }, [])

  return { copied, copy }
}

const copyButtonClassName = cn(
  "flex items-center gap-1 rounded text-xs text-muted-foreground transition-colors hover:text-foreground",
  "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
)

function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = false,
  highlightLines,
  className,
}: CodeBlockProps) {
  const { copied, copy } = useCopyToClipboard()
  const hasHeader = Boolean(filename ?? language)
  const renderLines = showLineNumbers || (highlightLines !== undefined && highlightLines.length > 0)
  const highlighted = React.useMemo(() => new Set(highlightLines), [highlightLines])

  // A trailing newline would otherwise render as an empty, numbered last line.
  const lines = code.replace(/\n$/, "").split("\n")
  const copyIcon = copied ? (
    <Check className="h-3.5 w-3.5" aria-hidden="true" />
  ) : (
    <Copy className="h-3.5 w-3.5" aria-hidden="true" />
  )

  return (
    <div
      className={cn(
        "border-border bg-muted group relative overflow-hidden rounded-lg border",
        className,
      )}
    >
      {hasHeader && (
        <div className="border-border bg-card flex items-center justify-between gap-2 border-b px-4 py-2">
          <div className="flex min-w-0 items-center gap-2">
            {filename && (
              <span className="text-muted-foreground truncate font-mono text-sm">{filename}</span>
            )}
            {language && !filename && (
              <span className="text-muted-foreground text-xs uppercase tracking-wide">
                {language}
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={() => copy(code)}
            className={cn(copyButtonClassName, "shrink-0 px-1 py-0.5")}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copyIcon}
            <span aria-hidden="true">{copied ? "Copied" : "Copy"}</span>
          </button>
        </div>
      )}
      <div className="relative">
        {!hasHeader && (
          <button
            type="button"
            onClick={() => copy(code)}
            className={cn(
              copyButtonClassName,
              "bg-muted/80 absolute right-2 top-2 z-10 px-2 py-1 backdrop-blur-sm",
              "focus-visible:opacity-100 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100",
              copied && "opacity-100",
            )}
            aria-label={copied ? "Copied" : "Copy code"}
          >
            {copyIcon}
          </button>
        )}
        <pre
          tabIndex={0}
          data-language={language}
          className="focus-visible:ring-ring overflow-x-auto p-4 font-mono text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset"
        >
          {renderLines ? (
            <code className="grid w-max min-w-full">
              {lines.map((line, i) => {
                const lineNumber = i + 1
                const isHighlighted = highlighted.has(lineNumber)
                return (
                  <span
                    key={i}
                    data-line={lineNumber}
                    data-highlighted={isHighlighted || undefined}
                    className={cn(
                      "-mx-4 flex px-4",
                      isHighlighted && "border-primary bg-primary/10 border-l-2 pl-[14px]",
                    )}
                  >
                    {showLineNumbers && (
                      <span
                        aria-hidden="true"
                        className="text-muted-foreground mr-4 w-8 shrink-0 select-none text-right"
                      >
                        {lineNumber}
                      </span>
                    )}
                    <span>{line || " "}</span>
                  </span>
                )
              })}
            </code>
          ) : (
            <code>{code}</code>
          )}
        </pre>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  )
}

export { CodeBlock }
export type { CodeBlockProps }
