"use client"

import * as React from "react"
import { UploadProgress } from "@aetherstack/patterns"

const INITIAL_FILES = [
  { id: "1", name: "design-system.fig", size: 4200000, progress: 50, status: "uploading" as const },
  { id: "2", name: "README.md", size: 3800, progress: 100, status: "done" as const },
  { id: "3", name: "bundle.zip", size: 8900000, progress: 30, status: "error" as const, error: "File too large (max 5 MB)" },
]

export function UploadProgressPreview() {
  const [files, setFiles] = React.useState(INITIAL_FILES)

  function handleRemove(id: string) {
    setFiles((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="w-full max-w-sm">
      <UploadProgress files={files} onRemove={handleRemove} />
    </div>
  )
}
