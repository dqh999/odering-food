import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  try {
    // In a real implementation, you would exchange the code for tokens
    // and validate the user with your backend

    // For demo purposes, we'll just redirect to the dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
  } catch (error) {
    console.error("Error during Google authentication:", error)
    return NextResponse.redirect(new URL("/login?error=auth_failed", request.url))
  }
}

