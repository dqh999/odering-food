"use client"
import { ArrowUpDown, MoreHorizontal, Receipt, Eye, FileText } from "lucide-react"
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

interface Payment {
  id: string
  orderNumber: string
  customer: string
  amount: number
  method: "credit_card" | "cash" | "mobile_payment"
  status: "completed" | "pending" | "failed"
  date: string
}

const payments: Payment[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customer: "John Doe",
    amount: 125.99,
    method: "credit_card",
    status: "completed",
    date: "2023-04-23T11:45:00",
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customer: "Jane Smith",
    amount: 89.5,
    method: "cash",
    status: "completed",
    date: "2023-04-23T12:30:00",
  },
  {
    id: "3",
    orderNumber: "ORD-003",
    customer: "Robert Johnson",
    amount: 45.75,
    method: "credit_card",
    status: "pending",
    date: "2023-04-23T12:45:00",
  },
  {
    id: "4",
    orderNumber: "ORD-004",
    customer: "Emily Davis",
    amount: 132.25,
    method: "mobile_payment",
    status: "completed",
    date: "2023-04-23T13:15:00",
  },
  {
    id: "5",
    orderNumber: "ORD-005",
    customer: "Michael Wilson",
    amount: 78.5,
    method: "credit_card",
    status: "failed",
    date: "2023-04-23T14:00:00",
  },
  {
    id: "6",
    orderNumber: "ORD-006",
    customer: "Sarah Brown",
    amount: 56.25,
    method: "cash",
    status: "completed",
    date: "2023-04-23T14:30:00",
  },
  {
    id: "7",
    orderNumber: "ORD-007",
    customer: "David Lee",
    amount: 145.75,
    method: "credit_card",
    status: "completed",
    date: "2023-04-23T15:00:00",
  },
]

export function PaymentsTable() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(date)
  }

  const getMethodText = (method: Payment["method"]) => {
    switch (method) {
      case "credit_card":
        return "Credit Card"
      case "cash":
        return "Cash"
      case "mobile_payment":
        return "Mobile Payment"
      default:
        return method
    }
  }

  const getStatusColor = (status: Payment["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200"
      case "pending":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
      case "failed":
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
            <TableHead className="text-right">Amount</TableHead>
            <TableHead>Method</TableHead>
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
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell className="font-medium">{payment.orderNumber}</TableCell>
              <TableCell>{payment.customer}</TableCell>
              <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
              <TableCell>{getMethodText(payment.method)}</TableCell>
              <TableCell>
                <Badge variant="outline" className={getStatusColor(payment.status)}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(payment.date)}</TableCell>
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
                      <Receipt className="mr-2 h-4 w-4" />
                      Print receipt
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Export as PDF
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

