"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, MapPin, Calendar } from "lucide-react"
import AuditionBanner from "@/components/audition-banner"

// Verified audition data
const auditions = [
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
  {
    id: 15,
    title: "MYCELIUM - Workshop & Audition with Ana Mirtha Sariego",
    type: "Theater",
    location: "Bangalore",
    state: "Karnataka",
    date: "Sunday, 2nd November 2025",
    director: "Ana Mirtha Sariego",
    description:
      "Join this unique international theatre project focused on devising & collective creation. Led by renowned Spanish actress, director & founder of Sariego Theatre, Ana Mirtha Sariego, with global experience across Europe, the Americas & India. Free workshop & non-paid audition for performers, dancers & physical theatre actors.",
    company: "Sariego Theatre",
    companyLink: "https://wa.me/447810802938",
    contact: "+44 7810 802938 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Performers, dancers & physical theatre actors",
      "Interest in devising & collective creation",
      "Available for full day (11:00–14:00 & 16:00–19:00) or one slot",
      "Based in or able to travel to Bangalore",
      "Open to experimental and collaborative theatre practices",
    ],
    roles: [
      "Performers - Physical theatre and devised work",
      "Dancers - Contemporary and experimental movement",
      "Physical Theatre Actors - Collaborative creation",
    ],
    applicationProcess:
      "Confirm your participation via WhatsApp at +44 7810 802938. Mention your preferred time slot (full day or morning/afternoon session) and brief background in theatre/dance.",
    directorDetails: {
      name: "Ana Mirtha Sariego",
      title: "Renowned Spanish Actress, Director & Founder of Sariego Theatre",
      experience: "Global experience across Europe, the Americas & India",
      company: "Sariego Theatre",
      instagram: ["@anamirtha.theatre", "@sariegotheatre"],
      website: ["www.anamirtha.com", "www.sariegotheatre.com"],
      description:
        "Ana Mirtha Sariego is a celebrated Spanish theatre artist with extensive international experience. As the founder of Sariego Theatre, she has worked across continents, bringing innovative approaches to devising and collective creation. Her work spans Europe, the Americas, and India, making her a truly global theatre practitioner.",
      achievements: [
        "Founder of Sariego Theatre",
        "International theatre director with work across 3 continents",
        "Specialist in devising and collective creation",
        "Extensive experience in physical theatre and experimental performance",
        "Collaborations with artists across Europe, Americas, and India",
      ],
    },
    workshopDetails: {
      projectName: "MYCELIUM",
      focus: "Devising & Collective Creation",
      venue: "Play Practice Residency, Bangalore",
      date: "Sunday, 2nd November 2025",
      timings: "11:00–14:00 & 16:00–19:00",
      options: "Full day or one slot",
      fee: "Free workshop & non-paid audition",
      type: "International theatre project",
    },
  },
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
    contactType: "whatsapp",
    experience: "Experienced",
    verified: true,
    image: "/images/omasta-studios-logo.jpeg",
    requirements: [
      "Male actor aged 55-70 years",
      "Calm and wise presence",
      "Willingness to wear beard and wig (provided by team)",
      "Preference for artists of Northeast Indian origin with East Asian features",
      "Experience in character roles",
      "Comfortable with historical/period drama",
    ],
    roles: [
      "Old Japanese Katana Master - Lead Character",
      "Age range: 55-70 years",
      "Character traits: Wise, calm, experienced warrior from 10th century",
      "Physical requirements: Beard and wig (costume provided)",
      "Preferred ethnicity: Northeast Indian origin with East Asian features",
    ],
    applicationProcess:
      "Fill out the casting form at the provided Google Forms link and contact via WhatsApp at 6281055355 for any queries. Include your portfolio and recent headshots.",
    characterDetails: {
      name: "Japanese Katana Master",
      ageRange: "55-70 years",
      genre: "Historical/Action Drama",
      description:
        "An experienced Japanese Katana Master from the 10th century with decades of martial arts wisdom. The character embodies tranquility, discipline, and ancient warrior traditions.",
      lookingFor: [
        "Calm and wise demeanor",
        "Physical presence suitable for a martial arts master",
        "East Asian facial features (preferably Northeast Indian origin)",
        "Comfort with traditional costume elements",
      ],
    },
    shootDetails: {
      location: "Madanapalle, Andhra Pradesh",
      dates: "July 17 to July 21, 2025",
      duration: "5 days",
      genre: "Historical/Action Drama",
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
      "A 50-minute Hindi play featuring 10 characters. Video audition required - choose any two roles, record dialogues, upload to Google Drive and submit form. Male actors must perform all dialogues provided as only two male characters are listed.",
    company: "Broken Wall Bridge Theatre Group",
    companyInstagram: "https://www.instagram.com/brokenwallbridge?igsh=bGp1MG5rbXEwZG01",
    contact: "Ashish - 8788132835",
    contactType: "form",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
    requirements: [
      "Choose any two roles that resonate with you",
      "Male actors: perform all dialogues provided (only two male characters listed)",
      "Record a video performing the dialogues",
      "Upload video to Google Drive and make it shareable",
      "Submit audition form with video link",
      "Must be comfortable with Hindi language",
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
      "Download/Read character dialogues, choose roles, record video audition, upload to Google Drive, and submit form with shareable link. Selected candidates will be invited for play reading session.",
    characterDetails: {
      playTitle: "Maithili",
      duration: "50 minutes",
      totalCharacters: 10,
      language: "Hindi",
      videoAudition: true,
      deadline: "22 August 2025",
      description:
        "A Hindi play exploring various character dynamics and emotions through compelling dialogues and situations.",
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
      "Seeking qualified public speaking teachers for multiple schools in Bangalore. Teaching commitment from July 2025 to February 2026. Classes once a month, 01:30 PM to 04:30 PM for grades 6 & 7 and 8 & 9. Lesson plans and teacher's guide will be provided. Paid assignment opportunity for actors, theatre practitioners, and educators.",
    company: "Educational Institution",
    companyLink: "https://wa.me/919632220405",
    contact: "9632220405 (WhatsApp)",
    contactType: "whatsapp",
    experience: "All Levels",
    verified: true,
    image: "/images/auditions-stage.png",
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
      "Sanskaar Rang Toli (TIE Company), NSD, New Delhi is inviting online applications for 5 posts of Theatre Artist Grade B (working with children). Contractual position with competitive salary and growth opportunities.",
    company: "National School of Drama (NSD)",
    companyLink: "https://www.nsd.gov.in",
    contact: "Apply online at www.nsd.gov.in",
    contactType: "website",
    experience: "Experienced",
    verified: true,
    image: "/images/auditions-stage.png",
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
      "National School of Drama (NSD) Sikkim Centre is recruiting 6 artists for their Repertory Company. This is an excellent opportunity to work with one of India's premier theatre institutions in the beautiful state of Sikkim.",
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
]

// Get unique states and categories for filters
const states = [...new Set(auditions.map((audition) => audition.state))].sort()
const categories = [...new Set(auditions.map((audition) => audition.type))].sort()
const cities = [...new Set(auditions.map((audition) => audition.location))].sort()
const experienceLevels = [...new Set(auditions.map((audition) => audition.experience))].sort()

export default function AuditionsContent() {
  const [filters, setFilters] = useState({
    search: "",
    city: "all",
    state: "all",
    category: "all",
    experience: "all",
  })

  const filteredAuditions = auditions.filter((audition) => {
    return (
      (filters.search === "" ||
        audition.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        audition.description.toLowerCase().includes(filters.search.toLowerCase())) &&
      (filters.city === "all" || filters.city === "" || audition.location === filters.city) &&
      (filters.state === "all" || filters.state === "" || audition.state === filters.state) &&
      (filters.category === "all" || filters.category === "" || audition.type === filters.category) &&
      (filters.experience === "all" || filters.experience === "" || audition.experience === filters.experience)
    )
  })

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const clearFilters = () => {
    setFilters({
      search: "",
      city: "all",
      state: "all",
      category: "all",
      experience: "all",
    })
  }

  return (
    <div className="container py-6 sm:py-8 md:py-12 px-3 sm:px-4">
      <AuditionBanner />
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-10 md:mb-12 px-2">
        <h1 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 break-words">
          Audition Board
        </h1>
        <p className="text-sm sm:text-base text-gray-600 break-words leading-relaxed">
          Discover verified audition opportunities across the country. Filter by location, type, and experience level to
          find your perfect role.
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 sm:mb-8 p-4 sm:p-5 md:p-6 bg-gray-50 rounded-lg shadow-sm overflow-hidden">
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <Filter className="h-4 w-4 sm:h-5 sm:w-5 text-primary flex-shrink-0" />
          <h2 className="font-playfair text-lg sm:text-xl font-bold break-words">Filter Auditions</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
          <div className="relative sm:col-span-2 lg:col-span-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              type="text"
              placeholder="Search auditions..."
              className="pl-10 rounded-md text-sm sm:text-base w-full"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <Select value={filters.city} onValueChange={(value) => handleFilterChange("city", value)}>
            <SelectTrigger className="rounded-md text-sm sm:text-base w-full">
              <SelectValue placeholder="City" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {cities.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.state} onValueChange={(value) => handleFilterChange("state", value)}>
            <SelectTrigger className="rounded-md text-sm sm:text-base w-full">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All States</SelectItem>
              {states.map((state) => (
                <SelectItem key={state} value={state}>
                  {state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
            <SelectTrigger className="rounded-md text-sm sm:text-base w-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.experience} onValueChange={(value) => handleFilterChange("experience", value)}>
            <SelectTrigger className="rounded-md text-sm sm:text-base w-full">
              <SelectValue placeholder="Experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Levels</SelectItem>
              {experienceLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {(filters.search ||
          filters.city !== "all" ||
          filters.state !== "all" ||
          filters.category !== "all" ||
          filters.experience !== "all") && (
          <div className="mt-3 sm:mt-4 flex justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="rounded-md bg-transparent text-xs sm:text-sm"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>

      {/* Audition Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {filteredAuditions.length > 0 ? (
          filteredAuditions.map((audition) => (
            <div
              key={audition.id}
              className={`bg-white rounded-lg border overflow-hidden flex flex-col h-full card-hover ${
                audition.id === 1
                  ? "border-primary/30 shadow-lg"
                  : audition.id === 2
                    ? "border-orange-300 shadow-lg"
                    : audition.id === 7
                      ? "border-purple-300 shadow-lg"
                      : audition.id === 12
                        ? "border-green-300 shadow-lg"
                        : audition.id === 13
                          ? "border-blue-300 shadow-lg"
                          : audition.id === 14
                            ? "border-yellow-500 shadow-lg"
                            : audition.id === 15
                              ? "border-purple-300 shadow-lg"
                              : "border-gray-200"
              }`}
            >
              <div className="relative h-40 sm:h-48 w-full flex-shrink-0">
                <Image
                  src={audition.image || "/placeholder.svg"}
                  alt={audition.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = "/images/auditions-stage.png"
                  }}
                />
                {audition.verified && (
                  <div className="absolute top-2 right-2 badge-verified text-xs">
                    <span className="flex items-center">
                      <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Verified
                    </span>
                  </div>
                )}
                {audition.id === 1 && (
                  <div className="absolute top-2 left-2 bg-primary text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                    🎬 Film Lead
                  </div>
                )}
                {audition.id === 2 && (
                  <div className="absolute top-2 left-2 bg-orange-600 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                    ⚔️ Action Drama
                  </div>
                )}
                {audition.id === 7 && (
                  <div className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                    🎭 Video Audition
                  </div>
                )}
                {audition.id === 12 && (
                  <div className="absolute top-2 left-2 bg-green-600 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                    🎭 Repertory Company
                  </div>
                )}
                {audition.id === 13 && (
                  <div className="absolute top-2 left-2 bg-blue-600 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                    🎪 Children's Festival
                  </div>
                )}
                {audition.id === 14 && (
                  <div className="absolute top-2 left-2 bg-yellow-600 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                    🎭 Nukkad Natak
                  </div>
                )}
                {/* Adding badge for MYCELIUM audition */}
                {audition.id === 15 && (
                  <div className="absolute top-2 left-2 bg-purple-600 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full">
                    🌿 International Project
                  </div>
                )}
              </div>
              <div className="p-4 sm:p-5 md:p-6 flex-1 flex flex-col overflow-hidden">
                <div className="flex justify-between items-start mb-3 gap-2 flex-wrap">
                  <span
                    className={`badge-primary text-xs ${audition.id === 7 ? "bg-purple-100 text-purple-800" : audition.id === 13 ? "bg-blue-100 text-blue-800" : audition.id === 14 ? "bg-yellow-100 text-yellow-800" : audition.id === 15 ? "bg-purple-100 text-purple-800" : ""}`}
                  >
                    {audition.type}
                  </span>
                  <span className="badge-outline text-xs">{audition.experience}</span>
                </div>
                <h3 className="font-playfair text-base sm:text-lg md:text-xl font-bold mb-3 sm:mb-4 break-words leading-tight">
                  {audition.title}
                </h3>

                {/* Special character info for Meera casting */}
                {audition.id === 1 && audition.characterDetails && (
                  <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 overflow-hidden">
                    <h4 className="font-semibold text-primary mb-2 flex items-center text-xs sm:text-sm break-words">
                      🎭 Character: {audition.characterDetails.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-xs sm:text-sm mb-2 sm:mb-3">
                      <div className="break-words">
                        <span className="font-medium text-gray-700">Age:</span>
                        <span className="ml-1 text-gray-800">{audition.characterDetails.ageRange}</span>
                      </div>
                      <div className="break-words">
                        <span className="font-medium text-gray-700">Language:</span>
                        <span className="ml-1 text-gray-800">{audition.characterDetails.languages}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 mb-2 sm:mb-3 italic break-words leading-relaxed">
                      "{audition.characterDetails.description}"
                    </p>
                    <div className="mb-2 sm:mb-3">
                      <p className="font-medium text-gray-700 text-xs sm:text-sm mb-1">✨ Looking for:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] sm:text-xs text-gray-600">
                        {audition.characterDetails.lookingFor.map((item: string, index: number) => (
                          <div key={index} className="flex items-start break-words">
                            <span className="text-primary mr-1 flex-shrink-0">•</span>
                            <span className="break-words">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                      <span className="text-[10px] sm:text-xs font-medium text-green-600 break-all">
                        📞 WhatsApp: 7375962175
                      </span>
                      <a
                        href={audition.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] sm:text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors whitespace-nowrap"
                      >
                        Quick Apply
                      </a>
                    </div>
                  </div>
                )}

                {/* Special character info for Katana Master casting */}
                {audition.id === 2 && audition.characterDetails && audition.shootDetails && (
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-orange-700 mb-2 flex items-center">
                      ⚔️ Character: {audition.characterDetails.name}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="font-medium text-gray-700">Age:</span>
                        <span className="ml-1 text-gray-800">{audition.characterDetails.ageRange}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Genre:</span>
                        <span className="ml-1 text-gray-800">{audition.characterDetails.genre}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 italic">"{audition.characterDetails.description}"</p>
                    <div className="mb-3">
                      <p className="font-medium text-gray-700 text-sm mb-1">🎯 Shoot Details:</p>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>📍 Location: {audition.shootDetails.location}</div>
                        <div>📅 Dates: {audition.shootDetails.dates}</div>
                        <div>⏱️ Duration: {audition.shootDetails.duration}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-green-600">📞 WhatsApp: 6281055355</span>
                      <a
                        href={audition.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-orange-600 text-white px-2 py-1 rounded hover:bg-orange-700 transition-colors"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                )}

                {/* Special character info for Maithili casting */}
                {audition.id === 7 && audition.characterDetails && (
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-purple-700 mb-2 flex items-center">
                      🎭 Play: {audition.characterDetails.playTitle}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="font-medium text-gray-700">Duration:</span>
                        <span className="ml-1 text-gray-800">{audition.characterDetails.duration}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Language:</span>
                        <span className="ml-1 text-gray-800">{audition.characterDetails.language}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Characters:</span>
                        <span className="ml-1 text-gray-800">{audition.characterDetails.totalCharacters}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Deadline:</span>
                        <span className="ml-1 text-gray-800 font-semibold text-red-600">
                          {audition.characterDetails.deadline}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 italic">"{audition.characterDetails.description}"</p>
                    <div className="mb-3">
                      <p className="font-medium text-gray-700 text-sm mb-1">🎬 Video Audition Process:</p>
                      <div className="text-xs text-gray-600 space-y-1">
                        <div>• Choose any 2 roles (males: perform all dialogues)</div>
                        <div>• Record video performing dialogues</div>
                        <div>• Upload to Google Drive & make shareable</div>
                        <div>• Submit form with video link</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-green-600">📞 Contact: Ashish - 8788132835</span>
                      <a
                        href={audition.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700 transition-colors"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                )}

                {/* Special character info for NSD Sikkim Centre casting */}
                {audition.id === 12 && audition.roles && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <h4 className="font-semibold text-green-700 mb-2 flex items-center">
                      🎭 Repertory Company: {audition.roles[0]}
                    </h4>
                    <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                      <div>
                        <span className="font-medium text-gray-700">Salary:</span>
                        <span className="ml-1 text-gray-800">{audition.salary}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Number of Posts:</span>
                        <span className="ml-1 text-gray-800">{audition.numberOfPosts}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Age Limit:</span>
                        <span className="ml-1 text-gray-800">{audition.ageLimit}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Application Deadline:</span>
                        <span className="ml-1 text-gray-800 font-semibold text-red-600">
                          {audition.applicationDeadline}
                        </span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-3 italic">"{audition.description}"</p>
                    <div className="mb-3">
                      <p className="font-medium text-gray-700 text-sm mb-1">📝 Application Requirements:</p>
                      <div className="text-xs text-gray-600 space-y-1">
                        {audition.applicationRequirements.map((item: string, index: number) => (
                          <div key={index} className="flex items-center">
                            <span className="text-green-600 mr-1">•</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="mb-3">
                      <p className="font-medium text-gray-700 text-sm mb-1">📢 Important Notes:</p>
                      <div className="text-xs text-gray-600 space-y-1">
                        {audition.importantNotes.map((item: string, index: number) => (
                          <div key={index} className="flex items-center">
                            <span className="text-green-600 mr-1">•</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-green-600">📞 Contact: {audition.contact}</span>
                      <a
                        href={audition.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
                      >
                        Apply Now
                      </a>
                    </div>
                  </div>
                )}

                {/* Special info for Children's Theater Festival casting */}
                {audition.id === 13 && audition.festivalDetails && (
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🎪</span>
                      <h4 className="font-semibold text-blue-800 text-sm sm:text-base break-words">
                        {audition.festivalDetails.name}
                      </h4>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-blue-100">
                        <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-0.5">Type</p>
                        <p className="text-xs sm:text-sm font-semibold text-blue-900 break-words leading-tight">
                          {audition.festivalDetails.type}
                        </p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-blue-100">
                        <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-0.5">Compensation</p>
                        <p className="text-xs sm:text-sm font-semibold text-green-700 break-words">
                          {audition.festivalDetails.compensation}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-blue-100 mb-3">
                      <p className="text-[10px] sm:text-xs font-medium text-gray-700 mb-2">Timeline</p>
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-1.5">
                          <span className="text-blue-600 text-xs flex-shrink-0">📅</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] sm:text-xs text-gray-600">Rehearsals</p>
                            <p className="text-xs sm:text-sm font-medium text-blue-900 break-words">
                              {audition.festivalDetails.rehearsalPeriod}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="text-blue-600 text-xs flex-shrink-0">🎭</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] sm:text-xs text-gray-600">Shows</p>
                            <p className="text-xs sm:text-sm font-medium text-blue-900 break-words">
                              {audition.festivalDetails.performancePeriod}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-blue-100 mb-3">
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
                        {audition.description}
                      </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-blue-100 mb-3">
                      <p className="text-[10px] sm:text-xs font-medium text-gray-700 mb-2">Key Requirements</p>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-1.5 text-[10px] sm:text-xs text-gray-600">
                          <span className="text-blue-600 flex-shrink-0 mt-0.5">•</span>
                          <span className="break-words">Full-time theater artists</span>
                        </li>
                        <li className="flex items-start gap-1.5 text-[10px] sm:text-xs text-gray-600">
                          <span className="text-blue-600 flex-shrink-0 mt-0.5">•</span>
                          <span className="break-words">Clowning experience preferred</span>
                        </li>
                        <li className="flex items-start gap-1.5 text-[10px] sm:text-xs text-gray-600">
                          <span className="text-blue-600 flex-shrink-0 mt-0.5">•</span>
                          <span className="break-words">Passion for children's audiences</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-blue-100">
                        <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-1">Contact</p>
                        <p className="text-xs sm:text-sm font-medium text-blue-900 break-all">
                          44clowncompany@gmail.com
                        </p>
                      </div>
                      <a
                        href={audition.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-md transition-colors text-center"
                      >
                        Send Your Profile
                      </a>
                    </div>
                  </div>
                )}

                {/* New section for Nukkad Natak Audition */}
                {audition.id === 14 && audition.projectDetails && audition.compensation && (
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100/50 border border-yellow-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🎭</span>
                      <h4 className="font-semibold text-yellow-800 text-sm sm:text-base break-words">
                        {audition.projectDetails.format}
                      </h4>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-yellow-100">
                        <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-0.5">Position</p>
                        <p className="text-xs sm:text-sm font-semibold text-yellow-900 break-words leading-tight">
                          {audition.projectDetails.positions}
                        </p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-yellow-100">
                        <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-0.5">Location</p>
                        <p className="text-xs sm:text-sm font-semibold text-yellow-900 break-words">
                          {audition.projectDetails.location}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-yellow-100 mb-3">
                      <p className="text-[10px] sm:text-xs font-medium text-gray-700 mb-2">Benefits</p>
                      <ul className="space-y-1">
                        {audition.projectDetails.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center gap-1.5 text-[10px] sm:text-xs text-yellow-800">
                            <span className="text-yellow-600">•</span>
                            <span className="break-words">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-yellow-100 mb-3">
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed break-words">
                        {audition.description}
                      </p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-yellow-100 mb-3">
                      <p className="text-[10px] sm:text-xs font-medium text-gray-700 mb-2">Key Requirements</p>
                      <ul className="space-y-1">
                        {audition.requirements.slice(0, 3).map((req, index) => (
                          <li key={index} className="flex items-start gap-1.5 text-[10px] sm:text-xs text-gray-600">
                            <span className="text-yellow-600 flex-shrink-0 mt-0.5">•</span>
                            <span className="break-words">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-yellow-100">
                        <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-1">Contact</p>
                        <p className="text-xs sm:text-sm font-medium text-yellow-900 break-all">{audition.contact}</p>
                      </div>
                      <a
                        href={audition.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-md transition-colors text-center"
                      >
                        Express Interest
                      </a>
                    </div>
                  </div>
                )}

                {/* New section for MYCELIUM Workshop-Audition */}
                {audition.id === 15 && audition.workshopDetails && audition.directorDetails && (
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100/50 border border-purple-200 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 overflow-hidden">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-lg">🌿</span>
                      <h4 className="font-semibold text-purple-800 text-sm sm:text-base break-words">
                        {audition.workshopDetails.projectName}
                      </h4>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-purple-100 mb-3">
                      <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-2">✨ Led by</p>
                      <p className="text-xs sm:text-sm font-semibold text-purple-900 break-words leading-tight mb-1">
                        {audition.directorDetails.name}
                      </p>
                      <p className="text-[10px] sm:text-xs text-purple-700 break-words leading-relaxed">
                        {audition.directorDetails.title}
                      </p>
                    </div>

                    <div className="space-y-2 mb-3">
                      <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-purple-100">
                        <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-0.5">Focus</p>
                        <p className="text-xs sm:text-sm font-semibold text-purple-900 break-words leading-tight">
                          {audition.workshopDetails.focus}
                        </p>
                      </div>
                      <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-purple-100">
                        <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-0.5">Fee</p>
                        <p className="text-xs sm:text-sm font-semibold text-green-700 break-words">
                          {audition.workshopDetails.fee}
                        </p>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-purple-100 mb-3">
                      <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-2">Schedule</p>
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-1.5">
                          <span className="text-purple-600 text-xs flex-shrink-0">📅</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] sm:text-xs text-gray-600">Date</p>
                            <p className="text-xs sm:text-sm font-medium text-purple-900 break-words">
                              {audition.workshopDetails.date}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className="text-purple-600 text-xs flex-shrink-0">🕐</span>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] sm:text-xs text-gray-600">Timings</p>
                            <p className="text-xs sm:text-sm font-medium text-purple-900 break-words">
                              {audition.workshopDetails.timings}
                            </p>
                            <p className="text-[10px] sm:text-xs text-gray-600 italic">
                              ({audition.workshopDetails.options})
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-purple-100 mb-3">
                      <p className="text-[10px] sm:text-xs font-medium text-gray-700 mb-2">Calling</p>
                      <ul className="space-y-1">
                        <li className="flex items-start gap-1.5 text-[10px] sm:text-xs text-gray-600">
                          <span className="text-purple-600 flex-shrink-0 mt-0.5">•</span>
                          <span className="break-words">Performers</span>
                        </li>
                        <li className="flex items-start gap-1.5 text-[10px] sm:text-xs text-gray-600">
                          <span className="text-purple-600 flex-shrink-0 mt-0.5">•</span>
                          <span className="break-words">Dancers</span>
                        </li>
                        <li className="flex items-start gap-1.5 text-[10px] sm:text-xs text-gray-600">
                          <span className="text-purple-600 flex-shrink-0 mt-0.5">•</span>
                          <span className="break-words">Physical theatre actors</span>
                        </li>
                      </ul>
                    </div>

                    <div className="flex flex-col gap-2">
                      <div className="bg-white/80 backdrop-blur-sm rounded-md p-2 border border-purple-100">
                        <p className="text-[10px] sm:text-xs font-medium text-gray-600 mb-1">Registration</p>
                        <p className="text-xs sm:text-sm font-medium text-purple-900 break-all">
                          WhatsApp: +44 7810 802938
                        </p>
                      </div>
                      <a
                        href={audition.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-md transition-colors text-center"
                      >
                        Confirm Participation
                      </a>
                    </div>
                  </div>
                )}

                <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4 flex-1 overflow-hidden">
                  <div className="flex items-start text-xs sm:text-sm text-gray-500">
                    <span className="font-medium text-gray-700 w-16 sm:w-20 flex-shrink-0">Production:</span>
                    {audition.id === 7 ? (
                      <a
                        href={audition.companyInstagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 hover:underline transition-colors break-words"
                      >
                        {audition.director}
                      </a>
                    ) : (
                      <span className="break-words">{audition.director}</span>
                    )}
                  </div>
                  <div className="flex items-start text-xs sm:text-sm text-gray-500">
                    <span className="font-medium text-gray-700 w-16 sm:w-20 flex-shrink-0">Location:</span>
                    <span className="flex items-start break-words">
                      <MapPin className="h-3 w-3 mr-1 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="break-words">
                        {audition.location}, {audition.state}
                      </span>
                    </span>
                  </div>
                  <div className="flex items-start text-xs sm:text-sm text-gray-500">
                    <span className="font-medium text-gray-700 w-16 sm:w-20 flex-shrink-0">Dates:</span>
                    <span className="flex items-start break-words">
                      <Calendar className="h-3 w-3 mr-1 text-gray-400 flex-shrink-0 mt-0.5" />
                      <span className="break-words">{audition.date}</span>
                    </span>
                  </div>
                </div>

                <div className="flex justify-end mt-auto pt-3 sm:pt-4 border-t">
                  <Link href={`/auditions/${audition.id}`}>
                    <Button size="sm" className="rounded-md text-xs sm:text-sm">
                      More Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-8 sm:py-12 px-4">
            <p className="text-sm sm:text-base text-gray-500 mb-4 break-words">
              No auditions match your current filters.
            </p>
            <Button onClick={clearFilters} variant="outline" className="rounded-md bg-transparent text-xs sm:text-sm">
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
