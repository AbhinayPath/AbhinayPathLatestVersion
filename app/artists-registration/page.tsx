import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, ArrowRight, Sparkles, UserPlus } from "lucide-react"

export default function ArtistsRegistrationPage() {
  const googleFormLink =
    "https://docs.google.com/forms/d/e/1FAIpQLSdfHZ-tbD5BE1s_MlurCqlcKnnbUDReDlEXxUkO42cX5X3G6w/viewform"

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2D1A54] via-[#4A2A82] to-[#2D1A54] text-white overflow-hidden py-20 lg:py-32">
        <div className="absolute inset-0 z-0 opacity-20">
          <Image src="/images/hero-bg.png" alt="Background" fill className="object-cover" priority />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge className="bg-white/20 text-white hover:bg-white/30 mb-4">
              <UserPlus className="h-3.5 w-3.5 mr-1" />
              Join Our Community
            </Badge>
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Register as an Artist
            </h1>
            <p className="text-lg md:text-xl opacity-90 leading-relaxed max-w-2xl mx-auto">
              Join the Abhinayपथ community to get discovered, access exclusive opportunities, and connect with fellow
              creators.
            </p>
            <div className="pt-6">
              <Link href={googleFormLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="rounded-full bg-[#F5A623] text-[#2D1A54] hover:bg-[#e69b1e] text-lg px-8 py-6 h-auto font-medium transition-transform hover:scale-105 shadow-lg"
                >
                  Register Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-[#2D1A54]">Why Register?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Become part of a thriving ecosystem designed to support your artistic journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="border-none shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-[#2D1A54]/10 p-4 rounded-full mb-6">
                  <Sparkles className="h-8 w-8 text-[#2D1A54]" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-[#2D1A54]">Get Discovered</h3>
                <p className="text-gray-600">
                  Create a professional profile that casting directors and producers can view.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-[#F5A623]/20 p-4 rounded-full mb-6">
                  <CheckCircle className="h-8 w-8 text-[#F5A623]" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-[#2D1A54]">Verified Opportunities</h3>
                <p className="text-gray-600">Access legitimate auditions and workshops vetted by our team.</p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-8 flex flex-col items-center text-center">
                <div className="bg-[#2D1A54]/10 p-4 rounded-full mb-6">
                  <UserPlus className="h-8 w-8 text-[#2D1A54]" />
                </div>
                <h3 className="font-bold text-xl mb-3 text-[#2D1A54]">Community Access</h3>
                <p className="text-gray-600">Network with other artists, find collaborators, and share resources.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="bg-[#2D1A54] rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto space-y-6">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold">Ready to Start?</h2>
              <p className="text-white/80 text-lg">
                It only takes a few minutes to fill out the registration form and join our network.
              </p>
              <Link href={googleFormLink} target="_blank" rel="noopener noreferrer">
                <Button
                  size="lg"
                  className="rounded-full bg-[#F5A623] text-[#2D1A54] hover:bg-[#e69b1e] text-lg px-8 py-6 h-auto font-medium mt-4"
                >
                  Go to Registration Form <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>

            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2"></div>
          </div>
        </div>
      </section>
    </div>
  )
}
