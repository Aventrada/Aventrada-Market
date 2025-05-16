"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createClientSupabaseClient } from "@/lib/supabase"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AuthFixPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [fullName, setFullName] = useState("")
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [registrations, setRegistrations] = useState<any[]>([])
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingUser, setIsLoadingUser] = useState(true)
  const [authStatus, setAuthStatus] = useState<string>("unknown")

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
          setAuthStatus("authenticated")
        } else {
          setAuthStatus("unauthenticated")
        }
      } catch (error) {
        console.error("Error loading user:", error)
        setAuthStatus("error")
      } finally {
        setIsLoadingUser(false)
      }
    }

    loadCurrentUser()
  }, [])

  // Check registrations when email changes
  useEffect(() => {
    if (email) {
      checkRegistrations()
    }
  }, [email])

  async function checkRegistrations() {
    try {
      setIsLoading(true)
      const supabase = createClientSupabaseClient()

      // Log the exact query we're making
      console.log("Checking registrations for email:", email)

      // Try case-insensitive match
      const { data: likeMatch, error: likeError } = await supabase
        .from("registrations")
        .select("*")
        .ilike("email", email)

      if (likeError) throw likeError

      setRegistrations(likeMatch || [])

      // Log what we found
      console.log("Found registrations:", likeMatch)

      if (likeMatch && likeMatch.length > 0) {
        setMessage({
          type: "success",
          text: `Found ${likeMatch.length} registration(s) for this email.`,
        })
      } else {
        setMessage({
          type: "error",
          text: "No registrations found for this email.",
        })
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

  async function signIn() {
    try {
      setIsLoading(true)
      const supabase = createClientSupabaseClient()

      // Normalize email
      const normalizedEmail = email.trim().toLowerCase()

      // Attempt to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      })

      if (error) throw error

      setMessage({
        type: "success",
        text: "Login successful! You are now authenticated.",
      })

      // Update current user
      setCurrentUser(data.user)
      setAuthStatus("authenticated")

      // Redirect to dashboard after 2 seconds
      setTimeout(() => {
        window.location.href = "/dashboard"
      }, 2000)
    } catch (error: any) {
      console.error("Error signing in:", error)
      setMessage({
        type: "error",
        text: `Error signing in: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function signUp() {
    try {
      setIsLoading(true)
      const supabase = createClientSupabaseClient()

      // Normalize email
      const normalizedEmail = email.trim().toLowerCase()

      // Check if user already exists
      const { data: existingUser } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      })

      if (existingUser.user) {
        setMessage({
          type: "error",
          text: "User already exists with this email. Try signing in instead.",
        })
        return
      }

      // Create new user
      const { data, error } = await supabase.auth.signUp({
        email: normalizedEmail,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      setMessage({
        type: "success",
        text: "Account created successfully! Check your email for confirmation.",
      })
    } catch (error: any) {
      console.error("Error signing up:", error)
      setMessage({
        type: "error",
        text: `Error signing up: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function resetPassword() {
    try {
      setIsLoading(true)
      const supabase = createClientSupabaseClient()

      // Normalize email
      const normalizedEmail = email.trim().toLowerCase()

      // Send password reset email
      const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setMessage({
        type: "success",
        text: "Password reset email sent! Check your inbox.",
      })
    } catch (error: any) {
      console.error("Error resetting password:", error)
      setMessage({
        type: "error",
        text: `Error resetting password: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function updatePassword() {
    try {
      setIsLoading(true)
      const supabase = createClientSupabaseClient()

      // Update password
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (error) throw error

      setMessage({
        type: "success",
        text: "Password updated successfully!",
      })

      // Clear password field
      setNewPassword("")
    } catch (error: any) {
      console.error("Error updating password:", error)
      setMessage({
        type: "error",
        text: `Error updating password: ${error.message}`,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function signOut() {
    try {
      setIsLoading(true)
      const supabase = createClientSupabaseClient()

      // Sign out
      const { error } = await supabase.auth.signOut()

      if (error) throw error

      setMessage({
        type: "success",
        text: "Signed out successfully!",
      })

      // Update state
      setCurrentUser(null)
      setAuthStatus("unauthenticated")
    } catch (error: any) {
      console.error("Error signing out:", error)
      setMessage({
        type: "error",
        text: `Error signing out: ${error.message}`,
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
          <CardTitle>Authentication Diagnostic & Fix Tool</CardTitle>
          <CardDescription>Diagnose and fix authentication issues</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {authStatus === "authenticated" ? (
            <Alert>
              <AlertDescription>Currently logged in as: {currentUser?.email}</AlertDescription>
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
          </div>

          <Tabs defaultValue="login">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Create Account</TabsTrigger>
              <TabsTrigger value="reset">Reset Password</TabsTrigger>
              <TabsTrigger value="check">Check Status</TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your password"
                />
              </div>

              <div className="flex space-x-2">
                <Button onClick={signIn} disabled={isLoading || !email || !password}>
                  Sign In
                </Button>

                {authStatus === "authenticated" && (
                  <Button onClick={signOut} disabled={isLoading} variant="outline">
                    Sign Out
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Your Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="signupPassword">Password</Label>
                <Input
                  id="signupPassword"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Choose a password"
                />
              </div>

              <Button onClick={signUp} disabled={isLoading || !email || !password}>
                Create Account
              </Button>
            </TabsContent>

            <TabsContent value="reset" className="space-y-4">
              {authStatus === "authenticated" ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="New password"
                    />
                  </div>

                  <Button onClick={updatePassword} disabled={isLoading || !newPassword}>
                    Update Password
                  </Button>
                </>
              ) : (
                <Button onClick={resetPassword} disabled={isLoading || !email}>
                  Send Password Reset Email
                </Button>
              )}
            </TabsContent>

            <TabsContent value="check" className="space-y-4">
              <Button onClick={checkRegistrations} disabled={isLoading || !email}>
                Check Registration Status
              </Button>

              {registrations.length > 0 && (
                <div className="mt-4">
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
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {authStatus === "authenticated" && (
                <div className="mt-4">
                  <h3 className="text-lg font-medium mb-2">Current Auth User:</h3>
                  <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    {JSON.stringify(currentUser, null, 2)}
                  </pre>
                </div>
              )}
            </TabsContent>
          </Tabs>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Troubleshooting Steps:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Check if your registration exists and is approved (Check Status tab)</li>
              <li>Try logging in with your email and password (Login tab)</li>
              <li>If you can't remember your password, reset it (Reset Password tab)</li>
              <li>If you don't have an account, create one (Create Account tab)</li>
              <li>
                After fixing issues, go to{" "}
                <a href="/auth/login" className="text-blue-600 hover:underline">
                  /auth/login
                </a>{" "}
                and try logging in again
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
