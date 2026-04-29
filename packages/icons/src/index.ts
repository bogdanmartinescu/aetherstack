/**
 * @aetherstack/icons
 *
 * Re-exports the lucide-react icon set (Aether UI's default open-source set)
 * alongside a small library of custom Aether-branded icons used by docs,
 * studio, and Pro UI surfaces.
 *
 * Usage:
 *   import { ChevronDown, Settings, AetherMark, AetherSpark } from "@aetherstack/icons"
 */

export * from "lucide-react"

export { AetherMark, AetherGlyph, AetherSpark, AetherStack } from "./aether"
export type { IconProps } from "./aether"
