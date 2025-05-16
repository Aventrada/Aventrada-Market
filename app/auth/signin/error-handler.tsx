import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, AlertTriangle, Info } from "lucide-react"

interface ErrorHandlerProps {
  error: string
}

export function ErrorHandler({ error }: ErrorHandlerProps) {
  // Determine error type based on content
  const isCredentialsError = error.includes("Credenciales incorrectas") || error.includes("Invalid login credentials")
  const isPendingError = error.includes("pendiente de aprobación")
  const isInfoMessage = error.includes("Tu registro ha sido enviado")

  if (isInfoMessage) {
    return (
      <Alert className="mb-6 bg-blue-50 border-blue-200 text-blue-700">
        <Info className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (isPendingError) {
    return (
      <Alert className="mb-6 bg-amber-50 border-amber-200 text-amber-700">
        <AlertTriangle className="h-4 w-4" />
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200 text-red-600">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  )
}
