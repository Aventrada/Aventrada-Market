"use server"

import { createServerSupabaseClient } from "@/lib/supabase"

export async function createRegistrationRecord(email: string, fullName: string, phoneNumber = "") {
  try {
    const supabase = createServerSupabaseClient()

    // Always use lowercase email for consistency
    const normalizedEmail = email.toLowerCase()

    // Check if registration already exists (case insensitive)
    const { data: existingReg, error: checkError } = await supabase
      .from("registrations")
      .select("id, status, phone_number")
      .ilike("email", normalizedEmail)
      .maybeSingle()

    if (checkError) {
      console.error("Error checking existing registration:", checkError)
      return { success: false, error: `Error verificando registro: ${checkError.message}` }
    }

    // If registration exists, return it
    if (existingReg) {
      // Si existe pero está pendiente, actualizarlo a aprobado
      if (existingReg.status !== "approved") {
        const { error: updateError } = await supabase
          .from("registrations")
          .update({
            status: "approved",
            updated_at: new Date().toISOString(),
          })
          .eq("id", existingReg.id)

        if (updateError) {
          console.error("Error updating registration status:", updateError)
          return { success: false, error: `Error actualizando estado: ${updateError.message}` }
        }
      }

      return {
        success: true,
        id: existingReg.id,
        status: "approved",
        message: "El registro ya existe y está aprobado",
      }
    }

    // Create new registration with server-side client (bypasses RLS)
    const { data, error } = await supabase
      .from("registrations")
      .insert({
        email: normalizedEmail,
        full_name: fullName || "Usuario",
        phone_number: phoneNumber || "No proporcionado", // Valor por defecto para phone_number
        status: "approved", // Cambiado a "approved" para acceso inmediato
        created_at: new Date().toISOString(),
      })
      .select("id")
      .single()

    if (error) {
      console.error("Server error creating registration:", error)
      return { success: false, error: `Error creando registro: ${error.message}` }
    }

    return { success: true, id: data.id, status: "approved" }
  } catch (error: any) {
    console.error("Unexpected error in createRegistrationRecord:", error)
    return { success: false, error: error.message || "Error inesperado al crear registro" }
  }
}
