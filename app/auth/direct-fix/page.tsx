"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClientSupabaseClient } from "@/lib/supabase"
import { checkRegistrations, createRegistration, approveRegistration } from "./actions"

export default function DirectFixPage() {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [registrations, setRegistrations] = useState<any[]>([])
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true)

  // Load current user on page load
  useEffect(() => {
    async function loadCurrentUser() {
      try {
        const supabase = createClientSupabaseClient()
        const { data, error } = await supabase.auth.getUser()

        if (error) throw error

        if (data.user) {
          setCurrentUser(data.user)
          setEmail(data.user.email || "")
          setFullName(data.user.user_metadata?.full_name || "")
        }
      } catch (error) {
        console.error("Error loading user:", error)
      } finally {
        setIsLoadingUser(false)
      }
    }

    loadCurrentUser()
  }, [])

  // Check registrations when email changes
  useEffect(() => {
    if (email) {
      handleCheckRegistrations()
    }
  }, [email])

  async function handleCheckRegistrations() {
    try {
      setIsLoading(true)

      const result = await checkRegistrations(email)

      if (result.success) {
        setRegistrations(result.registrations)

        if (result.registrations.length > 0) {
          setMessage({
            type: "success",
            text: `Found ${result.registrations.length} registration(s) for this email.`,
          })
        } else {
          setMessage({
            type: "error",
            text: "No registrations found for this email.",
          })
        }
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error("Error checking registrations:", error)
      setMessage({
        type: "error",
        text: `Error checking registrations: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleCreateRegistration() {
    try {
      setIsLoading(true)

      const result = await createRegistration(email, fullName)

      if (result.success) {
        setMessage({
          type: "success",
          text: "Registration created successfully with approved status!",
        })

        // Refresh registrations
        handleCheckRegistrations()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error("Error creating registration:", error)
      setMessage({
        type: "error",
        text: `Error creating registration: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function handleApproveRegistration(id: string) {
    try {
      setIsLoading(true)

      const result = await approveRegistration(id)

      if (result.success) {
        setMessage({
          type: "success",
          text: "Registration approved successfully!",
        })

        // Refresh registrations
        handleCheckRegistrations()
      } else {
        throw new Error(result.error)
      }
    } catch (error: any) {
      console.error("Error approving registration:", error)
      setMessage({
        type: "error",
        text: `Error approving registration: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoadingUser) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Direct Registration Fix</CardTitle>
          <CardDescription>Fix registration issues to allow login</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {currentUser ? (
            <Alert>
              <AlertDescription>Currently logged in as: {currentUser.email}</AlertDescription>
            </Alert>
          ) : (
            <Alert variant="destructive">
              <AlertDescription>Not currently logged in</AlertDescription>
            </Alert>
          )}

          {message && (
            <Alert variant={message.type === "success" ? "default" : "destructive"}>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Your Name"
              />
            </div>

            <div className="flex space-x-2">
              <Button onClick={handleCheckRegistrations} disabled={isLoading || !email}>
                Check Registration
              </Button>

              <Button onClick={handleCreateRegistration} disabled={isLoading || !email} variant="secondary">
                Create Approved Registration
              </Button>
            </div>
          </div>

          {registrations.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">Found Registrations:</h3>
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {registrations.map((reg) => (
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
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {reg.status !== "approved" && (
                            <Button onClick={() => handleApproveRegistration(reg.id)} size="sm" variant="outline">
                              Approve
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Next Steps:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Check if your registration exists and is approved</li>
              <li>If not, create an approved registration using the button above</li>
              <li>
                Go to{" "}
                <a href="/auth/login" className="text-blue-600 hover:underline">
                  /auth/login
                </a>{" "}
                and try logging in again
              </li>
              <li>
                If you still have issues, try resetting your password at{" "}
                <a href="/auth/forgot-password" className="text-blue-600 hover:underline">
                  /auth/forgot-password
                </a>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
