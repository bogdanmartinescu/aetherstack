"use client"

import { cn } from "@aetherstack/utils"
import { Button } from "./button"

const LOWER = "abcdefghijkmnopqrstuvwxyz"
const UPPER = "ABCDEFGHJKLMNPQRSTUVWXYZ"
const DIGITS = "23456789"
const SYMBOLS = "!@#$%*"
const ALL = LOWER + UPPER + DIGITS + SYMBOLS

const RULES = [
  { key: "length" as const, label: "At least 8 characters" },
  { key: "lowercase" as const, label: "Lowercase letter" },
  { key: "uppercase" as const, label: "Uppercase letter" },
  { key: "number" as const, label: "Number" },
  { key: "symbol" as const, label: "Symbol" },
]

const SCORE_LABELS = ["Empty", "Weak", "Fair", "Good", "Strong"] as const

export interface PasswordCheckResult {
  length: boolean
  lowercase: boolean
  uppercase: boolean
  number: boolean
  symbol: boolean
}

function countCharacterClasses(password: string): number {
  let classes = 0
  if (/[a-z]/.test(password)) classes++
  if (/[A-Z]/.test(password)) classes++
  if (/[0-9]/.test(password)) classes++
  if (/[^A-Za-z0-9]/.test(password)) classes++
  return classes
}

export function scorePassword(password: string): number {
  if (password.length === 0) return 0
  if (password.length < 8) return 1

  const classes = countCharacterClasses(password)
  if (classes < 3) return 2
  if (password.length >= 12 && classes === 4) return 4
  return 3
}

export function checkPassword(password: string): PasswordCheckResult {
  return {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    number: /[0-9]/.test(password),
    symbol: /[^A-Za-z0-9]/.test(password),
  }
}

function pick(set: string, random: () => number): string {
  return set[Math.min(set.length - 1, Math.floor(random() * set.length))]!
}

function fisherYatesShuffle(chars: string[], random: () => number): void {
  for (let i = chars.length - 1; i > 0; i--) {
    const j = Math.min(i, Math.floor(random() * (i + 1)))
    const tmp = chars[i]!
    chars[i] = chars[j]!
    chars[j] = tmp
  }
}

export function generatePassword(length = 16, random: () => number = Math.random): string {
  const requiredSets = [LOWER, UPPER, DIGITS, SYMBOLS]
  const takeRequired = Math.min(length, requiredSets.length)
  const chars: string[] = []

  for (let i = 0; i < takeRequired; i++) {
    chars.push(pick(requiredSets[i]!, random))
  }

  while (chars.length < length) {
    chars.push(pick(ALL, random))
  }

  fisherYatesShuffle(chars, random)
  return chars.join("")
}

export interface PasswordStrengthProps {
  password: string
  onPasswordChange?: (next: string) => void
}

const METER_FILL: Record<number, string> = {
  0: "w-0 bg-muted",
  1: "w-1/4 bg-destructive",
  2: "w-2/4 bg-muted-foreground",
  3: "w-3/4 bg-primary",
  4: "w-full bg-primary",
}

function PasswordStrength({ password, onPasswordChange }: PasswordStrengthProps) {
  const score = scorePassword(password)
  const checks = checkPassword(password)

  return (
    <div className="flex flex-col gap-3">
      <div
        role="meter"
        aria-valuemin={0}
        aria-valuemax={4}
        aria-valuenow={score}
        aria-valuetext={SCORE_LABELS[score]}
        className="bg-secondary h-2 w-full overflow-hidden rounded-full"
      >
        <div
          className={cn(
            "h-full rounded-full transition-all duration-300 ease-out motion-reduce:transition-none",
            METER_FILL[score],
          )}
        />
      </div>

      <ul className="text-muted-foreground space-y-1 text-sm">
        {RULES.map((rule) => (
          <li
            key={rule.key}
            data-met={checks[rule.key] ? "true" : "false"}
            className={cn(checks[rule.key] && "text-foreground")}
          >
            {rule.label}
          </li>
        ))}
      </ul>

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="self-start"
        onClick={() => {
          onPasswordChange?.(generatePassword())
        }}
      >
        Generate password
      </Button>
    </div>
  )
}

export { PasswordStrength }
