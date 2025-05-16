"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClientSupabaseClient } from "@/lib/supabase"

export default function DebugLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [results, setResults] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function checkRegistration() {
    setIsLoading(true)
    try {
      const supabase = createClientSupabaseClient()

      // Check registration with proper case-insensitive query
      const { data: registration, error: registrationError } = await supabase
        .from("registrations")
        .select("*")
        .ilike("email", email.trim().toLowerCase())
        .maybeSingle()

      setResults({
        type: "registration",
        data: registration,
        error: registrationError,
      })
    } catch (error) {
      setResults({
        type: "registration",
        error,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function checkAuth() {
    setIsLoading(true)
    try {
      const supabase = createClientSupabaseClient()

      // Try to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

      setResults({
        type: "auth",
        data,
        error,
      })
    } catch (error) {
      setResults({
        type: "auth",
        error,
      })
    } finally {
      setIsLoading(false)
    }
  }

  async function checkBoth() {
    setIsLoading(true)
    try {
      const supabase = createClientSupabaseClient()

      // Check registration
      const { data: registration, error: registrationError } = await supabase
        .from("registrations")
        .select("*")
        .ilike("email", email.trim().toLowerCase())
        .maybeSingle()

      // Try to sign in
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim().toLowerCase(),
        password,
      })

      setResults({
        type: "both",
        registration,
        registrationError,
        authData,
        authError,
      })
    } catch (error) {
      setResults({
        type: "both",
        error,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Debug Login</CardTitle>
          <CardDescription>
            This page helps diagnose login issues by checking registration and authentication separately.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <Button onClick={checkRegistration} disabled={isLoading}>
              Check Registration Only
            </Button>
            <Button onClick={checkAuth} disabled={isLoading}>
              Check Auth Only
            </Button>
            <Button onClick={checkBoth} disabled={isLoading}>
              Check Both
            </Button>
          </div>

          {results && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <h3 className="font-medium mb-2">Results:</h3>
              <pre className="text-xs overflow-auto max-h-96">{JSON.stringify(results, null, 2)}</pre>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
