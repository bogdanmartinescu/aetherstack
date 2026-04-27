import "@testing-library/jest-dom"

// Suppress known Radix UI + JSDOM false-positive act() warnings.
// Radix's roving-focus (RadioGroup, Tabs) schedules state updates inside
// keyboard event handlers. JSDOM doesn't run requestAnimationFrame so those
// updates land outside React's act() boundary.
// React uses console.error("Warning: An update to %s inside a test...", "ForwardRef")
// — the component name is a second argument, not interpolated into arg[0].
const originalError = console.error.bind(console)
console.error = (...args: unknown[]) => {
  const msg = typeof args[0] === "string" ? args[0] : ""
  if (msg.includes("not wrapped in act")) return
  originalError(...args)
}
