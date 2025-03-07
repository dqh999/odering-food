"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartContextType {
  items: CartItem[]
  tableId: string | null
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalPrice: number
  setTableId: (id: string) => void
  clearTableId: () => void
}

const DEFAULT_CART_ITEMS: CartItem[] = []
const DEFAULT_TABLE_ID: string | null = null

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(DEFAULT_CART_ITEMS)
  const [tableId, setTableIdState] = useState<string | null>(DEFAULT_TABLE_ID)
  const [totalPrice, setTotalPrice] = useState(0)
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const getLocalStorageItem = (key: string): string | null => {
      try {
        if (typeof window !== "undefined") {
          return localStorage.getItem(key)
        }
      } catch (error) {
        console.error(`Error accessing localStorage for key ${key}:`, error)
      }
      return null
    }

    const savedCart = getLocalStorageItem("cart")
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setItems(parsedCart)
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error)
        setItems(DEFAULT_CART_ITEMS)
      }
    } else {
      setItems(DEFAULT_CART_ITEMS)
    }

    const savedTableId = getLocalStorageItem("tableId")
    setTableIdState(savedTableId || DEFAULT_TABLE_ID)

    setIsInitialized(true)
  }, [])

  useEffect(() => {
    if (isInitialized) {
      try {
        localStorage.setItem("cart", JSON.stringify(items))
      } catch (error) {
        console.error("Failed to save cart to localStorage:", error)
      }

      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
      setTotalPrice(total)
    }
  }, [items, isInitialized])

  useEffect(() => {
    if (isInitialized) {
      try {
        if (tableId) {
          localStorage.setItem("tableId", tableId)
        } else {
          localStorage.removeItem("tableId")
        }
      } catch (error) {
        console.error("Failed to save tableId to localStorage:", error)
      }
    }
  }, [tableId, isInitialized])

  const addItem = (newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.id === newItem.id)

      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
        }
        return updatedItems
      } else {
        return [...prevItems, newItem]
      }
    })
  }

  const removeItem = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
  }

  const setTableId = (id: string) => {
    setTableIdState(id)
  }

  const clearTableId = () => {
    setTableIdState(null)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        tableId,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalPrice,
        setTableId,
        clearTableId,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

