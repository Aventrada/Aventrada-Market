"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { z } from "zod"

// Define validation schema with Spanish error messages
const registrationSchema = z.object({
  fullName: z.string().min(2, "El nombre completo debe tener al menos 2 caracteres"),
  email: z.string().email("Dirección de correo electrónico inválida"),
  phoneNumber: z.string().min(7, "El número de teléfono debe tener al menos 7 caracteres"),
  preferences: z.string().optional(),
})

export type RegistrationFormState = {
  success: boolean
  message: string
  errors?: {
    fullName?: string[]
    email?: string[]
    phoneNumber?: string[]
    preferences?: string[]
  }
}

export async function submitRegistration(
  prevState: RegistrationFormState,
  formData: FormData,
): Promise<RegistrationFormState> {
  // Extract form data
  const fullName = formData.get("fullName") as string
  const email = formData.get("email") as string
  const phoneNumber = formData.get("phoneNumber") as string
  const preferences = (formData.get("preferences") as string) || ""

  // Validate form data
  const validationResult = registrationSchema.safeParse({
    fullName,
    email,
    phoneNumber,
    preferences,
  })

  if (!validationResult.success) {
    return {
      success: false,
      message: "Por favor, corrige los errores en el formulario.",
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  try {
    // Initialize Supabase client
    const supabase = createServerSupabaseClient()

    // Check if email already exists
    const { data: existingUser } = await supabase.from("registrations").select("id").eq("email", email).maybeSingle()

    if (existingUser) {
      return {
        success: false,
        message: "Este correo electrónico ya está registrado. Por favor, utiliza una dirección diferente.",
      }
    }

    // Insert new registration
    const { error } = await supabase.from("registrations").insert({
      full_name: fullName,
      email,
      phone_number: phoneNumber,
      status: "pending",
      preferences: preferences || null,
    })

    if (error) {
      console.error("Error inserting registration:", error)
      return {
        success: false,
        message: "No se pudo enviar tu registro. Por favor, inténtalo de nuevo más tarde.",
      }
    }

    return {
      success: true,
      message: "¡Registro enviado con éxito! Nos comunicaremos contigo cuando tu grupo esté listo para acceder.",
    }
  } catch (error) {
    console.error("Error in submitRegistration:", error)
    return {
      success: false,
      message: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo más tarde.",
    }
  }
}
