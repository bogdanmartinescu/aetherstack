import type { Metadata } from "next"
import { Slider } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Slider",
  description: "An input where the user selects a value from within a given range by dragging a thumb.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className,
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = "Slider"

export { Slider }`

export default function SliderPage() {
  return (
    <ComponentPage
      name="Slider"
      description="An input where the user selects a value from within a given range by dragging a thumb along a track."
      radixSource="https://www.radix-ui.com/primitives/docs/components/slider"
      features={[
        "Supports single value and range (multiple thumbs) selection",
        "Configurable min, max, and step values",
        "Controlled and uncontrolled modes via value / defaultValue",
        "Full keyboard support — Arrow keys, Page Up/Down, Home, End",
        "Thumb has visible focus ring for keyboard navigation",
        "Disabled state prevents interaction and dims the control",
        "Forwards ref to the underlying Radix Slider root",
      ]}
      preview={
        <div className="w-full max-w-sm">
          <Slider defaultValue={[50]} />
        </div>
      }
      previewCode={`import { Slider } from "@/components/ui/slider"

export function SliderDemo() {
  return <Slider defaultValue={[50]} />
}`}
      cliInstall={`npx aether-ui add slider`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-slider`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Default",
          description: "A basic slider with a default value. The thumb can be dragged or controlled via keyboard.",
          preview: (
            <div className="w-full max-w-sm">
              <Slider defaultValue={[33]} />
            </div>
          ),
          code: `<Slider defaultValue={[33]} />`,
        },
        {
          title: "With steps",
          description: "Set step to snap the thumb to discrete values. Useful for quantity selectors or rating inputs.",
          preview: (
            <div className="w-full max-w-sm">
              <Slider defaultValue={[40]} min={0} max={100} step={10} />
            </div>
          ),
          code: `<Slider defaultValue={[40]} min={0} max={100} step={10} />`,
        },
        {
          title: "Range",
          description: "Passing two values in the defaultValue array creates two thumbs for selecting a range.",
          preview: (
            <div className="w-full max-w-sm">
              <Slider defaultValue={[25, 75]} />
            </div>
          ),
          code: `<Slider defaultValue={[25, 75]} />`,
        },
        {
          title: "Disabled",
          description: "The disabled prop prevents interaction and reduces opacity.",
          preview: (
            <div className="w-full max-w-sm">
              <Slider defaultValue={[50]} disabled />
            </div>
          ),
          code: `<Slider defaultValue={[50]} disabled />`,
        },
      ]}
      props={[
        {
          name: "defaultValue",
          type: "number[]",
          description: "Initial value(s) for uncontrolled usage. Use an array with two numbers for a range slider.",
        },
        {
          name: "value",
          type: "number[]",
          description: "Controlled value(s). Use with onValueChange.",
        },
        {
          name: "onValueChange",
          type: "(value: number[]) => void",
          description: "Called continuously as the user drags the thumb.",
        },
        {
          name: "onValueCommit",
          type: "(value: number[]) => void",
          description: "Called once when the user finishes dragging (pointer up or key release).",
        },
        {
          name: "min",
          type: "number",
          default: "0",
          description: "Minimum value of the range.",
        },
        {
          name: "max",
          type: "number",
          default: "100",
          description: "Maximum value of the range.",
        },
        {
          name: "step",
          type: "number",
          default: "1",
          description: "Increment between selectable values.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the slider — prevents pointer events and applies reduced opacity.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional class names applied to the slider root element.",
        },
      ]}
      a11yNotes={[
        "Each thumb is a focusable element with role=slider and aria-valuenow, aria-valuemin, aria-valuemax set automatically.",
        "Arrow Left/Right (or Up/Down) move the thumb by one step. Page Up/Down move by 10 steps. Home/End jump to min/max.",
        "Always pair the slider with a visible label so users understand what value is being set.",
        "For range sliders, each thumb gets its own aria-label — provide them via the name prop or a custom aria-label.",
      ]}
    />
  )
}
