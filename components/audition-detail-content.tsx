"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Phone,
  MessageSquare,
  CheckCircle,
  ExternalLink,
  Building,
  MapPin,
  Calendar,
  Mail,
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
    title: "Maithili - Theatre Production",
    type: "Theater",
    location: "Bengaluru",
    state: "Karnataka",
    date: "Apply by 29 September 2025",
    director: "Theatre Production",
    description:
      "We are looking for actors to play various characters for an upcoming theatre production 'Maithili'. This is an engaging theatrical piece that explores family dynamics, relationships, and cultural themes through compelling storytelling. The production requires a diverse cast to bring these complex characters to life.",
    company: "Theatre Production",
    companyLink: "https://wa.me/918788132835",
    contact: "8788132835 (WhatsApp - Ashish)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    playTitle: "Maithili",
    duration: "Full-length production",
    totalCharacters: 6,
    language: "Hindi",
    applicationDeadline: "29 September 2025",
    requirements: [
      "Actors of any age may apply (character ages are mentioned for reference only)",
      "Available for rehearsals: 3 hours every Sunday",
      "Available for online sessions: 30 minutes, twice a week",
      "Available for performances in November 2025",
      "Based in or able to travel to Bengaluru",
      "Commitment to the full production timeline",
    ],
    roles: [
      "Shekhar – Father of two teenagers (Male)",
      "Mohanlal – Father of a 28-year-old (Male)",
      "Raghav – 25-year-old (Male)",
      "Ashaji – 50-year-old (Female)",
      "Pinki – 20-year-old (Female)",
      "Elizabeth – White / white-passing, 45-year-old (Female)",
    ],
    applicationProcess:
      "Contact Ashish via WhatsApp at 8788132835 to express your interest and discuss the roles. Please mention which character(s) you're interested in auditioning for.",
    schedule: {
      rehearsals: "3 hours every Sunday",
      onlineSessions: "30 minutes, twice a week",
      showMonth: "November 2025",
    },
    characterDetails: {
      roles: [
        {
          name: "Shekhar",
          gender: "Male",
          description:
            "Father of two teenagers. A complex paternal figure navigating the challenges of raising adolescent children.",
          note: "Character age is for reference - actors of any age may apply",
        },
        {
          name: "Mohanlal",
          gender: "Male",
          description:
            "Father of a 28-year-old. An experienced parent dealing with adult child relationships and family dynamics.",
          note: "Character age is for reference - actors of any age may apply",
        },
        {
          name: "Raghav",
          gender: "Male",
          description: "25-year-old character. A young adult navigating life's challenges and family expectations.",
          note: "Character age is for reference - actors of any age may apply",
        },
        {
          name: "Ashaji",
          gender: "Female",
          description:
            "50-year-old character. A mature woman with life experience and wisdom, playing a significant role in the family dynamics.",
          note: "Character age is for reference - actors of any age may apply",
        },
        {
          name: "Pinki",
          gender: "Female",
          description:
            "20-year-old character. A young woman at the threshold of adulthood, bringing energy and youthful perspective to the story.",
          note: "Character age is for reference - actors of any age may apply",
        },
        {
          name: "Elizabeth",
          gender: "Female",
          description:
            "White / white-passing, 45-year-old character. Brings a unique cultural perspective to the narrative and family interactions.",
          note: "Character age is for reference - actors of any age may apply. Looking for white or white-passing actors for authenticity.",
        },
      ],
    },
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
    title: "NSD Sikkim Centre - Artist Recruitment for Repertory Company",
    type: "Job Opportunity",
    location: "Gangtok",
    state: "Sikkim",
    date: "Apply by 21 September 2025 (5:00 PM)",
    director: "National School of Drama (NSD) Sikkim Centre",
    description:
      "National School of Drama (NSD) Sikkim Centre is recruiting 6 artists for their Repertory Company. This is an excellent opportunity to work with one of India's premier theatre institutions in the beautiful state of Sikkim. The selected candidates will be part of a prestigious repertory company and contribute to the rich theatrical heritage of the region.",
    company: "National School of Drama (NSD) Sikkim Centre",
    companyLink: "mailto:nsdcampofficesikkim@gmail.com",
    contact: "nsdcampofficesikkim@gmail.com | 03592-201010",
    contactType: "email",
    experience: "Experienced",
    verified: true,
    image: "/images/auditions-stage.png",
    salary: "₹40,000/month",
    numberOfPosts: 6,
    ageLimit: "20-35 years",
    applicationDeadline: "21 September 2025 (5:00 PM)",
    landlineContact: "03592-201010 / 291415",
    timings: "10:00 a.m. – 6:00 p.m. (Monday to Friday)",
    websiteInfo: "https://sikkim.nsd.gov.in/sikkim_rec_adv.pdf",
    requirements: [
      "Graduation from any recognized university",
      "One-Year Residential Certificate Course in Dramatic Arts from NSD Sikkim Centre or any other recognized theatre training institute",
      "Experience of participating in at least 10 important productions in Hindi or any Indian language, performing major roles",
      "Age limit: 20-35 years",
      "Must be available for full-time employment in Gangtok, Sikkim",
    ],
    desirableQualifications: [
      "Minimum 3 years' working experience in theatre",
      "Knowledge of dance, music, and allied art",
      "Experience in direction of play/stage craft",
      "Knowledge of one or two regional languages/dialects",
      "Knowledge of acting theories and styles",
    ],
    roles: [
      "Artist in Repertory Company - 6 positions available",
      "Salary: ₹40,000 per month",
      "Age range: 20-35 years",
      "Location: Gangtok, Sikkim",
      "Full-time employment with NSD Sikkim Centre",
    ],
    applicationProcess:
      "Send a written application addressed to the Centre Director, NSD Sikkim. Email your complete application to nsdcampofficesikkim@gmail.com on or before 21.09.2025 (5:00 p.m.). Include all required documents as mentioned in the requirements.",
    applicationRequirements: [
      "Written application addressed to Centre Director, NSD Sikkim",
      "One recent passport-size photograph",
      "Self-attested copies of educational qualification certificates",
      "10th certificate (self-attested copy)",
      "Latest caste certificate (if applicable, self-attested)",
      "Address proof (self-attested copy)",
      "Theatre experience proof/certificates",
    ],
    importantNotes: [
      "Already employed candidates should apply through proper channel",
      "No TA/DA & accommodation will be provided for audition/interview",
      "SC/ST candidates will be reimbursed 3-tier non-AC railway fare (shortest route) on submission of railway/bus ticket",
      "Office timings for queries: 10:00 a.m. – 6:00 p.m. (Monday to Friday)",
    ],
  },
  {
    id: 13,
    title: "Casting Call for Theater Actors/Clowns and Production Team",
    type: "Theater",
    location: "Location TBD",
    state: "India",
    date: "Rehearsals: October 2025, Shows: November 2025",
    director: "44 Clown Company",
    description:
      "We are seeking talented theater actors with clowning experience for a short, device-based theater performance as part of an upcoming Children's Theater Festival. This is a paid project that promises to be both rewarding and fun!",
    company: "44 Clown Company",
    companyLink: "mailto:44clowncompany@gmail.com",
    contact: "44clowncompany@gmail.com",
    contactType: "email",
    experience: "Experienced",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Full-time theater artists only",
      "Available for rehearsals throughout October 2025",
      "Available for performances in November 2025",
      "Passion for engaging with young audiences",
      "Experience in clowning or children's theater preferred",
      "Production personnel: Experience in managing production and sound for live performances",
      "Technical skills: Capable of overseeing technical aspects of the play",
    ],
    roles: [
      "Theater Actors/Clowns - Full-time theater artists with clowning experience",
      "Production Personnel - Experienced in managing production and sound for live performances",
      "Technical Skills - Capable of overseeing technical aspects of the play",
      "Children's Theater Focus - Must have passion for engaging with young audiences",
    ],
    applicationProcess:
      "If you are passionate about theater and eager to contribute to this magical project, please send your profile to 44clowncompany@gmail.com.",
    festivalDetails: {
      name: "Children's Theater Festival",
      type: "Device-based theater performance",
      duration: "Short performance",
      compensation: "Paid project",
      rehearsalPeriod: "October 2025",
      performancePeriod: "November 2025",
      description:
        "A magical project focused on engaging young audiences through innovative device-based theater performance.",
    },
    specialRequirements: [
      "Full-time theater artists only",
      "Clowning experience preferred",
      "Experience with children's audiences",
      "Production and sound management skills (for production roles)",
      "Technical theater experience (for production roles)",
    ],
  },
  {
    id: 14,
    title: "Nukkad Natak Audition - Female Performer Needed",
    type: "Theater",
    location: "Bihar",
    state: "Bihar",
    date: "Ongoing",
    director: "Street Theatre Production",
    description:
      "Seeking one talented female performer for an exciting Nukkad Natak (street play) production in Bihar. This is a paid opportunity with excellent compensation and all expenses covered including travel, accommodation, and meals.",
    company: "Street Theatre Production",
    companyLink: "https://wa.me/918690301249",
    contact: "8690301249 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Female performer (1 position available)",
      "Comfortable with street theatre/Nukkad Natak format",
      "Strong stage presence and vocal projection",
      "Ability to engage with diverse audiences",
      "Available for travel to Bihar",
      "Flexible schedule for rehearsals and performances",
    ],
    roles: [
      "Female Performer - Lead role in Nukkad Natak production",
      "Street Theatre Performance - Engaging outdoor audiences",
      "Social Message Delivery - Conveying important themes through performance",
    ],
    applicationProcess:
      "Contact us via WhatsApp at 8690301249 to express your interest. Share your theatre experience, portfolio, and availability. Selected candidates will be contacted for further discussion.",
    compensation: {
      payment: "Good payment offered",
      travel: "Travel expenses covered",
      accommodation: "Stay provided",
      meals: "Food provided",
    },
    projectDetails: {
      format: "Nukkad Natak (Street Play)",
      positions: "1 Female Performer",
      location: "Bihar",
      benefits: ["Good Payment", "Travel Covered", "Accommodation Provided", "Meals Included"],
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
    <div className="container py-8 sm:py-10 md:py-12 px-3 sm:px-4">
      <Link href="/auditions" className="inline-flex items-center text-primary hover:underline mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Auditions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2">
          <div
            className={`bg-white rounded-lg border overflow-hidden ${
              audition.id === 2
                ? "border-orange-200"
                : audition.id === 7
                  ? "border-purple-200"
                  : audition.id === 13
                    ? "border-blue-200"
                    : audition.id === 14
                      ? "border-green-200"
                      : "border-gray-200"
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
              {audition.id === 13 && (
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  🎪 Children's Festival
                </div>
              )}
              {audition.id === 14 && (
                <div className="absolute top-4 left-4 bg-green-600 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                  🎤 Nukkad Natak
                </div>
              )}
            </div>

            <div className="p-4 sm:p-5 md:p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className={`badge-primary ${
                    audition.id === 2
                      ? "bg-orange-100 text-orange-800"
                      : audition.id === 7
                        ? "bg-purple-100 text-purple-800"
                        : audition.id === 13
                          ? "bg-blue-100 text-blue-800"
                          : audition.id === 14
                            ? "bg-green-100 text-green-800"
                            : ""
                  }`}
                >
                  {audition.type}
                </span>
                <span className="badge-outline">{audition.experience}</span>
                {audition.id === 8 && <span className="badge-success">Paid</span>}
                {audition.id === 1 && <span className="badge-success">Open Now</span>}
                {audition.id === 13 && <span className="badge-success">Paid Project</span>}
                {audition.id === 14 && <span className="badge-success">Paid Opportunity</span>}
                {audition.videoAudition && <span className="badge-secondary">Video Audition</span>}
              </div>

              <h1 className="font-playfair text-3xl font-bold mb-4">{audition.title}</h1>

              <div className="prose max-w-none">
                <h2 className="text-lg sm:text-xl font-semibold mb-3">Description</h2>
                <p className="text-sm sm:text-base text-gray-800 mb-4 sm:mb-6 break-words leading-relaxed">
                  {audition.description}
                </p>

                {/* Special section for Children's Theater Festival casting */}
                {audition.id === 13 && (
                  <>
                    <section>
                      <h2 className="text-xl font-semibold mb-3">🎪 Festival Information</h2>
                      <div className="bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <p className="font-medium text-gray-700 mb-1">Festival Name</p>
                            <p className="text-lg font-semibold text-blue-800">{audition.festivalDetails.name}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <p className="font-medium text-gray-700 mb-1">Performance Type</p>
                            <p className="text-lg font-semibold text-blue-800">{audition.festivalDetails.type}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <p className="font-medium text-gray-700 mb-1">Rehearsal Period</p>
                            <p className="text-lg font-semibold text-blue-800">
                              {audition.festivalDetails.rehearsalPeriod}
                            </p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <p className="font-medium text-gray-700 mb-1">Performance Period</p>
                            <p className="text-lg font-semibold text-blue-800">
                              {audition.festivalDetails.performancePeriod}
                            </p>
                          </div>
                        </div>
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                          <p className="font-medium text-gray-700 mb-2">About the Festival</p>
                          <p className="text-gray-800 italic">"{audition.festivalDetails.description}"</p>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">🎭 Role Requirements</h2>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                        <div className="space-y-6">
                          <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                              🎪 Theater Actors/Clowns
                            </h4>
                            <ul className="text-gray-700 space-y-2">
                              <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                Full-time theater artists only
                              </li>
                              <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                Experience in clowning or children's theater preferred
                              </li>
                              <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                Passion for engaging with young audiences
                              </li>
                              <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                Available for rehearsals throughout October 2025
                              </li>
                            </ul>
                          </div>

                          <div className="bg-white rounded-lg p-4 border border-blue-200">
                            <h4 className="font-semibold text-blue-800 mb-3 flex items-center">
                              🎬 Production Personnel
                            </h4>
                            <ul className="text-gray-700 space-y-2">
                              <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                Experience in managing production and sound for live performances
                              </li>
                              <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                Technical skills for overseeing technical aspects of the play
                              </li>
                              <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                Capable of ensuring seamless performance delivery
                              </li>
                              <li className="flex items-start">
                                <span className="text-blue-600 mr-2 mt-1">•</span>
                                Available for rehearsals in October and performances in November
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">📧 Application Process</h2>
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                        <div className="bg-white rounded-lg p-4 border border-blue-200">
                          <h4 className="font-semibold text-blue-800 mb-2 flex items-center">📝 How to Apply</h4>
                          <p className="text-gray-700 mb-3">
                            Send your complete profile to our casting team. Include your theater experience, clowning
                            background (if applicable), and availability for the project timeline.
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-blue-700">Email: 44clowncompany@gmail.com</span>
                            <a
                              href={audition.companyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                            >
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Send Profile
                            </a>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                )}

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
                      <h2 className="text-xl font-semibold mb-3">🎬 Schedule</h2>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <p className="font-medium text-gray-700 mb-1">Rehearsals</p>
                            <p className="text-lg font-semibold text-purple-800">{audition.schedule.rehearsals}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <p className="font-medium text-gray-700 mb-1">Online Sessions</p>
                            <p className="text-lg font-semibold text-purple-800">{audition.schedule.onlineSessions}</p>
                          </div>
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <p className="font-medium text-gray-700 mb-1">Performances</p>
                            <p className="text-lg font-semibold text-purple-800">{audition.schedule.showMonth}</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">🎭 Character Information</h2>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                        <div className="space-y-6">
                          {audition.characterDetails.roles.map((character: any, index: number) => (
                            <div key={index} className="bg-white rounded-lg p-4 border border-purple-200">
                              <div className="flex items-center justify-between mb-4">
                                <h4 className="text-lg font-semibold text-purple-800">{character.name}</h4>
                                <div className="flex items-center space-x-2">
                                  <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                                    {character.gender}
                                  </span>
                                </div>
                              </div>
                              <p className="text-gray-700 mb-2">{character.description}</p>
                              <p className="text-xs text-gray-500 italic">{character.note}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">📋 Application Instructions</h2>
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 mb-6">
                        <div className="space-y-4">
                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                              💬 Step 1: Contact for Interest
                            </h4>
                            <p className="text-gray-700 mb-3">
                              Reach out to Ashish via WhatsApp to express your interest and discuss potential roles.
                            </p>
                            <a
                              href={audition.companyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              WhatsApp: {audition.contact.split(" - ")[0]}
                            </a>
                          </div>

                          <div className="bg-white rounded-lg p-4 border border-purple-200">
                            <h4 className="font-semibold text-purple-800 mb-2 flex items-center">
                              📝 Step 2: Discuss Roles
                            </h4>
                            <p className="text-gray-700 mb-3">
                              Please mention which character(s) you are interested in auditioning for when you contact
                              us.
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {audition.id === 14 && (
                  <>
                    <section>
                      <h2 className="text-lg sm:text-xl font-semibold mb-3">🎭 Project Overview</h2>
                      <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mb-4">
                          <div className="bg-white/80 backdrop-blur-sm rounded-md p-3 sm:p-4 border border-green-100">
                            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Performance Type</p>
                            <p className="text-sm sm:text-base md:text-lg font-semibold text-green-800 break-words">
                              {audition.projectDetails.format}
                            </p>
                          </div>
                          <div className="bg-white/80 backdrop-blur-sm rounded-md p-3 sm:p-4 border border-green-100">
                            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Positions Available</p>
                            <p className="text-sm sm:text-base md:text-lg font-semibold text-green-800 break-words">
                              {audition.projectDetails.positions}
                            </p>
                          </div>
                          <div className="bg-white/80 backdrop-blur-sm rounded-md p-3 sm:p-4 border border-green-100">
                            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Location</p>
                            <p className="text-sm sm:text-base md:text-lg font-semibold text-green-800 break-words">
                              {audition.projectDetails.location}
                            </p>
                          </div>
                          <div className="bg-white/80 backdrop-blur-sm rounded-md p-3 sm:p-4 border border-green-100">
                            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">Compensation</p>
                            <p className="text-sm sm:text-base md:text-lg font-semibold text-green-700 break-words">
                              {audition.compensation.payment}
                            </p>
                          </div>
                        </div>

                        <div className="bg-white/80 backdrop-blur-sm rounded-md p-3 sm:p-4 border border-green-100">
                          <p className="text-xs sm:text-sm font-medium text-gray-700 mb-2 sm:mb-3">
                            ✨ Benefits Included
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {audition.projectDetails.benefits.map((benefit: string, index: number) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 break-words"
                              >
                                <span className="text-green-600 flex-shrink-0">✓</span>
                                <span className="break-words">{benefit}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-lg sm:text-xl font-semibold mb-3">🎯 Role Requirements</h2>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 overflow-hidden">
                        <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200 mb-4">
                          <h4 className="text-sm sm:text-base font-semibold text-green-800 mb-3 flex items-center break-words">
                            👤 Female Performer - Street Theatre
                          </h4>
                          <ul className="space-y-2">
                            {audition.requirements.map((req: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 break-words"
                              >
                                <span className="text-green-600 flex-shrink-0 mt-0.5">•</span>
                                <span className="break-words leading-relaxed">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200">
                          <h4 className="text-sm sm:text-base font-semibold text-green-800 mb-3 flex items-center break-words">
                            🎭 What You'll Do
                          </h4>
                          <ul className="space-y-2">
                            {audition.roles.map((role: string, index: number) => (
                              <li
                                key={index}
                                className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 break-words"
                              >
                                <span className="text-green-600 flex-shrink-0 mt-0.5">•</span>
                                <span className="break-words leading-relaxed">{role}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-lg sm:text-xl font-semibold mb-3">💰 Compensation & Benefits</h2>
                      <div className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                          <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg sm:text-xl">💵</span>
                              <h4 className="text-sm sm:text-base font-semibold text-green-800 break-words">Payment</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-700 break-words leading-relaxed">
                              {audition.compensation.payment}
                            </p>
                          </div>

                          <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg sm:text-xl">✈️</span>
                              <h4 className="text-sm sm:text-base font-semibold text-green-800 break-words">Travel</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-700 break-words leading-relaxed">
                              {audition.compensation.travel}
                            </p>
                          </div>

                          <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg sm:text-xl">🏠</span>
                              <h4 className="text-sm sm:text-base font-semibold text-green-800 break-words">
                                Accommodation
                              </h4>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-700 break-words leading-relaxed">
                              {audition.compensation.accommodation}
                            </p>
                          </div>

                          <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-lg sm:text-xl">🍽️</span>
                              <h4 className="text-sm sm:text-base font-semibold text-green-800 break-words">Meals</h4>
                            </div>
                            <p className="text-xs sm:text-sm text-gray-700 break-words leading-relaxed">
                              {audition.compensation.meals}
                            </p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-lg sm:text-xl font-semibold mb-3">📱 How to Apply</h2>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 sm:p-5 md:p-6 mb-4 sm:mb-6 overflow-hidden">
                        <div className="bg-white rounded-lg p-3 sm:p-4 border border-green-200">
                          <h4 className="text-sm sm:text-base font-semibold text-green-800 mb-3 flex items-center break-words">
                            💬 Contact via WhatsApp
                          </h4>
                          <p className="text-xs sm:text-sm text-gray-700 mb-3 sm:mb-4 break-words leading-relaxed">
                            {audition.applicationProcess}
                          </p>
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                            <span className="text-xs sm:text-sm font-medium text-green-700 break-all">
                              📞 WhatsApp: 8690301249
                            </span>
                            <a
                              href={audition.companyLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full sm:w-auto inline-flex items-center justify-center bg-green-600 hover:bg-green-700 text-white text-xs sm:text-sm font-medium px-4 py-2 rounded-md transition-colors whitespace-nowrap"
                            >
                              <MessageSquare className="h-3 w-3 sm:h-4 sm:w-4 mr-2 flex-shrink-0" />
                              Apply Now
                            </a>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {/* Character Details Section for other auditions */}
                {audition.characterDetails && audition.id !== 7 && audition.id !== 13 && audition.id !== 14 && (
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
                      <h2 className="text-xl font-semibold mb-3">Position Details</h2>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium text-gray-700">Salary</p>
                            <p className="text-gray-800">{audition.salary}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Number of Posts</p>
                            <p className="text-gray-800">{audition.numberOfPosts}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Age Limit</p>
                            <p className="text-gray-800">{audition.ageLimit}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Location</p>
                            <p className="text-gray-800">Gangtok, Sikkim</p>
                          </div>
                        </div>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Essential Qualifications</h2>
                      <ul className="list-disc pl-5 mb-6">
                        {audition.requirements.map((req: string, index: number) => (
                          <li key={index} className="text-gray-800 mb-2">
                            {req}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Desirable Qualifications</h2>
                      <ul className="list-disc pl-5 mb-6">
                        {audition.desirableQualifications.map((skill: string, index: number) => (
                          <li key={index} className="text-gray-800 mb-2">
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Application Requirements</h2>
                      <div className="bg-green-50 p-4 rounded-lg mb-6 border border-green-200">
                        <p className="text-green-800 font-medium mb-3">
                          Documents to be attached with your application:
                        </p>
                        <ul className="list-disc pl-5">
                          {audition.applicationRequirements.map((req: string, index: number) => (
                            <li key={index} className="text-green-700 mb-2">
                              {req}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Important Information</h2>
                      <div className="bg-yellow-50 p-4 rounded-lg mb-6 border border-yellow-200">
                        <ul className="list-disc pl-5">
                          {audition.importantNotes.map((note: string, index: number) => (
                            <li key={index} className="text-yellow-800 mb-2">
                              {note}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </section>

                    <section>
                      <h2 className="text-xl font-semibold mb-3">Contact Information</h2>
                      <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-200">
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-gray-700">Email</p>
                            <p className="text-blue-600">{audition.contact.split(" | ")[0]}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Landline</p>
                            <p className="text-gray-800">{audition.landlineContact}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">Office Timings</p>
                            <p className="text-gray-800">{audition.timings}</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-700">More Information</p>
                            <a
                              href={audition.websiteInfo}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              View Official Notification (PDF)
                            </a>
                          </div>
                        </div>
                      </div>
                    </section>
                  </>
                )}

                {audition.id !== 7 && audition.id !== 13 && audition.id !== 14 && (
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
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-5 md:p-6 sticky top-24 overflow-hidden">
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

            {/* Special notice for Children's Theater Festival */}
            {audition.id === 13 && (
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">🎪 Festival Requirements</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-0.5">•</span>
                    Full-time theater artists only
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-0.5">•</span>
                    Clowning experience preferred
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-0.5">•</span>
                    Passion for children's audiences
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2 mt-0.5">•</span>
                    Available October-November 2025
                  </li>
                </ul>
              </div>
            )}

            {audition.id === 14 && (
              <div className="mt-4 sm:mt-6 bg-green-50 border border-green-200 rounded-lg p-3 sm:p-4 overflow-hidden">
                <h4 className="text-sm sm:text-base font-medium text-green-800 mb-2 flex items-center break-words">
                  🎭 All Expenses Covered
                </h4>
                <ul className="text-xs sm:text-sm text-green-700 space-y-1">
                  <li className="flex items-start gap-2 break-words">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>
                    <span className="break-words">Good payment</span>
                  </li>
                  <li className="flex items-start gap-2 break-words">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>
                    <span className="break-words">Travel covered</span>
                  </li>
                  <li className="flex items-start gap-2 break-words">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>
                    <span className="break-words">Accommodation provided</span>
                  </li>
                  <li className="flex items-start gap-2 break-words">
                    <span className="text-green-600 flex-shrink-0 mt-0.5">✓</span>
                    <span className="break-words">Meals included</span>
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
              ) : audition.id === 13 ? (
                <a href={audition.companyLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Profile via Email
                  </Button>
                </a>
              ) : audition.id === 14 ? (
                <a href={audition.companyLink} target="_blank" rel="noopener noreferrer" className="block">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Apply via WhatsApp
                  </Button>
                </a>
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
