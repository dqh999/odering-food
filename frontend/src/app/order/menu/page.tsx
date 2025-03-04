"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart, Plus, Minus, Search, Coffee, UtensilsCrossed, Soup, Cookie, Beef, ChefHat, Sparkles, Globe } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { motion, AnimatePresence } from "framer-motion"
import { useMenu } from "@/hooks/use-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"

const categoryIcons: { [key: string]: React.ReactNode } = {
  "Main Dishes": <UtensilsCrossed className="h-6 w-6" />,
  Appetizers: <ChefHat className="h-6 w-6" />,
  "Soups & Salads": <Soup className="h-6 w-6" />,
  Desserts: <Cookie className="h-6 w-6" />,
  Beverages: <Coffee className="h-6 w-6" />,
}

export default function MenuPage() {
  const {
    tableId,
    cartItemCount,
    searchQuery,
    setSearchQuery,
    selectedCategory,
    isScrolled,
    menuRef,
    categories,
    filteredMenuItems,
    scrollToCategory,
    addToCart,
    removeFromCart,
    getItemQuantity,
  } = useMenu()

  const [language, setLanguage] = useState("vi")

  return (
    <main className="w-full ">
      <div className="flex flex-col min-h-screen pb-16 w-full items-center" ref={menuRef}>
        <div
          className={cn(
            "sticky top-0 z-20 bg-background/60 backdrop-blur-xl border-b transition-all duration-200 flex flex-col items-center justify-center w-full",
            isScrolled && "bg-background/80 shadow-sm",
          )}
        >
          <div className="container flex items-center justify-between py-4 w-full px-4">
            <div className="flex items-center">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold ml-2">Menu</h1>
              <Badge variant="outline" className="ml-2">
                Table {tableId}
              </Badge>
            </div>

            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1">
                    <Globe className="h-4 w-4" />
                    <span>{language === "vi" ? "Tiếng Việt" : "English"}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setLanguage("vi")}>
                    🇻🇳 Tiếng Việt
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage("en")}>
                    🇬🇧 English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/order/cart">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {cartItemCount > 0 && (
                    <Badge
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0"
                      variant="default"
                    >
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </Link>
            </div>
          </div>

          <div className="container py-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search menu..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>

          <div className="container py-2  w-full">
            <ScrollArea className="w-full">
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => scrollToCategory(category)}
                    className={cn(
                      "relative px-4 py-2 rounded-full transition-all",
                      "hover:bg-accent hover:text-primary",
                      "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
                      selectedCategory === category ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {categoryIcons[category]}
                      <span className="whitespace-nowrap">{category}</span>
                    </div>
                  </button>
                ))}
              </div>
              <ScrollBar orientation="horizontal" className="invisible" />
            </ScrollArea>
          </div>
        </div>

        <div className="container py-6">
          <AnimatePresence mode="wait">
            {categories.map((category) => {
              const categoryItems = filteredMenuItems.filter((item) => item.category === category)

              if (categoryItems.length === 0) return null

              return (
                <motion.div
                  key={category}
                  id={`category-${category}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mb-12 last:mb-0"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-2xl bg-primary/10 text-primary">
                      {categoryIcons[category]}
                    </div>
                    <div>
                      <h2 className="text-2xl font-semibold tracking-tight">{category}</h2>
                      <p className="text-sm text-muted-foreground">{categoryItems.length} items available</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categoryItems.map((item) => {
                      const quantity = getItemQuantity(item.id)
                      const isNew = item.id % 3 === 0 // Just for demo
                      const isPopular = item.id % 5 === 0 // Just for demo

                      return (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Card className="group overflow-hidden h-full flex flex-col">
                            <div className="relative">
                              <div className="relative w-full pt-[56.25%] overflow-hidden">
                                <Image
                                  src={item.image || `/placeholder.svg?height=192&width=384`}
                                  alt={item.name}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                              </div>
                              <div className="absolute top-2 left-2 flex gap-2">
                                {isNew && (
                                  <Badge variant="default" className="bg-blue-500">
                                    <Sparkles className="h-3 w-3 mr-1" />
                                    New
                                  </Badge>
                                )}
                                {isPopular && (
                                  <Badge variant="default" className="bg-orange-500">
                                    <Beef className="h-3 w-3 mr-1" />
                                    Popular
                                  </Badge>
                                )}
                              </div>
                              {quantity > 0 && (
                                <div className="absolute top-2 right-2">
                                  <Badge variant="default" className="bg-primary">
                                    {quantity} in cart
                                  </Badge>
                                </div>
                              )}
                              {/* <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/0 to-background/0 group-hover:from-background/90 transition-all duration-300" /> */}
                            </div>
                            <CardContent className="relative p-4 flex flex-col flex-1">
                              <div className="flex-1">
                                <h3 className="font-medium text-lg leading-tight mb-1">{item.name}</h3>
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                              </div>
                              <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                <div className="space-y-1">
                                  <span className="font-medium text-lg">{item.price.toLocaleString()}đ</span>
                                  {isPopular && <div className="text-xs text-muted-foreground">⭐️ Highly rated</div>}
                                </div>

                                {quantity > 0 ? (
                                  <div className="flex items-center gap-3">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 rounded-full"
                                      onClick={() => removeFromCart(item.id)}
                                    >
                                      <Minus className="h-4 w-4" />
                                    </Button>
                                    <span className="w-4 text-center font-medium">{quantity}</span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      className="h-8 w-8 rounded-full"
                                      onClick={() => addToCart(item)}
                                    >
                                      <Plus className="h-4 w-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  <Button onClick={() => addToCart(item)} className="rounded-full">
                                    Add to Cart
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>

        {cartItemCount > 0 && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-xl border-t"
          >
            <div className="container max-w-full mx-auto px-4">
              <Link href="/order/cart" className="block max-w-3xl mx-auto">
                <Button className="w-full h-12 text-lg rounded-full">View Cart ({cartItemCount} items)</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </main>
  )
}
