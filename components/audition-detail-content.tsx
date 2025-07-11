"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  MapPin,
  Calendar,
  Building,
  Phone,
  MessageSquare,
  CheckCircle,
  Mail,
  ExternalLink,
} from "lucide-react"

// This would typically come from an API or database
const auditions = [
  {
    id: 1,
    title: "Casting Call – Female Lead for Feature Film",
    type: "Film",
    location: "Mumbai",
    state: "Maharashtra",
    date: "Ongoing",
    director: "Feature Film Production",
    description:
      "We are casting for the female lead role of Meera in an upcoming Hindi/Hinglish feature film. Meera is sunshine wrapped in silence — a gentle soul, observant and deeply emotional, quietly in love with the male lead, Aryan. She speaks more through her eyes than words.",
    company: "Feature Film Production",
    companyLink: "https://wa.me/917375962175",
    contact: "7375962175 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Female actress aged 21-27 years",
      "Expressive eyes and natural grace",
      "Strong emotional depth",
      "Ability to portray silent love and inner conflict with subtlety",
      "Comfortable with Hindi/Hinglish dialogue",
      "Professional attitude and commitment to the role",
    ],
    roles: [
      "Meera - Female Lead Character",
      "Age range: 21-27 years",
      "Character traits: Gentle soul, observant, deeply emotional",
      "Key characteristic: Speaks more through eyes than words",
      "Romantic subplot: Quietly in love with male lead Aryan",
    ],
    applicationProcess:
      "Contact via WhatsApp at 7375962175 for audition details. Please include your portfolio, recent headshots, and a brief introduction about yourself.",
    characterDetails: {
      name: "Meera",
      ageRange: "21-27 years",
      languages: "Hindi/Hinglish",
      description:
        "Meera is sunshine wrapped in silence — a gentle soul, observant and deeply emotional, quietly in love with the male lead, Aryan. She speaks more through her eyes than words.",
      traits: [
        "Expressive eyes that convey deep emotion",
        "Natural grace in movement and demeanor",
        "Strong emotional depth and range",
        "Ability to portray silent love with subtlety",
        "Observant and introspective personality",
        "Gentle soul with inner strength",
      ],
      keySkills: [
        "Silent acting and emotional expression",
        "Conveying complex emotions through facial expressions",
        "Subtle portrayal of unrequited or quiet love",
        "Natural on-screen presence",
        "Hindi/Hinglish dialogue delivery",
      ],
      lookingFor: [
        "Expressive eyes",
        "Natural grace",
        "Strong emotional depth",
        "Ability to portray silent love and inner conflict with subtlety",
      ],
    },
  },
  {
    id: 2,
    title: "Old Japanese Katana Master - Independent Short Film",
    type: "Film",
    location: "Madanapalle",
    state: "Andhra Pradesh",
    date: "July 17-21, 2025",
    director: "OMASTA Studios",
    description:
      "Seeking an experienced actor to portray an Old Japanese Katana Master in an independent historical/action drama short film. The character is a Japanese master from the 10th century who embodies wisdom, discipline, and ancient warrior traditions.",
    company: "OMASTA Studios",
    companyLink: "https://docs.google.com/forms/d/e/1FAIpQLScD87sHcLCU1Nh4bIyLNQU5ZZPpIEb2Q_WWusEod9-BxrkmvA/viewform",
    contact: "6281055355 (WhatsApp)",
    contactType: "form",
    experience: "All Levels",
    verified: true,
    image: "/images/omasta-studios-logo.jpeg",
    projectTitle: "Independent Short Film",
    genre: "Historical / Action Drama",
    role: "Old Japanese Katana Master",
    ageRange: "55-70",
    shootLocation: "Madanapalle, Andhra Pradesh",
    shootDates: "July 17 to July 21, 2025",
    whatsappContact: "6281055355",
    googleFormLink:
      "https://docs.google.com/forms/d/e/1FAIpQLScD87sHcLCU1Nh4bIyLNQU5ZZPpIEb2Q_WWusEod9-BxrkmvA/viewform",
    requirements: [
      "Male actor aged 55-70 years",
      "Calm, wise presence essential",
      "Willingness to wear beard and wig (provided by production team)",
      "Preference for actors of Northeast Indian origin with East Asian features",
      "Ability to portray ancient Japanese warrior/master character",
      "Professional attitude and commitment to the role",
      "Available for full shoot schedule (July 17-21, 2025)",
    ],
    roles: [
      "Old Japanese Katana Master - Lead Character",
      "Age range: 55-70 years",
      "Character background: Japanese master from the 10th century",
      "Key traits: Calm, wise, authoritative presence",
      "Physical requirements: Comfortable wearing period costume, beard, and wig",
      "Cultural preference: Northeast Indian origin with East Asian features",
    ],
    applicationProcess:
      "Fill out the casting form at the provided Google Form link. For any queries or additional information, contact via WhatsApp at 6281055355. Please include your portfolio, recent headshots, and relevant experience in your application.",
    characterDetails: {
      name: "Old Japanese Katana Master",
      ageRange: "55-70 years",
      period: "10th Century Japan",
      description:
        "A wise and experienced Japanese katana master from the 10th century. This character embodies the traditional values of honor, discipline, and martial expertise. The role requires an actor who can convey deep wisdom and authority through their presence.",
      traits: [
        "Calm and composed demeanor",
        "Wise and authoritative presence",
        "Deep understanding of martial arts philosophy",
        "Traditional Japanese values and honor code",
        "Mentor-like qualities",
        "Strong physical presence despite advanced age",
      ],
      keySkills: [
        "Ability to portray ancient wisdom and experience",
        "Comfortable with period costume and makeup",
        "Strong screen presence and authority",
        "Ability to convey emotion through subtle expressions",
        "Physical capability for basic action sequences",
      ],
      lookingFor: [
        "Calm, wise presence",
        "Northeast Indian origin with East Asian features (preferred)",
        "Willingness to wear beard and wig",
        "Professional commitment to the role",
      ],
      physicalRequirements: [
        "Comfortable wearing traditional Japanese costume",
        "Willingness to wear provided beard and wig",
        "Ability to handle basic prop work (katana)",
        "Physical stamina for 5-day shoot schedule",
      ],
    },
    shootDetails: {
      location: "Madanapalle, Andhra Pradesh",
      dates: "July 17 to July 21, 2025",
      duration: "5 days",
      genre: "Historical / Action Drama",
      format: "Independent Short Film",
    },
  },
  {
    id: 3,
    title: "Audition for Hindi Comedy Play – Kalayan Theatre Group",
    type: "Theater",
    location: "Bangalore",
    state: "Karnataka",
    date: "Ongoing",
    director: "Kalayan Theatre Group",
    description:
      "Play Title: Kab Tak Rahein Kunware. Language: Hindi (must read Devanagari). Age Group: 25–35 yrs. Location: Koramangala, Bangalore. Rehearsals: Weekends, then weekday evenings closer to show. Show Dates: August/September 2025.",
    company: "Kalayan Theatre Group",
    companyLink: "tel:9663304790",
    contact: "Amit Aggarwal – 96633 04790",
    contactType: "phone",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Must be able to read Hindi in Devanagari script",
      "Age between 25-35 years",
      "Available for weekend rehearsals",
      "Available for weekday evening rehearsals closer to show dates",
      "Based in or near Koramangala, Bangalore",
    ],
    roles: ["Multiple male and female roles available", "Exact character details will be shared during audition"],
    applicationProcess: "Contact Amit Aggarwal at the provided phone number to schedule an audition slot.",
  },
  {
    id: 4,
    title: "CASTING CALL FOR A PLAY CALLED 'ONCE THERE WAS A WAY'",
    type: "Theater",
    location: "Bengaluru",
    state: "Karnataka",
    date: "Ongoing",
    director: "Theater Production",
    description:
      "Need artists who are based in Bengaluru (theatre actors). Male actor: age 21-25 (should know how to play a guitar). Male actor: age 30+. Female actor: age 30+. Male actor: age 50+. DM for more details.",
    company: "Theater Production",
    companyLink: "tel:+917330684137",
    contact: "+917330684137",
    contactType: "phone",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Must be based in Bengaluru",
      "Previous theater experience preferred",
      "Male actor (21-25) must know how to play guitar",
      "Available for rehearsals (schedule to be discussed)",
    ],
    roles: [
      "Male actor: age 21-25 (must know how to play a guitar)",
      "Male actor: age 30+",
      "Female actor: age 30+",
      "Male actor: age 50+",
    ],
    applicationProcess: "Contact the production team at the provided phone number for audition details and scheduling.",
  },
  {
    id: 5,
    title: "Lead Role Actress for Kannada Feature Film - Mute Character",
    type: "Film",
    location: "Bangalore",
    state: "Karnataka",
    date: "Ongoing",
    director: "CINECUBES",
    description:
      'We are looking for a lead role actress for our Kannada feature film (language is not a barrier). The character is of a mute girl. So, language is not a barrier. Facial expressions are the most important factors along with the ability to use a mute girl\'s sounds like "bhaaaah...", "mahhh..."',
    company: "CINECUBES",
    companyLink: "https://wa.me/919886028205",
    contact: "+91 9886028205 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Facial expressions are the most important factor",
      'Ability to use mute girl\'s sounds like "bhaaaah...", "mahhh..."',
      "Language is not a barrier (character is mute)",
      "Screen age: Around 20 years",
    ],
    roles: [
      "Lead role - Mute girl character",
      "Character description: Innocent, Lot of pain in eyes, A warrior mother with fire in eyes",
    ],
    applicationProcess:
      "Record a video of yourself performing the audition task and WhatsApp to +91 9886028205. Audition task: Scenario where few people are about to harm her 6-month-old baby but she is helpless to stop them. 1) Start by looking into camera (baby) with light smile. 2) Smile turns into laugh indicating she can't do anything. Laugh is not loud but there is intensive pain behind it. 3) Laugh turns into an inside cry with lot of pain in eyes. 4) Laugh turns into a blank expression looking deep into camera. She is trying to hide the pain but eyes are filled with painful tears.",
  },
  {
    id: 6,
    title: "Casting Call for Web Series - 'Digital Nomads'",
    type: "Web Series",
    location: "Mumbai",
    state: "Maharashtra",
    date: "June 15-30, 2025",
    director: "Horizon Studios",
    description:
      "Casting for an upcoming web series about a group of digital nomads traveling across India while working remotely. Looking for diverse cast members who can portray tech professionals with different backgrounds and personalities.",
    company: "Horizon Studios",
    companyLink: "mailto:casting@horizonstudios.in",
    contact: "casting@horizonstudios.in",
    contactType: "email",
    experience: "Experienced",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Previous acting experience in web series or films",
      "Age range: 25-40 years",
      "Comfortable with technology (will be using laptops/devices on screen)",
      "Available for a 45-day shoot schedule across multiple locations in India",
      "Good English communication skills",
      "Hindi speaking ability preferred but not mandatory",
    ],
    roles: [
      "Lead Role: Software Developer (Male/Female, 28-35 years)",
      "Lead Role: Digital Marketing Specialist (Female, 25-32 years)",
      "Supporting Role: UX Designer (Male/Female, 25-35 years)",
      "Supporting Role: Content Creator/Vlogger (Male/Female, 25-30 years)",
      "Supporting Role: Startup Founder (Male, 35-40 years)",
      "Supporting Role: Cybersecurity Expert (Male/Female, 30-40 years)",
    ],
    applicationProcess:
      "Send your updated portfolio, headshots, and a self-tape audition to casting@horizonstudios.in. For the self-tape, please record a 2-minute scene showing your character working remotely in a challenging environment (e.g., poor internet, noisy cafe, etc.) and how they handle the situation. Include your name, contact details, and the role you're applying for in the email subject line.",
  },
  {
    id: 7,
    title: "Casting Call for 2-Minute Short Film - Family Drama",
    type: "Short Film",
    location: "Bangalore",
    state: "Karnataka",
    date: "May 26-27, 2025",
    director: "Independent Filmmaker",
    description:
      "Casting for a 2-minute short film shot in Bangalore. Language: Hindi and English (Hinglish). Roles: Gen Z female (17-21), supportive mother (40s-50s), and sarcastic father (40s-50s). This is a PAID opportunity. Apply via WhatsApp specifying the role you're interested in.",
    company: "Independent Production",
    companyLink: "https://wa.me/919862853175",
    contact: "9862853175 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Must be comfortable with Hindi and English (Hinglish) dialogue",
      "Must be available on either May 26th or 27th, 2025 for the shoot",
      "Must be based in or able to travel to Bangalore",
      "Previous acting experience is preferred but not mandatory",
      "Must be comfortable with the filming process and taking direction",
    ],
    roles: [
      "Gen Z Female (17-21 years): Confident, slightly rebellious character with good emotional range. Should be able to portray both vulnerability and strength.",
      "Supportive Mother (40s-50s): Warm, understanding character who balances traditional values with modern thinking. Requires subtle emotional expressions.",
      "Sarcastic Father (40s-50s): Witty, slightly stern but loving character. Should have good comic timing and ability to deliver sarcastic lines naturally.",
    ],
    applicationProcess:
      "Send a WhatsApp message to 9862853175 clearly mentioning which role you're applying for. Include your name, age, location, previous acting experience (if any), and a recent photo. Selected candidates will be called for a brief audition. This is a PAID opportunity - compensation details will be discussed during the selection process.",
  },
  {
    id: 8,
    title: "Requirement for Public Speaking Teacher",
    type: "Teaching",
    location: "Multiple Schools",
    state: "Karnataka",
    date: "Apply by June 27, 2025",
    director: "Educational Institution",
    description:
      "Seeking qualified public speaking teachers for multiple schools in Bangalore. Teaching commitment from July 2025 to February 2026. Classes once a month, 01:30 PM to 04:30 PM for grades 6 & 7 and 8 & 9. Lesson plans and teacher's guide will be provided. This is a paid assignment opportunity open to actors, theatre practitioners, and educators with excellent communication skills.",
    company: "Educational Institution",
    companyLink: "https://wa.me/919632220405",
    contact: "9632220405 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Excellent communication and presentation skills",
      "Experience in public speaking, acting, or theatre preferred",
      "Comfortable working with students in grades 6-9",
      "Available for monthly sessions from July 2025 to February 2026",
      "Ability to engage and motivate young learners",
      "Professional attitude and punctuality",
      "Based in or able to travel to multiple locations in Bangalore",
    ],
    roles: [
      "Public Speaking Teacher for Grades 6 & 7 (01:30 PM to 04:30 PM, once a month)",
      "Public Speaking Teacher for Grades 8 & 9 (01:30 PM to 04:30 PM, once a month)",
      "Curriculum delivery using provided lesson plans and teacher's guide",
      "Student assessment and progress tracking",
    ],
    applicationProcess:
      "Contact via WhatsApp at 9632220405 to express your interest and schedule an interview. Please mention your relevant experience in public speaking, acting, or education. Application deadline: June 27, 2025. This is a paid teaching assignment with opportunities across multiple school locations in Bangalore.",
  },
  {
    id: 10,
    title: "NSD Hiring Theatre Artists (Grade B) - Sanskaar Rang Toli",
    type: "Job Opportunity",
    location: "New Delhi",
    state: "Delhi",
    date: "Apply: May 24 - June 23, 2025",
    director: "National School of Drama (NSD)",
    description:
      "Sanskaar Rang Toli (TIE Company), NSD, New Delhi is inviting online applications for 5 posts of Theatre Artist Grade B (working with children). This is a prestigious contractual position offering competitive compensation and the opportunity to work in Theatre in Education with one of India's premier drama institutions.",
    company: "National School of Drama (NSD)",
    companyLink: "https://recruitment.nsd.gov.in/artist/",
    contact: "Apply online at www.nsd.gov.in",
    contactType: "website",
    experience: "Experienced",
    verified: true,
    image: "/images/auditions-stage.png",
    salary: "₹50,000–55,000/month (contractual)",
    duration: "Initially 1 year, extendable up to 5 years based on performance",
    numberOfPosts: 5,
    roleFocus: "Working with children (Theatre in Education - TIE)",
    applicationOpenDate: "May 24, 2025 (10 AM)",
    applicationCloseDate: "June 23, 2025 (5 PM)",
    applicationWebsite: "recruitment.nsd.gov.in/artist/",
    requirements: [
      "NSD Graduate or Degree/Diploma in Dramatic Arts with 5+ years' acting experience",
      "Major roles in at least 10 productions",
      "Proficiency in Hindi language & speech",
    ],
    desirableSkills: [
      "Knowledge of dance, music, regional styles",
      "Direction experience",
      "Stagecraft knowledge",
      "Acting theories understanding",
    ],
    specialNotes: [
      "Applicants from 2024 shortlist need not reapply",
      "No TA/DA except for SC/ST candidates (as per norms)",
    ],
    roles: [
      "Theatre Artist Grade B - Working with children in Theatre in Education programs",
      "Conducting educational theatre workshops and performances",
      "Developing age-appropriate theatrical content for young audiences",
    ],
    applicationProcess:
      "Apply online through the official NSD recruitment portal at https://recruitment.nsd.gov.in/artist/ during the application period from May 24, 2025 (10 AM) to June 23, 2025 (5 PM).",
  },
  {
    id: 11,
    title: "Casting Call — Female Models for Lifestyle Café Shoot",
    type: "Modeling",
    location: "Mumbai",
    state: "Maharashtra",
    date: "Shoot: 2nd July 2025",
    director: "Commercial Production",
    description:
      "Looking for female models with a young, attractive, modern look for a lifestyle café shoot at Phoenix Palladium Mall, Lower Parel, Mumbai. Must have a chic and upper-class café vibe. Same-day cash payment of ₹7,000 (conveyance not included). Application deadline: 26th June 2025 (by late evening).",
    company: "Commercial Production",
    companyLink: "https://wa.me/918218864140",
    contact: "8218864140 (WhatsApp - Send portfolio/profile)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Female models only",
      "Young, attractive, modern look",
      "Chic and upper-class café vibe",
      "Available for shoot on 2nd July 2025",
      "Based in or able to travel to Mumbai",
      "Professional attitude and punctuality",
      "Comfortable with lifestyle/commercial modeling",
    ],
    roles: [
      "Female Models for Lifestyle Café Shoot",
      "Age range: 18-30 years (preferred)",
      "Look: Modern, chic, upper-class aesthetic",
      "Setting: Upscale café environment at Phoenix Palladium Mall",
    ],
    applicationProcess:
      "Send your portfolio/profile via WhatsApp to 8218864140. Include recent photos showcasing your modern, chic look suitable for an upscale café setting. Application deadline: 26th June 2025 (by late evening).",
    shootDetails: {
      venue: "Phoenix Palladium Mall, Lower Parel, Mumbai",
      date: "2nd July 2025",
      payment: "₹7,000 (same-day cash payment)",
      conveyance: "Not included",
      applicationDeadline: "26th June 2025 (by late evening)",
    },
  },
  {
    id: 12,
    title: "Audition Call for Bangalore Little Theater",
    type: "Theater",
    location: "Bangalore",
    state: "Karnataka",
    date: "Sunday, June 29, 2025 at 10:30 AM",
    director: "Bangalore Little Theatre",
    description:
      "Join us for a special reading of our brand-new play 'The Anklet' - a contemporary take on the timeless Tamil epic Silappadikaram. This event is open to actors, backstage crew, and anyone passionate about storytelling. Come discover this fresh interpretation of a classic tale and be part of our theatrical community.",
    company: "Bangalore Little Theatre",
    companyLink: "https://forms.gle/ZKvFcqC5qm7UtDeo6",
    contact: "Register at forms.gle/ZKvFcqC5qm7UtDeo6",
    contactType: "website",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Open to all theatre lovers and curious individuals",
      "No prior experience required",
      "Interest in storytelling and Tamil literature appreciated",
      "Available on Sunday, June 29, 2025 at 10:30 AM",
      "Based in or able to travel to Bangalore",
    ],
    roles: [
      "Open to actors interested in contemporary adaptations",
      "Backstage crew and technical enthusiasts welcome",
      "Anyone passionate about storytelling and theatre",
      "Opportunity to be part of a fresh take on Silappadikaram",
    ],
    applicationProcess:
      "Register online at https://forms.gle/ZKvFcqC5qm7UtDeo6 to secure your spot for this special reading event.",
    eventDetails: {
      venue: "Alliance Française de Bangalore, Classroom 10",
      time: "10:30 AM",
      eventType: "Special Play Reading",
      openTo: "Actors, backstage crew, and anyone passionate about storytelling",
    },
  },
]

export default function AuditionDetailContent({ id }: { id: number }) {
  const [audition, setAudition] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Simulate API fetch with timeout
    const timer = setTimeout(() => {
      const foundAudition = auditions.find((a) => a.id === id)
      if (foundAudition) {
        setAudition(foundAudition)
        setLoading(false)
      } else {
        setError("Audition not found")
        setLoading(false)
      }
    }, 500)

    return () => clearTimeout(timer)
  }, [id])

  if (loading) {
    return (
      <div className="container py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
        </div>
      </div>
    )
  }

  if (error || !audition) {
    return (
      <div className="container py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="font-playfair text-3xl font-bold mb-4">Audition Not Found</h1>
          <p className="text-gray-600 mb-6">The audition you\'re looking for doesn\'t exist or has been removed.</p>
          <Link href="/auditions">
            <Button>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Auditions
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <Link href="/auditions" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Auditions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div
            className={`bg-white rounded-lg border overflow-hidden ${audition.id === 2 ? "border-orange-200" : "border-gray-200"}`}
          >
            <div className="relative h-64 w-full">
              <Image
                src={audition.image || "/placeholder.svg"}
                alt={audition.title}
                fill
                className="object-cover"
                onError={(e) => {
                  // Fallback to default image on error
                  const target = e.target as HTMLImageElement
                  target.src = "/images/auditions-stage.png"
                }}
              />
              {audition.verified && (
                <div className="absolute top-4 right-4 bg-green-100 text-green-800 text-xs font-medium px-3 py-1.5 rounded-full flex items-center">
                  <CheckCircle className="h-3.5 w-3.5 mr-1" />
                  Verified Audition
                </div>
              )}
              {audition.id === 1 && (
                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  🎬 Film Lead Role
                </div>
              )}
              {audition.id === 2 && (
                <div className="absolute top-4 left-4 bg-orange-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  ⚔️ Action Drama
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className={`badge-primary ${audition.id === 2 ? "bg-orange-100 text-orange-800" : ""}`}>
                  {audition.type}
                </span>
                <span className="badge-outline">{audition.experience}</span>
                {(audition.id === 7 || audition.id === 8) && <span className="badge-success">Paid</span>}
                {audition.id === 1 && <span className="badge-success">Open Now</span>}
              </div>

              <h1 className="font-playfair text-3xl font-bold mb-4">{audition.title}</h1>

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-800 mb-6">{audition.description}</p>

                {/* Character Details Section for Meera casting */}
                {audition.characterDetails && (
                  <section>
                    <h2 className="text-xl font-semibold mb-3">🎭 Character Information</h2>
                    <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-primary mb-4 flex items-center">
                        Character: {audition.characterDetails.name}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-white rounded-lg p-4 border">
                          <p className="font-medium text-gray-700 mb-1">Age Range</p>
                          <p className="text-lg font-semibold text-primary">{audition.characterDetails.ageRange}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border">
                          <p className="font-medium text-gray-700 mb-1">Languages</p>
                          <p className="text-lg font-semibold text-primary">{audition.characterDetails.languages}</p>
                        </div>
                        <div className="bg-white rounded-lg p-4 border">
                          <p className="font-medium text-gray-700 mb-1">Contact</p>
                          <p className="text-lg font-semibold text-green-600">📞 WhatsApp: 7375962175</p>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="font-medium text-gray-700 mb-3">Character Description</h4>
                        <div className="bg-white rounded-lg p-4 border">
                          <p className="text-gray-800 italic">"{audition.characterDetails.description}"</p>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 border mb-6">
                        <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                          ✨ We are looking for an actor with:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {audition.characterDetails.lookingFor.map((item: string, index: number) => (
                            <div key={index} className="text-gray-700 flex items-center">
                              <span className="text-primary mr-2">•</span>
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>

                      {audition.characterDetails.traits && (
                        <div className="bg-white rounded-lg p-4 border mb-6">
                          <h4 className="font-medium text-gray-700 mb-3">Character Traits</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {audition.characterDetails.traits.map((trait: string, index: number) => (
                              <div key={index} className="text-gray-700 flex items-center">
                                <span className="text-primary mr-2">•</span>
                                {trait}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {audition.characterDetails.keySkills && (
                        <div className="bg-white rounded-lg p-4 border">
                          <h4 className="font-medium text-gray-700 mb-3">🎬 Key Skills Required</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {audition.characterDetails.keySkills.map((skill: string, index: number) => (
                              <div key={index} className="text-gray-700 flex items-center">
                                <span className="text-primary mr-2">•</span>
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </section>
                )}

                {/* Special section for OMASTA Studios audition */}
                {audition.id === 2 && (
                  <>
                    <section>
                      <h2 className="text-xl font-semibold mb-3">🎬 Project Information</h2>
                      <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-white rounded-lg p-4 border border-orange-200">
                            <p className="font-medium text-gray-700 mb-1">Project Title</p>
                            <p className="text-lg font-semibold text-orange-800">{audition.projectTitle}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-orange-200">
                            <p className="font-medium text-gray-700 mb-1">Genre</p>
                            <p className="text-lg font-semibold text-orange-800">{audition.genre}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">⚔️ Character Information</h2>
                      <div className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-lg p-6 mb-6">
                        <h3 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">
                          Character: {audition.characterDetails.name}
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="bg-white rounded-lg p-4 border border-orange-200">
                            <p className="font-medium text-gray-700 mb-1">Age Range</p>
                            <p className="text-lg font-semibold text-orange-800">
                              {audition.characterDetails.ageRange}
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-orange-200">
                            <p className="font-medium text-gray-700 mb-1">Time Period</p>
                            <p className="text-lg font-semibold text-orange-800">{audition.characterDetails.period}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-orange-200">
                            <p className="font-medium text-gray-700 mb-1">Contact</p>
                            <p className="text-lg font-semibold text-green-600">
                              📱 WhatsApp: {audition.whatsappContact}
                            </p>
                          </div>
                        </div>

                        <div className="mb-6">
                          <h4 className="font-medium text-gray-700 mb-3">Character Description</h4>
                          <div className="bg-white rounded-lg p-4 border border-orange-200">
                            <p className="text-gray-800 italic">"{audition.characterDetails.description}"</p>
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-orange-200 mb-6">
                          <h4 className="font-medium text-gray-700 mb-3 flex items-center">
                            ✨ We are looking for an actor with:
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {audition.characterDetails.lookingFor.map((item: string, index: number) => (
                              <div key={index} className="text-gray-700 flex items-center">
                                <span className="text-orange-600 mr-2">•</span>
                                {item}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-orange-200 mb-6">
                          <h4 className="font-medium text-gray-700 mb-3">Character Traits</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {audition.characterDetails.traits.map((trait: string, index: number) => (
                              <div key={index} className="text-gray-700 flex items-center">
                                <span className="text-orange-600 mr-2">•</span>
                                {trait}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-orange-200 mb-6">
                          <h4 className="font-medium text-gray-700 mb-3">🎬 Key Skills Required</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {audition.characterDetails.keySkills.map((skill: string, index: number) => (
                              <div key={index} className="text-gray-700 flex items-center">
                                <span className="text-orange-600 mr-2">•</span>
                                {skill}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-4 border border-orange-200">
                          <h4 className="font-medium text-gray-700 mb-3">Physical Requirements</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {audition.characterDetails.physicalRequirements.map((req: string, index: number) => (
                              <div key={index} className="text-gray-700 flex items-center">
                                <span className="text-orange-600 mr-2">•</span>
                                {req}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">🎥 Shoot Details</h2>
                      <div className="bg-orange-50 p-4 rounded-lg mb-6 border border-orange-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-700">Location</p>
                            <p className="text-gray-800">{audition.shootDetails.location}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Dates</p>
                            <p className="text-gray-800">{audition.shootDetails.dates}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Duration</p>
                            <p className="text-gray-800">{audition.shootDetails.duration}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Format</p>
                            <p className="text-gray-800">{audition.shootDetails.format}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">📋 Application Instructions</h2>
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-6">
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4 border border-orange-200">
                            <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                              📝 Step 1: Fill the Google Form
                            </h4>
                            <p className="text-gray-700 mb-3">
                              Complete the casting application form with all required details including your portfolio
                              and headshots.
                            </p>
                            <a
                              href={audition.googleFormLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open Application Form
                            </a>
                          </div>

                          <div className="bg-white rounded-lg p-4 border border-orange-200">
                            <h4 className="font-semibold text-orange-800 mb-2 flex items-center">
                              💬 Step 2: Contact for Queries
                            </h4>
                            <p className="text-gray-700 mb-3">
                              For any questions or additional information about the role, contact us via WhatsApp.
                            </p>
                            <a
                              href={`https://wa.me/${audition.whatsappContact}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              WhatsApp: {audition.whatsappContact}
                            </a>
                          </div>

                          <div className="bg-white rounded-lg p-4 border border-orange-200">
                            <h4 className="font-semibold text-orange-800 mb-2">
                              📋 What to Include in Your Application:
                            </h4>
                            <ul className="text-gray-700 space-y-1">
                              <li className="flex items-center">
                                <span className="text-orange-600 mr-2">•</span>
                                Recent headshots and portfolio
                              </li>
                              <li className="flex items-center">
                                <span className="text-orange-600 mr-2">•</span>
                                Previous acting experience (if any)
                              </li>
                              <li className="flex items-center">
                                <span className="text-orange-600 mr-2">•</span>
                                Availability for shoot dates (July 17-21, 2025)
                              </li>
                              <li className="flex items-center">
                                <span className="text-orange-600 mr-2">•</span>
                                Brief introduction about yourself
                              </li>
                              <li className="flex items-center">
                                <span className="text-orange-600 mr-2">•</span>
                                Contact information
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {audition.id === 10 && (
                  <>
                    <section>
                      <h2 className="text-xl font-semibold mb-3">Position Details</h2>
                      <div className="bg-gray-50 p-4 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-700">Salary</p>
                            <p className="text-gray-800">{audition.salary}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Duration</p>
                            <p className="text-gray-800">{audition.duration}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Number of Posts</p>
                            <p className="text-gray-800">{audition.numberOfPosts}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Role Focus</p>
                            <p className="text-gray-800">{audition.roleFocus}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Eligibility Criteria</h2>
                      <ul className="list-disc pl-5 mb-6">
                        {audition.requirements.map((req: string, index: number) => (
                          <li key={index} className="text-gray-800 mb-2">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Desirable Skills</h2>
                      <ul className="list-disc pl-5 mb-6">
                        {audition.desirableSkills.map((skill: string, index: number) => (
                          <li key={index} className="text-gray-800 mb-2">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Application Timeline</h2>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-700">Application Opens</p>
                            <p className="text-gray-800">{audition.applicationOpenDate}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Application Closes</p>
                            <p className="text-gray-800">{audition.applicationCloseDate}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Important Notes</h2>
                      <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                        <ul className="list-disc pl-5">
                          {audition.specialNotes.map((note: string, index: number) => (
                            <li key={index} className="text-gray-800 mb-2">
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>
                  </>
                )}

                {audition.id === 12 && (
                  <>
                    <section>
                      <h2 className="text-xl font-semibold mb-3">Event Details</h2>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-700">Venue</p>
                            <p className="text-gray-800">{audition.eventDetails.venue}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Time</p>
                            <p className="text-gray-800">{audition.eventDetails.time}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Event Type</p>
                            <p className="text-gray-800">{audition.eventDetails.eventType}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Open To</p>
                            <p className="text-gray-800">{audition.eventDetails.openTo}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">About Silappadikaram</h2>
                      <div className="bg-amber-50 p-4 rounded-lg mb-6">
                        <p className="text-gray-800 mb-2">
                          Silappadikaram is one of the five great epics of Tamil literature, written by Ilango Adigal.
                          This timeless tale of love, justice, and divine retribution has captivated audiences for
                          centuries.
                        </p>
                        <p className="text-gray-800">
                          Our contemporary adaptation \'The Anklet\' brings this classic story to modern audiences,
                          exploring its themes through a fresh lens while honoring the original\'s cultural
                          significance.
                        </p>
                      </div>
                    </section>
                  </>
                )}

                <h2 className="text-xl font-semibold mb-3">Roles</h2>
                <ul className="list-disc pl-5 mb-6">
                  {audition.roles.map((role: string, index: number) => (
                    <li key={index} className="text-gray-800 mb-2">
                      {role}
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                <ul className="list-disc pl-5 mb-6">
                  {audition.requirements.map((req: string, index: number) => (
                    <li key={index} className="text-gray-800 mb-2">
                      {req}
                    </li>
                  ))}
                </ul>

                <h2 className="text-xl font-semibold mb-3">How to Apply</h2>
                <p className="text-gray-800 mb-6">{audition.applicationProcess}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
            <h2 className="font-playfair text-xl font-bold mb-4">Audition Details</h2>

            <div className="space-y-4">
              <div className="flex items-start">
                <Building className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-700">Production Company</p>
                  <p className="text-gray-800">{audition.company}</p>
                </div>
              </div>

              <div className="flex items-start">
                <MapPin className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-700">Location</p>
                  <p className="text-gray-800">
                    {audition.location}, {audition.state}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-700">Dates</p>
                  <p className="text-gray-800">{audition.date}</p>
                </div>
              </div>

              {audition.salary && (
                <div className="flex items-start">
                  <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                    <span className="font-bold">💰</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Salary</p>
                    <p className="text-gray-800">{audition.salary}</p>
                  </div>
                </div>
              )}

              {audition.duration && (
                <div className="flex items-start">
                  <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                    <span className="font-bold">⏱️</span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-700">Duration</p>
                    <p className="text-gray-800">{audition.duration}</p>
                  </div>
                </div>
              )}

              <div className="flex items-start">
                {audition.contactType === "email" ? (
                  <Mail className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                ) : audition.contactType === "whatsapp" ? (
                  <MessageSquare className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                ) : audition.contactType === "website" ? (
                  <Building className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                ) : (
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                )}
                <div>
                  <p className="font-medium text-gray-700">Contact</p>
                  <p className="text-gray-800">{audition.contact}</p>
                </div>
              </div>

              {(audition.id === 7 || audition.id === 8) && (
                <div className="flex items-start">
                  <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                    <span className="font-bold">💰</span>
                  </div>
                  <div>
                    <p className="font-medium">Compensation</p>
                    <p className="text-gray-600">
                      {audition.id === 7 ? "Paid opportunity (details during selection)" : "Paid teaching assignment"}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Contact for Meera casting */}
            {audition.id === 1 && (
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="font-semibold text-green-800 mb-2">📞 Quick Contact</h3>
                <p className="text-green-700 text-sm mb-3">For immediate queries about the Meera character role</p>
                <a
                  href={audition.companyLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp: 7375962175
                </a>
              </div>
            )}

            {/* Special notice for OMASTA Studios */}
            {audition.id === 2 && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-800 mb-2 flex items-center">⚔️ Special Requirements</h4>
                <ul className="text-sm text-orange-700 space-y-1">
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2 mt-0.5">•</span>
                    Calm, wise presence
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2 mt-0.5">•</span>
                    Willingness to wear beard and wig (provided)
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-600 mr-2 mt-0.5">•</span>
                    Preference for Northeast Indian origin with East Asian features
                  </li>
                </ul>
              </div>
            )}

            {/* Apply Button */}
            <div className="space-y-3">
              {audition.id === 2 ? (
                <>
                  <a href={audition.googleFormLink} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply via Google Form
                    </Button>
                  </a>
                  <a
                    href={`https://wa.me/${audition.whatsappContact}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <Button
                      variant="outline"
                      className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      WhatsApp for Queries
                    </Button>
                  </a>
                </>
              ) : audition.contactType === "whatsapp" ? (
                <a href={audition.companyLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Apply via WhatsApp
                  </Button>
                </a>
              ) : audition.contactType === "phone" ? (
                <a href={audition.companyLink} className="block">
                  <Button className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call to Apply
                  </Button>
                </a>
              ) : audition.contactType === "email" ? (
                <a href={audition.companyLink} className="block">
                  <Button className="w-full">
                    <Mail className="h-4 w-4 mr-2" />
                    Email to Apply
                  </Button>
                </a>
              ) : (
                <a href={audition.companyLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Apply Online
                  </Button>
                </a>
              )}
            </div>

            <div className="mt-4 pt-6 border-t">
              <a href={audition.companyLink} target="_blank" rel="noopener noreferrer">
                <Button className="w-full rounded-md">
                  {audition.contactType === "whatsapp" && <MessageSquare className="mr-2 h-4 w-4" />}
                  {audition.contactType === "email" && <Mail className="mr-2 h-4 w-4" />}
                  {audition.contactType === "phone" && <Phone className="mr-2 h-4 w-4" />}
                  {audition.contactType === "website" && <Building className="mr-2 h-4 w-4" />}
                  {audition.contactType === "whatsapp"
                    ? "Contact via WhatsApp"
                    : audition.contactType === "email"
                      ? "Send Email"
                      : audition.contactType === "phone"
                        ? "Call Now"
                        : audition.contactType === "website"
                          ? "Visit Website"
                          : "Contact for Audition"}
                </Button>
              </a>
            </div>

            {audition.verified && (
              <div className="mt-4 flex items-center text-sm text-green-600">
                <CheckCircle className="h-4 w-4 mr-2" />
                Verified Audition
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
