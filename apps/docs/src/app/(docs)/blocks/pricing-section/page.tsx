import type { Metadata } from "next"
import { PricingSection } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Pricing Section",
  description: "Responsive 3-tier pricing grid with feature lists, highlighted plan, and CTA buttons.",
}

const TIERS = [
  {
    name: "Starter",
    price: "$0",
    period: "month",
    description: "For individuals and small side projects.",
    cta: "Get started free",
    features: [
      { text: "3 projects", included: true },
      { text: "1 team member", included: true },
      { text: "Community support", included: true },
      { text: "Custom domain", included: false },
      { text: "Analytics", included: false },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "month",
    description: "For growing teams that need more power.",
    cta: "Start free trial",
    highlighted: true,
    badge: "Most popular",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "10 team members", included: true },
      { text: "Email support", included: true },
      { text: "Custom domain", included: true },
      { text: "Analytics", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Enterprise",
    price: "$99",
    period: "month",
    description: "For organisations with advanced needs.",
    cta: "Contact sales",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Unlimited members", included: true },
      { text: "24/7 support", included: true },
      { text: "Custom domain", included: true },
      { text: "Advanced analytics", included: true },
      { text: "Priority support", included: true },
    ],
  },
]

export default function PricingSectionPage() {
  return (
    <BlockPage
      name="Pricing Section"
      category="Marketing"
      description="A responsive 3-tier pricing grid with feature lists, check/cross icons, an optional highlighted plan with a badge, and CTA buttons. Fully customisable via the tiers prop."
      cliInstall="npx aether-ui add pricing-section"
      previewScale={0.75}
      previewHeight="520px"
      importCode={`import { PricingSection } from "@aetherstack/blocks"
import type { PricingTier } from "@aetherstack/blocks"`}
      usageCode={`import { PricingSection } from "@aetherstack/blocks"

const tiers = [
  {
    name: "Free",
    price: "$0",
    period: "month",
    cta: "Get started",
    features: [
      { text: "3 projects", included: true },
      { text: "Priority support", included: false },
    ],
  },
  {
    name: "Pro",
    price: "$29",
    period: "month",
    cta: "Start trial",
    highlighted: true,
    badge: "Most popular",
    features: [
      { text: "Unlimited projects", included: true },
      { text: "Priority support", included: true },
    ],
  },
]

export default function PricingPage() {
  return (
    <PricingSection
      title="Simple, transparent pricing"
      description="Start free. Scale as you grow."
      tiers={tiers}
    />
  )
}`}
      preview={
        <PricingSection
          title="Simple, transparent pricing"
          description="Start free. Scale as you grow. No hidden fees."
          tiers={TIERS}
        />
      }
      props={[
        { name: "tiers", type: "PricingTier[]", required: true, description: "Array of pricing tiers. Each has name, price, period, description, features, cta, and optional highlighted/badge." },
        { name: "title", type: "string", description: "Section heading." },
        { name: "description", type: "string", description: "Supporting description below the heading." },
        { name: "className", type: "string", description: "Additional classes on the section wrapper." },
      ]}
      a11yNotes={[
        "Each tier is rendered as an <article> so screen readers can navigate between them.",
        "Feature check/cross icons are aria-hidden; the text itself conveys inclusion.",
        "The highlighted tier is visually emphasised but not given special ARIA importance — all tiers are announced equally.",
      ]}
    />
  )
}
