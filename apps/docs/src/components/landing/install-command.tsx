"use client"

import * as React from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

export function InstallCommand({
  command,
  className,
}: {
  command: string
  className?: string
}) {
  const [copied, setCopied] = React.useState(false)
  const timeout = React.useRef<ReturnType<typeof setTimeout> | null>(null)

  React.useEffect(
    () => () => {
      if (timeout.current) clearTimeout(timeout.current)
    },
    [],
  )

  function copy() {
    if (!navigator.clipboard) return
    navigator.clipboard.writeText(command).then(
      () => {
        setCopied(true)
        if (timeout.current) clearTimeout(timeout.current)
        timeout.current = setTimeout(() => setCopied(false), 2000)
      },
      () => setCopied(false),
    )
  }

  return (
    <div
      className={cn(
        "inline-flex h-10 items-center gap-3 rounded-md border border-border bg-muted/50 pl-4 pr-1 font-mono text-sm",
        className,
      )}
    >
      <span aria-hidden="true" className="select-none text-muted-foreground">
        $
      </span>
      <code className="text-foreground">{command}</code>
      <Button
        variant="ghost"
        size="sm"
        icon={copied ? <Check /> : <Copy />}
        aria-label={copied ? "Copied" : `Copy “${command}”`}
        onClick={copy}
        className="ml-auto"
      />
      <span className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </span>
    </div>
  )
}
