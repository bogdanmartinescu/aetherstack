"use client"

import { PasswordField } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { PASSWORD_FIELD_SOURCE } from "@/lib/registry-source"

export default function PasswordFieldPage() {
  return (
    <ComponentPage
      name="Password Field"
      description="Password input with a show/hide toggle and a Caps Lock warning."
      features={[
        "Show and hide password with an icon toggle",
        "Caps Lock warning while typing with Caps Lock on",
        "Supports current-password and new-password autocomplete",
        "Optional controlled and uncontrolled value modes",
      ]}
      preview={<PasswordField label="Password" />}
      previewCode={`import { PasswordField } from "@/components/ui/password-field"

export function PasswordFieldDemo() {
  return <PasswordField label="Password" />
}`}
      cliInstall="npx aether-ui add password-field"
      manualInstallCode={PASSWORD_FIELD_SOURCE}
      manualSteps={[
        {
          title: "Add the input registry dependency",
          code: "npx aether-ui add input",
          filename: "terminal",
        },
        {
          title: "Add the button registry dependency",
          code: "npx aether-ui add button",
          filename: "terminal",
        },
      ]}
      examples={[]}
      props={[
        {
          name: "label",
          type: "string",
          default: '"Password"',
          description: "Visible label linked to the input via htmlFor.",
        },
        {
          name: "autoComplete",
          type: '"current-password" | "new-password"',
          default: '"current-password"',
          description: "Passed to the underlying input autocomplete attribute.",
        },
        {
          name: "value",
          type: "string",
          description: "Controlled input value.",
        },
        {
          name: "defaultValue",
          type: "string",
          description: "Initial value for uncontrolled usage.",
        },
        {
          name: "onChange",
          type: "(event: React.ChangeEvent<HTMLInputElement>) => void",
          description: "Called when the input value changes.",
        },
        {
          name: "disabled",
          type: "boolean",
          description: "Disables the input and the visibility toggle.",
        },
        {
          name: "name",
          type: "string",
          description: "Name attribute for form submission.",
        },
        {
          name: "id",
          type: "string",
          description: "Input id; a generated id is used when omitted.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional classes on the input element.",
        },
      ]}
      a11yNotes={[
        "The label is associated with the input for getByLabelText and screen readers.",
        "The visibility toggle exposes Show/Hide password labels and aria-pressed.",
        "Caps Lock status is announced via a live status region when active.",
      ]}
    />
  )
}
