"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/lib/cart-context"
import { useApi } from "@/lib/use-api"

export default function CartPage() {
  const { items, updateQuantity, removeFromCart, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  })

  const {
    isLoading,
    execute: placeOrder,
    error,
  } = useApi({
    endpoint: "/orders",
    method: "POST",
    showToast: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitOrder = async () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Missing information",
        description: "Please provide your name and phone number.",
        variant: "destructive",
      })
      return
    }

    if (items.length === 0) {
      toast({
        title: "Empty cart",
        description: "Your cart is empty. Add some items before placing an order.",
        variant: "destructive",
      })
      return
    }

    const orderData = {
      customer: customerInfo,
      items: items,
      totalAmount: totalPrice,
      status: "pending",
    }

    const result = await placeOrder({
      body: JSON.stringify(orderData),
    })

    if (result) {
      toast({
        title: "Order placed successfully!",
        description: `Your order #${result.orderId || result.id} has been received.`,
      })

      clearCart()
      setCustomerInfo({
        name: "",
        phone: "",
        address: "",
        notes: "",
      })
    } else if (error) {
      toast({
        title: `Error: ${error.type}`,
        description: error.message,
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-6">
        <Link href="/" className="flex items-center text-muted-foreground hover:text-foreground">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Menu
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              {items.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Your cart is empty</p>
                  <Button asChild>
                    <Link href="/">Browse Menu</Link>
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b"
                    >
                      <div className="flex items-center gap-4 mb-3 sm:mb-0">
                        {item.image && (
                          <div className="relative h-16 w-16 rounded overflow-hidden flex-shrink-0">
                            <Image
                              src={item.image || "/placeholder.svg"}
                              alt={item.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 ml-auto">
                        <div className="flex items-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <div className="h-8 px-3 flex items-center justify-center border-y">{item.quantity}</div>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>

                        <div className="font-medium w-20 text-right">${(item.price * item.quantity).toFixed(2)}</div>

                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-destructive"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
            {items.length > 0 && (
              <CardFooter className="flex flex-col sm:flex-row justify-between gap-4">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <div className="text-lg font-bold">Total: ${totalPrice.toFixed(2)}</div>
              </CardFooter>
            )}
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Customer Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Your phone number"
                    required
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    placeholder="Your delivery address"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="notes">Special Instructions</Label>
                  <Input
                    id="notes"
                    name="notes"
                    value={customerInfo.notes}
                    onChange={handleInputChange}
                    placeholder="Any special requests or notes"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" disabled={isLoading || items.length === 0} onClick={handleSubmitOrder}>
                {isLoading ? "Processing..." : "Place Order"}
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

