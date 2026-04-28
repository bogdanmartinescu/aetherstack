"use client"

import { useState } from "react"
import {
  FormField,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@aetherstack/patterns"
import { Input, Button } from "@aetherstack/ui"

export function FormFieldPreview() {
  const [email, setEmail] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const error = submitted && !email.includes("@") ? "Enter a valid email address." : undefined

  return (
    <form
      className="w-full max-w-sm space-y-4"
      onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}
    >
      <FormField name="email" error={error} required>
        <FormLabel>Email address</FormLabel>
        <FormControl>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setSubmitted(false) }}
          />
        </FormControl>
        <FormDescription>We&apos;ll send a confirmation to this address.</FormDescription>
        <FormMessage />
      </FormField>

      <FormField name="name">
        <FormLabel>Full name</FormLabel>
        <FormControl>
          <Input placeholder="Jane Smith" />
        </FormControl>
      </FormField>

      <Button type="submit" className="w-full">Submit</Button>
    </form>
  )
}
