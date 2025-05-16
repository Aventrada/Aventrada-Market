"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function AuthDebugPage() {
  const [authState, setAuthState] = useState<any>(null)
  const [registrationState, setRegistrationState] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createClientSupabaseClient()

        // Get current session
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession()

        if (sessionError) {
          throw sessionError
        }

        setAuthState({
          session: sessionData.session,
          user: sessionData.session?.user || null,
        })

        // If we have a user, check registration
        if (sessionData.session?.user) {
          const { data: registration, error: registrationError } = await supabase
            .from("registrations")
            .select("*")
            .eq("email", sessionData.session.user.email)
            .single()

          if (registrationError && registrationError.code !== "PGRST116") {
            // PGRST116 is "no rows returned" error
            throw registrationError
          }

          setRegistrationState(registration || null)
        }
      } catch (err: any) {
        console.error("Auth debug error:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  async function handleSignOut() {
    try {
      const supabase = createClientSupabaseClient()
      await supabase.auth.signOut()
      window.location.reload()
    } catch (err: any) {
      console.error("Sign out error:", err)
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Auth Debug Page</h1>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : error ? (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <p>{error}</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold mb-2">Authentication State</h2>
              <div className="bg-gray-100 p-4 rounded-md">
                <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(authState, null, 2)}</pre>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-2">Registration State</h2>
              <div className="bg-gray-100 p-4 rounded-md">
                <pre className="whitespace-pre-wrap text-sm">
                  {registrationState ? JSON.stringify(registrationState, null, 2) : "No registration record found"}
                </pre>
              </div>
            </div>

            <div className="flex space-x-4">
              <Button onClick={handleSignOut} variant="destructive">
                Sign Out
              </Button>
              <Button onClick={() => (window.location.href = "/auth/login")}>Go to Login</Button>
              <Button onClick={() => (window.location.href = "/dashboard")}>Go to Dashboard</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
