import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const redirectTo = requestUrl.searchParams.get("redirectTo") || "/dashboard"

  if (code) {
    try {
      const cookieStore = cookies()
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

      // Create a Supabase client with the cookies
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.set({ name, value: "", ...options })
          },
        },
      })

      // Exchange the code for a session
      const { error } = await supabase.auth.exchangeCodeForSession(code)

      if (error) {
        console.error("Error exchanging code for session:", error)
        return NextResponse.redirect(new URL(`/auth/signin?error=${encodeURIComponent(error.message)}`, request.url))
      }

      // Get the session to verify it was created successfully
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (!session) {
        console.error("Session not created after code exchange")
        return NextResponse.redirect(new URL(`/auth/signin?error=session_creation_failed`, request.url))
      }

      // Log successful authentication
      console.log("Authentication successful, redirecting to:", redirectTo)

      // Redirect to the dashboard or the original URL the user was trying to access
      return NextResponse.redirect(new URL(redirectTo, request.url))
    } catch (error: any) {
      console.error("Unexpected error in auth callback:", error)
      return NextResponse.redirect(new URL(`/auth/signin?error=${encodeURIComponent(error.message)}`, request.url))
    }
  }

  // If no code is present, redirect to the signin page
  return NextResponse.redirect(new URL("/auth/signin", request.url))
}
