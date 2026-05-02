import "@testing-library/jest-dom"

// ResizeObserver is not available in JSDOM. Several Radix primitives
// (@radix-ui/react-use-size used by Slider) and cmdk depend on it.
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// cmdk calls scrollIntoView when selecting items; stub it for JSDOM.
Element.prototype.scrollIntoView = function () {}

// Embla Carousel uses window.matchMedia for responsive breakpoints. JSDOM does
// not implement it, so we stub it here with a minimal no-op implementation.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})

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
