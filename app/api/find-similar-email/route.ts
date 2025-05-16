import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const email = searchParams.get("email")

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const supabase = createServerSupabaseClient()

    // Extract username part of the email (before @)
    const username = normalizedEmail.split("@")[0]

    // Find similar emails using ILIKE
    const { data, error } = await supabase
      .from("registrations")
      .select("email")
      .ilike("email", `%${username}%`)
      .limit(1)

    if (error) {
      console.error("Error finding similar email:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      similarEmail: data && data.length > 0 ? data[0].email : null,
    })
  } catch (error: any) {
    console.error("Error in find-similar-email API:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const normalizedEmail = email.trim().toLowerCase()
    const supabase = createServerSupabaseClient()

    // Extract username part of the email (before @)
    const username = normalizedEmail.split("@")[0]

    // Find similar emails using ILIKE
    const { data, error } = await supabase
      .from("registrations")
      .select("email")
      .ilike("email", `%${username}%`)
      .limit(1)

    if (error) {
      console.error("Error finding similar email:", error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({
      similarEmail: data && data.length > 0 ? data[0].email : null,
    })
  } catch (error: any) {
    console.error("Error in find-similar-email API:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
