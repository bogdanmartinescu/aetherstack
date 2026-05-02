"use client"

import { PatternPage } from "@/components/pattern-page"
import { FileDropzonePreview } from "./preview"

export default function FileDropzonePage() {
  return (
    <PatternPage
      name="File Dropzone"
      description="A drag-and-drop upload area that also supports click-to-browse. Handles drag counter logic correctly across child elements, filters by file type and max size, and exposes selected files via a callback."
      cliInstall="npx aether-ui add file-dropzone"
      importCode={`import { FileDropzone } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { FileDropzone } from "@aetherstack/patterns"

export function MyUploader() {
  const [files, setFiles] = React.useState<File[]>([])

  return (
    <FileDropzone
      onFilesSelected={setFiles}
      accept=".png,.jpg,.jpeg"
      multiple
      maxSize={5 * 1024 * 1024}
    />
  )
}`}
      preview={<FileDropzonePreview />}
      props={[
        { name: "onFilesSelected", type: "(files: File[]) => void", required: true, description: "Called with the accepted files after a drop or file picker selection." },
        { name: "accept", type: "string", description: "MIME types or file extensions to accept, e.g. \".png,.jpg\" or \"image/*\"." },
        { name: "multiple", type: "boolean", default: "false", description: "Allow selecting multiple files at once." },
        { name: "maxSize", type: "number", description: "Maximum file size in bytes. Files exceeding this are filtered out before onFilesSelected is called." },
        { name: "disabled", type: "boolean", default: "false", description: "Disables all interaction and dims the zone." },
        { name: "children", type: "ReactNode", description: "Optional extra content rendered inside the dropzone." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
      a11yNotes={[
        "The zone has role=\"button\" and tabIndex={0} so it is keyboard focusable.",
        "Pressing Enter or Space triggers the file picker dialog.",
        "aria-disabled is set when the disabled prop is true.",
        "The hidden <input type=\"file\"> is sr-only and aria-hidden — screen readers interact with the button wrapper instead.",
      ]}
    />
  )
}
