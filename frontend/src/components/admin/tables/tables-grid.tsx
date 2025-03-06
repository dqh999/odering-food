"use client"

import { useState } from "react"
import { Users } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

interface Table {
  id: string
  number: number
  capacity: number
  status: "available" | "occupied" | "reserved" | "cleaning"
  orders?: number
  server?: string
}

const tables: Table[] = [
  { id: "1", number: 1, capacity: 4, status: "occupied", orders: 2, server: "John" },
  { id: "2", number: 2, capacity: 2, status: "available" },
  { id: "3", number: 3, capacity: 6, status: "reserved" },
  { id: "4", number: 4, capacity: 4, status: "occupied", orders: 1, server: "Sarah" },
  { id: "5", number: 5, capacity: 8, status: "cleaning" },
  { id: "6", number: 6, capacity: 2, status: "available" },
  { id: "7", number: 7, capacity: 4, status: "occupied", orders: 3, server: "Mike" },
  { id: "8", number: 8, capacity: 6, status: "available" },
  { id: "9", number: 9, capacity: 4, status: "reserved" },
  { id: "10", number: 10, capacity: 2, status: "occupied", orders: 1, server: "Lisa" },
  { id: "11", number: 11, capacity: 4, status: "available" },
  { id: "12", number: 12, capacity: 8, status: "cleaning" },
]

export function TablesGrid() {
  const [selectedTable, setSelectedTable] = useState<Table | null>(null)

  const getStatusColor = (status: Table["status"]) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "occupied":
        return "bg-red-500"
      case "reserved":
        return "bg-blue-500"
      case "cleaning":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: Table["status"]) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {tables.map((table) => (
        <Dialog key={table.id}>
          <DialogTrigger asChild>
            <Card
              className={cn(
                "cursor-pointer transition-all hover:shadow-md",
                table.status === "occupied" && "border-red-200",
                table.status === "reserved" && "border-blue-200",
                table.status === "cleaning" && "border-yellow-200",
                table.status === "available" && "border-green-200",
              )}
              onClick={() => setSelectedTable(table)}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle>Table {table.number}</CardTitle>
                  <div className={cn("h-3 w-3 rounded-full", getStatusColor(table.status))} />
                </div>
                <CardDescription>Capacity: {table.capacity} people</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{getStatusText(table.status)}</Badge>
                  {table.status === "occupied" && (
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Users className="mr-1 h-4 w-4" />
                      {table.orders} orders
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Table {table.number}</DialogTitle>
              <DialogDescription>Manage table status and orders</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Status</p>
                  <p className="flex items-center gap-2">
                    <span className={cn("inline-block h-2 w-2 rounded-full", getStatusColor(table.status))}></span>
                    {getStatusText(table.status)}
                  </p>
                </div>
                <div>
                  <p className="text-sm font-medium">Capacity</p>
                  <p>{table.capacity} people</p>
                </div>
              </div>
              {table.status === "occupied" && (
                <>
                  <div>
                    <p className="text-sm font-medium">Server</p>
                    <p>{table.server}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Active Orders</p>
                    <p>{table.orders} orders</p>
                  </div>
                </>
              )}
            </div>
            <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
              {table.status === "available" && <Button className="w-full">Seat Guests</Button>}
              {table.status === "occupied" && (
                <>
                  <Button variant="outline" className="mb-2 sm:mb-0">
                    View Orders
                  </Button>
                  <Button>Add Order</Button>
                </>
              )}
              {table.status === "reserved" && <Button className="w-full">Check In</Button>}
              {table.status === "cleaning" && <Button className="w-full">Mark as Available</Button>}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  )
}

