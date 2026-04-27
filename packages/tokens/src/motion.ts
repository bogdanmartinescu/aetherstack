/**
 * Motion tokens.
 * Animation durations and easing functions for the Aether UI token system.
 */

export const durations = {
  instant: "0ms",
  fast: "100ms",
  normal: "200ms",
  slow: "300ms",
  slower: "500ms",
  lazy: "700ms",
} as const

export const easings = {
  linear: "linear",
  in: "cubic-bezier(0.4, 0, 1, 1)",
  out: "cubic-bezier(0, 0, 0.2, 1)",
  inOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  overshoot: "cubic-bezier(0.36, 0.07, 0.19, 0.97)",
} as const

/** Pre-composed transition shorthands for common UI interactions. */
export const transitions = {
  colors: `color ${durations.normal} ${easings.inOut}, background-color ${durations.normal} ${easings.inOut}, border-color ${durations.normal} ${easings.inOut}, text-decoration-color ${durations.normal} ${easings.inOut}, fill ${durations.normal} ${easings.inOut}, stroke ${durations.normal} ${easings.inOut}`,
  opacity: `opacity ${durations.normal} ${easings.inOut}`,
  shadow: `box-shadow ${durations.normal} ${easings.inOut}`,
  transform: `transform ${durations.normal} ${easings.inOut}`,
  all: `all ${durations.normal} ${easings.inOut}`,
} as const

export type Durations = typeof durations
export type Easings = typeof easings
export type Transitions = typeof transitions
