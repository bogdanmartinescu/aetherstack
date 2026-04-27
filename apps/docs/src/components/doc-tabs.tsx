"use client"

import { useState } from "react"
import { cn } from "@aetherstack/utils"

interface Tab {
  id: string
  label: string
  content: React.ReactNode
}

interface DocTabsProps {
  tabs: Tab[]
  defaultTab?: string
  className?: string
}

export function DocTabs({ tabs, defaultTab, className }: DocTabsProps) {
  const [active, setActive] = useState(defaultTab ?? tabs[0]?.id)

  return (
    <div className={cn("w-full", className)}>
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px",
              active === tab.id
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tabs.find((t) => t.id === active)?.content}
      </div>
    </div>
  )
}

interface PreviewTabsProps {
  preview: React.ReactNode
  code: string
  filename?: string
}

export function PreviewTabs({ preview, code, filename }: PreviewTabsProps) {
  const [active, setActive] = useState<"preview" | "code">("preview")
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-lg border border-border overflow-hidden">
      <div className="flex items-center justify-between border-b border-border bg-muted/50 px-4">
        <div className="flex gap-1">
          {(["preview", "code"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "px-3 py-2.5 text-sm font-medium capitalize transition-colors border-b-2 -mb-px",
                active === tab
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        {active === "code" && (
          <button
            onClick={handleCopy}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
      {active === "preview" ? (
        <div className="flex min-h-[160px] items-center justify-center bg-background p-8">
          {preview}
        </div>
      ) : (
        <pre className="overflow-x-auto bg-muted/50 p-4 text-sm leading-relaxed">
          {filename && (
            <div className="mb-3 font-mono text-xs text-muted-foreground">{filename}</div>
          )}
          <code className="font-mono text-foreground">{code.trim()}</code>
        </pre>
      )}
    </div>
  )
}
