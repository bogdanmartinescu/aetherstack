import type { Metadata } from "next"
import { PatternPage } from "@/components/pattern-page"
import { SignupFormPreview } from "./preview"

export const metadata: Metadata = {
  title: "Sign Up Form",
  description: "User registration form with password strength meter and confirmation, validated with react-hook-form and Zod.",
}

const IMPORT_CODE = `import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button, Input, Label, Checkbox } from "@aetherstack/ui"`

const USAGE_CODE = `const schema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z
      .string()
      .min(8, "At least 8 characters")
      .regex(/[A-Z]/, "Must contain one uppercase letter")
      .regex(/[0-9]/, "Must contain one number"),
    confirmPassword: z.string(),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms" }),
    }),
  })
  .refine((d) => d.password === d.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  })

export function SignupForm() {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } =
    useForm({ resolver: zodResolver(schema) })

  const password = watch("password", "")

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <Label htmlFor="name">Full name</Label>
      <Input id="name" {...register("name")} />
      {errors.name && <p>{errors.name.message}</p>}

      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" {...register("email")} />
      {errors.email && <p>{errors.email.message}</p>}

      <Label htmlFor="password">Password</Label>
      <Input id="password" type="password" {...register("password")} />
      <PasswordStrength value={password} />

      <Label htmlFor="confirmPassword">Confirm password</Label>
      <Input id="confirmPassword" type="password" {...register("confirmPassword")} />
      {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

      <Checkbox id="terms" {...register("terms")} />
      <Label htmlFor="terms">I agree to the Terms</Label>
      {errors.terms && <p>{errors.terms.message}</p>}

      <Button type="submit" disabled={isSubmitting}>Create account</Button>
    </form>
  )
}`

export default function SignupFormPage() {
  return (
    <PatternPage
      name="Sign Up Form"
      description="Registration form with name, email, password with live strength meter, password confirmation, and a required terms checkbox. Cross-field validation with Zod's .refine() ensures both passwords match before submission."
      preview={<SignupFormPreview />}
      importCode={IMPORT_CODE}
      usageCode={USAGE_CODE}
      props={[
        {
          name: "schema (Zod .refine)",
          type: "ZodEffects",
          description: "Cross-field refine validates that password and confirmPassword are equal. The error is attached to the confirmPassword field path.",
        },
        {
          name: "watch",
          type: "UseFormWatch<FormValues>",
          description: "Subscribes to the password field value in real time — powers the PasswordStrength indicator without triggering full re-validation.",
        },
        {
          name: "PasswordStrength",
          type: "({ value: string }) => ReactNode",
          description: "Visual bar that scores the password by length, uppercase, digit, and special character rules. Score ranges from 0–4.",
        },
        {
          name: "terms (z.literal(true))",
          type: "boolean",
          description: "Using z.literal(true) means the checkbox must be explicitly checked — an unchecked false value fails validation with a custom error message.",
        },
      ]}
      a11yNotes={[
        "All inputs are associated with explicit labels via htmlFor/id.",
        "aria-invalid is set on inputs with active validation errors.",
        "Error messages are placed directly below their input for correct reading order.",
        "The password strength bar is a visual aid only — strength text is also rendered as plain text for screen readers.",
        "The terms checkbox error is indented to align visually with its label.",
      ]}
      cliInstall="pnpm add react-hook-form zod @hookform/resolvers"
    />
  )
}
