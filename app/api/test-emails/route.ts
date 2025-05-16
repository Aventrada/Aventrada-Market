import { NextResponse } from "next/server"
import { sendEmail } from "@/lib/email"
import { getApprovalEmailTemplate, getRejectionEmailTemplate, getWelcomeEmailTemplate } from "@/lib/email-templates"

export async function POST(request: Request) {
  try {
    const { to, name, templateType } = await request.json()

    if (!to || !name || !templateType) {
      return NextResponse.json({ success: false, message: "Faltan campos requeridos" }, { status: 400 })
    }

    // Seleccionar la plantilla adecuada
    let html = ""
    let subject = ""
    let currentTemplateType = templateType

    switch (currentTemplateType) {
      case "approval":
        subject = "¡Tu registro en Aventrada ha sido aprobado!"
        html = getApprovalEmailTemplate({
          name,
          registrationDate: new Date().toISOString(),
        })
        break
      case "rejection":
        subject = "Actualización sobre tu solicitud en Aventrada"
        html = getRejectionEmailTemplate({
          name,
        })
        break
      case "welcome":
        subject = "¡Bienvenido a Aventrada!"
        html = getWelcomeEmailTemplate({
          name,
        })
        break
      case "generic":
      default:
        subject = "Información importante de Aventrada"
        html = getWelcomeEmailTemplate({
          name,
        }) // Usamos la plantilla de bienvenida como genérica
        currentTemplateType = "generic"
        break
    }

    // Enviar el correo
    const result = await sendEmail({
      to,
      subject,
      html,
      templateType: currentTemplateType,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, message: result.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Correo de ${currentTemplateType} enviado correctamente a ${to}`,
      emailId: result.emailId,
    })
  } catch (error: any) {
    console.error("Error al enviar email de prueba:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error desconocido al enviar email",
      },
      { status: 500 },
    )
  }
}
