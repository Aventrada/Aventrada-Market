import { Resend } from "resend"
import { createServerSupabaseClient } from "./supabase"
import { generateRandomId, generateTrackingPixel } from "./utils"
import { getApprovalEmailTemplate, getRejectionEmailTemplate, getWelcomeEmailTemplate } from "./email-templates"

type SendEmailParams = {
  to: string
  subject: string
  html: string
  registrationId?: string
  templateType?: string
}

export async function sendEmail({ to, subject, html, registrationId, templateType = "generic" }: SendEmailParams) {
  try {
    // Verificar que alguna API key existe
    const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY

    if (!apiKey) {
      console.error("Error: No se encontró ninguna API key para Resend")
      return {
        success: false,
        message: "API key de Resend no configurada. Por favor, configura RESEND_API_KEY en las variables de entorno.",
      }
    }

    console.log("Enviando email con Resend:")
    console.log("- Destinatario original:", to)
    console.log("- Asunto:", subject)
    console.log("- Tipo de plantilla:", templateType)

    // Generar un ID único para este email
    const emailId = generateRandomId(12)

    // Generar pixel de seguimiento
    const trackingPixel = generateTrackingPixel(emailId)

    // Reemplazar el placeholder del pixel de seguimiento en el HTML
    const htmlWithTracking = html.replace("{{trackingPixel}}", trackingPixel)

    // Reemplazar otros placeholders si existen
    const finalHtml = htmlWithTracking.replace(/\{\{email\}\}/g, to)

    // Crear instancia de Resend con la API key
    const resend = new Resend(apiKey)

    // ACTUALIZACIÓN: Usar tu dominio personalizado para el remitente
    const { data, error } = await resend.emails.send({
      from: "Aventrada <noreply@aventrada.com>", // Cambiado a tu dominio personalizado
      to: [to], // Ahora enviamos al destinatario real
      subject: subject,
      html: finalHtml,
    })

    if (error) {
      console.error("Error al enviar email:", error)

      // Registrar el intento fallido en la base de datos
      await recordEmailStats({
        emailId,
        recipient: to,
        subject,
        templateType,
        status: "failed",
        registrationId,
        metadata: { error: error.message },
      })

      return { success: false, message: error.message }
    }

    console.log("Email enviado con ID:", data?.id)

    // Registrar el email enviado en la base de datos
    await recordEmailStats({
      emailId,
      recipient: to,
      subject,
      templateType,
      status: "sent",
      registrationId,
      metadata: { resendId: data?.id },
    })

    return {
      success: true,
      message: "Email enviado correctamente",
      id: data?.id,
      emailId,
    }
  } catch (error: any) {
    console.error("Error al enviar email:", error)
    return {
      success: false,
      message: error.message || "Error desconocido al enviar email",
      details: typeof error === "object" ? JSON.stringify(error) : "No hay detalles adicionales",
    }
  }
}

type EmailStatsParams = {
  emailId: string
  recipient: string
  subject: string
  templateType: string
  status: "sent" | "failed" | "opened" | "clicked"
  registrationId?: string
  metadata?: Record<string, any>
}

export async function recordEmailStats({
  emailId,
  recipient,
  subject,
  templateType,
  status,
  registrationId,
  metadata = {},
}: EmailStatsParams) {
  try {
    const supabase = createServerSupabaseClient()

    const { error } = await supabase.from("email_stats").insert({
      email_id: emailId,
      recipient,
      subject,
      template_type: templateType,
      status,
      registration_id: registrationId,
      metadata,
      sent_at: status === "sent" ? new Date().toISOString() : null,
      opened_at: status === "opened" ? new Date().toISOString() : null,
      clicked_at: status === "clicked" ? new Date().toISOString() : null,
    })

    if (error) {
      console.error("Error al registrar estadísticas de email:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error al registrar estadísticas de email:", error)
    return false
  }
}

export async function updateEmailStats(emailId: string, status: "opened" | "clicked") {
  try {
    const supabase = createServerSupabaseClient()

    const updateData: any = {
      status,
      updated_at: new Date().toISOString(),
    }

    if (status === "opened") {
      updateData.opened_at = new Date().toISOString()
    } else if (status === "clicked") {
      updateData.clicked_at = new Date().toISOString()
    }

    const { error } = await supabase.from("email_stats").update(updateData).eq("email_id", emailId)

    if (error) {
      console.error("Error al actualizar estadísticas de email:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error al actualizar estadísticas de email:", error)
    return false
  }
}

// Exportamos las plantillas desde el nuevo archivo
export { getApprovalEmailTemplate, getRejectionEmailTemplate, getWelcomeEmailTemplate }
