import type { Metadata } from "next"
import { WaitlistBlock } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Waitlist Block",
  description: "An email waitlist signup with a success state after submission.",
}

export default function WaitlistBlockPage() {
  return (
    <BlockPage
      name="Waitlist Block"
      category="User & content"
      description="An email waitlist signup section with headline, subheading, email input, and submit button. Shows a success confirmation after submission. Handles loading state and error messages."
      cliInstall="npx aether-ui add waitlist-block"
      previewHeight="320px"
      importCode={`import { WaitlistBlock } from "@aetherstack/blocks"`}
      usageCode={`import { WaitlistBlock } from "@aetherstack/blocks"

export default function WaitlistPage() {
  async function handleSubmit(email: string) {
    await fetch("/api/waitlist", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: { "Content-Type": "application/json" },
    })
  }

  return (
    <WaitlistBlock
      headline="Be the first to know"
      subheading="We're launching soon. Join the waitlist to get early access."
      ctaLabel="Join waitlist"
      onSubmit={handleSubmit}
      successMessage="You're on the list! We'll be in touch soon."
    />
  )
}`}
      preview={
        <WaitlistBlock
          headline="Be the first to know"
          subheading="We're launching soon. Join the waitlist for early access and exclusive updates."
          ctaLabel="Join waitlist"
          successMessage="You're on the list! We'll be in touch soon."
        />
      }
      props={[
        { name: "headline", type: "string", default: "'Join the waitlist'", description: "Section heading." },
        { name: "subheading", type: "string", description: "Supporting paragraph below the headline." },
        { name: "placeholder", type: "string", default: "'Enter your email address'", description: "Email input placeholder text." },
        { name: "ctaLabel", type: "string", default: "'Get early access'", description: "Submit button label." },
        { name: "onSubmit", type: "(email: string) => Promise<void>", description: "Async callback called with the submitted email. Throwing triggers the error state." },
        { name: "successMessage", type: "string", default: "'You're on the list!'", description: "Message shown after successful submission." },
        { name: "className", type: "string", description: "Additional classes on the section wrapper." },
      ]}
      a11yNotes={[
        "Email input has type='email' and aria-label='Email address'.",
        "Error messages use role='alert' for immediate screen reader announcement.",
        "The loading spinner is aria-hidden; the button text remains visible.",
      ]}
    />
  )
}
