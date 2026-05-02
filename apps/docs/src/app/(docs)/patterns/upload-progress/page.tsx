"use client"

import { PatternPage } from "@/components/pattern-page"
import { UploadProgressPreview } from "./preview"

export default function UploadProgressPage() {
  return (
    <PatternPage
      name="Upload Progress"
      description="File upload progress display with status icons and a remove action. Each file row shows a filename, formatted size, a progress bar, and a status icon — uploading spinner, success check, or error indicator."
      cliInstall="npx aether-ui add upload-progress"
      importCode={`import { UploadProgress } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { UploadProgress } from "@aetherstack/patterns"

const files = [
  { id: "1", name: "photo.jpg", size: 2400000, progress: 65, status: "uploading" as const },
  { id: "2", name: "report.pdf", size: 540000, progress: 100, status: "done" as const },
  { id: "3", name: "dump.sql", size: 12000000, progress: 0, status: "error" as const, error: "File too large" },
]

export function FileUploadList() {
  const [items, setItems] = React.useState(files)
  return (
    <UploadProgress
      files={items}
      onRemove={(id) => setItems((prev) => prev.filter((f) => f.id !== id))}
    />
  )
}`}
      preview={<UploadProgressPreview />}
      props={[
        { name: "files", type: "UploadFile[]", required: true, description: "Array of file entries to display. Each entry has id, name, size (bytes), progress (0–100), status, and optional error string." },
        { name: "onRemove", type: "(id: string) => void", required: true, description: "Called when the user clicks the remove button on a file row." },
        { name: "className", type: "string", description: "Additional classes on the list container." },
      ]}
      a11yNotes={[
        "Each progress bar uses role=\"progressbar\" with aria-valuenow, aria-valuemin=\"0\", and aria-valuemax=\"100\".",
        "Status icons (spinner, check, error) are aria-hidden; the status is also conveyed via the aria-label on the row.",
        "Remove buttons carry aria-label=\"Remove {filename}\".",
        "Error messages are associated with their file row via aria-describedby.",
      ]}
    />
  )
}
