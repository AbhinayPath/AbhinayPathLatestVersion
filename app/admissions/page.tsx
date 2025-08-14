"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Star,
  Clock,
  Users,
  Award,
  MessageCircle,
  CheckCircle,
  Target,
  Lightbulb,
  GraduationCap,
  Theater,
  Film,
  Mic,
  UserCheck,
  ExternalLink,
} from "lucide-react"

export default function SagnikMentorshipPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  const achievements = [
    {
      icon: <GraduationCap className="h-5 w-5" />,
      title: "NSD Delhi Alumnus",
      description: "2014–2017",
      color: "text-blue-600",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "1000+ Actors Mentored",
      description: "Across India",
      color: "text-green-600",
    },
    {
      icon: <Theater className="h-5 w-5" />,
      title: "Clowning Expert",
      description: "Workshops in major cities",
      color: "text-purple-600",
    },
    {
      icon: <Film className="h-5 w-5" />,
      title: "FTII Productions",
      description: "Art Direction, Costume, Properties",
      color: "text-orange-600",
    },
    {
      icon: <Award className="h-5 w-5" />,
      title: "Film Actor",
      description: "Featured in Fimistan",
      color: "text-red-600",
    },
    {
      icon: <Mic className="h-5 w-5" />,
      title: "Guest Faculty",
      description: "Shri Ram Centre for performing arts",
      color: "text-indigo-600",
    },
  ]

  const collaborators = ["Bapi Bose", "Anirudh Kotwal", "Rita Ganguly Kothari"]

  const targetAudience = [
    {
      title: "Aspiring Actors",
      description: "Who want to start with the right foundation",
      icon: <Star className="h-5 w-5 text-yellow-500" />,
    },
    {
      title: "Theatre Actors",
      description: "Looking to refine their performance",
      icon: <Theater className="h-5 w-5 text-purple-500" />,
    },
    {
      title: "Film/TV Actors",
      description: "Who want to build a strong stage base",
      icon: <Film className="h-5 w-5 text-blue-500" />,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <section className="relative py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Hero Image */}
            <div className="flex justify-center lg:justify-start order-2 lg:order-1">
              <div className="relative">
                <Image
                  src="/images/sagnik-mentorship-poster.png"
                  alt="Meet Your Mentor Sagnik - NSD Delhi Alumnus"
                  width={400}
                  height={600}
                  className="rounded-2xl shadow-2xl"
                />
              </div>
            </div>

            {/* Right Column - Text Content */}
            <div className="space-y-6 order-1 lg:order-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-4xl">🎭</span>
                  <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200 text-lg px-4 py-2">
                    1-on-1 Mentorship
                  </Badge>
                </div>

                <h1 className="font-playfair text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
                  1-on-1 Mentorship with Sagnik – NSD Delhi Alumnus
                </h1>

                <p className="text-xl text-gray-700 leading-relaxed">
                  Personal guidance, real feedback, and a clear roadmap for your journey as an actor.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="https://docs.google.com/forms/d/e/1FAIpQLSdM0K0-quSYyjcjO1uVmcSLIxttKP__pbgjK6bAtMK1SgaMMw/viewform"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white w-full sm:w-auto">
                    Apply for Mentorship
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50 bg-transparent"
                  onClick={() => scrollToSection("about-mentor")}
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Learn More
                </Button>
              </div>

              <div className="bg-orange-100 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 font-medium">
                  <Clock className="inline h-4 w-4 mr-2" />
                  Limited Slots Available - Only a few actors mentored each month for personalized attention
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About the Mentor Section */}
      <section id="about-mentor" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">About the Mentor</h2>
            <p className="text-xl text-gray-600">
              Sagnik – National School of Drama (NSD) Alumnus, 15+ Years in Theatre
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="lg:col-span-2 space-y-6">
              <div className="prose prose-lg text-gray-700">
                <p className="text-lg leading-relaxed">
                  Sagnik is a highly respected theatre artist, clowning expert, and acting mentor with over 15 years of
                  experience in the Indian performing arts scene. His journey through the National School of Drama and
                  extensive work across theatre, film, and education makes him uniquely qualified to guide aspiring
                  actors.
                </p>
                <p className="text-lg leading-relaxed">
                  What sets Sagnik apart is his holistic approach to acting education. From traditional theatre
                  techniques to modern clowning methodologies, he brings a diverse toolkit that helps actors discover
                  their authentic voice and develop both stage and screen presence.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center">
                  <UserCheck className="h-5 w-5 text-orange-600 mr-2" />
                  Notable Collaborations
                </h3>
                <p className="text-gray-700">
                  Collaborated with eminent theatre personalities including{" "}
                  {collaborators.map((name, index) => (
                    <span key={index}>
                      <strong>{name}</strong>
                      {index < collaborators.length - 1 ? ", " : ""}
                    </span>
                  ))}{" "}
                  and many other acclaimed directors, designers, and performers in the Indian theatre circuit.
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-orange-600" />
                    Key Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className={`${achievement.color} mt-0.5`}>{achievement.icon}</div>
                      <div>
                        <h4 className="font-semibold text-sm">{achievement.title}</h4>
                        <p className="text-xs text-gray-600">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-orange-50 border-orange-200">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-orange-900 mb-2 flex items-center">
                    <Theater className="h-4 w-4 mr-2" />
                    Bharat Rang Mahotsav
                  </h3>
                  <p className="text-orange-700 text-sm">
                    Contributed to NSD's annual Bharat Rang Mahotsav (Bharangam) in various roles, showcasing expertise
                    across multiple aspects of theatre production.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Mentorship Section */}
      <section id="why-mentorship" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Why This Mentorship?</h2>
            <p className="text-xl text-gray-600">
              Unlike group workshops, this program is completely personalised to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Target className="h-6 w-6 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-xl">Personalized Approach</h3>
                </div>
                <p className="text-gray-700">
                  No fixed syllabus — every session is tailored to your current skill level and specific goals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-xl">Expert Guidance</h3>
                </div>
                <p className="text-gray-700">
                  Learn from someone who has trained at the highest level and understands both stage and screen acting.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <MessageCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-xl">Honest Feedback</h3>
                </div>
                <p className="text-gray-700">
                  Receive constructive, honest feedback that helps you identify strengths and areas for improvement.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <Lightbulb className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-xl">Career Strategy</h3>
                </div>
                <p className="text-gray-700">
                  Get a clear plan and practical strategies for building your career in acting and theatre.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mentorship Structure */}
      <section id="mentorship-structure" className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Mentorship Structure</h2>
            <p className="text-xl text-gray-600">A carefully designed 2-session program for maximum impact</p>
          </div>

          <div className="space-y-6">
            <Card className="border-2 border-orange-200 shadow-lg">
              <CardHeader className="bg-orange-50">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                    1
                  </div>
                  <div>
                    <span className="text-xl">Session 1</span>
                    <Badge variant="outline" className="ml-3">
                      30 minutes
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Understanding your journey and experience so far</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>You ask your questions and doubts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Sagnik assigns you a practical acting activity to assess your skills</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-2 border-blue-200 shadow-lg">
              <CardHeader className="bg-blue-50">
                <CardTitle className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    2
                  </div>
                  <div>
                    <span className="text-xl">Session 2</span>
                    <Badge variant="outline" className="ml-3">
                      1 hour
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Detailed feedback on your activity</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Suggestions on where and how to improve</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span>Practical tips and strategies for building your career in acting and theatre</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Who Is This For */}
      <section id="target-audience" className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-gray-900 mb-4">Who Is This For?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {targetAudience.map((audience, index) => (
              <Card key={index} className="border-0 shadow-lg text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {audience.icon}
                  </div>
                  <h3 className="font-semibold text-xl mb-3">{audience.title}</h3>
                  <p className="text-gray-700">{audience.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="font-playfair text-4xl font-bold mb-4">Ready to learn from Sagnik?</h2>
          <p className="text-xl mb-8 opacity-90">
            Fill in your details, and our team will call you to guide you through the booking process.
          </p>

          <div className="space-y-4">
            <Link
              href="https://docs.google.com/forms/d/e/1FAIpQLSdM0K0-quSYyjcjO1uVmcSLIxttKP__pbgjK6bAtMK1SgaMMw/viewform"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-4">
                Apply for Mentorship
                <ExternalLink className="ml-2 h-5 w-5" />
              </Button>
            </Link>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 max-w-md mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Users className="h-5 w-5" />
                <span className="font-semibold">Limited Slots</span>
              </div>
              <p className="text-sm opacity-90">
                To ensure personal attention, only a limited number of actors will be mentored each month.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
