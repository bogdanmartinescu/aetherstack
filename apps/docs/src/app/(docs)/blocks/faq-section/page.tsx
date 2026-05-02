import type { Metadata } from "next"
import { FAQSection } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "FAQ Section",
  description: "An FAQ accordion section with section header and collapsible answers.",
}

export default function FAQSectionPage() {
  return (
    <BlockPage
      name="FAQ Section"
      category="Marketing"
      description="An FAQ accordion section with optional eyebrow, headline, and subheading. When a heading is provided, the layout splits into a two-column grid on large screens. Without a heading, the accordion is centred and constrained."
      cliInstall="npx aether-ui add faq-section"
      previewScale={0.75}
      previewHeight="480px"
      importCode={`import { FAQSection } from "@aetherstack/blocks"`}
      usageCode={`import { FAQSection } from "@aetherstack/blocks"

const items = [
  {
    id: "q1",
    question: "Is Aether UI free to use?",
    answer: "Yes. The core library is open-source and free forever. A Pro tier is coming for advanced components.",
  },
  {
    id: "q2",
    question: "Do I need to credit Aether UI?",
    answer: "No attribution is required, but it's appreciated.",
  },
]

export default function FAQPage() {
  return (
    <FAQSection
      eyebrow="FAQ"
      headline="Frequently asked questions"
      subheading="Everything you need to know about Aether UI."
      items={items}
    />
  )
}`}
      preview={
        <FAQSection
          eyebrow="FAQ"
          headline="Frequently asked questions"
          subheading="Can't find the answer you're looking for? Reach out to our team."
          items={[
            { id: "q1", question: "Is Aether UI free to use?", answer: "Yes. The core library is open-source and free forever under the MIT license. A Pro tier with premium components is planned for the future." },
            { id: "q2", question: "How do I install components?", answer: "Use the CLI: npx aether-ui add <component-name>. This copies the component source directly into your project." },
            { id: "q3", question: "Does it work with Next.js App Router?", answer: "Yes. All components are compatible with React Server Components and the Next.js App Router. Client components are marked with 'use client' at their boundaries." },
            { id: "q4", question: "Can I customise the design tokens?", answer: "Absolutely. All visual values are CSS custom properties defined in your global CSS. Override any token to match your brand without forking the components." },
          ]}
        />
      }
      props={[
        { name: "items", type: "{ id: string; question: string; answer: string }[]", required: true, description: "Array of FAQ items." },
        { name: "eyebrow", type: "string", description: "Small uppercase label above the headline." },
        { name: "headline", type: "string", description: "Section heading. When provided, activates the two-column layout." },
        { name: "subheading", type: "string", description: "Supporting paragraph below the headline." },
        { name: "className", type: "string", description: "Additional classes on the section wrapper." },
      ]}
      a11yNotes={[
        "Built on the Aether UI Accordion which uses Radix UI — keyboard-navigable with arrow keys.",
        "Each question is an <h3>-level button; the answer is associated via aria-controls.",
        "Expanded state is communicated via aria-expanded.",
      ]}
    />
  )
}
