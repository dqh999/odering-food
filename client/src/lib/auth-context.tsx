"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"

interface User {
  id: number
  name: string
  email: string
  role: "customer" | "admin"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error("Failed to parse user from localStorage:", error)
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    try {
      // In a real app, this would be an API call
      // For demo purposes, we'll simulate a successful login with hardcoded credentials
      if (email === "admin@example.com" && password === "admin123") {
        const adminUser: User = {
          id: 1,
          name: "Admin User",
          email: "admin@example.com",
          role: "admin",
        }
        setUser(adminUser)
        localStorage.setItem("user", JSON.stringify(adminUser))
        return true
      } else if (email === "user@example.com" && password === "user123") {
        const regularUser: User = {
          id: 2,
          name: "Regular User",
          email: "user@example.com",
          role: "customer",
        }
        setUser(regularUser)
        localStorage.setItem("user", JSON.stringify(regularUser))
        return true
      }
      return false
    } catch (error) {
      console.error("Login error:", error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    router.push("/")
  }

  const isAdmin = user?.role === "admin"

  return <AuthContext.Provider value={{ user, isLoading, login, logout, isAdmin }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

