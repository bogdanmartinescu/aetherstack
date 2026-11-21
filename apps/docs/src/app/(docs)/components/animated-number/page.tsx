import { AnimatedNumber } from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"
import { ANIMATED_NUMBER_SOURCE } from "@/lib/registry-source"

export default function AnimatedNumberPage() {
  return (
    <ComponentPage
      name="Animated Number"
      description="A formatted number for money, percents, and live metrics."
      features={["Intl.NumberFormat", "Currency and percent presets", "Locale override"]}
      preview={
        <AnimatedNumber
          value={48210}
          format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
        />
      }
      previewCode={`import { AnimatedNumber } from "@/components/ui/animated-number"

<AnimatedNumber
  value={48210}
  format={{ style: "currency", currency: "USD", maximumFractionDigits: 0 }}
/>`}
      cliInstall="npx @aetherstack/cli add animated-number"
      manualInstallCode={ANIMATED_NUMBER_SOURCE}
      examples={[]}
      props={[
        { name: "value", type: "number", default: "—", description: "Numeric value to format." },
        {
          name: "format",
          type: "Intl.NumberFormatOptions",
          default: "{ maximumFractionDigits: 0 }",
          description: "Passed to Intl.NumberFormat.",
        },
        { name: "locale", type: "string", default: '"en-US"', description: "BCP 47 locale tag." },
        {
          name: "className",
          type: "string",
          default: "—",
          description: "Optional class on the root span.",
        },
      ]}
      a11yNotes={["The visible text is the full formatted value; no duplicate hidden copy."]}
    />
  )
}
