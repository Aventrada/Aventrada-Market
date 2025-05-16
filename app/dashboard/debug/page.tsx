"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function DashboardDebugPage() {
  const [user, setUser] = useState<any>(null)
  const [session, setSession] = useState<any>(null)
  const [cookies, setCookies] = useState<string>("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUserData() {
      try {
        const supabase = createClientSupabaseClient()

        // Get session
        const { data: sessionData } = await supabase.auth.getSession()
        setSession(sessionData.session)

        // Get user
        const { data: userData } = await supabase.auth.getUser()
        setUser(userData.user)

        // Get cookies
        setCookies(document.cookie)
      } catch (error) {
        console.error("Error loading user data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadUserData()
  }, [])

  async function refreshSession() {
    setLoading(true)
    try {
      const supabase = createClientSupabaseClient()
      const { data, error } = await supabase.auth.refreshSession()

      if (error) throw error

      setSession(data.session)
      setUser(data.user)
      setCookies(document.cookie)
    } catch (error) {
      console.error("Error refreshing session:", error)
    } finally {
      setLoading(false)
    }
  }

  function setAdminCookie() {
    document.cookie = "admin_authenticated=true; path=/; max-age=86400"
    setCookies(document.cookie)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard Debug</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">User:</h2>
            <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap overflow-auto max-h-60">
              {user ? JSON.stringify(user, null, 2) : "No user found"}
            </pre>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Session:</h2>
            <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap overflow-auto max-h-60">
              {session ? JSON.stringify(session, null, 2) : "No session found"}
            </pre>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-2">Cookies:</h2>
            <pre className="bg-gray-100 p-4 rounded-md whitespace-pre-wrap overflow-auto">
              {cookies || "No cookies found"}
            </pre>
          </div>

          <div className="flex gap-4">
            <Button onClick={refreshSession}>Refresh Session</Button>
            <Button onClick={setAdminCookie} variant="outline">
              Set Admin Cookie
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
