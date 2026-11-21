import { ToolCallCard } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export default function ToolCallCardPage() {
  return (
    <PatternPage
      name="ToolCallCard"
      description="Shows a single AI tool invocation with its name, arguments, result, and execution status."
      packageName="@aetherstack/ui"
      preview={
        <div className="flex w-full max-w-sm flex-col gap-2">
          <ToolCallCard
            toolName="search_web"
            args={{ query: "React hooks" }}
            status="done"
            result={{ results: 12 }}
          />
          <ToolCallCard toolName="read_file" args={{ path: "./src/app.ts" }} status="running" />
          <ToolCallCard toolName="write_file" status="error" error="Permission denied" />
        </div>
      }
      importCode={`import { ToolCallCard } from "@aetherstack/ui"`}
      usageCode={`{/* Completed */}
<ToolCallCard
  toolName="search_web"
  args={{ query: "React hooks" }}
  status="done"
  result={{ results: 12 }}
/>

{/* In progress */}
<ToolCallCard
  toolName="read_file"
  args={{ path: "./src/app.ts" }}
  status="running"
/>

{/* Error */}
<ToolCallCard
  toolName="write_file"
  status="error"
  error="Permission denied"
/>`}
      cliInstall="npx @aetherstack/cli add tool-call-card"
      props={[
        {
          name: "toolName",
          type: "string",
          description: "Tool function name displayed in the card header.",
          required: true,
        },
        {
          name: "status",
          type: '"pending" | "running" | "done" | "error"',
          description: "Execution status — controls icon and color.",
          required: true,
        },
        {
          name: "args",
          type: "Record<string, unknown>",
          description: "Tool arguments displayed as formatted JSON.",
        },
        {
          name: "result",
          type: "unknown",
          description: "Tool result displayed as formatted JSON.",
        },
        {
          name: "error",
          type: "string",
          description: "Error message shown when status is 'error'.",
        },
        {
          name: "duration",
          type: "number",
          description:
            "Execution time in milliseconds, shown next to the status (e.g. 250ms, 1.5s).",
        },
        {
          name: "defaultOpen",
          type: "boolean",
          default: "false",
          description: "Whether the details section starts expanded.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        "Status is communicated via both color and an icon — never color alone.",
        "Collapsible args/result section uses a button with aria-expanded. Cards with no details render a static header instead.",
        "String results render as-is; objects are pretty-printed, and unserialisable values never crash the render.",
      ]}
    />
  )
}
