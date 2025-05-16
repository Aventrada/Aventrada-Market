import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import { getApprovalEmailTemplate } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const { to, name, gmailEmail, gmailPassword } = await request.json()

    if (!to || !name || !gmailEmail || !gmailPassword) {
      return NextResponse.json({ success: false, message: "Faltan campos requeridos" }, { status: 400 })
    }

    // Crear transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: gmailEmail,
        pass: gmailPassword,
      },
    })

    // Enviar el email
    const info = await transporter.sendMail({
      from: `"Aventrada" <${gmailEmail}>`,
      to,
      subject: "Prueba de Nodemailer - Aventrada",
      html: getApprovalEmailTemplate(name),
    })

    return NextResponse.json({
      success: true,
      message: `Email enviado correctamente con ID: ${info.messageId}`,
    })
  } catch (error: any) {
    console.error("Error al enviar email con Nodemailer:", error)
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Error desconocido al enviar email",
      },
      { status: 500 },
    )
  }
}
