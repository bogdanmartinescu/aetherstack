import * as React from "react"
import { cn } from "@aetherstack/utils"

export interface InputGroupProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface InputGroupAddonProps extends React.HTMLAttributes<HTMLDivElement> {
  position: "left" | "right"
}

const InputGroupAddon = React.forwardRef<HTMLDivElement, InputGroupAddonProps>(
  ({ className, position, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex items-center border border-input bg-muted px-3 text-sm text-muted-foreground",
        position === "left"
          ? "rounded-l-md rounded-r-none border-r-0"
          : "rounded-r-md rounded-l-none border-l-0",
        className,
      )}
      {...props}
    />
  ),
)
InputGroupAddon.displayName = "InputGroupAddon"

const InputGroupText = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, ...props }, ref) => (
  <span ref={ref} className={cn("text-sm", className)} {...props} />
))
InputGroupText.displayName = "InputGroupText"

const InputGroup = React.forwardRef<HTMLDivElement, InputGroupProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "flex w-full items-stretch",
        // flatten interior-facing border radii and remove duplicate borders
        "[&>*:not(:first-child)]:rounded-l-none",
        "[&>*:not(:last-child)]:rounded-r-none",
        "[&>*:not(:first-child)]:border-l-0",
        className,
      )}
      {...props}
    />
  ),
)
InputGroup.displayName = "InputGroup"

export { InputGroup, InputGroupAddon, InputGroupText }
