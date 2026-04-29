/**
 * @aetherstack/blocks
 *
 * Installable full-section layouts built on patterns + primitives.
 * Install via the CLI: npx aether-ui add <block-name>
 */

// Shells
export { DashboardShell } from "./components/dashboard-shell"
export type {
  DashboardShellProps,
  DashboardNavItem,
  DashboardNavGroup,
} from "./components/dashboard-shell"

// Auth pages
export { LoginBlock } from "./components/login-block"
export type { LoginBlockProps } from "./components/login-block"

export { SignupBlock } from "./components/signup-block"
export type { SignupBlockProps } from "./components/signup-block"
