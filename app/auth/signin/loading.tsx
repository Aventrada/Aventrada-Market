import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
        <h3 className="font-medium text-gray-700">Cargando...</h3>
      </div>
    </div>
  )
}
