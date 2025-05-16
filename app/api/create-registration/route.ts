import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, fullName, phoneNumber } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Create server-side Supabase client with admin privileges
    const supabase = createServerSupabaseClient()

    // Normalize email
    const normalizedEmail = email.toLowerCase().trim()

    // Check if registration already exists
    const { data: existingRegistration, error: checkError } = await supabase
      .from("registrations")
      .select("id, status, phone_number")
      .eq("email", normalizedEmail)
      .single()

    if (checkError && !checkError.message.includes("No rows found")) {
      console.error("Error checking registration:", checkError)
      return NextResponse.json({ error: `Error checking registration: ${checkError.message}` }, { status: 500 })
    }

    let id, status

    if (existingRegistration) {
      // Si existe pero está pendiente, actualizarlo a aprobado
      if (existingRegistration.status !== "approved") {
        const { error: updateError } = await supabase
          .from("registrations")
          .update({
            status: "approved",
            full_name: fullName || existingRegistration.full_name,
            phone_number: phoneNumber || existingRegistration.phone_number || "No proporcionado",
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingRegistration.id)

        if (updateError) {
          console.error("Error updating registration status:", updateError)
          return NextResponse.json({ error: `Error updating status: ${updateError.message}` }, { status: 500 })
        }
      } else {
        // Solo actualizar otros campos si ya está aprobado
        const { error: updateError } = await supabase
          .from("registrations")
          .update({
            full_name: fullName || existingRegistration.full_name,
            phone_number: phoneNumber || existingRegistration.phone_number || "No proporcionado",
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingRegistration.id)

        if (updateError) {
          console.error("Error updating registration:", updateError)
          return NextResponse.json({ error: `Error updating registration: ${updateError.message}` }, { status: 500 })
        }
      }

      id = existingRegistration.id
      status = "approved"
    } else {
      // Create new registration
      const { data, error } = await supabase
        .from("registrations")
        .insert({
          email: normalizedEmail,
          full_name: fullName || "Usuario",
          phone_number: phoneNumber || "No proporcionado", // Valor por defecto para phone_number
          status: "approved", // Cambiado a "approved" para acceso inmediato
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select("id, status")
        .single()

      if (error) {
        console.error("Error creating registration:", error)
        throw error
      }

      id = data.id
      status = data.status
    }

    return NextResponse.json({ success: true, id, status })
  } catch (error: any) {
    console.error("Error in create-registration API:", error)
    return NextResponse.json({ error: `Failed to create registration: ${error.message}` }, { status: 500 })
  }
}
