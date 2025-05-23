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
    id: 2,
    title: "NSD 3-Month Theatre-in-Education Certificate Course (Delhi)",
    trainer: "NSD TIE Company",
    institution: "National School of Drama",
    location: "New Delhi",
    state: "Delhi",
    date: "2 June – 31 August 2025",
    time: "Batch 1: 10 AM – 1 PM, Batch 2: 2 PM – 5 PM (Wednesday to Sunday)",
    description:
      "Eligibility: Graduate (any stream), Age 21+ (as of May 1, 2025), 3 years theatre or child-focused work, Proficient in Hindi/English, Physically & mentally fit. Application deadline: 25 May 2025, 6 PM.",
    image: "/placeholder.svg?height=300&width=500&text=NSD+Certificate+Course",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    price: "₹35,000",
    contact: "011-23389054 / 23031137",
    email: "nsdtie@gmail.com",
    eligibility: "Graduate, Age 21+, 3 years experience",
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
    id: 3,
    title: "'Anatomy of a Scene' – Acting Workshop (Mumbai)",
    trainer: "Manas Gupta",
    institution: "FTII Alumnus",
    location: "Mumbai",
    state: "Maharashtra",
    date: "1 – 13 June 2025",
    time: "11 AM – 2 PM",
    description:
      "Curated by Manas Gupta (FTII Alumnus). Located at Abhyaas Manch, Aram Nagar, Mumbai. What You'll Learn: Meisner & Uta Hagen Techniques, Scene analysis & improvisation, Final recorded performance, Guest lecture by Himanshu Prajapati (FTII).",
    image: "/placeholder.svg?height=300&width=500&text=Anatomy+of+a+Scene",
    registrationLink: "tel:+918652722682",
    featured: true,
    price: "Contact for details",
    contact: "+91 8652722682",
    instagram: "@anatomy_of_a_scene",
    fullDetails: {
      venue: "Abhyaas Manch, Aram Nagar, Mumbai",
      curriculum: [
        "Meisner Technique fundamentals",
        "Uta Hagen's approach to character building",
        "Scene analysis methodology",
        "Improvisation exercises",
        "Final recorded performance",
      ],
      specialFeature: "Guest lecture by Himanshu Prajapati (FTII)",
      batchSize: "Limited to 15 participants",
      prerequisites: "Basic understanding of acting principles recommended but not required",
      takeaways: "Participants will receive a recording of their final performance and a certificate of completion",
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
    id: 5,
    title: "Educational Theatre National Workshop @ Mysore",
    trainer: "Rajneesh Bisht",
    institution: "Indian Institute of Educational Theatre",
    location: "Mysore",
    state: "Karnataka",
    date: "June 23 - July 2, 2025",
    time: "9:00 AM - 6:00 PM",
    description:
      "Step into a transformative journey where theatre meets education! Led by renowned theatre director and writer Rajneesh Bisht, and mentored by the visionary theatre stalwart Prasanna, this 10-day intensive workshop is designed for actors, educators, facilitators, and all those passionate about using theatre as a tool for learning and social change.",
    image: "/placeholder.svg?height=300&width=500&text=Educational+Theatre",
    registrationLink: "https://indiantheatrefoundation.org",
    featured: true,
    price: "₹16,000 (includes food & accommodation)",
    contact: "9845605012 / 9448871815",
    fullDetails: {
      venue: "Indian Institute of Educational Theatre, Mysore",
      mentors: ["Rajneesh Bisht - Theatre Director and Writer", "Prasanna - Theatre Stalwart"],
      duration: "10 days intensive residential program",
      includes: "Food and accommodation",
      curriculum: [
        "Theatre as a pedagogical tool",
        "Drama-based learning methodologies",
        "Creating educational theatre productions",
        "Facilitation techniques for educators",
        "Community theatre approaches",
      ],
      targetAudience: "Actors, educators, facilitators, and those interested in educational theatre",
      takeaways: "Participants will develop skills to use theatre as a tool for learning and social change",
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
      "This 2-day workshop explores the rich legacy of Raj Kapoor through the lens of his iconic song sequences. From Barsaat to Jagte Raho and Awara, relive the Golden Era of Hindi film music and learn about cinematic storytelling through songs.",
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
    id: 10,
    title: "FTII's Foundation Course in Screenplay Writing – Goa",
    trainer: "Vaidehi Sancheti",
    institution: "Film and Television Institute of India (FTII) & The Arthouse Film Academy",
    location: "Arpora",
    state: "Goa",
    date: "14–25 June 2025",
    time: "10 AM – 5 PM (Lunch: 1–2 PM)",
    description:
      "A 10-day intensive course for aspiring storytellers in the scenic creative hub of North Goa. Learn to craft your first 10-minute short film screenplay through exercises, feedback, and storytelling sessions. Perfect for beginners with stories to tell. Bring at least 2 short film ideas to start writing.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Goa+Screenplay+Workshop",
    registrationLink: "https://ftii.ac.in/p/vtwa/foundation-course-in-screenplay-in-goa-14-25-june-2025",
    featured: true,
    price: "₹17,500",
    contact: "020 25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass",
    fullDetails: {
      venue: "The Arthouse Film Academy, Arpora, North Goa",
      organizer:
        "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL) in collaboration with The Arthouse Film Academy, Goa",
      medium: "English & Hindi",
      duration: "10 Days",
      eligibilityCriteria: [
        "Age: 18 years & above (as on 01 June 2025)",
        "Education: Minimum 12th pass (10th may be considered in special cases)",
        "Nationality: Indian",
      ],
      capacity: "24 participants (Course will be conducted only if 20 or more enroll)",
      courseFee: "₹17,500 (Excludes food, accommodation, and travel)",
      certification:
        "Joint Certificate of Participation from FTII and The Arthouse Film Academy upon successful completion (with 90% minimum attendance)",
      curriculum: [
        "Idea to Screenplay: Understanding structure, character, plot",
        "Daily writing exercises and screenings",
        "Learn to analyze films from a writer's lens",
        "Perfect for beginners with stories to tell",
      ],
      applicationProcess: [
        "Last Date to Apply: 29 May 2025, by 6:00 PM",
        "Selection: First-Come, First-Served",
        "Payment Mode: SBI Collect",
        "No documents needed — just fill in the form and self-declare",
      ],
      contactInfo: [
        "FTII Contact: Mr. Milind Joshi – 020-25580085 / info.cfol@ftii.ac.in",
        "Arthouse Contact: Ms. Bhavna – 76766 43829 / thearthouseacademy@gmail.com",
        "Accommodation Support: Ms. Bhavna – 76766 43829 / thearthouseacademy@gmail.com",
      ],
      aboutInstructor:
        "Vaidehi Sancheti – An FTII alumna, poet, and passionate storyteller, Vaidehi Sancheti has conducted screenplay writing workshops at FTII, Whistling Woods, and Living Bridge.",
      additionalInfo:
        "Turn your ideas into compelling screenplays under expert mentorship in Goa's creative heartland! Bring at least 2 short film ideas to start writing. Recommended film viewing list will be provided for deeper insight.",
      prerequisites: "Bring at least 2 short film ideas to start writing",
    },
  },
  {
    id: 11,
    title: "Fundamentals of Film Direction – FTII Online Course",
    trainer: "Avinash Roy & Jasmine Kaur Roy",
    institution: "Film and Television Institute of India (FTII)",
    location: "Online",
    state: "All India",
    date: "16–20 June 2025",
    time: "10:30 AM–12:30 PM & 2:30 PM–4:30 PM (4 hours/day)",
    description:
      "A 5-day intensive online course on Film Direction designed for beginners and enthusiasts. Learn about cinematic language, visual storytelling, narrative structure, working with actors, screenplay, mise-en-scène, and montage. Taught by National Award-winning FTII alumni and co-founders of Wanderlust Films.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Film+Direction+Course",
    registrationLink: "https://ftii.ac.in/p/ftii-online-1/fundamentals-of-film-direction-16-20-june-2025",
    featured: true,
    price: "₹3,900 (Indian Nationals)",
    contact: "020 25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass",
    fullDetails: {
      venue: "Online (Google Classroom + Google Meet)",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      medium: "English & Hindi",
      duration: "5 days (Monday to Friday)",
      eligibilityCriteria: [
        "Minimum Age: 18+ as of 01 June 2025",
        "Minimum Education: 12th pass (10th pass may be considered in exceptional cases)",
        "Nationality: Indian",
      ],
      capacity: "40 seats",
      courseFee: "₹3,900 (Indian Nationals), ₹11,700 (Foreign/NRI/OCI or Indians residing abroad)",
      certification: "Digital certificate on successful completion (90% attendance mandatory)",
      curriculum: [
        "Introduction to the art and craft of direction",
        "Understanding cinematic language, visual storytelling, and narrative structure",
        "Working with actors, screenplay, mise-en-scène, and montage",
        "Discussions, screenings, and film analysis",
      ],
      applicationProcess: [
        "Last Date to Apply: 29 May 2025, 6 PM IST",
        "Selection: First-Come-First-Served",
        "Go to www.onlinesbi.com → Click on 'SBI Collect'",
        "Search FTII Fees Account under 'Educational Institutions'",
        "Select: B31 Fundamentals of Film Direction Online",
        "Fill form → Pay fee → Save receipt",
      ],
      contactInfo: ["Email: info.cfol@ftii.ac.in", "Phone: 020 – 2558 0085"],
      aboutInstructor:
        "Avinash Roy & Jasmine Kaur Roy – National Award-winning FTII alumni and co-founders of Wanderlust Films. Their films like Saanjh and Amoli have won National Awards and featured in international film festivals. Jasmine has also been a Berlinale Talents participant.",
      techRequirements: [
        "Desktop/Laptop with minimum 4 GB RAM and webcam",
        "Stable internet (min 10 Mbps, 5 GB data/day)",
        "Use of mobile phones not allowed",
        "Familiarity with Google Meet & Classroom required",
      ],
    },
  },
  {
    id: 12,
    title: "Basic Course in the Art of Screenwriting – FTII Online",
    trainer: "Vikas Sharma",
    institution: "Film and Television Institute of India (FTII)",
    location: "Online",
    state: "All India",
    date: "16–27 June 2025",
    time: "10 AM–12 PM & 1 PM–3 PM (4 hours/day, weekdays only)",
    description:
      "Dive into the core elements of screenwriting for feature films with this weekday-only online course. Learn principles of cinematic storytelling, character development, story structure, premise, theme, and conflict through theory, exercises, and feedback. Taught by seasoned screenwriter Vikas Sharma.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Screenwriting+Course",
    registrationLink:
      "https://ftii.ac.in/p/ftii-online-1/basic-course-in-the-art-of-feature-film-writing-16-27-june-2025-online",
    featured: true,
    price: "₹14,000 (Indian Nationals)",
    contact: "020 25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass",
    fullDetails: {
      venue: "Online (Google Classroom + Google Meet)",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      medium: "English & Hindi",
      duration: "12 days (weekdays only)",
      eligibilityCriteria: [
        "Age: 18+ as on 01 June 2025",
        "Education: 12th pass (10th pass in exceptional cases)",
        "Indian Nationals only",
      ],
      capacity: "24 participants (Course conducted only if 20+ participants register)",
      courseFee: "₹14,000 (Indian Nationals), ₹42,000 (Foreign, NRI, OCI, or Indians abroad)",
      certification: "E-certificate awarded with 90% attendance",
      curriculum: [
        "Principles of cinematic storytelling",
        "Character development & multi-dimensional protagonists",
        "Story structure, premise, theme, and conflict",
        "Screenwriting tools through theory, exercises, and feedback",
      ],
      applicationProcess: [
        "Last Date to Apply: 29 May 2025, 6 PM IST",
        "Visit www.onlinesbi.com → Click on 'SB Collect'",
        "Search FTII Fees Account under 'Educational Institutions'",
        "Select: B02 Basic Course in the Art of Screenwriting",
        "Fill form → Pay fee → Save receipt",
        "No document submission required",
      ],
      contactInfo: ["Email: info.cfol@ftii.ac.in / ftiicfol@gmail.com", "Phone: 020 – 2558 0085"],
      aboutInstructor:
        "Vikas Sharma – A seasoned screenwriter and former faculty at FTII & Whistling Woods. Has mentored at leading screenplay fellowships including Asia Society's New Voices Fellowship, Cinestaan India Script Contest, and more.",
      techRequirements: [
        "Laptop/Desktop with 4 GB RAM, webcam",
        "Internet: Min 10 Mbps speed and 5 GB data/day",
        "Mobile phone not allowed",
        "Familiarity with Google Meet & Classroom is essential",
      ],
      additionalInfo:
        "Fees are non-refundable once selected. Course focuses specifically on feature film screenwriting.",
    },
  },
  {
    id: 13,
    title: "Basic Course in Writing Scenes and Dialogues – FTII Online",
    trainer: "Vikas Sharma",
    institution: "Film and Television Institute of India (FTII)",
    location: "Online",
    state: "All India",
    date: "14–22 June 2025",
    time: "10 AM–12 PM & 1 PM–3 PM (4 hours/day, weekends only)",
    description:
      "Discover what makes a scene unforgettable and a dialogue iconic in this hands-on writing course. Learn about crafting great dialogue, creating dramatic scenes, and the power of subtext. Perfect for aspiring screenwriters who want to level up their scriptwriting skills with a focus on scenes and dialogues.",
    image: "/placeholder.svg?height=300&width=500&text=FTII+Dialogue+Writing+Course",
    registrationLink: "https://ftii.ac.in/p/ftii-online-1/basic-course-in-writing-scenes-and-dialogues-14-22-june-2025",
    featured: true,
    price: "₹7,200 (Indian Nationals)",
    contact: "020 25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass",
    fullDetails: {
      venue: "Online (Google Classroom + Google Meet)",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      medium: "English & Hindi",
      duration: "4 days (Weekends only: 14–15 June & 21–22 June 2025)",
      eligibilityCriteria: [
        "Age: 18+ (born on or before 31 May 2007)",
        "Education: 12th pass (10th pass may be considered in exceptional cases)",
        "Nationality: Indian citizens only",
      ],
      capacity: "24 participants (Min 20 required for course to run)",
      courseFee: "₹7,200 (Indian Participants), ₹21,600 (Foreign/OCI/NRI or Indians residing abroad)",
      certification: "E-Certificate awarded upon successful completion with 90% attendance mandatory",
      curriculum: [
        "Crafting Great Dialogue:",
        "What makes a dialogue unforgettable",
        "Dialogue vs. conversation",
        "Subtext and the power of 'the unsaid'",
      ],
      methodology: [
        "Writing your own scenes",
        "Film viewings and analysis",
        "Interactive exercises and live instruction",
      ],
      applicationProcess: [
        "Last Date to Apply: 29 May 2025, 6 PM IST",
        "Go to www.onlinesbi.com",
        "Click on 'SB Collect'",
        "Search FTII Fees Account under 'Educational Institutions'",
        "Select: B11 Basic C. in Writing Dialogues and Scenes for Screen",
        "Fill form → Pay fee → Save your payment receipt",
        "No document upload needed. Self-declaration in form is enough.",
      ],
      contactInfo: [
        "Contact: Mr. Milindkumar Joshi, Assistant Outreach Officer",
        "Email: info.cfol@ftii.ac.in | ftiioutreach@gmail.com",
        "Phone: 020 – 2558 0085",
      ],
      aboutInstructor:
        "Vikas Sharma – Professional screenwriter and senior faculty at Whistling Woods International; former faculty at FTII Pune. Mentor at major fellowships including Asia Society's New Voices, Cinestaan India Script Contest, and more.",
      techRequirements: [
        "Device: Laptop/Desktop (No mobile phones allowed)",
        "RAM: 4 GB or more",
        "Processor: Intel i3/i5 or equivalent",
        "Webcam + Headphones required",
        "Internet: Minimum 10 Mbps, 5 GB data/day",
        "Platform: Google Classroom + Google Meet",
        "Browser: Chrome (preferred), Firefox, Safari",
      ],
      additionalInfo:
        "Participants must keep cameras ON and mics OFF during class unless instructed otherwise. Failure to keep camera on may lead to expulsion and no refund. All communication will be via email.",
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
    fullDetails: {
      venue: "Nrityangana, 383/K 'Sumeru', Ground Floor, NTI Layout, Rajiv Gandhi Nagar, Bangalore",
      organizer: "Nrityangana Institute of Performing Arts in collaboration with Tripudi",
      duration: "3 days",
      curriculum: [
        "Discover the unseen potential of your eyes in performance",
        "Learn a unique acting pedagogy rooted in Kutiyattam",
        "Refine your Abhinaya with depth and precision",
        "Stimulate imagination, deepen expression, and master your craft",
      ],
      socialMedia: ["Instagram: @nrityangana_institute_pa"],
      targetAudience: "Actors and dancers interested in deepening their expressive abilities",
      contactInfo: ["Email: tripudiws@gmail.com", "WhatsApp: 8075413321"],
      aboutInstructor:
        "Sooraj Nambiar is a skilled performer and instructor specializing in Kutiyattam techniques and their application to contemporary performance.",
      additionalInfo:
        "This workshop focuses on eye movement and expression techniques rooted in the ancient art form of Kutiyattam, offering participants a unique approach to enhancing their performance skills.",
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

                {workshop.ageGroup && (
                  <div className="flex items-start">
                    <Users className="h-5 w-5 mr-2 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Age Group</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.ageGroup}</p>
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

                {workshop.fullDetails?.duration && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">⏱️</span>
                    </div>
                    <div>
                      <p className="font-medium">Duration</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.duration}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.format && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">🖥️</span>
                    </div>
                    <div>
                      <p className="font-medium">Format</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.format}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.organizer && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">🏢</span>
                    </div>
                    <div>
                      <p className="font-medium">Organizers</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.organizer}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.includes && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">✅</span>
                    </div>
                    <div>
                      <p className="font-medium">Includes</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.includes}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.upcomingWebinar && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">📺</span>
                    </div>
                    <div>
                      <p className="font-medium">Upcoming Webinar</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.upcomingWebinar}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.medium && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">🗣️</span>
                    </div>
                    <div>
                      <p className="font-medium">Medium</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.medium}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.capacity && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">👥</span>
                    </div>
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.capacity}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.topic && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">📚</span>
                    </div>
                    <div>
                      <p className="font-medium">Topic</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.topic}</p>
                    </div>
                  </div>
                )}

                {workshop.fullDetails?.prerequisites && (
                  <div className="flex items-start">
                    <div className="h-5 w-5 mr-2 flex items-center justify-center text-primary mt-0.5">
                      <span className="font-bold">📋</span>
                    </div>
                    <div>
                      <p className="font-medium">Prerequisites</p>
                      <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.prerequisites}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div>
              {workshop.fullDetails?.curriculum && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Curriculum</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.curriculum.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.methodology && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Methodology</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.methodology.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.eligibilityCriteria && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Eligibility Criteria</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.eligibilityCriteria.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.mentors && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Mentors</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.mentors.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.careerOpportunities && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Career Opportunities</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.careerOpportunities.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.applicationProcess && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Application Process</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.applicationProcess.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.contactInfo && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Contact Information</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.contactInfo.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.techRequirements && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Technical Requirements</h2>
                  <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm md:text-base">
                    {workshop.fullDetails.techRequirements.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}

              {workshop.fullDetails?.takeaways && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Takeaways</h2>
                  <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.takeaways}</p>
                </div>
              )}

              {workshop.fullDetails?.certification && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Certification</h2>
                  <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.certification}</p>
                </div>
              )}

              {workshop.fullDetails?.aboutInstructor && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">About the Instructor</h2>
                  <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.aboutInstructor}</p>
                </div>
              )}

              {workshop.fullDetails?.additionalInfo && (
                <div className="mb-5">
                  <h2 className="font-playfair text-lg md:text-xl font-bold mb-3">Additional Information</h2>
                  <p className="text-gray-600 text-sm md:text-base">{workshop.fullDetails.additionalInfo}</p>
                </div>
              )}
            </div>
          </div>

          <div className="border-t pt-4 md:pt-6">
            <h2 className="font-playfair text-lg md:text-xl font-bold mb-3 md:mb-4">Contact Information</h2>
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div>
                <p className="font-medium">Institution</p>
                <p className="text-gray-600 text-sm md:text-base">{workshop.institution}</p>
              </div>

              <div className="flex flex-wrap gap-2 md:ml-auto">
                {workshop.contact && workshop.contact !== "Via website" && (
                  <a
                    href={`https://wa.me/91${workshop.contact.replace(/\D/g, "")}`}
                    className="flex items-center gap-2 bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Phone className="h-4 w-4" />
                    WhatsApp
                  </a>
                )}

                {workshop.email && (
                  <a
                    href={`mailto:${workshop.email}`}
                    className="flex items-center gap-2 bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </a>
                )}

                {workshop.instagram && (
                  <a
                    href={`https://instagram.com/${workshop.instagram.replace("@", "")}`}
                    className="flex items-center gap-2 bg-pink-500 text-white px-3 py-2 rounded-md hover:bg-pink-600 transition-colors text-sm"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                    </svg>
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
