import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TablesGrid } from "@/components/admin/tables/tables-grid"

export default function TablesPage() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Tables</h1>
        <Button>Add New Table</Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Floor Plan</CardTitle>
          <CardDescription>View and manage all tables in your restaurant.</CardDescription>
        </CardHeader>
        <CardContent>
          <TablesGrid />
        </CardContent>
      </Card>
    </div>
  )
}

