import type { Metadata } from "next"
import { TestimonialsSection } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Testimonials Section",
  description: "A social proof grid of customer quotes with avatar, name, and role.",
}

export default function TestimonialsSectionPage() {
  return (
    <BlockPage
      name="Testimonials Section"
      category="Marketing"
      description="A social proof grid of customer quotes with star rating, blockquote, avatar, name, and role. Supports 2 or 3 column layouts with an optional eyebrow and headline."
      cliInstall="npx aether-ui add testimonials-section"
      previewScale={0.7}
      previewHeight="460px"
      importCode={`import { TestimonialsSection } from "@aetherstack/blocks"`}
      usageCode={`import { TestimonialsSection } from "@aetherstack/blocks"

const testimonials = [
  {
    id: "1",
    quote: "Aether UI saved us weeks of work. We shipped our SaaS MVP in record time.",
    author: "Sarah Chen",
    role: "CTO",
    company: "Launchpad",
    rating: 5,
  },
]

export default function SocialProof() {
  return (
    <TestimonialsSection
      eyebrow="Testimonials"
      headline="Loved by developers"
      testimonials={testimonials}
      cols={3}
    />
  )
}`}
      preview={
        <TestimonialsSection
          eyebrow="Testimonials"
          headline="Loved by developers"
          testimonials={[
            {
              id: "1",
              quote: "Aether UI saved us weeks of work. We shipped our SaaS MVP in record time.",
              author: "Sarah Chen",
              role: "CTO",
              company: "Launchpad",
              rating: 5,
            },
            {
              id: "2",
              quote: "The token system is incredible. Dark mode just works and theming is trivial.",
              author: "Marcus Webb",
              role: "Lead Designer",
              company: "Forma",
              rating: 5,
            },
            {
              id: "3",
              quote: "Finally a component library where I actually own the code. No version lock-in.",
              author: "Priya Nair",
              role: "Frontend Engineer",
              company: "Orbit",
              rating: 5,
            },
          ]}
          cols={3}
        />
      }
      props={[
        { name: "testimonials", type: "Testimonial[]", required: true, description: "Array of testimonial objects. Each has id, quote, author, and optional role, company, avatarUrl, rating." },
        { name: "eyebrow", type: "string", description: "Small uppercase label above the headline." },
        { name: "headline", type: "string", description: "Section heading." },
        { name: "cols", type: "2 | 3", default: "3", description: "Grid column count." },
        { name: "className", type: "string", description: "Additional classes on the section wrapper." },
      ]}
      a11yNotes={[
        "Each quote is wrapped in a <blockquote> element.",
        "Star ratings include an aria-label with the numeric score.",
        "Avatar images include an alt attribute set to the author name.",
      ]}
    />
  )
}
