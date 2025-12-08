import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"

export default function ArtistProfileLoading() {
  return (
    <main className="min-h-screen bg-background">
      <div className="bg-gradient-to-b from-amber-950/20 to-background">
        <div className="container mx-auto px-4 py-6">
          <Skeleton className="h-10 w-48" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <Card className="overflow-hidden border-amber-900/20">
              <Skeleton className="aspect-square w-full" />
              <CardContent className="p-6">
                <Skeleton className="h-8 w-3/4 mb-4" />
                <Skeleton className="h-4 w-1/2 mb-2" />
                <Skeleton className="h-4 w-1/3 mb-6" />
                <div className="flex gap-3">
                  <Skeleton className="h-9 w-24" />
                  <Skeleton className="h-9 w-24" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Card className="border-amber-900/20">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-24 mb-4" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>

            <Card className="border-amber-900/20">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-32 mb-4" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-amber-900/20">
              <CardContent className="p-6">
                <Skeleton className="h-6 w-28 mb-4" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-18" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  )
}
