"use client"

import { User } from "@/lib/types/user"
import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

interface AuthContextType {
    user: User | null
    token: string | null
    isAuthenticated: boolean
    isLoading: boolean
    setAuth: (token: string, userData: User) => void
    logout: () => void
    updateUser: (userData: Partial<User>) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const isAuthenticated = !!user && !!token

    useEffect(() => {
        const initializeAuth = () => {
            setIsLoading(true)
            try {
                const savedToken = localStorage.getItem("authToken")
                const savedUser = localStorage.getItem("authUser")

                if (savedToken && savedUser) {
                    setToken(savedToken)
                    setUser(JSON.parse(savedUser))
                } else {
                    setToken(null)
                    setUser(null)
                }
            } catch (err) {
                console.error("Failed to initialize auth:", err)
                localStorage.removeItem("authToken")
                localStorage.removeItem("authUser")
                setToken(null)
                setUser(null)
            } finally {
                setIsLoading(false)
            }
        }

        initializeAuth()
    }, [])

    const setAuth = (newToken: string, userData: User) => {
        setToken(newToken)
        setUser(userData)

        localStorage.setItem("authToken", newToken)
        localStorage.setItem("authUser", JSON.stringify(userData))
    }

    const logout = () => {
        setToken(null)
        setUser(null)

        localStorage.removeItem("authToken")
        localStorage.removeItem("authUser")
    }

    const updateUser = (userData: Partial<User>) => {
        if (!user) return

        const updatedUser = { ...user, ...userData }
        setUser(updatedUser)

        localStorage.setItem("authUser", JSON.stringify(updatedUser))
    }

    const contextValue: AuthContextType = {
        user,
        token,
        isAuthenticated,
        isLoading,
        setAuth,
        logout,
        updateUser,
    }

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}

