import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function EventsLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section Skeleton */}
      <section className="bg-gradient-to-r from-[#7E1F2E] to-[#A02A3A] text-white py-8 sm:py-12 lg:py-16">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Skeleton className="h-8 sm:h-12 w-3/4 mx-auto mb-4 sm:mb-6 bg-white/20" />
            <Skeleton className="h-4 sm:h-6 w-2/3 mx-auto mb-6 sm:mb-8 bg-white/20" />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white/10 rounded-lg p-3 sm:p-4">
                  <Skeleton className="h-6 sm:h-8 w-12 mx-auto mb-2 bg-white/20" />
                  <Skeleton className="h-3 sm:h-4 w-16 mx-auto bg-white/20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Events Skeleton */}
      <section className="py-8 sm:py-12 bg-white">
        <div className="container px-4">
          <Skeleton className="h-8 w-64 mx-auto mb-6 sm:mb-8" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Filters Skeleton */}
      <section className="py-8 sm:py-12">
        <div className="container px-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm mb-6 sm:mb-8">
            <Skeleton className="h-6 w-32 mb-4" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-10 w-full sm:col-span-2 lg:col-span-1" />
            </div>
          </div>

          {/* Tabs Skeleton */}
          <div className="overflow-x-auto mb-6 sm:mb-8">
            <Skeleton className="h-10 w-full min-w-[500px] sm:min-w-0" />
          </div>

          {/* Events Grid Skeleton */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {[...Array(9)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-5 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-16" />
                      <Skeleton className="h-5 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                    <Skeleton className="h-9 w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
