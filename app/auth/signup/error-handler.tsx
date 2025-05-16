import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface ErrorHandlerProps {
  error: string
}

export function ErrorHandler({ error }: ErrorHandlerProps) {
  // Determine if this is a pending message
  const isPendingMessage = error.includes("pendiente de aprobación")

  return (
    <Alert
      variant={isPendingMessage ? "default" : "destructive"}
      className={`mb-6 ${
        isPendingMessage ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-red-50 border-red-200 text-red-600"
      }`}
    >
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
}
