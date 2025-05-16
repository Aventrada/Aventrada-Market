import { Skeleton } from "@/components/ui/skeleton"

export default function ContactLoading() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section Skeleton */}
      <section className="relative bg-gradient-to-r from-[#B46CFF]/10 to-[#F94892]/10 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-12 w-48 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
        </div>
      </section>

      {/* Contact Section Skeleton */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-12 gap-8">
            {/* Contact Form Skeleton */}
            <div className="md:col-span-7 bg-white rounded-xl shadow-sm p-6 md:p-8">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-5 w-3/4 mb-6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              <div className="space-y-2 mb-5">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-10 w-full" />
              </div>

              <div className="space-y-2 mb-5">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-36 w-full" />
              </div>

              <Skeleton className="h-11 w-full" />
            </div>

            {/* Contact Info Skeleton */}
            <div className="md:col-span-5 bg-white rounded-xl shadow-sm p-6 md:p-8">
              <Skeleton className="h-8 w-48 mb-2" />
              <Skeleton className="h-5 w-3/4 mb-6" />

              <div className="space-y-6 mb-8">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                    <div className="space-y-1 flex-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-48" />
                    </div>
                  </div>
                ))}
              </div>

              <Skeleton className="h-px w-full mb-6" />

              <Skeleton className="h-5 w-40 mb-4" />
              <div className="flex gap-4">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="w-10 h-10 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section Skeleton */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Skeleton className="h-8 w-64 mx-auto mb-8" />

          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm p-6 border border-gray-100">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
