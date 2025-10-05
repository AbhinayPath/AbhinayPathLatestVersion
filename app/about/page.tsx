import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Users, Target, Heart } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      {/* Hero Section */}
      <div className="mb-16 text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">About Abhinayपथ</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          India's premier platform connecting creative artists with opportunities across theatre, film, and web.
        </p>
      </div>

      {/* Mission Section */}
      <div className="mb-16">
        <Card>
          <CardContent className="p-8">
            <div className="flex items-start gap-4">
              <Target className="mt-1 h-8 w-8 flex-shrink-0 text-primary" />
              <div>
                <h2 className="mb-4 text-2xl font-bold">Our Mission</h2>
                <p className="text-muted-foreground">
                  Abhinayपथ was created to bridge the gap between talented artists and the opportunities they deserve.
                  We believe that every artist should have access to quality auditions, workshops, and resources to grow
                  their craft and build a sustainable career in the performing arts.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Values Section */}
      <div className="mb-16">
        <h2 className="mb-8 text-center text-3xl font-bold">Our Core Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardContent className="p-6">
              <Users className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Community First</h3>
              <p className="text-muted-foreground">
                We prioritize building a supportive community where artists can connect, collaborate, and grow together.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Award className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Quality & Authenticity</h3>
              <p className="text-muted-foreground">
                We verify all opportunities to ensure artists connect with legitimate casting calls and workshops.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <Heart className="mb-4 h-10 w-10 text-primary" />
              <h3 className="mb-2 text-xl font-semibold">Artist Empowerment</h3>
              <p className="text-muted-foreground">
                We provide tools and resources that empower artists to take control of their careers and succeed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Story Section */}
      <div className="mb-16">
        <Card>
          <CardContent className="p-8">
            <h2 className="mb-4 text-2xl font-bold">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Abhinayपथ (meaning "the path of performance" in Hindi) was founded by a group of theatre enthusiasts and
                tech professionals who experienced firsthand the challenges artists face in finding legitimate
                opportunities.
              </p>
              <p>
                What started as a simple WhatsApp group for sharing audition information has evolved into a
                comprehensive platform that serves thousands of artists across India. We've connected artists with
                opportunities in theatre productions, films, web series, and major OTT platforms.
              </p>
              <p>
                Today, Abhinayपथ continues to grow, adding new features and partnerships to better serve the creative
                community. Our goal is to become the go-to platform for every performing artist in India.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="text-center">
        <h2 className="mb-4 text-2xl font-bold">Join Our Community</h2>
        <p className="mb-6 text-muted-foreground">
          Be part of a growing network of creative professionals and discover your next opportunity.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/signup">Create Account</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/contact">Contact Us</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
