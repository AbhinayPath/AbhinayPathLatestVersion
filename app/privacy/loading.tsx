import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PrivacyLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header Skeleton */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Skeleton className="h-8 w-8 rounded" />
              <Skeleton className="h-10 w-80" />
            </div>
            <Skeleton className="h-6 w-96 mx-auto mb-4" />
            <Skeleton className="h-4 w-48 mx-auto" />
          </div>

          <div className="space-y-8">
            {/* Policy Cards Skeleton */}
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-l-4">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Skeleton className="h-6 w-6 rounded" />
                    <Skeleton className="h-6 w-48" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
