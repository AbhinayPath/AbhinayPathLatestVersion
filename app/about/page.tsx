import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">About Abhinayपथ</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2D1A54] to-[#7E1F2E] mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl leading-relaxed text-gray-700 font-medium">
            A Professional Home for Theatre Practice & Technical Craft
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-16">
            <h2 className="font-playfair text-3xl font-bold mb-6 text-[#2D1A54]">Who We Are</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Abhinayपथ is a platform built to give theatre practitioners — actors and technical professionals — a
              credible, structured professional presence in an ecosystem where networking and opportunities are
              scattered across informal channels like WhatsApp and social media.
            </p>
            <p className="text-lg leading-relaxed text-gray-700 mt-4">
              We help serious theatre artists and backstage professionals showcase their work, training, and practice in
              one place so that visibility, collaboration, and career pathways become real, not accidental.
            </p>
          </section>

          <section className="mb-16">
            <h2 className="font-playfair text-3xl font-bold mb-6 text-[#2D1A54]">Founder Story</h2>
            <p className="text-lg leading-relaxed text-gray-700">
              Abhinayपथ was created by{" "}
              <a
                href="https://www.linkedin.com/in/tushar-upadhyay-9b260a16b/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7E1F2E] hover:text-[#2D1A54] font-medium underline decoration-2 underline-offset-2 transition-colors"
              >
                Tushar Upadhyay
              </a>
              , a theatre practitioner and technologist who experienced firsthand how difficult it is for theatre
              artists and technicians to build meaningful visibility beyond their immediate circles. Tushar saw
              colleagues struggle with lost messages, inconsistent portfolio links, and unclear pathways for training or
              collaboration — and decided to build a better system from within the community.
            </p>
          </section>

          <section className="mb-16 bg-gradient-to-br from-[#2D1A54]/5 to-[#7E1F2E]/5 p-8 md:p-12 rounded-xl">
            <h2 className="font-playfair text-3xl font-bold mb-6 text-[#2D1A54] text-center">
              Ecosystem Conversations
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 mb-10 text-center max-w-3xl mx-auto">
              Abhinayपथ continues to be informed by deep conversations with senior theatre practitioners, educators, and
              designers. These engagements help shape the platform's focus toward depth, craft, and long-term relevance
              in the theatre ecosystem.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/images/prasanna-heggodu.jpeg"
                    alt="Dialogue with Prasanna Heggodu"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-center font-medium text-gray-800">
                    Dialogue with Prasanna Heggodu — Theatre Director & Educator
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="relative aspect-[3/4]">
                  <Image
                    src="/images/zafer-mohiuddin.jpeg"
                    alt="Discussion with Zafer Mohiuddin"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <p className="text-center font-medium text-gray-800">
                    Discussion with Zafer Mohiuddin — Theatre Practitioner & Educator
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-[#2D1A54] text-center">Problem → Solution</h2>

            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-xl mb-4 text-red-900">The Problem</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>No structured portfolios</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Fragmented opportunity discovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Backstage work is invisible</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Dependence on WhatsApp/Instagram-based info</span>
                  </li>
                </ul>
              </div>

              <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="font-bold text-xl mb-4 text-green-900">The Solution</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Structured profiles (artists & technical pros)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Training & festival discovery</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Verified content (workshops, curated educational programs)</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">✓</span>
                    <span>Centralized directory</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-16 bg-[#2D1A54] text-white p-8 md:p-12 rounded-xl">
            <h2 className="font-playfair text-3xl font-bold mb-8 text-center">Mission & Vision</h2>

            <div className="space-y-8">
              <div>
                <h3 className="font-bold text-2xl mb-4 text-amber-300">Mission</h3>
                <p className="text-lg leading-relaxed text-gray-100">
                  To strengthen the foundation of the Indian theatre ecosystem by enabling credible professional
                  identity, discoverable training, and visibility for technical/design work.
                </p>
              </div>

              <div>
                <h3 className="font-bold text-2xl mb-4 text-amber-300">Vision</h3>
                <p className="text-lg leading-relaxed text-gray-100">
                  A world where theatre practitioners — on stage and behind it — have lifelong, structured opportunities
                  and recognition for their craft.
                </p>
              </div>
            </div>
          </section>

          <section className="text-center bg-gradient-to-br from-amber-50 to-orange-50 p-8 md:p-12 rounded-xl border-2 border-[#7E1F2E]/20">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-[#2D1A54]">
              Be Part of the Movement
            </h2>
            <p className="text-lg md:text-xl mb-8 text-gray-700">
              Create your professional profile or explore training & technical portfolios.
            </p>

            <div className="flex flex-col gap-4 sm:gap-5 justify-center items-stretch max-w-2xl mx-auto px-2 sm:px-4">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSeAHTz3-fdFQaU9Sht8u5h95K7-0dBWhksACEx8xkeoJRGPXw/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  size="lg"
                  className="rounded-full bg-[#2D1A54] hover:bg-[#231544] text-white text-xs xs:text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-5 md:py-6 h-auto font-medium transition-transform hover:scale-105 w-full shadow-md"
                >
                  <span className="flex items-center justify-center gap-3 sm:gap-4 w-full">
                    <span>Create Artist Profile</span>
                    <ExternalLink className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />
                  </span>
                </Button>
              </a>

              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSdfHZ-tbD5BE1s_MlurCqlcKnnbUDReDlEXxUkO42cX5X3G6w/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full border-2 border-[#7E1F2E] text-[#7E1F2E] hover:bg-[#7E1F2E] hover:text-white text-[9px] xs:text-[10px] sm:text-xs md:text-sm px-3 sm:px-4 md:px-5 py-4 sm:py-5 md:py-6 h-auto font-medium transition-transform hover:scale-105 w-full bg-transparent shadow-md min-h-[56px]"
                >
                  <span className="flex items-center justify-center gap-2 sm:gap-2.5 md:gap-3 w-full flex-wrap sm:flex-nowrap">
                    <span className="text-center leading-snug max-w-[85%] sm:max-w-full">
                      Create Technical and Design Portfolio
                    </span>
                    <ExternalLink className="h-3 w-3 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4 flex-shrink-0" />
                  </span>
                </Button>
              </a>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
