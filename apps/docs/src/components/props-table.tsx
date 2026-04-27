import { cn } from "@aetherstack/utils"

export interface PropDef {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export function PropsTable({ props }: { props: PropDef[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-semibold text-foreground">Prop</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Type</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Default</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={cn(
                "border-b border-border last:border-0",
                i % 2 === 0 ? "bg-background" : "bg-muted/20",
              )}
            >
              <td className="px-4 py-3">
                <span className="font-mono text-xs font-medium text-foreground">
                  {prop.name}
                  {prop.required && (
                    <span className="ml-1 text-destructive">*</span>
                  )}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="font-mono text-xs text-primary">{prop.type}</span>
              </td>
              <td className="px-4 py-3">
                {prop.default ? (
                  <span className="font-mono text-xs text-muted-foreground">{prop.default}</span>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-muted-foreground">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
