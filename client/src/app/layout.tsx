import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { AuthProvider } from "@/lib/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { Header } from "@/components/header"
import { CartBar } from "@/components/cart-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Delicious Restaurant",
  description: "Order delicious food online",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <CartBar />
              <Toaster />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}



import './globals.css'