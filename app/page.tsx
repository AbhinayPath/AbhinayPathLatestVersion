import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, Award, Calendar, GraduationCap, Sparkles } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { PlausibleAnalytics } from "@/components/analytics"
// Uncomment and add your domain to enable Plausible Analytics
// <PlausibleAnalytics domain="yourdomain.com" />

// import { PostHogAnalytics } from "@/components/analytics"
// Uncomment and add your API key to enable PostHog Analytics
// <PostHogAnalytics apiKey="your-api-key" />

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2D1A54] via-[#4A2A82] to-[#2D1A54] text-white overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/images/hero-bg.png" alt="Stage Background" fill className="object-cover" priority />
        </div>
        <div className="container relative z-10 py-24 md:py-32">
          <div className="max-w-3xl space-y-8">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Beta Access Available
            </Badge>
            <h1 className="font-playfair text-5xl md:text-6xl font-bold leading-tight">
              India's creative platform to discover auditions, workshops & prep support
            </h1>
            <p className="text-xl md:text-2xl opacity-90">
              Connecting actors, directors, and backstage professionals across theatre, film & web.
            </p>
            <div className="pt-4">
              <Link href="/join-community">
                <Button
                  size="lg"
                  className="rounded-full bg-[#F5A623] text-[#2D1A54] hover:bg-[#e69b1e] text-lg px-8 py-6 h-auto font-medium transition-transform hover:scale-105"
                >
                  Join Beta Community <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full opacity-20"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500 rounded-full opacity-20"></div>
      </section>

      {/* Main Features Section */}
      <section className="py-20 md:py-28">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="bg-[#2D1A54]/10 text-[#2D1A54] hover:bg-[#2D1A54]/20 mb-4">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Core Features
            </Badge>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">
              Your Creative Journey Starts Here
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              AbhinayPath brings together everything you need to succeed in the creative arts industry.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="h-full hover:shadow-xl transition-all border-2 border-gray-100 hover:border-[#2D1A54]/20 overflow-hidden group rounded-xl transform transition-transform hover:-translate-y-2">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src="/images/auditions-stage.png"
                  alt="Find Casting Calls"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <div className="bg-[#F5A623] p-2 rounded-full inline-block mb-2">
                      <Award className="h-6 w-6 text-[#2D1A54]" />
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col items-center text-center">
                <h3 className="font-playfair text-2xl font-bold mb-3">Find Casting Calls</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Discover verified audition opportunities for theater, film, and web series from trusted production
                  houses.
                </p>
                <Link href="/auditions">
                  <Button
                    variant="outline"
                    className="rounded-full mt-2 border-[#2D1A54] text-[#2D1A54] hover:bg-[#2D1A54] hover:text-white transition-all"
                  >
                    Explore Auditions <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-xl transition-all border-2 border-gray-100 hover:border-[#2D1A54]/20 overflow-hidden group rounded-xl transform transition-transform hover:-translate-y-2">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src="/images/acting-workshop.png"
                  alt="Skill Up with Workshops"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <div className="bg-[#F5A623] p-2 rounded-full inline-block mb-2">
                      <Calendar className="h-6 w-6 text-[#2D1A54]" />
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col items-center text-center">
                <h3 className="font-playfair text-2xl font-bold mb-3">Skill Up with Workshops</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Enhance your craft with workshops and training sessions led by industry professionals and experts.
                </p>
                <Link href="/workshops">
                  <Button
                    variant="outline"
                    className="rounded-full mt-2 border-[#2D1A54] text-[#2D1A54] hover:bg-[#2D1A54] hover:text-white transition-all"
                  >
                    Browse Workshops <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="h-full hover:shadow-xl transition-all border-2 border-gray-100 hover:border-[#2D1A54]/20 overflow-hidden group rounded-xl transform transition-transform hover:-translate-y-2">
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src="/images/acting-school.png"
                  alt="Prep for Top Institutes"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                  <div className="p-4">
                    <div className="bg-[#F5A623] p-2 rounded-full inline-block mb-2">
                      <GraduationCap className="h-6 w-6 text-[#2D1A54]" />
                    </div>
                  </div>
                </div>
              </div>
              <CardContent className="p-8 flex flex-col items-center text-center">
                <h3 className="font-playfair text-2xl font-bold mb-3">Prep for Top Institutes</h3>
                <p className="text-gray-600 mb-6 text-lg">
                  Get guidance from NSD/FTII alumni for entrance exams to prestigious institutions. Expert mentorship
                  available.
                </p>
                <Link href="/admissions">
                  <Button
                    variant="outline"
                    className="rounded-full mt-2 border-[#2D1A54] text-[#2D1A54] hover:bg-[#2D1A54] hover:text-white transition-all"
                  >
                    Get Preparation Help <ArrowRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Coming Soon Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-[#2D1A54]/5 to-[#F5A623]/5">
        <div className="container">
          <div className="text-center mb-16">
            <Badge className="bg-[#2D1A54]/10 text-[#2D1A54] hover:bg-[#2D1A54]/20 mb-4">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Coming Soon
            </Badge>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">
              More Features on the Horizon
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We're building additional tools to support your creative journey. Join our beta to get early access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Networking Platform",
                description: "Connect with fellow artists, directors, and producers to collaborate on projects.",
                icon: "👥",
              },
              {
                title: "Backstage Opportunities",
                description: "Find jobs in production, costume design, set design, and more.",
                icon: "🎭",
              },
              {
                title: "Resources Library",
                description: "Access scripts, monologues, and educational materials for your practice.",
                icon: "📚",
              },
              {
                title: "Artist Profiles",
                description: "Create your professional portfolio to showcase your work and get discovered.",
                icon: "🌟",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all border border-gray-100 transform transition-transform hover:-translate-y-2"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-xl mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-r from-[#2D1A54] via-[#4A2A82] to-[#2D1A54] text-white relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/images/hero-bg.png" alt="Background" fill className="object-cover" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">
              <Sparkles className="h-3.5 w-3.5 mr-1" />
              Limited Beta Access
            </Badge>
            <h2 className="font-playfair text-4xl md:text-5xl font-bold">
              Ready to Take Your Creative Career to the Next Level?
            </h2>
            <p className="text-xl opacity-90">
              Join our community of passionate artists and unlock a world of opportunities.
            </p>
            <div className="pt-6">
              <Link href="/join-community">
                <Button
                  size="lg"
                  className="rounded-full bg-[#F5A623] text-[#2D1A54] hover:bg-[#e69b1e] text-lg px-8 py-6 h-auto font-medium transition-transform hover:scale-105"
                >
                  Join AbhinayPath Beta <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full opacity-20"></div>
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-indigo-500 rounded-full opacity-20"></div>
      </section>
    </div>
  )
}
