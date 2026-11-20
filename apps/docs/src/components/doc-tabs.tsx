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
      <div className="border-border flex gap-1 border-b">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2 text-sm font-medium transition-colors",
              active === tab.id
                ? "border-primary text-foreground"
                : "text-muted-foreground hover:text-foreground border-transparent",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs.find((t) => t.id === active)?.content}</div>
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
    <div className="border-border overflow-hidden rounded-lg border">
      <div className="border-border bg-muted/50 flex items-center justify-between border-b px-4">
        <div className="flex gap-1">
          {(["preview", "code"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                "-mb-px border-b-2 px-3 py-2.5 text-sm font-medium capitalize transition-colors",
                active === tab
                  ? "border-primary text-foreground"
                  : "text-muted-foreground hover:text-foreground border-transparent",
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        {active === "code" && (
          <button
            onClick={handleCopy}
            className="text-muted-foreground hover:text-foreground text-xs transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        )}
      </div>
      {active === "preview" ? (
        <div className="bg-background flex min-h-[160px] items-center justify-center p-8">
          {preview}
        </div>
      ) : (
        <pre className="bg-muted/50 overflow-x-auto p-4 text-sm leading-relaxed">
          {filename && (
            <div className="text-muted-foreground mb-3 font-mono text-xs">{filename}</div>
          )}
          <code className="text-foreground font-mono">{code.trim()}</code>
        </pre>
      )}
    </div>
  )
}
