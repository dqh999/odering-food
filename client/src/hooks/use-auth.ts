"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { accountService } from "@/services/account-service"
import type { User } from "@/lib/types/user"

export function useAuth() {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)
    const router = useRouter()

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (token) {
            setUser(JSON.parse(localStorage.getItem("user") || "null"))
        }
        setLoading(false)
    }, [])

    const login = async (loginType: string, code: string) => {
        try {
            const response = await accountService.oauth2Login({ loginType, code })
            setUser(response.user)
            localStorage.setItem("accessToken", response.token.accessToken)
            localStorage.setItem("refreshToken", response.token.refreshToken)
            localStorage.setItem("user", JSON.stringify(response.user))
            router.push("/")
        } catch (error) {
            console.error("Login failed:", error)
            router.push("/login")
            throw error
        }
    }

    const logout = () => {
        setUser(null)
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        localStorage.removeItem("user")
        router.push("/login")
    }

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem("refreshToken")
        if (!refreshToken) {
            throw new Error("No refresh token available")
        }
        try {
            const response = await accountService.refreshToken(refreshToken)
            setUser(response.user)
            localStorage.setItem("accessToken", response.token.accessToken)
            localStorage.setItem("refreshToken", response.token.refreshToken)
            localStorage.setItem("user", JSON.stringify(response.user))
            return response
        } catch (error) {
            console.error("Token refresh failed:", error)
            logout()
            throw error
        }
    }

    return { user, loading, login, logout, refreshToken }
}

