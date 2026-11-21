"use client"

import { useState } from "react"
import { HighlightedCode } from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"
import { inferCodeLanguage } from "@/lib/code-language"

interface CodeBlockProps {
  code: string
  lang?: string
  filename?: string
  className?: string
}

export function CodeBlock({ code, lang, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const source = code.trim()

  const handleCopy = async () => {
    await navigator.clipboard.writeText(source)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "border-border bg-muted/50 relative overflow-hidden rounded-lg border",
        className,
      )}
    >
      {filename && (
        <div className="border-border bg-muted flex items-center justify-between border-b px-4 py-2">
          <span className="text-muted-foreground font-mono text-xs">{filename}</span>
        </div>
      )}
      <div className="relative">
        <pre className="overflow-x-auto p-4 text-sm leading-relaxed">
          <code className="text-foreground font-mono">
            <HighlightedCode code={source} language={inferCodeLanguage(source, lang, filename)} />
          </code>
        </pre>
        <button
          onClick={handleCopy}
          className="border-border bg-background text-muted-foreground hover:text-foreground absolute right-3 top-3 rounded-md border px-2 py-1 text-xs transition-colors"
          aria-label="Copy code"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  )
}

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-muted text-foreground rounded px-1.5 py-0.5 font-mono text-[0.85em]">
      {children}
    </code>
  )
}
