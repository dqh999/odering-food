"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import {
  CheckCircle,
  Clock,
  Package,
  RefreshCcw,
  Search,
  Truck,
  XCircle,
  ChevronDown,
  ChevronUp,
  Phone,
  User,
  MapPin,
  FileText,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { useApi } from "@/lib/use-api"

interface OrderItem {
  id: number
  name: string
  price: number
  quantity: number
}

interface Customer {
  name: string
  phone: string
  address?: string
  notes?: string
}

interface Order {
  id: number
  customer: Customer
  items: OrderItem[]
  totalAmount: number
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled"
  createdAt: string
  updatedAt: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [expandedOrders, setExpandedOrders] = useState<number[]>([])
  const { toast } = useToast()

  // Use our custom hook for fetching orders
  const {
    isLoading,
    execute: fetchOrders,
    error: fetchError,
  } = useApi<Order[]>({
    endpoint: "/orders",
    method: "GET",
    showToast: true,
    customErrorMap: {
      ENTITY_NOT_FOUND: "No orders found. The order database might be empty.",
      ACCESS_DENIED: "You don't have permission to view orders.",
    },
  })

  // Use our custom hook for updating order status
  const { execute: updateOrderStatus, error: updateError } = useApi({
    endpoint: "", // Will be set dynamically
    method: "PATCH",
    showToast: true,
    customErrorMap: {
      ENTITY_NOT_FOUND: "Order not found. It might have been deleted.",
      UPDATE_FAILED: "Failed to update the order status. Please try again.",
    },
  })

  const loadOrders = async () => {
    // For demo purposes, we'll use mock data
    const mockOrders: Order[] = Array.from({ length: 30 }, (_, i) => ({
      id: 1000 + i,
      customer: {
        name: `Customer ${i + 1}`,
        phone: `+1 555-${100 + i}`,
        address: i % 3 === 0 ? `123 Main St, Apt ${i}` : undefined,
        notes: i % 4 === 0 ? "Please deliver to the back door" : undefined,
      },
      items: [
        {
          id: 1,
          name: "Beef Steak",
          price: 22.99,
          quantity: 1 + (i % 3),
        },
        {
          id: 2,
          name: "Garlic Bread",
          price: 4.99,
          quantity: (i % 2) + 1,
        },
        ...(i % 3 === 0
          ? [
            {
              id: 3,
              name: "Chocolate Cake",
              price: 7.99,
              quantity: 1,
            },
          ]
          : []),
        ...(i % 5 === 0
          ? [
            {
              id: 4,
              name: "Sparkling Water",
              price: 2.99,
              quantity: 2,
            },
          ]
          : []),
      ],
      totalAmount: 22.99 * (1 + (i % 3)) + 4.99 * ((i % 2) + 1) + (i % 3 === 0 ? 7.99 : 0) + (i % 5 === 0 ? 5.98 : 0),
      status: ["pending", "preparing", "ready", "delivered", "cancelled"][i % 5] as any,
      createdAt: new Date(Date.now() - i * 3600000).toISOString(),
      updatedAt: new Date(Date.now() - i * 3000000).toISOString(),
    }))

    setOrders(mockOrders)
    filterOrders(mockOrders, searchQuery, activeTab)
  }

  useEffect(() => {
    loadOrders()
    // Set up polling to refresh orders every 30 seconds
    const intervalId = setInterval(loadOrders, 30000)
    return () => clearInterval(intervalId)
  }, [])

  const filterOrders = (ordersList: Order[], query: string, tab: string) => {
    let filtered = ordersList

    // Filter by search query
    if (query) {
      const queryLower = query.toLowerCase()
      filtered = filtered.filter(
        (order) =>
          order.id.toString().includes(queryLower) ||
          order.customer.name.toLowerCase().includes(queryLower) ||
          order.customer.phone.includes(queryLower),
      )
    }

    // Filter by status tab
    if (tab !== "all") {
      filtered = filtered.filter((order) => order.status === tab)
    }

    setFilteredOrders(filtered)
  }

  useEffect(() => {
    filterOrders(orders, searchQuery, activeTab)
  }, [orders, searchQuery, activeTab])

  const handleUpdateOrderStatus = async (orderId: number, newStatus: string) => {
    // For demo purposes, we'll update the local state directly
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === orderId ? { ...order, status: newStatus as any, updatedAt: new Date().toISOString() } : order,
      ),
    )

    toast({
      title: "Status updated",
      description: `Order #${orderId} status changed to ${newStatus}`,
    })
  }

  const getNextStatus = (currentStatus: string) => {
    const statusFlow = {
      pending: "preparing",
      preparing: "ready",
      ready: "delivered",
    }

    return statusFlow[currentStatus as keyof typeof statusFlow] || null
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-300">
            Pending
          </Badge>
        )
      case "preparing":
        return (
          <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-300">
            Preparing
          </Badge>
        )
      case "ready":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
            Ready
          </Badge>
        )
      case "delivered":
        return (
          <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-300">
            Delivered
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
            Cancelled
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "preparing":
        return <Package className="h-5 w-5 text-blue-500" />
      case "ready":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "delivered":
        return <Truck className="h-5 w-5 text-purple-500" />
      case "cancelled":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const toggleOrderExpanded = (orderId: number) => {
    setExpandedOrders((prev) => (prev.includes(orderId) ? prev.filter((id) => id !== orderId) : [...prev, orderId]))
  }

  const isOrderExpanded = (orderId: number) => {
    return expandedOrders.includes(orderId)
  }

  const getOrderCountByStatus = (status: string) => {
    return orders.filter((order) => status === "all" || order.status === status).length
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Orders</h1>
          <p className="text-muted-foreground">Manage and track customer orders</p>
        </div>
        <Button onClick={loadOrders} variant="outline" className="flex items-center gap-2 w-full sm:w-auto">
          <RefreshCcw className="h-4 w-4" />
          Refresh
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm font-medium">All Orders</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-2xl font-bold">{getOrderCountByStatus("all")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-2xl font-bold">{getOrderCountByStatus("pending")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm font-medium">Preparing</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-2xl font-bold">{getOrderCountByStatus("preparing")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm font-medium">Ready</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-2xl font-bold">{getOrderCountByStatus("ready")}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="p-3">
            <CardTitle className="text-sm font-medium">Delivered</CardTitle>
          </CardHeader>
          <CardContent className="p-3 pt-0">
            <div className="text-2xl font-bold">{getOrderCountByStatus("delivered")}</div>
          </CardContent>
        </Card>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by order #, customer name or phone..."
          className="pl-9"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full flex overflow-x-auto no-scrollbar mb-4">
          <TabsTrigger value="all" className="flex-1">
            All Orders
          </TabsTrigger>
          <TabsTrigger value="pending" className="flex-1">
            Pending
          </TabsTrigger>
          <TabsTrigger value="preparing" className="flex-1">
            Preparing
          </TabsTrigger>
          <TabsTrigger value="ready" className="flex-1">
            Ready
          </TabsTrigger>
          <TabsTrigger value="delivered" className="flex-1">
            Delivered
          </TabsTrigger>
          <TabsTrigger value="cancelled" className="flex-1">
            Cancelled
          </TabsTrigger>
        </TabsList>

        {["all", "pending", "preparing", "ready", "delivered", "cancelled"].map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-4">
            {isLoading ? (
              <div className="flex justify-center items-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
              </div>
            ) : filteredOrders.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">No orders found</p>
                {searchQuery && (
                  <Button variant="outline" onClick={() => setSearchQuery("")}>
                    Clear Search
                  </Button>
                )}
              </div>
            ) : (
              filteredOrders.map((order) => (
                <Collapsible
                  key={order.id}
                  open={isOrderExpanded(order.id)}
                  onOpenChange={() => toggleOrderExpanded(order.id)}
                  className="border rounded-lg overflow-hidden"
                >
                  <div className="bg-muted/40 p-4">
                    <CollapsibleTrigger className="flex flex-col sm:flex-row w-full justify-between items-start sm:items-center gap-3">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(order.status)}
                        <div>
                          <h3 className="font-medium">Order #{order.id}</h3>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(order.createdAt), "MMM d, yyyy h:mm a")}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                          {getStatusBadge(order.status)}
                          <span className="font-medium ml-2">${order.totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground ml-auto">
                          <span className="text-sm">{isOrderExpanded(order.id) ? "Hide" : "View"} Details</span>
                          {isOrderExpanded(order.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </div>
                      </div>
                    </CollapsibleTrigger>
                  </div>

                  <CollapsibleContent>
                    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium flex items-center gap-2 mb-3">
                          <User className="h-4 w-4 text-muted-foreground" />
                          Customer Information
                        </h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <User className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p className="font-medium">{order.customer.name}</p>
                            </div>
                          </div>
                          <div className="flex items-start gap-2">
                            <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                            <div>
                              <p>{order.customer.phone}</p>
                            </div>
                          </div>
                          {order.customer.address && (
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p>{order.customer.address}</p>
                              </div>
                            </div>
                          )}
                          {order.customer.notes && (
                            <div className="flex items-start gap-2">
                              <FileText className="h-4 w-4 text-muted-foreground mt-0.5" />
                              <div>
                                <p className="text-muted-foreground">{order.customer.notes}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h4 className="font-medium mb-3">Order Items</h4>
                        <div className="space-y-2">
                          {order.items.map((item) => (
                            <div key={item.id} className="flex justify-between text-sm">
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                              <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                          ))}
                          <div className="border-t pt-2 mt-2 font-medium flex justify-between">
                            <span>Total</span>
                            <span>${order.totalAmount.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-0 flex flex-wrap gap-2 justify-end border-t mt-4">
                      {order.status !== "cancelled" && order.status !== "delivered" && (
                        <Button
                          onClick={() => handleUpdateOrderStatus(order.id, "cancelled")}
                          variant="outline"
                          className="border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <XCircle className="mr-2 h-4 w-4" />
                          Cancel Order
                        </Button>
                      )}

                      {getNextStatus(order.status) && (
                        <Button
                          onClick={() => handleUpdateOrderStatus(order.id, getNextStatus(order.status)!)}
                          className="bg-primary"
                        >
                          {order.status === "pending" && (
                            <>
                              <Package className="mr-2 h-4 w-4" />
                              Start Preparing
                            </>
                          )}
                          {order.status === "preparing" && (
                            <>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Mark as Ready
                            </>
                          )}
                          {order.status === "ready" && (
                            <>
                              <Truck className="mr-2 h-4 w-4" />
                              Mark as Delivered
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

