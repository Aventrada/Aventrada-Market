import nodemailer from "nodemailer"

type SendEmailParams = {
  to: string
  subject: string
  html: string
}

export async function sendEmailWithNodemailer({ to, subject, html }: SendEmailParams) {
  try {
    // Verificar que las credenciales existen
    const email = process.env.GMAIL_EMAIL
    const password = process.env.GMAIL_APP_PASSWORD

    if (!email || !password) {
      console.error("Error: Credenciales de Gmail no configuradas")
      return {
        success: false,
        message: "Credenciales de Gmail no configuradas. Por favor, configura GMAIL_EMAIL y GMAIL_APP_PASSWORD.",
      }
    }

    // Crear transporte de Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: email,
        pass: password,
      },
    })

    // Enviar el email
    const info = await transporter.sendMail({
      from: `"Aventrada" <${email}>`,
      to,
      subject,
      html,
    })

    console.log("Email enviado con ID:", info.messageId)
    return {
      success: true,
      message: "Email enviado correctamente",
      id: info.messageId,
    }
  } catch (error: any) {
    console.error("Error al enviar email con Nodemailer:", error)
    return {
      success: false,
      message: error.message || "Error desconocido al enviar email con Nodemailer",
    }
  }
}
