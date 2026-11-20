"use client"

import { PriorityBars } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { PRIORITY_BARS_SOURCE } from "@/lib/registry-source"

export default function PriorityBarsPage() {
  return (
    <ComponentPage
      name="Priority Bars"
      description="Priority shown as rising bars, or an urgent mark."
      features={["None through high as 0–3 filled bars", "Urgent exclamation mark", "Decorative mode"]}
      preview={
        <div className="flex items-end gap-4">
          <PriorityBars priority="low" />
          <PriorityBars priority="high" />
          <PriorityBars priority="urgent" />
        </div>
      }
      previewCode={`import { PriorityBars } from "@/components/ui/priority-bars"

<div className="flex items-end gap-4">
  <PriorityBars priority="low" />
  <PriorityBars priority="high" />
  <PriorityBars priority="urgent" />
</div>`}
      cliInstall="npx aether-ui add priority-bars"
      manualInstallCode={PRIORITY_BARS_SOURCE}
      examples={[]}
      props={[
        {
          name: "priority",
          type: '"none" | "low" | "medium" | "high" | "urgent"',
          default: "—",
          description: "Which priority level to show.",
        },
        {
          name: "decorative",
          type: "boolean",
          default: "false",
          description: "Hide from assistive tech when the meaning is conveyed elsewhere.",
        },
      ]}
      a11yNotes={[
        "Non-decorative instances use role=img with a spoken priority label.",
        "Urgent uses a destructive mark instead of bars; decorative omits the image role.",
      ]}
    />
  )
}