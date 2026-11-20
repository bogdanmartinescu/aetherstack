"use client"

import { useState } from "react"
import { PasswordStrength } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { PASSWORD_STRENGTH_SOURCE } from "@/lib/registry-source"

export default function PasswordStrengthPage() {
  const [password, setPassword] = useState("short")

  return (
    <ComponentPage
      name="Password Strength"
      description="Score a password and generate one that passes the rules."
      features={[
        "Scores passwords from 0–4 with an accessible meter",
        "Lists five rules with met/unmet indicators",
        "Generate button creates a password that passes every rule",
        "Pure helpers for scoring, checking, and generating passwords",
      ]}
      preview={<PasswordStrength password={password} onPasswordChange={setPassword} />}
      previewCode={`import { useState } from "react"
import { PasswordStrength } from "@/components/ui/password-strength"

export function PasswordStrengthDemo() {
  const [password, setPassword] = useState("short")

  return (
    <PasswordStrength password={password} onPasswordChange={setPassword} />
  )
}`}
      cliInstall="npx aether-ui add password-strength"
      manualInstallCode={PASSWORD_STRENGTH_SOURCE}
      manualSteps={[
        {
          title: "Add the button registry dependency",
          code: "npx aether-ui add button",
          filename: "terminal",
        },
      ]}
      examples={[]}
      props={[
        {
          name: "password",
          type: "string",
          description: "Current password value to score and validate against the rules.",
        },
        {
          name: "onPasswordChange",
          type: "(next: string) => void",
          description:
            "Called when Generate password is clicked. The generate button is shown only when this callback is provided.",
        },
      ]}
      a11yNotes={[
        "The strength meter uses role=meter with aria-valuenow, aria-valuemax, and aria-valuetext.",
        "Each rule exposes data-met for styling and testing met/unmet state.",
        "The generate control is a button with an accessible name of Generate password.",
      ]}
    />
  )
}
