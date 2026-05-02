import type { Metadata } from "next"
import { CTASection } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "CTA Section",
  description: "A full-width call-to-action banner with heading, subtext, and button.",
}

export default function CTASectionPage() {
  return (
    <BlockPage
      name="CTA Section"
      category="Marketing"
      description="A full-width call-to-action banner with headline, subheading, and primary and secondary CTA buttons. Three variants: default (bordered), muted (grey background), and primary (brand-coloured)."
      cliInstall="npx aether-ui add cta-section"
      previewScale={0.75}
      previewHeight="540px"
      importCode={`import { CTASection } from "@aetherstack/blocks"`}
      usageCode={`import { CTASection } from "@aetherstack/blocks"

export default function CTAPage() {
  return (
    <CTASection
      headline="Start building today"
      subheading="Free forever. No credit card required."
      primaryCta={{ label: "Get started", href: "/signup" }}
      secondaryCta={{ label: "Learn more", href: "/docs" }}
      variant="primary"
    />
  )
}`}
      preview={
        <div className="space-y-0">
          <CTASection
            headline="Start building today"
            subheading="Free forever. No credit card required."
            primaryCta={{ label: "Get started", href: "#" }}
            secondaryCta={{ label: "Learn more", href: "#" }}
            variant="default"
          />
          <CTASection
            headline="Ready to level up?"
            subheading="Join thousands of developers already using Aether UI."
            primaryCta={{ label: "Get started free", href: "#" }}
            variant="muted"
          />
          <CTASection
            headline="Ship your next project faster"
            subheading="Token-driven components, open-code, zero lock-in."
            primaryCta={{ label: "Get started", href: "#" }}
            secondaryCta={{ label: "View docs", href: "#" }}
            variant="primary"
          />
        </div>
      }
      props={[
        { name: "headline", type: "string", required: true, description: "Section heading text." },
        { name: "subheading", type: "string", description: "Supporting paragraph below the headline." },
        { name: "primaryCta", type: "{ label: string; href: string }", description: "Primary action button." },
        { name: "secondaryCta", type: "{ label: string; href: string }", description: "Secondary action button." },
        { name: "variant", type: "'default' | 'muted' | 'primary'", default: "'default'", description: "Visual style. default = bordered, muted = grey bg, primary = brand colour." },
        { name: "className", type: "string", description: "Additional classes on the section wrapper." },
      ]}
      a11yNotes={[
        "Uses semantic <section> element.",
        "CTA links use <a> via Button asChild — include descriptive link text.",
        "In the primary variant, text colours automatically invert for contrast.",
      ]}
    />
  )
}
