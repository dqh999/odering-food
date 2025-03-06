"use client"

import { useState } from "react"
import { Clock, Coffee, DollarSign, MoreHorizontal, User, Utensils } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

type OrderStatus = "new" | "confirmed" | "preparing" | "ready" | "completed" | "paid" | "cancelled"

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  orderNumber: string
  customer: string
  table: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  time: string
  notes?: string
}

interface OrderCardsProps {
  status: OrderStatus
}

export function OrderCards({ status }: OrderCardsProps) {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [detailsOpen, setDetailsOpen] = useState(false)
  const [confirmationOpen, setConfirmationOpen] = useState(false)
  const [actionType, setActionType] = useState<string>("")

  // Mock orders data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-001",
      customer: "John Doe",
      table: "Table 1",
      items: [
        { id: "item1", name: "Beef Burger", quantity: 2, price: 12.99 },
        { id: "item2", name: "French Fries", quantity: 1, price: 4.99 },
        { id: "item3", name: "Coke", quantity: 2, price: 2.99 },
      ],
      total: 36.95,
      status: "new",
      time: "10:30 AM",
      notes: "No pickles on burgers",
    },
    {
      id: "2",
      orderNumber: "ORD-002",
      customer: "Jane Smith",
      table: "Table 5",
      items: [
        { id: "item4", name: "Margherita Pizza", quantity: 1, price: 14.99 },
        { id: "item5", name: "Caesar Salad", quantity: 1, price: 8.99 },
        { id: "item6", name: "Iced Tea", quantity: 2, price: 2.99 },
      ],
      total: 29.96,
      status: "confirmed",
      time: "10:45 AM",
    },
    {
      id: "3",
      orderNumber: "ORD-003",
      customer: "Robert Johnson",
      table: "Table 3",
      items: [
        { id: "item7", name: "Chicken Pasta", quantity: 1, price: 13.99 },
        { id: "item8", name: "Garlic Bread", quantity: 1, price: 3.99 },
        { id: "item9", name: "Sparkling Water", quantity: 1, price: 2.49 },
      ],
      total: 20.47,
      status: "preparing",
      time: "11:00 AM",
    },
    {
      id: "4",
      orderNumber: "ORD-004",
      customer: "Emily Davis",
      table: "Table 8",
      items: [
        { id: "item10", name: "Steak", quantity: 1, price: 24.99 },
        { id: "item11", name: "Mashed Potatoes", quantity: 1, price: 4.99 },
        { id: "item12", name: "Red Wine", quantity: 1, price: 8.99 },
      ],
      total: 38.97,
      status: "ready",
      time: "11:15 AM",
    },
    {
      id: "5",
      orderNumber: "ORD-005",
      customer: "Michael Wilson",
      table: "Table 2",
      items: [
        { id: "item13", name: "Fish & Chips", quantity: 1, price: 16.99 },
        { id: "item14", name: "Coleslaw", quantity: 1, price: 3.99 },
        { id: "item15", name: "Beer", quantity: 1, price: 5.99 },
      ],
      total: 26.97,
      status: "completed",
      time: "11:30 AM",
    },
    {
      id: "6",
      orderNumber: "ORD-006",
      customer: "Sarah Brown",
      table: "Table 7",
      items: [
        { id: "item16", name: "Vegetable Curry", quantity: 1, price: 14.99 },
        { id: "item17", name: "Naan Bread", quantity: 2, price: 2.99 },
        { id: "item18", name: "Mango Lassi", quantity: 1, price: 4.99 },
      ],
      total: 25.96,
      status: "paid",
      time: "11:45 AM",
    },
    {
      id: "7",
      orderNumber: "ORD-007",
      customer: "David Lee",
      table: "Table 4",
      items: [
        { id: "item19", name: "Sushi Platter", quantity: 1, price: 22.99 },
        { id: "item20", name: "Miso Soup", quantity: 1, price: 3.99 },
        { id: "item21", name: "Green Tea", quantity: 1, price: 2.49 },
      ],
      total: 29.47,
      status: "cancelled",
      time: "12:00 PM",
      notes: "Customer changed their mind",
    },
  ].filter((order) => order.status === status)

  const getNextStatus = (currentStatus: OrderStatus): OrderStatus | null => {
    const statusFlow: Record<OrderStatus, OrderStatus | null> = {
      new: "confirmed",
      confirmed: "preparing",
      preparing: "ready",
      ready: "completed",
      completed: "paid",
      paid: null,
      cancelled: null,
    }
    return statusFlow[currentStatus]
  }

  const handleAction = (order: Order, action: string) => {
    setSelectedOrder(order)
    setActionType(action)
    setConfirmationOpen(true)
  }

  const confirmAction = () => {
    // In a real app, this would call an API to update the order status
    console.log(`Order ${selectedOrder?.orderNumber} status changed to ${actionType}`)
    setConfirmationOpen(false)
  }

  const getStatusBadgeColor = (status: OrderStatus) => {
    const colors: Record<OrderStatus, string> = {
      new: "bg-blue-100 text-blue-800",
      confirmed: "bg-purple-100 text-purple-800",
      preparing: "bg-yellow-100 text-yellow-800",
      ready: "bg-green-100 text-green-800",
      completed: "bg-indigo-100 text-indigo-800",
      paid: "bg-teal-100 text-teal-800",
      cancelled: "bg-red-100 text-red-800",
    }
    return colors[status]
  }

  const getActionButton = (order: Order) => {
    const nextStatus = getNextStatus(order.status)

    if (!nextStatus) return null

    const actionLabels: Record<OrderStatus, string> = {
      new: "Confirm Order",
      confirmed: "Start Preparing",
      preparing: "Mark as Ready",
      ready: "Complete Order",
      completed: "Mark as Paid",
      paid: "",
      cancelled: "",
    }

    return (
      <Button className="w-full" onClick={() => handleAction(order, nextStatus)}>
        {actionLabels[order.status]}
      </Button>
    )
  }

  return (
    <>
      {orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-muted p-3">
            <Coffee className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 text-lg font-semibold">No Orders</h3>
          <p className="mt-2 text-sm text-muted-foreground">There are no orders with this status at the moment.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{order.orderNumber}</CardTitle>
                  <Badge variant="outline" className={getStatusBadgeColor(order.status)}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{order.customer}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Utensils className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{order.table}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{order.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">${order.total.toFixed(2)}</span>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{order.items.length} items</span>
                    <ul className="mt-1 list-inside list-disc text-muted-foreground">
                      {order.items.slice(0, 2).map((item) => (
                        <li key={item.id} className="truncate">
                          {item.quantity}x {item.name}
                        </li>
                      ))}
                      {order.items.length > 2 && <li>+{order.items.length - 2} more items</li>}
                    </ul>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedOrder(order)
                    setDetailsOpen(true)
                  }}
                >
                  View Details
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedOrder(order)
                        setDetailsOpen(true)
                      }}
                    >
                      View details
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    {order.status !== "cancelled" && (
                      <DropdownMenuItem className="text-destructive" onClick={() => handleAction(order, "cancelled")}>
                        Cancel order
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
              {getActionButton(order) && <div className="px-6 pb-6">{getActionButton(order)}</div>}
            </Card>
          ))}
        </div>
      )}

      {/* Order Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.orderNumber}</DialogTitle>
            <DialogDescription>Complete information about this order</DialogDescription>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium">Customer</h4>
                  <p className="text-sm">{selectedOrder.customer}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Table</h4>
                  <p className="text-sm">{selectedOrder.table}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Time</h4>
                  <p className="text-sm">{selectedOrder.time}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium">Status</h4>
                  <Badge variant="outline" className={getStatusBadgeColor(selectedOrder.status)}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium">Items</h4>
                <ul className="mt-2 space-y-2">
                  {selectedOrder.items.map((item) => (
                    <li key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.quantity}x {item.name}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between border-t pt-2 font-medium">
                  <span>Total</span>
                  <span>${selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {selectedOrder.notes && (
                <div>
                  <h4 className="text-sm font-medium">Notes</h4>
                  <p className="text-sm text-muted-foreground">{selectedOrder.notes}</p>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row sm:justify-between sm:space-x-2">
            <Button variant="outline" onClick={() => setDetailsOpen(false)}>
              Close
            </Button>
            {selectedOrder && getNextStatus(selectedOrder.status) && (
              <Button
                onClick={() => {
                  setDetailsOpen(false)
                  handleAction(selectedOrder, getNextStatus(selectedOrder.status)!)
                }}
              >
                Update Status
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Action</DialogTitle>
            <DialogDescription>
              Are you sure you want to change the status of order {selectedOrder?.orderNumber} to {actionType}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmationOpen(false)}>
              Cancel
            </Button>
            <Button onClick={confirmAction}>Confirm</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

