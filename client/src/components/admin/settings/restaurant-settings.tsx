"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Upload } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function RestaurantSettings() {
  const [formData, setFormData] = useState({
    name: "Restaurant Name",
    description: "A brief description of your restaurant and the cuisine you offer.",
    phone: "+1 (555) 123-4567",
    email: "contact@restaurant.com",
    address: "123 Main Street, City, State, ZIP",
    logo: "/placeholder.svg?height=100&width=100",
    currency: "USD",
    taxRate: "8.5",
    orderNumberPrefix: "ORD",
    enableOnlineOrdering: true,
    enableReservations: true,
  })
  const [logoPreview, setLogoPreview] = useState(formData.logo)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData((prev) => ({ ...prev, [name]: checked }))
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // In a real app, you would upload this file to a server
      // For now, we'll just create a local URL for preview
      const logoUrl = URL.createObjectURL(file)
      setLogoPreview(logoUrl)
      setFormData((prev) => ({ ...prev, logo: file }))
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-8 md:flex-row">
        <div className="flex flex-col items-center space-y-2">
          <div className="relative h-[100px] w-[100px] overflow-hidden rounded-full border">
            <Image src={logoPreview || "/placeholder.svg"} alt="Restaurant logo" fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 transition-opacity hover:opacity-100">
              <Label
                htmlFor="logo-upload"
                className="flex cursor-pointer items-center gap-1 rounded-md bg-white px-2 py-1 text-xs font-medium"
              >
                <Upload className="h-3 w-3" />
                Upload
              </Label>
              <Input id="logo-upload" type="file" accept="image/*" className="hidden" onChange={handleLogoChange} />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">Restaurant Logo</p>
        </div>

        <div className="flex-1 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Restaurant Name</Label>
              <Input id="name" name="name" value={formData.name} onChange={handleChange} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea id="address" name="address" value={formData.address} onChange={handleChange} rows={2} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={3}
            />
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="currency">Currency</Label>
          <Select value={formData.currency} onValueChange={(value) => handleSelectChange("currency", value)}>
            <SelectTrigger id="currency">
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="USD">USD ($)</SelectItem>
              <SelectItem value="EUR">EUR (€)</SelectItem>
              <SelectItem value="GBP">GBP (£)</SelectItem>
              <SelectItem value="JPY">JPY (¥)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="taxRate">Tax Rate (%)</Label>
          <Input
            id="taxRate"
            name="taxRate"
            type="number"
            step="0.1"
            min="0"
            value={formData.taxRate}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="orderNumberPrefix">Order Number Prefix</Label>
          <Input
            id="orderNumberPrefix"
            name="orderNumberPrefix"
            value={formData.orderNumberPrefix}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="enableOnlineOrdering"
            checked={formData.enableOnlineOrdering}
            onCheckedChange={(checked) => handleSwitchChange("enableOnlineOrdering", checked)}
          />
          <Label htmlFor="enableOnlineOrdering">Enable Online Ordering</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch
            id="enableReservations"
            checked={formData.enableReservations}
            onCheckedChange={(checked) => handleSwitchChange("enableReservations", checked)}
          />
          <Label htmlFor="enableReservations">Enable Table Reservations</Label>
        </div>
      </div>
    </div>
  )
}

