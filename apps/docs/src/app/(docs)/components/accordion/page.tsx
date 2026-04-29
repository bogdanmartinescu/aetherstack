import type { Metadata } from "next"
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Accordion",
  description: "A vertically stacked set of interactive headings that reveal or hide associated content.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

const Accordion = AccordionPrimitive.Root

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn("border-b border-border", className)}
    {...props}
  />
))
AccordionItem.displayName = "AccordionItem"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
))
AccordionTrigger.displayName = "AccordionTrigger"

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
))
AccordionContent.displayName = "AccordionContent"

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }`

export default function AccordionPage() {
  return (
    <ComponentPage
      name="Accordion"
      description="A vertically stacked set of interactive headings that reveal or hide their associated content sections."
      radixSource="https://www.radix-ui.com/primitives/docs/components/accordion"
      features={[
        'Two selection modes: "single" (one item open at a time) and "multiple" (any number open)',
        "Animated expand/collapse via CSS keyframes",
        "ChevronDown indicator rotates 180° when open",
        "Full keyboard navigation — Arrow Up/Down, Home, End, Space, Enter",
        "Each item can be individually disabled",
        "Forwards refs to underlying Radix primitives",
      ]}
      preview={
        <Accordion type="single" collapsible className="w-full max-w-md">
          <AccordionItem value="item-1">
            <AccordionTrigger>What is Aether UI?</AccordionTrigger>
            <AccordionContent>
              Aether UI is a copy-paste component library built with Radix UI and Tailwind CSS. You own the code.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>Is it free?</AccordionTrigger>
            <AccordionContent>
              Yes. Aether UI is completely free and open source. No subscriptions, no paywalls.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>How do I install it?</AccordionTrigger>
            <AccordionContent>
              Run <code>npx aether-ui add accordion</code> in your project and the component is copied directly into your codebase.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      }
      previewCode={`import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion"

export function AccordionDemo() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Aether UI?</AccordionTrigger>
        <AccordionContent>
          Aether UI is a copy-paste component library built with Radix UI and Tailwind CSS.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it free?</AccordionTrigger>
        <AccordionContent>
          Yes. Aether UI is completely free and open source.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>How do I install it?</AccordionTrigger>
        <AccordionContent>
          Run npx aether-ui add accordion in your project.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}`}
      cliInstall={`npx aether-ui add accordion`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-accordion lucide-react`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Single selection",
          description: 'With type="single" and collapsible, only one item can be open at a time and clicking again closes it.',
          preview: (
            <Accordion type="single" collapsible className="w-full max-w-md">
              <AccordionItem value="q1">
                <AccordionTrigger>Can I use this in production?</AccordionTrigger>
                <AccordionContent>Absolutely. Aether UI components are production-ready and fully accessible.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q2">
                <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
                <AccordionContent>Yes. All components use CSS variables that automatically adapt to light and dark themes.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="q3">
                <AccordionTrigger>Is TypeScript supported?</AccordionTrigger>
                <AccordionContent>Yes. Every component ships with full TypeScript types.</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: `<Accordion type="single" collapsible className="w-full">
  <AccordionItem value="q1">
    <AccordionTrigger>Can I use this in production?</AccordionTrigger>
    <AccordionContent>Absolutely. Aether UI components are production-ready.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="q2">
    <AccordionTrigger>Does it support dark mode?</AccordionTrigger>
    <AccordionContent>Yes. All components use CSS variables for theming.</AccordionContent>
  </AccordionItem>
</Accordion>`,
        },
        {
          title: "Multiple selection",
          description: 'With type="multiple", any number of items can be open simultaneously.',
          preview: (
            <Accordion type="multiple" className="w-full max-w-md">
              <AccordionItem value="m1">
                <AccordionTrigger>Section one</AccordionTrigger>
                <AccordionContent>Content for section one. Multiple items can be open at the same time.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="m2">
                <AccordionTrigger>Section two</AccordionTrigger>
                <AccordionContent>Content for section two. Open both at once to compare.</AccordionContent>
              </AccordionItem>
              <AccordionItem value="m3">
                <AccordionTrigger>Section three</AccordionTrigger>
                <AccordionContent>Content for section three. Great for settings panels or FAQs.</AccordionContent>
              </AccordionItem>
            </Accordion>
          ),
          code: `<Accordion type="multiple" className="w-full">
  <AccordionItem value="m1">
    <AccordionTrigger>Section one</AccordionTrigger>
    <AccordionContent>Content for section one.</AccordionContent>
  </AccordionItem>
  <AccordionItem value="m2">
    <AccordionTrigger>Section two</AccordionTrigger>
    <AccordionContent>Content for section two.</AccordionContent>
  </AccordionItem>
</Accordion>`,
        },
      ]}
      props={[
        {
          name: "type",
          type: '"single" | "multiple"',
          required: true,
          description: 'Controls selection behavior. "single" allows one open item; "multiple" allows many.',
        },
        {
          name: "collapsible",
          type: "boolean",
          default: "false",
          description: 'When type="single", allows the open item to be closed by clicking it again.',
        },
        {
          name: "defaultValue",
          type: "string | string[]",
          description: "The value(s) of the item(s) open by default (uncontrolled).",
        },
        {
          name: "value",
          type: "string | string[]",
          description: "Controlled open value(s). Use with onValueChange.",
        },
        {
          name: "onValueChange",
          type: "(value: string | string[]) => void",
          description: "Called when the open state changes.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional class names applied to the root element.",
        },
      ]}
      propGroups={[
        {
          title: "AccordionItem",
          props: [
            {
              name: "value",
              type: "string",
              required: true,
              description: "Unique identifier for this item. Used to control open state.",
            },
            {
              name: "disabled",
              type: "boolean",
              default: "false",
              description: "Prevents the item from being opened or closed.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class names applied to the item element.",
            },
          ],
        },
        {
          title: "AccordionTrigger",
          props: [
            {
              name: "children",
              type: "ReactNode",
              required: true,
              description: "The label shown in the trigger button.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class names applied to the trigger element.",
            },
          ],
        },
        {
          title: "AccordionContent",
          props: [
            {
              name: "children",
              type: "ReactNode",
              required: true,
              description: "The content revealed when the item is open.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class names applied to the inner content div.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "Each trigger is a <button> inside a heading — screen readers announce it correctly as an expandable section.",
        "Arrow Up/Down moves focus between triggers. Home/End jump to first/last.",
        "Space and Enter toggle the open state of the focused item.",
        "aria-expanded is set automatically by Radix based on open state.",
        "Disabled items are skipped during keyboard navigation.",
      ]}
    />
  )
}
