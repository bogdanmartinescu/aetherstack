import type { Metadata } from "next"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Badge,
  Button,
} from "@aetherstack/ui"
import { ComponentPage } from "@/components/component-page"

export const metadata: Metadata = {
  title: "Table",
  description: "A semantic HTML table for displaying tabular data.",
}

const MANUAL_SOURCE = `import * as React from "react"
import { cn } from "@/lib/utils"

const Table = React.forwardRef<HTMLTableElement, React.HTMLAttributes<HTMLTableElement>>(
  ({ className, ...props }, ref) => (
    <div className="relative w-full overflow-auto">
      <table ref={ref} className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  ),
)
Table.displayName = "Table"

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
  ),
)
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody ref={ref} className={cn("[&_tr:last-child]:border-0", className)} {...props} />
  ),
)
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot ref={ref} className={cn("border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0", className)} {...props} />
  ),
)
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<HTMLTableRowElement, React.HTMLAttributes<HTMLTableRowElement>>(
  ({ className, ...props }, ref) => (
    <tr ref={ref} className={cn("border-b border-border transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted", className)} {...props} />
  ),
)
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th ref={ref} className={cn("h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0", className)} {...props} />
  ),
)
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td ref={ref} className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)} {...props} />
  ),
)
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption ref={ref} className={cn("mt-4 text-sm text-muted-foreground", className)} {...props} />
  ),
)
TableCaption.displayName = "TableCaption"

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }`

const users = [
  { name: "Alice Chen", email: "alice@acme.com", role: "Admin", status: "Active" },
  { name: "Bob Marsh", email: "bob@acme.com", role: "Editor", status: "Active" },
  { name: "Carla Voss", email: "carla@acme.com", role: "Viewer", status: "Inactive" },
  { name: "Dave Yu", email: "dave@acme.com", role: "Editor", status: "Active" },
]

export default function TablePage() {
  return (
    <ComponentPage
      name="Table"
      description="A semantic HTML table with consistent Aether UI styling. Composed of eight sub-components that map directly to HTML table elements: Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, and TableCaption."
      features={[
        "Wraps in an overflow-auto container for horizontal scrolling on small screens",
        "Hover and selected row states",
        "TableFooter for summary rows",
        "TableCaption for screen reader context",
        "All sub-components forward refs",
      ]}
      preview={
        <div className="w-full">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.slice(0, 3).map((u) => (
                <TableRow key={u.name}>
                  <TableCell className="font-medium">{u.name}</TableCell>
                  <TableCell>{u.role}</TableCell>
                  <TableCell>
                    <Badge variant={u.status === "Active" ? "default" : "secondary"}>
                      {u.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      }
      previewCode={`import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const users = [
  { name: "Alice Chen", role: "Admin", status: "Active" },
  { name: "Bob Marsh", role: "Editor", status: "Active" },
  { name: "Carla Voss", role: "Viewer", status: "Inactive" },
]

export function TableDemo() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.name}>
            <TableCell className="font-medium">{user.name}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Badge variant={user.status === "Active" ? "default" : "secondary"}>
                {user.status}
              </Badge>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}`}
      cliInstall={`npx aether-ui add table`}
      manualInstallCode={MANUAL_SOURCE}
      examples={[
        {
          title: "Full table with footer",
          description: "Use TableFooter for summary rows like totals.",
          preview: (
            <Table>
              <TableCaption>Team member list</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-40">Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Joined</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((u) => (
                  <TableRow key={u.name}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell className="text-muted-foreground">{u.email}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell className="text-right text-muted-foreground">Jan 2025</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={3}>Total</TableCell>
                  <TableCell className="text-right">{users.length} members</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          ),
          code: `<Table>
  <TableCaption>Team member list</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Role</TableHead>
      <TableHead className="text-right">Joined</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {users.map((user) => (
      <TableRow key={user.name}>
        <TableCell className="font-medium">{user.name}</TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.role}</TableCell>
        <TableCell className="text-right">{user.joined}</TableCell>
      </TableRow>
    ))}
  </TableBody>
  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">{users.length} members</TableCell>
    </TableRow>
  </TableFooter>
</Table>`,
        },
        {
          title: "With row actions",
          description: "Add an actions column with inline buttons.",
          preview: (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.slice(0, 3).map((u) => (
                  <TableRow key={u.name}>
                    <TableCell className="font-medium">{u.name}</TableCell>
                    <TableCell>{u.role}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="sm">Edit</Button>
                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">Delete</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ),
          code: `<TableRow key={user.name}>
  <TableCell>{user.name}</TableCell>
  <TableCell>{user.role}</TableCell>
  <TableCell className="text-right">
    <Button variant="ghost" size="sm">Edit</Button>
    <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
  </TableCell>
</TableRow>`,
        },
      ]}
      props={[]}
      propGroups={[
        {
          title: "Table",
          props: [
            { name: "className", type: "string", description: "Applied to the inner <table> element. The outer wrapper is always w-full overflow-auto." },
            { name: "...props", type: "React.HTMLAttributes<HTMLTableElement>", description: "All standard HTML table attributes." },
          ],
        },
        {
          title: "TableRow",
          props: [
            { name: 'data-[state=selected]', type: "—", description: "Add data-state='selected' to highlight a selected row." },
            { name: "className", type: "string", description: "Additional classes." },
          ],
        },
        {
          title: "TableHead",
          props: [
            { name: "className", type: "string", description: "Applied to <th>. Defaults to h-12 px-4 text-left align-middle font-medium text-muted-foreground." },
          ],
        },
        {
          title: "TableCell",
          props: [
            { name: "colSpan", type: "number", description: "Spans multiple columns (for footer totals, etc.)." },
            { name: "className", type: "string", description: "Applied to <td>. Defaults to p-4 align-middle." },
          ],
        },
        {
          title: "TableCaption",
          props: [
            { name: "className", type: "string", description: "Applied to <caption>. Defaults to mt-4 text-sm text-muted-foreground." },
          ],
        },
      ]}
      a11yNotes={[
        "Use TableCaption to provide a text description of the table — screen readers announce it before reading the table content.",
        "Use TableHead (<th>) for column headers — this creates the correct ARIA column header semantics.",
        "For row headers (first column), add scope='row' to TableCell elements.",
        "Use aria-sort on TableHead elements for sortable columns.",
      ]}
    />
  )
}
