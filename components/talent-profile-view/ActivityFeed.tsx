import { ThumbsUp, MessageSquare, Share2, MoreHorizontal } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ActivityFeed() {
  // Using static mock data for now
  const activities = [
    {
      id: 1,
      user: { name: "Sarah Jenkins", title: "Casting Director at Horizon Media", avatar: "" },
      action: "commented on this",
      time: "2h",
      content: "Just wrapped up filming for the new web series! It was an incredible experience working with such a talented cast and crew. Can't wait for you all to see it next month. 🎬✨ #ActingLife #WebSeries #WrapDay",
      likes: 124,
      comments: 18,
      shares: 5
    },
    {
      id: 2,
      user: { name: "Alex Chen", title: "Independent Filmmaker", avatar: "" },
      action: "liked this",
      time: "1d",
      content: "Looking for a lead actor for my upcoming short film. Must be proficient in martial arts and able to speak Mandarin. DM me with your reel! 🥋🎥",
      likes: 45,
      comments: 12,
      shares: 20
    }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">Activity</h2>
        <button className="text-gray-500 hover:bg-gray-100 p-1.5 rounded-full transition-colors">
          <MoreHorizontal className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {activities.map((activity, index) => (
          <div key={activity.id} className="pb-6 border-b border-gray-100 last:border-0 last:pb-0">
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-3">
              <span className="font-semibold text-gray-900">{activity.user.name}</span>
              <span>{activity.action} • {activity.time}</span>
            </div>
            
            <div className="bg-gray-50/50 rounded-xl p-4 border border-gray-100">
              <div className="flex items-center gap-3 mb-3">
                <Avatar className="w-10 h-10 border border-gray-200">
                  <AvatarImage src={activity.user.avatar} />
                  <AvatarFallback className="bg-primary/10 text-primary">{activity.user.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{activity.user.name}</h4>
                  <p className="text-xs text-gray-500">{activity.user.title}</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {activity.content}
              </p>
              
              <div className="flex items-center gap-4 text-xs text-gray-500 pt-3 border-t border-gray-200">
                <button className="flex items-center hover:text-primary transition-colors">
                  <ThumbsUp className="w-4 h-4 mr-1.5" /> {activity.likes}
                </button>
                <button className="flex items-center hover:text-primary transition-colors">
                  <MessageSquare className="w-4 h-4 mr-1.5" /> {activity.comments}
                </button>
                <button className="flex items-center hover:text-primary transition-colors ml-auto">
                  <Share2 className="w-4 h-4 mr-1.5" /> Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 rounded-lg transition-colors border border-transparent hover:border-gray-200">
        Show all activity
      </button>
    </div>
  )
}
