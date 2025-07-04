import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  Sparkles,
  Search,
  Calendar,
  Megaphone,
  Lightbulb,
  Rocket,
  Star,
  UserPlus,
  ArrowRight,
  MessageCircle,
  FileText,
  ClipboardCheck,
} from "lucide-react"

export default function JoinCommunityPage() {
  return (
    <div className="container py-12">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
          <Sparkles className="h-4 w-4 inline mr-2" />
          <span className="text-sm font-medium">Beta Access</span>
        </div>

        <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparentalight text-violet-600">
          Abhinayपथ: Beta Community Hub    </h1>
        <div className="relative h-64 w-full mb-8 rounded-xl overflow-hidden shadow-xl">
          <Image
            src="/images/abhinaypath-logo.png"
            alt="AbhinayPath Logo"
            fill
            className="object-contain bg-white p-4"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-6">
            <div className="w-full text-white text-left">
              <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
              <p className="text-white/90 max-w-2xl">
                India's first platform for auditions, workshops, and creative careers. Join from Day 1.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Prominent Quick Access Links */}
      <div className="max-w-4xl mx-auto mb-16">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h2 className="font-playfair text-2xl font-bold text-center mb-6 text-gray-800">Quick Access</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc2aWoB_w_roGXrMzsXn2BLj3Dao4aNZLOd7p5O1sffeZYJsw/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-primary/5 hover:bg-primary/10 border-2 border-primary/20 hover:border-primary/40 rounded-xl p-4 text-center transition-all duration-200 group-hover:shadow-md">
                <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-bold text-lg text-gray-800">Fill Google Form</h3>
                <p className="text-sm text-gray-600 mt-1">Join the community</p>
              </div>
            </a>

            <a
              href="https://chat.whatsapp.com/FNMVzWZsM6K3bt4DJZzvUp"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-green-50 hover:bg-green-100 border-2 border-green-200 hover:border-green-400 rounded-xl p-4 text-center transition-all duration-200 group-hover:shadow-md">
                <MessageCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <h3 className="font-bold text-lg text-gray-800">Join WhatsApp Group</h3>
                <p className="text-sm text-gray-600 mt-1">Connect instantly</p>
              </div>
            </a>

            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfekhC6GWHNMsAtwI2Lpht3Yf5DJMtIoGOMPS6akhMY6BVQow/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <div className="bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 hover:border-amber-400 rounded-xl p-4 text-center transition-all duration-200 group-hover:shadow-md">
                <ClipboardCheck className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                <h3 className="font-bold text-lg text-gray-800">🎭 Submit a Verified Opportunity</h3>
                <p className="text-sm text-gray-600 mt-1">Share authentic opportunities</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      {/* What is AbhinayPath Section */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Rocket className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-playfair text-3xl font-bold">What is Abhinayपथ?</h2>
        </div>

        <p className="text-lg text-gray-700 mb-10 max-w-3xl">
          A platform connecting creators, casting professionals, and institutions:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-2 border-primary/10 hover:border-primary/30 transition-all hover:shadow-lg overflow-hidden group">
            <div className="h-3 bg-primary w-full"></div>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-bold text-xl mb-2">Discover & Post Auditions</h3>
              <p className="text-gray-800">Find casting calls or post auditions to connect with talent.</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg overflow-hidden group">
            <div className="h-3 bg-purple-500 w-full"></div>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Calendar className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Workshops & Programs</h3>
              <p className="text-gray-800">Join workshops, training sessions, and preparation programs.</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg overflow-hidden group">
            <div className="h-3 bg-blue-500 w-full"></div>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Find Collaborators</h3>
              <p className="text-gray-800">Connect with creative professionals for projects and collaborations.</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-amber-100 hover:border-amber-300 transition-all hover:shadow-lg overflow-hidden group">
            <div className="h-3 bg-amber-500 w-full"></div>
            <CardContent className="p-6">
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Megaphone className="h-6 w-6 text-amber-600" />
              </div>
              <h3 className="font-bold text-xl mb-2">Artist-Led Network</h3>
              <p className="text-gray-800">Build connections in a community created by and for artists.</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Why Join Section */}
      <div className="mb-20 bg-gradient-to-r from-primary/5 to-purple-100/30 p-10 rounded-2xl relative overflow-hidden">
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-purple-500 rounded-full opacity-10"></div>
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-indigo-500 rounded-full opacity-10"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Lightbulb className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-playfair text-3xl font-bold">Why Join the Beta Community?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Star className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Early Access</h3>
                <p className="text-gray-800">Exclusive access to features before public launch.</p>
              </div>
            </div>

            <div className="flex gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Lightbulb className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Shape the Platform</h3>
                <p className="text-gray-800">Your feedback directly influences development.</p>
              </div>
            </div>

            <div className="flex gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Megaphone className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Get Featured</h3>
                <p className="text-gray-800">Be highlighted in interviews, spotlights, and promotions.</p>
              </div>
            </div>

            <div className="flex gap-4 bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex-shrink-0 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-bold text-xl mb-2">Networking Opportunities</h3>
                <p className="text-gray-800">Connect with artists and industry professionals.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Join Us Now Section */}
      <div className="mb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <UserPlus className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-playfair text-3xl font-bold">Join Us Now</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="h-3 bg-primary w-full"></div>
            <CardContent className="p-8">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                <FileText className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-bold text-2xl mb-3">Fill the Google Form</h3>
              <p className="text-gray-800 mb-6">Tell us about yourself and how you'd like to contribute.</p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSc2aWoB_w_roGXrMzsXn2BLj3Dao4aNZLOd7p5O1sffeZYJsw/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full rounded-full">
                  Join via Google Form <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="h-3 bg-green-500 w-full"></div>
            <CardContent className="p-8">
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <MessageCircle className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-bold text-2xl mb-3">Join WhatsApp Group</h3>
              <p className="text-gray-800 mb-6">Connect directly with the community for updates and networking.</p>
              <a href="https://chat.whatsapp.com/FNMVzWZsM6K3bt4DJZzvUp" target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full rounded-full bg-green-600 hover:bg-green-700 text-white">
                  Join WhatsApp Group <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
            <div className="h-3 bg-amber-500 w-full"></div>
            <CardContent className="p-8">
              <div className="h-16 w-16 rounded-full bg-amber-100 flex items-center justify-center mb-6">
                <ClipboardCheck className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="font-bold text-2xl mb-3">🎭 Submit a Verified Opportunity</h3>
              <p className="text-gray-800 mb-6">
                Are you a director, casting agent, or workshop organizer? Share your authentic opportunity with the
                AbhinayPath community. Help artists connect with real, meaningful work.
              </p>
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfekhC6GWHNMsAtwI2Lpht3Yf5DJMtIoGOMPS6akhMY6BVQow/viewform?usp=header"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button size="lg" className="w-full rounded-full bg-amber-600 hover:bg-amber-700 text-white">
                  Submit Verified Listings <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* What's Next Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-10 rounded-2xl relative overflow-hidden">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-indigo-500 rounded-full opacity-10"></div>
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-purple-500 rounded-full opacity-10"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Rocket className="h-5 w-5 text-primary" />
            </div>
            <h2 className="font-playfair text-3xl font-bold">What's Next?</h2>
          </div>

          <p className="text-lg text-gray-700 mb-8">
            Real opportunities, interviews, and content coming soon. Be a founding member of India's creative community.
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSc2aWoB_w_roGXrMzsXn2BLj3Dao4aNZLOd7p5O1sffeZYJsw/viewform?usp=header"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="rounded-full">
                Join the Community
              </Button>
            </a>
            <Link href="/">
              <Button variant="outline" size="lg" className="rounded-full">
                Explore the Platform
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* FAQ Section - New */}
      <div className="mt-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <h2 className="font-playfair text-3xl font-bold">Frequently Asked Questions</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              question: "What is AbhinayPath Beta?",
              answer: "Early access to our platform building India's creative ecosystem across theater, film, and web.",
            },
            {
              question: "Is it free to join?",
              answer:
                "Yes, AbhinayPath Beta is completely free. Early members get special benefits for future premium features.",
            },
            {
              question: "How can I contribute to the community?",
              answer: "Share opportunities, participate in discussions, provide feedback, and spread the word.",
            },
            {
              question: "When will the full platform launch?",
              answer: "Beta members will be the first to know about our official launch and new features.",
            },
            {
              question: "Can I post my own auditions or workshops?",
              answer:
                "Yes! Share legitimate opportunities. We'll be refining our posting and verification systems during the beta.",
            },
            {
              question: "How do I get featured in creator spotlights?",
              answer: "Active community members will be considered. Express your interest in the Google form.",
            },
          ].map((faq, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100"
            >
              <h3 className="font-bold text-lg mb-2 text-gray-800">{faq.question}</h3>
              <p className="text-gray-800">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
