"use client"

import * as React from "react"
import { cn } from "@aetherstack/utils"
import { Input } from "@aetherstack/ui"

// ── ColorSwatch ───────────────────────────────────────────────────────────────

export interface ColorSwatchProps {
  color: string
  selected?: boolean
  onClick?: () => void
  className?: string
}

export function ColorSwatch({ color, selected, onClick, className }: ColorSwatchProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={color}
      aria-label={`Select color ${color}`}
      aria-pressed={selected}
      className={cn(
        "h-7 w-7 rounded-md border-2 cursor-pointer transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
        selected
          ? "border-primary ring-2 ring-primary ring-offset-1"
          : "border-border hover:scale-110",
        className,
      )}
      style={{ backgroundColor: color }}
    />
  )
}

// ── ColorPicker ───────────────────────────────────────────────────────────────

export interface ColorPickerProps {
  value: string
  onChange: (value: string) => void
  presets?: string[]
  className?: string
}

function normalizeHex(raw: string): string {
  const v = raw.startsWith("#") ? raw : `#${raw}`
  return v
}

function isValidHex(value: string): boolean {
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)
}

export function ColorPicker({ value, onChange, presets, className }: ColorPickerProps) {
  const nativeInputRef = React.useRef<HTMLInputElement>(null)
  const [inputText, setInputText] = React.useState(value)

  // Sync internal text when value changes from outside
  React.useEffect(() => {
    setInputText(value)
  }, [value])

  function handleNativeChange(e: React.ChangeEvent<HTMLInputElement>) {
    const normalized = normalizeHex(e.target.value)
    setInputText(normalized)
    onChange(normalized)
  }

  function handleTextChange(e: React.ChangeEvent<HTMLInputElement>) {
    const raw = e.target.value
    setInputText(raw)
    const normalized = normalizeHex(raw)
    if (isValidHex(normalized)) {
      onChange(normalized)
    }
  }

  function handleTextBlur() {
    const normalized = normalizeHex(inputText)
    if (!isValidHex(normalized)) {
      // Revert to last valid value
      setInputText(value)
    }
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {/* Preview + native color input trigger */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => nativeInputRef.current?.click()}
          className="relative h-9 w-9 rounded-md border-2 border-border shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 hover:border-primary/50 transition-colors cursor-pointer"
          style={{ backgroundColor: isValidHex(normalizeHex(inputText)) ? normalizeHex(inputText) : value }}
          title="Open color picker"
          aria-label="Open native color picker"
        >
          <input
            ref={nativeInputRef}
            type="color"
            value={isValidHex(normalizeHex(inputText)) ? normalizeHex(inputText) : value}
            onChange={handleNativeChange}
            className="sr-only"
            tabIndex={-1}
            aria-hidden="true"
          />
        </button>

        <Input
          value={inputText}
          onChange={handleTextChange}
          onBlur={handleTextBlur}
          placeholder="#000000"
          className="font-mono uppercase"
          aria-label="Hex color value"
          maxLength={7}
        />
      </div>

      {/* Preset swatches */}
      {presets && presets.length > 0 && (
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Preset colors">
          {presets.map((preset) => (
            <ColorSwatch
              key={preset}
              color={preset}
              selected={normalizeHex(inputText).toLowerCase() === preset.toLowerCase()}
              onClick={() => {
                setInputText(preset)
                onChange(preset)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
