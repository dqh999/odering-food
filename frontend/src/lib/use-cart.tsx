"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"

export interface MenuItem {
  id: number
  name: string
  description: string
  price: number
  category: string
  image?: string
}

export interface CartItem extends MenuItem {
  quantity: number
}

interface CartContextType {
  cart: CartItem[]
  addToCart: (item: MenuItem) => void
  removeFromCart: (itemId: number) => void
  clearCart: () => void
  getItemQuantity: (itemId: number) => number
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
  clearCart: () => { },
  getItemQuantity: () => 0,
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart")
      setCart(savedCart ? JSON.parse(savedCart) : [])
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      try {
        localStorage.setItem("cart", JSON.stringify(cart))
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error)
      }
    }
  }, [cart, isLoading])

  const addToCart = (item: MenuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id)

      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem,
        )
      } else {
        return [...prevCart, { ...item, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (itemId: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId)

      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) => (item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item))
      } else {
        return prevCart.filter((item) => item.id !== itemId)
      }
    })
  }

  const clearCart = () => {
    setCart([])
  }

  const getItemQuantity = (itemId: number) => {
    const item = cart.find((item) => item.id === itemId)
    return item ? item.quantity : 0
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        getItemQuantity,
      }}
    >
      {!isLoading && children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
