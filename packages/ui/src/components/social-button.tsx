import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Button } from "./button"

export const SOCIAL_PROVIDERS = {
  google: "Google",
  apple: "Apple",
  microsoft: "Microsoft",
  github: "GitHub",
  gitlab: "GitLab",
  slack: "Slack",
} as const

export type SocialProvider = keyof typeof SOCIAL_PROVIDERS

export interface SocialButtonProps {
  provider: SocialProvider
  verb?: "Sign in" | "Sign up" | "Continue"
  variant?: "outline" | "brand" | "icon"
  loading?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}

function SocialGlyph({ provider }: { provider: SocialProvider }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "inline-flex size-5 shrink-0 items-center justify-center rounded-md bg-muted text-xs font-semibold text-foreground",
      )}
    >
      {SOCIAL_PROVIDERS[provider][0]}
    </span>
  )
}

export function SocialButton({
  provider,
  verb = "Sign in",
  variant = "outline",
  loading,
  onClick,
  className,
}: SocialButtonProps) {
  const providerName = SOCIAL_PROVIDERS[provider]
  const accessibleName = `${verb} with ${providerName}`
  const isIcon = variant === "icon"

  const clickProps = onClick ? { onClick } : {}
  const sizeProps = isIcon ? { size: "icon" as const } : {}
  const loadingProps = loading !== undefined ? { loading } : {}
  const classProps = className !== undefined ? { className } : {}
  const labelProps = isIcon ? { "aria-label": accessibleName } : {}

  return (
    <Button
      type="button"
      variant="outline"
      data-provider={provider}
      {...sizeProps}
      {...loadingProps}
      {...classProps}
      {...labelProps}
      {...clickProps}
    >
      <SocialGlyph provider={provider} />
      {!isIcon ? accessibleName : null}
    </Button>
  )
}