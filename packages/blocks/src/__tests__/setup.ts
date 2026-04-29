import "@testing-library/jest-dom"

if (typeof globalThis.ResizeObserver === "undefined") {
  globalThis.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof ResizeObserver
}

if (typeof globalThis.PointerEvent === "undefined") {
  globalThis.PointerEvent = class extends Event {} as unknown as typeof PointerEvent
}

if (!Element.prototype.hasPointerCapture) {
  Element.prototype.hasPointerCapture = () => false
}
if (!Element.prototype.releasePointerCapture) {
  Element.prototype.releasePointerCapture = () => {}
}
if (!Element.prototype.scrollIntoView) {
  Element.prototype.scrollIntoView = () => {}
}

const originalError = console.error.bind(console)
console.error = (...args: unknown[]) => {
  const msg = typeof args[0] === "string" ? args[0] : ""
  if (msg.includes("not wrapped in act")) return
  originalError(...args)
}
