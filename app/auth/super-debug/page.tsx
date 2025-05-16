"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function SuperDebugPage() {
  const [email, setEmail] = useState("")
  const [exactResults, setExactResults] = useState<any>(null)
  const [likeResults, setLikeResults] = useState<any>(null)
  const [allRegistrations, setAllRegistrations] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  // Function to check registration with exact match
  async function checkExactMatch() {
    setIsLoading(true)
    try {
      const supabase = createClientSupabaseClient()

      // Log the exact query we're making
      console.log("Checking exact match for email:", email)

      // Try exact match
      const { data, error } = await supabase.from("registrations").select("*").eq("email", email)

      setExactResults({ data, error })
      setMessage(`Exact match query completed. Found ${data?.length || 0} results.`)
    } catch (error: any) {
      console.error("Error checking exact match:", error)
      setMessage(`Error checking exact match: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to check registration with case-insensitive match
  async function checkLikeMatch() {
    setIsLoading(true)
    try {
      const supabase = createClientSupabaseClient()

      // Log the exact query we're making
      console.log("Checking case-insensitive match for email:", email)

      // Try case-insensitive match
      const { data, error } = await supabase.from("registrations").select("*").ilike("email", email)

      setLikeResults({ data, error })
      setMessage(`Case-insensitive match query completed. Found ${data?.length || 0} results.`)
    } catch (error: any) {
      console.error("Error checking case-insensitive match:", error)
      setMessage(`Error checking case-insensitive match: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to get all registrations
  async function getAllRegistrations() {
    setIsLoading(true)
    try {
      const supabase = createClientSupabaseClient()

      // Get all registrations (limited to 100)
      const { data, error } = await supabase.from("registrations").select("*").limit(100)

      if (error) throw error

      setAllRegistrations(data || [])
      setMessage(`Retrieved ${data?.length || 0} registrations from database.`)
    } catch (error: any) {
      console.error("Error getting all registrations:", error)
      setMessage(`Error getting all registrations: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  // Function to run all checks
  async function runAllChecks() {
    setIsLoading(true)
    try {
      await checkExactMatch()
      await checkLikeMatch()
      await getAllRegistrations()
      setMessage("All checks completed.")
    } catch (error: any) {
      console.error("Error running all checks:", error)
      setMessage(`Error running all checks: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Super Detailed Login Diagnostics</CardTitle>
          <CardDescription>This tool will show exactly what's happening with your registration checks</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {message && (
            <Alert>
              <AlertDescription>{message}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email to Check</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter the email you're trying to log in with"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <Button onClick={checkExactMatch} disabled={isLoading || !email}>
                Check Exact Match
              </Button>

              <Button onClick={checkLikeMatch} disabled={isLoading || !email}>
                Check Case-Insensitive Match
              </Button>

              <Button onClick={getAllRegistrations} disabled={isLoading}>
                Get All Registrations
              </Button>

              <Button onClick={runAllChecks} disabled={isLoading || !email} variant="secondary">
                Run All Checks
              </Button>
            </div>
          </div>

          {exactResults && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Exact Match Results:</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60 text-xs">
                {JSON.stringify(exactResults, null, 2)}
              </pre>
            </div>
          )}

          {likeResults && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Case-Insensitive Match Results:</h3>
              <pre className="bg-gray-100 p-4 rounded-md overflow-auto max-h-60 text-xs">
                {JSON.stringify(likeResults, null, 2)}
              </pre>
            </div>
          )}

          {allRegistrations.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">All Registrations in Database:</h3>
              <div className="border rounded-md overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {allRegistrations.map((reg) => (
                      <tr key={reg.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              reg.status === "approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {reg.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.full_name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Troubleshooting Steps:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>
                Enter the <strong>exact</strong> email you're using to log in
              </li>
              <li>Click "Run All Checks" to see what's happening</li>
              <li>Check if your email appears in the "All Registrations" list</li>
              <li>Compare the email in the database with the one you're entering</li>
              <li>Look for any differences in capitalization, spaces, or special characters</li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
