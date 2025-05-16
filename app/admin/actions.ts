"use server"

import { createServerSupabaseClient } from "@/lib/supabase"
import { revalidatePath } from "next/cache"
import { sendEmail, getApprovalEmailTemplate, getRejectionEmailTemplate } from "@/lib/email"

export async function updateRegistrationStatus(id: string, status: "approved" | "rejected") {
  try {
    const supabase = createServerSupabaseClient()

    // Primero obtenemos los datos del registro para tener el email y nombre
    const { data: registration, error: fetchError } = await supabase
      .from("registrations")
      .select("*")
      .eq("id", id)
      .single()

    if (fetchError) {
      console.error("Error fetching registration:", fetchError)
      return { success: false, message: fetchError.message }
    }

    if (!registration) {
      return { success: false, message: "No se encontró el registro" }
    }

    console.log("Registro encontrado:", registration)

    // Actualizamos el estado del registro
    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    }

    // Si estamos aprobando, registramos cuándo se envió la notificación
    if (status === "approved") {
      updateData.last_notification_sent = new Date().toISOString()
    }

    const { error } = await supabase.from("registrations").update(updateData).eq("id", id)

    if (error) {
      console.error("Error updating registration status:", error)
      return { success: false, message: error.message }
    }

    // Si el estado es "approved" o "rejected", enviamos un email de notificación
    let emailResult = { success: true, message: "" }
    if (registration) {
      try {
        console.log(`Enviando email de ${status} a:`, registration.email)

        let emailHtml = ""
        let emailSubject = ""
        let templateType = ""

        if (status === "approved") {
          emailSubject = "¡Tu registro en Aventrada ha sido aprobado!"
          emailHtml = getApprovalEmailTemplate({
            name: registration.full_name,
            registrationDate: registration.created_at,
          })
          templateType = "approval"
        } else if (status === "rejected") {
          emailSubject = "Actualización sobre tu solicitud en Aventrada"
          emailHtml = getRejectionEmailTemplate({
            name: registration.full_name,
          })
          templateType = "rejection"
        }

        emailResult = await sendEmail({
          to: registration.email,
          subject: emailSubject,
          html: emailHtml,
          registrationId: registration.id,
          templateType,
        })

        console.log("Resultado del envío de email:", emailResult)

        if (!emailResult.success) {
          console.error("Error al enviar email:", emailResult.message)
        }
      } catch (emailError: any) {
        console.error(`Error al enviar email de ${status}:`, emailError)
        emailResult = {
          success: false,
          message: emailError.message || `Error al enviar el email de notificación de ${status}`,
        }
      }
    }

    revalidatePath("/admin")

    // Devolvemos información sobre el resultado de la actualización y el envío del email
    return {
      success: true,
      emailSent: emailResult.success,
      emailError: !emailResult.success ? emailResult.message : null,
      message: emailResult.success
        ? `Registro ${status === "approved" ? "aprobado" : "rechazado"} y email de notificación enviado`
        : `Registro ${status === "approved" ? "aprobado" : "rechazado"} pero hubo un problema al enviar el email: ${emailResult.message}`,
    }
  } catch (error: any) {
    console.error("Error updating registration status:", error)
    return { success: false, message: "Error al actualizar el estado del registro: " + error.message }
  }
}

export async function updateRegistrationNotes(id: string, notes: string) {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase
      .from("registrations")
      .update({
        notes,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      return { success: false, message: error.message }
    }

    revalidatePath("/admin")
    return { success: true, message: "Notas actualizadas correctamente" }
  } catch (error: any) {
    console.error("Error updating registration notes:", error)
    return { success: false, message: "Error al actualizar las notas del registro" }
  }
}

export async function deleteRegistration(id: string) {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("registrations").delete().eq("id", id)

    if (error) {
      return { success: false, message: error.message }
    }

    revalidatePath("/admin")
    return { success: true }
  } catch (error: any) {
    console.error("Error deleting registration:", error)
    return { success: false, message: "Error al eliminar el registro" }
  }
}

export async function exportRegistrations(format: "csv" | "json" = "csv") {
  try {
    const supabase = createServerSupabaseClient()

    // Obtener todos los registros
    const { data, error } = await supabase.from("registrations").select("*").order("created_at", { ascending: false })

    if (error) {
      return { success: false, message: error.message }
    }

    if (!data || data.length === 0) {
      return { success: false, message: "No hay datos para exportar" }
    }

    // Formatear los datos según el formato solicitado
    let exportData: string

    if (format === "csv") {
      // Crear encabezados CSV
      const headers = Object.keys(data[0]).join(",")

      // Crear filas CSV
      const rows = data
        .map((row) => {
          return Object.values(row)
            .map((value) => {
              // Manejar valores que puedan contener comas o comillas
              if (value === null || value === undefined) return '""'
              const stringValue = String(value)
              if (stringValue.includes(",") || stringValue.includes('"') || stringValue.includes("\n")) {
                return `"${stringValue.replace(/"/g, '""')}"`
              }
              return `"${stringValue}"`
            })
            .join(",")
        })
        .join("\n")

      exportData = `${headers}\n${rows}`
    } else {
      // Formato JSON
      exportData = JSON.stringify(data, null, 2)
    }

    return {
      success: true,
      data: exportData,
      message: `Datos exportados en formato ${format.toUpperCase()} correctamente`,
    }
  } catch (error: any) {
    console.error("Error exporting registrations:", error)
    return { success: false, message: "Error al exportar los registros" }
  }
}
