import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Quote } from "lucide-react"

export function RecommendationsCard() {
  const recommendations = [
    {
      id: 1,
      name: "Marcus Thorne",
      title: "Senior Director at Stellar Productions",
      text: "An absolute professional on set. Always prepared, takes direction incredibly well, and brings a unique energy to every scene. I would highly recommend for any dramatic role.",
      date: "October 12, 2025"
    },
    {
      id: 2,
      name: "Elena Rodriguez",
      title: "Choreographer",
      text: "Exceptional dedication to learning complex routines. Mastered the contemporary pieces in record time and brought an emotional depth to the performance that elevated the entire show.",
      date: "August 4, 2025"
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-6">Recommendations</h2>
      
      <div className="space-y-6">
        {recommendations.map((rec) => (
          <div key={rec.id} className="relative pb-6 border-b border-gray-50 last:border-0 last:pb-0">
            <Quote className="absolute top-0 right-0 w-8 h-8 text-gray-100 rotate-180" />
            <div className="flex items-start gap-4">
              <Avatar className="w-12 h-12 border border-gray-200">
                <AvatarFallback className="bg-primary/10 text-primary">{rec.name.split(' ').map(n=>n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-gray-900">{rec.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{rec.title}</p>
                <p className="text-sm text-gray-700 leading-relaxed italic">"{rec.text}"</p>
                <p className="text-xs text-gray-400 mt-2">{rec.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
