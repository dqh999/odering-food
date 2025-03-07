"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { MenuItem } from "@/lib/types/menu"

interface MenuItemFormProps {
  item?: any
  onClose: () => void
}

export function MenuItemForm({ item, onClose }: MenuItemFormProps) {
  const [formData, setFormData] = useState<MenuItem>({
    id: item?.id || "",
    storeId: item?.storeId || "",
    categoryId: item?.category || "",
    name: item?.name || "",
    description: item?.description || "",
    price: item?.price || "",
    isPopular: item?.isPopular || false,
    isBestseller: item?.isBestseller || false,
    available: item?.available !== undefined ? item.available : true,
    imageURL: item?.imageURL || "/placeholder.svg?height=200&width=200",
  })
  const [imagePreview, setImagePreview] = useState(formData.imageURL)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (value: string) => {
    setFormData((prev) => ({ ...prev, category: value }))
  }

  const handleSwitchChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, available: checked }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImagePreview(imageUrl)
      setFormData((prev) => ({ ...prev, image: file }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // In a real app, you would send this data to your API
      console.log("Submitting menu item:", formData)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      onClose()
    } catch (error) {
      console.error("Error saving menu item:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <div className="flex justify-center">
          <div className="relative h-[200px] w-[200px] overflow-hidden rounded-md border">
            <Image src={imagePreview || "/placeholder.svg"} alt="Menu item preview" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
              <Label
                htmlFor="image-upload"
                className="flex cursor-pointer items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium"
              >
                <Upload className="h-4 w-4" />
                Upload Image
              </Label>
              <Input id="image-upload" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
            </div>
          </div>
        </div>
        <p className="text-center text-sm text-muted-foreground">Click to upload or drag and drop an image</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Item Name</Label>
          <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={formData.categoryId} onValueChange={handleSelectChange}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="appetizers">Appetizers</SelectItem>
              <SelectItem value="main">Main Courses</SelectItem>
              <SelectItem value="desserts">Desserts</SelectItem>
              <SelectItem value="drinks">Drinks</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end space-x-2">
          <div className="space-y-2">
            <Label htmlFor="available">Available</Label>
            <div className="flex items-center space-x-2">
              <Switch id="available" checked={formData.available} onCheckedChange={handleSwitchChange} />
              <Label htmlFor="available" className="cursor-pointer">
                {formData.available ? "Yes" : "No"}
              </Label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : item ? "Update Item" : "Add Item"}
        </Button>
      </div>
    </form>
  )
}

