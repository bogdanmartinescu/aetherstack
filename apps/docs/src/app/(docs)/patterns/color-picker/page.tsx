"use client"

import { PatternPage } from "@/components/pattern-page"
import { ColorPickerPreview } from "./preview"

export default function ColorPickerPage() {
  return (
    <PatternPage
      name="Color Picker"
      description="A controlled hex color picker combining a native browser color input with a manual hex text field and optional preset swatches. Validates and normalises hex values on blur."
      cliInstall="npx aether-ui add color-picker"
      importCode={`import { ColorPicker, ColorSwatch } from "@aetherstack/patterns"`}
      usageCode={`import * as React from "react"
import { ColorPicker } from "@aetherstack/patterns"

const PRESETS = ["#ef4444", "#3b82f6", "#22c55e", "#eab308"]

export function MyColorPicker() {
  const [color, setColor] = React.useState("#3b82f6")
  return (
    <ColorPicker
      value={color}
      onChange={setColor}
      presets={PRESETS}
    />
  )
}`}
      preview={<ColorPickerPreview />}
      props={[
        { name: "value", type: "string", required: true, description: "Current hex color value, e.g. \"#3b82f6\"." },
        { name: "onChange", type: "(value: string) => void", required: true, description: "Called with the new hex value whenever the color changes." },
        { name: "presets", type: "string[]", description: "Optional list of hex preset swatches to render below the input." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
      a11yNotes={[
        "The color preview button opens the native <input type=\"color\"> — the native input is visually hidden but accessible.",
        "The text input has aria-label=\"Hex color value\" for screen readers.",
        "Preset swatches are grouped with role=\"group\" and each swatch carries aria-label and aria-pressed.",
        "Focus styles are preserved on the swatch buttons and text input.",
      ]}
    />
  )
}
