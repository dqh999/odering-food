"use client"

import { CartProvider } from "@/context/cart-provider"
import type React from "react"

export default function Providers({ children }: { children: React.ReactNode }) {
    return <CartProvider>{children}</CartProvider>
}

