import { UptimeBar } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { UPTIME_BAR_SOURCE } from "@/lib/registry-source"

const DEMO_DAYS = [
  { id: "1", label: "Mon", status: "up" as const },
  { id: "2", label: "Tue", status: "up" as const },
  { id: "3", label: "Wed", status: "degraded" as const },
  { id: "4", label: "Thu", status: "down" as const },
  { id: "5", label: "Fri", status: "unknown" as const },
  { id: "6", label: "Sat", status: "up" as const },
  { id: "7", label: "Sun", status: "up" as const },
]

export default function UptimeBarPage() {
  return (
    <ComponentPage
      name="Uptime Bar"
      description="Day-by-day uptime segments and an overall percent that ignores days with no data."
      features={[
        "Four status tones",
        "Percent excludes unknown days",
        "One tab stop with arrow-key roving",
      ]}
      preview={<UptimeBar days={DEMO_DAYS} />}
      previewCode={`import { UptimeBar } from "@/components/ui/uptime-bar"

const days = [
  { id: "1", label: "Mon", status: "up" },
  { id: "2", label: "Tue", status: "up" },
  { id: "3", label: "Wed", status: "degraded" },
  { id: "4", label: "Thu", status: "down" },
  { id: "5", label: "Fri", status: "unknown" },
]

<UptimeBar days={days} />`}
      cliInstall="npx aether-ui add uptime-bar"
      manualInstallCode={UPTIME_BAR_SOURCE}
      examples={[]}
      props={[
        {
          name: "days",
          type: "readonly UptimeDay[]",
          default: "—",
          description: "Each day has id, label, and status (up, degraded, down, or unknown).",
        },
        {
          name: "onSelect",
          type: "(id: string) => void",
          default: "—",
          description: "Called when the user activates a day with Enter or Space.",
        },
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Extra classes on the listbox root.",
        },
      ]}
      a11yNotes={[
        "The listbox exposes the uptime percent in its accessible name.",
        "Each day is an option with a label and status; arrow keys move between days without wrapping.",
      ]}
    />
  )
}
