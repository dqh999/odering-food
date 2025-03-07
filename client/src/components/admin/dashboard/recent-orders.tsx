import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface Order {
  id: string
  table: string
  customer: string
  status: "completed" | "processing" | "pending"
  total: number
  items: number
  date: string
}

const orders: Order[] = [
  {
    id: "ORD-001",
    table: "Table 1",
    customer: "John Doe",
    status: "completed",
    total: 125.99,
    items: 4,
    date: "2023-04-23T11:30:00",
  },
  {
    id: "ORD-002",
    table: "Table 5",
    customer: "Jane Smith",
    status: "processing",
    total: 89.5,
    items: 3,
    date: "2023-04-23T12:15:00",
  },
  {
    id: "ORD-003",
    table: "Table 3",
    customer: "Robert Johnson",
    status: "pending",
    total: 45.75,
    items: 2,
    date: "2023-04-23T12:30:00",
  },
  {
    id: "ORD-004",
    table: "Table 8",
    customer: "Emily Davis",
    status: "completed",
    total: 132.25,
    items: 5,
    date: "2023-04-23T13:00:00",
  },
  {
    id: "ORD-005",
    table: "Table 2",
    customer: "Michael Wilson",
    status: "processing",
    total: 78.5,
    items: 3,
    date: "2023-04-23T13:45:00",
  },
]

export function RecentOrders() {
  return (
    <div className="space-y-8">
      {orders.map((order) => (
        <div key={order.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="bg-primary/10 text-primary">
              {order.customer
                .split(" ")
                .map((name) => name[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{order.customer}</p>
            <p className="text-sm text-muted-foreground">
              {order.table} • {order.items} items
            </p>
          </div>
          <div className="ml-auto font-medium">${order.total.toFixed(2)}</div>
        </div>
      ))}
    </div>
  )
}

