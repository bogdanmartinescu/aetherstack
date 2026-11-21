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
      cliInstall="npx @aetherstack/cli add code-block"
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
          description:
            "Language shown in the header and used for syntax colours: typescript, tsx, javascript, json, bash and css. Other values render without colour.",
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
          name: "highlightLines",
          type: "number[]",
          description: "1-based line numbers to emphasise.",
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
        "Syntax colours meet WCAG AA contrast on the muted surface in light and dark themes, and meaning never depends on colour alone because the text is unchanged.",
        "Retheme the colours with the --code-keyword, --code-string, --code-number, --code-comment, --code-function, --code-type, --code-property, --code-tag and --code-punctuation CSS variables (HSL channels, e.g. 268 70% 42%).",
      ]}
    />
  )
}
