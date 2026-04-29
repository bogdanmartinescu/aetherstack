import * as React from "react"
import type { IconProps } from "./aether-mark"

/**
 * The Aether glyph — a soft hexagonal capsule with a chevron core.
 * Designed to read at small sizes (16–20px) for nav indicators and badges.
 */
export const AetherGlyph = React.forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M12 2 21 7v10l-9 5-9-5V7l9-5Z" />
      <path d="m8.5 11 3.5 3.5L15.5 11" />
    </svg>
  ),
)
AetherGlyph.displayName = "AetherGlyph"
