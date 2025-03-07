"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartNotification } from "../cart/cart-notification"
import { useCart } from "../../../context/cart-provider"
import { MenuItem } from "@/lib/types/menu"
import { MenuItemCard } from "./menu-item-card"
interface BestsellersProps {
  bestsellers: MenuItem[]
  loading: boolean
  error: string | null
}
export function Bestsellers({ bestsellers, loading, error }: BestsellersProps) {
  const { items, addItem, updateQuantity, removeItem } = useCart()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [notification, setNotification] = useState({
    isOpen: false,
    itemName: "",
  })

  if (loading) return <p>Loading bestsellers...</p>

  const visibleItems = 3
  const maxIndex = bestsellers.length - visibleItems

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex))
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0))
  }

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.imageURL,
    })

    setNotification({
      isOpen: true,
      itemName: item.name,
    })
  }

  const closeNotification = () => {
    setNotification({
      isOpen: false,
      itemName: "",
    })
  }

  const getCartItem = (itemId: string) => {
    return items.find((item) => item.id === itemId)
  }

  return (
    <section className="py-8" id="bestsellers">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold md:text-3xl">Bestsellers</h2>
          <p className="text-muted-foreground">Our most popular dishes that customers love</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevSlide} disabled={currentIndex === 0}>
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} disabled={currentIndex >= maxIndex}>
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        <div className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}>
          {bestsellers.map((item) => (
            <div key={item.id} className="w-full px-2 sm:w-1/2 md:w-1/3 flex-shrink-0">
              <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />

            </div>
          ))}
        </div>
      </div>

      <CartNotification isOpen={notification.isOpen} onClose={closeNotification} itemName={notification.itemName} />
    </section>
  )
}

