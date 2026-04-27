import type { Metadata } from "next"
import { Button } from "@aetherstack/ui"
import { Plus, RefreshCw, Download, Search, Settings, Bell, X, Loader2, Trash2, Mail } from "lucide-react"
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
        "4 sizes: sm, default, lg, icon (square, for icon-only buttons)",
        "First-class Lucide React icon support — icons are auto-sized and pointer-events disabled",
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
          description: "Four sizes. Use 'icon' for square icon-only buttons — always add aria-label.",
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon" aria-label="Add item"><Plus /></Button>
            </div>
          ),
          code: `import { Plus } from "lucide-react"

<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon" aria-label="Add item">
  <Plus />
</Button>`,
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
          description: "Place a Lucide icon before or after the label. Icons are auto-sized to 16px — no extra classes needed.",
          preview: (
            <div className="flex flex-wrap gap-3">
              <Button><Plus />New item</Button>
              <Button variant="outline"><Download />Export</Button>
              <Button variant="secondary"><Mail />Send email</Button>
              <Button variant="destructive"><Trash2 />Delete</Button>
            </div>
          ),
          code: `import { Plus, Download, Mail, Trash2 } from "lucide-react"

// Leading icon
<Button>
  <Plus />
  New item
</Button>

// Trailing icon
<Button variant="outline">
  Export
  <Download />
</Button>`,
        },
        {
          title: "Icon-only buttons",
          description: "Use size=\"icon\" for square icon buttons. Always provide aria-label for screen readers.",
          preview: (
            <div className="flex flex-wrap items-center gap-3">
              <Button size="icon" aria-label="Search"><Search /></Button>
              <Button size="icon" variant="outline" aria-label="Settings"><Settings /></Button>
              <Button size="icon" variant="ghost" aria-label="Notifications"><Bell /></Button>
              <Button size="icon" variant="secondary" aria-label="Refresh"><RefreshCw /></Button>
              <Button size="icon" variant="destructive" aria-label="Remove"><X /></Button>
            </div>
          ),
          code: `import { Search, Settings, Bell, RefreshCw, X } from "lucide-react"

<Button size="icon" aria-label="Search">
  <Search />
</Button>
<Button size="icon" variant="outline" aria-label="Settings">
  <Settings />
</Button>
<Button size="icon" variant="ghost" aria-label="Notifications">
  <Bell />
</Button>`,
        },
        {
          title: "Loading state",
          description: "Combine disabled with an animated Loader2 spinner for async actions.",
          preview: (
            <div className="flex flex-wrap gap-3">
              <Button disabled><Loader2 className="animate-spin" />Loading…</Button>
              <Button variant="outline" disabled><Loader2 className="animate-spin" />Saving…</Button>
            </div>
          ),
          code: `import { Loader2 } from "lucide-react"

<Button disabled>
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
