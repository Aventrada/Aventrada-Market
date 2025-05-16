import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Crear cliente de Supabase
const supabaseUrl = process.env.SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""
const supabase = createClient(supabaseUrl, supabaseKey)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nombre, email, asunto, mensaje } = body

    // Validar los datos
    if (!nombre || !email || !asunto || !mensaje) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
    }

    // Guardar el mensaje en la base de datos
    const { error } = await supabase.from("contact_messages").insert([
      {
        name: nombre,
        email,
        subject: asunto,
        message: mensaje,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error("Error al guardar el mensaje:", error)
      return NextResponse.json({ error: "Error al guardar el mensaje" }, { status: 500 })
    }

    // Aquí podrías añadir código para enviar un correo electrónico de notificación
    // usando Resend o Nodemailer

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error en la API de contacto:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}
