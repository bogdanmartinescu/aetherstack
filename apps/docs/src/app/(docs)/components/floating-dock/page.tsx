import { FloatingDock } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { FLOATING_DOCK_SOURCE } from "@/lib/registry-source"

export default function FloatingDockPage() {
  return (
    <ComponentPage
      name="Floating Dock"
      description="Pin a small panel to a corner of the screen or a parent."
      features={[
        "Fixed viewport corners with safe-area padding",
        "Contained mode for pinning inside a positioned parent",
        "Named region for screen reader context",
      ]}
      preview={
        <FloatingDock>
          <p>Call</p>
        </FloatingDock>
      }
      previewCode={`import { FloatingDock } from "@/components/ui/floating-dock"

<FloatingDock>
  <p>Call</p>
</FloatingDock>`}
      cliInstall="npx @aetherstack/cli add floating-dock"
      manualInstallCode={FLOATING_DOCK_SOURCE}
      examples={[]}
      props={[
        {
          name: "corner",
          type: '"top-left" | "top-right" | "bottom-left" | "bottom-right"',
          default: "bottom-right",
          description: "Which corner to pin the dock.",
        },
        {
          name: "contained",
          type: "boolean",
          default: "false",
          description:
            "Use absolute positioning inside a positioned parent instead of fixed viewport pinning.",
        },
        {
          name: "label",
          type: "string",
          default: "Dock",
          description: "Accessible name for the dock region.",
        },
        {
          name: "children",
          type: "React.ReactNode",
          default: "—",
          description: "Content inside the dock panel.",
        },
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Extra classes merged onto the dock root.",
        },
      ]}
      a11yNotes={[
        "The dock is a region with an aria-label you control via label.",
        "data-corner reflects the active corner for styling or testing.",
        "Safe-area padding respects notched devices when pinned to bottom or right.",
      ]}
    />
  )
}
