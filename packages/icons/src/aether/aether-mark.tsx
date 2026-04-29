import * as React from "react"

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Visual size in pixels for both width and height. Defaults to 24. */
  size?: number | string
}

/**
 * The Aether logo mark — a stylized "A" formed from two converging strokes
 * with a center crossbar, sized to match the lucide-react default 24×24 grid.
 */
export const AetherMark = React.forwardRef<SVGSVGElement, IconProps>(
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
      <path d="M4 20 12 4l8 16" />
      <path d="M7.5 14h9" />
    </svg>
  ),
)
AetherMark.displayName = "AetherMark"
