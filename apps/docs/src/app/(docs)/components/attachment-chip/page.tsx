import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { AttachmentChipPreview } from "./preview"

export const metadata: Metadata = {
  title: "AttachmentChip",
  description: "A compact chip representing a file attached to a prompt, with file name, formatted size, and an optional remove button.",
}

export default function AttachmentChipPage() {
  return (
    <PatternPage
      name="AttachmentChip"
      description="A compact chip representing a file attached to a prompt, with file name, formatted size, and an optional remove button."
      packageName="@aetherstack/ui"
      preview={<AttachmentChipPreview />}
      importCode={`import { AttachmentChip } from "@aetherstack/ui"`}
      usageCode={`<AttachmentChip
  name="document.pdf"
  size={245000}
  onRemove={() => removeAttachment("document.pdf")}
/>

{/* With MIME type */}
<AttachmentChip
  name="screenshot.png"
  size={1200000}
  type="image/png"
  onRemove={() => removeAttachment("screenshot.png")}
/>`}
      cliInstall="npx aether-ui add attachment-chip"
      props={[
        {
          name: "name",
          type: "string",
          description: "File name displayed on the chip.",
          required: true,
        },
        {
          name: "size",
          type: "number",
          description: "File size in bytes — formatted automatically (e.g. 245 KB).",
        },
        {
          name: "type",
          type: "string",
          description: "MIME type used for display (e.g. image/png shows an image icon).",
        },
        {
          name: "onRemove",
          type: "() => void",
          description: "When provided, renders a remove (×) button on the chip.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        "Remove button has aria-label='Remove <filename>' so screen readers identify which file is being removed.",
        "Chip content is wrapped in a span with role='group' and an aria-label for the file name.",
      ]}
    />
  )
}
