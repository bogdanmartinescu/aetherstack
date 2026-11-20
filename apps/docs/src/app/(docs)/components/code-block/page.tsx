import type { Metadata } from "next"
import { CodeBlock } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Code Block",
  description:
    "Displays syntax-highlighted code with an optional filename header and copy-to-clipboard button. Works in AI chat responses and general docs.",
}

export default function CodeBlockPage() {
  return (
    <PatternPage
      name="Code Block"
      description="Displays syntax-highlighted code with an optional filename header and copy-to-clipboard button. Works in AI chat responses and general docs."
      packageName="@aetherstack/ui"
      preview={
        <CodeBlock
          code={`function greet(name: string) {\n  return \`Hello, \${name}!\`\n}`}
          filename="greet.ts"
          language="typescript"
          showLineNumbers
        />
      }
      importCode={`import { CodeBlock } from "@aetherstack/ui"`}
      usageCode={`<CodeBlock
  code={\`function greet(name: string) {
  return \\\`Hello, \\\${name}!\\\`
}\`}
  filename="greet.ts"
  language="typescript"
  showLineNumbers
/>`}
      cliInstall="npx aether-ui add code-block"
      props={[
        {
          name: "code",
          type: "string",
          description: "The code string to display.",
          required: true,
        },
        {
          name: "language",
          type: "string",
          description: "Language hint shown in the header (e.g. typescript, python).",
        },
        {
          name: "filename",
          type: "string",
          description: "Filename shown in the header.",
        },
        {
          name: "showLineNumbers",
          type: "boolean",
          default: "false",
          description: "Shows a line number gutter.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        "Copy button has an aria-label that updates to 'Copied!' after activation.",
        "Code is wrapped in a <pre><code> block with the language class for screen reader context.",
      ]}
    />
  )
}
