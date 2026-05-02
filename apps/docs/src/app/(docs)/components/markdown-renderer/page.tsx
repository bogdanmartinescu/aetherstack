import type { Metadata } from "next"
import { MarkdownRenderer } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "MarkdownRenderer",
  description: "Renders a markdown string as styled HTML — headings, lists, bold, italic, inline code and more.",
}

const SAMPLE = `## Hello world

This is **bold** and _italic_ text.

- Item one
- Item two

\`inline code\``

export default function MarkdownRendererPage() {
  return (
    <PatternPage
      name="MarkdownRenderer"
      description="Renders a markdown string as styled HTML — headings, lists, bold, italic, inline code and more."
      packageName="@aetherstack/ui"
      preview={<MarkdownRenderer content={SAMPLE} />}
      importCode={`import { MarkdownRenderer } from "@aetherstack/ui"`}
      usageCode={`const response = \`## Result

Here is the answer with **formatting** support.

1. Step one
2. Step two

\\\`code snippet\\\`
\`

<MarkdownRenderer content={response} />`}
      cliInstall="npx aether-ui add markdown-renderer"
      props={[
        {
          name: "content",
          type: "string",
          description: "Markdown string to render.",
          required: true,
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        "Rendered output uses semantic HTML elements (h2, ul, strong, etc.) for correct screen reader navigation.",
        "Code blocks inside the rendered output include a visually-hidden language label for assistive technology.",
      ]}
    />
  )
}
