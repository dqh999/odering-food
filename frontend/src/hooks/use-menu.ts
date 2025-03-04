"use client"

import { useEffect, useState, useRef } from "react"
import { useSearchParams } from "next/navigation"
import { useCart } from "@/lib/use-cart"
import { menuItems } from "@/lib/menu-data"

export function useMenu() {
    const searchParams = useSearchParams()
    const tableId = searchParams.get("table") || "1"
    const { cart, addToCart, removeFromCart, getItemQuantity } = useCart()
    const [cartItemCount, setCartItemCount] = useState(0)
    const [searchQuery, setSearchQuery] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("")
    const [isScrolled, setIsScrolled] = useState(false)
    const menuRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        localStorage.setItem("tableId", tableId)
    }, [tableId])

    useEffect(() => {
        const count = cart.reduce((total, item) => total + item.quantity, 0)
        setCartItemCount(count)
    }, [cart])

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setIsScrolled(true)
            } else {
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const categories = [...new Set(menuItems.map((item) => item.category))]

    // Set initial selected category
    useEffect(() => {
        if (categories.length > 0 && !selectedCategory) {
            setSelectedCategory(categories[0])
        }
    }, [categories.length, categories[0], selectedCategory])

    // Filter menu items based on search query
    const filteredMenuItems =
        searchQuery.trim() === ""
            ? menuItems
            : menuItems.filter(
                (item) =>
                    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    item.description.toLowerCase().includes(searchQuery.toLowerCase()),
            )

    const scrollToCategory = (category: string) => {
        setSelectedCategory(category)
        const element = document.getElementById(`category-${category}`)
        if (element) {
            const yOffset = -100
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
            window.scrollTo({ top: y, behavior: "smooth" })
        }
    }

    return {
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
    }
}
