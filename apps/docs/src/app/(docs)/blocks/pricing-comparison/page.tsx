import type { Metadata } from "next"
import { PricingComparison } from "@aetherstack/blocks"
import { BlockPage } from "@/components/block-page"

export const metadata: Metadata = {
  title: "Pricing Comparison",
  description: "A feature comparison table across pricing tiers with checkmarks and highlighted column.",
}

const TIERS = [
  { id: "free", name: "Free", price: "$0", period: "mo", cta: { label: "Get started", href: "#" } },
  { id: "pro", name: "Pro", price: "$29", period: "mo", highlight: true, cta: { label: "Start trial", href: "#" } },
  { id: "enterprise", name: "Enterprise", price: "$99", period: "mo", cta: { label: "Contact sales", href: "#" } },
]

const FEATURES = [
  { category: "Core", label: "Projects", tiers: { free: "3", pro: "Unlimited", enterprise: "Unlimited" } },
  { category: "Core", label: "Team members", tiers: { free: "1", pro: "10", enterprise: "Unlimited" } },
  { category: "Core", label: "Custom domain", tiers: { free: false, pro: true, enterprise: true } },
  { category: "Analytics", label: "Basic analytics", tiers: { free: true, pro: true, enterprise: true } },
  { category: "Analytics", label: "Advanced analytics", tiers: { free: false, pro: false, enterprise: true } },
  { category: "Support", label: "Priority support", tiers: { free: false, pro: true, enterprise: true } },
]

export default function PricingComparisonPage() {
  return (
    <BlockPage
      name="Pricing Comparison"
      category="User & content"
      description="A feature comparison table across pricing tiers. Features can be grouped by category. Boolean values render as check or dash icons. String values render inline. The highlighted tier receives an accent border."
      cliInstall="npx aether-ui add pricing-comparison"
      previewScale={0.8}
      previewHeight="500px"
      importCode={`import { PricingComparison } from "@aetherstack/blocks"
import type { ComparisonTier, ComparisonFeature } from "@aetherstack/blocks"`}
      usageCode={`import { PricingComparison } from "@aetherstack/blocks"

const tiers = [
  { id: "free", name: "Free", price: "$0", period: "mo", cta: { label: "Get started", href: "/signup" } },
  { id: "pro", name: "Pro", price: "$29", period: "mo", highlight: true, cta: { label: "Start trial", href: "/signup/pro" } },
]

const features = [
  { category: "Core", label: "Projects", tiers: { free: "3", pro: "Unlimited" } },
  { category: "Core", label: "Custom domain", tiers: { free: false, pro: true } },
]

export default function ComparisonPage() {
  return <PricingComparison tiers={tiers} features={features} />
}`}
      preview={<PricingComparison tiers={TIERS} features={FEATURES} />}
      props={[
        { name: "tiers", type: "ComparisonTier[]", required: true, description: "Tier columns. Each has id, name, and optional price, period, highlight, and cta." },
        { name: "features", type: "ComparisonFeature[]", required: true, description: "Feature rows. Each has label, optional category, and a tiers map (boolean | string | ReactNode per tier id)." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
      a11yNotes={[
        "Boolean true renders a Check icon with aria-label='Included'.",
        "Boolean false renders a Minus icon with aria-label='Not included'.",
        "The table uses semantic <table>, <thead>, <tbody>, <th>, and <td> elements.",
      ]}
    />
  )
}
