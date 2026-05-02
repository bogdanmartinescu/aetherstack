"use client"

import { cn } from "@aetherstack/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@aetherstack/ui"

interface UsageStats {
  totalRequests: number
  totalTokens: number
  estimatedCost: number
  period?: string
}

interface ModelUsage {
  model: string
  tokens: number
  cost: number
}

interface DailyUsage {
  date: string
  requests: number
  tokens: number
}

interface AIUsageDashboardProps {
  stats?: UsageStats
  tokensByModel?: ModelUsage[]
  requestsOverTime?: DailyUsage[]
  className?: string
}

function formatNumber(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return n.toString()
}

function formatCost(n: number): string {
  return `$${n.toFixed(4)}`
}

interface MiniBarChartProps {
  data: { label: string; value: number }[]
  color?: string
}

function MiniBarChart({ data, color = "hsl(var(--primary))" }: MiniBarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1)
  const height = 80
  const barWidth = 100 / Math.max(data.length, 1)

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 100 ${height}`}
        preserveAspectRatio="none"
        className="w-full"
        style={{ height: `${height}px` }}
        aria-label="Bar chart"
      >
        {data.map((d, i) => {
          const barH = (d.value / max) * (height - 4)
          const x = i * barWidth + barWidth * 0.1
          const w = barWidth * 0.8
          return (
            <rect
              key={i}
              x={x}
              y={height - barH}
              width={w}
              height={barH}
              fill={color}
              rx="1"
              opacity="0.85"
            >
              <title>{`${d.label}: ${formatNumber(d.value)}`}</title>
            </rect>
          )
        })}
      </svg>
      <div className="flex justify-between mt-1">
        {data.length <= 7 ? (
          data.map((d, i) => (
            <span key={i} className="text-xs text-muted-foreground truncate" style={{ maxWidth: `${100 / data.length}%` }}>
              {d.label}
            </span>
          ))
        ) : (
          <>
            <span className="text-xs text-muted-foreground">{data[0]?.label}</span>
            <span className="text-xs text-muted-foreground">{data[data.length - 1]?.label}</span>
          </>
        )}
      </div>
    </div>
  )
}

function AIUsageDashboard({
  stats,
  tokensByModel = [],
  requestsOverTime = [],
  className,
}: AIUsageDashboardProps) {
  const chartData = requestsOverTime.map((d) => ({
    label: d.date.slice(-5),
    value: d.requests,
  }))

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      {stats && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total requests
                {stats.period && ` (${stats.period})`}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatNumber(stats.totalRequests)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total tokens</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatNumber(stats.totalTokens)}</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Estimated cost</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{formatCost(stats.estimatedCost)}</p>
            </CardContent>
          </Card>
        </div>
      )}

      {chartData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Requests over time</CardTitle>
          </CardHeader>
          <CardContent>
            <MiniBarChart data={chartData} />
          </CardContent>
        </Card>
      )}

      {tokensByModel.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Usage by model</CardTitle>
          </CardHeader>
          <CardContent>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left">
                  <th className="pb-2 font-medium text-muted-foreground">Model</th>
                  <th className="pb-2 font-medium text-muted-foreground text-right">Tokens</th>
                  <th className="pb-2 font-medium text-muted-foreground text-right">Cost</th>
                </tr>
              </thead>
              <tbody>
                {tokensByModel.map((row, i) => (
                  <tr key={i} className="border-b border-border/50 last:border-0">
                    <td className="py-2 font-mono">{row.model}</td>
                    <td className="py-2 text-right tabular-nums">{formatNumber(row.tokens)}</td>
                    <td className="py-2 text-right tabular-nums">{formatCost(row.cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export { AIUsageDashboard }
