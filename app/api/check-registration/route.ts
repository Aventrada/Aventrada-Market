import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email parameter is required" }, { status: 400 })
    }

    // Create server-side Supabase client with admin privileges
    const supabase = createServerSupabaseClient()

    // Check if registration exists
    const { data: registration, error } = await supabase
      .from("registrations")
      .select("*")
      .eq("email", email.toLowerCase())
      .single()

    if (error && error.code !== "PGRST116") {
      // PGRST116 is "no rows returned" error
      throw error
    }

    // Get all registrations for debugging
    const { data: allRegistrations } = await supabase
      .from("registrations")
      .select("id, email, status, full_name")
      .limit(10)

    return NextResponse.json({
      registration: registration || null,
      exists: !!registration,
      approved: registration?.status === "approved",
      allRegistrations: allRegistrations || [],
    })
  } catch (error: any) {
    console.error("Error checking registration:", error)
    return NextResponse.json({ error: `Failed to check registration: ${error.message}` }, { status: 500 })
  }
}
