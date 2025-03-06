"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "../../../context/cart-provider"
import { CartNotification } from "../cart/cart-notification"
import { MenuItemCard } from "./menu-item-card"
import { MenuItem } from "@/lib/types/menu"
import { useMenu } from "@/hooks/ordering/use-menu"

interface MenuItemProps {
  menuItems: MenuItem[]
  loading: boolean
  error: string | null
}
export function MenuItems({ menuItems, loading, error }: MenuItemProps) {
  const { addItem } = useCart()
  const [activeTab, setActiveTab] = useState("all")
  const [notification, setNotification] = useState({
    isOpen: false,
    itemName: "",
  })
  if (loading) return <p>Loading menu...</p>

  const filteredItems = activeTab === "all" ? menuItems : menuItems.filter((item) => item.categoryId === activeTab)

  const handleAddToCart = (item: MenuItem) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1,
      image: item.imageURL,
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

