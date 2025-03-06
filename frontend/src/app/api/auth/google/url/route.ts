import { NextResponse } from "next/server"

export async function GET() {
  // This would typically fetch the Google OAuth URL from your backend
  // For demo purposes, we're returning a mock URL
  const googleAuthUrl =
    "https://accounts.google.com/o/oauth2/v2/auth?" +
    "client_id=YOUR_GOOGLE_CLIENT_ID" +
    "&redirect_uri=http://localhost:3000/api/auth/callback/google" +
    "&response_type=code" +
    "&scope=email profile" +
    "&access_type=offline" +
    "&prompt=consent"

  return NextResponse.json({ url: googleAuthUrl })
}

