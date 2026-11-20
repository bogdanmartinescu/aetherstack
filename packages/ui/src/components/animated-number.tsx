import { cn } from "@aetherstack/utils"

const DEFAULT_FORMAT: Intl.NumberFormatOptions = { maximumFractionDigits: 0 }

export interface AnimatedNumberProps {
  value: number
  format?: Intl.NumberFormatOptions
  locale?: string
  className?: string
}

export function AnimatedNumber({ value, format, locale, className }: AnimatedNumberProps) {
  const formatOptions = format ?? DEFAULT_FORMAT
  const resolvedLocale = locale ?? "en-US"
  const text = new Intl.NumberFormat(resolvedLocale, formatOptions).format(value)

  if (className !== undefined) {
    return <span className={cn(className)}>{text}</span>
  }

  return <span>{text}</span>
}