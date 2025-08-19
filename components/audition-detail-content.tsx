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
    title: "Casting Call – Maithili Play",
    type: "Theater",
    location: "Bengaluru",
    state: "Karnataka",
    date: "Apply by 22 August 2025",
    director: "Broken Wall Bridge Theatre Group",
    description:
      "Play Title: Maithili. Duration: 50 minutes. Characters: 10. Language: Hindi. Video audition required - choose any two roles, record dialogues, upload to Google Drive and submit form. Selected candidates will be invited for play reading session.",
    company: "Broken Wall Bridge Theatre Group",
    companyInstagram: "https://www.instagram.com/brokenwallbridge?igsh=bGp1MG5rbXEwZG01",
    companyLink: "https://docs.google.com/forms/d/e/1FAIpQLSdUM6apfL5XZ3X3YRf0AcNEWm59kyuRZ92qgIMRVG1B96m8Vw/viewform",
    contact: "Ashish - 8788132835",
    contactType: "form",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    playTitle: "Maithili",
    duration: "50 minutes",
    totalCharacters: 10,
    language: "Hindi",
    videoAudition: true,
    applicationDeadline: "22 August 2025",
    requirements: [
      "Choose any two roles that resonate with you",
      "Male actors: perform all dialogues provided (only two male characters listed)",
      "Record a video performing the dialogues",
      "Upload the video to Google Drive and make it shareable",
      "Submit the audition form with video link",
      "Based in or able to travel to Bengaluru",
    ],
    roles: [
      "Maithili (Female, Age 48) - Submissive, Assertive, Ecstatic moods",
      "Sunita (Female, Age 45) - Bossy, Angry moods",
      "Asha (Female, Age 60) - Submissive mood",
      "Shama (Female, Age 60) - Pretentious mood",
      "Suraj (Male, Age 20) - Submissive, Hopeful, Assertive moods",
      "Groom (Male, Age 27) - Uninterested, Angry moods",
    ],
    applicationProcess:
      "Fill the audition form at https://docs.google.com/forms/d/e/1FAIpQLSdUM6apfL5XZ3X3YRf0AcNEWm59kyuRZ92qgIMRVG1B96m8Vw/viewform. For any doubts, contact Ashish at 8788132835. Selected candidates will be invited for a play reading session.",
    characterDetails: {
      femaleRoles: [
        {
          name: "Maithili",
          age: 48,
          moods: ["Submissive", "Assertive", "Ecstatic"],
          dialogues: [
            {
              mood: "Ecstatic",
              text: "My Goodness, kitne saaalon baad kisi apne se mil rahi hu. Batao, cake, muffin, pastry ya coffee. Kya loge tum?",
            },
            {
              mood: "Submissive",
              text: "Dekhiye, main aapse kuchh kehna chahti hu.",
            },
            {
              mood: "Assertive",
              text: "Mere niji jeevanm par tippani karne ka aapko koi adhikaar nahi hain.",
            },
          ],
        },
        {
          name: "Sunita",
          age: 45,
          moods: ["Bossy", "Angry"],
          dialogues: [
            {
              mood: "Angry",
              text: "Apni galti chupaane ke liye ek buzurg vyakti par ungli uthate hue tumhe sharam nahi aai? Huh, mein toh bhool hi gayi, ki tum nihayti besharam ho.",
            },
          ],
        },
        {
          name: "Asha",
          age: 60,
          moods: ["Submissive"],
          dialogues: [
            {
              mood: "Pleading",
              text: "Nahi nahi, kucch toh hal niklega. Aap jara shant ho jaiye.",
            },
          ],
        },
        {
          name: "Shama",
          age: 60,
          moods: ["Pretentious"],
          dialogues: [
            {
              mood: "Pretentious",
              text: "Dekhiye, hum toh bade progressive hain.",
            },
            {
              mood: "Pretentious",
              text: "Wah Ashaji, beti ko vilaayat kya bhej diya, uski toh soch hi wahan ki ho gai. Arre, humare bacche bhi padhe likhe hain, America mein naukri karte hain, lekin ghar ke sanskaar nahi bhule.",
            },
          ],
        },
      ],
      maleRoles: [
        {
          name: "Suraj",
          age: 20,
          moods: ["Submissive", "Hopeful", "Assertive"],
          dialogues: [
            {
              mood: "Blushing",
              text: "Ma, aapki aur papa ki bhi toh love marriage hui thi. Toh mujhe ijazat hogi hi.",
            },
            {
              mood: "Assertive",
              text: "kya chote kabhi sahi nahi ho sakte? Kya bade kabhi galat nahi ho sakte?",
            },
          ],
        },
        {
          name: "Groom",
          age: 27,
          moods: ["Uninterested", "Angry"],
          dialogues: [
            {
              mood: "Angry, Irritated",
              text: "Maa, papa, bahar aaiye, hume der ho rahi hain. Hume ab chalna chahiye.",
            },
          ],
        },
      ],
    },
    auditionInstructions: [
      "Download/Read Character Dialogues",
      "Choose any two roles that resonate with you",
      "Male actors: perform all dialogues provided (only two male characters listed)",
      "Record a video performing the dialogues",
      "Upload the video to your Google Drive and make it shareable",
      "Put the video link in the audition form",
      "Fill the Audition Form",
      "Selected candidates will be invited for a play reading session",
    ],
    importantNotes: [
      "The ages mentioned are for the character, not the actor",
      "Last Date to Submit: 22 August 2025",
      "Next Step (if selected): Play reading session invitation",
      "Brief character information should be provided in the form",
    ],
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
          <p className="text-gray-600 mb-6">The audition you're looking for doesn't exist or has been removed.</p>
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
            className={`bg-white rounded-lg border overflow-hidden ${
              audition.id === 2 ? "border-orange-200" : audition.id === 7 ? "border-purple-200" : "border-gray-200"
            }`}
          >
            <div className="relative h-64 w-full">
              <Image
                src={audition.image || "/images/auditions-stage.png"}
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
              {audition.id === 7 && (
                <div className="absolute top-4 left-4 bg-purple-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  🎭 Theater Play
                </div>
              )}
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`badge-primary ${
                    audition.id === 2
                      ? "bg-orange-100 text-orange-800"
                      : audition.id === 7
                        ? "bg-purple-100 text-purple-800"
                        : ""
                  }`}
                >
                  {audition.type}
                </span>
                <span className="badge-outline">{audition.experience}</span>
                {audition.id === 8 && <span className="badge-success">Paid</span>}
                {audition.id === 1 && <span className="badge-success">Open Now</span>}
                {audition.videoAudition && <span className="badge-secondary">Video Audition</span>}
              </div>

              <h1 className="font-playfair text-3xl font-bold mb-4">{audition.title}</h1>

              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-3">Description</h2>
                <p className="text-gray-800 mb-6">{audition.description}</p>

                {/* Special section for Maithili play audition */}
                {audition.id === 7 && (
                  <>
                    <section>
                      <h2 className="text-xl font-semibold mb-3">🎭 Play Information</h2>
                      <div className="bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <p className="font-medium text-gray-700 mb-1">Play Title</p>
                            <p className="text-lg font-semibold text-purple-800">{audition.playTitle}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <p className="font-medium text-gray-700 mb-1">Duration</p>
                            <p className="text-lg font-semibold text-purple-800">{audition.duration}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <p className="font-medium text-gray-700 mb-1">Total Characters</p>
                            <p className="text-lg font-semibold text-purple-800">{audition.totalCharacters}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <p className="font-medium text-gray-700 mb-1">Language</p>
                            <p className="text-lg font-semibold text-purple-800">{audition.language}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">🎬 Audition Process</h2>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                        <div className="space-y-4">
                          {audition.auditionInstructions.map((instruction: string, index: number) => (
                            <div key={index} className="bg-white rounded-lg p-4 border border-purple-200">
                              <div className="flex items-start">
                                <span className="bg-purple-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">
                                  {index + 1}
                                </span>
                                <p className="text-gray-700">{instruction}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">👥 Character Roles & Dialogues</h2>

                      {/* Female Roles */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-purple-800 mb-4">Female Roles</h3>
                        <div className="space-y-6">
                          {audition.characterDetails.femaleRoles.map((character: any, index: number) => (
                            <div
                              key={index}
                              className="bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-200 rounded-lg p-6"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-purple-800">{character.name}</h4>
                                <div className="flex items-center space-x-2">
                                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Age: {character.age}
                                  </span>
                                </div>
                              </div>

                              <div className="mb-4">
                                <p className="font-medium text-gray-700 mb-2">Character Moods:</p>
                                <div className="flex flex-wrap gap-2">
                                  {character.moods.map((mood: string, moodIndex: number) => (
                                    <span
                                      key={moodIndex}
                                      className="bg-purple-200 text-purple-800 px-2 py-1 rounded text-sm"
                                    >
                                      {mood}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="font-medium text-gray-700 mb-3">Sample Dialogues:</p>
                                <div className="space-y-3">
                                  {character.dialogues.map((dialogue: any, dialogueIndex: number) => (
                                    <div
                                      key={dialogueIndex}
                                      className="bg-white rounded-lg p-4 border border-purple-200"
                                    >
                                      <div className="flex items-center mb-2">
                                        <span className="bg-purple-600 text-white px-2 py-1 rounded text-xs font-medium mr-2">
                                          {dialogue.mood}
                                        </span>
                                      </div>
                                      <p className="text-gray-800 italic">"{dialogue.text}"</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Male Roles */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-purple-800 mb-4">Male Roles</h3>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                          <p className="text-blue-800 text-sm font-medium">
                            📝 Note for Male Actors: Perform all dialogues provided as only two male characters are
                            listed.
                          </p>
                        </div>
                        <div className="space-y-6">
                          {audition.characterDetails.maleRoles.map((character: any, index: number) => (
                            <div
                              key={index}
                              className="bg-gradient-to-r from-blue-50 to-purple-50 border border-purple-200 rounded-lg p-6"
                            >
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-purple-800">{character.name}</h4>
                                <div className="flex items-center space-x-2">
                                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                                    Age: {character.age}
                                  </span>
                                </div>
                              </div>

                              <div className="mb-4">
                                <p className="font-medium text-gray-700 mb-2">Character Moods:</p>
                                <div className="flex flex-wrap gap-2">
                                  {character.moods.map((mood: string, moodIndex: number) => (
                                    <span
                                      key={moodIndex}
                                      className="bg-blue-200 text-blue-800 px-2 py-1 rounded text-sm"
                                    >
                                      {mood}
                                    </span>
                                  ))}
                                </div>
                              </div>

                              <div>
                                <p className="font-medium text-gray-700 mb-3">Sample Dialogues:</p>
                                <div className="space-y-3">
                                  {character.dialogues.map((dialogue: any, dialogueIndex: number) => (
                                    <div key={dialogueIndex} className="bg-white rounded-lg p-4 border border-blue-200">
                                      <div className="flex items-center mb-2">
                                        <span className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium mr-2">
                                          {dialogue.mood}
                                        </span>
                                      </div>
                                      <p className="text-gray-800 italic">"{dialogue.text}"</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">📋 Important Notes</h2>
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
                        <ul className="space-y-2">
                          {audition.importantNotes.map((note: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <span className="text-yellow-600 mr-2 mt-1">•</span>
                              <span className="text-gray-800">{note}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">📝 Application Instructions</h2>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                              📝 Step 1: Fill the Audition Form
                            </h4>
                            <p className="text-gray-700 mb-3">
                              Complete the audition form with all required details including your video link.
                            </p>
                            <a
                              href={audition.companyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open Audition Form
                            </a>
                          </div>

                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                              💬 Step 2: Contact for Queries
                            </h4>
                            <p className="text-gray-700 mb-3">
                              For any doubts or additional information about the audition process.
                            </p>
                            <a
                              href={`tel:${audition.contact.split(" - ")[1]}`}
                              className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                            >
                              <Phone className="h-4 w-4 mr-2" />
                              {audition.contact}
                            </a>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {/* Character Details Section for other auditions */}
                {audition.characterDetails && audition.id !== 7 && (
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

                {audition.id !== 7 && (
                  <>
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
                  </>
                )}
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
                  {audition.id === 7 && audition.companyInstagram ? (
                    <a
                      href={audition.companyInstagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 hover:underline transition-colors font-medium"
                    >
                      {audition.company}
                    </a>
                  ) : (
                    <p className="text-gray-800">{audition.company}</p>
                  )}
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
                ) : audition.contactType === "form" ? (
                  <ExternalLink className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                ) : (
                  <Phone className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                )}
                <div>
                  <p className="font-medium text-gray-700">Contact</p>
                  <p className="text-gray-800">{audition.contact}</p>
                </div>
              </div>

              {audition.id === 8 && (
                <div className="flex items-start">
                  <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                    <span className="font-bold">💰</span>
                  </div>
                  <div>
                    <p className="font-medium">Compensation</p>
                    <p className="text-gray-600">Paid teaching assignment</p>
                  </div>
                </div>
              )}

              {audition.applicationDeadline && (
                <div className="flex items-start">
                  <Calendar className="h-5 w-5 text-gray-500 mt-0.5 mr-3" />
                  <div>
                    <p className="font-medium text-gray-700">Application Deadline</p>
                    <p className="text-gray-800 font-semibold text-red-600">{audition.applicationDeadline}</p>
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
              <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
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

            {/* Special notice for Maithili play */}
            {audition.id === 7 && (
              <div className="mt-6 bg-purple-50 border border-purple-200 rounded-lg p-4">
                <h4 className="font-medium text-purple-800 mb-2 flex items-center">🎭 Video Audition Requirements</h4>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-0.5">•</span>
                    Choose any 2 roles
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-0.5">•</span>
                    Record video dialogues
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-0.5">•</span>
                    Upload to Google Drive
                  </li>
                  <li className="flex items-start">
                    <span className="text-purple-600 mr-2 mt-0.5">•</span>
                    Submit form with video link
                  </li>
                </ul>
              </div>
            )}

            {/* Apply Button */}
            <div className="mt-6 space-y-3">
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
              ) : audition.id === 7 ? (
                <>
                  <a href={audition.companyLink} target="_blank" rel="noopener noreferrer" className="block">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Fill Audition Form
                    </Button>
                  </a>
                  <a href={`tel:${audition.contact.split(" - ")[1]}`} className="block">
                    <Button
                      variant="outline"
                      className="w-full border-purple-200 text-purple-700 hover:bg-purple-50 bg-transparent"
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Call for Queries
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
                  {audition.contactType === "form" && <ExternalLink className="mr-2 h-4 w-4" />}
                  {audition.contactType === "whatsapp"
                    ? "Contact via WhatsApp"
                    : audition.contactType === "email"
                      ? "Send Email"
                      : audition.contactType === "phone"
                        ? "Call Now"
                        : audition.contactType === "website"
                          ? "Visit Website"
                          : audition.contactType === "form"
                            ? "Fill Application Form"
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
