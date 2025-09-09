"use client"

// Workshop data
const workshops = [
  {
    id: 33,
    title: "NSD's One-Year Acting Course – Mumbai",
    trainer: "NSD Faculty",
    institution: "National School of Drama (NSD)",
    location: "Mumbai",
    state: "Maharashtra",
    date: "15th October 2025",
    time: "Monday–Friday, 8 AM to 6 PM",
    description:
      "🎭 Comprehensive one-year full-time acting course by NSD Mumbai. Learn directly from renowned industry professionals with intensive, practical training for camera acting. Perfect for beginners and aspiring professionals in films, TV, and web series. Two intensive semesters with step-by-step learning and professional guidance.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://nsd.gov.in/delhi/index.php/admission-notice-mumbai-2025/",
    featured: true,
    price: "₹5,00,000 (Full Course) or ₹3,00,000 per semester",
    contact: "011-23389402 / 23387916",
    email: "Via NSD website",
    eligibility: "12th Pass, Age 18+",
    venue: "602 Durga Chambers, Andheri West, Mumbai",
    includes: "Professional industry training + NSD Certificate + Real-world preparation",
    fullDetails: {
      description:
        "🎭 Comprehensive one-year full-time acting course by NSD Mumbai. Learn directly from renowned industry professionals with intensive, practical training for camera acting. Perfect for beginners and aspiring professionals in films, TV, and web series. Two intensive semesters with step-by-step learning and professional guidance.",
      venue: "602 Durga Chambers, Andheri West, Mumbai",
      organizer: "National School of Drama (NSD), Mumbai",
      duration: "1 Year (Full-Time) - 1440 hours total",
      medium: "Hindi & English",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Education: 12th Pass (mandatory)",
        "Nationality: Indian",
        "Mandatory audition (Online/Offline)",
        "Commitment to full-time course attendance",
      ],
      applicationDeadline: "1st October 2025",
      auditionDate: "10th October 2025",
      courseBegins: "15th October 2025 (Mumbai)",
      selectionProcess: "Online/Offline Audition (mandatory)",
      capacity: "Limited seats available",
      courseFee: "Semester 1: ₹3,00,000, Semester 2: ₹3,00,000, Full Course: ₹5,00,000",
      certification: "NSD Certificate upon successful completion",
      keyHighlights: [
        "Learn directly from renowned industry professionals",
        "Intensive, practical training for camera acting",
        "Perfect for beginners and aspiring professionals in films, TV, and web series",
        "Two intensive semesters with step-by-step learning",
        "Professional guidance throughout the course",
        "Real-world preparation for film, TV, and web acting",
        "Full-time comprehensive program",
        "Industry-oriented training in Semester 2",
        "Foundation training in Semester 1",
        "Extended hours possible for intensive learning",
      ],
      curriculum: [
        "Foundation Training (Semester 1 - 720 hours)",
        "Industry-Oriented Training (Semester 2 - 720 hours)",
        "Camera acting techniques and methods",
        "Professional acting skills development",
        "Film and television acting preparation",
        "Web series acting training",
        "Character development and analysis",
        "Voice and diction training",
        "Movement and body language",
        "Script analysis and interpretation",
        "Improvisation techniques",
        "Industry practices and professional conduct",
      ],
      courseStructure: [
        "Semester 1 (6 Months): Foundation Training - 720 hours",
        "Semester 2 (6 Months): Industry-Oriented Training - 720 hours",
        "Monday to Friday schedule: 8 AM to 6 PM",
        "Extended hours possible for intensive sessions",
        "Step-by-step learning progression",
        "Professional guidance throughout",
      ],
      learningOutcomes: [
        "Professional camera acting skills",
        "Confidence in film, TV, and web series acting",
        "Understanding of industry practices and standards",
        "Character development and portrayal abilities",
        "Professional networking within the industry",
        "Real-world acting experience and preparation",
        "Industry-ready performance skills",
        "Professional conduct and ethics in entertainment industry",
      ],
      aboutInstructor:
        "NSD Faculty – Experienced acting professionals and educators from India's premier drama institution with extensive expertise in theatre, film, television, and web series acting. The faculty brings both academic excellence and practical industry experience to provide comprehensive training.",
      whyChooseNSD: [
        "Learn directly from renowned industry professionals",
        "Intensive, practical training for camera acting",
        "Perfect for beginners and aspiring professionals",
        "Comprehensive curriculum covering films, TV, and web series",
        "India's most prestigious drama institution",
        "Industry connections and networking opportunities",
        "Professional certification and recognition",
        "Real-world preparation and practical experience",
      ],
      targetAudience: [
        "Beginners interested in professional acting",
        "Aspiring film and television actors",
        "Web series acting enthusiasts",
        "Students seeking comprehensive acting training",
        "Career changers entering the entertainment industry",
        "Anyone passionate about camera acting",
      ],
      contactInfo: [
        "Phone: 011-23389402 / 23387916",
        "Registration: https://nsd.gov.in/delhi/index.php/admission-notice-mumbai-2025/",
        "National School of Drama, Mumbai",
      ],
      additionalInfo:
        "This comprehensive one-year full-time acting course is designed to prepare students for professional careers in films, television, and web series. The program combines foundational training with industry-oriented practical experience, ensuring graduates are ready for real-world acting opportunities. With NSD's prestigious reputation and experienced faculty, this course provides unparalleled training in camera acting.",
    },
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
    id: 23,
    title: "FTII Pune: Introduction to Multi-camera Technical Operations for TV Program Production",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "08–12 September 2025",
    time: "9:00 AM – 6:30 PM (45 hours total)",
    description:
      "📺 Learn how live TV shows, sports broadcasts, and reality programs are technically produced! This hands-on Short Term Training Program covers multi-camera setup, Vision Mixer, CCU, Audio Console, Lighting Console, Character Generator operations. Produce a 2–5 min TV program with your team and take home a recorded copy plus participation certificate.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/introduction-to-multi-camera-technical-operations-for-tv-program-production-08-12-september-2025",
    featured: true,
    price: "₹5,000 (+ ₹1,800 for optional accommodation)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    venue: "TV Engineering Dept., FTII Main Campus, Law College Road, Pune – 411004",
    includes: "Recorded 2-5 minute TV program + Participation certificate",
    fullDetails: {
      venue: "TV Engineering Dept., FTII Main Campus, Law College Road, Pune – 411004",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "1 week (5 days) - 45 hours total",
      medium: "English & Hindi",
      eligibilityCriteria: [
        "Age: 18+ (as of 08 September 2025)",
        "Education: HSC (12th Pass); in exceptional cases, 10th Pass may be considered",
        "Nationality: Indian",
        "Interest in TV production and technical operations",
      ],
      applicationDeadline: "20 August 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "Maximum 20 participants (Minimum 16 required)",
      courseFee: "₹5,000 (Non-refundable for selected participants)",
      accommodation: "₹1,800 for 6 days (Triple sharing, Kothrud campus – 5 km from FTII, excludes meals & transport)",
      certification: "Participation certificate + recorded copy of your TV program",
      keyHighlights: [
        "Hands-on training with professional TV equipment",
        "Multi-camera setup for TV program production",
        "Working with Vision Mixer, CCU, Audio Console, Lighting Console",
        "Character Generator and Teleprompter operations",
        "Understanding Technical Director role",
        "Produce a complete 2–5 minute TV program with your team",
        "Take home recorded copy of your program + participation certificate",
        "Industry-oriented training at India's premier film institute",
      ],
      curriculum: [
        "Multi-camera setup and operations for TV production",
        "Professional camera operations and control",
        "Vision Mixer operations and live switching",
        "CCU (Camera Control Unit) operations",
        "Audio Console operations and sound mixing",
        "Lighting Console operations and control",
        "Character Generator for graphics and titles",
        "Teleprompter and Playback systems",
        "Technical Director role and responsibilities",
        "Live production workflow and teamwork",
        "Complete TV program production from setup to final output",
      ],
      professionalEquipment: [
        "Multi-Camera Setup (Professional TV cameras)",
        "Vision Mixer (Video switching console)",
        "CCU (Camera Control Unit)",
        "Audio Console (Professional mixing desk)",
        "Lighting Console (Professional lighting control)",
        "Character Generator (Graphics and titles)",
        "Teleprompter systems",
        "Playback systems",
        "Professional TV studio infrastructure",
      ],
      practicalExperience: [
        "Hands-on operation of all professional TV equipment",
        "Real-time multi-camera production experience",
        "Live switching and technical direction",
        "Team-based TV program production",
        "Complete workflow from pre-production to final output",
        "Technical crew role simulation and practice",
      ],
      learningOutcomes: [
        "Understanding of multi-camera TV production workflow",
        "Proficiency in operating professional TV equipment",
        "Knowledge of Technical Director responsibilities",
        "Experience in live production environments",
        "Team collaboration skills in technical production",
        "Industry-ready skills for TV production careers",
      ],
      aboutInstructor:
        "FTII Faculty – Experienced television production professionals and technical experts from India's premier film institute with extensive expertise in multi-camera operations, live TV production, and broadcast technology.",
      targetAudience: [
        "Aspiring TV engineers and technical crew",
        "Media production enthusiasts",
        "Students interested in broadcast technology",
        "Professionals seeking TV production skills",
        "Anyone interested in behind-the-scenes TV operations",
      ],
      contactInfo: [
        "Mr. Milind Joshi - Assistant Outreach Officer",
        "Email: info.cfol@ftii.ac.in",
        "Phone: 020 – 25580085",
      ],
      additionalInfo:
        "This intensive Short Term Training Program provides real-world experience in TV production technical operations. Perfect for those interested in the technical aspects of television production, reality shows, sports broadcasting, and live events. All communication will be via email only. List of selected participants will be published on FTII website. A rare opportunity to get industry-oriented training at FTII Pune.",
    },
  },
  {
    id: 24,
    title: "FTII Pune: Basic Course in the Art of Screenwriting (Online)",
    trainer: "Vikas Sharma",
    institution: "Film and Television Institute of India (FTII)",
    location: "Online",
    state: "All India",
    date: "29 September – 10 October 2025",
    time: "10 AM – 12 PM & 1 PM – 3 PM (IST)",
    description:
      "🎬 Master the art of cinematic storytelling with FTII's comprehensive online screenwriting course. Learn foundations of storytelling, character development, screenplay structures, visual storytelling, and dialogue writing. Perfect for aspiring writers who want to craft compelling screenplays for cinema.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/ftii-online-1/basic-course-in-the-art-of-screenwriting-29-september-10-october-2025-online",
    featured: true,
    price: "₹14,000 (India), ₹42,000 (Foreign/OCI/PIO)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in special cases)",
    venue: "Online via Google Classroom & Google Meet",
    fullDetails: {
      venue: "Online via Google Classroom & Google Meet",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "10 days (Weekdays only) - 4 hours/day",
      medium: "English & Hindi",
      courseDirector: "Vikas Sharma",
      platform: "Google Classroom & Google Meet",
      eligibilityCriteria: [
        "Age: 18+ years (as of 29 September 2025)",
        "Education: Minimum 12th pass (10th pass in special cases)",
        "Nationality: Indian/Foreign/OCI/PIO",
        "Laptop/Desktop required (Mobile phones not allowed)",
      ],
      applicationDeadline: "29 August 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "Maximum 24 participants (Minimum 20 required)",
      courseFee: "₹14,000 (India), ₹42,000 (Foreign/OCI/PIO)",
      certification: "FTII Certificate upon successful completion",
      keyHighlights: [
        "Master foundations of cinematic storytelling",
        "Learn character development & character arcs",
        "Understand screenplay structures & plot building",
        "Develop visual storytelling & world-building skills",
        "Write powerful and engaging dialogue",
        "Hands-on workshops with expert feedback",
        "Develop a feature film story with strong characters, structure, and dialogue",
      ],
      curriculum: [
        "Foundations of cinematic storytelling",
        "Character development & character arcs",
        "Screenplay structures & plot building",
        "Visual storytelling & world-building techniques",
        "Writing powerful dialogue",
        "Hands-on workshops & expert feedback sessions",
        "Feature film story development",
        "Industry-standard screenplay formatting",
      ],
      learningOutcomes: [
        "Develop a complete feature film story",
        "Create compelling characters with strong arcs",
        "Master screenplay structure and plot development",
        "Write engaging and authentic dialogue",
        "Understand visual storytelling techniques",
        "Receive expert feedback on your work",
      ],
      aboutInstructor:
        "Vikas Sharma – Course Director with extensive experience in screenwriting and film education at FTII. Expert in cinematic storytelling, character development, and screenplay structure.",
      technicalRequirements: [
        "Laptop or Desktop computer (mandatory)",
        "Stable internet connection",
        "Google account for classroom access",
        "Mobile phones not allowed for participation",
      ],
      contactInfo: ["Email: info.cfol@ftii.ac.in", "Phone: 020-25580085"],
      additionalInfo:
        "This comprehensive online course is perfect for aspiring screenwriters who want to craft compelling screenplays for cinema. By the end of the course, participants will have developed a feature film story with strong characters, structure, and dialogue.",
    },
  },
  {
    id: 25,
    title: "FTII Pune: Exploring an Indian Classic – Guide (Diamond Jubilee Appreciation)",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "Chittorgarh",
    state: "Rajasthan",
    date: "03–07 November 2025",
    time: "10 AM – 6 PM (with travel/rest breaks)",
    description:
      "🎬 A once-in-a-lifetime chance to explore the iconic film 'Guide' at its original shooting locations in Udaipur & Chittorgarh. Analyze R.K. Narayan's novel vs. film adaptation, compare Hindi & English versions, and appreciate legendary songs. Walk where Waheeda ji danced, S.D. Burman composed, and Vijay Anand called 'Action!'",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/exploring-an-indian-classic-guide-a-diamond-jubilee-appreciation-03-07-november-2025",
    featured: true,
    price: "₹10,000 (+ ₹150/day accommodation + ₹150/day meals)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    venue: "Mewar University, Chittorgarh + Iconic shooting locations in Udaipur & Chittorgarh",
    fullDetails: {
      venue: "Mewar University, Chittorgarh + Iconic shooting locations in Udaipur & Chittorgarh",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "5 Days",
      medium: "English & Hindi",
      courseDirector: "Dr. Milind Damle",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Education: Minimum 12th pass (10th pass in exceptional cases)",
        "Nationality: Indian",
        "Interest in Indian cinema and literature",
      ],
      applicationDeadline: "31 August 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "Maximum 25 participants (Minimum 20 required)",
      courseFee: "₹10,000 (Non-refundable for selected participants)",
      accommodation: "₹150/day (Triple sharing at University mess)",
      meals: "₹150/day at University mess",
      certification: "FTII Certificate upon successful completion",
      keyHighlights: [
        "Visit iconic Guide shooting locations in Udaipur & Chittorgarh",
        "Analysis of R.K. Narayan's novel 'The Guide' vs. film adaptation",
        "Compare Hindi & English versions of Guide",
        "Song & scene appreciation (Piya Tose Naina Lage Re, Kaaton Se Khinch Ke Aanchal & more)",
        "Screening of both Hindi & English versions",
        "Walk where Waheeda ji danced, S.D. Burman composed, and Vijay Anand called 'Action!'",
        "Diamond Jubilee celebration of this Indian cinema classic",
      ],
      curriculum: [
        "Literary analysis of R.K. Narayan's novel 'The Guide'",
        "Film adaptation study and comparison",
        "Comparative analysis of Hindi and English versions",
        "Song appreciation and musical analysis",
        "Scene-by-scene breakdown of iconic sequences",
        "Location visits to original shooting spots",
        "Cinematography and direction techniques study",
        "Cultural impact and legacy of the film",
      ],
      locationVisits: [
        "Iconic shooting locations in Udaipur",
        "Historic sites in Chittorgarh",
        "Places where legendary scenes were filmed",
        "Locations of famous song sequences",
        "Heritage sites featured in the movie",
      ],
      filmScreenings: [
        "Complete Hindi version of Guide (1965)",
        "English version of Guide",
        "Behind-the-scenes footage (if available)",
        "Documentary materials on the making",
      ],
      aboutInstructor:
        "Dr. Milind Damle – Course Director and film scholar with extensive expertise in Indian cinema, literature adaptation, and film appreciation. Expert in analyzing the intersection of literature and cinema.",
      uniqueExperience: [
        "Once-in-a-lifetime opportunity to visit original shooting locations",
        "Immersive experience combining literature, cinema, and travel",
        "Diamond Jubilee celebration of a cinema classic",
        "Expert-guided analysis and appreciation",
        "Cultural and historical context exploration",
      ],
      contactInfo: ["Email: info.cfol@ftii.ac.in", "Phone: 020-25580085"],
      additionalInfo:
        "This unique workshop combines film appreciation, literary analysis, and cultural tourism. Participants will gain deep insights into one of Indian cinema's most celebrated films while experiencing the actual locations where movie magic was created. Perfect for film enthusiasts, literature lovers, and cultural explorers.",
    },
  },
  {
    id: 26,
    title: "FTII Pune: Basic Course in Video Editing",
    trainer: "FTII Faculty",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "20 September – 01 October 2025",
    time: "10 AM – 5 PM (lunch: 1–2 PM)",
    description:
      "🎬 Master the art and craft of video editing with FTII's comprehensive course. Learn history & principles of editing, continuity, storytelling techniques, sound basics, and hands-on editing exercises. Perfect for aspiring editors to start their journey in cinema's most crucial craft!",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-video-editing-in-pune-20-september-01-october-2025",
    featured: true,
    price: "₹18,000 (excluding food & snacks)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    venue: "Vijay Tendulkar Writer's Academy, Rambaug Colony, Near Doordarshan Kendra, Kothrud, Pune",
    fullDetails: {
      venue: "Vijay Tendulkar Writer's Academy, Rambaug Colony, Near Doordarshan Kendra, Kothrud, Pune",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "12 days (including Sundays)",
      medium: "English & Hindi",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Education: Minimum 12th pass (10th pass in exceptional cases)",
        "Nationality: Indian",
        "Interest in video editing and filmmaking",
      ],
      applicationDeadline: "29 August 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "Maximum 12 participants (Minimum 10 required)",
      courseFee: "₹18,000 (excluding food & snacks, non-refundable for selected participants)",
      certification: "FTII Certificate upon successful completion",
      keyHighlights: [
        "History & principles of editing (silent & sound era)",
        "Continuity, time & space in cinema",
        "Editing for storytelling & use of transitions",
        "Basics of sound in editing",
        "Hands-on editing exercises (ingest, cut, trim, final cut, export)",
        "Introduction to non-linear editing systems",
        "Film/video screenings & discussions",
        "Two participants share one editing machine for practical learning",
      ],
      curriculum: [
        "History and principles of editing (silent & sound era)",
        "Understanding continuity, time & space in cinema",
        "Editing techniques for effective storytelling",
        "Creative use of transitions and cuts",
        "Basics of sound design and audio editing",
        "Hands-on editing exercises and practical sessions",
        "Introduction to non-linear editing systems",
        "Project workflows and file management",
        "Compression techniques and export formats",
        "Film and video screenings with analysis",
        "Group discussions and critique sessions",
      ],
      practicalExperience: [
        "Hands-on editing exercises from ingest to final cut",
        "Real project workflows and file management",
        "Export and compression techniques",
        "Collaborative editing sessions (2 participants per machine)",
        "Film screening analysis and discussions",
      ],
      learningOutcomes: [
        "Solid foundation in both art and craft of editing",
        "Understanding of editing theory and principles",
        "Hands-on practical editing experience",
        "Confidence to approach real editing projects",
        "Knowledge of non-linear editing workflows",
        "Understanding of sound basics in post-production",
      ],
      aboutInstructor:
        "FTII Faculty – Experienced film editors and educators from India's premier film institute with expertise in video editing, post-production workflows, and cinematic storytelling techniques.",
      technicalSetup: [
        "Professional editing workstations",
        "Non-linear editing software",
        "Two participants share one editing machine",
        "Complete post-production setup",
      ],
      contactInfo: ["Email: info.cfol@ftii.ac.in", "Phone: 020-25580085"],
      additionalInfo:
        "This comprehensive course provides aspiring editors with both theoretical knowledge and practical skills needed to excel in video editing. Perfect for those looking to start their journey in cinema's most crucial craft with hands-on experience using professional editing systems.",
    },
  },
  {
    id: 27,
    title: "FTII Pune: Basic Course in Stop Motion Animation",
    trainer: "Mandar Digrajkar",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "08–18 September 2025",
    time: "10 AM – 6 PM (lunch: 1:30–2 PM)",
    description:
      "🎬 Learn the fundamentals of stop motion animation at FTII! This practice-oriented program covers animation techniques, storyboarding, model creation with armatures, and hands-on production. Work in teams to conceptualize, produce & finish your own stop-motion film while learning from FTII animation experts.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-stop-motion-animation-08-18-september-2025",
    featured: true,
    price: "₹15,000 (+ ₹3,600 for optional accommodation)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    venue: "Animation Dept., FTII Main Campus, Law College Road, Pune – 411004",
    includes: "Completed stop-motion film + FTII Certificate",
    fullDetails: {
      venue: "Animation Dept., FTII Main Campus, Law College Road, Pune – 411004",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "10 days (excluding Sundays)",
      medium: "English & Hindi",
      courseDirector: "Mandar Digrajkar (Head of Department, TV Graphics, FTII Pune)",
      eligibilityCriteria: [
        "Age: 18+ years (as of 08 September 2025)",
        "Education: HSC (12th Pass); in exceptional cases, 10th Pass may be considered",
        "Nationality: Indian",
        "Interest in animation and filmmaking",
        "No prior animation experience required - perfect for beginners",
      ],
      applicationDeadline: "20 August 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "Maximum 16 participants (Minimum 13 required)",
      courseFee: "₹15,000 (Non-refundable for selected participants)",
      accommodation: "₹3,600 (₹300/day for 12 days, triple sharing at Kothrud campus – 5 km from FTII)",
      certification: "FTII Certificate + completed stop-motion film project",
      keyHighlights: [
        "Learn fundamentals of stop motion animation from scratch",
        "Introduction to animation techniques, tools & professional workflows",
        "Storyboarding and animatics creation",
        "Model and rig creation with armatures",
        "Applying movement principles and animation fundamentals",
        "Hands-on production: capture, edit, add VFX & sound",
        "Film screenings & guided discussions for deeper understanding",
        "Work in teams to create a complete short stop-motion film",
        "Practice-oriented program with expert guidance",
        "Perfect entry point into animation filmmaking",
      ],
      curriculum: [
        "Fundamentals of stop motion animation",
        "Animation techniques and principles",
        "Professional animation tools and workflows",
        "Storyboarding and pre-production planning",
        "Animatics creation and timing",
        "Model creation and character design",
        "Armature building and rigging techniques",
        "Movement principles and animation physics",
        "Frame-by-frame animation capture",
        "Post-production: editing, VFX, and sound design",
        "Team collaboration in animation production",
        "Film analysis through screenings and discussions",
      ],
      practicalExperience: [
        "Hands-on model creation with professional materials",
        "Frame-by-frame animation capture using professional equipment",
        "Complete film production from concept to final output",
        "Team-based collaborative animation project",
        "Professional post-production workflow experience",
        "Real animation studio environment training",
      ],
      learningOutcomes: [
        "Solid foundation in stop motion animation principles",
        "Practical skills in model making and armature creation",
        "Understanding of animation workflows and production pipeline",
        "Experience in team-based animation production",
        "Completed stop-motion film to showcase skills",
        "Confidence to pursue further animation projects",
        "Industry-ready knowledge of animation techniques",
      ],
      aboutInstructor:
        "Mandar Digrajkar – Head of Department, TV Graphics at FTII Pune. Expert animator and educator with extensive experience in stop motion animation, visual effects, and animation production. Brings professional industry knowledge and academic expertise to guide students through the complete animation process.",
      technicalSetup: [
        "Professional animation capture equipment",
        "Model-making materials and tools",
        "Armature building supplies",
        "Professional lighting setup",
        "Post-production editing facilities",
        "Animation software and workstations",
      ],
      targetAudience: [
        "Beginners wanting to enter animation filmmaking",
        "Artists interested in stop motion techniques",
        "Students exploring animation as a career",
        "Filmmakers wanting to add animation skills",
        "Creative professionals seeking new mediums",
      ],
      contactInfo: [
        "Mr. Milind Joshi - Assistant Outreach Officer",
        "Email: info.cfol@ftii.ac.in",
        "Phone: 020 – 25580085",
      ],
      additionalInfo:
        "This practice-oriented program is perfect for beginners wanting to enter the world of animation filmmaking. Participants will conceptualize, produce, and finish their own stop-motion film while learning the art and craft of animation from FTII experts. The course combines theoretical knowledge with extensive hands-on practice, ensuring participants gain both understanding and practical skills in stop motion animation.",
    },
  },
  {
    id: 28,
    title: "FTII Pune: Foundation Course in Filmmaking (in collaboration with Arthouse Film Academy, Goa)",
    trainer: "Avinash Roy & Jasmine Kaur Roy",
    institution: "Film and Television Institute of India (FTII)",
    location: "Saligao, Goa",
    state: "Goa",
    date: "07–27 September 2025",
    time: "10 AM – 5 PM (lunch: 1–2 PM)",
    description:
      "🎬 Learn the complete art & craft of filmmaking with FTII in collaboration with Arthouse Film Academy, Goa! This comprehensive 20-day foundation course covers screenwriting, film grammar, direction, cinematography, sound design, and post-production. Create short films from ideation to execution under guidance of National Award-winning FTII alumni filmmakers.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/foundation-course-in-filmmaking-in-goa-07-27-september-2025",
    featured: true,
    price: "₹39,000 (excluding food & accommodation)",
    contact: "020-25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+, 12th pass (10th in exceptional cases)",
    venue: "Saligao, Goa (in collaboration with Arthouse Film Academy)",
    includes: "Completed short films + FTII Certificate + practical workshops",
    fullDetails: {
      venue: "Saligao, Goa (in collaboration with Arthouse Film Academy)",
      organizer:
        "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL) in collaboration with Arthouse Film Academy, Goa",
      duration: "20 days",
      medium: "English & Hindi",
      courseDirector:
        "Avinash Roy & Jasmine Kaur Roy (National Award-winning filmmakers, FTII alumni, founders of Wanderlust Films)",
      eligibilityCriteria: [
        "Age: 18+ years (as of 07 September 2025)",
        "Education: HSC (12th Pass); in exceptional cases, 10th Pass may be considered",
        "Nationality: Indian",
        "Interest in filmmaking and cinema",
        "No prior filmmaking experience required - perfect for beginners",
      ],
      applicationDeadline: "20 August 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "Maximum 20 participants (Minimum 15 required)",
      courseFee: "₹39,000 (excluding food & accommodation, non-refundable for selected participants)",
      certification: "FTII Certificate + completed short film projects",
      keyHighlights: [
        "Comprehensive 20-day foundation course in filmmaking",
        "Learn from National Award-winning FTII alumni filmmakers",
        "Screenwriting fundamentals: story, character, structure, scene design",
        "Film grammar: continuity, montage, mise-en-scène",
        "Basics of lensing, lighting & working with cinematographers",
        "Direction: recce, shoot & edit complete workflow",
        "Sound design & post-production techniques",
        "Final project: group exercise short films from ideation to execution",
        "Practical workshops, assignments & curated film screenings",
        "Beautiful Goa location for immersive learning experience",
      ],
      curriculum: [
        "Screenwriting fundamentals and story development",
        "Character creation and development techniques",
        "Screenplay structure and scene design",
        "Film grammar: continuity, montage, mise-en-scène",
        "Cinematography basics: lensing and lighting",
        "Working effectively with cinematographers",
        "Direction techniques and workflow",
        "Location scouting (recce) and pre-production",
        "Shooting techniques and on-set management",
        "Editing principles and post-production workflow",
        "Sound design and audio post-production",
        "Short film production from concept to completion",
        "Film analysis through curated screenings",
        "Industry practices and professional workflows",
      ],
      practicalExperience: [
        "Hands-on short film production from ideation to execution",
        "Group exercise filmmaking projects",
        "Real location shooting experience in Goa",
        "Complete post-production workflow practice",
        "Collaborative filmmaking with fellow participants",
        "Professional equipment handling and operation",
      ],
      learningOutcomes: [
        "Solid foundation in all aspects of filmmaking",
        "Practical experience in writing, directing, shooting & editing",
        "Completed short film projects to showcase skills",
        "Understanding of professional filmmaking workflows",
        "Confidence to pursue independent filmmaking projects",
        "Industry-ready knowledge of film production",
        "Network with fellow aspiring filmmakers",
      ],
      aboutInstructor:
        "Avinash Roy & Jasmine Kaur Roy – National Award-winning filmmakers, FTII alumni, and founders of Wanderlust Films. With extensive experience in independent cinema and film education, they bring both artistic vision and practical industry knowledge to guide students through the complete filmmaking process. Their award-winning work and FTII background ensure participants receive world-class training in cinematic storytelling.",
      uniqueExperience: [
        "Learn in the beautiful and inspiring location of Goa",
        "Collaboration between prestigious FTII and Arthouse Film Academy",
        "Guidance from National Award-winning filmmakers",
        "Immersive 20-day intensive filmmaking experience",
        "Small batch size ensuring personalized attention",
        "Complete filmmaking journey from script to screen",
      ],
      targetAudience: [
        "Beginners looking to step into filmmaking",
        "Aspiring directors and screenwriters",
        "Students interested in cinema and storytelling",
        "Creative professionals seeking filmmaking skills",
        "Anyone passionate about visual storytelling",
      ],
      contactInfo: [
        "Mr. Milind Joshi - Assistant Outreach Officer",
        "Email: info.cfol@ftii.ac.in",
        "Phone: 020 – 25580085",
      ],
      additionalInfo:
        "This comprehensive foundation course is perfect for beginners looking to step into filmmaking with guidance from award-winning FTII alumni. The course combines theoretical knowledge with extensive hands-on practice in the beautiful setting of Goa, ensuring participants gain both understanding and practical skills in all aspects of filmmaking. The collaboration between FTII and Arthouse Film Academy provides a unique learning environment that bridges academic excellence with creative innovation.",
    },
  },
  {
    id: 29,
    title: "NSD Delhi: Sunday Club Part-I (2025–26) - Children's Theatre Workshop",
    trainer: "Sanskaar Rang Toli (T.I.E. Company)",
    institution: "National School of Drama (NSD)",
    location: "New Delhi",
    state: "Delhi",
    date: "Last week of August 2025 – January 2026",
    time: "Saturdays & Sundays + Daily sessions during Winter Vacation",
    description:
      "🎭 A unique opportunity for children aged 8-17 to learn theatre at India's premier drama institution! This extension of NSD's Summer Theatre Workshop focuses on devising performances through improvisation, play-making, and collaborative theatre. Culminates in a Festival of Devised Performances in January 2026.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://nsd.gov.in",
    featured: true,
    price: "₹8,000 (General), ₹2,000 (SC/ST/OBC/EWS), Free (BPL) + ₹150 processing fee",
    contact: "NSD Campus, New Delhi",
    email: "Via NSD website",
    eligibility: "Children aged 8-17 years (must have participated in NSD Summer Theatre Workshop)",
    venue: "NSD Campus or other designated spaces in Delhi",
    includes: "Festival of Devised Performances + NSD Certificate",
    fullDetails: {
      venue: "NSD Campus or other designated spaces in Delhi",
      organizer: "National School of Drama (NSD), New Delhi - Sanskaar Rang Toli (T.I.E. Company)",
      duration: "5 months (August 2025 – January 2026)",
      medium: "Hindi & English",
      courseDirector: "Sanskaar Rang Toli (Theatre in Education Company)",
      eligibilityCriteria: [
        "Age: 8-17 years (as on 15 August 2025)",
        "Must have participated in Summer Theatre Workshop conducted by NSD T.I.E. Company",
        "Interest in theatre and performance arts",
        "Commitment to attend regular sessions",
      ],
      applicationDeadline: "25 August 2025, 6:00 PM",
      applicationStart: "15 August 2025, 10:00 AM",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "Limited seats available",
      courseFee:
        "₹8,000 (General), ₹2,000 (SC/ST/OBC NCL/EWS with valid certificate after 01 Apr 2022), Free (BPL with valid certificate)",
      processingFee: "₹150 (all applicants, non-refundable)",
      certification: "NSD Certificate + participation in Festival of Devised Performances",
      keyHighlights: [
        "Extension of NSD's renowned Summer Theatre Workshop",
        "Children explore devising performances through improvisation",
        "Training in play-making, performance, and collaborative theatre",
        "Regular sessions on Saturdays & Sundays",
        "Intensive daily sessions during Winter Vacation (December-January)",
        "Culmination in Festival of Devised Performances (January 2026)",
        "Learn from India's premier drama institution",
        "Unique opportunity for children to create original performances",
        "Develop confidence, creativity, and collaborative skills",
        "Professional theatre training adapted for young learners",
      ],
      curriculum: [
        "Theatre improvisation techniques",
        "Devising original performances",
        "Play-making and script development",
        "Collaborative theatre creation",
        "Performance skills and stage presence",
        "Voice and movement training",
        "Character development and storytelling",
        "Creative expression through drama",
        "Team building through theatre",
        "Preparation for festival performances",
      ],
      practicalExperience: [
        "Regular improvisation and devising sessions",
        "Collaborative creation of original performances",
        "Intensive workshop sessions during winter vacation",
        "Preparation and rehearsal for festival performances",
        "Performance experience in Festival of Devised Performances",
        "Working with professional theatre educators",
      ],
      learningOutcomes: [
        "Develop confidence in performance and public speaking",
        "Learn collaborative creative processes",
        "Understand theatre-making from concept to performance",
        "Build improvisation and creative thinking skills",
        "Experience professional theatre training methods",
        "Create and perform original theatrical works",
        "Develop artistic expression and creativity",
      ],
      aboutInstructor:
        "Sanskaar Rang Toli (T.I.E. Company) – National School of Drama's Theatre in Education company with extensive experience in children's theatre education. Expert educators and theatre practitioners specializing in age-appropriate theatre training that combines learning with creative expression.",
      uniqueExperience: [
        "Learn at India's most prestigious drama institution",
        "Extension of the famous NSD Summer Theatre Workshop",
        "Focus on original creation rather than traditional plays",
        "Culmination in a dedicated festival showcase",
        "Professional theatre training adapted for children",
        "Long-term program building skills over 5 months",
      ],
      targetAudience: [
        "Children aged 8-17 years with theatre interest",
        "Previous participants of NSD Summer Theatre Workshop",
        "Young aspiring actors and performers",
        "Children interested in creative expression",
        "Students seeking confidence building through arts",
      ],
      contactInfo: ["Apply online: nsd.gov.in or sundayclubtie.nsd.gov.in", "National School of Drama, New Delhi"],
      additionalInfo:
        "This unique program offers children a rare opportunity to learn theatre at India's premier drama institution. As an extension of NSD's Summer Theatre Workshop, it provides continuity in theatre education while focusing on the creative process of devising original performances. The program culminates in a Festival of Devised Performances, giving children the chance to showcase their creative work. Fee is non-refundable and admission is strictly on first-come, first-served basis with limited seats available.",
    },
  },
  {
    id: 30,
    title: "Improv Theatre Workshop by White Board – Bengaluru",
    trainer: "White Board Theatre Group",
    institution: "White Board Theatre Group",
    location: "Bengaluru",
    state: "Karnataka",
    date: "23 & 24 August 2025",
    time: "9:00 AM – 2:00 PM",
    description:
      "🎭 Beginner or experienced — this is for anyone ready to break habits and try something new. Even trained actors will find improv like learning a fresh dance form. Unlearn. Go deeper. Feel the freedom. Learn core tools of improv, devising through collaboration, mind & body prep, ensemble thinking, and the difference between acting vs improv.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfN161-59dE3oo0wuVc2EwWNQ2T5FXmwVoVuQOTjcTK_nivRA/viewform",
    featured: true,
    price: "₹2,999 (Early Bird: ₹2,499, Student: ₹2,199)",
    contact: "Via registration form",
    email: "Via Instagram @whit.eboard",
    eligibility: "Open to all - beginners and experienced actors welcome",
    venue: "Obeya Nest, HSR Layout, Bengaluru",
    includes: "Complete improv training + performance techniques",
    fullDetails: {
      venue: "Obeya Nest, HSR Layout, Bengaluru",
      organizer: "White Board Theatre Group",
      duration: "2 days (Weekend Workshop)",
      medium: "English & Hindi",
      eligibilityCriteria: [
        "Open to all - beginners and experienced actors welcome",
        "No prior improv experience required",
        "Perfect for trained actors wanting to explore new techniques",
        "Suitable for anyone ready to break habits and try something new",
      ],
      courseFee: "₹2,999 (Regular), ₹2,499 (Early Bird - 2 slots only), ₹2,199 (Student with valid ID - 2 slots only)",
      keyHighlights: [
        "Suitable for both beginners and experienced actors",
        "Learn improv like a fresh dance form",
        "Break habits and discover new creative freedom",
        "Core tools of improv: listening, reacting, scene-building",
        "Devising through improv for collaborative performances",
        "Mind & body preparation with warm-ups and breathwork",
        "Ensemble thinking: rhythm, trust & teamwork",
        "Voice, expression & gibberish techniques",
        "Understanding the difference between acting vs improv",
        "Focus on presence, spontaneity & truth on stage",
      ],
      curriculum: [
        "Core Tools of Improv: Listening, reacting, scene-building",
        "Devising Through Improv: Create performances collaboratively",
        "Mind & Body Prep: Warm-ups, breathwork, emotional awareness",
        "Ensemble Thinking: Learn rhythm, trust & teamwork",
        "Voice, Expression & Gibberish: Break blocks through vocal & physical play",
        "Acting vs Improv: Presence, spontaneity & truth on stage",
        "Scene-building and collaborative creation",
        "Breaking creative blocks and habits",
        "Spontaneous performance techniques",
        "Trust-building exercises and ensemble work",
      ],
      learningOutcomes: [
        "Master core improv tools and techniques",
        "Develop spontaneous performance skills",
        "Build confidence in collaborative creation",
        "Enhance listening and reaction abilities",
        "Break through creative blocks and habits",
        "Understand ensemble thinking and teamwork",
        "Improve voice and physical expression",
        "Experience the freedom of unscripted performance",
      ],
      aboutInstructor:
        "White Board Theatre Group – A dynamic theatre collective based in Bengaluru, specializing in improvisational theatre and collaborative performance creation. Known for their innovative approach to breaking conventional acting habits and fostering creative freedom through improv techniques.",
      uniqueExperience: [
        "Learn improv like discovering a fresh dance form",
        "Perfect for both complete beginners and trained actors",
        "Focus on unlearning habits and going deeper",
        "Experience true creative freedom through spontaneity",
        "Collaborative and supportive learning environment",
        "Weekend intensive format for maximum impact",
      ],
      targetAudience: [
        "Complete beginners interested in improv theatre",
        "Experienced actors wanting to explore new techniques",
        "Anyone ready to break creative habits",
        "Performers seeking spontaneity and freedom",
        "Theatre enthusiasts interested in collaborative creation",
      ],
      contactInfo: [
        "Registration: Via Google Form",
        "Instagram: @whit.eboard",
        "Website: https://www.instagram.com/whit.eboard?igsh=MTQxZmF1MGsxcHk5NA==",
      ],
      additionalInfo:
        "This intensive weekend workshop is designed for anyone ready to explore the liberating world of improvisational theatre. Whether you're a complete beginner or a trained actor, you'll discover improv as a fresh creative medium that breaks conventional habits and opens new pathways to authentic performance. The workshop emphasizes collaborative creation, spontaneity, and the unique freedom that comes from unscripted performance.",
    },
  },
  {
    id: 31,
    title: "Educational Theatre National Workshop – IIET, Mysore",
    trainer: "Rajneesh Bisht",
    institution: "Indian Institute of Educational Theatre (IIET)",
    location: "Mysore",
    state: "Karnataka",
    date: "6 – 15 October 2025",
    time: "Full day sessions",
    description:
      "🎭 A comprehensive 10-day workshop for actors & educators by renowned theatre director Rajneesh Bisht. Develop acting skills, confidence & teamwork through improvisation, empathy & communication training. Learn theatre as a tool for student growth and innovative classroom management strategies.",
    image: "/images/iiet-logo.png",
    registrationLink: "https://www.indiantheatrefoundation.org/theatre-in-education-workshop/",
    featured: true,
    price: "₹16,000 (includes accommodation + 2 meals/day)",
    contact: "Via registration link",
    email: "Via IIET website",
    eligibility: "Open to actors and educators",
    venue: "Indian Institute of Educational Theatre, Hardwicke School, JLB Road, Mysore",
    includes: "Accommodation + 2 meals/day + Tea/Coffee + Workshop materials",
    fullDetails: {
      venue: "Indian Institute of Educational Theatre, Hardwicke School, JLB Road, Mysore",
      organizer: "Indian Institute of Educational Theatre (IIET), Mysore",
      duration: "10 days",
      medium: "English & Hindi",
      courseDirector: "Rajneesh Bisht (Renowned Theatre Director & Writer)",
      accommodation: "Youth Hostel, Saraswathipuram, Mysore",
      eligibilityCriteria: [
        "Open to actors seeking to develop their craft",
        "Educators interested in theatre-based teaching methods",
        "Theatre enthusiasts wanting to learn educational applications",
        "No prior theatre experience required for educators",
        "Commitment to attend all 10 days of the workshop",
      ],
      courseFee: "₹16,000 (includes accommodation + 2 meals/day for 10 days)",
      certification: "IIET Certificate upon successful completion",
      keyHighlights: [
        "Comprehensive 10-day intensive workshop",
        "Led by renowned theatre director Rajneesh Bisht",
        "Dual focus: acting skills + educational theatre techniques",
        "Special 3-day acting sessions by Prasanna Sir",
        "Theatre as a tool for student growth and development",
        "Innovative classroom management through theatre practices",
        "Improvisation, empathy & communication training",
        "Self-expression and audience connection techniques",
        "Accommodation and meals included in fee",
        "Separate dorms for men and women",
      ],
      curriculum: [
        "Fundamentals of acting and performance",
        "Theatre techniques for confidence building",
        "Improvisation and spontaneous performance",
        "Empathy development through role-playing",
        "Communication skills enhancement",
        "Self-expression and creative freedom",
        "Audience connection and engagement techniques",
        "Theatre as an educational tool",
        "Classroom management through drama",
        "Innovative teaching strategies using theatre",
        "Student engagement through performance",
        "Creative learning methodologies",
      ],
      practicalExperience: [
        "Hands-on acting workshops and exercises",
        "Improvisation sessions and group activities",
        "Educational theatre demonstrations",
        "Classroom simulation using theatre techniques",
        "Performance practice and feedback sessions",
        "Collaborative learning through group work",
      ],
      learningOutcomes: [
        "Enhanced acting skills and stage confidence",
        "Improved teamwork and collaboration abilities",
        "Advanced improvisation and spontaneous performance skills",
        "Better empathy and communication capabilities",
        "Effective self-expression techniques",
        "Strong audience connection and engagement skills",
        "Understanding of theatre as educational methodology",
        "Innovative classroom management strategies",
        "Creative approaches to student engagement",
        "Practical skills for implementing theatre in education",
      ],
      aboutInstructor:
        "Rajneesh Bisht – Renowned Theatre Director & Writer with extensive experience in both performance and educational theatre. Known for innovative approaches to theatre education and student engagement. Expert in combining traditional acting techniques with modern educational methodologies. Prasanna Sir will conduct special 3-day acting sessions, bringing additional expertise in performance training.",
      accommodationDetails: [
        "Stay at Youth Hostel, Saraswathipuram, Mysore",
        "Separate dormitories for men and women",
        "Breakfast provided at Youth Hostel",
        "Lunch provided at IIET venue",
        "Dinner to be managed individually by participants",
        "Tea/Coffee served in morning and during sessions",
        "Transport cost from hostel to venue borne by participants",
      ],
      workshopPolicies: [
        "Smoking and alcohol strictly prohibited",
        "Attendance required for all 10 days",
        "Participants responsible for hostel to venue transport",
        "Professional conduct expected at all times",
        "Active participation encouraged in all sessions",
      ],
      uniqueExperience: [
        "Learn from renowned theatre director Rajneesh Bisht",
        "Special acting sessions by expert Prasanna Sir",
        "Comprehensive approach covering both acting and education",
        "Immersive 10-day intensive experience",
        "Historic Mysore location with rich cultural heritage",
        "Combination of traditional and modern theatre techniques",
      ],
      targetAudience: [
        "Aspiring and professional actors",
        "Teachers and educators",
        "Theatre enthusiasts and practitioners",
        "Students interested in performance arts",
        "Anyone interested in theatre-based education",
      ],
      contactInfo: [
        "Registration: https://www.indiantheatrefoundation.org/theatre-in-education-workshop/",
        "Instagram: @iietmysuru",
        "Website: https://www.instagram.com/iietmysuru?igsh=NHdqZ2FsdmEwdTZ3",
      ],
      additionalInfo:
        "This comprehensive workshop offers a unique opportunity to learn from renowned theatre professionals while exploring the intersection of performance and education. The program is designed to benefit both actors seeking to enhance their craft and educators looking to incorporate theatre techniques into their teaching practice. The inclusive fee covers accommodation and meals, making it accessible for participants from various backgrounds.",
    },
  },
  {
    id: 32,
    title: "🎭 Workshop: Introduction to Playback Theatre",
    trainer: "Threads & Tales",
    institution: "Threads & Tales",
    location: "Bengaluru",
    state: "Karnataka",
    date: "September 13–14",
    time: "10:00 a.m. – 6:00 p.m.",
    description:
      "🎭 Discover the transformative power of Playback Theatre! This immersive workshop focuses on Stories, Connection, Improvisation, and Creative Expression. Learn to create spontaneous theatre from real-life stories shared by audience members. Perfect for actors, storytellers, and anyone interested in the intersection of theatre and human connection.",
    image: "/images/threads-tales-logo.png",
    registrationLink: "https://wa.me/919886294444",
    featured: true,
    price: "₹5,500 (including lunch)",
    contact: "WhatsApp 9886294444",
    email: "Contact via WhatsApp",
    eligibility: "Open to all - beginners and experienced performers welcome",
    venue: "Bhandutvas, Domlur, Bengaluru",
    includes: "Workshop materials + Lunch both days",
    highlights: ["Stories", "Connection", "Improvisation", "Creative Expression"],
    fullDetails: {
      venue: "Bhandutvas, Domlur, Bengaluru",
      organizer: "Threads & Tales",
      duration: "2 days",
      medium: "English",
      courseDirector: "Threads & Tales Team",
      accommodation: "Not provided",
      eligibilityCriteria: [
        "Open to all",
        "No prior theatre experience required",
        "Suitable for beginners and experienced performers",
      ],
      courseFee: "₹5,500 (including lunch both days)",
      certification: "Certificate of participation",
      keyHighlights: [
        "Introduction to Playback Theatre methodology",
        "Stories as the foundation of performance",
        "Building authentic connections through theatre",
        "Improvisation techniques and spontaneous performance",
        "Creative expression through movement and voice",
        "Audience interaction and community building",
        "Therapeutic aspects of storytelling",
        "Ensemble work and collaboration",
      ],
      curriculum: [
        "Fundamentals of Playback Theatre",
        "The art of listening to stories",
        "Spontaneous improvisation techniques",
        "Movement and gesture in storytelling",
        "Voice and sound in Playback Theatre",
        "Creating safe spaces for sharing",
        "Ensemble building and trust exercises",
        "Performance techniques for real stories",
      ],
      practicalExperience: [
        "Hands-on Playback Theatre exercises",
        "Story sharing and listening practice",
        "Improvisation based on real stories",
        "Movement and voice workshops",
        "Group performance sessions",
        "Feedback and reflection circles",
      ],
      learningOutcomes: [
        "Understanding of Playback Theatre principles",
        "Enhanced listening and empathy skills",
        "Improved improvisation abilities",
        "Better storytelling and performance skills",
        "Increased confidence in spontaneous expression",
        "Deeper appreciation for human stories and connection",
      ],
      aboutInstructor:
        "Threads & Tales is a theatre collective dedicated to exploring the intersection of storytelling, community, and performance. They specialize in Playback Theatre and other forms of interactive, community-based theatre.",
      accommodationDetails: ["Accommodation not provided", "Participants need to arrange their own stay"],
      workshopPolicies: [
        "Punctuality expected for all sessions",
        "Active participation encouraged",
        "Respectful listening during story sharing",
        "Mobile phones to be kept on silent during sessions",
      ],
      uniqueExperience: [
        "Learn the unique art form of Playback Theatre",
        "Experience the power of spontaneous storytelling",
        "Connect with fellow participants through shared stories",
        "Develop skills in improvisation and creative expression",
      ],
      targetAudience: [
        "Actors and theatre practitioners",
        "Storytellers and writers",
        "Counselors and therapists",
        "Community workers and facilitators",
        "Anyone interested in human stories and connection",
      ],
      contactInfo: ["WhatsApp: 9886294444", "Registration and details via WhatsApp only"],
      additionalInfo:
        "This workshop offers a unique opportunity to learn Playback Theatre, a form of improvisational theatre where audience members share personal stories that are then spontaneously enacted by performers. The workshop emphasizes the therapeutic and community-building aspects of storytelling through theatre.",
    },
  },
]

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Calendar, MapPin, GraduationCap, CheckCircle, Clock } from "lucide-react"

interface WorkshopDetailContentProps {
  id: number
}

function WorkshopDetailContent({ id }: WorkshopDetailContentProps) {
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
    if (workshop.institution === "Threads & Tales") {
      return "/images/threads-tales-logo.png"
    }
    return workshop.image || "/images/acting-workshop.png"
  }

  const detailImageSrc = getDetailImageSource()
  const isParadoxStudios = workshop.institution === "Paradox Studios"
  const isIIET = workshop.institution === "Indian Institute of Educational Theatre (IIET)"
  const isThreadsTales = workshop.institution === "Threads & Tales"
  const isNSD = workshop.institution === "National School of Drama (NSD)"

  return (
    <div className="container py-6 md:py-12">
      <Link href="/workshops" className="inline-flex items-center text-primary hover:underline mb-4 md:mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Workshops
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="relative h-48 md:h-64 w-full">
          <div
            className={`absolute inset-0 ${isParadoxStudios || isThreadsTales ? "bg-white" : isIIET ? "bg-gray-900" : isNSD ? "bg-gradient-to-br from-orange-100 to-red-100" : "bg-gray-900"}`}
          >
            <Image
              src={detailImageSrc || "/placeholder.svg"}
              alt={workshop.title}
              fill
              className={`${isParadoxStudios || isThreadsTales ? "object-contain p-6" : isIIET ? "object-contain p-8" : isNSD ? "object-cover" : "object-cover"}`}
              sizes="100vw"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=400&width=800&text=Workshop+Image"
              }}
            />
          </div>
          <div
            className={`absolute inset-0 ${isParadoxStudios || isThreadsTales ? "bg-gradient-to-t from-black/60 via-transparent to-transparent" : isIIET ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent" : isNSD ? "bg-gradient-to-t from-black/70 via-black/30 to-transparent" : "bg-gradient-to-t from-black/80 via-black/30 to-transparent"}`}
          ></div>
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-primary text-sm font-bold px-4 py-2 rounded-full flex items-center gap-2 shadow-sm">
            <CheckCircle className="h-4 w-4" />
            Verified Workshop
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 text-white">
            <p className="text-sm md:text-base font-medium mb-2">
              {workshop.id === 30 ? (
                <Link
                  href="https://www.instagram.com/whit.eboard?igsh=MTQxZmF1MGsxcHk5NA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 underline transition-colors"
                >
                  {workshop.institution}
                </Link>
              ) : workshop.id === 31 ? (
                <Link
                  href="https://www.instagram.com/iietmysuru?igsh=NHdqZ2FsdmEwdTZ3"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 underline transition-colors"
                >
                  {workshop.institution}
                </Link>
              ) : workshop.id === 32 ? (
                <span className="text-white">{workshop.institution}</span>
              ) : workshop.id === 33 ? (
                <Link
                  href="https://nsd.gov.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-orange-200 underline transition-colors"
                >
                  {workshop.institution}
                </Link>
              ) : (
                workshop.institution
              )}
            </p>
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

              {(workshop.id === 23 ||
                workshop.id === 24 ||
                workshop.id === 25 ||
                workshop.id === 26 ||
                workshop.id === 27 ||
                workshop.id === 28) && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-blue-800">Privacy & Attribution Notice</h3>
                      <div className="mt-2 text-sm text-blue-700">
                        <p>
                          🔒 Note: This listing is shared for educational purposes only. All credits and copyrights
                          belong to FTII. AbhinayPath does not collect or share your data for this post. For application
                          and details, always refer to the official FTII website.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {workshop.id === 29 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-orange-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-orange-800">Privacy & Attribution Notice</h3>
                      <div className="mt-2 text-sm text-orange-700">
                        <p>
                          🔒 Note: This listing is shared for educational purposes only. All credits and copyrights
                          belong to National School of Drama (NSD). AbhinayPath does not collect or share your data for
                          this post. For application and details, always refer to the official NSD website.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {workshop.id === 30 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Privacy & Attribution Notice</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>
                          🔒 Note: This listing is shared for educational purposes only. All credits and copyrights
                          belong to White Board Theatre Group. AbhinayPath does not collect or share your data for this
                          post. For application and details, always refer to the official White Board Theatre Group
                          channels.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {workshop.id === 31 && (
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-purple-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-purple-800">Privacy & Attribution Notice</h3>
                      <div className="mt-2 text-sm text-purple-700">
                        <p>
                          🔒 Note: This listing is shared for educational purposes only. All credits and copyrights
                          belong to Indian Institute of Educational Theatre (IIET). AbhinayPath does not collect or
                          share your data for this post. For application and details, always refer to the official IIET
                          website and registration link.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {workshop.id === 32 && (
                <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-teal-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-teal-800">Privacy & Attribution Notice</h3>
                      <div className="mt-2 text-sm text-teal-700">
                        <p>
                          🔒 Note: This listing is shared for educational purposes only. All credits and copyrights
                          belong to Threads & Tales. AbhinayPath does not collect or share your data for this post. For
                          registration and details, contact via WhatsApp as provided.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {workshop.id === 33 && (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-orange-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 616 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-orange-800">Privacy & Attribution Notice</h3>
                      <div className="mt-2 text-sm text-orange-700">
                        <p>
                          🔒 Note: This listing is shared for educational purposes only. All credits and copyrights
                          belong to National School of Drama (NSD). AbhinayPath does not collect or share your data for
                          this post. For application and details, always refer to the official NSD website.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {workshop.highlights && (
                <div>
                  <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Workshop Highlights</h3>
                  <div className="flex flex-wrap gap-2">
                    {workshop.highlights.map((highlight: string, index: number) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {workshop.fullDetails && (
                <div className="space-y-6">
                  {workshop.fullDetails.curriculum && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">
                        {workshop.id === 15 || workshop.id === 16 ? "Curriculum" : "Workshop Curriculum"}
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

                  {workshop.fullDetails.courseStructure && workshop.id === 33 && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Course Structure</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.courseStructure.map((item: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-orange-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.fullDetails.whyChooseNSD && workshop.id === 33 && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Why Choose NSD Mumbai?</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.whyChooseNSD.map((reason: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{reason}</span>
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

                  {workshop.fullDetails.learningOutcomes && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Learning Outcomes</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.learningOutcomes.map((outcome: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{outcome}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.fullDetails.locationVisits && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Location Visits</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.locationVisits.map((location: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{location}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.fullDetails.filmScreenings && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Film Screenings</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.filmScreenings.map((screening: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{screening}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.id === 15 && workshop.fullDetails.description && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Description</h3>
                      <p className="text-gray-700 leading-relaxed">{workshop.fullDetails.description}</p>
                    </div>
                  )}

                  {workshop.id === 16 && workshop.fullDetails.aboutInstructor && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">About the Instructor</h3>
                      <p className="text-gray-700 leading-relaxed">{workshop.fullDetails.aboutInstructor}</p>
                    </div>
                  )}

                  {(workshop.id === 24 ||
                    workshop.id === 25 ||
                    workshop.id === 26 ||
                    workshop.id === 27 ||
                    workshop.id === 28 ||
                    workshop.id === 29 ||
                    workshop.id === 30 ||
                    workshop.id === 31 ||
                    workshop.id === 32 ||
                    workshop.id === 33) &&
                    workshop.fullDetails.aboutInstructor && (
                      <div>
                        <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">
                          {workshop.id === 29
                            ? "About the Program"
                            : workshop.id === 30
                              ? "About the Theatre Group"
                              : workshop.id === 32
                                ? "About Threads & Tales"
                                : workshop.id === 33
                                  ? "About NSD Faculty"
                                  : "About the Course Director"}
                        </h3>
                        {workshop.id === 30 ? (
                          <p className="text-gray-700 leading-relaxed">
                            <Link
                              href="https://www.instagram.com/whit.eboard?igsh=MTQxZmF1MGsxcHk5NA=="
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:text-primary/80 underline font-medium"
                            >
                              White Board Theatre Group
                            </Link>
                            {
                              " – A dynamic theatre collective based in Bengaluru, specializing in improvisational theatre and collaborative performance creation. Known for their innovative approach to breaking conventional acting habits and fostering creative freedom through improv techniques."
                            }
                          </p>
                        ) : (
                          <p className="text-gray-700 leading-relaxed">{workshop.fullDetails.aboutInstructor}</p>
                        )}
                      </div>
                    )}

                  {workshop.fullDetails.technicalRequirements && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Technical Requirements</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.technicalRequirements.map((requirement: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{requirement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.fullDetails.uniqueExperience && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Unique Experience</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.uniqueExperience.map((experience: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{experience}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.fullDetails.accommodationDetails && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Accommodation Details</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.accommodationDetails.map((detail: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{detail}</span>
                            <span className="text-gray-700">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.fullDetails.workshopPolicies && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Workshop Policies</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.workshopPolicies.map((policy: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{policy}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {(workshop.id === 23 ||
                    workshop.id === 24 ||
                    workshop.id === 25 ||
                    workshop.id === 26 ||
                    workshop.id === 27 ||
                    workshop.id === 28 ||
                    workshop.id === 29 ||
                    workshop.id === 30 ||
                    workshop.id === 31 ||
                    workshop.id === 32 ||
                    workshop.id === 33) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {workshop.fullDetails.applicationDeadline && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Application Deadline</h4>
                          <p className="text-gray-700 text-sm">{workshop.fullDetails.applicationDeadline}</p>
                        </div>
                      )}
                      {workshop.fullDetails.auditionDate && workshop.id === 33 && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Audition Date</h4>
                          <p className="text-gray-700 text-sm">{workshop.fullDetails.auditionDate}</p>
                        </div>
                      )}
                      {workshop.fullDetails.courseBegins && workshop.id === 33 && (
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Course Begins</h4>
                          <p className="text-gray-700 text-sm">{workshop.fullDetails.courseBegins}</p>
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
                    <GraduationCap className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">
                        {workshop.id === 24 ||
                        workshop.id === 25 ||
                        workshop.id === 26 ||
                        workshop.id === 27 ||
                        workshop.id === 28 ||
                        workshop.id === 30 ||
                        workshop.id === 31 ||
                        workshop.id === 32 ||
                        workshop.id === 33
                          ? "Organizer"
                          : workshop.id === 29
                            ? "Program"
                            : "Trainer"}
                      </p>
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
                        : workshop.id === 29
                          ? "bg-orange-600 hover:bg-orange-700 text-white"
                          : workshop.id === 30
                            ? "bg-green-600 hover:bg-green-700 text-white"
                            : workshop.id === 33
                              ? "bg-orange-600 hover:bg-orange-700 text-white"
                              : isThreadsTales
                                ? "bg-teal-600 hover:bg-teal-700 text-white"
                                : "bg-primary hover:bg-primary/90 text-white"
                    }`}
                  >
                    {isParadoxStudios
                      ? "Apply for Free Sessions"
                      : workshop.id === 29
                        ? "Apply Online"
                        : workshop.id === 33
                          ? "Apply Now"
                          : isThreadsTales
                            ? "Contact via WhatsApp"
                            : "Register Now"}
                  </Button>
                </Link>
              </div>

              {(workshop.contact || workshop.email) && (
                <div className="bg-gray-50 p-4 md:p-6 rounded-lg">
                  <h3 className="font-playfair text-lg font-bold mb-4">Contact Information</h3>
                  <div className="space-y-3">
                    {workshop.contact && (
                      <div className="flex items-center">
                        <svg
                          className="h-4 w-4 text-primary mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        <span className="text-gray-700">{workshop.contact}</span>
                      </div>
                    )}
                    {workshop.email && workshop.email !== "N/A" && (
                      <div className="flex items-center">
                        <svg
                          className="h-4 w-4 text-primary mr-3 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                        </svg>
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

export default WorkshopDetailContent
