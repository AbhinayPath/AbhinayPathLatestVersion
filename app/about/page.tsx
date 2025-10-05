import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Users, Target, Heart, Award } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="relative py-20 bg-gradient-to-br from-primary/5 via-white to-secondary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 font-playfair">About Abhinayपथ</h1>
            <p className="text-lg text-gray-700 mb-8">
              Abhinayपथ is India's premier platform connecting talented artists with opportunities in theatre, film, and
              performing arts. We bridge the gap between aspiring artists and industry professionals through a
              comprehensive ecosystem of auditions, workshops, and networking events.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 font-playfair">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Abhinayपथ, we believe every artist deserves a chance to showcase their talent. Our mission is to
                democratize access to performing arts opportunities and create a vibrant community where creativity
                thrives.
              </p>
              <p className="text-gray-700 mb-6">
                We're building a platform that not only connects artists with opportunities but also provides the
                resources, guidance, and support needed to build successful careers in the performing arts industry.
              </p>
              <Link href="/signup">
                <Button size="lg">Join Our Community</Button>
              </Link>
            </div>
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image src="/images/community.png" alt="Abhinayपथ Community" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 font-playfair">Our Core Values</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-gray-600">Building a supportive network of artists and professionals</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Target className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Opportunity</h3>
              <p className="text-gray-600">Creating pathways for artists to discover and grow</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Passion</h3>
              <p className="text-gray-600">Celebrating the art and dedication of performers</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">Maintaining high standards in everything we do</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 font-playfair">Our Story</h2>
            <p className="text-gray-700 mb-4">
              Abhinayपथ was born from a simple observation: talented artists often struggle to find the right
              opportunities, while production houses and casting directors face challenges in discovering fresh talent.
              We set out to solve this problem by creating a centralized platform that serves both sides of the
              performing arts ecosystem.
            </p>
            <p className="text-gray-700 mb-4">
              Since our inception, we've helped thousands of artists connect with opportunities ranging from theatre
              productions to film auditions, from professional workshops to industry networking events. Our platform has
              become a trusted resource for both emerging talents and established professionals.
            </p>
            <p className="text-gray-700">
              Today, Abhinayपथ continues to grow as India's leading performing arts platform, constantly evolving to
              meet the needs of our vibrant community of artists, directors, producers, and arts enthusiasts.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6 font-playfair">Ready to Start Your Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of artists who have already discovered their path through Abhinayपथ. Whether you're an actor,
            director, or arts enthusiast, there's a place for you here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Create Account
              </Button>
            </Link>
            <Link href="/auditions">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-primary"
              >
                Browse Opportunities
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
