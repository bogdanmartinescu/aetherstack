import { Button } from "@aetherstack/ui"

export default function DemoPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar placeholder */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
        <div className="flex h-14 items-center border-b border-sidebar-border px-4">
          <span className="text-sm font-semibold text-sidebar-foreground">Aether UI · Demo</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {["Dashboard", "Analytics", "Customers", "Orders", "Settings"].map((item) => (
            <div
              key={item}
              className="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {item}
            </div>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-14 items-center justify-between border-b border-border bg-background px-6">
          <h1 className="text-sm font-semibold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Export
            </Button>
            <Button size="sm">New report</Button>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 p-6">
          {/* Stat cards */}
          <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Revenue", value: "$48,295", delta: "+12.5%" },
              { label: "Active Users", value: "3,241", delta: "+8.1%" },
              { label: "New Signups", value: "142", delta: "+2.4%" },
              { label: "Churn Rate", value: "1.2%", delta: "-0.3%" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-lg border border-border bg-card p-5">
                <div className="mb-1 text-xs text-muted-foreground">{stat.label}</div>
                <div className="text-2xl font-semibold text-card-foreground">{stat.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{stat.delta} from last month</div>
              </div>
            ))}
          </div>

          {/* Placeholder chart area */}
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-card-foreground">Revenue over time</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">7d</Button>
                <Button variant="outline" size="sm">30d</Button>
                <Button size="sm">90d</Button>
              </div>
            </div>
            <div className="flex h-48 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
              Chart placeholder — connect your data source
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
