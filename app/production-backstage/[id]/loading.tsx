import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <section className="relative py-12 sm:py-16 md:py-20 px-4">
        <div className="container max-w-6xl">
          <Skeleton className="h-10 w-48 mb-6 sm:mb-8" />

          <Card className="overflow-hidden border-0 shadow-2xl">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 p-6 sm:p-8 md:p-12">
              <div className="space-y-4">
                <Skeleton className="w-full aspect-[3/4] rounded-2xl" />
              </div>

              <div className="space-y-6">
                <div className="space-y-4">
                  <Skeleton className="h-12 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                </div>

                <div className="space-y-3">
                  <Skeleton className="h-6 w-32" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-32" />
                    <Skeleton className="h-8 w-28" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-8 w-32" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-6 w-16" />
                  <Skeleton className="h-6 w-48" />
                </div>

                <div className="pt-4 flex flex-wrap gap-3">
                  <Skeleton className="h-11 w-40" />
                  <Skeleton className="h-11 w-36" />
                </div>
              </div>
            </div>

            <div className="border-t bg-muted/30 p-6 sm:p-8 md:p-12">
              <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-10 w-32" />
                  <Skeleton className="h-10 w-40" />
                  <Skeleton className="h-10 w-36" />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}
