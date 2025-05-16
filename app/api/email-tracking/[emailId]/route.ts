import { NextResponse } from "next/server"
import { updateEmailStats } from "@/lib/email"

// Imagen de 1x1 pixel transparente en base64
const TRACKING_PIXEL = "R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"

export async function GET(request: Request, { params }: { params: { emailId: string } }) {
  try {
    const emailId = params.emailId

    if (!emailId) {
      return new Response("ID de email no proporcionado", { status: 400 })
    }

    // Registrar la apertura del email de forma asíncrona
    updateEmailStats(emailId, "opened").catch((error) => {
      console.error("Error al registrar apertura de email:", error)
    })

    // Devolver un pixel de seguimiento transparente
    return new Response(Buffer.from(TRACKING_PIXEL, "base64"), {
      headers: {
        "Content-Type": "image/gif",
        "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Error en el endpoint de seguimiento de email:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
