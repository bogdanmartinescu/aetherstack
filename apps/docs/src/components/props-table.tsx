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
    <div className="border-border overflow-x-auto rounded-lg border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-border bg-muted/50 border-b">
            <th className="text-foreground px-4 py-3 text-left font-semibold">Prop</th>
            <th className="text-foreground px-4 py-3 text-left font-semibold">Type</th>
            <th className="text-foreground px-4 py-3 text-left font-semibold">Default</th>
            <th className="text-foreground px-4 py-3 text-left font-semibold">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop, i) => (
            <tr
              key={prop.name}
              className={cn(
                "border-border border-b last:border-0",
                i % 2 === 0 ? "bg-background" : "bg-muted/20",
              )}
            >
              <td className="px-4 py-3">
                <span className="text-foreground font-mono text-xs font-medium">
                  {prop.name}
                  {prop.required && <span className="text-destructive ml-1">*</span>}
                </span>
              </td>
              <td className="px-4 py-3">
                <span className="text-primary font-mono text-xs">{prop.type}</span>
              </td>
              <td className="px-4 py-3">
                {prop.default ? (
                  <span className="text-muted-foreground font-mono text-xs">{prop.default}</span>
                ) : (
                  <span className="text-muted-foreground text-xs">—</span>
                )}
              </td>
              <td className="text-muted-foreground px-4 py-3">{prop.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
