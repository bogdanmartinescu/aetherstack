import * as React from "react"
import { cn } from "@aetherstack/utils"

export interface KbdProps extends React.HTMLAttributes<HTMLElement> {}

const Kbd = React.forwardRef<HTMLElement, KbdProps>(({ className, ...props }, ref) => (
  <kbd
    ref={ref}
    className={cn(
      "border-border bg-muted text-muted-foreground inline-flex h-5 select-none items-center gap-1 rounded border px-1.5 font-mono text-[10px] font-medium",
      className,
    )}
    {...props}
  />
))
Kbd.displayName = "Kbd"

export { Kbd }
