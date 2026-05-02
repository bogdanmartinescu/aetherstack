"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { cn } from "@aetherstack/utils"

interface CodeBlockProps {
  code: string
  language?: string
  filename?: string
  showLineNumbers?: boolean
  className?: string
}

function CodeBlock({
  code,
  language,
  filename,
  showLineNumbers = false,
  className,
}: CodeBlockProps) {
  const [copied, setCopied] = React.useState(false)

  function handleCopy() {
    void navigator.clipboard.writeText(code).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  const lines = code.split("\n")

  return (
    <div className={cn("rounded-lg border border-border overflow-hidden bg-muted", className)}>
      {(filename ?? language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
          <div className="flex items-center gap-2">
            {filename && (
              <span className="text-sm font-mono text-muted-foreground">
                {filename}
              </span>
            )}
            {language && !filename && (
              <span className="text-xs text-muted-foreground uppercase tracking-wide">
                {language}
              </span>
            )}
          </div>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      )}
      <div className="relative">
        {!filename && !language && (
          <button
            onClick={handleCopy}
            className="absolute top-2 right-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors bg-muted/80 rounded px-2 py-1"
            aria-label="Copy code"
          >
            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          </button>
        )}
        <pre className="p-4 overflow-x-auto text-sm font-mono">
          <code>
            {showLineNumbers
              ? lines.map((line, i) => (
                  <span key={i} className="flex">
                    <span className="select-none text-muted-foreground w-8 shrink-0 text-right mr-4">
                      {i + 1}
                    </span>
                    <span>{line}</span>
                  </span>
                ))
              : code}
          </code>
        </pre>
      </div>
    </div>
  )
}

export { CodeBlock }
