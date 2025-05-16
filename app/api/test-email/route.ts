import { NextResponse } from "next/server"
import { Resend } from "resend"
import { getApprovalEmailTemplate } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { to, name } = await request.json()

    if (!to || !name) {
      return NextResponse.json({ success: false, message: "Faltan campos requeridos" }, { status: 400 })
    }

    // Verificar que la API key existe
    const apiKey = process.env.RESEND_API_KEY || process.env.EMAIL_API_KEY

    if (!apiKey) {
      return NextResponse.json(
        {
          success: false,
          message: "API key de Resend no configurada. Por favor, configura RESEND_API_KEY en las variables de entorno.",
        },
        { status: 500 },
      )
    }

    // Crear instancia de Resend con la API key
    const resend = new Resend(apiKey)

    // En modo de prueba, siempre enviamos a la dirección registrada
    const { data, error } = await resend.emails.send({
      from: "Aventrada <notificaciones@aventrada.com>",
      to: ["developer@aventrada.com"], // Siempre enviar a la dirección registrada
      subject: `Prueba de email - Aventrada (Destinatario original: ${to})`,
      html: getApprovalEmailTemplate(name),
    })

    if (error) {
      console.error("Error al enviar email:", error)
      return NextResponse.json({ success: false, message: error.message }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message: `Email enviado correctamente a developer@aventrada.com (modo de prueba) con ID: ${data?.id}`,
    })
  } catch (error: any) {
    console.error("Error al enviar email:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error desconocido al enviar email",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 },
    )
  }
}
