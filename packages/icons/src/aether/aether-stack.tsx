import * as React from "react"
import type { IconProps } from "./aether-mark"

/**
 * The Aetherstack icon — three stacked rounded shapes representing the
 * tokens / ui / patterns layered architecture. Used in docs and the registry
 * UI to represent layered design-system items.
 */
export const AetherStack = React.forwardRef<SVGSVGElement, IconProps>(
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
      <rect x="4" y="4" width="16" height="4" rx="1.5" />
      <rect x="4" y="10" width="16" height="4" rx="1.5" />
      <rect x="4" y="16" width="16" height="4" rx="1.5" />
    </svg>
  ),
)
AetherStack.displayName = "AetherStack"
