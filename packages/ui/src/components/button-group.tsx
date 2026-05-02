import * as React from "react"
import { cn } from "@aetherstack/utils"

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical"
}

const ButtonGroup = React.forwardRef<HTMLDivElement, ButtonGroupProps>(
  ({ className, orientation = "horizontal", ...props }, ref) => (
    <div
      ref={ref}
      role="group"
      className={cn(
        "inline-flex",
        orientation === "horizontal"
          ? [
              "flex-row",
              "[&>*:not(:first-child)]:rounded-l-none",
              "[&>*:not(:last-child)]:rounded-r-none",
              "[&>*:not(:first-child)]:border-l-0",
            ]
          : [
              "flex-col",
              "[&>*:not(:first-child)]:rounded-t-none",
              "[&>*:not(:last-child)]:rounded-b-none",
              "[&>*:not(:first-child)]:border-t-0",
            ],
        className,
      )}
      {...props}
    />
  ),
)
ButtonGroup.displayName = "ButtonGroup"

export { ButtonGroup }
