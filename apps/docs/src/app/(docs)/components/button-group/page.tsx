import type { Metadata } from "next"
import { ButtonGroup, Button } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Button Group",
  description: "Groups multiple buttons into a segmented row with shared border treatment.",
}

const MANUAL_SOURCE = `import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex",
        orientation === "horizontal"
          ? [
              "flex-row",
              "[&>*:not(:first-child)]:rounded-l-none",
              "[&>*:not(:last-child)]:rounded-r-none",
              "[&>*:not(:first-child)]:border-l-0",
            ]
          : [
              "flex-col",
              "[&>*:not(:first-child)]:rounded-t-none",
              "[&>*:not(:last-child)]:rounded-b-none",
              "[&>*:not(:first-child)]:border-t-0",
            ],
        className,
      )}
      {...props}
    />
  ),
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }`

export default function ButtonGroupPage() {
  return (
    <ComponentPage
      name="Button Group"
      description="Groups multiple buttons into a segmented row with shared border treatment. Inner border radii are flattened automatically so buttons visually connect without gaps or double borders."
      features={[
        "Horizontal and vertical orientations",
        "Flattens inner border radii automatically",
        "Works with any Button variant",
      ]}
      preview={
        <ButtonGroup>
          <Button variant="outline">Left</Button>
          <Button variant="outline">Middle</Button>
          <Button variant="outline">Right</Button>
        </ButtonGroup>
      }
      previewCode={`import { ButtonGroup, Button } from "@/components/ui/button-group"

export function ButtonGroupDemo() {
  return (
    <ButtonGroup>
      <Button variant="outline">Left</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Right</Button>
    </ButtonGroup>
  )
}`}
      cliInstall={`npx aether-ui add button-group`}
      manualInstallCode={MANUAL_SOURCE}
      examples={[
        {
          title: "Horizontal (default)",
          description: "Default orientation — buttons share horizontal borders.",
          preview: (
            <ButtonGroup>
              <Button variant="outline">Day</Button>
              <Button variant="outline">Week</Button>
              <Button variant="outline">Month</Button>
            </ButtonGroup>
          ),
          code: `<ButtonGroup>
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>`,
        },
        {
          title: "Vertical",
          description: "Stack buttons vertically with shared vertical borders.",
          preview: (
            <ButtonGroup orientation="vertical">
              <Button variant="outline">Top</Button>
              <Button variant="outline">Middle</Button>
              <Button variant="outline">Bottom</Button>
            </ButtonGroup>
          ),
          code: `<ButtonGroup orientation="vertical">
  <Button variant="outline">Top</Button>
  <Button variant="outline">Middle</Button>
  <Button variant="outline">Bottom</Button>
</ButtonGroup>`,
        },
        {
          title: "With default variant",
          description: "Mix solid and outline variants within a group.",
          preview: (
            <ButtonGroup>
              <Button variant="default">Save</Button>
              <Button variant="outline">Cancel</Button>
            </ButtonGroup>
          ),
          code: `<ButtonGroup>
  <Button variant="default">Save</Button>
  <Button variant="outline">Cancel</Button>
</ButtonGroup>`,
        },
      ]}
      props={[
        {
          name: "orientation",
          type: '"horizontal" | "vertical"',
          default: '"horizontal"',
          description: "Layout direction. Horizontal groups buttons left-to-right; vertical stacks them.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional Tailwind classes applied to the wrapper div.",
        },
        {
          name: "...props",
          type: "React.HTMLAttributes<HTMLDivElement>",
          description: "All standard HTML div attributes.",
        },
      ]}
      a11yNotes={[
        "ButtonGroup renders with role='group' — assistive technology treats children as a related set.",
        "Ensure each child Button has a meaningful accessible name via its text content or aria-label.",
        "For toggle-style button groups (only one active), use ToggleGroup instead to get proper aria-pressed semantics.",
      ]}
    />
  )
}
