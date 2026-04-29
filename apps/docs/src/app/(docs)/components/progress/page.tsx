import type { Metadata } from "next"
import { Progress } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Progress",
  description: "Displays an indicator showing the completion progress of a task.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"
import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-2 w-full overflow-hidden rounded-full bg-secondary",
      className,
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className="h-full w-full flex-1 bg-primary transition-all"
      style={{ transform: \`translateX(-\${100 - (value ?? 0)}%)\` }}
    />
  </ProgressPrimitive.Root>
))
Progress.displayName = "Progress"

export { Progress }`

export default function ProgressPage() {
  return (
    <ComponentPage
      name="Progress"
      description="Displays an indicator showing the completion progress of a task, typically rendered as a horizontal bar."
      radixSource="https://www.radix-ui.com/primitives/docs/components/progress"
      features={[
        "Smooth CSS transition on value change",
        "Built on Radix Progress for correct ARIA semantics (role=progressbar, aria-valuenow)",
        "Indeterminate state supported via value={null}",
        "Fully styleable height, color, and border-radius via className",
        "Forwards ref to the underlying element",
      ]}
      preview={
        <div className="w-full max-w-sm">
          <Progress value={60} />
        </div>
      }
      previewCode={`import { Progress } from "@/components/ui/progress"

export function ProgressDemo() {
  return <Progress value={60} />
}`}
      cliInstall={`npx aether-ui add progress`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-progress`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Different values",
          description: "Pass any number between 0 and 100 to control the fill level.",
          preview: (
            <div className="flex w-full max-w-sm flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="w-8 text-right text-sm text-muted-foreground">0%</span>
                <Progress value={0} className="flex-1" />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 text-right text-sm text-muted-foreground">25%</span>
                <Progress value={25} className="flex-1" />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 text-right text-sm text-muted-foreground">50%</span>
                <Progress value={50} className="flex-1" />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 text-right text-sm text-muted-foreground">75%</span>
                <Progress value={75} className="flex-1" />
              </div>
              <div className="flex items-center gap-4">
                <span className="w-8 text-right text-sm text-muted-foreground">100%</span>
                <Progress value={100} className="flex-1" />
              </div>
            </div>
          ),
          code: `<Progress value={0} />
<Progress value={25} />
<Progress value={50} />
<Progress value={75} />
<Progress value={100} />`,
        },
        {
          title: "Custom height",
          description: "Override the default h-2 height with a className to create thicker or thinner bars.",
          preview: (
            <div className="flex w-full max-w-sm flex-col gap-4">
              <Progress value={65} className="h-1" />
              <Progress value={65} className="h-2" />
              <Progress value={65} className="h-4" />
            </div>
          ),
          code: `<Progress value={65} className="h-1" />
<Progress value={65} className="h-2" />
<Progress value={65} className="h-4" />`,
        },
      ]}
      props={[
        {
          name: "value",
          type: "number | null",
          description: "Current progress value between 0 and 100. Pass null for indeterminate state.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional class names applied to the root track element. Use to override height, color, or radius.",
        },
        {
          name: "...props",
          type: "React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>",
          description: "All Radix Progress Root props are forwarded, including max and getValueLabel.",
        },
      ]}
      a11yNotes={[
        "Radix sets role=progressbar, aria-valuemin=0, aria-valuemax=100, and aria-valuenow automatically.",
        "When value is null the component enters indeterminate state — screen readers announce it as in-progress.",
        "Provide a visible label near the progress bar so users understand what is being measured.",
      ]}
    />
  )
}
