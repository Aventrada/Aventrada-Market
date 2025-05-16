"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"

export default function DebugRegistrationPage() {
  const [email, setEmail] = useState("")
  const [results, setResults] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  async function checkRegistration() {
    setLoading(true)
    setError(null)
    setSuccess(null)
    setResults(null)

    try {
      const supabase = createClientSupabaseClient()
      const normalizedEmail = email.trim().toLowerCase()

      // Get all registrations (limited to 20)
      const { data: allRegistrations, error: allError } = await supabase
        .from("registrations")
        .select("id, email, status, created_at")
        .order("created_at", { ascending: false })
        .limit(20)

      if (allError) {
        throw new Error(`Error fetching registrations: ${allError.message}`)
      }

      // Try exact match
      const { data: exactMatch, error: exactError } = await supabase
        .from("registrations")
        .select("*")
        .eq("email", normalizedEmail)
        .maybeSingle()

      if (exactError) {
        throw new Error(`Error with exact match query: ${exactError.message}`)
      }

      // Try case-insensitive match
      const { data: likeMatch, error: likeError } = await supabase
        .from("registrations")
        .select("*")
        .ilike("email", normalizedEmail)
        .maybeSingle()

      if (likeError) {
        throw new Error(`Error with case-insensitive query: ${likeError.message}`)
      }

      // Check RLS permissions
      const { data: rlsCheck, error: rlsError } = await supabase.rpc("check_registration_access", {
        email_to_check: normalizedEmail,
      })

      // Compile results
      const results = {
        searchEmail: normalizedEmail,
        exactMatch,
        likeMatch,
        rlsCheck: rlsError ? `Error: ${rlsError.message}` : rlsCheck,
        allRegistrations,
        similarEmails: allRegistrations?.filter(
          (r) => r.email.includes(normalizedEmail.split("@")[0]) || normalizedEmail.includes(r.email.split("@")[0]),
        ),
      }

      setResults(results)

      if (exactMatch || likeMatch) {
        const match = exactMatch || likeMatch
        if (match.status === "approved") {
          setSuccess(`Registration found and is approved! ID: ${match.id}`)
        } else {
          setError(`Registration found but status is "${match.status}" not "approved"`)
        }
      } else {
        setError("No registration found with this email address")
      }
    } catch (err: any) {
      console.error("Debug error:", err)
      setError(err.message || "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  async function fixRegistration() {
    setLoading(true)
    setError(null)
    setSuccess(null)

    try {
      const supabase = createClientSupabaseClient()
      const normalizedEmail = email.trim().toLowerCase()

      // Create or update registration
      const { data, error } = await supabase
        .from("registrations")
        .upsert(
          {
            email: normalizedEmail,
            status: "approved",
            full_name: "Fixed Registration",
            created_at: new Date().toISOString(),
          },
          { onConflict: "email" },
        )
        .select()

      if (error) {
        throw new Error(`Error fixing registration: ${error.message}`)
      }

      setSuccess(`Registration fixed! Please try signing up again with email: ${normalizedEmail}`)
      checkRegistration() // Refresh the results
    } catch (err: any) {
      console.error("Fix error:", err)
      setError(err.message || "An unknown error occurred")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Registration Debugger</CardTitle>
          <CardDescription>Check if a registration exists and is approved in the database</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter the email to check"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={checkRegistration} disabled={loading || !email}>
                {loading ? "Checking..." : "Check Registration"}
              </Button>

              <Button onClick={fixRegistration} disabled={loading || !email} variant="outline">
                Fix Registration
              </Button>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="bg-green-500/10 border-green-500/20 text-green-500">
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}

            {results && (
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Debug Results</h3>

                <div className="rounded-md bg-gray-100 p-4">
                  <h4 className="font-medium">Search Email</h4>
                  <pre className="mt-2 text-sm">{results.searchEmail}</pre>
                </div>

                <div className="rounded-md bg-gray-100 p-4">
                  <h4 className="font-medium">Exact Match Result</h4>
                  <pre className="mt-2 text-sm overflow-auto max-h-40">
                    {JSON.stringify(results.exactMatch, null, 2) || "No exact match found"}
                  </pre>
                </div>

                <div className="rounded-md bg-gray-100 p-4">
                  <h4 className="font-medium">Case-Insensitive Match Result</h4>
                  <pre className="mt-2 text-sm overflow-auto max-h-40">
                    {JSON.stringify(results.likeMatch, null, 2) || "No case-insensitive match found"}
                  </pre>
                </div>

                {results.similarEmails && results.similarEmails.length > 0 && (
                  <div className="rounded-md bg-gray-100 p-4">
                    <h4 className="font-medium">Similar Email Addresses Found</h4>
                    <pre className="mt-2 text-sm overflow-auto max-h-40">
                      {JSON.stringify(results.similarEmails, null, 2)}
                    </pre>
                  </div>
                )}

                <div className="rounded-md bg-gray-100 p-4">
                  <h4 className="font-medium">All Recent Registrations (20 max)</h4>
                  <pre className="mt-2 text-sm overflow-auto max-h-40">
                    {JSON.stringify(results.allRegistrations, null, 2)}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
