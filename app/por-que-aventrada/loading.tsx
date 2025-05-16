export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="h-16 w-16 animate-pulse rounded-full bg-gradient-to-r from-[#B46CFF] to-[#F94892] opacity-75"></div>
        <h2 className="mt-4 text-xl font-medium text-gray-700">Cargando...</h2>
      </div>
    </div>
  )
}
