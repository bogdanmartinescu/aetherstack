"use client"

import * as React from "react"
import * as AvatarPrimitive from "@radix-ui/react-avatar"
import { cn } from "@aetherstack/utils"
import { StatusDot, type StatusDotStatus } from "./status-dot"

type AvatarProps = React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root> & {
  status?: StatusDotStatus
}

const Avatar = React.forwardRef<React.ElementRef<typeof AvatarPrimitive.Root>, AvatarProps>(
  ({ className, status, children, ...props }, ref) => (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn("relative flex h-10 w-10 shrink-0 rounded-full", className)}
      {...props}
    >
      <span className="size-full overflow-hidden rounded-full">{children}</span>
      {status ? (
        <span className="absolute bottom-0 right-0 translate-x-0.5 translate-y-0.5">
          <StatusDot status={status} />
        </span>
      ) : null}
    </AvatarPrimitive.Root>
  ),
)
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
      "bg-muted text-muted-foreground flex h-full w-full items-center justify-center rounded-full text-sm font-medium",
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
    <div
      className={cn("[&>*]:ring-background flex items-center -space-x-2 [&>*]:ring-2", className)}
    >
      {visible}
      {overflow > 0 && (
        <Avatar aria-label={`${overflow} more`} role="img">
          <AvatarFallback aria-hidden="true">+{overflow}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}
AvatarGroup.displayName = "AvatarGroup"

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup }
