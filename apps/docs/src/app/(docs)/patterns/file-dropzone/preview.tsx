"use client"

import * as React from "react"
import { FileDropzone } from "@aetherstack/patterns"

export function FileDropzonePreview() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <div className="w-full max-w-md space-y-3">
      <FileDropzone
        onFilesSelected={setFiles}
        accept=".png,.jpg,.jpeg,.gif,.webp"
        multiple
        maxSize={5 * 1024 * 1024}
      />
      {files.length > 0 && (
        <ul className="space-y-1">
          {files.map((f) => (
            <li key={f.name} className="flex items-center justify-between rounded border border-border bg-muted/40 px-3 py-1.5 text-xs">
              <span className="truncate font-medium text-foreground">{f.name}</span>
              <span className="ml-2 shrink-0 text-muted-foreground">{(f.size / 1024).toFixed(1)} KB</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
