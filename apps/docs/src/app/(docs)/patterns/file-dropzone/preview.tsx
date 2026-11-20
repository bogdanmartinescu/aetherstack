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
            <li
              key={f.name}
              className="border-border bg-muted/40 flex items-center justify-between rounded border px-3 py-1.5 text-xs"
            >
              <span className="text-foreground truncate font-medium">{f.name}</span>
              <span className="text-muted-foreground ml-2 shrink-0">
                {(f.size / 1024).toFixed(1)} KB
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
