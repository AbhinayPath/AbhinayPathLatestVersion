import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowRight, User } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Theatre Blog - Acting Tips, Industry News & Career Guides",
  description:
    "Read expert articles on theatre acting techniques, audition tips, career guidance for actors in India, theatre history, and performing arts news. Your guide to succeeding in Indian theatre.",
  keywords: [
    "theatre blog India",
    "acting tips",
    "audition preparation guide",
    "theatre career India",
    "acting techniques",
    "theatre industry news",
    "drama school preparation",
    "NSD entrance tips",
    "FTII preparation",
    "theatre actor guide",
  ],
  openGraph: {
    title: "Theatre Blog - Acting Tips, Industry News & Career Guides | AbhinayPath",
    description:
      "Expert articles on theatre acting, audition tips, career guidance for actors in India.",
    url: "https://abhinaypath.com/blog",
    type: "website",
  },
  alternates: {
    canonical: "https://abhinaypath.com/blog",
  },
}

// Blog articles data
const blogArticles = [
  {
    slug: "how-to-prepare-for-theatre-auditions-india",
    title: "How to Prepare for Theatre Auditions in India: Complete Guide 2026",
    excerpt:
      "Master the art of theatre auditions with our comprehensive guide covering monologue selection, cold reading techniques, what to wear, and how to impress casting directors in Indian theatre.",
    category: "Audition Tips",
    author: "AbhinayPath Team",
    date: "2026-05-01",
    readTime: "12 min read",
    image: "/images/auditions-stage.png",
    featured: true,
  },
  {
    slug: "top-10-theatre-groups-mumbai",
    title: "Top 10 Theatre Groups in Mumbai You Should Know About",
    excerpt:
      "Discover Mumbai's most influential theatre groups including Prithvi Theatre, Akvarious Productions, QTP, and more. Learn about their audition processes and how to join them.",
    category: "Industry Guide",
    author: "AbhinayPath Team",
    date: "2026-04-25",
    readTime: "10 min read",
    image: "/images/community.png",
    featured: true,
  },
  {
    slug: "nsd-entrance-exam-preparation-guide",
    title: "NSD Entrance Exam 2026: Complete Preparation Guide & Tips",
    excerpt:
      "Everything you need to know about National School of Drama entrance exam - eligibility, syllabus, preparation strategy, interview tips, and insights from NSD alumni.",
    category: "Drama School",
    author: "AbhinayPath Team",
    date: "2026-04-20",
    readTime: "15 min read",
    image: "/images/nsd-prep.png",
    featured: true,
  },
  {
    slug: "acting-techniques-indian-theatre",
    title: "5 Acting Techniques Every Indian Theatre Artist Should Master",
    excerpt:
      "From Stanislavski's method to Natyashastra principles, explore essential acting techniques that will elevate your performances on the Indian stage.",
    category: "Acting Techniques",
    author: "AbhinayPath Team",
    date: "2026-04-15",
    readTime: "8 min read",
    image: "/images/acting-workshop.png",
    featured: false,
  },
  {
    slug: "theatre-festivals-india-2026",
    title: "Must-Attend Theatre Festivals in India 2026: Complete Calendar",
    excerpt:
      "Your comprehensive guide to all major theatre festivals happening across India in 2026 - from Bharat Rang Mahotsav to Prithvi Theatre Festival and regional celebrations.",
    category: "Events",
    author: "AbhinayPath Team",
    date: "2026-04-10",
    readTime: "10 min read",
    image: "/images/events-hero.png",
    featured: false,
  },
  {
    slug: "career-in-theatre-india-salary-guide",
    title: "Career in Theatre in India: Salary, Opportunities & Growth Path",
    excerpt:
      "Realistic insights into theatre careers in India - what actors earn, different career paths, how to sustain yourself, and success stories from working theatre professionals.",
    category: "Career Guide",
    author: "AbhinayPath Team",
    date: "2026-04-05",
    readTime: "14 min read",
    image: "/images/hero-bg.png",
    featured: false,
  },
  {
    slug: "voice-training-exercises-actors",
    title: "Voice Training Exercises for Theatre Actors: Daily Practice Guide",
    excerpt:
      "Essential voice exercises to improve projection, clarity, and vocal stamina. Daily routines used by professional theatre actors to maintain their voice.",
    category: "Acting Techniques",
    author: "AbhinayPath Team",
    date: "2026-03-28",
    readTime: "9 min read",
    image: "/images/workshop.png",
    featured: false,
  },
  {
    slug: "ftii-acting-course-complete-guide",
    title: "FTII Acting Course 2026: Admission, Fees, Curriculum & Career Scope",
    excerpt:
      "Detailed guide to Film and Television Institute of India's acting program - admission process, entrance exam pattern, fees, course structure, and alumni success stories.",
    category: "Drama School",
    author: "AbhinayPath Team",
    date: "2026-03-20",
    readTime: "13 min read",
    image: "/images/institute-prep.png",
    featured: false,
  },
]

const categories = [
  "All",
  "Audition Tips",
  "Acting Techniques",
  "Drama School",
  "Career Guide",
  "Industry Guide",
  "Events",
]

// Blog Collection Schema
const blogSchema = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: "AbhinayPath Theatre Blog",
  description: "Expert articles on theatre acting, auditions, career guidance for actors in India",
  url: "https://abhinaypath.com/blog",
  publisher: {
    "@type": "Organization",
    name: "AbhinayPath",
    logo: {
      "@type": "ImageObject",
      url: "https://abhinaypath.com/images/abhinaypath-logo.png",
    },
  },
  blogPost: blogArticles.map((article) => ({
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: {
      "@type": "Organization",
      name: "AbhinayPath",
    },
    url: `https://abhinaypath.com/blog/${article.slug}`,
  })),
}

export default function BlogPage() {
  const featuredArticles = blogArticles.filter((a) => a.featured)
  const regularArticles = blogArticles.filter((a) => !a.featured)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="bg-[#7E1F2E] text-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl">
              <h1 className="font-playfair text-3xl md:text-5xl font-bold mb-4">
                Theatre Blog & Resources
              </h1>
              <p className="text-lg md:text-xl text-white/90 leading-relaxed">
                Expert articles, guides, and insights to help you succeed in Indian theatre. 
                From audition tips to career guidance - everything an aspiring actor needs.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Category Filter */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((category) => (
              <Badge
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={`cursor-pointer px-4 py-2 text-sm ${
                  category === "All"
                    ? "bg-[#7E1F2E] hover:bg-[#6a1a27]"
                    : "hover:bg-gray-100"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>

          {/* Featured Articles */}
          <section className="mb-16">
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8 text-gray-800">
              Featured Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-3 left-3 bg-[#7E1F2E]">
                        {article.category}
                      </Badge>
                    </div>
                    <CardContent className="p-5">
                      <h3 className="font-playfair text-lg font-bold mb-2 text-gray-800 group-hover:text-[#7E1F2E] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(article.date).toLocaleDateString("en-IN", {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          })}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {article.readTime}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* All Articles */}
          <section>
            <h2 className="font-playfair text-2xl md:text-3xl font-bold mb-8 text-gray-800">
              All Articles
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {regularArticles.map((article) => (
                <Link key={article.slug} href={`/blog/${article.slug}`}>
                  <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow group">
                    <div className="flex flex-col sm:flex-row">
                      <div className="relative h-48 sm:h-auto sm:w-48 flex-shrink-0 overflow-hidden">
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="p-5 flex flex-col justify-between">
                        <div>
                          <Badge variant="outline" className="mb-2 text-xs">
                            {article.category}
                          </Badge>
                          <h3 className="font-playfair text-lg font-bold mb-2 text-gray-800 group-hover:text-[#7E1F2E] transition-colors line-clamp-2">
                            {article.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {article.excerpt}
                          </p>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(article.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {article.readTime}
                          </span>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* SEO Content */}
          <section className="mt-16 pt-12 border-t border-gray-200">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-playfair text-2xl font-bold mb-6 text-gray-800">
                Your Guide to Theatre in India
              </h2>
              <div className="prose prose-gray text-gray-600 space-y-4">
                <p>
                  The AbhinayPath blog is your comprehensive resource for everything related to theatre and performing arts in India. Whether you are an aspiring actor preparing for your first audition, a drama school applicant researching NSD or FTII, or a working professional looking to refine your craft, our expert-written articles provide actionable insights and guidance.
                </p>
                <p>
                  Our content covers audition preparation strategies, acting technique breakdowns, drama school admission guides, career planning advice, and industry news. We interview working theatre professionals, share success stories, and provide practical tips that you can apply immediately to advance your theatre journey.
                </p>
              </div>

              {/* Quick Links */}
              <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Link
                  href="/workshops"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-800">Find Workshops</span>
                  <ArrowRight className="h-4 w-4 text-[#7E1F2E]" />
                </Link>
                <Link
                  href="/auditions"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-800">Open Auditions</span>
                  <ArrowRight className="h-4 w-4 text-[#7E1F2E]" />
                </Link>
                <Link
                  href="/admissions"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-800">Drama Schools</span>
                  <ArrowRight className="h-4 w-4 text-[#7E1F2E]" />
                </Link>
                <Link
                  href="/theatre-artists"
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <span className="font-medium text-gray-800">Artist Directory</span>
                  <ArrowRight className="h-4 w-4 text-[#7E1F2E]" />
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
