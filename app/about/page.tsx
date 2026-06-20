import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"
import Link from "next/link"

function AboutContent() {
  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-[#2D1A54]">About Abhinayपथ</h1>
          <p className="text-xl md:text-2xl text-gray-700 font-medium mb-2">
            Connecting Theatre, Institutions & Cultural Communities
          </p>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Abhinayपथ is building cultural infrastructure for theatre and performing arts in India. We bring together artists, theatre groups, institutions, and audiences through opportunities, collaborations, and meaningful live experiences.
          </p>
        </div>
      </section>

      {/* WHY WE EXIST */}
      <section className="bg-gradient-to-br from-[#2D1A54]/5 to-[#7E1F2E]/5 py-16 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-12 text-center text-[#2D1A54]">Why We Exist</h2>
          <div className="space-y-6 text-lg text-gray-700">
            <p><span className="font-semibold text-[#7E1F2E]">The theatre ecosystem remains fragmented.</span></p>
            <ul className="space-y-4 ml-6">
              <li className="flex items-start">
                <span className="mr-4 text-[#7E1F2E] font-bold">•</span>
                <span>Artists search across WhatsApp groups.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-[#7E1F2E] font-bold">•</span>
                <span>Institutions struggle to find credible productions.</span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-[#7E1F2E] font-bold">•</span>
                <span>Theatre groups often lack access to audiences and stages.</span>
              </li>
            </ul>
            <p className="pt-4"><span className="font-semibold text-[#2D1A54]">Abhinayपथ exists to connect these worlds.</span></p>
          </div>
        </div>
      </section>

      {/* WHAT WE DO */}
      <section className="container py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-12 text-center text-[#2D1A54]">What We Do</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white border-2 border-[#2D1A54]/20 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <h3 className="font-playfair text-2xl font-bold mb-3 text-[#2D1A54]">Opportunities</h3>
              <p className="text-gray-700">Auditions, workshops, festivals and learning.</p>
            </div>
            <div className="bg-white border-2 border-[#2D1A54]/20 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <h3 className="font-playfair text-2xl font-bold mb-3 text-[#2D1A54]">Artist Profiles</h3>
              <p className="text-gray-700">Professional visibility for actors, directors, technicians and production teams.</p>
            </div>
            <div className="bg-white border-2 border-[#2D1A54]/20 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <h3 className="font-playfair text-2xl font-bold mb-3 text-[#2D1A54]">Cultural Programming</h3>
              <p className="text-gray-700">Curated theatre experiences for institutions and communities.</p>
            </div>
            <div className="bg-white border-2 border-[#2D1A54]/20 rounded-lg p-8 hover:shadow-lg transition-shadow">
              <h3 className="font-playfair text-2xl font-bold mb-3 text-[#2D1A54]">Collaborations</h3>
              <p className="text-gray-700">Connecting theatre groups with universities, clubs and cultural spaces.</p>
            </div>
          </div>
        </div>
      </section>

      {/* COLLABORATIONS */}
      <section className="bg-gradient-to-br from-amber-50 to-orange-50 py-16 md:py-24">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-12 text-center text-[#2D1A54]">Recent Collaborations</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
            <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow">
              <Image
                src="/images/azim-premji-university-logo.png"
                alt="Azim Premji University"
                width={150}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow">
              <Image
                src="/images/indian-heritage-academy-logo.png"
                alt="Indian Heritage Academy"
                width={150}
                height={80}
                className="object-contain"
              />
            </div>
            <div className="flex items-center justify-center bg-white p-6 rounded-lg shadow col-span-2 md:col-span-1">
              <Image
                src="/images/kahe-vidushak-foundation-logo.png"
                alt="Kahe Vidushak Foundation"
                width={150}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
          <p className="text-center text-lg text-gray-700 mb-8">
            Abhinayपथ has collaborated with institutions and theatre groups to present meaningful productions and cultural experiences.
          </p>
          <div className="text-center">
            <Link href="/collaborations">
              <Button
                size="lg"
                className="rounded-full bg-[#2D1A54] hover:bg-[#231544] text-white px-8 py-6 h-auto font-medium transition-transform hover:scale-105"
              >
                Explore Collaborations →
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* OUR VISION */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-12 text-center text-[#2D1A54]">Our Vision</h2>
          <div className="mb-12">
            <p className="text-lg text-gray-700 text-center mb-8">
              <span className="line-through text-gray-400">India&apos;s LinkedIn for theatre.</span>
            </p>
            <p className="text-lg md:text-xl font-semibold text-center text-[#2D1A54] mb-8">
              Instead, building a connected theatre ecosystem.
            </p>
          </div>
          <div className="bg-[#2D1A54] text-white p-8 md:p-12 rounded-lg">
            <p className="text-lg md:text-xl mb-8 text-center font-semibold">We imagine a future where:</p>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="mr-4 text-amber-300 font-bold">•</span>
                <span>artists find opportunities with dignity,</span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-amber-300 font-bold">•</span>
                <span>institutions access meaningful cultural programs,</span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-amber-300 font-bold">•</span>
                <span>theatre groups reach new audiences,</span>
              </li>
              <li className="flex items-start">
                <span className="mr-4 text-amber-300 font-bold">•</span>
                <span>and communities experience the power of live performance.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* WHO WE WORK WITH */}
      <section className="bg-gradient-to-br from-[#2D1A54]/5 to-[#7E1F2E]/5 py-16 md:py-24">
        <div className="container max-w-5xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-12 text-center text-[#2D1A54]">Who We Work With</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-8 border-l-4 border-[#2D1A54]">
              <h3 className="font-playfair text-2xl font-bold mb-3 text-[#2D1A54]">Artists</h3>
              <p className="text-gray-700">Actors, directors, technicians and mentors.</p>
            </div>
            <div className="bg-white rounded-lg p-8 border-l-4 border-[#7E1F2E]">
              <h3 className="font-playfair text-2xl font-bold mb-3 text-[#2D1A54]">Theatre Groups</h3>
              <p className="text-gray-700">Productions seeking visibility and audiences.</p>
            </div>
            <div className="bg-white rounded-lg p-8 border-l-4 border-amber-600">
              <h3 className="font-playfair text-2xl font-bold mb-3 text-[#2D1A54]">Institutions</h3>
              <p className="text-gray-700">Universities, clubs and cultural communities.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER SECTION */}
      <section className="container py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-8 text-[#2D1A54]">Built by an artist and engineer</h2>
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              Abhinayपथ was started by <span className="font-semibold">Tushar Upadhyay</span> out of a simple problem — the lack of a connected ecosystem for theatre artists.
            </p>
            <p>
              What began as a search for auditions and mentorship gradually evolved into a broader effort to connect artists, institutions, and audiences.
            </p>
            <p className="font-semibold text-[#2D1A54]">The journey is still unfolding.</p>
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-[#2D1A54] text-white py-16 md:py-24">
        <div className="container max-w-4xl mx-auto">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-12 text-center">Collaborate With AbhinayPath</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur p-8 rounded-lg">
              <h3 className="font-playfair text-2xl font-bold mb-4 text-amber-300">For Theatre Groups</h3>
              <p className="text-white/90 mb-6">
                Bring your productions to institutions and new audiences.
              </p>
              <a href="https://wa.me/919810000000" target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="rounded-full bg-amber-500 hover:bg-amber-600 text-[#2D1A54] px-6 h-auto font-medium transition-transform hover:scale-105"
                >
                  👉 WhatsApp Us
                </Button>
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur p-8 rounded-lg">
              <h3 className="font-playfair text-2xl font-bold mb-4 text-amber-300">For Institutions</h3>
              <p className="text-white/90 mb-6">
                Curate meaningful theatre experiences for your community.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="rounded-full bg-amber-500 hover:bg-amber-600 text-[#2D1A54] px-6 h-auto font-medium transition-transform hover:scale-105"
                >
                  👉 Start a Conversation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default function AboutPage() {
  return <AboutContent />
}
