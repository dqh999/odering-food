"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
}

interface MenuItemsProps {
  category: string
  onEdit: (item: MenuItem) => void
}

export function MenuItems({ category, onEdit }: MenuItemsProps) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<MenuItem | null>(null)

  // Mock menu items data
  const allItems: MenuItem[] = [
    {
      id: "1",
      name: "Classic Burger",
      description: "Beef patty with lettuce, tomato, and special sauce",
      price: 12.99,
      category: "main",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: "2",
      name: "Caesar Salad",
      description: "Romaine lettuce, croutons, parmesan cheese with Caesar dressing",
      price: 8.99,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: "3",
      name: "Chocolate Cake",
      description: "Rich chocolate cake with a layer of ganache",
      price: 6.99,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: "4",
      name: "Iced Coffee",
      description: "Cold brewed coffee served over ice",
      price: 3.99,
      category: "drinks",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: "5",
      name: "Margherita Pizza",
      description: "Tomato sauce, mozzarella, and fresh basil",
      price: 14.99,
      category: "main",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: "6",
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter and herbs",
      price: 4.99,
      category: "appetizers",
      image: "/placeholder.svg?height=200&width=200",
      available: false,
    },
    {
      id: "7",
      name: "Tiramisu",
      description: "Coffee-flavored Italian dessert",
      price: 7.99,
      category: "desserts",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
    {
      id: "8",
      name: "Fresh Lemonade",
      description: "Freshly squeezed lemons with sugar and water",
      price: 2.99,
      category: "drinks",
      image: "/placeholder.svg?height=200&width=200",
      available: true,
    },
  ]

  const filteredItems = category === "all" ? allItems : allItems.filter((item) => item.category === category)

  const handleDelete = (item: MenuItem) => {
    setItemToDelete(item)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the item
    console.log(`Deleting item: ${itemToDelete?.name}`)
    setDeleteDialogOpen(false)
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="aspect-video w-full overflow-hidden">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={300}
                height={200}
                className="h-full w-full object-cover transition-all hover:scale-105"
              />
            </div>
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <Badge variant={item.available ? "default" : "outline"}>
                  {item.available ? "Available" : "Unavailable"}
                </Badge>
              </div>
              <CardDescription className="line-clamp-2 h-10">{item.description}</CardDescription>
            </CardHeader>
            <CardContent className="p-4 pt-0">
              <div className="text-lg font-bold">${item.price.toFixed(2)}</div>
            </CardContent>
            <CardFooter className="flex justify-between p-4">
              <Button variant="outline" size="sm" onClick={() => onEdit(item)}>
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuItem onClick={() => onEdit(item)}>Edit item</DropdownMenuItem>
                  <DropdownMenuItem>{item.available ? "Mark as unavailable" : "Mark as available"}</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive" onClick={() => handleDelete(item)}>
                    <Trash className="mr-2 h-4 w-4" />
                    Delete item
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{itemToDelete?.name}"? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

