import { Play, ArrowRight, ExternalLink } from "lucide-react"

export function FeaturedContent() {
  // Using static mock data for now
  const featuredItems = [
    {
      id: 1,
      type: "Article",
      title: "My Journey in the Theatre: 10 Lessons Learned",
      image: "https://images.unsplash.com/photo-1507676184212-d0330a156520?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 2,
      type: "Video",
      title: "Showreel 2026 - Acting Highlights",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#"
    },
    {
      id: 3,
      type: "Case Study",
      title: "Directing the Award-Winning Indie Film 'Neon Hearts'",
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "#"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Featured</h2>
        <a href="#" className="text-sm font-medium text-primary hover:underline flex items-center">
          View all <ArrowRight className="w-4 h-4 ml-1" />
        </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {featuredItems.map(item => (
          <div key={item.id} className="group flex flex-col border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
            <div className="aspect-video relative overflow-hidden bg-gray-100">
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {item.type === 'Video' && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <Play className="w-4 h-4 text-gray-900 ml-1" />
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 flex-1 flex flex-col">
              <div className="text-xs font-semibold text-primary mb-1 uppercase tracking-wider">{item.type}</div>
              <h3 className="font-semibold text-gray-900 text-base leading-snug line-clamp-2 mb-2">{item.title}</h3>
              <a href={item.link} className="mt-auto inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
                View post <ExternalLink className="w-3.5 h-3.5 ml-1.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
