import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">About Abhinayपथ</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2D1A54] to-[#7E1F2E] mx-auto"></div>
        </div>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl leading-relaxed mb-12 text-center">
            India's trusted platform connecting creative talent with verified auditions, expert workshops, and institute
            preparation. Backed by NSD and FTII alumni.
          </p>

          <div className="bg-[#2D1A54]/5 p-8 rounded-xl my-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl mb-4">🎭</div>
                <h3 className="font-bold text-xl mb-3">Verified Auditions</h3>
                <p className="text-gray-600">Curated casting calls from trusted production houses.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl mb-4">🎓</div>
                <h3 className="font-bold text-xl mb-3">Expert Workshops</h3>
                <p className="text-gray-600">Skill-building sessions led by industry professionals.</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm text-center">
                <div className="text-4xl mb-4">📚</div>
                <h3 className="font-bold text-xl mb-3">Institute Preparation</h3>
                <p className="text-gray-600">Guidance for NSD and FTII entrance exams.</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-playfair text-3xl font-bold mb-6">Join Our Beta Community</h2>
            <p className="text-lg mb-8">Be part of India's creative revolution from day one.</p>
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
