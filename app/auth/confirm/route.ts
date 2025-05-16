import type { EmailOtpType } from "@supabase/supabase-js"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { createClient } from "@supabase/supabase-js"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get("token_hash")
  const type = searchParams.get("type") as EmailOtpType | null
  const next = searchParams.get("next") ?? "/auth/reset-password"

  // Validate parameters
  if (!token_hash || !type) {
    console.error("Missing parameters in auth confirm route:", { token_hash, type })
    return NextResponse.redirect(new URL(`/auth/error?error=missing_parameters`, request.url))
  }

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

  try {
    // Log the token verification attempt
    console.log("Verifying token:", { token_hash: token_hash.substring(0, 5) + "...", type })

    const { error } = await supabase.auth.verifyOtp({
      token_hash,
      type,
    })

    if (error) {
      console.error("Token verification error:", error)
      return NextResponse.redirect(new URL(`/auth/error?error=${encodeURIComponent(error.message)}`, request.url))
    }

    // If successful, redirect to the next page with the token parameters
    // This ensures the reset password page has access to the verified session
    return NextResponse.redirect(new URL(`${next}?token_hash=${token_hash}&type=${type}`, request.url))
  } catch (error: any) {
    console.error("Unexpected error in auth confirm route:", error)
    return NextResponse.redirect(new URL(`/auth/error?error=${encodeURIComponent(error.message)}`, request.url))
  }
}
