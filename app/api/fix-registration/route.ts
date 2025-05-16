import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const supabase = createServerSupabaseClient()

    // Check if registration exists
    const { data: existingReg, error: checkError } = await supabase
      .from("registrations")
      .select("id, status")
      .ilike("email", normalizedEmail)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking registration:", checkError)
      return NextResponse.json({ error: "Database error" }, { status: 500 })
    }

    let result

    if (existingReg) {
      // Update existing registration
      const { data, error } = await supabase
        .from("registrations")
        .update({
          status: "approved",
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingReg.id)
        .select()

      if (error) {
        console.error("Error updating registration:", error)
        return NextResponse.json({ error: "Failed to update registration" }, { status: 500 })
      }

      result = { action: "updated", id: existingReg.id }
    } else {
      // Create new registration
      const { data, error } = await supabase
        .from("registrations")
        .insert({
          email: normalizedEmail,
          full_name: "Auto-created",
          status: "approved",
          created_at: new Date().toISOString(),
        })
        .select()

      if (error) {
        console.error("Error creating registration:", error)
        return NextResponse.json({ error: "Failed to create registration" }, { status: 500 })
      }

      result = { action: "created", id: data?.[0]?.id }
    }

    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error("Unexpected error:", error)
    return NextResponse.json({ error: "Server error" }, { status: 500 })
  }
}
