export default function WorkshopDetailLoading() {
  return (
    <div className="container py-12">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="h-64 w-full bg-gray-200 animate-pulse"></div>

        <div className="p-8">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-8"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div>
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-start">
                    <div className="h-5 w-5 bg-gray-200 rounded-full mr-2"></div>
                    <div>
                      <div className="h-5 w-32 bg-gray-200 rounded animate-pulse mb-1"></div>
                      <div className="h-4 w-48 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-16 bg-gray-100 rounded-md animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t pt-6">
            <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-4"></div>
            <div className="flex justify-between">
              <div className="h-6 w-40 bg-gray-200 rounded animate-pulse"></div>
              <div className="flex gap-3">
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-10 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
