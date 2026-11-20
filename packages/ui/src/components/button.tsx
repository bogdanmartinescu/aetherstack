import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { LoaderCircle } from "lucide-react"
import { cn } from "@aetherstack/utils"

/*
 * Hover styles are guarded with `[&:not(:disabled)]:hover:` so a disabled
 * button keeps its resting colour while still showing a not-allowed cursor.
 * The guard also matches anchors (rendered via `asChild`), unlike `enabled:`.
 */
const buttonVariants = cva(
  [
    "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium",
    "ring-offset-background transition-[color,background-color,border-color,opacity,transform] duration-150 ease-out",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "data-[loading]:cursor-wait",
    "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-sm [&:not(:disabled)]:hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm [&:not(:disabled)]:hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm [&:not(:disabled)]:hover:bg-accent [&:not(:disabled)]:hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground [&:not(:disabled)]:hover:bg-secondary/80",
        ghost: "[&:not(:disabled)]:hover:bg-accent [&:not(:disabled)]:hover:text-accent-foreground",
        link: "text-primary underline-offset-4 [&:not(:disabled)]:hover:underline",
        quiet: "text-muted-foreground [&:not(:disabled)]:hover:text-foreground",
      },
      size: {
        xs: "h-8 gap-1.5 rounded-md px-2.5 text-xs [&_svg]:size-3.5 [@media(pointer:coarse)]:h-9",
        sm: "h-9 rounded-md px-3 [@media(pointer:coarse)]:h-10",
        default: "h-10 px-4 py-2 [@media(pointer:coarse)]:h-11",
        lg: "h-11 rounded-md px-8 [@media(pointer:coarse)]:h-12",
        "icon-xs":
          "h-8 w-8 [&_svg]:size-3.5 [@media(pointer:coarse)]:h-9 [@media(pointer:coarse)]:w-9",
        "icon-sm": "h-9 w-9 [@media(pointer:coarse)]:h-10 [@media(pointer:coarse)]:w-10",
        icon: "h-10 w-10 [@media(pointer:coarse)]:h-11 [@media(pointer:coarse)]:w-11",
        "icon-lg": "h-11 w-11 [@media(pointer:coarse)]:h-12 [@media(pointer:coarse)]:w-12",
      },
    },
    compoundVariants: [
      // Filled and chip buttons press in; text-only buttons stay put.
      {
        variant: ["default", "destructive", "outline", "secondary", "ghost"],
        className: "motion-safe:[&:not(:disabled):not([aria-disabled=true])]:active:scale-[0.97]",
      },
      // Quiet buttons are inline text actions: no chip, only the text size.
      {
        variant: "quiet",
        className:
          "h-auto w-auto px-0 py-0 [@media(pointer:coarse)]:h-auto [@media(pointer:coarse)]:w-auto",
      },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>

const ICON_ONLY_SIZE: Record<ButtonSize, ButtonSize> = {
  xs: "icon-xs",
  sm: "icon-sm",
  default: "icon",
  lg: "icon-lg",
  "icon-xs": "icon-xs",
  "icon-sm": "icon-sm",
  icon: "icon",
  "icon-lg": "icon-lg",
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /**
   * Shows a spinner in place of `icon`, sweeps the label, and ignores clicks.
   * The button stays focusable (`aria-disabled`) so keyboard focus is not lost.
   */
  loading?: boolean
  /** Leading icon. With no children the button becomes square — add an `aria-label`. */
  icon?: React.ReactNode
  /** Trailing icon. Hidden while loading. */
  iconRight?: React.ReactNode
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      loading = false,
      icon,
      iconRight,
      disabled,
      children,
      onClick,
      ...props
    },
    ref,
  ) => {
    const Comp = asChild ? Slot : "button"
    const hasLabel = asChild || (children !== undefined && children !== null && children !== false)
    const resolvedSize = !hasLabel && (icon || loading) ? ICON_ONLY_SIZE[size ?? "default"] : size

    // Only attach a handler when the consumer passed one: a function prop
    // created here would break rendering from React Server Components.
    const clickProps = onClick
      ? {
          onClick: (event: React.MouseEvent<HTMLButtonElement>) => {
            if (loading) {
              event.preventDefault()
              return
            }
            onClick(event)
          },
        }
      : {}

    const leading = loading ? (
      <LoaderCircle className="animate-spin motion-reduce:animate-none" aria-hidden="true" />
    ) : (
      icon
    )

    return (
      <Comp
        className={cn(buttonVariants({ variant, size: resolvedSize, className }))}
        ref={ref}
        disabled={disabled}
        aria-disabled={loading || undefined}
        aria-busy={loading || undefined}
        data-loading={loading || undefined}
        {...clickProps}
        {...props}
        {...(loading && !asChild ? { type: "button" as const } : {})}
      >
        {leading}
        <Slottable>{children}</Slottable>
        {!loading && iconRight}
        {loading && variant !== "quiet" && variant !== "link" && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] motion-reduce:hidden"
          >
            <span className="animate-button-sweep absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-current to-transparent opacity-20" />
          </span>
        )}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
