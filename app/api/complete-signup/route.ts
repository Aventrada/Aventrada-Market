import { createServerSupabaseClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, fullName } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Create server-side Supabase client with admin privileges
    const supabase = createServerSupabaseClient()

    // Step 1: Check if auth user already exists
    const { data: authUser, error: authCheckError } = await supabase.auth.admin.getUserByEmail(email)

    let authUserId

    // Step 2: Create auth user if it doesn't exist
    if (!authUser) {
      const { data: newAuthUser, error: createAuthError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
          full_name: fullName,
        },
      })

      if (createAuthError) {
        console.error("Error creating auth user:", createAuthError)
        return NextResponse.json(
          { error: `Failed to create authentication user: ${createAuthError.message}` },
          { status: 500 },
        )
      }

      authUserId = newAuthUser.user.id
    } else {
      authUserId = authUser.id
    }

    // Step 3: Check if registration already exists
    const { data: existingRegistration } = await supabase
      .from("registrations")
      .select("id, status")
      .eq("email", email.toLowerCase())
      .single()

    let registrationId

    // Step 4: Create or update registration
    if (existingRegistration) {
      // Update existing registration
      const { data, error } = await supabase
        .from("registrations")
        .update({
          status: "approved",
          full_name: fullName,
          updated_at: new Date().toISOString(),
        })
        .eq("id", existingRegistration.id)
        .select("id")
        .single()

      if (error) {
        console.error("Error updating registration:", error)
        return NextResponse.json({ error: `Failed to update registration: ${error.message}` }, { status: 500 })
      }

      registrationId = existingRegistration.id
    } else {
      // Create new registration
      const { data, error } = await supabase
        .from("registrations")
        .insert({
          email: email.toLowerCase(),
          full_name: fullName,
          status: "approved",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .select("id")
        .single()

      if (error) {
        console.error("Error creating registration:", error)
        return NextResponse.json({ error: `Failed to create registration: ${error.message}` }, { status: 500 })
      }

      registrationId = data.id
    }

    // Step 5: Update auth user metadata to include registration ID
    const { error: updateMetadataError } = await supabase.auth.admin.updateUserById(authUserId, {
      user_metadata: {
        registration_id: registrationId,
        full_name: fullName,
      },
    })

    if (updateMetadataError) {
      console.error("Error updating user metadata:", updateMetadataError)
      // Non-blocking error, continue with success response
    }

    return NextResponse.json({
      success: true,
      message: "Account created successfully",
      authUserId,
      registrationId,
    })
  } catch (error: any) {
    console.error("Error in complete signup:", error)
    return NextResponse.json({ error: `Failed to complete signup: ${error.message}` }, { status: 500 })
  }
}
