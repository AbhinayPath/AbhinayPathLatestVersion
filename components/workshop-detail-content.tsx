"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { MapPin, Calendar, Clock, Mail, Phone, Check, ExternalLink, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Workshop {
  id: number
  title: string
  trainer: string
  institution: string
  location: string
  state: string
  date: string
  time: string
  description: string
  registrationLink: string
  price: string
  contact: string
  email: string
  eligibility: string
  venue: string
  fullDetails: {
    description: string
    keyHighlights: string[]
    curriculum: string[]
    duration: string
    medium: string
    courseFee: string
    certification: string
    contactInfo: string[]
    venue: string
    organizer: string
  }
}

const workshops: Workshop[] = [
  {
    id: 29,
    title: "FTII / CFOL — Sound Recording & Design Workshop (Lonavala)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Lonavala",
    state: "Maharashtra",
    date: "09–15 Mar 2026",
    time: "10 AM–5 PM",
    description:
      "Master the art of sound recording and sound design for films through immersive learning. Covers recording techniques, sound design principles, and post-production audio workflows.",
    registrationLink: "https://ftii.ac.in/p/vtwa/master-the-art-of-sound-recording-sound-design-for-your-films-though-immersive-learning-in-lonavala-09-to-15-march-2026",
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (exceptions considered)",
    venue: "Lonavala, Maharashtra",
    fullDetails: {
      description:
        "Master the art of sound recording and sound design for films through immersive learning in this intensive 7-day workshop from FTII. This comprehensive programme covers professional recording techniques, sound design principles, and post-production audio workflows essential for filmmakers and sound professionals.",
      keyHighlights: [
        "7-day intensive sound design training",
        "Learn from experienced FTII faculty",
        "Professional sound recording techniques",
        "Sound design principles and practices",
        "Post-production audio workflows",
        "FTII certification upon completion",
      ],
      curriculum: [
        "Introduction to sound recording for film",
        "Microphone techniques and placement",
        "Location sound recording",
        "Sound design fundamentals",
        "Foley and sound effects",
        "Audio post-production and mixing",
        "Final project presentation",
      ],
      duration: "7 days",
      medium: "English/Hindi",
      courseFee: "Contact FTII for fee details",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Lonavala, Maharashtra",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 28,
    title: "FTII / CFOL — Workshop on Foundations of Mobile Filmmaking (Lonavala)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Lonavala",
    state: "Maharashtra",
    date: "14–20 Mar 2026",
    time: "10 AM–5 PM",
    description:
      "Learn production design concepts and mobile filmmaking foundations in this intensive short-term workshop. Covers visual storytelling, set design principles, and practical production techniques.",
    registrationLink: "https://ftii.ac.in/p/vtwa/workshop-on-foundations-of-mobile-filmmaking-in-lonavala-16th-to-20th-march-2026",
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (exceptions considered)",
    venue: "Lonavala, Maharashtra",
    fullDetails: {
      description:
        "Learn production design concepts and mobile filmmaking foundations in this intensive 7-day short-term workshop from FTII. This comprehensive programme covers visual storytelling, set design principles, and practical production techniques for aspiring filmmakers and production designers.",
      keyHighlights: [
        "7-day intensive production design training",
        "Learn from experienced FTII faculty",
        "Mobile filmmaking foundations",
        "Visual storytelling techniques",
        "Practical production experience",
        "FTII certification upon completion",
      ],
      curriculum: [
        "Introduction to production design",
        "Visual storytelling fundamentals",
        "Set design principles",
        "Mobile filmmaking techniques",
        "Lighting and composition",
        "Practical production exercises",
        "Final project presentation",
      ],
      duration: "7 days",
      medium: "English/Hindi",
      courseFee: "Contact FTII for fee details",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Lonavala, Maharashtra",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 26,
    title: "Adishakti SOPE Residency — Session 1 (March 2026)",
    trainer: "Adishakti Faculty",
    institution: "Adishakti Theatre Arts Laboratory",
    location: "Puducherry",
    state: "Tamil Nadu",
    date: "08–17 Mar 2026",
    time: "Full Day (Residential)",
    description:
      "Source of Performance Energy (SOPE) is an intensive residential training program focusing on breath, energy, movement, body expression, voice, and rhythm for holistic performer development.",
    registrationLink: "https://adishaktitheatrearts.com/training/",
    price: "Contact Adishakti",
    contact: "0413-2622287",
    email: "info@adishaktitheatrearts.com",
    eligibility: "Open to performers and theatre practitioners",
    venue: "Adishakti Campus, Tamil Nadu",
    fullDetails: {
      description:
        "Source of Performance Energy (SOPE) is Adishakti's signature intensive residential training program. This 10-day immersive experience focuses on breath, energy, movement, body expression, voice, and rhythm — providing holistic performer development in a serene campus environment.",
      keyHighlights: [
        "10-day immersive residential training",
        "Breath and energy work",
        "Movement and body expression",
        "Voice and rhythm training",
        "Holistic performer development",
        "Training at Adishakti's renowned campus",
      ],
      curriculum: [
        "Breath awareness and control",
        "Energy cultivation and channeling",
        "Movement vocabulary and expression",
        "Body awareness and physical presence",
        "Voice training and modulation",
        "Rhythm and musicality in performance",
        "Integration of all elements in performance",
      ],
      duration: "10 days (Residential)",
      medium: "English",
      courseFee: "Contact Adishakti for fee details",
      certification: "Adishakti Certificate",
      contactInfo: ["Phone: 0413-2622287", "Email: info@adishaktitheatrearts.com"],
      venue: "Adishakti Campus, Tamil Nadu",
      organizer: "Adishakti Theatre Arts Laboratory",
    },
  },
  {
    id: 27,
    title: "Adishakti SOPE Residency — Session 2 (March 2026)",
    trainer: "Adishakti Faculty",
    institution: "Adishakti Theatre Arts Laboratory",
    location: "Puducherry",
    state: "Tamil Nadu",
    date: "21–30 Mar 2026",
    time: "Full Day (Residential)",
    description:
      "Source of Performance Energy (SOPE) is an intensive residential training program focusing on breath, energy, movement, body expression, voice, and rhythm for holistic performer development.",
    registrationLink: "https://adishaktitheatrearts.com/training/",
    price: "Contact Adishakti",
    contact: "0413-2622287",
    email: "info@adishaktitheatrearts.com",
    eligibility: "Open to performers and theatre practitioners",
    venue: "Adishakti Campus, Tamil Nadu",
    fullDetails: {
      description:
        "Source of Performance Energy (SOPE) is Adishakti's signature intensive residential training program. This 10-day immersive experience focuses on breath, energy, movement, body expression, voice, and rhythm — providing holistic performer development in a serene campus environment.",
      keyHighlights: [
        "10-day immersive residential training",
        "Breath and energy work",
        "Movement and body expression",
        "Voice and rhythm training",
        "Holistic performer development",
        "Training at Adishakti's renowned campus",
      ],
      curriculum: [
        "Breath awareness and control",
        "Energy cultivation and channeling",
        "Movement vocabulary and expression",
        "Body awareness and physical presence",
        "Voice training and modulation",
        "Rhythm and musicality in performance",
        "Integration of all elements in performance",
      ],
      duration: "10 days (Residential)",
      medium: "English",
      courseFee: "Contact Adishakti for fee details",
      certification: "Adishakti Certificate",
      contactInfo: ["Phone: 0413-2622287", "Email: info@adishaktitheatrearts.com"],
      venue: "Adishakti Campus, Tamil Nadu",
      organizer: "Adishakti Theatre Arts Laboratory",
    },
  },
  {
    id: 25,
    title: "FTII / CFOL — Basic Course in Screen Acting (Nainital)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Nainital",
    state: "Uttarakhand",
    date: "08–14 Mar 2026",
    time: "10 AM–5 PM",
    description:
      "Learn acting technique, characterization, monologue work, scene work, voice and expression in this intensive short-term course at Jim Corbett National Park.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screen-acting-in-nainital-08th-to-14th-march-2026",
    price: "Rs. 8,900",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (10th pass in exceptional cases)",
    venue: "Lemonwood Riverside Premier Resort, Jim Corbett National Park, Nainital",
    fullDetails: {
      description:
        "Learn acting technique, characterization, monologue work, scene work, voice and expression in this intensive 7-day short-term course from FTII. Set in the scenic surroundings of Jim Corbett National Park, this programme offers a unique learning environment for aspiring actors.",
      keyHighlights: [
        "7-day intensive screen acting training",
        "Learn from experienced FTII faculty",
        "Acting technique and characterization",
        "Monologue and scene work",
        "Voice and expression training",
        "FTII certification upon completion",
      ],
      curriculum: [
        "Acting technique fundamentals",
        "Characterization methods",
        "Monologue preparation and performance",
        "Scene work and partner dynamics",
        "Voice modulation and expression",
        "On-camera presence and awareness",
      ],
      duration: "7 days",
      medium: "English/Hindi",
      courseFee: "Rs. 8,900",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Lemonwood Riverside Premier Resort, Jim Corbett National Park, Nainital, Uttarakhand",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 24,
    title: "FTII / CFOL — Masterclass of Documentary Film Making (Mandi)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mandi",
    state: "Himachal Pradesh",
    date: "25 Feb–07 Mar 2026",
    time: "10 AM–5 PM",
    description:
      "Master documentary filmmaking techniques in this intensive short-term workshop. Covers documentary practice, storytelling, camera work, and post-production essentials.",
    registrationLink: "https://ftii.ac.in/p/vtwa/masterclass-of-documentary-film-making-in-mandi-himachal-pradesh-25-february-07-march-2026",
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (exceptions considered)",
    venue: "Mandi, Himachal Pradesh",
    fullDetails: {
      description:
        "Master documentary filmmaking techniques in this intensive 11-day short-term workshop from FTII. This comprehensive programme covers documentary practice, storytelling techniques, camera work, sound recording, and post-production essentials for aspiring documentary filmmakers.",
      keyHighlights: [
        "11-day intensive documentary filmmaking training",
        "Learn from experienced FTII faculty",
        "Hands-on documentary production experience",
        "Storytelling and narrative techniques",
        "FTII certification upon completion",
      ],
      curriculum: [
        "Introduction to documentary filmmaking",
        "Documentary storytelling and research",
        "Camera techniques for documentaries",
        "Sound recording and design",
        "Interview techniques",
        "Editing and post-production",
        "Documentary ethics and practices",
      ],
      duration: "11 days",
      medium: "English/Hindi",
      courseFee: "Contact FTII for fee details",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Mandi, Himachal Pradesh",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 23,
    title: "FTII / CFOL — Basic Course in Screen Acting (Lucknow)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Lucknow",
    state: "Uttar Pradesh",
    date: "19–25 Feb 2026",
    time: "10 AM–5 PM",
    description:
      "Learn acting fundamentals and on-camera performance techniques in this intensive short-term workshop. Covers screen acting essentials for film and television.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screen-acting-in-lucknow-19-25-february-2026",
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (exceptions considered)",
    venue: "Lucknow",
    fullDetails: {
      description:
        "Learn acting fundamentals and on-camera performance techniques in this intensive 7-day short-term workshop from FTII. This comprehensive programme covers screen acting essentials for film and television, helping participants develop their on-camera presence and performance skills.",
      keyHighlights: [
        "7-day intensive screen acting training",
        "Learn from experienced FTII faculty",
        "Acting fundamentals and techniques",
        "On-camera performance skills",
        "FTII certification upon completion",
      ],
      curriculum: [
        "Introduction to screen acting",
        "Acting fundamentals for camera",
        "On-camera presence and movement",
        "Working with close-ups and different shots",
        "Scene work and performance practice",
        "Continuity and technical awareness",
      ],
      duration: "7 days",
      medium: "English/Hindi",
      courseFee: "Contact FTII for fee details",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Lucknow, Uttar Pradesh",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 22,
    title: "FTII / CFOL — Basic Course in Screen Acting (Mumbai)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mumbai",
    state: "Maharashtra",
    date: "09–18 Feb 2026",
    time: "10 AM–5 PM",
    description:
      "Learn acting fundamentals and on-camera performance techniques in this intensive short-term course. Covers screen acting essentials for film and television.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screen-acting-in-mumbai-09-18-february-2026",
    price: "Contact FTII",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+, 12th pass (exceptions considered)",
    venue: "Mumbai",
    fullDetails: {
      description:
        "Learn acting fundamentals and on-camera performance techniques in this intensive 10-day short-term course from FTII. This comprehensive programme covers screen acting essentials for film and television, helping participants develop their on-camera presence and performance skills.",
      keyHighlights: [
        "10-day intensive screen acting training",
        "Learn from experienced FTII faculty",
        "Acting fundamentals and techniques",
        "On-camera performance skills",
        "FTII certification upon completion",
      ],
      curriculum: [
        "Introduction to screen acting",
        "Acting fundamentals for camera",
        "On-camera presence and movement",
        "Working with close-ups and different shots",
        "Scene work and performance practice",
        "Continuity and technical awareness",
      ],
      duration: "10 days",
      medium: "English/Hindi",
      courseFee: "Contact FTII for fee details",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Mumbai, Maharashtra",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 1,
    title: "FTII / CFOL — Masterclass of Acting (Mumbai)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mumbai",
    state: "Maharashtra",
    date: "15–24 Jan 2026",
    time: "10 AM–5 PM",
    description: "Master the craft of acting with FTII's intensive masterclass in Mumbai.",
    registrationLink: "https://ftii.ac.in/p/vtwa/masterclass-of-acting-in-mumbai-15-24th-january-2026",
    price: "₹25,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+ (as on 1 Jan 2026), HSC/12th",
    venue: "Mumbai",
    fullDetails: {
      description:
        "Master the craft of acting with FTII's intensive masterclass featuring comprehensive training in performance techniques, character development, and scene work.",
      keyHighlights: [
        "10-day intensive training program",
        "Learn from experienced FTII faculty",
        "Comprehensive acting techniques",
        "Character development workshops",
        "Scene work and performance practice",
      ],
      curriculum: [
        "Fundamentals of acting theory",
        "Character analysis and development",
        "Voice and movement training",
        "Scene study and rehearsal",
        "Performance techniques",
      ],
      duration: "10 days",
      medium: "English/Hindi",
      courseFee: "₹25,000",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Mumbai, Maharashtra",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 2,
    title: "FTII / CFOL — Michael Chekhov Acting Workshop (Goa)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Saligao, Goa",
    state: "Goa",
    date: "15–21 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "Explore the Michael Chekhov acting technique in the beautiful setting of Goa. Learn psychological gesture, imagination, and character transformation methods.",
    registrationLink: "https://ftii.ac.in/p/vtwa/michael-chekhov-acting-workshop-in-goa-15th-to-21st-jan-2026",
    price: "₹12,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Open to all",
    venue: "Villa Azavado, Saligao, Goa",
    fullDetails: {
      description:
        "Explore the renowned Michael Chekhov acting technique in the beautiful setting of Goa. This workshop covers psychological gesture, imagination, and character transformation methods developed by the famous actor and teacher.",
      keyHighlights: [
        "Learn Michael Chekhov's unique acting technique",
        "Psychological gesture training",
        "Imagination and creative work",
        "Character transformation methods",
        "7-day intensive in Goa",
      ],
      curriculum: [
        "Introduction to Michael Chekhov technique",
        "Psychological gesture work",
        "Imagination exercises",
        "Atmosphere and qualities",
        "Character transformation",
      ],
      duration: "7 days",
      medium: "English/Hindi",
      courseFee: "₹12,000",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Villa Azavado, Saligao, Goa",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 3,
    title: "FTII / CFOL — Basic Course in Screen Acting (New Delhi)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "New Delhi",
    state: "Delhi",
    date: "21–27 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "Learn fundamentals of screen acting for film and television. Comprehensive training in camera techniques, close-ups, and on-screen performance.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screen-acting-in-new-delhi-21-27-january-2026",
    price: "₹9,900",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+",
    venue: "NIV Art Centre and Film Studios, Neb Sarai (near IGNOU), New Delhi",
    fullDetails: {
      description:
        "Learn the fundamentals of screen acting for film and television with FTII's comprehensive course in New Delhi. Master camera techniques, close-ups, and on-screen performance skills.",
      keyHighlights: [
        "Camera acting fundamentals",
        "Film and television techniques",
        "Close-up performance work",
        "On-camera presence training",
        "7-day intensive course",
      ],
      curriculum: [
        "Introduction to screen acting",
        "Camera techniques and angles",
        "Working with close-ups",
        "Continuity and consistency",
        "On-screen performance skills",
      ],
      duration: "7 days",
      medium: "English/Hindi",
      courseFee: "₹9,900",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "NIV Art Centre and Film Studios, Neb Sarai, New Delhi",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 4,
    title: "FTII / CFOL — Digital Cinematography (Pune)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "05–17 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "Master digital cinematography techniques, camera operations, lighting, and visual storytelling. Hands-on training with professional equipment.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-digital-cinematography-in-pune-05-17-january-2026",
    price: "Contact for details",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+",
    venue: "FTII Pune",
    fullDetails: {
      description:
        "Master digital cinematography techniques at FTII Pune with comprehensive training in camera operations, lighting, composition, and visual storytelling using professional equipment.",
      keyHighlights: [
        "Professional digital camera training",
        "Lighting techniques and setups",
        "Visual composition and framing",
        "Hands-on practice with equipment",
        "13-day intensive course",
      ],
      curriculum: [
        "Digital camera operations",
        "Lighting principles and practice",
        "Composition and framing",
        "Camera movement techniques",
        "Visual storytelling",
      ],
      duration: "13 days",
      medium: "English/Hindi",
      courseFee: "Contact for details",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "FTII Campus, Pune, Maharashtra",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 5,
    title: "All the World's a Stage - Intro to Acting (The Self Centre)",
    trainer: "The Self Centre",
    institution: "The Self Centre",
    location: "Bengaluru",
    state: "Karnataka",
    date: "Sun, 18 Jan 2026",
    time: "10:00 AM",
    description:
      "Introduction to acting workshop covering basic acting techniques, improvisation, and character development. Perfect for beginners exploring theatre.",
    registrationLink:
      "https://www.district.in/events/all-the-worlds-a-stage-intro-to-acting-workshop-by-the-self-centre-jan18-2026-buy-tickets",
    price: "₹1,499",
    contact: "Via district.in",
    email: "Via district.in",
    eligibility: "Open to all",
    venue: "Underline Center, Domlur, Bengaluru",
    fullDetails: {
      description:
        "A friendly introduction to acting perfect for beginners exploring theatre. Learn basic acting techniques, improvisation skills, and character development in a supportive environment.",
      keyHighlights: [
        "Beginner-friendly workshop",
        "Basic acting techniques",
        "Improvisation exercises",
        "Character development basics",
        "Single-day intensive",
      ],
      curriculum: [
        "Introduction to acting fundamentals",
        "Warm-up and theatre games",
        "Improvisation exercises",
        "Basic character work",
        "Group performance exercises",
      ],
      duration: "4 hours",
      medium: "English",
      courseFee: "₹1,499",
      certification: "Participation certificate",
      contactInfo: ["Book via district.in", "Venue: Underline Center, Domlur, Bengaluru"],
      venue: "Underline Center, Domlur, Bengaluru",
      organizer: "The Self Centre",
    },
  },
  {
    id: 6,
    title: "Moving Parts (Arambol, Goa) — Body & Performance Course: Part Two",
    trainer: "Moving Parts",
    institution: "Moving Parts",
    location: "Arambol, Goa",
    state: "Goa",
    date: "5–30 Jan 2026",
    time: "Full day intensive",
    description:
      "Intensive physical theatre training focusing on neutral mask journey, hero's journey, tragic chorus, ensemble work, monologues and vocal technique.",
    registrationLink: "https://www.movingparts.art/training",
    price: "Contact for details",
    contact: "Via website",
    email: "Via website",
    eligibility: "Open to serious practitioners",
    venue: "Arambol, Goa",
    fullDetails: {
      description:
        "Intensive physical theatre training in the beautiful setting of Arambol, Goa. This programme focuses on neutral mask work, hero's journey, tragic chorus, ensemble work, monologues and advanced vocal technique.",
      keyHighlights: [
        "26-day intensive physical theatre training",
        "Neutral mask journey exploration",
        "Hero's journey and tragic chorus",
        "Advanced ensemble work",
        "Monologue and vocal technique development",
      ],
      curriculum: [
        "Neutral mask work and journey",
        "Hero's journey exploration",
        "Tragic chorus training",
        "Ensemble movement and creation",
        "Monologue development",
        "Vocal technique for performance",
      ],
      duration: "26 days (Part of 4-month intensive)",
      medium: "English",
      courseFee: "Contact for details",
      certification: "Moving Parts Certificate",
      contactInfo: ["Visit: www.movingparts.art/training", "Email via website"],
      venue: "Arambol, Goa",
      organizer: "Moving Parts",
    },
  },
  {
    id: 7,
    title: "FTII / CFOL — Workshop: Script to Screen (Only for Women) (Pune)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "20–29 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "Exclusive workshop for women covering the complete journey from script development to screen. Learn storytelling, direction, and production.",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/workshop-on-script-to-screen-only-for-women-in-pune-20-29-january-2026",
    price: "₹18,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Women only, 18+",
    venue: "Vijay Tendulkar Writer's Academy, Kothrud, Pune",
    fullDetails: {
      description:
        "Exclusive workshop for women covering the complete filmmaking journey from script development to screen. Learn storytelling, screenwriting, direction, and production in this comprehensive programme.",
      keyHighlights: [
        "Women-only intensive programme",
        "Complete script-to-screen process",
        "Storytelling and screenwriting",
        "Direction fundamentals",
        "Production essentials",
      ],
      curriculum: [
        "Story development and structure",
        "Screenwriting fundamentals",
        "Director's vision and approach",
        "Working with actors",
        "Production planning and execution",
      ],
      duration: "10 days",
      medium: "English/Hindi",
      courseFee: "₹18,000",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Vijay Tendulkar Writer's Academy, Kothrud, Pune",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 8,
    title: "FTII / CFOL — Basic Course in Screenplay Writing (Mumbai)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mumbai",
    state: "Maharashtra",
    date: "25–31 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "Learn fundamentals of screenplay writing including story structure, character development, dialogue, and formatting for cinema.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screenplay-writing-in-mumbai-25-31-january-2026",
    price: "Contact for details",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+",
    venue: "Mumbai",
    fullDetails: {
      description:
        "Learn the fundamentals of screenplay writing for cinema with FTII's comprehensive course. Master story structure, character development, dialogue writing, and proper formatting.",
      keyHighlights: [
        "Screenplay writing fundamentals",
        "Story structure and three-act format",
        "Character development techniques",
        "Dialogue writing",
        "Professional formatting standards",
      ],
      curriculum: [
        "Elements of screenplay writing",
        "Story structure and plotting",
        "Character creation and arcs",
        "Dialogue and subtext",
        "Formatting and industry standards",
      ],
      duration: "7 days",
      medium: "English/Hindi",
      courseFee: "Contact for details",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Mumbai, Maharashtra",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 9,
    title: "FTII / CFOL — Basic Course in Screenplay Writing (Goa)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Goa",
    state: "Goa",
    date: "25–31 Jan 2026",
    time: "10 AM–5 PM",
    description:
      "Learn screenplay writing in the inspiring setting of Goa. Master story structure, character arcs, and cinematic storytelling techniques.",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screenplay-writing-in-goa-25th-to-31st-jan-2026",
    price: "Contact for details",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+",
    venue: "Goa",
    fullDetails: {
      description:
        "Learn screenplay writing in the inspiring coastal setting of Goa. This course covers story structure, character arcs, cinematic storytelling techniques, and professional screenplay formatting.",
      keyHighlights: [
        "Screenplay writing in Goa",
        "Story structure mastery",
        "Character arc development",
        "Cinematic storytelling techniques",
        "Professional formatting",
      ],
      curriculum: [
        "Fundamentals of screenplay writing",
        "Story structure and beats",
        "Character development and arcs",
        "Visual storytelling",
        "Industry-standard formatting",
      ],
      duration: "7 days",
      medium: "English/Hindi",
      courseFee: "Contact for details",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Goa",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 10,
    title: "FTII / CFOL — The Art of Foley Sound FX for Films (Mumbai)",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Mumbai",
    state: "Maharashtra",
    date: "21–23 Jan 2026",
    time: "Full day sessions",
    description:
      "Learn the art of creating Foley sound effects for films. Hands-on training in sound design, recording techniques, and audio post-production.",
    registrationLink: "https://ftii.ac.in/p/vtwa/the-art-of-foley-sound-fx-for-films-in-mumbai-21-23-jan-2026",
    price: "Contact for details",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "18+",
    venue: "Mumbai",
    fullDetails: {
      description:
        "Learn the specialized art of creating Foley sound effects for films with hands-on training from FTII experts. Master sound design, recording techniques, and audio post-production workflows.",
      keyHighlights: [
        "Foley artistry fundamentals",
        "Hands-on sound creation",
        "Recording techniques",
        "Sound design principles",
        "3-day intensive workshop",
      ],
      curriculum: [
        "Introduction to Foley art",
        "Sound effect creation techniques",
        "Recording and microphone techniques",
        "Sync and timing",
        "Audio post-production basics",
      ],
      duration: "3 days",
      medium: "English/Hindi",
      courseFee: "Contact for details",
      certification: "FTII Certificate",
      contactInfo: ["Phone: 020-25580085", "Email: info.cfol@ftii.ac.in"],
      venue: "Mumbai, Maharashtra",
      organizer: "Film and Television Institute of India (FTII)",
    },
  },
  {
    id: 11,
    title: "IIET (Mysuru) — Educational Theatre National Workshop",
    trainer: "Rajneesh Bisht",
    institution: "Indian Institute of Educational Theatre (IIET)",
    location: "Mysuru",
    state: "Karnataka",
    date: "22–29 Jan 2026",
    time: "9:00 AM–6:00 PM daily",
    description:
      "Intensive 8-day residential workshop on educational theatre led by Rajneesh Bisht, guided by Prasanna. Includes accommodation and meals.",
    registrationLink:
      "https://masthmysore.com/events/educational-theatre-national-workshop-mysuru-rajneesh-bisht-prasanna/",
    price: "₹16,000 (includes breakfast, lunch, accommodation)",
    contact: "Via website",
    email: "Via website",
    eligibility: "Open to all",
    venue: "Hardwicke School Campus, J.L.B. Road, Mysuru (IIET)",
    fullDetails: {
      description:
        "Intensive 8-day residential workshop on educational theatre led by renowned practitioner Rajneesh Bisht under the guidance of theatre veteran Prasanna. This comprehensive programme explores theatre as a tool for education and social transformation.",
      keyHighlights: [
        "Led by Rajneesh Bisht, guided by Prasanna",
        "8-day residential intensive",
        "Educational theatre methodologies",
        "Includes accommodation and two meals daily",
        "Hands-on theatre creation",
      ],
      curriculum: [
        "Educational theatre principles",
        "Theatre in education methodologies",
        "Devising theatre for learning",
        "Forum theatre techniques",
        "Community engagement through theatre",
      ],
      duration: "8 days (residential)",
      medium: "English/Hindi/Kannada",
      courseFee: "₹16,000 (includes accommodation, breakfast, lunch)",
      certification: "IIET Certificate",
      contactInfo: ["Via masthmysore.com", "Venue: Hardwicke School Campus, Mysuru"],
      venue: "Hardwicke School Campus, J.L.B. Road, Mysuru",
      organizer: "Indian Institute of Educational Theatre (IIET)",
    },
  },
  {
    id: 12,
    title: "NSD Mumbai Centre — Weekend Acting Course / 3-Month Certificate",
    trainer: "NSD Faculty",
    institution: "National School of Drama (NSD)",
    location: "Mumbai",
    state: "Maharashtra",
    date: "Admissions open",
    time: "Part-time, non-residential",
    description:
      "NSD invites applications for Basic Three-Month Certificate Course in Dramatics and Weekend Acting Course. Part-time, non-residential programs.",
    registrationLink: "https://onlineadmission.nsd.gov.in/mumbai/",
    price: "Contact for details (Application fee: ₹100)",
    contact: "Via NSD website",
    email: "Via NSD website",
    eligibility: "Age 18–60, 12th pass",
    venue: "NSD Mumbai Centre",
    fullDetails: {
      description:
        "National School of Drama Mumbai Centre offers part-time theatre training programs including a 3-month certificate course in dramatics and weekend acting courses. Designed for working professionals and students.",
      keyHighlights: [
        "Part-time, non-residential programme",
        "NSD-certified training",
        "Weekend and evening options",
        "Comprehensive theatre education",
        "Suitable for working professionals",
      ],
      curriculum: [
        "Acting fundamentals",
        "Voice and speech training",
        "Movement and physicality",
        "Text analysis and scene work",
        "Production and performance",
      ],
      duration: "3 months / Weekend course",
      medium: "English/Hindi",
      courseFee: "Contact for details (Application fee: ₹100)",
      certification: "NSD Certificate",
      contactInfo: ["Apply online: onlineadmission.nsd.gov.in/mumbai", "Age: 18-60 years", "Qualification: 12th pass"],
      venue: "NSD Mumbai Centre",
      organizer: "National School of Drama (NSD)",
    },
  },
  {
    id: 13,
    title: "TISS International Seminar — Youth Voices in the Digital Age",
    trainer: "TISS Faculty",
    institution: "Tata Institute of Social Sciences (TISS)",
    location: "Mumbai",
    state: "Maharashtra",
    date: "8-10 March 2026",
    time: "Full day event",
    description:
      "International seminar exploring youth perspectives in the digital age. Call for papers with travel and accommodation support for selected papers.",
    registrationLink:
      "https://tiss.ac.in/view/5/homepage-data/homepage-events-and-announcements/international-seminar-on-youth-voices-in-the-digit/",
    price: "Registration details on website",
    contact: "Via TISS website",
    email: "Via TISS website",
    eligibility: "Open to researchers, practitioners, and students",
    venue: "TISS Mumbai Campus",
    fullDetails: {
      description:
        "International seminar exploring youth voices and perspectives in the digital age. This interdisciplinary event brings together researchers, practitioners, and youth voices to discuss digital culture, social media, activism, and youth agency.",
      keyHighlights: [
        "International seminar with call for papers",
        "Deadline: 31 January 2026",
        "Travel and accommodation support for selected papers",
        "Interdisciplinary discussions",
        "Networking with researchers and practitioners",
      ],
      curriculum: [
        "Youth culture in digital spaces",
        "Social media and activism",
        "Digital literacies and education",
        "Youth agency and participation",
        "Paper presentations and discussions",
      ],
      duration: "3 days (8-10 March 2026)",
      medium: "English",
      courseFee: "See website for registration details",
      certification: "Participation certificate",
      contactInfo: [
        "Submission deadline: 31 January 2026",
        "See website for details",
        "Support available for selected papers",
      ],
      venue: "TISS Mumbai Campus",
      organizer: "Tata Institute of Social Sciences (TISS)",
    },
  },
  {
    id: 14,
    title: "Rijksakademie Residency — Applications for Residency Year 2027",
    trainer: "Rijksakademie Faculty",
    institution: "Rijksakademie van beeldende kunsten",
    location: "Amsterdam",
    state: "Netherlands",
    date: "Residency Year 2027",
    time: "Full year programme",
    description:
      "Prestigious visual arts residency in Amsterdam. Applications open for the 2027 residency year. One-year fully funded residency program for visual artists.",
    registrationLink: "https://rijksakademie.nl/en/residency-apply/apply",
    price: "Fully funded residency",
    contact: "Via Rijksakademie website",
    email: "Via Rijksakademie website",
    eligibility: "Visual artists worldwide",
    venue: "Rijksakademie, Amsterdam",
    fullDetails: {
      description:
        "The Rijksakademie residency is one of the most prestigious visual arts programmes in the world. Selected artists receive a fully funded one-year residency in Amsterdam with state-of-the-art studios, facilities, and mentorship from international advisors.",
      keyHighlights: [
        "Fully funded one-year residency",
        "State-of-the-art studios and facilities",
        "International advisor network",
        "Monthly stipend and materials budget",
        "Exhibition opportunities",
      ],
      curriculum: [
        "Independent studio practice",
        "Advisor consultations",
        "Technical workshops",
        "Peer critique sessions",
        "Public presentations and exhibitions",
      ],
      duration: "1 year (residency 2027)",
      medium: "English/Dutch",
      courseFee: "Fully funded with stipend",
      certification: "Rijksakademie residency completion",
      contactInfo: ["Application window: 1 Jan – 1 Feb 2026", "Visit: rijksakademie.nl"],
      venue: "Rijksakademie van beeldende kunsten, Amsterdam",
      organizer: "Rijksakademie van beeldende kunsten",
    },
  },
  {
    id: 15,
    title: "Cité internationale des arts — 'In Situ' Residency Programme",
    trainer: "Cité internationale des arts",
    institution: "Cité internationale des arts",
    location: "Paris",
    state: "France",
    date: "2025-2026 Programme",
    time: "Variable duration",
    description:
      "Prestigious arts residency in the heart of Paris. 'In Situ' programme supporting international artists across all disciplines.",
    registrationLink:
      "https://www.citeinternationaledesarts.fr/en/appels-a-candidature/in-situ-residency-programme-2025-2026/",
    price: "Fellowship support available",
    contact: "Via Cité website",
    email: "Via Cité website",
    eligibility: "International artists (all disciplines)",
    venue: "Cité internationale des arts, Paris",
    fullDetails: {
      description:
        "The Cité internationale des arts in Paris offers prestigious residencies for international artists across all disciplines. The 'In Situ' programme provides studio space in the heart of Paris with full cultural immersion.",
      keyHighlights: [
        "Residency in central Paris",
        "All artistic disciplines welcome",
        "Studio and living space",
        "Cultural programming and networks",
        "Variable duration options",
      ],
      curriculum: [
        "Independent artistic practice",
        "Cultural engagement in Paris",
        "Networking events",
        "Studio visits and critiques",
        "Public presentations",
      ],
      duration: "Variable (3-12 months)",
      medium: "French/English",
      courseFee: "Fellowship support available",
      certification: "Residency completion certificate",
      contactInfo: ["Deadline: 1 January 2026", "Visit: citeinternationaledesarts.fr"],
      venue: "Cité internationale des arts, Paris",
      organizer: "Cité internationale des arts",
    },
  },
  {
    id: 16,
    title: "ITI Academy Week Open Call 2026 — THEATER DER WELT",
    trainer: "ITI Germany Team",
    institution: "International Theatre Institute (ITI) Germany",
    location: "Berlin + Chemnitz",
    state: "Germany",
    date: "21-28 June 2026",
    time: "Full week programme",
    description:
      "Intensive fellowship week during THEATER DER WELT festival. Exclusive opportunity for theatre makers to participate in workshops, performances, and networking.",
    registrationLink: "https://www.iti-germany.de/en/meeting-exchange/the-iti-academy/iti-academy-week-open-call-2026",
    price: "Fellowship covers participation",
    contact: "Via ITI Germany website",
    email: "Via ITI Germany website",
    eligibility: "Theatre makers worldwide",
    venue: "Berlin and Chemnitz, Germany",
    fullDetails: {
      description:
        "The ITI Academy Week during THEATER DER WELT 2026 offers an intensive fellowship for theatre makers from around the world. Participate in workshops, attend festival performances, and network with international theatre professionals.",
      keyHighlights: [
        "Fellowship during major international festival",
        "Workshops with leading practitioners",
        "Access to festival performances",
        "International networking",
        "One-week intensive programme",
      ],
      curriculum: [
        "Theatre workshops and masterclasses",
        "Festival performance attendance",
        "Peer discussions and exchanges",
        "Networking sessions",
        "Final presentation or reflection",
      ],
      duration: "1 week (21-28 June 2026)",
      medium: "English/German",
      courseFee: "Fellowship covers participation",
      certification: "ITI Academy Week certificate",
      contactInfo: ["Application deadline: 5 January 2026", "Visit: iti-germany.de"],
      venue: "Berlin and Chemnitz, Germany",
      organizer: "International Theatre Institute (ITI) Germany",
    },
  },
  {
    id: 17,
    title: "Planetary Transitions 2026 — Potsdam Artist Residency (GFZ)",
    trainer: "GFZ Research Center",
    institution: "GFZ German Research Centre for Geosciences",
    location: "Potsdam",
    state: "Germany",
    date: "Deadline: 8 Feb 2026",
    time: "Residency programme",
    description:
      "Unique artist residency at Germany's leading earth science research center exploring planetary transitions and climate change through art-science collaboration.",
    registrationLink: "https://www.gfz.de/en/career/job-offers/details/10920",
    price: "Fellowship support available",
    contact: "Via GFZ website",
    email: "Via GFZ website",
    eligibility: "Artists interested in art-science collaboration",
    venue: "GFZ German Research Centre for Geosciences, Potsdam",
    fullDetails: {
      description:
        "The Planetary Transitions 2026 Artist Residency at GFZ offers a unique opportunity for artists to engage with cutting-edge earth science research. This interdisciplinary programme brings together artists and scientists to explore planetary transitions, climate change, and earth systems through creative collaboration at Germany's premier geoscience research institution.",
      keyHighlights: [
        "Artist residency at leading earth science research center",
        "Art-science collaboration opportunity",
        "Focus on planetary transitions and climate change",
        "Access to GFZ research facilities and scientists",
        "Interdisciplinary creative exploration",
      ],
      curriculum: [
        "Introduction to earth systems science",
        "Collaborative projects with GFZ scientists",
        "Studio time and artistic development",
        "Research presentations and discussions",
        "Public presentation of residency outcomes",
      ],
      duration: "Residency period to be determined",
      medium: "English/German",
      courseFee: "Fellowship support provided",
      certification: "Residency completion certificate",
      contactInfo: ["Apply via: https://www.gfz.de/en/career/job-offers/details/10920"],
      venue: "GFZ German Research Centre for Geosciences, Potsdam, Germany",
      organizer: "GFZ German Research Centre for Geosciences",
    },
  },
  {
    id: 18,
    title: "Culture Moves Europe — Individual Mobility Grant",
    trainer: "Culture Moves Europe",
    institution: "Culture Moves Europe / Goethe-Institut",
    location: "Europe-wide",
    state: "Europe",
    date: "Deadlines: 28 Feb, 31 Mar, 30 Apr 2026",
    time: "Rolling application rounds",
    description:
      "Mobility grant supporting artists and cultural professionals across Europe. Funding includes travel allowance, daily allowance, and residency support. Best for theatre artists seeking mobility and funded residencies.",
    registrationLink: "https://on-the-move.org/news/countries",
    price: "Travel + daily allowance + residency support",
    contact: "Via Culture Moves Europe website",
    email: "Via Culture Moves Europe website",
    eligibility: "International artists with eligible host partner (EU/Creative Europe)",
    venue: "Europe-wide programme",
    travelSupport: true,
    fullDetails: {
      description:
        "Culture Moves Europe is a groundbreaking mobility grant programme supporting artists and cultural professionals across Europe. This initiative provides comprehensive funding including travel allowance, daily allowance, and residency support for cross-border collaborations, artistic residencies, networking opportunities, and professional development projects. Open to international artists with an eligible host partner in EU/Creative Europe countries. Best for theatre artists seeking mobility and funded residencies.",
      keyHighlights: [
        "Rolling application deadlines: 28 Feb, 31 Mar, 30 Apr 2026",
        "Comprehensive funding: travel + daily allowance + residency support",
        "Open to international artists with eligible host partner",
        "Support for cross-border collaborations and residencies",
        "Best for theatre artists seeking mobility and funded residencies",
        "Professional development opportunities across Europe",
      ],
      curriculum: [
        "Individual mobility grants for artistic projects",
        "Travel allowance funding",
        "Daily allowance support",
        "Residency programme support",
        "Cross-border collaboration opportunities",
        "Professional development and networking",
      ],
      duration: "Varies by project (rolling deadlines: Feb, Mar, Apr 2026)",
      medium: "Multiple languages (English as working language)",
      courseFee: "Fully funded (travel + daily allowance + residency)",
      certification: "Programme participation recognition",
      contactInfo: [
        "Website: https://on-the-move.org/news/countries",
        "Deadlines: 28 Feb, 31 Mar, 30 Apr 2026",
        "Programme: Culture Moves Europe / Goethe-Institut",
        "Travel Support: Yes - included in grant",
      ],
      venue: "Europe-wide mobility programme",
      organizer: "Culture Moves Europe / Goethe-Institut",
    },
  },
  {
    id: 19,
    title: "Art of Research 2026 (Aalto University) — Call for Papers",
    trainer: "Aalto University",
    institution: "Aalto University, Finland",
    location: "Aalto / Finland",
    state: "Finland",
    date: "Deadline: 15 March 2026",
    time: "Conference dates TBA",
    description:
      "Call for Papers for the Art of Research 2026 conference focusing on arts and design research at Aalto University, Finland.",
    registrationLink:
      "https://events.aalto.fi/3X3IKxA7/g/82Z1zDshz8/art-of-research-2026-4a3bQtTRKz/custom/call-for-papers-4a3KQtaYeH",
    price: "Conference registration fees apply",
    contact: "Via Aalto University event platform",
    email: "Via Aalto University event platform",
    eligibility: "Researchers, artists, designers, academics",
    venue: "Aalto University, Finland",
    fullDetails: {
      description:
        "The Art of Research 2026 conference at Aalto University invites researchers, artists, and designers to submit papers exploring the intersection of artistic practice and academic research. This prestigious conference provides a platform for sharing innovative research methodologies, creative practice documentation, and interdisciplinary approaches in arts and design research. Join leading scholars and practitioners in Finland for engaging discussions on the future of arts-based research.",
      keyHighlights: [
        "Call for Papers deadline: 15 March 2026",
        "Conference on arts and design research methodologies",
        "Hosted by prestigious Aalto University, Finland",
        "Platform for interdisciplinary research presentation",
        "Peer-reviewed conference proceedings",
        "Networking with international researchers and practitioners",
      ],
      curriculum: [
        "Research paper presentations in arts and design",
        "Creative practice documentation and analysis",
        "Interdisciplinary research methodologies",
        "Panel discussions on arts-based research",
        "Workshops on research methods in creative fields",
        "Networking sessions with international scholars",
      ],
      duration: "Conference schedule to be announced (multi-day event)",
      medium: "English",
      courseFee: "Conference registration fee (see website for details)",
      certification: "Conference participation certificate and proceedings publication",
      contactInfo: [
        "Website: https://events.aalto.fi/3X3IKxA7/g/82Z1zDshz8/art-of-research-2026-4a3bQtTRKz/custom/call-for-papers-4a3KQtaYeH",
        "Abstract submission deadline: 15 March 2026",
        "Organizer: Aalto University, Finland",
      ],
      venue: "Aalto University Campus, Finland",
      organizer: "Aalto University",
    },
  },
  {
    id: 20,
    title: "The Paris Conference on Arts & Humanities (IAFOR) — Call for Papers",
    trainer: "IAFOR",
    institution: "The International Academic Forum (IAFOR)",
    location: "Paris",
    state: "France",
    date: "Conference: 15–19 June 2026",
    time: "Early-bird deadline: 15 Jan 2026, Final deadline: 20 Mar 2026",
    description:
      "International conference on Arts & Humanities in Paris organized by IAFOR. Submit abstracts by early-bird deadline (15 Jan 2026) or final deadline (20 Mar 2026).",
    registrationLink: "https://pcah.iafor.org/call-for-papers/",
    price: "Conference registration fees apply",
    contact: "IAFOR Conference Services",
    email: "Via IAFOR website",
    eligibility: "Researchers, academics, practitioners in arts and humanities",
    venue: "Paris, France",
    fullDetails: {
      description:
        "The Paris Conference on Arts & Humanities (PCAH) is organized by The International Academic Forum (IAFOR) and brings together researchers, academics, and practitioners from around the world to share their work in arts and humanities. Taking place in the cultural heart of Paris from June 15-19, 2026, this conference offers multiple presentation formats, networking opportunities, and the chance to publish in IAFOR proceedings. Early-bird abstract submission deadline: 15 January 2026. Final abstract deadline: 20 March 2026.",
      keyHighlights: [
        "International conference in Paris, France (15-19 June 2026)",
        "Early-bird abstract deadline: 15 January 2026",
        "Final abstract deadline: 20 March 2026",
        "Organized by prestigious IAFOR (International Academic Forum)",
        "Publication in IAFOR conference proceedings",
        "Multiple presentation formats available",
        "Networking with global arts and humanities community",
      ],
      curriculum: [
        "Paper presentations across arts and humanities disciplines",
        "Panel discussions and roundtables",
        "Poster sessions and exhibitions",
        "Keynote addresses by leading scholars",
        "Workshop sessions on research methodologies",
        "Cultural excursions in Paris",
        "Conference reception and networking events",
      ],
      duration: "5-day conference (15-19 June 2026)",
      medium: "English",
      courseFee: "Conference registration fee (early-bird and standard rates available)",
      certification: "Conference attendance certificate and proceedings publication",
      contactInfo: [
        "Website: https://pcah.iafor.org/call-for-papers/",
        "Early-bird deadline: 15 January 2026",
        "Final abstract deadline: 20 March 2026",
        "Organizer: The International Academic Forum (IAFOR)",
      ],
      venue: "Paris, France (venue details on website)",
      organizer: "The International Academic Forum (IAFOR)",
    },
  },
  {
    id: 21,
    title: "Villa Albertine — Theatre & New Forms Grant",
    trainer: "Villa Albertine",
    institution: "Villa Albertine (France–USA Cultural Program)",
    location: "France–USA",
    state: "International",
    date: "Deadline: 13 February 2026",
    time: "Application deadline approaching",
    description:
      "International grant for collaborative theatre projects between France and USA. Comprehensive funding covering travel, living expenses, and project costs.",
    registrationLink: "https://villa-albertine.org/va/professionals/call-for-applications-theatre-new-forms-2026/?utm_source=chatgpt.com",
    price: "Travel + living + project costs funded",
    contact: "Via Villa Albertine website",
    email: "Via Villa Albertine website",
    eligibility: "International theatre artists with FR–US partnership",
    venue: "France–USA Collaboration",
    travelSupport: true,
    fullDetails: {
      description:
        "Villa Albertine's Theatre & New Forms Grant supports collaborative theatre projects between France and the United States. This prestigious grant provides comprehensive funding including travel expenses, living costs, and project funding for international theatre artists developing innovative work that bridges French and American theatrical traditions. The program encourages experimentation with new theatrical forms and cross-cultural collaboration, making it ideal for theatre makers seeking to develop ambitious international projects.",
      keyHighlights: [
        "Application deadline: 13 February 2026",
        "Comprehensive funding: travel + living + project costs",
        "France–USA collaborative partnership requirement",
        "Focus on theatre and new theatrical forms",
        "International grant opportunity",
        "Travel support included",
        "Best for collaborative and innovative theatre projects",
      ],
      curriculum: [
        "Development of collaborative France-USA theatre projects",
        "Exploration of new theatrical forms and techniques",
        "Cross-cultural artistic exchange and collaboration",
        "Project development and production support",
        "Professional networking in French and American theatre scenes",
        "Residency and creation time as needed",
      ],
      duration: "Project-based (varies by proposal)",
      medium: "French/English",
      courseFee: "Fully funded grant (travel + living + project costs)",
      certification: "Villa Albertine grant recipient recognition",
      contactInfo: [
        "Website: https://villa-albertine.org/va/professionals/call-for-applications-theatre-new-forms-2026/",
        "Application deadline: 13 February 2026",
        "Program: Villa Albertine Theatre & New Forms",
        "Travel Support: Yes - included in grant",
      ],
      venue: "France–USA (locations based on project)",
      organizer: "Villa Albertine",
    },
  },
]

export default function WorkshopDetailContent({ id }: { id: number }) {
  const workshop = workshops.find((w) => w.id === id)

  if (!workshop) {
    return (
      <div className="container py-12">
        <Card>
          <CardContent className="py-12 text-center">
            <h2 className="text-2xl font-bold mb-4">Workshop Not Found</h2>
            <p className="text-muted-foreground mb-6">The workshop you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/workshops">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Workshops
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <Button variant="ghost" asChild className="mb-6">
        <Link href="/workshops">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Workshops
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{workshop.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>
                  {workshop.location}, {workshop.state}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{workshop.date}</span>
              </div>
              {workshop.time !== "TBD" && (
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{workshop.time}</span>
                </div>
              )}
            </div>
          </div>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">About This Workshop</h2>
              <p className="text-muted-foreground leading-relaxed">{workshop.fullDetails.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Key Highlights</h2>
              <ul className="space-y-3">
                {workshop.fullDetails.keyHighlights.map((highlight, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Curriculum</h2>
              <ul className="space-y-3">
                {workshop.fullDetails.curriculum.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Workshop Details</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Duration</div>
                  <div className="font-medium">{workshop.fullDetails.duration}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Medium</div>
                  <div className="font-medium">{workshop.fullDetails.medium}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Course Fee</div>
                  <div className="font-medium">{workshop.fullDetails.courseFee}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Certification</div>
                  <div className="font-medium">{workshop.fullDetails.certification}</div>
                </div>
              </div>

              {workshop.registrationLink && (
                <Button asChild className="w-full mt-6">
                  <Link href={workshop.registrationLink} target="_blank" rel="noopener noreferrer">
                    Register Now
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Contact Information</h3>
              <div className="space-y-3 text-sm">
                {workshop.fullDetails.contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start gap-2">
                    {info.toLowerCase().includes("email") || info.includes("@") ? (
                      <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                    ) : (
                      <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                    )}
                    <span className="text-muted-foreground">{info}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <h3 className="font-semibold mb-4">Venue</h3>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">{workshop.fullDetails.venue}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
