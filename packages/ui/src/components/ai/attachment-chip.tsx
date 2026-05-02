import { FileText, X } from "lucide-react"
import { cn } from "@aetherstack/utils"

interface AttachmentChipProps {
  name: string
  size?: number
  type?: string
  onRemove?: () => void
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function AttachmentChip({ name, size, type: _type, onRemove, className }: AttachmentChipProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-border bg-muted px-2.5 py-1 text-sm",
        className,
      )}
    >
      <FileText className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
      <span className="max-w-[120px] truncate font-medium">{name}</span>
      {size !== undefined && (
        <span className="text-xs text-muted-foreground shrink-0">{formatBytes(size)}</span>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className="ml-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded hover:bg-accent transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  )
}

export { AttachmentChip }
