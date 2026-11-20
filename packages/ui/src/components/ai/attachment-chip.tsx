import {
  CircleAlert,
  FileArchive,
  FileAudio,
  FileCode,
  FileImage,
  FileText,
  FileVideo,
  X,
  type LucideIcon,
} from "lucide-react"
import { cn } from "@aetherstack/utils"

interface AttachmentChipProps {
  name: string
  /** File size in bytes. */
  size?: number
  /** MIME type. Used to pick an icon; falls back to the file extension. */
  type?: string
  status?: "idle" | "uploading" | "error"
  onRemove?: () => void
  className?: string
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
}

const CODE_EXTENSIONS = new Set([
  "js", "jsx", "ts", "tsx", "json", "py", "rb", "go", "rs", "java", "c", "cpp", "h",
  "css", "html", "sh", "yml", "yaml", "sql",
])
const IMAGE_EXTENSIONS = new Set(["png", "jpg", "jpeg", "gif", "webp", "svg", "avif"])
const ARCHIVE_EXTENSIONS = new Set(["zip", "tar", "gz", "tgz", "rar", "7z"])
const AUDIO_EXTENSIONS = new Set(["mp3", "wav", "ogg", "m4a", "flac"])
const VIDEO_EXTENSIONS = new Set(["mp4", "mov", "webm", "mkv", "avi"])

function getFileIcon(name: string, type?: string): LucideIcon {
  const mime = type?.toLowerCase() ?? ""
  const ext = name.includes(".") ? (name.split(".").pop()?.toLowerCase() ?? "") : ""

  if (mime.startsWith("image/") || IMAGE_EXTENSIONS.has(ext)) return FileImage
  if (mime.startsWith("audio/") || AUDIO_EXTENSIONS.has(ext)) return FileAudio
  if (mime.startsWith("video/") || VIDEO_EXTENSIONS.has(ext)) return FileVideo
  if (/zip|tar|compressed|archive/.test(mime) || ARCHIVE_EXTENSIONS.has(ext)) return FileArchive
  if (/json|javascript|typescript|x-python|x-sh|xml/.test(mime) || CODE_EXTENSIONS.has(ext)) {
    return FileCode
  }
  return FileText
}

function AttachmentChip({
  name,
  size,
  type,
  status = "idle",
  onRemove,
  className,
}: AttachmentChipProps) {
  const Icon = getFileIcon(name, type)

  return (
    <div
      title={name}
      data-status={status}
      aria-busy={status === "uploading" || undefined}
      className={cn(
        "inline-flex max-w-full items-center gap-1.5 rounded-md border border-border bg-muted py-1 pl-2.5 text-sm",
        onRemove ? "pr-1" : "pr-2.5",
        status === "error" && "border-destructive/50 bg-destructive/10 text-destructive",
        className,
      )}
    >
      {status === "uploading" ? (
        <span
          aria-hidden="true"
          className="h-3.5 w-3.5 shrink-0 animate-spin rounded-full border-2 border-muted-foreground border-t-transparent motion-reduce:animate-none"
        />
      ) : status === "error" ? (
        <CircleAlert className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      ) : (
        <Icon className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      )}
      <span className="max-w-[160px] truncate font-medium">{name}</span>
      {size !== undefined && (
        <span className="shrink-0 text-xs text-muted-foreground">{formatBytes(size)}</span>
      )}
      {status === "uploading" && <span className="sr-only">Uploading</span>}
      {status === "error" && <span className="sr-only">Upload failed</span>}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          aria-label={`Remove ${name}`}
          className={cn(
            "ml-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded text-muted-foreground",
            "ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          <X className="h-3 w-3" aria-hidden="true" />
        </button>
      )}
    </div>
  )
}

export { AttachmentChip }
export type { AttachmentChipProps }
