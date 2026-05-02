import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { ToolCallSequencePreview } from "./preview"

export const metadata: Metadata = {
  title: "Tool Call Sequence",
  description: "A collapsible step list that visualises the status and details of sequential AI tool calls.",
}

export default function ToolCallSequencePage() {
  return (
    <PatternPage
      name="Tool Call Sequence"
      description="A collapsible step list that visualises the status and details of sequential AI tool calls. Each step shows a numbered index, the tool name, a status icon (pending, running, done, or error), and an expandable drawer displaying the call arguments, result, or error payload."
      packageName="@aetherstack/patterns"
      cliInstall="npx aether-ui add tool-call-sequence"
      importCode={`import { ToolCallSequence } from "@aetherstack/patterns"`}
      usageCode={`import { ToolCallSequence } from "@aetherstack/patterns"

const steps = [
  {
    id: "1",
    toolName: "search_web",
    status: "done",
    args: { query: "latest React news" },
    result: { count: 5, top: "React 19 released" },
  },
  {
    id: "2",
    toolName: "read_file",
    status: "running",
    args: { path: "src/app.tsx" },
  },
  {
    id: "3",
    toolName: "write_file",
    status: "pending",
  },
]

export function MyToolCallSequence() {
  return <ToolCallSequence steps={steps} />
}`}
      preview={<ToolCallSequencePreview />}
      props={[
        { name: "steps", type: "Step[]", required: true, description: 'Array of tool call steps. Each step requires id, toolName, and status ("pending" | "running" | "done" | "error").' },
        { name: "className", type: "string", description: "Additional CSS classes applied to the list container." },
      ]}
      a11yNotes={[
        "Each step row is a button element — keyboard users can expand and collapse details with Enter or Space.",
        "The expand/collapse icon is aria-hidden; the button's accessible label is derived from the tool name.",
        "Status icons include a visually-hidden text equivalent so screen readers announce the step state.",
        "Expanded code blocks are marked as role='region' with an aria-label referencing the step name.",
      ]}
    />
  )
}
