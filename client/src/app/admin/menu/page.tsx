"use client"

import { useState } from "react"
import Image from "next/image"
import { Plus, Pencil, Trash2, Search, ArrowUpDown, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Textarea } from "@/components/ui/textarea"

interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  available: boolean
  featured: boolean
  allergens: string[]
}

interface Category {
  id: number
  name: string
  description: string
}

export default function MenuManagementPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("items")
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "Appetizers", description: "Start your meal with these delicious options" },
    { id: 2, name: "Main Courses", description: "Delicious entrées prepared by our expert chefs" },
    { id: 3, name: "Desserts", description: "Sweet treats to end your meal" },
    { id: 4, name: "Drinks", description: "Refreshing beverages to complement your meal" },
    { id: 5, name: "Sides", description: "Perfect accompaniments to your main course" },
  ])

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Spring Rolls",
      description: "Fresh vegetables wrapped in rice paper",
      price: 6.99,
      category: "Appetizers",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      featured: true,
      allergens: ["Gluten"],
    },
    {
      id: 2,
      name: "Garlic Bread",
      description: "Toasted bread with garlic butter",
      price: 4.99,
      category: "Appetizers",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      featured: false,
      allergens: ["Gluten", "Dairy"],
    },
    {
      id: 3,
      name: "Chicken Wings",
      description: "Spicy chicken wings with dipping sauce",
      price: 8.99,
      category: "Appetizers",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      featured: true,
      allergens: [],
    },
    {
      id: 4,
      name: "Grilled Salmon",
      description: "Fresh salmon with lemon butter sauce",
      price: 18.99,
      category: "Main Courses",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      featured: true,
      allergens: ["Fish", "Dairy"],
    },
    {
      id: 5,
      name: "Beef Steak",
      description: "Tender beef steak with vegetables",
      price: 22.99,
      category: "Main Courses",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      featured: true,
      allergens: [],
    },
    {
      id: 6,
      name: "Vegetable Pasta",
      description: "Pasta with seasonal vegetables",
      price: 14.99,
      category: "Main Courses",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      featured: false,
      allergens: ["Gluten"],
    },
    {
      id: 7,
      name: "Chocolate Cake",
      description: "Rich chocolate cake with ice cream",
      price: 7.99,
      category: "Desserts",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      featured: true,
      allergens: ["Gluten", "Dairy", "Eggs"],
    },
    {
      id: 8,
      name: "Cheesecake",
      description: "Creamy cheesecake with berry compote",
      price: 6.99,
      category: "Desserts",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      featured: false,
      allergens: ["Dairy", "Eggs", "Gluten"],
    },
  ])

  const [newMenuItem, setNewMenuItem] = useState<Omit<MenuItem, "id">>({
    name: "",
    description: "",
    price: 0,
    category: "",
    image: "/placeholder.svg?height=100&width=100",
    available: true,
    featured: false,
    allergens: [],
  })

  const [newCategory, setNewCategory] = useState<Omit<Category, "id">>({
    name: "",
    description: "",
  })

  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [isAddItemDialogOpen, setIsAddItemDialogOpen] = useState(false)
  const [isAddCategoryDialogOpen, setIsAddCategoryDialogOpen] = useState(false)
  const [isEditItemDialogOpen, setIsEditItemDialogOpen] = useState(false)
  const [isEditCategoryDialogOpen, setIsEditCategoryDialogOpen] = useState(false)
  const [itemToDelete, setItemToDelete] = useState<number | null>(null)
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)

  // Filter and sort menu items
  const filteredItems = menuItems
    .filter(
      (item) =>
        (categoryFilter === "all" || item.category === categoryFilter) &&
        (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.price - b.price
      } else {
        return b.price - a.price
      }
    })

  const handleAddMenuItem = () => {
    const id = Math.max(0, ...menuItems.map((item) => item.id)) + 1
    setMenuItems([...menuItems, { id, ...newMenuItem }])
    setNewMenuItem({
      name: "",
      description: "",
      price: 0,
      category: "",
      image: "/placeholder.svg?height=100&width=100",
      available: true,
      featured: false,
      allergens: [],
    })
    setIsAddItemDialogOpen(false)
    toast({
      title: "Menu item added",
      description: `${newMenuItem.name} has been added to the menu.`,
    })
  }

  const handleAddCategory = () => {
    const id = Math.max(0, ...categories.map((cat) => cat.id)) + 1
    setCategories([...categories, { id, ...newCategory }])
    setNewCategory({
      name: "",
      description: "",
    })
    setIsAddCategoryDialogOpen(false)
    toast({
      title: "Category added",
      description: `${newCategory.name} has been added to the menu.`,
    })
  }

  const handleEditMenuItem = () => {
    if (!editingItem) return

    setMenuItems(menuItems.map((item) => (item.id === editingItem.id ? editingItem : item)))
    setIsEditItemDialogOpen(false)
    toast({
      title: "Menu item updated",
      description: `${editingItem.name} has been updated successfully.`,
    })
  }

  const handleEditCategory = () => {
    if (!editingCategory) return

    setCategories(categories.map((category) => (category.id === editingCategory.id ? editingCategory : category)))

    // Also update category name in menu items
    const oldCategoryName = categories.find((c) => c.id === editingCategory.id)?.name
    if (oldCategoryName && oldCategoryName !== editingCategory.name) {
      setMenuItems(
        menuItems.map((item) =>
          item.category === oldCategoryName ? { ...item, category: editingCategory.name } : item,
        ),
      )
    }

    setIsEditCategoryDialogOpen(false)
    toast({
      title: "Category updated",
      description: `${editingCategory.name} has been updated successfully.`,
    })
  }

  const handleDeleteMenuItem = (id: number) => {
    setMenuItems(menuItems.filter((item) => item.id !== id))
    setItemToDelete(null)
    toast({
      title: "Menu item deleted",
      description: "The menu item has been deleted successfully.",
    })
  }

  const handleDeleteCategory = (id: number) => {
    const categoryName = categories.find((c) => c.id === id)?.name
    setCategories(categories.filter((category) => category.id !== id))

    // Set affected menu items to uncategorized
    if (categoryName) {
      setMenuItems(
        menuItems.map((item) => (item.category === categoryName ? { ...item, category: "Uncategorized" } : item)),
      )
    }

    setCategoryToDelete(null)
    toast({
      title: "Category deleted",
      description: "The category has been deleted successfully.",
    })
  }

  const toggleItemAvailability = (id: number) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, available: !item.available } : item)))

    const item = menuItems.find((item) => item.id === id)
    if (item) {
      toast({
        title: item.available ? "Item unavailable" : "Item available",
        description: `${item.name} is now ${item.available ? "unavailable" : "available"} on the menu.`,
      })
    }
  }

  const toggleItemFeatured = (id: number) => {
    setMenuItems(menuItems.map((item) => (item.id === id ? { ...item, featured: !item.featured } : item)))

    const item = menuItems.find((item) => item.id === id)
    if (item) {
      toast({
        title: item.featured ? "Removed from featured" : "Added to featured",
        description: `${item.name} has been ${item.featured ? "removed from" : "added to"} featured items.`,
      })
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Menu Management</h1>
          <p className="text-muted-foreground">Manage your restaurant's menu items and categories</p>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="items">Menu Items</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="items">
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <div className="flex flex-1 gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search menu items..."
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="icon"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
                className="flex-shrink-0"
              >
                <ArrowUpDown className="h-4 w-4" />
              </Button>
            </div>

            <Dialog open={isAddItemDialogOpen} onOpenChange={setIsAddItemDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Item
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Add Menu Item</DialogTitle>
                  <DialogDescription>Create a new item for your restaurant menu.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Item Name</Label>
                      <Input
                        id="name"
                        value={newMenuItem.name}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, name: e.target.value })}
                        placeholder="e.g. Chicken Parmesan"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="price">Price ($)</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={newMenuItem.price}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, price: Number.parseFloat(e.target.value) })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newMenuItem.description}
                      onChange={(e) => setNewMenuItem({ ...newMenuItem, description: e.target.value })}
                      placeholder="Describe the dish, ingredients, etc."
                      rows={3}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newMenuItem.category}
                        onValueChange={(value) => setNewMenuItem({ ...newMenuItem, category: value })}
                      >
                        <SelectTrigger id="category">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category.id} value={category.name}>
                              {category.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="allergens">Allergens</Label>
                      <Select
                        value={newMenuItem.allergens.join(",")}
                        onValueChange={(value) =>
                          setNewMenuItem({
                            ...newMenuItem,
                            allergens: value ? value.split(",") : [],
                          })
                        }
                      >
                        <SelectTrigger id="allergens">
                          <SelectValue placeholder="Select allergens">None</SelectValue>
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="">None</SelectItem>
                          <SelectItem value="Gluten">Gluten</SelectItem>
                          <SelectItem value="Dairy">Dairy</SelectItem>
                          <SelectItem value="Nuts">Nuts</SelectItem>
                          <SelectItem value="Eggs">Eggs</SelectItem>
                          <SelectItem value="Fish">Fish</SelectItem>
                          <SelectItem value="Shellfish">Shellfish</SelectItem>
                          <SelectItem value="Soy">Soy</SelectItem>
                          <SelectItem value="Gluten,Dairy">Gluten, Dairy</SelectItem>
                          <SelectItem value="Gluten,Dairy,Eggs">Gluten, Dairy, Eggs</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="available"
                        checked={newMenuItem.available}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, available: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="available">Available</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        checked={newMenuItem.featured}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, featured: e.target.checked })}
                        className="h-4 w-4 rounded border-gray-300"
                      />
                      <Label htmlFor="featured">Featured Item</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="image">Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="image"
                        value={newMenuItem.image}
                        onChange={(e) => setNewMenuItem({ ...newMenuItem, image: e.target.value })}
                        placeholder="/placeholder.svg?height=100&width=100"
                      />
                      <Button variant="outline" size="icon">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground">Enter an image URL or use the default placeholder</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddItemDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddMenuItem}>Add Item</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className={!item.available ? "opacity-70" : undefined}>
                <CardHeader className="p-0">
                  <div className="relative h-48 w-full">
                    <Image
                      src={item.image || "/placeholder.svg?height=200&width=200"}
                      alt={item.name}
                      fill
                      className="object-cover rounded-t-lg"
                    />
                    {item.featured && <Badge className="absolute top-2 left-2 bg-primary">Featured</Badge>}
                    {!item.available && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <Badge variant="outline" className="bg-red-100 text-red-800 border-red-300">
                          Unavailable
                        </Badge>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-medium text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground">{item.category}</p>
                    </div>
                    <div className="font-bold text-lg">${item.price.toFixed(2)}</div>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                  {item.allergens.length > 0 && (
                    <div className="mt-2">
                      <p className="text-xs text-muted-foreground">Allergens:</p>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.allergens.map((allergen) => (
                          <Badge key={allergen} variant="outline" className="text-xs">
                            {allergen}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => toggleItemAvailability(item.id)}>
                      {item.available ? "Mark Unavailable" : "Mark Available"}
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => toggleItemFeatured(item.id)}>
                      {item.featured ? "Unfeature" : "Feature"}
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Dialog
                      open={isEditItemDialogOpen && editingItem?.id === item.id}
                      onOpenChange={(open) => {
                        setIsEditItemDialogOpen(open)
                        if (open) setEditingItem(item)
                      }}
                    >
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Edit Menu Item</DialogTitle>
                          <DialogDescription>Update the details of this menu item.</DialogDescription>
                        </DialogHeader>
                        {editingItem && (
                          <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-name">Item Name</Label>
                                <Input
                                  id="edit-name"
                                  value={editingItem.name}
                                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-price">Price ($)</Label>
                                <Input
                                  id="edit-price"
                                  type="number"
                                  step="0.01"
                                  min="0"
                                  value={editingItem.price}
                                  onChange={(e) =>
                                    setEditingItem({ ...editingItem, price: Number.parseFloat(e.target.value) })
                                  }
                                />
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="edit-description">Description</Label>
                              <Textarea
                                id="edit-description"
                                value={editingItem.description}
                                onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                                rows={3}
                              />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-2">
                                <Label htmlFor="edit-category">Category</Label>
                                <Select
                                  value={editingItem.category}
                                  onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                                >
                                  <SelectTrigger id="edit-category">
                                    <SelectValue placeholder="Select category" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {categories.map((category) => (
                                      <SelectItem key={category.id} value={category.name}>
                                        {category.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="edit-allergens">Allergens</Label>
                                <Select
                                  value={editingItem.allergens.join(",")}
                                  onValueChange={(value) =>
                                    setEditingItem({
                                      ...editingItem,
                                      allergens: value ? value.split(",") : [],
                                    })
                                  }
                                >
                                  <SelectTrigger id="edit-allergens">
                                    <SelectValue placeholder="Select allergens">None</SelectValue>
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="">None</SelectItem>
                                    <SelectItem value="Gluten">Gluten</SelectItem>
                                    <SelectItem value="Dairy">Dairy</SelectItem>
                                    <SelectItem value="Nuts">Nuts</SelectItem>
                                    <SelectItem value="Eggs">Eggs</SelectItem>
                                    <SelectItem value="Fish">Fish</SelectItem>
                                    <SelectItem value="Shellfish">Shellfish</SelectItem>
                                    <SelectItem value="Soy">Soy</SelectItem>
                                    <SelectItem value="Gluten,Dairy">Gluten, Dairy</SelectItem>
                                    <SelectItem value="Gluten,Dairy,Eggs">Gluten, Dairy, Eggs</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="edit-available"
                                  checked={editingItem.available}
                                  onChange={(e) => setEditingItem({ ...editingItem, available: e.target.checked })}
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                <Label htmlFor="edit-available">Available</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  id="edit-featured"
                                  checked={editingItem.featured}
                                  onChange={(e) => setEditingItem({ ...editingItem, featured: e.target.checked })}
                                  className="h-4 w-4 rounded border-gray-300"
                                />
                                <Label htmlFor="edit-featured">Featured Item</Label>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="edit-image">Image URL</Label>
                              <div className="flex gap-2">
                                <Input
                                  id="edit-image"
                                  value={editingItem.image}
                                  onChange={(e) => setEditingItem({ ...editingItem, image: e.target.value })}
                                />
                                <Button variant="outline" size="icon">
                                  <ImageIcon className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                        <DialogFooter>
                          <Button variant="outline" onClick={() => setIsEditItemDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleEditMenuItem}>Save Changes</Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will permanently delete {item.name} from your menu. This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction onClick={() => handleDeleteMenuItem(item.id)}>Delete</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Menu Categories</h2>
            <Dialog open={isAddCategoryDialogOpen} onOpenChange={setIsAddCategoryDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Category</DialogTitle>
                  <DialogDescription>Create a new category for your menu items.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category-name">Category Name</Label>
                    <Input
                      id="category-name"
                      value={newCategory.name}
                      onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                      placeholder="e.g. Breakfast"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="category-description">Description</Label>
                    <Textarea
                      id="category-description"
                      value={newCategory.description}
                      onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                      placeholder="Describe this category"
                      rows={3}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddCategoryDialogOpen(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleAddCategory}>Add Category</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {categories.map((category) => (
              <Card key={category.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{category.name}</CardTitle>
                    <div className="flex gap-2">
                      <Dialog
                        open={isEditCategoryDialogOpen && editingCategory?.id === category.id}
                        onOpenChange={(open) => {
                          setIsEditCategoryDialogOpen(open)
                          if (open) setEditingCategory(category)
                        }}
                      >
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                            <DialogDescription>Update category information.</DialogDescription>
                          </DialogHeader>
                          {editingCategory && (
                            <div className="grid gap-4 py-4">
                              <div className="grid gap-2">
                                <Label htmlFor="edit-category-name">Category Name</Label>
                                <Input
                                  id="edit-category-name"
                                  value={editingCategory.name}
                                  onChange={(e) => setEditingCategory({ ...editingCategory, name: e.target.value })}
                                />
                              </div>
                              <div className="grid gap-2">
                                <Label htmlFor="edit-category-description">Description</Label>
                                <Textarea
                                  id="edit-category-description"
                                  value={editingCategory.description}
                                  onChange={(e) =>
                                    setEditingCategory({ ...editingCategory, description: e.target.value })
                                  }
                                  rows={3}
                                />
                              </div>
                            </div>
                          )}
                          <DialogFooter>
                            <Button variant="outline" onClick={() => setIsEditCategoryDialogOpen(false)}>
                              Cancel
                            </Button>
                            <Button onClick={handleEditCategory}>Save Changes</Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will delete the {category.name} category. Items in this category will be set to
                              "Uncategorized".
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteCategory(category.id)}>
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{category.description}</p>
                  <div className="mt-2">
                    <p className="text-sm font-medium">
                      Items in this category: {menuItems.filter((item) => item.category === category.name).length}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

