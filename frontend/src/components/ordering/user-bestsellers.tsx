"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CartNotification } from "./cart-notification"
import { useCart } from "./cart-provider"
import { MenuItem } from "@/lib/types"
import { MenuItemCard } from "./menu-item-card"

export function UserBestsellers() {
  const { items, addItem, updateQuantity, removeItem } = useCart()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [notification, setNotification] = useState({
    isOpen: false,
    itemName: "",
  })

  const bestsellers: MenuItem[] = [
    {
      id: "bs1",
      name: "Signature Burger",
      description: "Our famous beef patty with special sauce, lettuce, cheese, pickles, and onions",
      price: 12.99,
      category: "",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
    {
      id: "bs2",
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, fresh mozzarella, and basil",
      price: 14.99,
      category: "",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
    {
      id: "bs3",
      name: "Chicken Alfredo Pasta",
      description: "Creamy alfredo sauce with grilled chicken and fettuccine pasta",
      price: 16.99,
      category: "",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
    {
      id: "bs4",
      name: "Chocolate Lava Cake",
      description: "Warm chocolate cake with a molten chocolate center, served with vanilla ice cream",
      price: 7.99,
      category: "",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
    {
      id: "bs5",
      name: "Fresh Fruit Smoothie",
      description: "Blend of seasonal fruits with yogurt and honey",
      price: 5.99,
      category: "",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
  ]

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
      image: item.image,
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

