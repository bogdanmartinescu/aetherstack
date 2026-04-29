import * as React from "react"
import type { IconProps } from "./aether-mark"

/**
 * The Aether spark — a four-point star used to indicate AI / generative
 * features (badges, prompt buttons, "powered by AI" labels).
 */
export const AetherSpark = React.forwardRef<SVGSVGElement, IconProps>(
  ({ size = 24, className, ...props }, ref) => (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      role="img"
      className={className}
      {...props}
    >
      <path d="M12 3v6" />
      <path d="M12 15v6" />
      <path d="M3 12h6" />
      <path d="M15 12h6" />
      <path d="M5.5 5.5 9 9" />
      <path d="m15 15 3.5 3.5" />
      <path d="M18.5 5.5 15 9" />
      <path d="m9 15-3.5 3.5" />
    </svg>
  ),
)
AetherSpark.displayName = "AetherSpark"
