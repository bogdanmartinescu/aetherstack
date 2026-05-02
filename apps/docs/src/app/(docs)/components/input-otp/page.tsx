import type { Metadata } from "next"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Input OTP",
  description: "An accessible one-time password input with individual digit slots.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import { OTPInput, OTPInputContext } from "input-otp"
import { Dot } from "lucide-react"
import { cn } from "@/lib/utils"

// Full source: packages/ui/src/components/input-otp.tsx`

export default function InputOTPPage() {
  return (
    <ComponentPage
      name="Input OTP"
      description="An accessible one-time password input with individual digit slots. Supports copy-paste auto-fill, custom separators between groups, and full keyboard navigation."
      features={[
        "Individual digit slots with active cursor",
        "Supports custom separators between groups",
        "Copy-paste fills all slots automatically",
        "Built on the input-otp library",
      ]}
      preview={
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      }
      previewCode={`"use client"

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
  InputOTPSeparator,
} from "@/components/ui/input-otp"

export function InputOTPDemo() {
  return (
    <InputOTP maxLength={6}>
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
        <InputOTPSlot index={2} />
      </InputOTPGroup>
      <InputOTPSeparator />
      <InputOTPGroup>
        <InputOTPSlot index={3} />
        <InputOTPSlot index={4} />
        <InputOTPSlot index={5} />
      </InputOTPGroup>
    </InputOTP>
  )
}`}
      cliInstall={`npx aether-ui add input-otp`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install input-otp`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "4-digit PIN",
          description: "Use a single group for a compact 4-digit PIN field.",
          preview: (
            <InputOTP maxLength={4}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          ),
          code: `<InputOTP maxLength={4}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
  </InputOTPGroup>
</InputOTP>`,
        },
        {
          title: "6-digit with separator",
          description: "Split slots into two groups separated by a dash.",
          preview: (
            <InputOTP maxLength={6}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          ),
          code: `<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`,
        },
      ]}
      props={[
        {
          name: "maxLength",
          type: "number",
          description: "Total number of OTP characters. Required.",
        },
        {
          name: "value",
          type: "string",
          description: "Controlled value of the OTP input.",
        },
        {
          name: "onChange",
          type: "(value: string) => void",
          description: "Callback fired on every character entry or paste.",
        },
        {
          name: "disabled",
          type: "boolean",
          default: "false",
          description: "Disables all slots.",
        },
        {
          name: "...props",
          type: "React.HTMLAttributes<HTMLDivElement>",
          description: "Additional props passed to the root OTPInput element.",
        },
      ]}
      a11yNotes={[
        "The root input-otp element manages focus within a single hidden input — screen readers announce digit entry naturally.",
        "Pair with a visible or visually-hidden label that describes the purpose of the code (e.g. 'Enter verification code').",
        "On paste, all slots are filled automatically — no additional keyboard interaction is required.",
      ]}
    />
  )
}
