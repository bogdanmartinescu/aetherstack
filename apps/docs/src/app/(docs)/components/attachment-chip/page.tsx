import { PatternPage } from "@/components/pattern-page"
import { AttachmentChipPreview } from "./preview"

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
      cliInstall="npx @aetherstack/cli add attachment-chip"
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
          description:
            "MIME type used to pick an icon (e.g. image/png shows an image icon). Falls back to the file extension.",
        },
        {
          name: "status",
          type: '"idle" | "uploading" | "error"',
          default: '"idle"',
          description: "Shows a spinner while uploading or a destructive style on failure.",
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
        "Truncated file names are available in full via the chip's title tooltip.",
        "Uploading and error states are announced with visually-hidden text, and the chip is aria-busy while uploading.",
      ]}
    />
  )
}
