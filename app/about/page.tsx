import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Target, Users, Lightbulb, Heart, Award, Globe } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-[#2D1A54] via-[#4A2A82] to-[#2D1A54] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold">About Abhinayपथ</h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Bridging the gap between aspiring artists and opportunities in India's performing arts industry.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-block">
                <span className="bg-[#F5A623] text-[#2D1A54] px-4 py-2 rounded-full text-sm font-semibold">
                  Our Mission
                </span>
              </div>
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900">
                Democratizing Access to Performing Arts Opportunities
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed">
                Abhinayपथ was founded with a simple yet powerful vision: to create a centralized platform where artists,
                directors, and production houses can connect seamlessly. We believe that talent should not be limited by
                geographical boundaries or lack of industry connections.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                From theatre auditions to film casting calls, from acting workshops to entrance exam preparation for
                prestigious institutes like NSD and FTII, we're building a comprehensive ecosystem for the performing
                arts community in India.
              </p>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
              <Image src="/images/community.png" alt="Abhinayपथ Community" fill className="object-cover" priority />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              The principles that guide everything we do at Abhinayपथ
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: "Accessibility",
                description:
                  "Making opportunities accessible to artists from all backgrounds, regardless of their location or connections.",
              },
              {
                icon: Users,
                title: "Community First",
                description:
                  "Building a supportive community where artists can grow, learn, and collaborate with each other.",
              },
              {
                icon: Lightbulb,
                title: "Innovation",
                description:
                  "Continuously evolving our platform to better serve the needs of the performing arts community.",
              },
              {
                icon: Heart,
                title: "Authenticity",
                description:
                  "Promoting genuine opportunities and maintaining the integrity of the performing arts industry.",
              },
              {
                icon: Award,
                title: "Excellence",
                description:
                  "Striving for excellence in everything we do, from our platform features to our customer support.",
              },
              {
                icon: Globe,
                title: "Inclusivity",
                description:
                  "Celebrating diversity and creating a platform that welcomes artists from all backgrounds and disciplines.",
              },
            ].map((value, index) => (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6 text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#F5A623] text-[#2D1A54] mb-4">
                    <value.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-bold text-xl mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Story</h2>
              <p className="text-lg text-gray-700">How Abhinayपथ came to be</p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed">
                The idea for Abhinayपथ was born from the personal experiences of our founders, who witnessed firsthand
                the challenges aspiring actors and theatre artists face in finding legitimate opportunities. Too often,
                talented individuals would miss out on auditions simply because they weren't part of the right networks
                or didn't have access to timely information.
              </p>

              <p className="text-gray-700 leading-relaxed">
                We realized that while India has a rich tradition in performing arts and a thriving entertainment
                industry, there was no centralized platform connecting artists with opportunities. Information was
                scattered across social media groups, personal networks, and word-of-mouth – making it difficult for
                newcomers to break into the industry.
              </p>

              <p className="text-gray-700 leading-relaxed">
                In 2024, we launched Abhinayपथ with a vision to change this. Starting with theatre and film auditions,
                we've gradually expanded to include workshops, institute preparation courses, job opportunities in
                production, and a thriving community space where artists can network and collaborate.
              </p>

              <p className="text-gray-700 leading-relaxed">
                Today, Abhinayपथ serves thousands of artists across India, from aspiring actors preparing for their
                first audition to seasoned professionals looking for their next big role. We're proud to be playing a
                small part in democratizing access to opportunities in India's performing arts industry.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-r from-[#2D1A54] via-[#4A2A82] to-[#2D1A54] text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="font-playfair text-3xl md:text-4xl font-bold">Join the Abhinayपथ Community</h2>
            <p className="text-xl opacity-90">
              Be part of India's growing community of passionate performing arts professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/join-community">
                <Button
                  size="lg"
                  className="rounded-full bg-[#F5A623] text-[#2D1A54] hover:bg-[#e69b1e] text-lg px-8 py-6 h-auto font-medium"
                >
                  Join Beta Community
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full bg-transparent border-2 border-white text-white hover:bg-white hover:text-[#2D1A54] text-lg px-8 py-6 h-auto font-medium"
                >
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
