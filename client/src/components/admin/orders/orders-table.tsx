"use client"
import { MoreHorizontal, ArrowUpDown, Eye, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

interface Order {
  id: string
  orderNumber: string
  customer: string
  table: string
  items: number
  total: number
  status: "pending" | "processing" | "completed" | "cancelled"
  date: string
}

const orders: Order[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customer: "John Doe",
    table: "Table 1",
    items: 4,
    total: 125.99,
    status: "completed",
    date: "2023-04-23T11:30:00",
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customer: "Jane Smith",
    table: "Table 5",
    items: 3,
    total: 89.5,
    status: "processing",
    date: "2023-04-23T12:15:00",
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customer: "Robert Johnson",
    table: "Table 3",
    items: 2,
    total: 45.75,
    status: "pending",
    date: "2023-04-23T12:30:00",
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customer: "Emily Davis",
    table: "Table 8",
    items: 5,
    total: 132.25,
    status: "completed",
    date: "2023-04-23T13:00:00",
  },
  {
    id: "5",
    orderNumber: "ORD-005",
    customer: "Michael Wilson",
    table: "Table 2",
    items: 3,
    total: 78.5,
    status: "processing",
    date: "2023-04-23T13:45:00",
  },
  {
    id: "6",
    orderNumber: "ORD-006",
    customer: "Sarah Brown",
    table: "Table 7",
    items: 2,
    total: 56.25,
    status: "cancelled",
    date: "2023-04-23T14:00:00",
  },
  {
    id: "7",
    orderNumber: "ORD-007",
    customer: "David Lee",
    table: "Table 4",
    items: 6,
    total: 145.75,
    status: "completed",
    date: "2023-04-23T14:30:00",
  },
  {
    id: "8",
    orderNumber: "ORD-008",
    customer: "Lisa Taylor",
    table: "Table 6",
    items: 1,
    total: 22.5,
    status: "pending",
    date: "2023-04-23T15:00:00",
  },
]

export function OrdersTable() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }

  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "processing":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200"
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "cancelled":
        return "bg-red-100 text-red-800 hover:bg-red-200"
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200"
    }
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Order #</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Table</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead>
              <div className="flex items-center">
                Status
                <Button variant="ghost" size="sm" className="ml-1 h-8 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </TableHead>
            <TableHead>
              <div className="flex items-center">
                Date
                <Button variant="ghost" size="sm" className="ml-1 h-8 p-0">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.orderNumber}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.table}</TableCell>
              <TableCell>{order.items}</TableCell>
              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(order.status)}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(order.date)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit order
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-destructive">
                      <Trash className="mr-2 h-4 w-4" />
                      Cancel order
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

