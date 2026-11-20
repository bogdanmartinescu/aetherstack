"use client"

import * as React from "react"
import { Link } from "lucide-react"
import { cn } from "@aetherstack/utils"

interface SourceCardProps {
  title: string
  url: string
  excerpt?: string
  favicon?: string
  /** Citation number shown as a badge, e.g. `1` for "[1]" in the response text. */
  index?: number
  className?: string
}

function getDomain(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "")
  } catch {
    return url
  }
}

function SourceCard({ title, url, excerpt, favicon, index, className }: SourceCardProps) {
  const [faviconFailed, setFaviconFailed] = React.useState(false)
  const domain = getDomain(url)

  React.useEffect(() => setFaviconFailed(false), [favicon])

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      title={url}
      className={cn(
        "flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-sm transition-colors hover:bg-accent",
        "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="mt-0.5 flex flex-shrink-0 items-center gap-2">
        {index !== undefined && (
          <span className="flex h-5 min-w-5 items-center justify-center rounded bg-muted px-1 font-mono text-[11px] font-medium text-muted-foreground">
            {index}
          </span>
        )}
        {favicon && !faviconFailed ? (
          <img
            src={favicon}
            alt=""
            className="h-4 w-4 rounded-sm"
            onError={() => setFaviconFailed(true)}
          />
        ) : (
          <Link className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{domain}</p>
        {excerpt && <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{excerpt}</p>}
      </div>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export { SourceCard }
export type { SourceCardProps }
