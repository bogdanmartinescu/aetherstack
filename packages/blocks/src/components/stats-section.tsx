import { cn } from "@aetherstack/utils"

export interface Stat {
  value: string
  label: string
  description?: string
}

export interface StatsSectionProps {
  stats: Stat[]
  cols?: 2 | 3 | 4
  className?: string
}

const colsMap: Record<2 | 3 | 4, string> = {
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-3",
  4: "grid-cols-2 sm:grid-cols-4",
}

export function StatsSection({ stats, cols = 4, className }: StatsSectionProps) {
  const effectiveCols = (stats.length <= 4 ? stats.length : cols) as 2 | 3 | 4

  return (
    <section className={cn("w-full px-4 py-12", className)}>
      <div
        className={cn(
          "divide-border mx-auto grid max-w-5xl divide-y sm:divide-x sm:divide-y-0",
          colsMap[effectiveCols],
        )}
      >
        {stats.map((stat, i) => (
          <div key={i} className="flex flex-col items-center px-6 py-8 text-center">
            <p className="text-foreground text-4xl font-bold tracking-tight sm:text-5xl">
              {stat.value}
            </p>
            <p className="text-foreground mt-2 text-sm font-medium">{stat.label}</p>
            {stat.description && (
              <p className="text-muted-foreground mt-1 text-xs">{stat.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
