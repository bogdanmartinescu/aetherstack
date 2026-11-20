"use client"

export interface TimelineScrubberProps {
  label: string
  min: number
  max: number
  step?: number
  value: number
  onValueChange: (value: number) => void
  className?: string
}

export function TimelineScrubber({
  label,
  min,
  max,
  step,
  value,
  onValueChange,
  className,
}: TimelineScrubberProps) {
  const stepValue = step ?? 1

  return (
    <div {...(className !== undefined ? { className } : {})}>
      <span className="text-sm text-muted-foreground">{value}</span>
      <input
        type="range"
        role="slider"
        aria-label={label}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        min={min}
        max={max}
        step={stepValue}
        value={value}
        onChange={(event) => onValueChange(Number(event.target.value))}
        className="w-full"
      />
    </div>
  )
}