"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { ShoppingCart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"

export function CartBar() {
  const { items, totalItems, totalPrice } = useCart()
  const [isVisible, setIsVisible] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const pathname = usePathname()

  // Only show on menu pages and homepage
  const shouldShowOnPage = pathname === "/" || pathname.startsWith("/menu") || pathname.includes("/category")

  // Show cart bar when items are added and we're on the right page
  useEffect(() => {
    if (totalItems > 0 && shouldShowOnPage) {
      setIsVisible(true)
      // Auto-hide after 5 seconds if minimized
      if (isMinimized) {
        const timer = setTimeout(() => {
          setIsVisible(false)
        }, 5000)
        return () => clearTimeout(timer)
      }
    } else {
      setIsVisible(false)
    }
  }, [totalItems, isMinimized, shouldShowOnPage])

  if (!isVisible || !shouldShowOnPage) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-background border-t shadow-lg z-50 transition-all duration-300">
      {isMinimized ? (
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <Button variant="ghost" size="sm" className="flex items-center gap-2" onClick={() => setIsMinimized(false)}>
            <ShoppingCart className="h-4 w-4" />
            <span>{totalItems} items</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </Button>
          <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={() => setIsVisible(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              <span className="font-medium">
                {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
              </span>
            </div>

            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="font-bold text-lg">Total: ${totalPrice.toFixed(2)}</div>

              <div className="flex gap-2 ml-auto sm:ml-0">
                <Button variant="outline" size="sm" onClick={() => setIsMinimized(true)}>
                  Minimize
                </Button>

                <Button asChild size="sm">
                  <Link href="/cart">Checkout</Link>
                </Button>
              </div>
            </div>
          </div>

          {/* <div className="mt-3 pt-3 border-t grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-40 overflow-y-auto">
            {items.slice(0, 6).map((item) => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="truncate">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            {items.length > 6 && <div className="text-sm text-muted-foreground">+{items.length - 6} more items...</div>}
          </div> */}
        </div>
      )}
    </div>
  )
}

