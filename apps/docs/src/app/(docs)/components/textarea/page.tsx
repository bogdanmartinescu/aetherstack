"use client"

import { Textarea, Label, Button } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

const MANUAL_SOURCE = `import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
          "ring-offset-background",
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
Textarea.displayName = "Textarea"

export { Textarea }`

export default function TextareaPage() {
  return (
    <ComponentPage
      name="Textarea"
      description="A multi-line plain text editor. Extends the native textarea element with consistent Aether UI styling and token-driven appearance."
      features={[
        "Minimum height of 80px, resizable by default",
        "Consistent focus ring and placeholder styling",
        "Disabled state with visual feedback",
        "Forwards ref",
        "Full width by default",
      ]}
      preview={
        <div className="w-80 space-y-2">
          <Label htmlFor="msg-preview">Message</Label>
          <Textarea id="msg-preview" placeholder="Write your message here…" />
        </div>
      }
      previewCode={`import { Textarea, Label } from "@/components/ui"

export function TextareaDemo() {
  return (
    <div className="space-y-2">
      <Label htmlFor="message">Message</Label>
      <Textarea id="message" placeholder="Write your message here…" />
    </div>
  )
}`}
      cliInstall={`npx aether-ui add textarea`}
      manualInstallCode={MANUAL_SOURCE}
      examples={[
        {
          title: "With label",
          description: "Always pair a Textarea with a Label for accessibility.",
          preview: (
            <div className="w-80 space-y-2">
              <Label htmlFor="notes-ex">Notes</Label>
              <Textarea id="notes-ex" placeholder="Add context…" rows={4} />
            </div>
          ),
          code: `<div className="space-y-2">
  <Label htmlFor="notes">Notes</Label>
  <Textarea id="notes" placeholder="Add context…" rows={4} />
</div>`,
        },
        {
          title: "Disabled",
          description: "Disabled textareas prevent editing.",
          preview: (
            <div className="w-80 space-y-2">
              <Label htmlFor="dis-ta">Bio</Label>
              <Textarea
                id="dis-ta"
                defaultValue="This field is read-only."
                disabled
              />
            </div>
          ),
          code: `<Textarea defaultValue="Read-only content" disabled />`,
        },
        {
          title: "Fixed height (no resize)",
          description: "Use resize-none to prevent manual resizing.",
          preview: (
            <div className="w-80 space-y-2">
              <Label htmlFor="fixed-ta">Comment</Label>
              <Textarea
                id="fixed-ta"
                className="resize-none"
                placeholder="Leave a comment…"
                rows={3}
              />
            </div>
          ),
          code: `<Textarea className="resize-none" rows={3} placeholder="Comment…" />`,
        },
        {
          title: "With character count",
          description: "Compose with state to show a character count.",
          preview: (
            <div className="w-80 space-y-1.5">
              <Label htmlFor="limited-ta">Bio</Label>
              <Textarea
                id="limited-ta"
                placeholder="Tell us about yourself"
                className="resize-none"
                rows={3}
                maxLength={160}
              />
              <p className="text-xs text-muted-foreground text-right">0 / 160</p>
            </div>
          ),
          code: `"use client"
import { useState } from "react"

export function TextareaWithCount() {
  const [value, setValue] = useState("")
  return (
    <div className="space-y-1.5">
      <Label htmlFor="bio">Bio</Label>
      <Textarea
        id="bio"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="resize-none"
        maxLength={160}
        rows={3}
      />
      <p className="text-xs text-muted-foreground text-right">
        {value.length} / 160
      </p>
    </div>
  )
}`,
        },
        {
          title: "With submit button",
          preview: (
            <div className="w-80 space-y-3">
              <div className="space-y-2">
                <Label htmlFor="reply-ta">Reply</Label>
                <Textarea id="reply-ta" placeholder="Write a reply…" className="resize-none" rows={3} />
              </div>
              <div className="flex justify-end">
                <Button size="sm">Post reply</Button>
              </div>
            </div>
          ),
          code: `<div className="space-y-3">
  <div className="space-y-2">
    <Label htmlFor="reply">Reply</Label>
    <Textarea id="reply" placeholder="Write a reply…" className="resize-none" rows={3} />
  </div>
  <div className="flex justify-end">
    <Button size="sm">Post reply</Button>
  </div>
</div>`,
        },
      ]}
      props={[
        {
          name: "rows",
          type: "number",
          default: "—",
          description: "Sets the visible number of text lines. The textarea can still be resized by the user unless resize-none is applied.",
        },
        {
          name: "placeholder",
          type: "string",
          description: "Placeholder text shown when empty.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Prevents editing and applies reduced opacity.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional class names.",
        },
        {
          name: "...props",
          type: "React.TextareaHTMLAttributes<HTMLTextAreaElement>",
          description: "All standard HTML textarea attributes (onChange, value, defaultValue, maxLength, etc.).",
        },
      ]}
      a11yNotes={[
        "Always associate with a Label via matching id/htmlFor.",
        "Use aria-describedby to connect error messages to the textarea.",
        "Add aria-invalid='true' when the field fails validation.",
      ]}
    />
  )
}
