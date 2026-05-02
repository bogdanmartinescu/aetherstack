import type { Metadata } from "next"
import { SourceCard } from "@aetherstack/ui"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "SourceCard",
  description: "Displays a cited source link with title, domain, and optional excerpt — used in AI responses with web search grounding.",
}

export default function SourceCardPage() {
  return (
    <PatternPage
      name="SourceCard"
      description="Displays a cited source link with title, domain, and optional excerpt — used in AI responses with web search grounding."
      packageName="@aetherstack/ui"
      preview={
        <div className="flex flex-col gap-2 w-full max-w-sm">
          <SourceCard
            title="React Documentation"
            url="https://react.dev"
            excerpt="The library for web and native user interfaces."
          />
          <SourceCard
            title="MDN Web Docs"
            url="https://developer.mozilla.org"
            excerpt="Resources for developers, by developers."
          />
        </div>
      }
      importCode={`import { SourceCard } from "@aetherstack/ui"`}
      usageCode={`<SourceCard
  title="React Documentation"
  url="https://react.dev"
  excerpt="The library for web and native user interfaces."
/>

{/* With favicon */}
<SourceCard
  title="MDN Web Docs"
  url="https://developer.mozilla.org"
  excerpt="Resources for developers, by developers."
  favicon="https://developer.mozilla.org/favicon.ico"
/>`}
      cliInstall="npx aether-ui add source-card"
      props={[
        {
          name: "title",
          type: "string",
          description: "Card title — typically the page title of the source.",
          required: true,
        },
        {
          name: "url",
          type: "string",
          description: "Link URL; the domain is extracted and shown below the title.",
          required: true,
        },
        {
          name: "excerpt",
          type: "string",
          description: "Short excerpt or description shown below the domain.",
        },
        {
          name: "favicon",
          type: "string",
          description: "Favicon image URL displayed beside the title.",
        },
        {
          name: "className",
          type: "string",
          description: "Additional CSS classes.",
        },
      ]}
      a11yNotes={[
        "The card is rendered as an anchor element — keyboard-navigable and operable with Enter.",
        "Favicon image has alt='favicon for <domain>' for screen readers.",
      ]}
    />
  )
}
