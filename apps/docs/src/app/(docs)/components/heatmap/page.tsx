import { Heatmap } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { HEATMAP_SOURCE } from "@/lib/registry-source"

export default function HeatmapPage() {
  return (
    <ComponentPage
      name="Heatmap"
      description="A grid of values, such as weekday by hour, inspected from the keyboard."
      features={[
        "Token-driven cell intensity from primary to muted",
        "One tab stop with arrow-key navigation",
        "Accessible names include row, column, and value",
      ]}
      preview={
        <Heatmap
          aria-label="Deploys"
          rowLabels={["Mon", "Tue"]}
          columnLabels={["9am", "10am"]}
          values={[
            [0.2, 0.8],
            [1, 0],
          ]}
        />
      }
      previewCode={`import { Heatmap } from "@/components/ui/heatmap"

<Heatmap
  aria-label="Deploys"
  rowLabels={["Mon", "Tue"]}
  columnLabels={["9am", "10am"]}
  values={[
    [0.2, 0.8],
    [1, 0],
  ]}
/>`}
      cliInstall="npx @aetherstack/cli add heatmap"
      manualInstallCode={HEATMAP_SOURCE}
      examples={[]}
      props={[
        {
          name: "aria-label",
          type: "string",
          default: "—",
          description: "Accessible name for the grid.",
        },
        {
          name: "rowLabels",
          type: "readonly string[]",
          default: "—",
          description: "Label for each row; length must match values.",
        },
        {
          name: "columnLabels",
          type: "readonly string[]",
          default: "—",
          description: "Label for each column; length must match every values row.",
        },
        {
          name: "values",
          type: "readonly (readonly number[])[]",
          default: "—",
          description: "Numbers from 0 to 1 that set cell intensity.",
        },
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Extra classes on the grid root.",
        },
      ]}
      a11yNotes={[
        "Each cell is a gridcell with an aria-label of row, column, and formatted value.",
        "Only the active cell is in the tab order; arrow keys move within bounds without wrapping.",
        "Row and column labels are visible but excluded from the tab order.",
      ]}
    />
  )
}
