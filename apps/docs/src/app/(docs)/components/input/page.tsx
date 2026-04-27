import type { Metadata } from "next"
import { Input, Label, Button } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Input",
  description: "A single-line text input field.",
}

const MANUAL_SOURCE = `import * as React from "react"
import { cn } from "@/lib/utils"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          "ring-offset-background",
          "file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground",
          "placeholder:text-muted-foreground",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = "Input"

export { Input }`

export default function InputPage() {
  return (
    <ComponentPage
      name="Input"
      description="A single-line text input. Supports all HTML input types (text, email, password, number, file, etc.) and forwards all standard input attributes."
      features={[
        "Supports all HTML input types",
        "Consistent focus ring using the --ring token",
        "Placeholder, disabled, and file input states",
        "Full width by default — constrain with a wrapper",
        "Forwards ref",
      ]}
      preview={
        <div className="w-72 space-y-2">
          <Label htmlFor="email-preview">Email address</Label>
          <Input id="email-preview" type="email" placeholder="you@example.com" />
        </div>
      }
      previewCode={`import { Input, Label } from "@/components/ui/input"

export function InputDemo() {
  return (
    <div className="w-72 space-y-2">
      <Label htmlFor="email">Email address</Label>
      <Input id="email" type="email" placeholder="you@example.com" />
    </div>
  )
}`}
      cliInstall={`npx aether-ui add input`}
      manualInstallCode={MANUAL_SOURCE}
      examples={[
        {
          title: "With label",
          description: "Always pair an Input with a Label for accessibility.",
          preview: (
            <div className="w-72 space-y-2">
              <Label htmlFor="ex-name">Full name</Label>
              <Input id="ex-name" placeholder="Jane Smith" />
            </div>
          ),
          code: `<div className="space-y-2">
  <Label htmlFor="name">Full name</Label>
  <Input id="name" placeholder="Jane Smith" />
</div>`,
        },
        {
          title: "Input types",
          description: "Any HTML input type is supported via the type prop.",
          preview: (
            <div className="w-72 space-y-3">
              <Input type="text" placeholder="Text input" />
              <Input type="email" placeholder="Email input" />
              <Input type="password" placeholder="Password input" />
              <Input type="number" placeholder="Number input" />
              <Input type="search" placeholder="Search…" />
            </div>
          ),
          code: `<Input type="text" placeholder="Text" />
<Input type="email" placeholder="Email" />
<Input type="password" placeholder="Password" />
<Input type="number" placeholder="Number" />
<Input type="search" placeholder="Search…" />`,
        },
        {
          title: "Disabled",
          description: "Disabled inputs prevent interaction and are visually dimmed.",
          preview: (
            <div className="w-72 space-y-2">
              <Label htmlFor="dis-input">API key</Label>
              <Input id="dis-input" value="sk-••••••••••••••••" disabled readOnly />
            </div>
          ),
          code: `<Input value="sk-••••••••••••••••" disabled readOnly />`,
        },
        {
          title: "File input",
          description: "File inputs are styled consistently with a custom file selector.",
          preview: (
            <div className="w-72 space-y-2">
              <Label htmlFor="file-input">Upload file</Label>
              <Input id="file-input" type="file" />
            </div>
          ),
          code: `<div className="space-y-2">
  <Label htmlFor="file">Upload file</Label>
  <Input id="file" type="file" />
</div>`,
        },
        {
          title: "With inline button",
          description: "Pair with a Button for search or submit patterns.",
          preview: (
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Enter your email" />
              <Button type="submit">Subscribe</Button>
            </div>
          ),
          code: `<div className="flex items-center space-x-2">
  <Input type="email" placeholder="Enter your email" />
  <Button type="submit">Subscribe</Button>
</div>`,
        },
      ]}
      props={[
        {
          name: "type",
          type: "string",
          default: '"text"',
          description: "HTML input type (text, email, password, number, file, etc.).",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text shown when the input is empty.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables the input — prevents interaction and applies reduced opacity.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional class names merged onto the input element.",
        },
        {
          name: "...props",
          type: "React.InputHTMLAttributes<HTMLInputElement>",
          description: "All standard HTML input attributes (onChange, value, defaultValue, name, required, etc.).",
        },
      ]}
      a11yNotes={[
        "Always associate an Input with a Label using matching id and htmlFor attributes.",
        "For form validation, use aria-describedby to link the input to its error message.",
        "Use aria-invalid='true' when a field has an error.",
        "Never rely on placeholder text alone to label a field — placeholders disappear when typing.",
      ]}
    />
  )
}
