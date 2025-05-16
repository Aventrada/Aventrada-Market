"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

export async function checkRegistrations(email: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase()

    // Try exact match
    const { data: exactMatch, error: exactError } = await supabase
      .from("registrations")
      .select("*")
      .eq("email", normalizedEmail)

    if (exactError) throw exactError

    // Try case-insensitive match
    const { data: likeMatch, error: likeError } = await supabase
      .from("registrations")
      .select("*")
      .ilike("email", normalizedEmail)

    if (likeError) throw likeError

    // Combine results (removing duplicates)
    const allMatches = [...(exactMatch || [])]
    if (likeMatch) {
      for (const match of likeMatch) {
        if (!allMatches.some((m) => m.id === match.id)) {
          allMatches.push(match)
        }
      }
    }

    return { success: true, registrations: allMatches }
  } catch (error: any) {
    console.error("Error checking registrations:", error)
    return { success: false, error: error.message }
  }
}

export async function createRegistration(email: string, fullName: string) {
  try {
    const supabase = createServerSupabaseClient()

    // Normalize email
    const normalizedEmail = email.trim().toLowerCase()

    // Create registration
    const { data, error } = await supabase
      .from("registrations")
      .insert({
        email: normalizedEmail,
        full_name: fullName || "Usuario",
        status: "approved",
        phone_number: "",
      })
      .select()

    if (error) throw error

    revalidatePath("/auth/direct-fix")
    return { success: true, registration: data[0] }
  } catch (error: any) {
    console.error("Error creating registration:", error)
    return { success: false, error: error.message }
  }
}

export async function approveRegistration(id: string) {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("registrations").update({ status: "approved" }).eq("id", id)

    if (error) throw error

    revalidatePath("/auth/direct-fix")
    return { success: true }
  } catch (error: any) {
    console.error("Error approving registration:", error)
    return { success: false, error: error.message }
  }
}
