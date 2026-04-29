import type { Metadata } from "next"
import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Avatar",
  description: "A circular image element with automatic fallback to initials when the image fails to load.",
}

const MANUAL_SOURCE = `"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@/lib/utils"

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
))
Avatar.displayName = "Avatar"

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
))
AvatarImage.displayName = "AvatarImage"

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground",
      className,
    )}
    {...props}
  />
))
AvatarFallback.displayName = "AvatarFallback"

interface AvatarGroupProps {
  children: React.ReactNode
  className?: string
  max?: number
}

function AvatarGroup({ children, className, max }: AvatarGroupProps) {
  const childArray = React.Children.toArray(children)
  const visible = max !== undefined ? childArray.slice(0, max) : childArray
  const overflow = max !== undefined ? childArray.length - max : 0

  return (
    <div className={cn("flex items-center -space-x-2", className)}>
      {visible}
      {overflow > 0 && (
        <Avatar>
          <AvatarFallback>+{overflow}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }`

export default function AvatarPage() {
  return (
    <ComponentPage
      name="Avatar"
      description="A circular image element with an automatic fallback to initials or a placeholder when the image is unavailable."
      radixSource="https://www.radix-ui.com/primitives/docs/components/avatar"
      features={[
        "Graceful fallback — shows initials or placeholder when image fails or is absent",
        "AvatarGroup stacks multiple avatars with configurable max and overflow count",
        "Consistent 40×40 px default size, fully overridable via className",
        "Forwards refs to underlying Radix primitives",
      ]}
      preview={
        <div className="flex flex-wrap items-center gap-4">
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
          <Avatar>
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <AvatarGroup max={3}>
            <Avatar>
              <AvatarFallback>A</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>B</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>C</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarFallback>D</AvatarFallback>
            </Avatar>
          </AvatarGroup>
        </div>
      }
      previewCode={`import { Avatar, AvatarImage, AvatarFallback, AvatarGroup } from "@/components/ui/avatar"

export function AvatarDemo() {
  return (
    <div className="flex items-center gap-4">
      {/* With image */}
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
        <AvatarFallback>SC</AvatarFallback>
      </Avatar>

      {/* Fallback initials */}
      <Avatar>
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>

      {/* Group with overflow */}
      <AvatarGroup max={3}>
        <Avatar><AvatarFallback>A</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>B</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>C</AvatarFallback></Avatar>
        <Avatar><AvatarFallback>D</AvatarFallback></Avatar>
      </AvatarGroup>
    </div>
  )
}`}
      cliInstall={`npx aether-ui add avatar`}
      manualInstallCode={MANUAL_SOURCE}
      manualSteps={[
        {
          title: "Install dependencies",
          code: `npm install @radix-ui/react-avatar`,
          filename: "terminal",
        },
      ]}
      examples={[
        {
          title: "With image",
          description: "Provide a src URL via AvatarImage. If the image loads successfully, AvatarFallback is hidden.",
          preview: (
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
              <AvatarFallback>SC</AvatarFallback>
            </Avatar>
          ),
          code: `<Avatar>
  <AvatarImage src="https://github.com/shadcn.png" alt="shadcn" />
  <AvatarFallback>SC</AvatarFallback>
</Avatar>`,
        },
        {
          title: "Fallback initials",
          description: "When no image src is provided, or the image fails to load, AvatarFallback is shown instead.",
          preview: (
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>AB</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>MR</AvatarFallback>
              </Avatar>
            </div>
          ),
          code: `<Avatar>
  <AvatarFallback>JD</AvatarFallback>
</Avatar>

<Avatar>
  <AvatarFallback>AB</AvatarFallback>
</Avatar>`,
        },
        {
          title: "AvatarGroup with max",
          description: "Stack multiple avatars together. Set max to limit visible avatars — excess are shown as a +N overflow badge.",
          preview: (
            <AvatarGroup max={3}>
              <Avatar>
                <AvatarFallback>AL</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>BK</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>DN</AvatarFallback>
              </Avatar>
              <Avatar>
                <AvatarFallback>EO</AvatarFallback>
              </Avatar>
            </AvatarGroup>
          ),
          code: `<AvatarGroup max={3}>
  <Avatar><AvatarFallback>AL</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>BK</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>CM</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>DN</AvatarFallback></Avatar>
  <Avatar><AvatarFallback>EO</AvatarFallback></Avatar>
</AvatarGroup>
{/* Shows 3 avatars + "+2" overflow */}`,
        },
      ]}
      props={[
        {
          name: "className",
          type: "string",
          description: "Additional class names applied to the Avatar root (40×40 circle by default).",
        },
        {
          name: "...props",
          type: "React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>",
          description: "All Radix Avatar Root props are forwarded.",
        },
      ]}
      propGroups={[
        {
          title: "AvatarImage",
          props: [
            {
              name: "src",
              type: "string",
              description: "URL of the avatar image.",
            },
            {
              name: "alt",
              type: "string",
              description: "Alt text for the image — important for screen readers.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class names applied to the image element.",
            },
          ],
        },
        {
          title: "AvatarFallback",
          props: [
            {
              name: "children",
              type: "ReactNode",
              description: "Content shown when the image is unavailable. Typically 1–2 initials.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class names applied to the fallback element.",
            },
          ],
        },
        {
          title: "AvatarGroup",
          props: [
            {
              name: "children",
              type: "ReactNode",
              required: true,
              description: "Avatar elements to display in the group.",
            },
            {
              name: "max",
              type: "number",
              description: "Maximum number of avatars to show. Excess is rendered as a +N badge.",
            },
            {
              name: "className",
              type: "string",
              description: "Additional class names applied to the group container.",
            },
          ],
        },
      ]}
      a11yNotes={[
        "Always provide a meaningful alt on AvatarImage for screen readers.",
        "AvatarFallback is announced when no image is present — keep initials short and meaningful.",
        "The avatar circle has overflow: hidden applied — decorative images need no extra aria attributes.",
      ]}
    />
  )
}
