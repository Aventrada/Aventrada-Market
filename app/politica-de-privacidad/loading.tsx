import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Skeleton */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-6 w-24" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl">
        <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-1/2 mx-auto mb-8" />

        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-3/4 mb-8" />

          <div className="space-y-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="border-b border-gray-200 pb-4">
                <div className="flex justify-between items-center py-2">
                  <Skeleton className="h-6 w-1/3" />
                  <Skeleton className="h-5 w-5 rounded-full" />
                </div>

                <div className="mt-3 space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <div className="pl-5 space-y-2 mt-2">
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-full" />
                    <Skeleton className="h-3 w-4/5" />
                    <Skeleton className="h-3 w-5/6" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <Skeleton className="h-4 w-full mx-auto" />
            <Skeleton className="h-4 w-5/6 mx-auto mt-2" />
          </div>
        </div>
      </div>

      {/* Footer Skeleton */}
      <div className="bg-white border-t border-gray-200 mt-12">
        <div className="container mx-auto px-4 py-6">
          <Skeleton className="h-4 w-48 mx-auto" />
          <div className="mt-2 flex justify-center space-x-4">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-32" />
          </div>
        </div>
      </div>
    </div>
  )
}
