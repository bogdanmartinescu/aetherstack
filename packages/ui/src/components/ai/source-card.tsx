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
        "border-border bg-card hover:bg-accent flex items-start gap-3 rounded-lg border p-3 text-sm transition-colors",
        "ring-offset-background focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        className,
      )}
    >
      <div className="mt-0.5 flex flex-shrink-0 items-center gap-2">
        {index !== undefined && (
          <span className="bg-muted text-muted-foreground flex h-5 min-w-5 items-center justify-center rounded px-1 font-mono text-[11px] font-medium">
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
          <Link className="text-muted-foreground h-4 w-4" aria-hidden="true" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-foreground truncate font-medium">{title}</p>
        <p className="text-muted-foreground truncate text-xs">{domain}</p>
        {excerpt && <p className="text-muted-foreground mt-1 line-clamp-2 text-xs">{excerpt}</p>}
      </div>
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export { SourceCard }
export type { SourceCardProps }
