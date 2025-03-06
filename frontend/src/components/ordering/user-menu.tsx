"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "./cart-provider"
import { CartNotification } from "./cart-notification"
import { MenuItemCard } from "./menu-item-card"
import { MenuItem } from "@/lib/types"

export function UserMenu() {
  const { items, addItem, updateQuantity, removeItem } = useCart()
  const [activeTab, setActiveTab] = useState("all")
  const [notification, setNotification] = useState({
    isOpen: false,
    itemName: "",
  })

  const menuItems: MenuItem[] = [
    {
      id: "1",
      name: "Classic Burger",
      description: "Beef patty with lettuce, tomato, and special sauce",
      price: 12.99,
      category: "main",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
    {
      id: "2",
      name: "Caesar Salad",
      description: "Romaine lettuce, croutons, parmesan cheese with Caesar dressing",
      price: 8.99,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
      popular: false,
    },
    {
      id: "3",
      name: "Chocolate Cake",
      description: "Rich chocolate cake with a layer of ganache",
      price: 6.99,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
    {
      id: "4",
      name: "Iced Coffee",
      description: "Cold brewed coffee served over ice",
      price: 3.99,
      category: "drinks",
      image: "/placeholder.svg?height=200&width=300",
      popular: false,
    },
    {
      id: "5",
      name: "Margherita Pizza",
      description: "Tomato sauce, mozzarella, and fresh basil",
      price: 14.99,
      category: "main",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
    {
      id: "6",
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs",
      price: 4.99,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
      popular: false,
    },
    {
      id: "7",
      name: "Tiramisu",
      description: "Coffee-flavored Italian dessert",
      price: 7.99,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
    {
      id: "8",
      name: "Fresh Lemonade",
      description: "Freshly squeezed lemons with sugar and water",
      price: 2.99,
      category: "drinks",
      image: "/placeholder.svg?height=200&width=300",
      popular: false,
    },
    {
      id: "9",
      name: "Chicken Wings",
      description: "Crispy wings with your choice of sauce",
      price: 10.99,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
    {
      id: "10",
      name: "Veggie Burger",
      description: "Plant-based patty with all the fixings",
      price: 11.99,
      category: "main",
      image: "/placeholder.svg?height=200&width=300",
      popular: false,
    },
    {
      id: "11",
      name: "Cheesecake",
      description: "Creamy cheesecake with berry compote",
      price: 6.99,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=300",
      popular: false,
    },
    {
      id: "12",
      name: "Mango Smoothie",
      description: "Fresh mango blended with yogurt and honey",
      price: 4.99,
      category: "drinks",
      image: "/placeholder.svg?height=200&width=300",
      popular: true,
    },
  ]

  const filteredItems = activeTab === "all" ? menuItems : menuItems.filter((item) => item.category === activeTab)

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.image,
    })

    // Show notification
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


  return (
    <section className="py-8" id="menu">
      <h2 className="text-2xl font-bold mb-6 md:text-3xl">Our Menu</h2>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6 w-full justify-start overflow-auto py-1 sm:justify-center">
          <TabsTrigger value="all">All Items</TabsTrigger>
          <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
          <TabsTrigger value="main">Main Courses</TabsTrigger>
          <TabsTrigger value="desserts">Desserts</TabsTrigger>
          <TabsTrigger value="drinks">Drinks</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-0">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} onAddToCart={handleAddToCart} />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <CartNotification isOpen={notification.isOpen} onClose={closeNotification} itemName={notification.itemName} />
    </section>
  )
}

