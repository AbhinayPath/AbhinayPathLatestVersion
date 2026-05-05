import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function WorkshopsLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb skeleton */}
      <div className="border-b bg-muted/30 py-3">
        <div className="container mx-auto px-4">
          <Skeleton className="h-4 w-64" />
        </div>
      </div>

      {/* Hero section skeleton */}
      <div className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-12 w-3/4 mb-6" />
          <Skeleton className="h-4 w-full max-w-4xl mb-2" />
          <Skeleton className="h-4 w-full max-w-4xl mb-2" />
          <Skeleton className="h-4 w-2/3 max-w-4xl" />
        </div>
      </div>

      {/* Workshops grid skeleton */}
      <div className="py-12">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-64 mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                  <div className="flex gap-2 pt-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-24" />
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
