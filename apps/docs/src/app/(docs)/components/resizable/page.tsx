import type { Metadata } from "next"
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Resizable",
  description: "Draggable split-pane panels for adjustable layouts.",
}

const MANUAL_SOURCE = `import * as React from "react"
import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"
import { cn } from "@/lib/utils"

// Full source: packages/ui/src/components/resizable.tsx`

export default function ResizablePage() {
  return (
    <ComponentPage
      name="Resizable"
      description="Draggable split-pane panels for adjustable layouts. Supports horizontal and vertical split directions with an optional visible grip handle indicator."
      features={[
        "Horizontal and vertical split directions",
        "Optional grip handle indicator",
        "Persists panel sizes",
        "Built on react-resizable-panels",
      ]}
      preview={
        <div className="w-full max-w-md">
          <ResizablePanelGroup
            orientation="horizontal"
            className="min-h-[160px] rounded-lg border border-border"
          >
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
                Panel A
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50}>
              <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
                Panel B
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      }
      previewCode={`import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable"

export function ResizableDemo() {
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="min-h-[160px] rounded-lg border"
    >
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">Panel A</div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={50}>
        <div className="flex h-full items-center justify-center p-4">Panel B</div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}`}
      cliInstall={`npx aether-ui add resizable`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install react-resizable-panels lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Vertical split",
          description: "Use orientation='vertical' to split panels top and bottom.",
          preview: (
            <div className="w-full max-w-md">
              <ResizablePanelGroup
                orientation="vertical"
                className="min-h-[200px] rounded-lg border border-border"
              >
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
                    Top
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={50}>
                  <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
                    Bottom
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          ),
          code: `<ResizablePanelGroup orientation="vertical" className="min-h-[200px] rounded-lg border">
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-4">Top</div>
  </ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={50}>
    <div className="flex h-full items-center justify-center p-4">Bottom</div>
  </ResizablePanel>
</ResizablePanelGroup>`,
        },
        {
          title: "Three panels",
          description: "Chain multiple panels with handles for a sidebar + content + detail layout.",
          preview: (
            <div className="w-full max-w-lg">
              <ResizablePanelGroup
                orientation="horizontal"
                className="min-h-[120px] rounded-lg border border-border"
              >
                <ResizablePanel defaultSize={20} minSize={15}>
                  <div className="flex h-full items-center justify-center p-2 text-xs text-muted-foreground">
                    Nav
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={55}>
                  <div className="flex h-full items-center justify-center p-4 text-sm text-muted-foreground">
                    Content
                  </div>
                </ResizablePanel>
                <ResizableHandle withHandle />
                <ResizablePanel defaultSize={25} minSize={15}>
                  <div className="flex h-full items-center justify-center p-2 text-xs text-muted-foreground">
                    Detail
                  </div>
                </ResizablePanel>
              </ResizablePanelGroup>
            </div>
          ),
          code: `<ResizablePanelGroup orientation="horizontal" className="min-h-[120px] rounded-lg border">
  <ResizablePanel defaultSize={20} minSize={15}>Nav</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={55}>Content</ResizablePanel>
  <ResizableHandle withHandle />
  <ResizablePanel defaultSize={25} minSize={15}>Detail</ResizablePanel>
</ResizablePanelGroup>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "ResizablePanelGroup",
          props: [
            {
              name: "orientation",
              type: '"horizontal" | "vertical"',
              description: "The axis along which panels are split. Required.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional Tailwind classes on the group container.",
            },
          ],
        },
        {
          title: "ResizablePanel",
          props: [
            {
              name: "defaultSize",
              type: "number",
              description: "Initial panel size as a percentage of the group.",
            },
            {
              name: "minSize",
              type: "number",
              description: "Minimum panel size as a percentage — prevents over-collapsing.",
            },
            {
              name: "maxSize",
              type: "number",
              description: "Maximum panel size as a percentage.",
            },
          ],
        },
        {
          title: "ResizableHandle",
          props: [
            {
              name: "withHandle",
              type: "boolean",
              default: "false",
              description: "Renders a visible grip icon in the center of the resize handle.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional Tailwind classes on the handle element.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "ResizableHandle renders with role='separator' and is keyboard operable — arrow keys resize adjacent panels.",
        "Add aria-label to ResizablePanelGroup to describe the layout region to screen reader users.",
        "Ensure minSize is set so panels never collapse to zero, which would hide content from all users.",
      ]}
    />
  )
}
