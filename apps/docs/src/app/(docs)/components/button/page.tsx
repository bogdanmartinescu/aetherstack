import type { Metadata } from "next"
import { Button } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Button",
  description: "Triggers an action or event. Supports multiple variants and sizes.",
}

const MANUAL_SOURCE = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-background transition-colors",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }`

export default function ButtonPage() {
  return (
    <ComponentPage
      name="Button"
      description="Triggers an action or event. Supports 6 variants, 4 sizes, and can render as any HTML element via the asChild prop."
      features={[
        "6 variants: default, secondary, outline, ghost, destructive, link",
        "4 sizes: sm, default, lg, icon",
        "asChild prop renders as any element via Radix Slot (avoids nested button/anchor issues)",
        "Full keyboard accessibility — focus ring, disabled state",
        "Forwards ref to the underlying element",
      ]}
      preview={
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
      }
      previewCode={`import { Button } from "@/components/ui/button"

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap gap-3">
      <Button>Default</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="destructive">Destructive</Button>
    </div>
  )
}`}
      cliInstall={`npx aether-ui add button`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-slot class-variance-authority`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "Variants",
          description: "Six visual variants covering the full range of action contexts.",
          preview: (
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button variant="link">Link</Button>
            </div>
          ),
          code: `<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>`,
        },
        {
          title: "Sizes",
          description: "Four sizes. Use 'icon' for square icon-only buttons.",
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">+</Button>
            </div>
          ),
          code: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">+</Button>`,
        },
        {
          title: "Disabled state",
          description: "Disabled buttons are non-interactive and visually dimmed.",
          preview: (
            <div className="flex flex-wrap gap-3">
              <Button disabled>Default</Button>
              <Button variant="secondary" disabled>Secondary</Button>
              <Button variant="outline" disabled>Outline</Button>
            </div>
          ),
          code: `<Button disabled>Disabled</Button>
<Button variant="secondary" disabled>Secondary</Button>
<Button variant="outline" disabled>Outline</Button>`,
        },
        {
          title: "As link (asChild)",
          description:
            "Use asChild to render the Button as a different element. This avoids the invalid nested <button><a> pattern and keeps full button styling.",
          preview: (
            <div className="flex flex-wrap gap-3">
              <Button asChild>
                <a href="#link-example">Link styled as button</a>
              </Button>
              <Button variant="outline" asChild>
                <a href="#link-example">Outline link</a>
              </Button>
            </div>
          ),
          code: `import { Button } from "@/components/ui/button"

// Renders as <a> but styled as a button
<Button asChild>
  <a href="/dashboard">Go to Dashboard</a>
</Button>`,
        },
        {
          title: "With icon",
          description: "Icons inside buttons are sized automatically via the SVG selector.",
          preview: (
            <div className="flex flex-wrap gap-3">
              <Button>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
                Add item
              </Button>
              <Button variant="outline">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.201 2.466l-.312-.311h2.433a.75.75 0 000-1.5H3.989a.75.75 0 00-.75.75v4.242a.75.75 0 001.5 0v-2.43l.31.31a7 7 0 0011.712-3.138.75.75 0 00-1.449-.39zm1.23-3.723a.75.75 0 00.219-.53V2.929a.75.75 0 00-1.5 0V5.36l-.31-.31A7 7 0 003.239 8.188a.75.75 0 101.448.389A5.5 5.5 0 0113.89 6.11l.311.31h-2.432a.75.75 0 000 1.5h4.243a.75.75 0 00.53-.219z" clipRule="evenodd" />
                </svg>
                Refresh
              </Button>
            </div>
          ),
          code: `import { Plus } from "lucide-react"

<Button>
  <Plus />
  Add item
</Button>`,
        },
        {
          title: "Loading state",
          description: "Combine disabled with an animated spinner for async actions.",
          preview: (
            <Button disabled>
              <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Loading…
            </Button>
          ),
          code: `<Button disabled>
  <Loader2 className="animate-spin" />
  Loading…
</Button>`,
        },
      ]}
      props={[
        {
          name: "variant",
          type: '"default" | "destructive" | "outline" | "secondary" | "ghost" | "link"',
          default: '"default"',
          description: "Controls the visual style of the button.",
        },
        {
          name: "size",
          type: '"default" | "sm" | "lg" | "icon"',
          default: '"default"',
          description: "Controls the padding and height. Use 'icon' for square icon-only buttons.",
        },
        {
          name: "asChild",
          type: "boolean",
          default: "false",
          description:
            "When true, renders the button's children as the root element using Radix Slot. Useful for rendering as <a>, <Link>, or other elements.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the button — prevents pointer events and applies reduced opacity.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional class names merged onto the button element.",
        },
        {
          name: "...props",
          type: "React.ButtonHTMLAttributes<HTMLButtonElement>",
          description:
            "All standard HTML button attributes (onClick, type, aria-*, data-*, etc.) are forwarded to the element.",
        },
      ]}
      a11yNotes={[
        "Always provide a descriptive label for icon-only buttons via aria-label.",
        "Keyboard accessible — activates with Enter and Space keys.",
        "Focus ring uses the --ring token and is always visible on keyboard navigation (focus-visible).",
        "Disabled state removes pointer events entirely — does not trap focus.",
        "When using asChild with <a>, the element becomes a link — screen readers announce it as a link, not a button. This is correct semantic behavior.",
      ]}
    />
  )
}
