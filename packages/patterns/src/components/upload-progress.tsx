"use client"

import { CheckCircle, X, XCircle } from "lucide-react"
import { Button, Progress, Spinner } from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

export interface UploadFile {
  id: string
  name: string
  size?: number
  progress: number
  status: "uploading" | "done" | "error"
  error?: string
}

export interface UploadProgressItemProps {
  file: UploadFile
  onRemove?: (id: string) => void
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

export function UploadProgressItem({ file, onRemove }: UploadProgressItemProps) {
  return (
    <div
      role="listitem"
      aria-label={`${file.name} — ${file.status}`}
      className={cn(
        "rounded-lg border border-border bg-card p-3",
        file.status === "error" && "border-destructive/50",
      )}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="truncate text-sm font-medium text-foreground">{file.name}</p>
            <div className="flex shrink-0 items-center gap-1">
              {file.status === "uploading" && (
                <Spinner size="sm" aria-label="Uploading" />
              )}
              {file.status === "done" && (
                <CheckCircle
                  className="h-4 w-4 text-green-600 dark:text-green-400"
                  aria-label="Upload complete"
                />
              )}
              {file.status === "error" && (
                <XCircle
                  className="h-4 w-4 text-destructive"
                  aria-label="Upload failed"
                />
              )}
              {onRemove && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 text-muted-foreground"
                  aria-label={`Remove ${file.name}`}
                  onClick={() => onRemove(file.id)}
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
          {file.size !== undefined && (
            <p className="mt-0.5 text-xs text-muted-foreground">{formatBytes(file.size)}</p>
          )}
          {file.status !== "error" ? (
            <Progress
              value={file.progress}
              className="mt-2 h-1.5"
              aria-label={`${file.name} upload progress`}
              aria-valuenow={file.progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          ) : (
            <p className="mt-1 text-xs text-destructive">{file.error ?? "Upload failed"}</p>
          )}
        </div>
      </div>
    </div>
  )
}

export interface UploadProgressProps {
  files: UploadFile[]
  onRemove?: (id: string) => void
  className?: string
}

export function UploadProgress({ files, onRemove, className }: UploadProgressProps) {
  return (
    <div role="list" aria-label="Upload progress" className={cn("flex flex-col gap-2", className)}>
      {files.map((file) => (
        <UploadProgressItem
          key={file.id}
          file={file}
          {...(onRemove !== undefined ? { onRemove } : {})}
        />
      ))}
    </div>
  )
}
