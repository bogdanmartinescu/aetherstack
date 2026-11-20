"use client"

import * as React from "react"
import { useId, useLayoutEffect, useRef, useState } from "react"
import { flushSync } from "react-dom"
import { Eye, EyeOff } from "lucide-react"
import { cn } from "@aetherstack/utils"
import { Input } from "./input"
import { Button } from "./button"

export interface PasswordFieldProps {
  label?: string
  autoComplete?: "current-password" | "new-password"
  value?: string
  defaultValue?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
  name?: string
  id?: string
  className?: string
}

function PasswordField({
  label = "Password",
  autoComplete = "current-password",
  value,
  defaultValue,
  onChange,
  disabled,
  name,
  id,
  className,
}: PasswordFieldProps) {
  const generatedId = useId()
  const statusId = useId()
  const inputId = id ?? generatedId
  const [revealed, setRevealed] = useState(false)
  const [capsLockOn, setCapsLockOn] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const syncCapsLockFromKeyboard = (
    event: KeyboardEvent | React.KeyboardEvent<HTMLInputElement>,
  ) => {
    const on = event.getModifierState("CapsLock")
    flushSync(() => setCapsLockOn(on))
  }

  useLayoutEffect(() => {
    const input = inputRef.current
    if (!input) return
    const onKey = (event: KeyboardEvent) => syncCapsLockFromKeyboard(event)
    input.addEventListener("keydown", onKey)
    input.addEventListener("keyup", onKey)
    return () => {
      input.removeEventListener("keydown", onKey)
      input.removeEventListener("keyup", onKey)
    }
  }, [])

  const inputSpread: React.ComponentProps<typeof Input> = {
    id: inputId,
    ref: inputRef,
    type: revealed ? "text" : "password",
    autoComplete,
    onKeyDown: syncCapsLockFromKeyboard,
    onKeyUp: syncCapsLockFromKeyboard,
    className: cn("border-border bg-background pr-10", className),
    ...(capsLockOn ? { "aria-describedby": statusId } : {}),
    ...(value !== undefined ? { value } : {}),
    ...(defaultValue !== undefined ? { defaultValue } : {}),
    ...(onChange !== undefined ? { onChange } : {}),
    ...(disabled !== undefined ? { disabled } : {}),
    ...(name !== undefined ? { name } : {}),
  }

  return (
    <div className="space-y-2">
      <label htmlFor={inputId} className="text-sm">
        {label}
      </label>
      <div className="relative">
        <Input {...inputSpread} />
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-muted-foreground absolute right-0 top-0 h-10"
          aria-pressed={revealed}
          aria-label={revealed ? "Hide password" : "Show password"}
          onClick={() => setRevealed((open) => !open)}
          {...(disabled !== undefined ? { disabled } : {})}
        >
          {revealed ? <EyeOff aria-hidden /> : <Eye aria-hidden />}
        </Button>
      </div>
      {capsLockOn ? (
        <p role="status" id={statusId} className="text-muted-foreground text-sm">
          Caps Lock is on
        </p>
      ) : null}
    </div>
  )
}

export { PasswordField }
