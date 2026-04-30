import type { Metadata } from "next"
import { DataTable } from "@aetherstack/patterns"
import { PatternPage } from "@/components/pattern-page"

export const metadata: Metadata = {
  title: "Data Table",
  description: "Sortable, searchable, paginated data table built on the Table primitive.",
}

type User = {
  name: string
  email: string
  role: string
  status: string
}

const COLUMNS = [
  { key: "name" as const, header: "Name", sortable: true },
  { key: "email" as const, header: "Email", sortable: true },
  { key: "role" as const, header: "Role", sortable: true },
  { key: "status" as const, header: "Status" },
]

const DATA: User[] = [
  { name: "Alice Martin", email: "alice@example.com", role: "Admin", status: "Active" },
  { name: "Bob Chen", email: "bob@example.com", role: "Developer", status: "Active" },
  { name: "Carol Kim", email: "carol@example.com", role: "Designer", status: "Inactive" },
  { name: "David Park", email: "david@example.com", role: "Developer", status: "Active" },
  { name: "Eva Torres", email: "eva@example.com", role: "Manager", status: "Active" },
]

export default function DataTablePage() {
  return (
    <PatternPage
      name="Data Table"
      description="A fully-featured data table with client-side sorting, fuzzy search, and pagination. Built on the Table primitive with generic column definitions."
      cliInstall="npx aether-ui add data-table"
      importCode={`import { DataTable } from "@aetherstack/patterns"
import type { DataTableColumn } from "@aetherstack/patterns"`}
      usageCode={`import { DataTable } from "@aetherstack/patterns"

type User = { name: string; email: string; role: string }

const columns = [
  { key: "name" as const, header: "Name", sortable: true },
  { key: "email" as const, header: "Email", sortable: true },
  { key: "role" as const, header: "Role", sortable: true },
]

const data: User[] = [
  { name: "Alice Martin", email: "alice@example.com", role: "Admin" },
  { name: "Bob Chen",    email: "bob@example.com",   role: "Developer" },
]

<DataTable
  columns={columns}
  data={data}
  searchable
  searchKeys={["name", "email"]}
  pageSize={10}
/>`}
      preview={
        <div className="w-full">
          <DataTable
            columns={COLUMNS}
            data={DATA}
            searchable
            searchKeys={["name", "email", "role"]}
            pageSize={3}
          />
        </div>
      }
      props={[
        { name: "columns", type: "DataTableColumn<T>[]", required: true, description: "Column definitions including key, header, optional render function, and sortable flag." },
        { name: "data", type: "T[]", required: true, description: "Row data. T must extend Record<string, unknown>." },
        { name: "pageSize", type: "number", default: "10", description: "Number of rows per page." },
        { name: "searchable", type: "boolean", default: "false", description: "Show a search input above the table." },
        { name: "searchKeys", type: "(keyof T)[]", description: "Which keys to include in search. Defaults to all column keys." },
        { name: "emptyMessage", type: "string", default: '"No results found."', description: "Message shown when no rows match the current filter." },
        { name: "className", type: "string", description: "Additional classes on the wrapper." },
      ]}
      a11yNotes={[
        "Sortable column headers use aria-sort (\"ascending\" | \"descending\" | \"none\").",
        "The search input has aria-label=\"Search table\" for screen readers.",
        "Pagination buttons have aria-label (\"Previous page\", \"Next page\") and are disabled when at limits.",
        "Empty state cell spans all columns so the table structure stays valid.",
      ]}
    />
  )
}
