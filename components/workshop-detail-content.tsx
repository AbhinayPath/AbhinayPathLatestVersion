"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, Users, Phone, Mail, Clock, GraduationCap, CheckCircle } from "lucide-react"

// Workshop data
const workshops = [
  {
    id: 1,
    title: "Introduction to Stopmotion Animation with Vaibhav Kumaresh",
    trainer: "Vaibhav Kumaresh",
    institution: "Indian Institute of Educational Theatre (IIET)",
    location: "Mysuru",
    state: "Karnataka",
    date: "3-Day Hands-on Workshop",
    time: "10 AM – 5 PM daily",
    description:
      "Discover the magical world of stopmotion animation! Learn how to bring everyday objects to life using simple tools and your smartphone. Explore the fundamentals of timing, spacing, and the creative use of space and movement — all guided by acclaimed animator Vaibhav Kumaresh.",
    image: "/images/iiet-logo.png",
    registrationLink: "https://wa.me/919845605012",
    featured: true,
    price: "₹3,000 (General), ₹2,500 (Students)",
    contact: "9845605012 / 9448871815",
    email: "Contact via WhatsApp",
    venue: "IIET Hardwick School Premises, JLB Road, Mysuru",
    includes: "Simple lunch for all participants",
    fullDetails: {
      venue: "Indian Institute of Educational Theatre (IIET) Hardwick School Premises, JLB Road, Mysuru",
      duration: "3-Day Hands-on Workshop",
      timing: "10 AM – 5 PM daily",
      curriculum: [
        "Basics of stopmotion animation",
        "How to animate using objects around you",
        "Hands-on practice and live demos",
        "Create your own animated clip using just your smartphone",
      ],
      keyHighlights: [
        "Learn from acclaimed animator Vaibhav Kumaresh",
        "Hands-on practice with everyday objects",
        "Create your own animated clip",
        "Simple lunch included for all participants",
        "Use just your smartphone - no expensive equipment needed",
      ],
      aboutInstructor:
        "Vaibhav Kumaresh is an acclaimed animator known for his innovative work in stopmotion animation. With years of experience in bringing inanimate objects to life, he specializes in teaching the fundamentals of timing, spacing, and creative movement.",
      whatYoullLearn: [
        "Fundamentals of timing and spacing in animation",
        "Creative use of space and movement",
        "Smartphone animation techniques",
        "Object animation principles",
        "Live demonstration techniques",
      ],
      targetAudience: "Perfect for beginners and anyone interested in animation, filmmaking, or creative storytelling",
      materialsProvided: "All basic materials provided, participants need to bring their smartphones",
      certification: "Certificate of participation upon completion",
    },
  },
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
    image: "/images/acting-workshop.png",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    price: "₹35,000",
    contact: "011-23389054, 23031137",
    email: "nsdtiegmail.com",
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
    image: "/images/acting-workshop.png",
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
    image: "/images/acting-workshop.png",
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
    image: "/images/acting-workshop.png",
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
    image: "/images/acting-workshop.png",
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
        "Select Payment Category: O1 B.C. in Appreciating Songs in Guru Dutt Films",
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
    image: "/images/acting-workshop.png",
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
    image: "/images/paradox-studios-logo.png",
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
    image: "/images/paradox-studios-logo.png",
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
    image: "/images/acting-workshop.png",
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
    image: "/images/acting-workshop.png",
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
    image: "/images/acting-workshop.png",
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
    image: "/images/acting-workshop.png",
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
    image: "/images/acting-workshop.png",
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
        "Education: Minimum 12th pass (10th pass in special cases)",
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

interface WorkshopDetailContentProps {
  id: number
}

export default function WorkshopDetailContent({ id }: WorkshopDetailContentProps) {
  const [workshop, setWorkshop] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
        <p className="mb-6">The workshop you are looking for does not exist or has been removed.</p>
        <Link href="/workshops">
          <Button className="rounded-full">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Workshops
          </Button>
        </Link>
      </div>
    )
  }

  const getDetailImageSource = () => {
    if (workshop.institution === "Paradox Studios") {
      return "/images/paradox-studios-logo.png"
    }
    if (workshop.institution === "Indian Institute of Educational Theatre (IIET)") {
      return "/images/iiet-logo.png"
    }
    return workshop.image || "/images/acting-workshop.png"
  }

  const detailImageSrc = getDetailImageSource()
  const isParadoxStudios = workshop.institution === "Paradox Studios"
  const isIIET = workshop.institution === "Indian Institute of Educational Theatre (IIET)"

  return (
    <div className="container py-6 md:py-12">
      <Link href="/workshops" className="inline-flex items-center text-primary hover:underline mb-4 md:mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Workshops
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="relative h-48 md:h-64 w-full">
          <div className={`absolute inset-0 ${isParadoxStudios ? "bg-white" : "bg-gray-900"}`}>
            <Image
              src={detailImageSrc || "/placeholder.svg"}
              alt={workshop.title}
              fill
              className={`${isParadoxStudios ? "object-contain p-6" : isIIET ? "object-contain p-8" : "object-cover"}`}
              sizes="100vw"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=400&width=800&text=Workshop+Image"
              }}
            />
          </div>
          <div
            className={`absolute inset-0 ${isIIET ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent" : isParadoxStudios ? "bg-gradient-to-t from-black/60 via-transparent to-transparent" : "bg-gradient-to-t from-black/80 via-black/30 to-transparent"}`}
          ></div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
            <CheckCircle className="h-4 w-4" />
            Verified Workshop
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <p className="text-sm md:text-base font-medium mb-2">{workshop.institution}</p>
            <h1 className="font-playfair text-2xl md:text-4xl font-bold leading-tight">{workshop.title}</h1>
          </div>
        </div>

        <div className="p-4 md:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="font-playfair text-xl md:text-2xl font-bold mb-4">About This Workshop</h2>
                <p className="text-gray-700 leading-relaxed">{workshop.description}</p>
              </div>

              {workshop.fullDetails && (
                <div className="space-y-6">
                  {workshop.id === 1 && workshop.fullDetails.whatYoullLearn && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">What You'll Learn</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.whatYoullLearn.map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.fullDetails.curriculum && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">
                        {workshop.id === 1 ? "Workshop Curriculum" : "Curriculum"}
                      </h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.curriculum.map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.fullDetails.eligibilityCriteria && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Eligibility Criteria</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.eligibilityCriteria.map((criteria: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <GraduationCap className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.fullDetails.keyHighlights && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Key Highlights</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.keyHighlights.map((highlight: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.id === 1 && workshop.fullDetails.aboutInstructor && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">About the Instructor</h3>
                      <p className="text-gray-700 leading-relaxed">{workshop.fullDetails.aboutInstructor}</p>
                    </div>
                  )}

                  {workshop.id === 1 && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {workshop.fullDetails.materialsProvided && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Materials Provided</h4>
                          <p className="text-gray-700 text-sm">{workshop.fullDetails.materialsProvided}</p>
                        </div>
                      )}
                      {workshop.fullDetails.certification && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Certification</h4>
                          <p className="text-gray-700 text-sm">{workshop.fullDetails.certification}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-6">
              <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                <h3 className="font-playfair text-lg md:text-xl font-bold mb-4">Workshop Details</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Date</p>
                      <p className="text-gray-700">{workshop.date}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Time</p>
                      <p className="text-gray-700">{workshop.time}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-700">
                        {workshop.location}, {workshop.state}
                      </p>
                      {workshop.venue && <p className="text-gray-600 text-sm mt-1">{workshop.venue}</p>}
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">Trainer</p>
                      <p className="text-gray-700">{workshop.trainer}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 p-4 md:p-6 rounded-lg">
                <div className="text-center mb-4">
                  <p className="text-2xl md:text-3xl font-bold text-primary">{workshop.price}</p>
                  <p className="text-gray-600">Workshop Fee</p>
                  {workshop.includes && <p className="text-sm text-gray-600 mt-2">Includes: {workshop.includes}</p>}
                </div>
                <Link href={workshop.registrationLink} target="_blank" className="block">
                  <Button
                    size="lg"
                    className={`w-full rounded-full font-medium ${
                      isParadoxStudios
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : isIIET
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-primary hover:bg-primary/90 text-white"
                    }`}
                  >
                    {isParadoxStudios ? "Apply for Free Sessions" : isIIET ? "Register via WhatsApp" : "Register Now"}
                  </Button>
                </Link>
              </div>

              {(workshop.contact || workshop.email) && (
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <h3 className="font-playfair text-lg font-bold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {workshop.contact && (
                      <div className="flex items-center">
                        <Phone className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{workshop.contact}</span>
                      </div>
                    )}
                    {workshop.email && workshop.email !== "N/A" && workshop.email !== "Contact via WhatsApp" && (
                      <div className="flex items-center">
                        <Mail className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{workshop.email}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
