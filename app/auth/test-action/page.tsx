"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createRegistrationRecord } from "../actions"

export default function TestActionPage() {
  const [email, setEmail] = useState("test@example.com")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(false)

  async function handleTest() {
    setLoading(true)
    try {
      const response = await createRegistrationRecord(email, "Test User")
      setResult(response)
    } catch (error: any) {
      setResult({ error: error.message })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Test Server Action</h1>
      <div className="space-y-4">
        <div>
          <label className="block mb-2">Email:</label>
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Button onClick={handleTest} disabled={loading}>
          {loading ? "Testing..." : "Test Action"}
        </Button>
        {result && (
          <div className="mt-4 p-4 bg-gray-100 rounded-md">
            <pre className="whitespace-pre-wrap">{JSON.stringify(result, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
  )
}
