import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const supabase = createServerSupabaseClient()

    // Check if email exists in registrations
    const { data, error } = await supabase.from("registrations").select("id").eq("email", normalizedEmail).maybeSingle()

    if (error) {
      console.error("Error checking email:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ exists: !!data })
  } catch (error: any) {
    console.error("Error in check-email-exists API:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const supabase = createServerSupabaseClient()

    // Check if email exists in registrations
    const { data, error } = await supabase.from("registrations").select("id").eq("email", normalizedEmail).maybeSingle()

    if (error) {
      console.error("Error checking email:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ exists: !!data })
  } catch (error: any) {
    console.error("Error in check-email-exists API:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
