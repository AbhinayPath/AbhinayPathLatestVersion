import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {

  console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("SUPABASE ANON KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  console.log("SUPABASE SERVICE ROLE KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">About AbhinayPath</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2D1A54] to-[#7E1F2E] mx-auto"></div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed mb-8">
            AbhinayPath is India's creative platform for actors, directors, and creators to discover auditions,
            workshops, and exam prep support — across theatre, film & digital. We're building a trusted space where
            opportunities meet preparation, with alumni support from NSD, FTII and more.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 my-16">
            <div className="space-y-6">
              <h2 className="font-playfair text-3xl font-bold">Our Mission</h2>
              <p className="text-gray-700">
                To create a trusted ecosystem where creative talent can discover opportunities, enhance their skills,
                and connect with industry professionals across India's vibrant performing arts landscape.
              </p>
            </div>
            <div className="space-y-6">
              <h2 className="font-playfair text-3xl font-bold">Our Vision</h2>
              <p className="text-gray-700">
                To become the definitive platform that bridges the gap between talent and opportunity in India's
                theatre, film, and digital entertainment industries.
              </p>
            </div>
          </div>

          <div className="bg-[#2D1A54]/5 p-8 rounded-xl my-16">
            <h2 className="font-playfair text-3xl font-bold mb-6">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="font-bold text-xl mb-3">Verified Auditions</h3>
                <p className="text-gray-600">
                  Curated casting calls from trusted production houses across theatre, film, and digital platforms.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="font-bold text-xl mb-3">Expert Workshops</h3>
                <p className="text-gray-600">
                  Skill-building sessions led by industry professionals to enhance your craft and performance abilities.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="font-bold text-xl mb-3">Institute Preparation</h3>
                <p className="text-gray-600">
                  Guidance and resources for entrance exams to prestigious institutions like NSD and FTII.
                </p>
              </div>
            </div>
          </div>

          <h2 className="font-playfair text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl leading-relaxed mb-8">
            We're currently in beta, building a community of passionate artists and creators. Join us to be part of this
            journey from the beginning and help shape the future of AbhinayPath.
          </p>

          <div className="text-center mt-12">
            <Link href="/join-community">
              <Button
                size="lg"
                className="rounded-full bg-[#2D1A54] hover:bg-[#231544] text-white text-lg px-8 py-6 h-auto font-medium transition-transform hover:scale-105"
              >
                Join Beta Community <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
