"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Phone, Mail, Clock, GraduationCap, CheckCircle } from "lucide-react"
import WorkshopBanner from "@/components/workshop-banner"

// This would typically come from a database, but for now we'll use the same data
const workshops = [
  {
    id: 4,
    title: "NSD's Certificate Course in Drama-in-Education (Delhi)",
    trainer: "National School of Drama",
    institution: "National School of Drama",
    location: "New Delhi",
    state: "Delhi",
    date: "2 June – 31 August 2025",
    time: "Morning: 10 AM – 1 PM, Afternoon: 2 PM – 5 PM",
    description:
      "Located at NSD Premises, Mandi House. Highlights: Practical training in storytelling, improvisation, forum theatre, Actor-Teacher development, Final performance at NSD. Official NSD Program.",
    image: "/placeholder.svg?height=300&width=500&text=NSD+Drama+in+Education",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    price: "₹35,000",
    contact: "011-23389054, 23031137",
    email: "nsdtiegmail.com",
    tags: "#NSD #VerifiedWorkshop #TheatreEducation #DramaInEducation",
    fullDetails: {
      venue: "NSD Premises, Mandi House, New Delhi",
      eligibilityCriteria: [
        "Graduate degree in any stream",
        "Minimum age 21 years (as of May 1, 2025)",
        "At least 3 years of experience in theater or child-focused work",
        "Proficient in Hindi/English",
        "Physically and mentally fit",
      ],
      applicationDeadline: "25 May 2025, 6 PM",
      selectionProcess: "Shortlisting based on application + Interview",
      curriculum: [
        "Practical training in storytelling",
        "Improvisation techniques",
        "Forum theatre methodologies",
        "Actor-Teacher development",
        "Final performance at NSD",
      ],
      certification: "Official certificate from National School of Drama upon successful completion",
    },
  },
  {
    id: 6,
    title: "Diploma in Applied Theatre 2025 - Batch 4",
    trainer: "Applied Theatre India",
    institution: "Applied Theatre India",
    location: "Online",
    state: "All India",
    date: "Starting August 15, 2025",
    time: "Flexible Program",
    description:
      "Transform lives through theatre! Join our groundbreaking program that bridges artistry with social impact. Curious about turning passion into purpose? Join our FREE WEBINAR on Sunday 11 May at 11 am to learn about our transformative curriculum.",
    image: "/placeholder.svg?height=300&width=500&text=Applied+Theatre",
    registrationLink: "https://education.appliedtheatreindia.com/l/4fc92006ec",
    featured: true,
    price: "Contact for details",
    contact: "Via website",
    fullDetails: {
      format: "Online program with optional in-person intensives",
      duration: "1 year (part-time)",
      upcomingWebinar: "Sunday 11 May at 11 am",
      curriculum: [
        "Foundations of Applied Theatre",
        "Theatre for Education",
        "Theatre for Social Change",
        "Theatre in Healthcare Settings",
        "Theatre for Community Development",
        "Research Methods in Applied Theatre",
      ],
      faculty: "Leading practitioners from India and international experts",
      certification: "Diploma certificate upon successful completion",
      careerOpportunities: [
        "Educational institutions",
        "NGOs and social organizations",
        "Healthcare settings",
        "Community development projects",
        "Independent applied theatre practitioner",
      ],
    },
  },
  {
    id: 7,
    title: "FTII Workshop in Delhi – Tribute to Raj Kapoor",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "New Delhi",
    state: "Delhi",
    date: "12–13 July 2025",
    time: "10 AM – 5 PM (with 1–2 PM lunch break)",
    description:
      "This 2-day workshop explores the rich legacy of Raj Kapoor through the lens of his iconic song sequences. From Barsaat to Jagte Rho and Awara, relive the Golden Era of Hindi film music and learn about cinematic storytelling through songs.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Raj+Kapoor+Workshop",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-in-appreciating-songs-in-raj-kapoor-films-in-delhi-12-13-july-2025",
    featured: true,
    price: "₹1,500",
    contact: "020 25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass",
    fullDetails: {
      venue: "Triveni Kala Sangam, Mandi House, Delhi",
      topic: "Basic Course in Appreciating Songs in Raj Kapoor Films (A tribute to the Showman on his birth centenary)",
      organizer: "FTII Pune, under Centre For Open Learning (CFOL)",
      eligibilityCriteria: [
        "Age: 18+ (born on or before 30th June 2007)",
        "Qualification: 12th pass (10th in exceptional cases)",
        "Nationality: Indian",
      ],
      medium: "Hindi & English",
      capacity: "70 participants (Min. 56 required to conduct the course)",
      courseFee: "₹1,500 (Non-refundable for selected participants)",
      certification: "Given on 90% attendance",
      applicationProcess: [
        "Last Date to Apply: 29 May 2025, 6 PM IST",
        "Selection: First-come, first-served",
        "Visit SBI Collect",
        "Search: FTII Fees Account",
        "Select Payment Category: 01 Appreciating Songs in Raj Kapoor Films",
        "Fill in details and pay ₹1,500",
        "Save your payment receipt and reference number",
      ],
      contactInfo: [
        "FTII Queries: Mr. Milind Joshi – 020 25580085 / info.cfol@ftii.ac.in",
        "Accommodation Support (Outstation): Ms. Mudra Sharma – 99588 31338",
      ],
      aboutInstructor:
        "Dr. Milind Damle – FTII alumnus and Associate Professor, with 20+ years of experience in radio, cinema & television. A decorated filmmaker and researcher, his doctoral work focused on song picturization techniques in Indian cinema.",
    },
  },
  {
    id: 8,
    title: "FTII's Basic Course on Writing for Short Film Fiction – Delhi",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "New Delhi",
    state: "Delhi",
    date: "07–11 July 2025",
    time: "10 AM – 5 PM (Lunch: 1–2 PM)",
    description:
      "A hands-on, foundational course for aspiring screenwriters who want to write short fiction films. Learn from industry experts about film history, storytelling, screenwriting fundamentals, and pitching your ideas effectively. Participants will watch and analyse films, and complete daily writing exercises.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Screenwriting+Workshop",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-on-writing-for-short-film-fiction-in-delhi-07-11-july-2025",
    featured: true,
    price: "₹9,000",
    contact: "020 – 2558 0085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass",
    fullDetails: {
      venue: "Triveni Kala Sangam, Mandi House, Delhi",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      medium: "English & Hindi",
      eligibilityCriteria: [
        "Age: 18+ (born on/before 30 June 2007)",
        "Qualification: 12th pass (exceptionally 10th pass may be considered)",
        "Nationality: Indian",
      ],
      capacity: "Max 24 participants (Min. 20 required to run the course)",
      courseFee: "₹9,000 (Excludes food & stay)",
      certification: "Issued on 90% minimum attendance",
      curriculum: [
        "Film history & evolution",
        "Role of the writer in film production",
        "Storytelling from life, culture, and society",
        "Fundamentals of screenwriting",
        "Writing for films, OTT & short formats",
        "Screenplay formatting as per global standards",
        "Pitching your ideas effectively",
      ],
      applicationProcess: [
        "Last Date to Apply: 29 May 2025, 6 PM IST",
        "Selection: First-Come, First-Served Basis",
        "Visit: https://www.onlinesbi.sbi/sbicollect/icollecthome.htm",
        "Search for: FTII Fees Account",
        "Select Payment Category: O2 Basic Course on Writing for Short Film Fiction",
        "Fill the application form and pay ₹9,000",
        "Save your SBI Collect Reference Number for future use",
      ],
      contactInfo: [
        "Email: info.cfol@ftii.ac.in / ftiioutreach@gmail.com",
        "Phone: 020 – 2558 0085",
        "For accommodation queries: Ms. Mudra Sharma – 99588 31338",
      ],
      aboutInstructor:
        "Dr. Milind Damle – Associate Professor, FTII. An FTII alumnus (2004 batch), film editor, short film director, and award-winning filmmaker. His Ph.D. research focuses on picturization of songs in Indian cinema.",
      additionalInfo:
        "This is your chance to build a strong foundation in screenwriting and connect with one of India's premier film institutions. If you want to write, you must write!",
    },
  },
  {
    id: 9,
    title: "FTII's Basic Course in Appreciating Songs in Guru Dutt Films",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "New Delhi",
    state: "Delhi",
    date: "05–06 July 2025",
    time: "10 AM – 5 PM (Lunch: 1–2 PM)",
    description:
      "To celebrate the birth centenary of the legendary filmmaker Guru Dutt, this special two-day workshop is dedicated to exploring the magic of songs in Guru Dutt's cinema. Explore his cinematic style through timeless songs from classics like Pyaasa, Kagaz Ke Phool, and Sahib Bibi Aur Ghulam.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Guru+Dutt+Workshop",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-in-appreciating-songs-in-guru-dutt-films-in-delhi-05-06-july-2025",
    featured: true,
    price: "₹1,500",
    contact: "020 25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass",
    fullDetails: {
      venue: "Triveni Auditorium, Triveni Kala Sangam, 205, Tansen Marg, Mandi House, Delhi – 110001",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      medium: "Hindi & English",
      eligibilityCriteria: [
        "Age 18+ (as of 1st July 2025)",
        "Minimum Qualification: 12th pass (10th pass in exceptional cases)",
        "Nationality: Indian",
      ],
      capacity: "Max. 70 participants (Min. 56 required to run the course)",
      courseFee: "₹1,500",
      certification: "Certificate of Participation (Minimum 90% attendance required)",
      curriculum: [
        "Guru Dutt's cinematic style through his timeless songs",
        "Song picturization, visuals, and music in films like Pyaasa, Kagaz Ke Phool, and Sahib Bibi Aur Ghulam",
        "An engaging tribute to the Golden Era of Hindi Cinema through discussion, visuals, and music",
      ],
      applicationProcess: [
        "Last Date to Apply: 29 May 2025, 6 PM IST",
        "Selection Criteria: First-Come, First-Served",
        "Go to SBI Collect",
        "Search: FTII Fees Account",
        'Select Payment Category: "O1 B.C. in Appreciating Songs in Guru Dutt Films"',
        "Pay ₹1,500 and keep your payment receipt",
      ],
      contactInfo: [
        "Mr. Milind Joshi – info.cfol@ftii.ac.in | 020-25580085",
        "Accommodation queries: Ms. Mudra Sharma – 99588 31338",
      ],
      aboutInstructor:
        "Dr. Milind Damle – Associate Professor, FTII | Film Educator | FTII Alumnus | Over 20 years in Radio, TV & Cinema",
      additionalInfo:
        "Celebrate the timeless magic of Guru Dutt's cinema — through music, visuals, and storytelling. Join this immersive tribute!",
    },
  },
  {
    id: 14,
    title: "Sooraj Nambiar's – LOCHANAM: A 3-Day Actor/Dancer Workshop",
    trainer: "Sooraj Nambiar",
    institution: "Nrityangana Institute of Performing Arts & Tripudi",
    location: "Bangalore",
    state: "Karnataka",
    date: "July 4-6, 2025",
    time: "10 AM – 1 PM",
    description:
      "Discover the unseen potential of your eyes in performance with this unique acting pedagogy rooted in Kutiyattam. Learn to refine your Abhinaya with depth and precision while stimulating imagination and deepening expression.",
    image: "/placeholder.svg?height=300&width=500&text=Lochanam+Workshop",
    registrationLink: "https://wa.me/918075413321",
    featured: true,
    price: "Contact for details",
    contact: "8075413321",
    email: "tripudiws@gmail.com",
    instagram: "@nrityangana_institute_pa",
    eligibility: "Actors and dancers",
  },
  {
    id: 15,
    title: "Paradox Studios Support — Performing Arts in Education Mentoring",
    trainer: "Paradox Studios",
    institution: "Paradox Studios",
    location: "Online",
    state: "All India",
    date: "Contact for details",
    time: "Contact for details",
    description:
      "Are you a Performing Arts Facilitator facing challenges in your institution? Paradox Studios is offering two free sessions to Performing Arts (Music/Theatre/Dance) teachers/facilitators who are seeking mentorship, support, and solutions.",
    image: "/placeholder.svg?height=300&width=500&text=Paradox+Studios+Mentoring",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSckunGJ7QNQ3kdbTwUVzLEClkfNbKI_do0kOwxMcYDO0LlAmw/viewform",
    featured: false,
    price: "First two sessions free",
    contact: "Via registration form",
    email: "N/A",
    eligibility: "Performing Arts (Music/Theatre/Dance) teachers/facilitators",
    fullDetails: {
      description:
        "Are you a Performing Arts Facilitator facing challenges in your institution? Paradox Studios is offering two free sessions to Performing Arts (Music/Theatre/Dance) teachers/facilitators who are seeking mentorship, support, and solutions. These sessions are led by our Creative Director with 14+ years of Performing Arts experience, specifically in theatre and music, and a strong background in education.",
    },
  },
  {
    id: 16,
    title: "Paradox Studios Support For Actors — English Play Dialogues Coaching",
    trainer: "Paradox Studios",
    institution: "Paradox Studios",
    location: "Online",
    state: "All India",
    date: "Contact for details",
    time: "Contact for details",
    description:
      "Auditioning for an English Play? Let's sharpen your dialogue delivery! Paradox Studios is offering two free coaching sessions for actors who are either auditioning for, or currently cast in English plays.",
    image: "/placeholder.svg?height=300&width=500&text=English+Play+Dialogues+Coaching",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfwqU9RF-zABbUxNPpN-G4KSBJ8ZV2nDf1tsLp3LsPQuF6e_w/viewform",
    featured: false,
    price: "First two sessions free",
    contact: "Via registration form",
    email: "N/A",
    eligibility: "Actors auditioning for or cast in English plays",
    fullDetails: {
      description:
        "Paradox Studios Support For Actors — English Play Dialogues Coaching\n\nAuditioning for an English Play? Let's sharpen your dialogue delivery!\n\nParadox Studios is offering two free coaching sessions for actors who are either auditioning for, or currently cast in English plays.\n\nThese sessions are led by our Creative Director — an MA English degree-holder, former HOD of English and a seasoned public speaking coach.\n\nPlease fill this form to help us understand your needs better.",
      curriculum: [
        "Dialogue delivery techniques for English plays",
        "Voice modulation and clarity",
        "Character-specific speech patterns",
        "Stage presence and confidence building",
        "Accent and pronunciation refinement",
      ],
      aboutInstructor:
        "Our Creative Director holds an MA in English and is a former Head of Department (HOD) of English with extensive experience in academia. As a seasoned public speaking coach, they bring a unique combination of literary expertise and practical performance skills to help actors excel in English theatre.",
      targetAudience: "Actors who are auditioning for English plays or currently cast in English productions",
      sessionDetails: "Two free personalized coaching sessions tailored to your specific needs",
      benefits: [
        "Improved dialogue delivery and articulation",
        "Enhanced confidence in English play performances",
        "Personalized feedback and coaching",
        "Professional guidance from experienced mentor",
      ],
    },
  },
  {
    id: 17,
    title: "FTII's Practical Course in Multi-Camera Technical Operations for TV Production",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "14–18 July 2025",
    time: "9 AM – 6:30 PM",
    description:
      "Ever wondered how reality shows, stand-up comedy, or sports events are technically produced? Learn hands-on with professional gear including Multi-Camera Setup, Audio Consoles, Vision Mixers, Lighting Consoles, Teleprompters, Character Generators & more.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Multi+Camera+Workshop",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/introduction-to-multi-camera-technical-operations-for-tv-program-production-14-18-july-2025",
    featured: true,
    price: "₹5,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (exceptionally 10th pass)",
    fullDetails: {
      venue: "FTII Campus, Pune",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "5 days intensive hands-on training",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Education: Minimum 12th pass (exceptionally 10th pass may be considered)",
        "Nationality: Indian",
      ],
      applicationDeadline: "30 June 2025, 6 PM",
      selectionProcess: "First Come, First Served",
      courseFee: "₹5,000 only",
      certification: "FTII Participation Certificate upon successful completion",
      keyHighlights: [
        "Work like a real technical crew in a TV studio",
        "Learn camera, audio, vision mixing, lighting & switching",
        "Take home a 2–5 min TV show you helped produce",
        "Get a participation certificate from FTII",
        "Hostel accommodation available",
      ],
      professionalEquipment: [
        "Multi-Camera Setup",
        "Audio Consoles",
        "Vision Mixers",
        "Lighting Consoles",
        "Teleprompters",
        "Character Generators",
        "Professional TV Studio Equipment",
      ],
      curriculum: [
        "Multi-camera setup and operations",
        "Audio console operations and sound mixing",
        "Vision mixing and live switching",
        "Lighting console operations",
        "Teleprompter operations",
        "Character generator usage",
        "Live TV production workflow",
        "Technical crew coordination",
      ],
      practicalExperience: [
        "Hands-on training with professional TV equipment",
        "Real studio environment experience",
        "Production of a complete 2-5 minute TV show",
        "Technical crew role simulation",
        "Live production scenarios",
      ],
      accommodation: "Hostel accommodation available on campus",
      contactInfo: ["Email: info.cfol@ftii.ac.in", "Phone: 020-25580085"],
      additionalInfo:
        "This intensive course provides real-world experience in TV production technical operations. Perfect for those interested in the technical aspects of television production, reality shows, sports broadcasting, and live events.",
    },
  },
  {
    id: 18,
    title: "FTII Tribute to the Showman – Basic Course in Appreciating Songs in Raj Kapoor Films",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "New Delhi",
    state: "Delhi",
    date: "12–13 July 2025",
    time: "10 AM – 5 PM (with 1–2 PM lunch break)",
    description:
      "Celebrate Raj Kapoor's centenary with a 2-day workshop by FTII exploring the timeless music and song picturization of his films. Learn the cinematic art behind RK's legendary song sequences with insights from FTII Prof. Dr. Milind Damle – an award-winning filmmaker and film educator.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Raj+Kapoor+Centenary",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-in-appreciating-songs-in-raj-kapoor-films-in-delhi-12-13-july-2025",
    featured: true,
    price: "₹1,500",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    fullDetails: {
      venue: "Triveni Kala Sangam, Delhi",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "2 days intensive workshop",
      medium: "Hindi & English",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Education: Minimum 12th pass (10th pass in exceptional cases)",
        "Nationality: Indian",
      ],
      applicationDeadline: "27 June 2025, 6 PM",
      selectionProcess: "First Come, First Served",
      capacity: "Maximum 70 participants",
      courseFee: "₹1,500 only",
      certification: "Certificate on 90% attendance",
      keyHighlights: [
        "Learn the cinematic art behind RK's legendary song sequences",
        "Insights from FTII Prof. Dr. Milind Damle – an award-winning filmmaker and film educator",
        "Certificate on 90% attendance",
        "Explore timeless music and song picturization",
        "Celebrate Raj Kapoor's birth centenary",
      ],
      curriculum: [
        "Raj Kapoor's cinematic legacy and contribution to Indian cinema",
        "Analysis of iconic song sequences from his films",
        "Song picturization techniques and visual storytelling",
        "Music direction and composition in RK films",
        "Camera work and cinematography in song sequences",
        "Cultural impact of Raj Kapoor's musical films",
        "Evolution of song picturization in Indian cinema",
        "Interactive discussions and film screenings",
      ],
      iconicFilmsStudied: [
        "Barsaat (1949)",
        "Awara (1951)",
        "Shree 420 (1955)",
        "Jagte Raho (1956)",
        "Sangam (1964)",
        "Mera Naam Joker (1970)",
        "Bobby (1973)",
        "Satyam Shivam Sundaram (1978)",
      ],
      aboutInstructor:
        "Dr. Milind Damle – Associate Professor at FTII, award-winning filmmaker, and film educator with over 20 years of experience in radio, cinema & television. His doctoral research focused on song picturization techniques in Indian cinema, making him the perfect guide for this tribute to the Showman.",
      specialFeatures: [
        "Centenary celebration of Raj Kapoor's birth",
        "Exclusive insights into the Golden Era of Hindi Cinema",
        "Analysis of timeless songs and their visual treatment",
        "Understanding the art of song picturization",
        "Interactive sessions with film screenings",
      ],
      contactInfo: ["Email: info.cfol@ftii.ac.in", "Phone: 020–25580085"],
      additionalInfo:
        "This special workshop celebrates the birth centenary of Raj Kapoor, the Showman of Indian cinema. Participants will gain deep insights into the art of song picturization and the cinematic genius behind some of the most memorable musical sequences in Indian film history.",
    },
  },
  {
    id: 19,
    title: "FTII Pune: Basic Course in Smartphone Filmmaking",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "04–08 August 2025",
    time: "10 AM – 5 PM",
    description:
      "Want to learn filmmaking using just your phone? Join this 5-day hands-on course by FTII and start telling your own cinematic stories! Learn creative storytelling, framing, audio & lighting basics guided by FTII experts.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Smartphone+Filmmaking",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-smartphone-filmmaking-in-pune-04-08-august-2025",
    featured: true,
    price: "₹7,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in special cases)",
    fullDetails: {
      venue: "FTII Campus, Pune",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "5 days intensive hands-on course",
      medium: "Hindi & English",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Education: Minimum 12th pass (10th pass in special cases)",
        "Nationality: Indian",
      ],
      applicationDeadline: "30 June 2025, 6 PM",
      selectionProcess: "First Come, First Served",
      capacity: "Limited to 24 participants",
      courseFee: "₹7,000",
      certification: "Certificate on completion",
      keyHighlights: [
        "Shoot, direct & edit short films using your smartphone",
        "Learn creative storytelling, framing, audio & lighting basics",
        "Guided by FTII experts",
        "Hands-on practical experience",
        "Create your own cinematic stories",
      ],
      curriculum: [
        "Smartphone filmmaking fundamentals",
        "Creative storytelling techniques",
        "Camera framing and composition",
        "Audio recording and sound design basics",
        "Lighting techniques for smartphone filming",
        "Video editing on mobile devices",
        "Short film production workflow",
        "Directing and cinematography principles",
      ],
      practicalExperience: [
        "Hands-on smartphone filming sessions",
        "Complete short film production",
        "Real-time editing and post-production",
        "Creative storytelling exercises",
        "Technical skill development",
      ],
      aboutInstructor:
        "FTII Faculty – Experienced filmmakers and educators from India's premier film institute with expertise in modern filmmaking techniques and smartphone cinematography.",
      contactInfo: ["Email: info.cfol@ftii.ac.in", "Phone: 020-25580085"],
      additionalInfo:
        "This innovative course democratizes filmmaking by teaching students to create professional-quality content using just their smartphones. Perfect for aspiring filmmakers who want to start their journey with accessible technology.",
    },
  },
  {
    id: 20,
    title: "FTII Pune: Basic Course on Writing for Short-Film Fiction",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "18–22 August 2025",
    time: "10 AM – 5 PM",
    description:
      "Hone your storytelling craft in five intensive days with FTII faculty: develop ideas, shape characters, structure plots, and leave with a polished short-film script.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Screenwriting+Pune",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-on-writing-for-short-film-fiction-in-pune-18-22-august-2025",
    featured: true,
    price: "₹9,000",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in special cases)",
    fullDetails: {
      venue: "FTII Campus, Pune",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "5 days intensive screenwriting course",
      medium: "Hindi & English",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Education: Minimum 12th pass (10th pass in special cases)",
        "Nationality: Indian",
      ],
      applicationDeadline: "30 June 2025, 6 PM",
      selectionProcess: "First Come, First Served",
      capacity: "Limited to 24 participants",
      courseFee: "₹9,000",
      certification: "Certificate on completion",
      keyHighlights: [
        "Develop compelling story ideas from concept to script",
        "Learn character development and dialogue writing",
        "Master plot structure and narrative techniques",
        "Create a polished short-film script",
        "Guided by experienced FTII faculty",
      ],
      curriculum: [
        "Story development and idea generation",
        "Character creation and development",
        "Plot structure and three-act storytelling",
        "Dialogue writing techniques",
        "Screenplay formatting and industry standards",
        "Visual storytelling for short films",
        "Script analysis and critique",
        "Pitching and presentation skills",
      ],
      practicalExperience: [
        "Hands-on script writing exercises",
        "Character development workshops",
        "Story structure analysis",
        "Peer review and feedback sessions",
        "Complete short-film script creation",
      ],
      aboutInstructor:
        "FTII Faculty – Experienced screenwriters, directors, and film educators from India's premier film institute with expertise in narrative storytelling and screenplay development.",
      contactInfo: ["Email: info.cfol@ftii.ac.in", "Phone: 020-25580085"],
      additionalInfo:
        "This intensive course provides aspiring screenwriters with the fundamental skills needed to craft compelling short-film narratives. Perfect for those looking to enter the film industry or enhance their storytelling abilities.",
    },
  },
  {
    id: 21,
    title: "FTII Pune: Appreciate the Magic of Guru Dutt's Songs",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "09–10 August 2025",
    time: "10 AM – 5 PM",
    description:
      "In tribute to Guru Dutt's birth centenary, this 2-day course dives into the poetic brilliance and cinematic genius of his song picturizations.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Guru+Dutt+Pune",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/basic-course-in-appreciating-songs-in-guru-dutt-films-in-pune-09-10-august-2025",
    featured: true,
    price: "₹1,500",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in special cases)",
    fullDetails: {
      venue: "FTII Campus, Pune",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "2 days intensive appreciation course",
      medium: "Hindi & English",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Education: Minimum 12th pass (10th in special cases)",
        "Nationality: Indian",
      ],
      applicationDeadline: "30 June 2025, 6 PM",
      selectionProcess: "First Come, First Served",
      capacity: "Limited to 70 participants",
      courseFee: "₹1,500",
      certification: "Certificate on completion",
      keyHighlights: [
        "Appreciate the poetic brilliance of Guru Dutt's songs",
        "Understand the cinematic genius of his song picturizations",
        "Explore the cultural impact of his films",
        "Guided by FTII experts",
        "Hands-on practical experience",
      ],
      curriculum: [
        "Guru Dutt's cinematic style and vision",
        "Analysis of iconic song sequences from his films",
        "Song picturization techniques and visual storytelling",
        "Music direction and composition in Guru Dutt films",
        "Camera work and cinematography in song sequences",
        "Cultural impact of Guru Dutt's musical films",
        "Evolution of song picturization in Indian cinema",
        "Interactive discussions and film screenings",
      ],
      practicalExperience: [
        "Hands-on appreciation sessions",
        "Complete song sequence analysis",
        "Real-time discussions and Q&A",
        "Creative storytelling exercises",
        "Technical skill development",
      ],
      aboutInstructor:
        "FTII Faculty – Experienced filmmakers and educators from India's premier film institute with expertise in modern filmmaking techniques and smartphone cinematography.",
      contactInfo: ["Email: info.cfol@ftii.ac.in", "Phone: 020-25580085"],
      additionalInfo:
        "This course is a tribute to the legendary Guru Dutt, celebrating his birth centenary by exploring the magic of his songs and their cinematic representation.",
    },
  },
]

export default function WorkshopDetailContent({ id }: { id: number }) {
  const [workshop, setWorkshop] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call
    const foundWorkshop = workshops.find((w) => w.id === id)
    setWorkshop(foundWorkshop)
    setLoading(false)
  }, [id])

  if (loading) {
    return (
      <div className="container py-6 md:py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!workshop) {
    return (
      <div className="container py-6 md:py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Workshop Not Found</h1>
        <p className="mb-6">The workshop you're looking for doesn't exist or has been removed.</p>
        <Link href="/workshops">
          <Button className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workshops
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container py-6 md:py-12">
      <Link href="/workshops" className="inline-flex items-center text-primary hover:underline mb-4 md:mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Workshops
      </Link>

      <WorkshopBanner />

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="relative h-48 md:h-64 w-full">
          <Image
            src="/images/acting-workshop.png"
            alt={workshop.title}
            fill
            className="object-cover"
            onError={(e) => {
              // Fallback to a placeholder if image fails to load
              e.currentTarget.src = "/placeholder.svg?height=300&width=500&text=Acting+Workshop"
            }}
          />
          {workshop.featured && (
            <div className="absolute top-4 right-4 bg-secondary text-black px-3 py-1 rounded-full flex items-center">
              <CheckCircle className="h-4 w-4 mr-1" />
              Featured Workshop
            </div>
          )}
        </div>

        <div className="p-4 md:p-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="badge-primary">Workshop</span>
            <span className="badge-outline">{workshop.institution}</span>
            {(workshop.id === 18 || workshop.id === 21) && (
              <span className="badge-secondary">Centenary Celebration</span>
            )}
          </div>

          <h1 className="font-playfair text-2xl md:text-3xl font-bold mb-2 md:mb-4">{workshop.title}</h1>
          <p className="text-primary font-medium mb-4 md:mb-6">By {workshop.trainer}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <div>
              <h2 className="font-playfair text-lg md:text-xl font-bold mb-3 md:mb-4">Workshop Details</h2>
              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-gray-600 text-sm md:text-base">
                      {workshop.fullDetails?.venue || `${workshop.location}, ${workshop.state}`}
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Calendar className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Dates</p>
                    <p className="text-gray-600 text-sm md:text-base">{workshop.date}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <Clock className="h-5 w-5 mr-2 text-primary mt-0.5" />
                  <div>
                    <p className="font-medium">Time</p>
                    <p className="text-gray-600 text-sm md:text-base">{workshop.time}</p>
                  </div>
                </div>

                {workshop.price && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">₹</span>
                    </div>
                    <div>
                      <p className="font-medium">Fee</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.price}</p>
                    </div>
                  </div>
                )}

                {workshop.capacity && (
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-2 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.capacity}</p>
                    </div>
                  </div>
                )}

                {workshop.eligibility && (
                  <div className="flex items-start">
                    <GraduationCap className="h-5 w-5 mr-2 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Eligibility</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.eligibility}</p>
                    </div>
                  </div>
                )}

                {workshop.language && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="text-xs">🗣️</span>
                    </div>
                    <div>
                      <p className="font-medium">Language</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.language}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.duration && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="text-xs">⏱</span>
                    </div>
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.duration}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.applicationDeadline && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="text-xs">📅</span>
                    </div>
                    <div>
                      <p className="font-medium">Application Deadline</p>
                      <p className="text-red-600 text-sm md:text-base font-medium">
                        {workshop.fullDetails.applicationDeadline}
                      </p>
                    </div>
                  </div>
                )}

                {workshop.certification && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="text-xs">🏆</span>
                    </div>
                    <div>
                      <p className="font-medium">Certification</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.certification}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="font-playfair text-lg md:text-xl font-bold mb-3 md:mb-4">Contact Information</h2>
              <div className="space-y-3 md:space-y-4">
                {workshop.contact && (
                  <div className="flex items-start">
                    <Phone className="h-5 w-5 mr-2 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.contact}</p>
                    </div>
                  </div>
                )}

                {workshop.email && workshop.email !== "N/A" && (
                  <div className="flex items-start">
                    <Mail className="h-5 w-5 mr-2 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.email}</p>
                    </div>
                  </div>
                )}

                {workshop.instagram && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="text-xs">📷</span>
                    </div>
                    <div>
                      <p className="font-medium">Instagram</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.instagram}</p>
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 md:mt-8">
                <Button
                  asChild
                  className="w-full rounded-full bg-primary hover:bg-primary/90 text-white font-medium py-3"
                >
                  <a href={workshop.registrationLink} target="_blank" rel="noopener noreferrer">
                    Register Now
                  </a>
                </Button>
              </div>
            </div>
          </div>

          <div className="border-t pt-6 md:pt-8">
            <h2 className="font-playfair text-lg md:text-xl font-bold mb-3 md:mb-4">About This Workshop</h2>
            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-6">
              {workshop.fullDetails?.description || workshop.description}
            </p>

            {workshop.fullDetails?.keyHighlights && (
              <div className="mb-6">
                <h3 className="font-playfair text-lg font-bold mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {workshop.fullDetails.keyHighlights.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {workshop.fullDetails?.iconicFilmsStudied && (
              <div className="mb-6">
                <h3 className="font-playfair text-lg font-bold mb-3">Iconic Films to be Studied</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {workshop.fullDetails.iconicFilmsStudied.map((film: string, index: number) => (
                    <div
                      key={index}
                      className="bg-gradient-to-r from-yellow-50 to-orange-50 p-3 rounded-lg border border-yellow-200"
                    >
                      <div className="flex items-center">
                        <div className="h-4 w-4 mr-2 flex items-center justify-center text-yellow-600">
                          <span className="text-xs">🎬</span>
                        </div>
                        <span className="text-gray-700 text-sm font-medium">{film}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {workshop.fullDetails?.specialFeatures && (
              <div className="mb-6">
                <h3 className="font-playfair text-lg font-bold mb-3">Special Features</h3>
                <ul className="space-y-2">
                  {workshop.fullDetails.specialFeatures.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 mr-2 flex items-center justify-center text-yellow-600 mt-0.5">
                        <span className="text-xs">⭐</span>
                      </div>
                      <span className="text-gray-700 text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {workshop.fullDetails?.professionalEquipment && (
              <div className="mb-6">
                <h3 className="font-playfair text-lg font-bold mb-3">Professional Equipment You'll Work With</h3>
                <ul className="space-y-2">
                  {workshop.fullDetails.professionalEquipment.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                        <span className="text-xs">🎬</span>
                      </div>
                      <span className="text-gray-700 text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {workshop.fullDetails?.curriculum && (
              <div className="mb-6">
                <h3 className="font-playfair text-lg font-bold mb-3">What You'll Learn</h3>
                <ul className="space-y-2">
                  {workshop.fullDetails.curriculum.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {workshop.fullDetails?.practicalExperience && (
              <div className="mb-6">
                <h3 className="font-playfair text-lg font-bold mb-3">Practical Experience</h3>
                <ul className="space-y-2">
                  {workshop.fullDetails.practicalExperience.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <div className="h-5 w-5 mr-2 flex items-center justify-center text-orange-600 mt-0.5">
                        <span className="text-xs">⚡</span>
                      </div>
                      <span className="text-gray-700 text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {workshop.fullDetails?.eligibilityCriteria && (
              <div className="mb-6">
                <h3 className="font-playfair text-lg font-bold mb-3">Eligibility Criteria</h3>
                <ul className="space-y-2">
                  {workshop.fullDetails.eligibilityCriteria.map((item: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="h-5 w-5 mr-2 text-blue-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {workshop.fullDetails?.applicationProcess && (
              <div className="mb-6">
                <h3 className="font-playfair text-lg font-bold mb-3">Application Process</h3>
                <ul className="space-y-2">
                  {
                    // Update the applicationProcess array for workshop ID 18
                    workshop.id === 18
                      ? [
                          "Last Date to Apply: 27 June 2025, 6 PM IST",
                          "Selection Criteria: First-Come, First-Served",
                          "Go to SBI Collect",
                          "Search: FTII Fees Account",
                          'Select Payment Category: "O1 B.C. in Appreciating Songs in Guru Dutt Films"',
                          "Pay ₹1,500 and keep your payment receipt",
                        ].map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-gray-700 text-sm md:text-base">{item}</span>
                          </li>
                        ))
                      : workshop.fullDetails.applicationProcess.map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-xs mr-2 mt-0.5 flex-shrink-0">
                              {index + 1}
                            </span>
                            <span className="text-gray-700 text-sm md:text-base">{item}</span>
                          </li>
                        ))
                  }
                </ul>
              </div>
            )}

            {workshop.fullDetails?.accommodation && (
              <div className="mb-6">
                <h3 className="font-playfair text-lg font-bold mb-3">Accommodation</h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed bg-blue-50 p-4 rounded-lg">
                  {workshop.fullDetails.accommodation}
                </p>
              </div>
            )}

            {workshop.fullDetails?.aboutInstructor && (
              <div className="mb-6">
                <h3 className="font-playfair text-lg font-bold mb-3">About the Instructor</h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {workshop.fullDetails.aboutInstructor}
                </p>
              </div>
            )}

            {workshop.fullDetails?.additionalInfo && (
              <div className="mb-6">
                <h3 className="font-playfair text-lg font-bold mb-3">Additional Information</h3>
                <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                  {workshop.fullDetails.additionalInfo}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
