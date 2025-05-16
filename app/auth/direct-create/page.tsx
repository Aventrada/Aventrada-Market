"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function DirectCreatePage() {
  const [email, setEmail] = useState("")
  const [fullName, setFullName] = useState("")
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  async function createRegistration() {
    try {
      setIsLoading(true)

      // Call the server action to create the registration
      const response = await fetch("/api/create-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          fullName: fullName || "Usuario",
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Unknown error")
      }

      setMessage({
        type: "success",
        text: `Registration created successfully! ID: ${data.id}`,
      })
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

  return (
    <div className="container mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Create Registration Directly</CardTitle>
          <CardDescription>This tool creates an approved registration directly in the database</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
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
                placeholder="Enter your email"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your name"
              />
            </div>

            <Button onClick={createRegistration} disabled={isLoading || !email}>
              Create Approved Registration
            </Button>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-2">Next Steps:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Enter your email and name</li>
              <li>Click "Create Approved Registration"</li>
              <li>
                After success, go to{" "}
                <a href="/auth/login" className="text-blue-600 hover:underline">
                  /auth/login
                </a>{" "}
                and try logging in
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
