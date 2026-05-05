import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Clock, ArrowLeft, Share2, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "How to Prepare for Theatre Auditions in India: Complete Guide 2026",
  description:
    "Master theatre auditions with our comprehensive guide. Learn monologue selection, cold reading, what to wear, how to impress casting directors, and insider tips from Indian theatre professionals.",
  keywords: [
    "theatre audition preparation",
    "how to prepare for auditions",
    "theatre audition tips India",
    "monologue for audition",
    "acting audition guide",
    "theatre casting tips",
    "audition dos and donts",
    "theatre audition India",
    "acting audition preparation",
    "cold reading tips",
  ],
  openGraph: {
    title: "How to Prepare for Theatre Auditions in India: Complete Guide 2026",
    description:
      "Master theatre auditions with our comprehensive guide covering monologue selection, cold reading, and insider tips.",
    url: "https://abhinaypath.com/blog/how-to-prepare-for-theatre-auditions-india",
    type: "article",
    publishedTime: "2026-05-01T00:00:00Z",
    authors: ["AbhinayPath"],
    images: [
      {
        url: "/images/auditions-stage.png",
        width: 1200,
        height: 630,
        alt: "Theatre Audition Preparation Guide",
      },
    ],
  },
  alternates: {
    canonical: "https://abhinaypath.com/blog/how-to-prepare-for-theatre-auditions-india",
  },
}

// Article Schema
const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Prepare for Theatre Auditions in India: Complete Guide 2026",
  description:
    "Comprehensive guide to preparing for theatre auditions in India including monologue selection, cold reading techniques, and casting director insights.",
  image: "https://abhinaypath.com/images/auditions-stage.png",
  datePublished: "2026-05-01",
  dateModified: "2026-05-01",
  author: {
    "@type": "Organization",
    name: "AbhinayPath",
    url: "https://abhinaypath.com",
  },
  publisher: {
    "@type": "Organization",
    name: "AbhinayPath",
    logo: {
      "@type": "ImageObject",
      url: "https://abhinaypath.com/images/abhinaypath-logo.png",
    },
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": "https://abhinaypath.com/blog/how-to-prepare-for-theatre-auditions-india",
  },
}

// FAQ Schema for this article
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should I wear to a theatre audition in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Wear solid, neutral colors (black, gray, navy) that allow freedom of movement. Avoid busy patterns, logos, or bright colors that distract. Dress slightly more formal than casual but comfortable enough to move. Women should avoid heavy jewelry; men should keep facial hair neat unless the role requires otherwise.",
      },
    },
    {
      "@type": "Question",
      name: "How long should my monologue be for a theatre audition?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Most theatre auditions in India expect monologues between 1-2 minutes. Prepare two contrasting pieces - one classical/dramatic and one contemporary/comedic. Always have a shorter 30-second version ready if time is limited. Quality over quantity - a powerful 90-second piece is better than a drawn-out 3-minute one.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need formal training to audition for theatre in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Formal training is not mandatory for most theatre auditions in India. Many successful theatre actors are self-taught or workshop-trained. However, training from institutions like NSD, FTII, or reputed acting schools can give you an edge and help you develop technique. What matters most is your ability, preparation, and stage presence.",
      },
    },
    {
      "@type": "Question",
      name: "How can I find theatre auditions in India?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Follow theatre groups on social media, join theatre communities on Facebook and WhatsApp, check platforms like AbhinayPath for verified listings, attend theatre festivals and networking events, and build relationships with directors and actors. Many auditions are announced through word-of-mouth in the theatre community.",
      },
    },
  ],
}

// Breadcrumb Schema
const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://abhinaypath.com" },
    { "@type": "ListItem", position: 2, name: "Blog", item: "https://abhinaypath.com/blog" },
    {
      "@type": "ListItem",
      position: 3,
      name: "Theatre Audition Preparation Guide",
      item: "https://abhinaypath.com/blog/how-to-prepare-for-theatre-auditions-india",
    },
  ],
}

export default function AuditionGuideArticle() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="min-h-screen bg-white">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-[#7E1F2E]">Home</Link>
              <ChevronRight className="h-4 w-4" />
              <Link href="/blog" className="hover:text-[#7E1F2E]">Blog</Link>
              <ChevronRight className="h-4 w-4" />
              <span className="text-gray-400 truncate">Audition Preparation Guide</span>
            </nav>
          </div>
        </div>

        {/* Hero */}
        <header className="relative">
          <div className="relative h-[300px] md:h-[400px]">
            <Image
              src="/images/auditions-stage.png"
              alt="Theatre Audition Preparation"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20" />
          </div>
          <div className="container mx-auto px-4">
            <div className="relative -mt-32 md:-mt-40 pb-8">
              <div className="bg-white rounded-xl shadow-lg p-6 md:p-10 max-w-4xl">
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-[#7E1F2E] text-white text-xs px-3 py-1 rounded-full">
                    Audition Tips
                  </span>
                  <span className="text-gray-500 text-sm flex items-center gap-1">
                    <Clock className="h-4 w-4" /> 12 min read
                  </span>
                </div>
                <h1 className="font-playfair text-2xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                  How to Prepare for Theatre Auditions in India: Complete Guide 2026
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    May 1, 2026
                  </span>
                  <span>By AbhinayPath Team</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="container mx-auto px-4 pb-16">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg prose-gray max-w-none">
              
              <p className="lead text-xl text-gray-600 mb-8">
                Walking into a theatre audition can be nerve-wracking, especially in India&apos;s competitive performing arts scene. Whether you&apos;re auditioning for a prestigious group like Prithvi Theatre or a fresh independent production, proper preparation can make the difference between landing the role and going home disappointed. This comprehensive guide covers everything you need to know.
              </p>

              <h2 id="before-audition" className="font-playfair text-2xl font-bold mt-10 mb-4">
                1. Before the Audition: Research & Preparation
              </h2>
              
              <h3 className="font-semibold text-xl mt-6 mb-3">Know the Theatre Group</h3>
              <p>
                Before any audition, research the theatre group or director thoroughly. Watch videos of their previous productions on YouTube. Understand their style - are they known for realistic drama, experimental theatre, or commercial entertainers? This knowledge helps you tailor your audition approach.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Follow their social media pages and understand their aesthetic</li>
                <li>Read reviews of their recent productions</li>
                <li>If possible, watch one of their shows live before auditioning</li>
                <li>Understand the specific play or project you&apos;re auditioning for</li>
              </ul>

              <h3 className="font-semibold text-xl mt-6 mb-3">Select Your Monologues Wisely</h3>
              <p>
                Most theatre auditions in India ask for prepared monologues. Having the right pieces ready is crucial:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Prepare 2-3 contrasting monologues:</strong> One dramatic, one comedic, one contemporary</li>
                <li><strong>Keep them between 1-2 minutes:</strong> Respect the auditors&apos; time</li>
                <li><strong>Choose age-appropriate material:</strong> Don&apos;t play 50 if you&apos;re 25</li>
                <li><strong>Avoid overdone pieces:</strong> Skip the famous Hamlet soliloquy - everyone does it</li>
                <li><strong>Consider Hindi and English pieces:</strong> Many groups work in both languages</li>
              </ul>

              <div className="bg-amber-50 border-l-4 border-amber-500 p-6 my-8">
                <h4 className="font-bold text-amber-800 mb-2">Pro Tip: Monologue Sources</h4>
                <p className="text-amber-900">
                  Look beyond Western plays. Indian playwrights like Vijay Tendulkar, Girish Karnad, Badal Sircar, and Mahesh Dattani offer rich material that resonates with Indian auditors and showcases cultural understanding.
                </p>
              </div>

              <h2 id="what-to-wear" className="font-playfair text-2xl font-bold mt-10 mb-4">
                2. What to Wear to a Theatre Audition
              </h2>
              <p>
                Your appearance creates the first impression. Here&apos;s what works in Indian theatre auditions:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Solid, neutral colors:</strong> Black, gray, navy, or maroon work well</li>
                <li><strong>Avoid patterns and logos:</strong> They distract from your performance</li>
                <li><strong>Comfortable yet presentable:</strong> You may need to move, sit, or lie down</li>
                <li><strong>Minimal jewelry:</strong> Remove anything that makes noise or distracts</li>
                <li><strong>Clean, neat grooming:</strong> But don&apos;t look like you&apos;re going to a wedding</li>
              </ul>

              <h2 id="audition-day" className="font-playfair text-2xl font-bold mt-10 mb-4">
                3. On the Audition Day
              </h2>

              <h3 className="font-semibold text-xl mt-6 mb-3">Arrive Early</h3>
              <p>
                Reach at least 15-20 minutes before your slot. This gives you time to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Fill out any forms or paperwork</li>
                <li>Warm up your voice and body</li>
                <li>Observe the environment and calm your nerves</li>
                <li>Use the restroom and hydrate</li>
              </ul>

              <h3 className="font-semibold text-xl mt-6 mb-3">Bring the Right Materials</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Multiple copies of your resume:</strong> At least 3-4 copies</li>
                <li><strong>Recent headshots:</strong> Both color and black-and-white</li>
                <li><strong>Portfolio (if applicable):</strong> Photos from previous productions</li>
                <li><strong>Your monologue scripts:</strong> Even if you&apos;ve memorized them</li>
                <li><strong>Water bottle:</strong> Stay hydrated</li>
              </ul>

              <h2 id="during-audition" className="font-playfair text-2xl font-bold mt-10 mb-4">
                4. During the Audition: Making an Impression
              </h2>

              <h3 className="font-semibold text-xl mt-6 mb-3">The First 30 Seconds Matter</h3>
              <p>
                Casting directors often make initial judgments within the first half-minute. Enter confidently, make eye contact, introduce yourself clearly, and slate your monologue (title, playwright) before beginning.
              </p>

              <h3 className="font-semibold text-xl mt-6 mb-3">Cold Reading Tips</h3>
              <p>
                Many auditions include cold reads - performing unfamiliar material on the spot:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Take a moment to read through the scene before performing</li>
                <li>Identify the character&apos;s objective in the scene</li>
                <li>Don&apos;t bury your face in the script - look up frequently</li>
                <li>Make bold choices - directors want to see your instincts</li>
                <li>If you make a mistake, keep going - don&apos;t break character</li>
              </ul>

              <h3 className="font-semibold text-xl mt-6 mb-3">Taking Direction</h3>
              <p>
                Directors often give you adjustments to see how you respond to feedback:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Listen carefully to the direction given</li>
                <li>Don&apos;t argue or explain your original choice</li>
                <li>Apply the adjustment immediately and commit fully</li>
                <li>Show that you&apos;re collaborative and adaptable</li>
              </ul>

              <div className="bg-[#7E1F2E]/10 border-l-4 border-[#7E1F2E] p-6 my-8">
                <h4 className="font-bold text-[#7E1F2E] mb-2">Important: Handle Rejection Gracefully</h4>
                <p className="text-gray-700">
                  Not every audition leads to a callback. Thank the panel for their time, leave professionally, and don&apos;t take it personally. The same casting directors will see you at future auditions - leave a positive impression regardless of the outcome.
                </p>
              </div>

              <h2 id="common-mistakes" className="font-playfair text-2xl font-bold mt-10 mb-4">
                5. Common Mistakes to Avoid
              </h2>
              <ul className="list-disc pl-6 space-y-3">
                <li><strong>Over-acting:</strong> Theatre requires projection, not exaggeration</li>
                <li><strong>Apologizing:</strong> Never apologize before or after your performance</li>
                <li><strong>Asking for feedback:</strong> Not appropriate during auditions</li>
                <li><strong>Chatting too much:</strong> Be professional, not overly friendly</li>
                <li><strong>Negative talk:</strong> Never criticize other actors or groups</li>
                <li><strong>Lying on your resume:</strong> The theatre community is small - you&apos;ll be caught</li>
              </ul>

              <h2 id="after-audition" className="font-playfair text-2xl font-bold mt-10 mb-4">
                6. After the Audition
              </h2>
              <p>
                The audition doesn&apos;t end when you leave the room:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Send a brief thank-you email within 24 hours (if you have contact info)</li>
                <li>Don&apos;t follow up repeatedly - one email is enough</li>
                <li>Keep preparing for other auditions - don&apos;t wait for callbacks</li>
                <li>Reflect on what went well and what you could improve</li>
              </ul>

              <h2 id="faq" className="font-playfair text-2xl font-bold mt-10 mb-4">
                Frequently Asked Questions
              </h2>

              <div className="space-y-6 mt-6">
                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    What should I wear to a theatre audition in India?
                  </h3>
                  <p className="text-gray-600">
                    Wear solid, neutral colors (black, gray, navy) that allow freedom of movement. Avoid busy patterns, logos, or bright colors that distract. Dress slightly more formal than casual but comfortable enough to move. Women should avoid heavy jewelry; men should keep facial hair neat unless the role requires otherwise.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    How long should my monologue be for a theatre audition?
                  </h3>
                  <p className="text-gray-600">
                    Most theatre auditions in India expect monologues between 1-2 minutes. Prepare two contrasting pieces - one classical/dramatic and one contemporary/comedic. Always have a shorter 30-second version ready if time is limited. Quality over quantity - a powerful 90-second piece is better than a drawn-out 3-minute one.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    Do I need formal training to audition for theatre in India?
                  </h3>
                  <p className="text-gray-600">
                    Formal training is not mandatory for most theatre auditions in India. Many successful theatre actors are self-taught or workshop-trained. However, training from institutions like NSD, FTII, or reputed acting schools can give you an edge. What matters most is your ability, preparation, and stage presence.
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="font-semibold text-lg mb-2">
                    How can I find theatre auditions in India?
                  </h3>
                  <p className="text-gray-600">
                    Follow theatre groups on social media, join theatre communities on Facebook and WhatsApp, check platforms like AbhinayPath for verified listings, attend theatre festivals and networking events, and build relationships with directors and actors. Many auditions are announced through word-of-mouth.
                  </p>
                </div>
              </div>

              <h2 className="font-playfair text-2xl font-bold mt-10 mb-4">
                Ready to Find Your Next Audition?
              </h2>
              <p>
                Now that you know how to prepare, it&apos;s time to find opportunities. Browse our curated listing of verified theatre auditions across India and take the next step in your acting career.
              </p>

              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/auditions">
                  <Button className="bg-[#7E1F2E] hover:bg-[#6a1a27]">
                    Browse Open Auditions
                  </Button>
                </Link>
                <Link href="/workshops">
                  <Button variant="outline">
                    Find Acting Workshops
                  </Button>
                </Link>
              </div>
            </div>

            {/* Related Articles */}
            <section className="mt-16 pt-12 border-t">
              <h3 className="font-playfair text-xl font-bold mb-6">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <Link href="/blog/top-10-theatre-groups-mumbai" className="group">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                    <h4 className="font-semibold group-hover:text-[#7E1F2E] transition-colors">
                      Top 10 Theatre Groups in Mumbai You Should Know About
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Discover Mumbai&apos;s most influential theatre groups and how to join them.
                    </p>
                  </div>
                </Link>
                <Link href="/blog/nsd-entrance-exam-preparation-guide" className="group">
                  <div className="bg-gray-50 rounded-lg p-6 hover:bg-gray-100 transition-colors">
                    <h4 className="font-semibold group-hover:text-[#7E1F2E] transition-colors">
                      NSD Entrance Exam 2026: Complete Preparation Guide
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                      Everything you need to know about NSD admissions and preparation.
                    </p>
                  </div>
                </Link>
              </div>
            </section>

            {/* Author & Share */}
            <div className="mt-12 pt-8 border-t flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <p className="text-sm text-gray-500">Written by</p>
                <p className="font-semibold">AbhinayPath Team</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500">Share:</span>
                <Button variant="outline" size="sm">
                  <Share2 className="h-4 w-4 mr-2" /> Share Article
                </Button>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  )
}
