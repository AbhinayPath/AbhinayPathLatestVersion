import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb skeleton */}
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <Skeleton className="h-4 w-48" />
        </div>
      </div>

      {/* Hero section skeleton */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-12 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-8 w-40 mx-auto mb-6" />
          <Skeleton className="h-14 w-3/4 mx-auto mb-6" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
        </div>
      </section>

      {/* Categories section skeleton */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Skeleton className="h-8 w-64 mx-auto mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[1, 2, 3].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="w-12 h-12 rounded-lg mb-4" />
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
