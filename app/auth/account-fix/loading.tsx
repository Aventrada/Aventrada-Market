import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600 mb-4" />
        <h2 className="text-xl font-medium text-gray-700">Reparando cuenta...</h2>
        <p className="text-gray-500 mt-2">Por favor espere mientras reparamos su cuenta.</p>
      </div>
    </div>
  )
}
