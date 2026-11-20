"use client"

import { StatusDot } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { STATUS_DOT_SOURCE } from "@/lib/registry-source"

export default function StatusDotPage() {
  return (
    <ComponentPage
      name="Status Dot"
      description="A coloured dot for idle, busy, blocked, failed, and finished."
      features={["Five statuses", "Spoken label", "Pulse only while busy"]}
      preview={<StatusDot status="busy" />}
      previewCode={`import { StatusDot } from "@/components/ui/status-dot"\n\n<StatusDot status="busy" />`}
      cliInstall="npx aether-ui add status-dot"
      manualInstallCode={STATUS_DOT_SOURCE}
      examples={[]}
      props={[
        {
          name: "status",
          type: '"idle" | "busy" | "blocked" | "failed" | "finished"',
          default: "—",
          description: "Which state to show.",
        },
        {
          name: "label",
          type: "string",
          default: "—",
          description: "Spoken name. Defaults to the status.",
        },
        {
          name: "pulse",
          type: "boolean",
          default: "true when busy",
          description: "Pulse the dot. Off under reduced motion via motion-safe.",
        },
      ]}
      a11yNotes={[
        "The dot is an image with an accessible name.",
        "Busy pulses with motion-safe so reduced motion stays still.",
      ]}
    />
  )
}
