import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Create server-side Supabase client with admin privileges
    const supabase = createServerSupabaseClient()

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()

    // Check if registration exists
    const { data: registration, error } = await supabase
      .from("registrations")
      .select("id, status")
      .ilike("email", normalizedEmail)
      .maybeSingle()

    if (error) {
      console.error("Error checking registration:", error)
      return NextResponse.json({ error: `Error checking registration: ${error.message}` }, { status: 500 })
    }

    // Si no existe, devolver aprobado=true para permitir el registro directo
    if (!registration) {
      return NextResponse.json({
        exists: false,
        approved: true, // Cambiado a true para permitir registro directo
        status: null,
        id: null,
      })
    }

    // Si existe pero no está aprobado, actualizarlo a aprobado
    if (registration.status !== "approved") {
      const { error: updateError } = await supabase
        .from("registrations")
        .update({
          status: "approved",
          updated_at: new Date().toISOString(),
        })
        .eq("id", registration.id)

      if (updateError) {
        console.error("Error updating registration status:", updateError)
        return NextResponse.json({ error: `Error updating status: ${updateError.message}` }, { status: 500 })
      }

      registration.status = "approved"
    }

    return NextResponse.json({
      exists: true,
      approved: registration.status === "approved",
      status: registration.status,
      id: registration.id,
    })
  } catch (error: any) {
    console.error("Error in check-approved-email API:", error)
    return NextResponse.json({ error: `Failed to check email: ${error.message}` }, { status: 500 })
  }
}
