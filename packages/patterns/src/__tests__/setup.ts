import "@testing-library/jest-dom"

// ResizeObserver is used by cmdk (CommandPalette) in JSDOM.
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// scrollIntoView is called by ConversationThread's auto-scroll ref.
Element.prototype.scrollIntoView = function () {}

// cmdk calls scrollIntoView when selecting items; stub it for JSDOM.
Element.prototype.scrollIntoView = function () {}

// matchMedia is called by some popover/dropdown implementations.
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

// Suppress known act() warnings from Radix roving-focus.
const originalError = console.error.bind(console)
console.error = (...args: unknown[]) => {
  const msg = typeof args[0] === "string" ? args[0] : ""
  if (msg.includes("not wrapped in act")) return
  originalError(...args)
}
