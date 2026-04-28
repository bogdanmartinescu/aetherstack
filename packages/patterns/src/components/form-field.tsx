"use client"

import * as React from "react"
import { Label } from "@aetherstack/ui"
import { cn } from "@aetherstack/utils"

// ── Context ──────────────────────────────────────────────────────────────────

interface FormFieldContextValue {
  id: string
  name: string | undefined
  error: string | undefined
  required: boolean | undefined
}

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null)

export function useFormField() {
  const ctx = React.useContext(FormFieldContext)
  if (!ctx) throw new Error("useFormField must be used within a FormField")
  return {
    id: ctx.id,
    name: ctx.name,
    labelId: `${ctx.id}-label`,
    descriptionId: `${ctx.id}-description`,
    messageId: `${ctx.id}-message`,
    error: ctx.error,
    required: ctx.required,
  }
}

// ── FormField ─────────────────────────────────────────────────────────────────

export interface FormFieldProps {
  /** Explicit id. Auto-generated from name if omitted. */
  id?: string
  name?: string
  error?: string
  required?: boolean
  className?: string
  children: React.ReactNode
}

export function FormField({
  id: explicitId,
  name,
  error,
  required,
  className,
  children,
}: FormFieldProps) {
  const generatedId = React.useId()
  const id = explicitId ?? (name ? `field-${name}` : generatedId)

  return (
    <FormFieldContext.Provider value={{ id, name, error, required }}>
      <div className={cn("space-y-1.5", className)}>{children}</div>
    </FormFieldContext.Provider>
  )
}

// ── FormLabel ─────────────────────────────────────────────────────────────────

export interface FormLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {}

export const FormLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  FormLabelProps
>(({ className, children, ...props }, ref) => {
  const { id, error, required } = useFormField()
  return (
    <Label
      ref={ref}
      htmlFor={id}
      className={cn(error && "text-destructive", className)}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-0.5 text-destructive" aria-hidden="true">
          *
        </span>
      )}
    </Label>
  )
})
FormLabel.displayName = "FormLabel"

// ── FormControl ───────────────────────────────────────────────────────────────

export interface FormControlProps {
  children: React.ReactElement
}

export function FormControl({ children }: FormControlProps) {
  const { id, error, descriptionId, messageId } = useFormField()
  return React.cloneElement(children, {
    id,
    "aria-describedby": [descriptionId, error ? messageId : undefined]
      .filter(Boolean)
      .join(" ") || undefined,
    "aria-invalid": error ? true : undefined,
  } as React.HTMLAttributes<HTMLElement>)
}

// ── FormDescription ───────────────────────────────────────────────────────────

export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  FormDescriptionProps
>(({ className, ...props }, ref) => {
  const { descriptionId } = useFormField()
  return (
    <p
      ref={ref}
      id={descriptionId}
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
})
FormDescription.displayName = "FormDescription"

// ── FormMessage ───────────────────────────────────────────────────────────────

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

export const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  FormMessageProps
>(({ className, children, ...props }, ref) => {
  const { error, messageId } = useFormField()
  const body = error ?? children
  if (!body) return null
  return (
    <p
      ref={ref}
      id={messageId}
      role="alert"
      className={cn("text-xs font-medium text-destructive", className)}
      {...props}
    >
      {body}
    </p>
  )
})
FormMessage.displayName = "FormMessage"
