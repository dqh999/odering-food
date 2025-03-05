"use client"

import { cn } from "@/lib/utils"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Clock, CheckCircle2, Ban } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

// Mock order data for demonstration
const mockOrder = {
  id: "ORD001",
  table: "12",
  items: [
    {
      id: 1,
      name: "Beef Steak",
      quantity: 2,
      price: 250000,
      image: "/placeholder.svg?height=80&width=80&text=Beef+Steak",
    },
    {
      id: 2,
      name: "Caesar Salad",
      quantity: 1,
      price: 95000,
      image: "/placeholder.svg?height=80&width=80&text=Caesar+Salad",
    },
  ],
  status: "pending",
  subtotal: 595000,
  serviceFee: 29750,
  vat: 59500,
  total: 684250,
  time: "2024-03-03T10:30:00",
  paymentMethod: "counter",
  customerNotes: "Medium rare for the steak, please.",
}

export default function OrderDetailsPage() {
  const params = useParams()
  const { toast } = useToast()
  const [status, setStatus] = useState(mockOrder.status)
  const [isUpdating, setIsUpdating] = useState(false)

  const handleStatusUpdate = (newStatus: string) => {
    setIsUpdating(true)
    // Simulate API call
    setTimeout(() => {
      setStatus(newStatus)
      setIsUpdating(false)
      toast({
        title: "Status updated",
        description: `Order ${mockOrder.id} is now ${newStatus}`,
      })
    }, 500)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-50">
            Pending
          </Badge>
        )
      case "confirmed":
        return (
          <Badge variant="outline" className="bg-blue-50">
            Confirmed
          </Badge>
        )
      case "preparing":
        return (
          <Badge variant="outline" className="bg-blue-50">
            Preparing
          </Badge>
        )
      case "ready":
        return (
          <Badge variant="outline" className="bg-green-50">
            Ready
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="outline" className="bg-gray-50">
            Completed
          </Badge>
        )
      case "cancelled":
        return (
          <Badge variant="outline" className="bg-red-50">
            Cancelled
          </Badge>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-muted/10">
      <div className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-4">
            <Link href="/admin">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="font-semibold">Order Details</h1>
          </div>
          <div className="flex items-center gap-2">
            {status === "pending" && (
              <>
                <Button
                  variant="outline"
                  className="text-destructive"
                  onClick={() => handleStatusUpdate("cancelled")}
                  disabled={isUpdating}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  Cancel Order
                </Button>
                <Button onClick={() => handleStatusUpdate("confirmed")} disabled={isUpdating}>
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Confirm Order
                </Button>
              </>
            )}
            {status === "confirmed" && (
              <Button onClick={() => handleStatusUpdate("preparing")} disabled={isUpdating}>
                Start Preparing
              </Button>
            )}
            {status === "preparing" && (
              <Button onClick={() => handleStatusUpdate("ready")} disabled={isUpdating}>
                Mark as Ready
              </Button>
            )}
            {status === "ready" && (
              <Button onClick={() => handleStatusUpdate("completed")} disabled={isUpdating}>
                Complete Order
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container py-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-lg">Order {mockOrder.id}</CardTitle>
                {getStatusBadge(status)}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    {new Date(mockOrder.time).toLocaleString()}
                  </div>
                  <Badge variant="outline">Table {mockOrder.table}</Badge>
                </div>

                <Separator />

                <div className="space-y-4">
                  {mockOrder.items.map((item) => (
                    <div key={item.id} className="flex items-start gap-4">
                      <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium">{item.name}</h3>
                          <span className="text-muted-foreground">x{item.quantity}</span>
                        </div>
                        <div className="mt-1 text-sm text-muted-foreground">{item.price.toLocaleString()}đ each</div>
                        <div className="mt-1 font-medium">{(item.price * item.quantity).toLocaleString()}đ</div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{mockOrder.subtotal.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Service fee (5%)</span>
                    <span>{mockOrder.serviceFee.toLocaleString()}đ</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>VAT (10%)</span>
                    <span>{mockOrder.vat.toLocaleString()}đ</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>{mockOrder.total.toLocaleString()}đ</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {mockOrder.customerNotes && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{mockOrder.customerNotes}</p>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative space-y-4">
                  <div className="absolute left-2.5 top-0 h-full w-px bg-border" />

                  <div className="flex gap-3">
                    <div className="h-5 w-5 rounded-full border bg-background" />
                    <div className="flex-1 pt-0.5">
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-muted-foreground">{new Date(mockOrder.time).toLocaleString()}</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "h-5 w-5 rounded-full border",
                        status === "pending" ? "bg-background" : "bg-primary",
                      )}
                    />
                    <div className="flex-1 pt-0.5">
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-muted-foreground">Kitchen received the order</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "h-5 w-5 rounded-full border",
                        status === "pending" || status === "confirmed" ? "bg-background" : "bg-primary",
                      )}
                    />
                    <div className="flex-1 pt-0.5">
                      <p className="font-medium">Preparing</p>
                      <p className="text-sm text-muted-foreground">Your order is being prepared</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "h-5 w-5 rounded-full border",
                        status === "ready" || status === "completed" ? "bg-primary" : "bg-background",
                      )}
                    />
                    <div className="flex-1 pt-0.5">
                      <p className="font-medium">Ready to Serve</p>
                      <p className="text-sm text-muted-foreground">Your order is ready to be served</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div
                      className={cn(
                        "h-5 w-5 rounded-full border",
                        status === "completed" ? "bg-primary" : "bg-background",
                      )}
                    />
                    <div className="flex-1 pt-0.5">
                      <p className="font-medium">Completed</p>
                      <p className="text-sm text-muted-foreground">Order has been served and completed</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Method</span>
                  <Badge variant="outline">
                    {mockOrder.paymentMethod === "counter" ? "Pay at Counter" : "Card Payment"}
                  </Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment Status</span>
                  <Badge variant="outline" className="bg-yellow-50">
                    {mockOrder.paymentMethod === "counter" ? "Pending" : "Paid"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

