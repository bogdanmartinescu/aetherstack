import { Link } from "lucide-react"
import { cn } from "@aetherstack/utils"

interface SourceCardProps {
  title: string
  url: string
  excerpt?: string
  favicon?: string
  className?: string
}

function SourceCard({ title, url, excerpt, favicon, className }: SourceCardProps) {
  let domain = ""
  try {
    domain = new URL(url).hostname.replace(/^www\./, "")
  } catch {
    domain = url
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "flex items-start gap-3 rounded-lg border border-border bg-card p-3 text-sm hover:bg-accent transition-colors",
        className,
      )}
    >
      <div className="mt-0.5 flex-shrink-0">
        {favicon ? (
          <img src={favicon} alt="" className="h-4 w-4 rounded-sm" />
        ) : (
          <Link className="h-4 w-4 text-muted-foreground" />
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium text-foreground">{title}</p>
        <p className="truncate text-xs text-muted-foreground">{domain}</p>
        {excerpt && (
          <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">{excerpt}</p>
        )}
      </div>
    </a>
  )
}

export { SourceCard }
