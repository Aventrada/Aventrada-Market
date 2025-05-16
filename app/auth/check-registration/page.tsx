"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function CheckRegistrationPage() {
  const [email, setEmail] = useState("")
  const [result, setResult] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function checkRegistration() {
    try {
      setIsLoading(true)
      setError(null)

      // Call the API to check registration
      const response = await fetch(`/api/check-registration?email=${encodeURIComponent(email.trim().toLowerCase())}`)

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || "Failed to check registration")
      }

      const data = await response.json()
      setResult(data)
    } catch (error: any) {
      console.error("Error checking registration:", error)
      setError(error.message)
      setResult(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Check Registration Status</CardTitle>
          <CardDescription>Check if your email is registered and approved in the system</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
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
                placeholder="Enter your email"
              />
            </div>

            <Button onClick={checkRegistration} disabled={isLoading || !email}>
              {isLoading ? "Checking..." : "Check Registration"}
            </Button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md">
              <h3 className="text-lg font-medium mb-2">Registration Status:</h3>
              <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(result, null, 2)}</pre>
            </div>
          )}

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Next Steps:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Check if your registration exists and is approved</li>
              <li>
                If not, go to{" "}
                <a href="/auth/direct-create" className="text-blue-600 hover:underline">
                  /auth/direct-create
                </a>{" "}
                to create a registration
              </li>
              <li>
                Then try logging in at{" "}
                <a href="/auth/login" className="text-blue-600 hover:underline">
                  /auth/login
                </a>
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
