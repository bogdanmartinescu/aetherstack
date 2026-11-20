import * as React from "react"
import { cn } from "@aetherstack/utils"

function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("bg-muted animate-pulse rounded-md", className)} {...props} />
}

export { Skeleton }
