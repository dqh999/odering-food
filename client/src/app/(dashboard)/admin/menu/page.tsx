"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MenuItems } from "@/components/admin/menu/menu-items"
import { MenuItemForm } from "@/components/admin/menu/menu-item-form"

export default function MenuPage() {
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)

  const handleAddItem = () => {
    setEditingItem(null)
    setIsAddingItem(true)
  }

  const handleEditItem = (item: any) => {
    setEditingItem(item)
    setIsAddingItem(true)
  }

  const handleFormClose = () => {
    setIsAddingItem(false)
    setEditingItem(null)
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Menu Management</h1>
        <Button onClick={handleAddItem}>Add Menu Item</Button>
      </div>

      {isAddingItem ? (
        <Card>
          <CardHeader>
            <CardTitle>{editingItem ? "Edit Menu Item" : "Add New Menu Item"}</CardTitle>
            <CardDescription>
              {editingItem
                ? "Update the details of an existing menu item"
                : "Fill in the details to add a new item to your menu"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <MenuItemForm item={editingItem} onClose={handleFormClose} />
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Menu Items</CardTitle>
            <CardDescription>Manage your restaurant's menu items</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" className="space-y-4">
              <TabsList>
                <TabsTrigger value="all">All Items</TabsTrigger>
                <TabsTrigger value="appetizers">Appetizers</TabsTrigger>
                <TabsTrigger value="main">Main Courses</TabsTrigger>
                <TabsTrigger value="desserts">Desserts</TabsTrigger>
                <TabsTrigger value="drinks">Drinks</TabsTrigger>
              </TabsList>
              <TabsContent value="all">
                <MenuItems category="all" onEdit={handleEditItem} />
              </TabsContent>
              <TabsContent value="appetizers">
                <MenuItems category="appetizers" onEdit={handleEditItem} />
              </TabsContent>
              <TabsContent value="main">
                <MenuItems category="main" onEdit={handleEditItem} />
              </TabsContent>
              <TabsContent value="desserts">
                <MenuItems category="desserts" onEdit={handleEditItem} />
              </TabsContent>
              <TabsContent value="drinks">
                <MenuItems category="drinks" onEdit={handleEditItem} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

