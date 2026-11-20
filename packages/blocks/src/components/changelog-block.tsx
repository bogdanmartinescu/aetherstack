import { cn } from "@aetherstack/utils"
import { Badge, Separator } from "@aetherstack/ui"

export type ChangeType = "added" | "changed" | "fixed" | "removed"

export interface ChangeGroup {
  type: ChangeType
  items: string[]
}

export interface ChangelogEntry {
  id: string
  version?: string
  date: string
  title: string
  description?: string
  tags?: string[]
  changes?: ChangeGroup[]
}

export interface ChangelogBlockProps {
  entries: ChangelogEntry[]
  className?: string
}

const changeTypeConfig: Record<
  ChangeType,
  { label: string; variant: "default" | "secondary" | "destructive" | "outline" }
> = {
  added: { label: "Added", variant: "default" },
  changed: { label: "Changed", variant: "secondary" },
  fixed: { label: "Fixed", variant: "outline" },
  removed: { label: "Removed", variant: "destructive" },
}

export function ChangelogBlock({ entries, className }: ChangelogBlockProps) {
  return (
    <div className={cn("w-full", className)}>
      <div className="relative mx-auto max-w-3xl space-y-0">
        {entries.map((entry, i) => (
          <div key={entry.id} className="relative flex gap-6 pb-10">
            {/* Timeline line */}
            <div className="flex flex-col items-center">
              <div className="border-primary bg-background mt-1.5 h-3 w-3 shrink-0 rounded-full border-2" />
              {i < entries.length - 1 && <div className="bg-border mt-1 w-px flex-1" />}
            </div>

            {/* Content */}
            <div className="flex-1 pb-2">
              <div className="flex flex-wrap items-center gap-2">
                {entry.version && (
                  <Badge variant="secondary" className="font-mono text-xs">
                    {entry.version}
                  </Badge>
                )}
                <time className="text-muted-foreground text-xs">{entry.date}</time>
                {entry.tags?.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>

              <h3 className="text-foreground mt-2 text-base font-semibold">{entry.title}</h3>

              {entry.description && (
                <p className="text-muted-foreground mt-1.5 text-sm">{entry.description}</p>
              )}

              {entry.changes && entry.changes.length > 0 && (
                <div className="mt-4 space-y-3">
                  {entry.changes.map((group) => {
                    const config = changeTypeConfig[group.type]
                    return (
                      <div key={group.type}>
                        <div className="mb-1.5 flex items-center gap-2">
                          <Badge variant={config.variant} className="text-xs">
                            {config.label}
                          </Badge>
                        </div>
                        <ul className="space-y-1 pl-1">
                          {group.items.map((item, j) => (
                            <li key={j} className="text-foreground flex items-start gap-2 text-sm">
                              <span
                                className="bg-muted-foreground mt-2 h-1 w-1 shrink-0 rounded-full"
                                aria-hidden
                              />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                </div>
              )}

              {i < entries.length - 1 && <Separator className="mt-6 hidden" />}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
