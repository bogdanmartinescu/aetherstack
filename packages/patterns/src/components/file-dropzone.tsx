"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"

// ── Types ─────────────────────────────────────────────────────────────────────

export interface FileDropzoneProps {
  onFilesSelected: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number
  className?: string
  disabled?: boolean
  children?: React.ReactNode
}

// ── FileDropzone ──────────────────────────────────────────────────────────────

export function FileDropzone({
  onFilesSelected,
  accept,
  multiple = false,
  maxSize,
  className,
  disabled = false,
  children,
}: FileDropzoneProps) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const [isDragging, setIsDragging] = React.useState(false)
  const dragCounterRef = React.useRef(0)

  function filterFiles(fileList: FileList): File[] {
    const files = Array.from(fileList)
    if (!maxSize) return files
    return files.filter((f) => f.size <= maxSize)
  }

  function handleDragEnter(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current += 1
    if (!disabled) setIsDragging(true)
  }

  function handleDragLeave(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current -= 1
    if (dragCounterRef.current === 0) setIsDragging(false)
  }

  function handleDragOver(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    e.stopPropagation()
    dragCounterRef.current = 0
    setIsDragging(false)
    if (disabled) return
    const { files } = e.dataTransfer
    if (files.length > 0) {
      onFilesSelected(filterFiles(files))
    }
  }

  function handleClick() {
    if (!disabled) inputRef.current?.click()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault()
      handleClick()
    }
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { files } = e.target
    if (files && files.length > 0) {
      onFilesSelected(filterFiles(files))
    }
    // Reset input so same file can be selected again
    e.target.value = ""
  }

  return (
    <div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={cn(
        "relative flex flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-border bg-muted/30 p-8 text-center transition-colors",
        isDragging && "border-primary bg-primary/5",
        disabled
          ? "cursor-not-allowed opacity-50"
          : "cursor-pointer hover:border-primary/50 hover:bg-muted/50",
        className,
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleInputChange}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      />

      {/* Upload icon */}
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <svg
          className="h-6 w-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="17 8 12 3 7 8" />
          <line x1="12" y1="3" x2="12" y2="15" />
        </svg>
      </div>

      <div className="space-y-1">
        <p className="text-sm font-medium text-foreground">
          Drag files here or click to browse
        </p>
        {maxSize && (
          <p className="text-xs text-muted-foreground">
            Max file size: {(maxSize / 1024 / 1024).toFixed(0)} MB
          </p>
        )}
        {accept && (
          <p className="text-xs text-muted-foreground">
            Accepted: {accept}
          </p>
        )}
      </div>

      {children}
    </div>
  )
}
