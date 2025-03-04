"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/use-cart"

export default function CartPage() {
  const { cart, addToCart, removeFromCart, clearCart } = useCart()
  const [tableId, setTableId] = useState<string>("1")
  const [subtotal, setSubtotal] = useState(0)

  useEffect(() => {
    const storedTableId = localStorage.getItem("tableId") || "1"
    setTableId(storedTableId)
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setSubtotal(total)
  }, [cart])

  if (cart.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="w-full max-w-2xl mx-auto px-4">
          <div className="flex items-center py-4">
            <Link href="/menu">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h1 className="text-xl font-semibold ml-2">Your Cart</h1>
          </div>

          <div className="flex flex-col items-center justify-center text-center mt-12">
            <div className="mb-6">
              <div className="h-32 w-32 rounded-full bg-muted flex items-center justify-center mx-auto">
                <ShoppingCart className="h-16 w-16 text-muted-foreground" />
              </div>
            </div>
            <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8 max-w-md">
              Looks like you haven't added any items to your cart yet. Browse our menu to find something delicious!
            </p>
            <Link href="/menu">
              <Button size="lg" className="px-8">
                Browse Menu
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="sticky top-0 z-10 bg-background border-b w-full">
        <div className="w-full max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center">
              <Link href="/order/menu">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold ml-2">Your Cart</h1>
            </div>

            <Button variant="ghost" size="sm" className="text-destructive" onClick={() => clearCart()}>
              <Trash2 className="h-4 w-4 mr-2" />
              Clear
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full max-w-2xl mx-auto px-4 py-6">
        <Card>
          <CardContent className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Table #{tableId}</div>
              <div className="text-sm font-medium">{cart.reduce((total, item) => total + item.quantity, 0)} items</div>
            </div>

            <Separator />

            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex items-start gap-4">
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-md overflow-hidden">
                    <Image
                      src={item.image || `/placeholder.svg?height=80&width=80`}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium truncate">{item.name}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-1 mt-0.5">{item.description}</p>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-medium">{item.price.toLocaleString()}đ</span>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center">{item.quantity}</span>
                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => addToCart(item)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Separator className="my-4" />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Service fee (5%)</span>
                <span>{Math.round(subtotal * 0.05).toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>VAT (10%)</span>
                <span>{Math.round(subtotal * 0.1).toLocaleString()}đ</span>
              </div>
              <Separator className="my-2" />
              <div className="flex justify-between font-medium text-lg">
                <span>Total</span>
                <span>{Math.round(subtotal * 1.15).toLocaleString()}đ</span>
              </div>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <Link href="/order/checkout" className="w-full">
              <Button className="w-full" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

