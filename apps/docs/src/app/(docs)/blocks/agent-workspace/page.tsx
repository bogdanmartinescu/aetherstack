"use client"

import { AgentWorkspace } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

const DEMO_STEPS = [
  {
    id: "s1",
    toolName: "search_web",
    status: "done" as const,
    args: { query: "React Server Components 2024" },
    result: { count: 12, top: "react.dev/blog/rsc" },
  },
  {
    id: "s2",
    toolName: "read_file",
    status: "done" as const,
    args: { path: "src/app/page.tsx" },
    result: { lines: 42 },
  },
  {
    id: "s3",
    toolName: "write_code",
    status: "running" as const,
    args: { filename: "src/components/DataFetcher.tsx" },
  },
  {
    id: "s4",
    toolName: "run_tests",
    status: "pending" as const,
  },
]

export default function AgentWorkspacePage() {
  return (
    <BlockPage
      name="Agent Workspace"
      category="AI"
      description="A visual workspace that tracks agent task execution in real time. Shows a task card with progress bar, an expandable list of tool-call steps with arguments and results, an optional collapsible reasoning panel, and a final output card with a copy button."
      cliInstall="npx aether-ui add agent-workspace"
      previewHeight="420px"
      importCode={`import { AgentWorkspace } from "@aetherstack/blocks"`}
      usageCode={`import { AgentWorkspace } from "@aetherstack/blocks"

export function RunningAgent() {
  return (
    <AgentWorkspace
      task="Refactor the DataFetcher component to use React Server Components."
      isRunning
      steps={[
        { id: "s1", toolName: "search_web", status: "done", args: { query: "RSC patterns" }, result: { count: 8 } },
        { id: "s2", toolName: "read_file", status: "done", args: { path: "src/DataFetcher.tsx" } },
        { id: "s3", toolName: "write_code", status: "running", args: { filename: "src/DataFetcher.server.tsx" } },
        { id: "s4", toolName: "run_tests", status: "pending" },
      ]}
      reasoning="The existing component uses useEffect for data fetching which can be replaced with async/await in a Server Component…"
    />
  )
}`}
      preview={
        <AgentWorkspace
          task="Refactor the DataFetcher component to use React Server Components."
          isRunning
          steps={DEMO_STEPS}
          reasoning="The existing component uses useEffect for data fetching which can be replaced with async/await in a Server Component. I will search for current RSC patterns, read the existing file, generate the new implementation, then run the test suite."
        />
      }
      props={[
        { name: "task", type: "string", description: "The task description shown at the top of the workspace." },
        { name: "steps", type: "AgentStep[]", default: "[]", description: "Array of tool-call step objects to display." },
        { name: "reasoning", type: "string", description: "Optional reasoning text shown in a collapsible side panel." },
        { name: "output", type: "string", description: "Final agent output shown in a card with a copy button." },
        { name: "isRunning", type: "boolean", default: "false", description: "When true, shows a progress bar in the task card." },
        { name: "className", type: "string", description: "Additional classes on the root element." },
      ]}
      a11yNotes={[
        "Step expand/collapse buttons are keyboard-focusable and include an implicit label from the tool name text.",
        "The reasoning toggle button is keyboard-accessible.",
        "The 'Copy output' button uses the Clipboard API and is keyboard-reachable.",
        "Status icons convey state visually; the text label beside each step provides the same information in text form.",
      ]}
    />
  )
}
