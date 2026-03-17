export default function AuditionDetailLoading() {
  return (
    <div className="container py-8 sm:py-12 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-8"></div>

        <div className="bg-white rounded-2xl overflow-hidden shadow-xl border border-gray-100">
          {/* Header Image Shimmer */}
          <div className="h-64 sm:h-96 w-full bg-gray-200 animate-pulse relative">
             <div className="absolute bottom-6 left-6 right-6 space-y-4">
                <div className="flex gap-2">
                   <div className="h-6 w-20 bg-gray-300/50 rounded-full"></div>
                   <div className="h-6 w-32 bg-gray-300/50 rounded-full"></div>
                </div>
                <div className="h-10 w-2/3 bg-gray-300/50 rounded-lg"></div>
             </div>
          </div>

          <div className="p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-10">
                {/* Meta Row Shimmer */}
                <div className="h-20 w-full bg-gray-50 rounded-xl animate-pulse border border-gray-100"></div>

                {/* Description Shimmer */}
                <div className="space-y-4">
                   <div className="h-8 w-40 bg-gray-200 rounded animate-pulse"></div>
                   <div className="space-y-2">
                      <div className="h-4 w-full bg-gray-100 rounded"></div>
                      <div className="h-4 w-full bg-gray-100 rounded"></div>
                      <div className="h-4 w-5/6 bg-gray-100 rounded"></div>
                   </div>
                </div>

                {/* Requirements Shimmer */}
                <div className="space-y-4 pt-8 border-t border-gray-100">
                   <div className="h-8 w-48 bg-gray-200 rounded animate-pulse"></div>
                   <div className="flex gap-2">
                      <div className="h-8 w-24 bg-gray-100 rounded-lg"></div>
                      <div className="h-8 w-24 bg-gray-100 rounded-lg"></div>
                      <div className="h-8 w-32 bg-gray-100 rounded-lg"></div>
                   </div>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="h-80 w-full bg-purple-50/50 rounded-2xl animate-pulse border border-purple-100"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
