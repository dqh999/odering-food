"use client"

import { AuthProvider } from "@/context/auth-provider"
import type React from "react"

export default function Providers({ children }: { children: React.ReactNode }) {
    return <AuthProvider>{children}</AuthProvider>
}

