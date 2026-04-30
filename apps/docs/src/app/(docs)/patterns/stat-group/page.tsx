import type { Metadata } from "next"
import { StatGroup, StatItem } from "@aetherstack/patterns"
import { Users, DollarSign, TrendingUp, ShoppingCart } from "lucide-react"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Stat Group",
  description: "Responsive grid of stat cards with labels, values, delta indicators, and icons.",
}

export default function StatGroupPage() {
  return (
    <PatternPage
      name="Stat Group"
      description="A responsive grid of stat cards for dashboard overviews. Each StatItem shows a label, primary value, optional percentage delta (green/red), and an icon slot."
      cliInstall="npx aether-ui add stat-group"
      importCode={`import { StatGroup, StatItem } from "@aetherstack/patterns"`}
      usageCode={`import { StatGroup, StatItem } from "@aetherstack/patterns"
import { Users, DollarSign, TrendingUp } from "lucide-react"

<StatGroup cols={3}>
  <StatItem
    label="Total Revenue"
    value="$45,231"
    delta={20.1}
    icon={<DollarSign className="h-5 w-5" />}
  />
  <StatItem
    label="Active Users"
    value="2,350"
    delta={-4.3}
    icon={<Users className="h-5 w-5" />}
  />
  <StatItem
    label="Conversion Rate"
    value="3.24%"
    delta={1.1}
    icon={<TrendingUp className="h-5 w-5" />}
  />
</StatGroup>`}
      preview={
        <div className="w-full">
          <StatGroup cols={4}>
            <StatItem
              label="Total Revenue"
              value="$45,231"
              delta={20.1}
              icon={<DollarSign className="h-5 w-5" />}
            />
            <StatItem
              label="Active Users"
              value="2,350"
              delta={-4.3}
              icon={<Users className="h-5 w-5" />}
            />
            <StatItem
              label="Conversion Rate"
              value="3.24%"
              delta={1.1}
              icon={<TrendingUp className="h-5 w-5" />}
            />
            <StatItem
              label="Orders"
              value="1,429"
              icon={<ShoppingCart className="h-5 w-5" />}
            />
          </StatGroup>
        </div>
      }
      props={[
        { name: "cols", type: "2 | 3 | 4", default: "3", description: "Number of columns in the responsive grid." },
        { name: "children", type: "ReactNode", required: true, description: "StatItem components to render in the grid." },
        { name: "className", type: "string", description: "Additional classes on the grid wrapper." },
      ]}
      a11yNotes={[
        "StatItem renders a plain div — no interactive role. Values and labels are plain text, readable by screen readers in document order.",
        "Delta indicators use colour alone to distinguish positive/negative; add a visually-hidden label (e.g. \"up\"/\"down\") for colour-blind users if needed.",
        "Icon containers are decorative and can be aria-hidden.",
      ]}
    />
  )
}
