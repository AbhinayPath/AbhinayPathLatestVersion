import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ActorProfileLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      {/* ESSENCE Section Loading */}
      <section className="relative bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="container relative py-16 md:py-24">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <Skeleton className="h-48 w-48 md:h-56 md:w-56 rounded-full bg-white/20" />
            <div className="flex-1 space-y-4 text-center md:text-left w-full">
              <Skeleton className="h-12 w-64 mx-auto md:mx-0 bg-white/20" />
              <Skeleton className="h-6 w-48 mx-auto md:mx-0 bg-white/20" />
              <Skeleton className="h-20 w-full max-w-3xl mx-auto md:mx-0 bg-white/20" />
              <div className="flex gap-3 justify-center md:justify-start">
                <Skeleton className="h-12 w-32 rounded-full bg-white/20" />
                <Skeleton className="h-12 w-32 rounded-full bg-white/20" />
                <Skeleton className="h-12 w-32 rounded-full bg-white/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CRAFT Section Loading */}
      <section className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-64 mx-auto mb-3" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-40" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-40" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-32" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-20" />
                  <Skeleton className="h-6 w-16" />
                </div>
              </CardContent>
            </Card>
            <Card className="md:col-span-2">
              <CardHeader>
                <Skeleton className="h-6 w-48" />
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {[...Array(5)].map((_, i) => (
                    <Skeleton key={i} className="h-6 w-24" />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* SHOWCASE Section Loading */}
      <section className="py-16 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container">
          <div className="text-center mb-12">
            <Skeleton className="h-10 w-48 mx-auto mb-3" />
            <Skeleton className="h-6 w-80 mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
