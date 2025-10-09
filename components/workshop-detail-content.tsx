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
    location: "Chittorgarh & Udaipur",
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
    highlights: [
      "Film Location Tours",
      "Literary Analysis",
      "Cinematic Appreciation",
      "Cultural Tourism",
      "Diamond Jubilee Celebration",
    ],
    fullDetails: {
      venue: "Mewar University campus & select shooting locations in Chittorgarh & Udaipur",
      organizer:
        "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL) in collaboration with Mewar University",
      duration: "5 Days (03–07 November 2025)",
      medium: "Hindi & English",
      courseDirector:
        "Dr. Milind Damle (Associate Professor, FTII, film editor & filmmaker with 20+ years' experience)",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Education: Minimum 12th pass (10th pass in exceptional cases)",
        "Nationality: Indian",
        "Interest in Indian cinema and literature",
        "Passion for film appreciation and cultural exploration",
      ],
      applicationDeadline: "18 October 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "Maximum 25 participants (Minimum 20 required)",
      courseFee: "₹10,000 (includes transport & entry fees; excludes meals & stay)",
      accommodation: "₹150/day (Triple sharing at University hostel)",
      meals: "₹150/day (University mess facility)",
      certification: "FTII participation certificate (90% attendance required)",
      keyHighlights: [
        "Visit & explore iconic Guide shooting locations in Chittorgarh & Udaipur",
        "Deep dive into R.K. Narayan's novel 'The Guide' and its cinematic adaptation",
        "Compare Hindi & English versions of Guide",
        "Song appreciation & analysis of legendary S.D. Burman compositions",
        "Study Vijay Anand's direction techniques and cinematic vision",
        "Screenings of Guide (both Hindi & English versions)",
        "Walk where Waheeda Rehman danced and legendary scenes were filmed",
        "Diamond Jubilee celebration of this timeless Indian cinema classic",
        "Expert-guided analysis and cultural context exploration",
        "Immersive experience combining literature, cinema, and travel",
      ],
      curriculum: [
        "Literary analysis of R.K. Narayan's novel 'The Guide'",
        "Film adaptation study and comparative analysis",
        "Detailed comparison of Hindi and English versions",
        "Song appreciation and musical analysis of S.D. Burman's compositions",
        "Scene-by-scene breakdown of iconic sequences",
        "Location visits to original shooting spots in Udaipur & Chittorgarh",
        "Cinematography and direction techniques study",
        "Cultural impact and legacy of the film",
        "Vijay Anand's directorial approach and filmmaking philosophy",
        "Historical context of 1960s Indian cinema",
      ],
      locationVisits: [
        "Iconic shooting locations in Udaipur",
        "Historic sites and palaces in Chittorgarh",
        "Places where legendary dance sequences were filmed",
        "Locations of famous song sequences like 'Piya Tose Naina Lage Re'",
        "Heritage sites and temples featured in the movie",
        "Mewar University campus exploration",
        "Cultural landmarks that served as backdrops",
      ],
      filmScreenings: [
        "Complete Hindi version of Guide (1965)",
        "English version of Guide",
        "Behind-the-scenes footage and making documentaries",
        "Song sequences analysis and appreciation sessions",
        "Comparative screening sessions",
      ],
      learningOutcomes: [
        "Deep understanding of literature-to-film adaptation process",
        "Appreciation of classic Indian cinema techniques and storytelling",
        "Knowledge of film location significance in cinematic narrative",
        "Understanding of cross-cultural film production (Hindi & English versions)",
        "Insight into legendary filmmaker Vijay Anand's methods and vision",
        "Cultural and historical context of 1960s Indian cinema",
        "Enhanced film appreciation and critical analysis skills",
      ],
      aboutInstructor:
        "Dr. Milind Damle – Associate Professor at FTII with over 20 years of experience as a film editor and filmmaker. Course Director and film scholar with extensive expertise in Indian cinema, literature adaptation, and film appreciation. Expert in analyzing the intersection of literature and cinema with deep knowledge of classic Indian films and their cultural significance.",
      uniqueExperience: [
        "Once-in-a-lifetime opportunity to visit original Guide shooting locations",
        "Immersive experience combining literature, cinema, and cultural tourism",
        "Diamond Jubilee celebration of an Indian cinema classic",
        "Expert-guided analysis and appreciation sessions",
        "Cultural and historical context exploration",
        "Walk in the footsteps of legendary artists like Waheeda Rehman",
        "Experience the magic of iconic film locations firsthand",
      ],
      contactInfo: [
        "Rajesh Kumar Saini, Director, Theatre Film & Television, Mewar University – rajeshsaini@mewaruniversity.co.in | 9634712424",
        "Milindkumar Joshi, Asst. Outreach Officer, FTII – info.cfol@ftii.ac.in | 020-25580085",
      ],
      additionalInfo:
        "This unique workshop celebrates the Diamond Jubilee of the iconic film 'Guide' by combining film appreciation, literary analysis, and cultural tourism. Participants will gain deep insights into one of Indian cinema's most celebrated films while experiencing the actual locations where movie magic was created. Perfect for film enthusiasts, literature lovers, and cultural explorers seeking an immersive cinematic experience.",
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
  {
    id: 34,
    title: "FTII Pune: Basic Acting Workshop for Children",
    trainer: "Megh Varn Pant",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "18–26 October 2025",
    time: "Morning: 9:30 AM – 12:30 PM (Ages 8–13), Afternoon: 2:00 PM – 5:00 PM (Ages 13–17)",
    description:
      "🎭 A special on-campus acting workshop exclusively for children at FTII! Learn theatre games, improvisation, storytelling, Navrasas, voice training, monologue work, and audition techniques. Led by FTII alumnus and experienced acting coach Megh Varn Pant with 18+ years of teaching experience.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/courses-for-children/basic-acting-workshop-for-children-in-pune-18-26-october-2025-1",
    featured: true,
    price: "₹9,000 (excludes meals)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Children aged 8-17, minimum 3rd std. pass (2nd std. in exceptional cases)",
    venue: "FTII's Vijay Tendulkar Writers' Academy Campus, Pune",
    includes: "Theatre games, improvisation, storytelling, voice training, monologue work, audition techniques",
    highlights: [
      "Children's Acting",
      "Theatre Games",
      "Improvisation",
      "Storytelling",
      "Voice Training",
      "Audition Techniques",
    ],
    fullDetails: {
      venue: "FTII's Vijay Tendulkar Writers' Academy Campus, Pune",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "9 days (18–26 October 2025, including Saturdays & Sundays)",
      medium: "English & Hindi",
      courseDirector: "Megh Varn Pant (FTII alumnus 2004–06, actor & coach with 18+ years of teaching experience)",
      eligibilityCriteria: [
        "Age: 8-17 years (two separate batches)",
        "Education: Minimum 3rd standard pass (2nd standard in exceptional cases)",
        "Nationality: Indian",
        "Interest in acting and performance arts",
        "Commitment to attend all sessions for certification",
      ],
      applicationDeadline: "30 September 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "25 per batch (Minimum 20 required per batch to run)",
      courseFee: "₹9,000 (excludes meals, non-refundable for selected participants)",
      certification: "FTII & CFOL participation certificate (90% attendance required)",
      batchDetails: [
        "Morning Batch: 9:30 AM – 12:30 PM (Ages 8–13)",
        "Afternoon Batch: 2:00 PM – 5:00 PM (Ages 13–17)",
      ],
      keyHighlights: [
        "Special on-campus acting workshop exclusively for children",
        "Theatre games & improvisation techniques",
        "Story writing & storytelling skills development",
        "Navrasas (nine emotions) & imagination building",
        "Relaxation, concentration & voice training",
        "Monologue & scene work practice",
        "Audition techniques & camera practice",
        "Guided movement & music-based imagination exercises",
        "Personality development through acting",
        "Led by experienced FTII alumnus and acting coach",
        "Sanford Meisner Technique practitioner as instructor",
      ],
      curriculum: [
        "Theatre games and creative play",
        "Improvisation techniques for children",
        "Story writing and creative storytelling",
        "Navrasas (nine emotions) exploration and expression",
        "Imagination building exercises",
        "Relaxation and concentration techniques",
        "Voice training and speech development",
        "Monologue preparation and performance",
        "Scene work and character development",
        "Audition techniques and preparation",
        "Camera practice and on-screen acting basics",
        "Guided movement and physical expression",
        "Music-based imagination and creativity exercises",
        "Personality development through performance",
        "Confidence building through acting",
      ],
      practicalExperience: [
        "Hands-on theatre games and creative exercises",
        "Individual monologue preparation and performance",
        "Group scene work and collaborative acting",
        "Camera practice sessions for screen acting",
        "Improvisation exercises and spontaneous performance",
        "Voice and movement workshops",
        "Audition simulation and technique practice",
      ],
      learningOutcomes: [
        "Enhanced creativity and imagination",
        "Improved confidence and self-expression",
        "Better communication and presentation skills",
        "Understanding of basic acting techniques",
        "Experience with both stage and camera acting",
        "Development of emotional expression through Navrasas",
        "Stronger concentration and focus abilities",
        "Improved voice projection and clarity",
        "Basic audition and performance skills",
        "Enhanced personality development",
        "Creative storytelling abilities",
      ],
      aboutInstructor:
        "Megh Varn Pant – FTII alumnus (2004–06) with over 18 years of teaching experience in acting. A practitioner of the renowned Sanford Meisner Technique, he has worked in 20+ films and numerous advertisements. As an experienced actor and coach, he regularly trains actors for film and television, bringing both practical industry experience and proven teaching methodologies to guide young aspiring performers.",
      instructorExperience: [
        "FTII alumnus (2004–06) with formal training in acting",
        "18+ years of dedicated teaching experience",
        "Practitioner of Sanford Meisner Technique",
        "Worked in 20+ films across various roles",
        "Extensive experience in television advertisements",
        "Regular trainer for professional actors in film & television",
        "Specialized expertise in children's acting education",
      ],
      uniqueExperience: [
        "Exclusive on-campus workshop at prestigious FTII",
        "Age-appropriate batches for optimal learning",
        "Comprehensive curriculum covering all aspects of acting",
        "Combination of traditional theatre and modern screen acting",
        "Expert guidance from industry-experienced instructor",
        "Focus on personality development alongside acting skills",
        "Hands-on camera practice for screen acting preparation",
      ],
      targetAudience: [
        "Children aged 8-13 years (morning batch)",
        "Teenagers aged 13-17 years (afternoon batch)",
        "Young aspiring actors and performers",
        "Children interested in creative expression",
        "Students seeking confidence building through arts",
        "Parents looking for quality acting education for their children",
      ],
      workshopPolicies: [
        "Non-residential program - participants arrange own accommodation and meals",
        "90% attendance required for certification",
        "Age-appropriate batch allocation strictly followed",
        "Professional conduct expected from all participants",
        "Active participation encouraged in all sessions",
        "Parents/guardians responsible for drop-off and pick-up",
      ],
      contactInfo: [
        "Mr. Milindkumar Joshi - Assistant Outreach Officer, FTII",
        "Email: info.cfol@ftii.ac.in / ftiicfol@gmail.com",
        "Phone: 020–25580085 (working days, office hours only)",
      ],
      additionalInfo:
        "This special children's acting workshop at FTII provides young aspiring performers with professional-level training in a nurturing, age-appropriate environment. The program combines traditional theatre techniques with modern screen acting skills, ensuring comprehensive development. With separate batches for different age groups and expert instruction from an experienced FTII alumnus, this workshop offers an exceptional opportunity for children to explore their creative potential and build confidence through the art of acting.",
    },
  },
  {
    id: 35,
    title: "FTII Pune: ABCD of AI for Content Creation – Powered by Your Own Creativity",
    trainer: "Dr. Alwin Anuse",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "21–24 October 2025",
    time: "Morning: 10 AM – 1 PM (Ages 13–17), Afternoon: 2:30 PM – 5:30 PM (Ages 13–17)",
    description:
      "🤖 A unique 4-day on-campus course for children that blends creativity + AI tools in a fun and engaging way! Learn the ABCD framework: Awareness, Brain-first thinking, Creativity with AI support, and Design Thinking. Perfect for young minds to explore AI responsibly while keeping imagination and emotions first.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/abcd-of-ai-for-content-creation-for-children-powered-by-own-creativity-in-pune-21-24-october-2025",
    featured: true,
    price: "₹4,500 (excludes meals)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Children aged 13-17, minimum 5th std. pass",
    venue: "FTII's Vijay Tendulkar Writers' Academy, Kothrud, Pune",
    includes: "AI creativity tools training + FTII Certificate + group projects",
    highlights: [
      "AI Awareness",
      "Creative Thinking",
      "Content Creation",
      "Design Thinking",
      "Group Projects",
      "Responsible AI Use",
    ],
    fullDetails: {
      venue: "FTII's Vijay Tendulkar Writers' Academy, Kothrud, Pune",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "4 days (21–24 October 2025)",
      medium: "Hindi & English",
      courseDirector:
        "Dr. Alwin Anuse (Associate Professor, FTII with 20+ years experience, 2 patents, AI systems expert)",
      eligibilityCriteria: [
        "Age: 13-17 years (as of 1 October 2025)",
        "Education: Minimum 5th standard pass",
        "Nationality: Indian",
        "Interest in creativity and technology",
        "Commitment to attend all sessions for certification",
      ],
      applicationDeadline: "03 October 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "20 per batch (Minimum 20 required per batch, 4 seats reserved for FTII staff children)",
      courseFee: "₹4,500 (excludes meals, non-refundable for selected participants)",
      certification: "FTII participation certificate (90% attendance mandatory)",
      batchDetails: ["Morning Batch: 10 AM – 1 PM (Ages 13–17)", "Afternoon Batch: 2:30 PM – 5:30 PM (Ages 13–17)"],
      keyHighlights: [
        "Unique ABCD framework for AI learning",
        "A = Awareness – Spot AI in daily life (games, apps, media)",
        "B = Brain – Keep imagination & emotions first",
        "C = Creativity – Use AI to support text, image, sound & video projects",
        "D = Design Thinking – Collaborate, ideate & showcase group projects",
        "No coding or heavy AI algorithms required",
        "Focus on storytelling, design, teamwork, and responsible AI use",
        "Hands-on projects with AI creativity tools",
        "Expert guidance from AI systems specialist",
        "Fun and engaging learning environment",
      ],
      curriculum: [
        "AI Awareness: Understanding AI in daily life and media",
        "Brain-first thinking: Keeping human creativity at the center",
        "Creative AI applications for text generation and editing",
        "Image creation and manipulation using AI tools",
        "Sound and audio projects with AI assistance",
        "Video content creation with AI support",
        "Design thinking methodology and collaboration",
        "Group ideation and creative problem-solving",
        "Responsible AI use and ethical considerations",
        "Storytelling enhanced by AI tools",
        "Project showcase and presentation skills",
      ],
      practicalExperience: [
        "Hands-on work with AI creativity tools",
        "Text, image, sound, and video project creation",
        "Collaborative group projects and ideation sessions",
        "Design thinking workshops and exercises",
        "Creative storytelling with AI assistance",
        "Project presentation and showcase",
      ],
      learningOutcomes: [
        "Understanding of AI applications in creative fields",
        "Ability to use AI tools responsibly for content creation",
        "Enhanced creativity and imagination skills",
        "Improved collaboration and teamwork abilities",
        "Design thinking and problem-solving skills",
        "Confidence in presenting creative projects",
        "Awareness of ethical AI use and limitations",
        "Storytelling skills enhanced by technology",
      ],
      aboutInstructor:
        "Dr. Alwin Anuse – Associate Professor at FTII with over 20 years of experience in AI systems, signal processing, and creative applications of AI. He holds 2 patents and has extensive expertise in bridging technology with storytelling. Dr. Anuse has taught at UG/PG/PhD levels, published in reputed journals, and specializes in making complex AI concepts accessible and engaging for young learners.",
      instructorExperience: [
        "20+ years of experience in AI systems and signal processing",
        "Associate Professor at India's premier film institute",
        "Holder of 2 patents in AI and technology applications",
        "Expert in creative applications of AI for storytelling",
        "Extensive teaching experience at UG/PG/PhD levels",
        "Published researcher in reputed academic journals",
        "Specialist in making AI accessible to young learners",
      ],
      coursePhilosophy: [
        "Human creativity and imagination come first",
        "AI as a supportive tool, not a replacement for human creativity",
        "Focus on responsible and ethical AI use",
        "Emphasis on collaboration and teamwork",
        "Learning through fun and engaging activities",
        "Building confidence in technology use",
      ],
      whatThisCourseIsNot: [
        "❌ No coding or heavy AI algorithms",
        "❌ Not a filmmaking or data science course",
        "❌ No replacing human imagination with machines",
        "✅ Focus is on storytelling, design, teamwork, and responsible AI use",
      ],
      uniqueExperience: [
        "First-of-its-kind AI creativity course for children at FTII",
        "ABCD framework designed specifically for young learners",
        "Balance between technology and human creativity",
        "Hands-on experience with cutting-edge AI tools",
        "Expert guidance from AI systems specialist",
        "Focus on responsible and ethical AI use",
        "Collaborative learning environment",
      ],
      targetAudience: [
        "Children aged 13-17 years interested in creativity and technology",
        "Young minds curious about AI applications",
        "Students interested in content creation",
        "Children who enjoy collaborative projects",
        "Young learners interested in storytelling and design",
      ],
      contactInfo: [
        "Mr. Milindkumar Joshi - Assistant Outreach Officer, FTII",
        "Email: info.cfol@ftii.ac.in",
        "Phone: 020–25580085",
      ],
      additionalInfo:
        "This innovative course introduces children to the world of AI in a responsible and creative way. The ABCD framework ensures that human creativity remains at the center while exploring how AI can support and enhance creative projects. Perfect for young minds who are curious about technology but want to maintain their imaginative and emotional intelligence as the driving force behind their creative work.",
    },
  },
  {
    id: 36,
    title: "FTII Nanded: Basic Course in Filmmaking",
    trainer: "Ritesh Taksande",
    institution: "Film and Television Institute of India (FTII)",
    location: "Nanded",
    state: "Maharashtra",
    date: "06–10 October 2025",
    time: "10 AM – 6 PM (lunch: 1:30–2 PM)",
    description:
      "🎬 Step into the world of cinema with FTII's comprehensive 5-day filmmaking course in collaboration with SRTM University, Nanded! This beginner-friendly program covers the complete filmmaking journey from idea to screen. Work in groups to create your own short film under guidance of award-winning filmmaker Ritesh Taksande with 15+ years of experience in animation, VFX & live-action.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-film-making-srtmu-nanded-06-10-october-2025",
    featured: true,
    price: "₹5,000 (excludes meals & stay)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in",
    eligibility: "Age 18+ (as of 1 Oct 2025), 12th pass (10th pass may be considered)",
    venue: "School of Media Studies, SRTM University Campus, Nanded",
    includes: "Complete filmmaking training + Group short film creation + FTII-SRTM joint certificate",
    highlights: [
      "Complete Filmmaking Journey",
      "Hands-on Short Film Creation",
      "Award-winning Instructor",
      "Group Collaboration",
      "Industry Experience",
      "Film Showcase",
    ],
    fullDetails: {
      venue: "School of Media Studies, SRTM University Campus, Nanded",
      organizer:
        "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL) in collaboration with Swami Ramanand Teerth Marathwada University (SRTM University, Nanded)",
      duration: "5 days (06–10 October 2025)",
      medium: "Hindi & English",
      courseDirector:
        "Ritesh Taksande (Award-winning filmmaker & educator with 15+ years of experience across animation, VFX & live-action)",
      eligibilityCriteria: [
        "Age: 18+ years (as of 1 October 2025)",
        "Education: 12th pass (10th pass may be considered in exceptional cases)",
        "Nationality: Indian",
        "Interest in filmmaking and cinema",
        "No prior filmmaking experience required - perfect for beginners",
      ],
      applicationDeadline: "18 September 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "30 participants (Minimum 24 required)",
      courseFee: "₹5,000 (excludes meals & stay, non-refundable for selected participants)",
      certification: "FTII–SRTM joint certificate (90% attendance required)",
      accommodation: "Limited hostel available (₹1500, twin sharing, 5–10 Oct; pay directly on arrival)",
      meals: "Available in University canteen (~₹100 per meal)",
      keyHighlights: [
        "Complete filmmaking journey from idea to screen",
        "Beginner-friendly program with hands-on approach",
        "Work in groups to create your own short film",
        "Learn from award-winning filmmaker with 15+ years experience",
        "Covers animation, VFX & live-action techniques",
        "Industry projects experience (Disney's Planes 2, Little Krishna, Shaktimaan)",
        "Day-wise structured learning approach",
        "Film showcase on final day",
        "Joint certification from FTII and SRTM University",
        "Networking opportunity with fellow aspiring filmmakers",
      ],
      curriculum: [
        "Day 1 – Pre-Production: Script writing, storyboarding, casting & location scouting",
        "Day 2 – Cinematography: Camera basics, framing, lighting & sound essentials",
        "Day 3 – Production: On-set etiquette, directing actors, blocking & shooting practice",
        "Day 4 – Editing: Rough cut assembly, continuity, pacing, adding sound & music",
        "Day 5 – Post Production: Colour grading, sound mixing, exporting & film showcase",
      ],
      practicalExperience: [
        "Hands-on script writing and storyboarding",
        "Camera operation and cinematography practice",
        "Live shooting with professional equipment",
        "Complete post-production workflow",
        "Group collaboration in film creation",
        "Film showcase and presentation",
      ],
      learningOutcomes: [
        "Understanding of complete filmmaking process",
        "Practical skills in pre-production, production, and post-production",
        "Experience in script writing and storyboarding",
        "Camera operation and cinematography knowledge",
        "Editing and post-production skills",
        "Team collaboration and project management",
        "Completed short film to showcase skills",
        "Industry-ready knowledge of filmmaking techniques",
        "Confidence to pursue independent filmmaking projects",
        "Network with fellow aspiring filmmakers",
      ],
      aboutInstructor:
        "Ritesh Taksande – Award-winning filmmaker and educator with over 15 years of experience across animation, VFX, and live-action filmmaking. He has worked on major industry projects including Disney's Planes 2, Little Krishna, and Shaktimaan. As an experienced filmmaker and educator, he brings both creative vision and practical industry knowledge to guide students through the complete filmmaking process from concept to screen. He has also trained aspiring filmmakers through My First Film Organisation and served as Senior Manager – Film Production at NFDC.",
      instructorExperience: [
        "15+ years of experience in filmmaking across multiple mediums",
        "Award-winning filmmaker with industry recognition",
        "Worked on Disney's Planes 2 (major international project)",
        "Experience with popular Indian productions like Little Krishna",
        "Contributed to iconic series like Shaktimaan",
        "Expert in animation, VFX, and live-action techniques",
        "Proven educator with hands-on teaching approach",
        "Industry connections and practical filmmaking knowledge",
        "Trained aspiring filmmakers through My First Film Organisation",
        "Senior Manager – Film Production at NFDC",
      ],
      uniqueExperience: [
        "Learn from filmmaker with Disney and major industry experience",
        "Collaboration between prestigious FTII and SRTM University",
        "Complete filmmaking journey in just 5 intensive days",
        "Hands-on approach with immediate practical application",
        "Group collaboration fostering teamwork and networking",
        "Film showcase providing platform to present work",
        "Joint certification from two respected institutions",
      ],
      targetAudience: [
        "Beginners interested in filmmaking",
        "Aspiring directors and cinematographers",
        "Students exploring cinema as a career",
        "Creative professionals seeking filmmaking skills",
        "Anyone passionate about visual storytelling",
        "Film enthusiasts wanting hands-on experience",
      ],
      contactInfo: [
        "Dr. Rajendra Gonarkar, SRTM University – rajendragonarkar@srtmun.ac.in | 9890619274",
        "Mr. Milind Joshi, FTII – info.cfol@ftii.ac.in | 020–25580085",
      ],
      additionalInfo:
        "This intensive 5-day course provides a comprehensive introduction to filmmaking, perfect for beginners looking to step into the world of cinema. The program combines theoretical knowledge with extensive hands-on practice, ensuring participants gain both understanding and practical skills in all aspects of filmmaking. The collaboration between FTII and SRTM University provides a unique learning environment that bridges academic excellence with creative innovation. Participants will leave with a completed short film and the confidence to pursue their filmmaking aspirations.",
    },
  },
  {
    id: 37,
    title: "FTII Pune: Basic Course in Digital Cinematography",
    trainer: "Rakesh Bhilare",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "08–20 December 2025",
    time: "10 AM – 5 PM",
    description:
      "🎥 Learn how to see light. Frame truth. Capture emotion. A comprehensive 12-day cinematography course at FTII covering camera & composition, light & exposure, movement & framing, filters & lighting setup, and 6-shot continuity exercise. Led by award-winning cinematographer Rakesh Bhilare with 12+ years in the film industry.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-digital-cinematography-in-pune-08-20-december-2025",
    featured: true,
    price: "₹15,000 (Hostel optional: ₹4,200 for 14 days, triple share)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+",
    venue: "Vijay Tendulkar Writer's Academy, Kothrud, Pune",
    includes: "Camera & composition training + Lighting setup + 6-shot continuity exercise + FTII Certificate",
    highlights: [
      "Camera & Composition",
      "Light & Exposure",
      "Movement & Framing",
      "Filters & Lighting Setup",
      "6-Shot Continuity Exercise",
      "Industry Expert Mentor",
    ],
    fullDetails: {
      venue: "Vijay Tendulkar Writer's Academy, Kothrud, Pune",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "12 days (08–20 December 2025, Sunday off)",
      medium: "English & Hindi",
      courseDirector: "Rakesh Bhilare (Award-winning cinematographer with 12+ years in film industry, FTII Alumnus)",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Nationality: Indian",
        "Interest in cinematography and filmmaking",
        "No prior experience required - perfect for beginners",
        "Commitment to attend all sessions for certification",
      ],
      applicationDeadline: "10 November 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "24 seats",
      courseFee: "₹15,000 per person (excludes meals)",
      hostelFee: "₹4,200 (optional, 14 days, triple sharing)",
      certification: "FTII & CFOL participation certificate",
      keyHighlights: [
        "Learn how to see light, frame truth, and capture emotion",
        "Comprehensive 12-day intensive cinematography training",
        "Camera operation and composition techniques",
        "Understanding light and exposure fundamentals",
        "Movement and framing for visual storytelling",
        "Filters and lighting setup practical training",
        "6-shot continuity exercise for hands-on learning",
        "Led by award-winning cinematographer with 12+ years experience",
        "FTII alumnus instructor with industry expertise",
        "Small batch size for personalized attention (24 seats)",
        "Optional hostel accommodation available on campus",
      ],
      curriculum: [
        "Camera fundamentals and operation",
        "Composition principles and visual storytelling",
        "Understanding light: quality, direction, and color",
        "Exposure triangle: ISO, aperture, and shutter speed",
        "Camera movement techniques: pan, tilt, dolly, crane",
        "Framing and shot sizes for narrative impact",
        "Filters: ND, polarizers, and creative filters",
        "Lighting setup: three-point lighting and beyond",
        "Natural light vs artificial light cinematography",
        "6-shot continuity exercise: practical application",
        "Visual language and cinematic grammar",
        "Working with actors and directors as a cinematographer",
      ],
      practicalExperience: [
        "Hands-on camera operation and handling",
        "Lighting setup and execution exercises",
        "6-shot continuity exercise filming",
        "Composition and framing practice",
        "Exposure control and adjustment drills",
        "Filter usage and experimentation",
        "Camera movement exercises",
        "Real-world cinematography scenarios",
      ],
      learningOutcomes: [
        "Proficiency in digital camera operation",
        "Understanding of light and its manipulation",
        "Ability to compose visually compelling shots",
        "Knowledge of exposure control and settings",
        "Skills in camera movement and framing",
        "Practical experience with lighting setups",
        "Understanding of filters and their applications",
        "Confidence in executing 6-shot continuity sequences",
        "Foundation for professional cinematography career",
        "Visual storytelling through camera work",
      ],
      aboutInstructor:
        "Rakesh Bhilare – Award-winning cinematographer and FTII alumnus with over 12 years of experience in the film industry. His notable works include Y (2022), Athaang (2022), and Lovestoriyaan (2024). With extensive experience in both independent and commercial cinema, Rakesh brings practical industry knowledge and proven cinematography techniques to guide aspiring cinematographers.",
      instructorExperience: [
        "FTII alumnus with formal training in cinematography",
        "12+ years of professional experience in film industry",
        "Cinematographer for Y (2022) - critically acclaimed film",
        "Cinematographer for Athaang (2022)",
        "Cinematographer for Lovestoriyaan (2024)",
        "Award-winning work recognized in film festivals",
        "Experience across independent and commercial cinema",
        "Expert in both digital and traditional cinematography",
      ],
      uniqueExperience: [
        "Exclusive on-campus training at prestigious FTII",
        "Learn from award-winning industry professional",
        "Small batch size ensures personalized attention",
        "Comprehensive curriculum covering all aspects of cinematography",
        "Hands-on practical training with professional equipment",
        "6-shot continuity exercise for real-world application",
        "Optional hostel accommodation for immersive learning",
        "FTII certificate adds credibility to your portfolio",
      ],
      targetAudience: [
        "Aspiring cinematographers and camera operators",
        "Filmmakers wanting to enhance visual storytelling skills",
        "Photography enthusiasts transitioning to cinematography",
        "Film students seeking professional training",
        "Content creators looking to improve video quality",
        "Anyone passionate about visual storytelling through camera",
      ],
      workshopPolicies: [
        "Non-residential program (hostel optional)",
        "Participants arrange own meals",
        "Professional conduct expected from all participants",
        "Active participation required in all practical exercises",
        "Attendance mandatory for certification",
        "Equipment provided during workshop sessions",
      ],
      contactInfo: [
        "Mr. Milindkumar Joshi - Assistant Outreach Officer, FTII",
        "Email: info.cfol@ftii.ac.in / ftiicfol@gmail.com",
        "Phone: 020–25580085 (working days, office hours only)",
      ],
      additionalInfo:
        "This comprehensive cinematography course at FTII provides aspiring cinematographers with professional-level training in a hands-on, intensive environment. Learn the art and craft of visual storytelling through camera work, lighting, and composition from an award-winning industry professional. The 12-day program combines theoretical knowledge with extensive practical exercises, culminating in a 6-shot continuity exercise that simulates real-world cinematography challenges. With small batch sizes and expert instruction, this workshop offers an exceptional opportunity to master the fundamentals of digital cinematography.",
    },
  },
  {
    id: 38,
    title: "FTII Pune: Introduction to Multi-Camera Technical Operations for TV Program Production",
    trainer: "Prof. Sandeep Shahare",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "01–05 December 2025",
    time: "9 AM – 6:30 PM",
    description:
      "🎥 Step inside the studio. Learn how multi-camera television magic is made — from the switcher to the spotlight. Master multi-camera setup, signal flow, lighting, vision mixing, live switching, audio control, and program production. Create your own 2-5 minute TV program and receive a copy + certificate.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/introduction-to-multi-camera-technical-operations-for-tv-program-production-01-05-december-2025",
    featured: true,
    price: "₹5,000 (Hostel optional: ₹1,800 for 6 days, triple share)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+",
    venue: "TV Engineering Department, FTII Main Campus, Law College Road, Pune",
    includes:
      "Multi-camera setup training + Live switching + Audio control + Recording & playback + Create your own 2-5 min TV program + Certificate",
    highlights: [
      "Multi-Camera Setup",
      "Vision Mixing",
      "Live Switching",
      "Audio Control",
      "TV Program Production",
      "Hands-on Studio Experience",
    ],
    fullDetails: {
      venue: "TV Engineering Department, FTII Main Campus, Law College Road, Pune",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "5 days (01–05 December 2025)",
      medium: "English & Hindi",
      courseDirector:
        "Prof. Sandeep Shahare (Head of TV Engineering & Dean (TV), FTII with 29 years of professional & teaching experience, M.E. in Electronics & Telecom from COEP)",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Nationality: Indian",
        "Interest in television production and broadcasting",
        "No prior technical experience required",
        "Commitment to attend all sessions for certification",
      ],
      applicationDeadline: "10 November 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "20 seats (Minimum 16 participants required)",
      courseFee: "₹5,000 per person (excludes meals)",
      hostelFee: "₹1,800 (optional, 6 days, triple sharing)",
      certification: "FTII certificate + Copy of your own 2-5 minute TV program",
      keyHighlights: [
        "Step inside a professional television studio",
        "Learn multi-camera television production from scratch",
        "Understand signal flow and technical operations",
        "Master lighting techniques for TV production",
        "Learn camera operations in multi-camera setup",
        "Vision mixing and live switching training",
        "Audio control and talkback systems",
        "Recording, playback, and program production",
        "Create your own 2-5 minute TV program",
        "Receive a copy of your program + FTII certificate",
        "Led by Head of TV Engineering with 29 years experience",
        "Small batch size for hands-on learning (20 seats)",
        "Optional hostel accommodation available",
      ],
      curriculum: [
        "Introduction to multi-camera television production",
        "Understanding signal flow in TV studios",
        "Multi-camera setup and configuration",
        "Camera operations and positioning",
        "Lighting fundamentals for television",
        "Studio lighting techniques and equipment",
        "Vision mixing console operation",
        "Live switching and shot selection",
        "Audio control systems and mixing",
        "Talkback and communication systems",
        "Recording and playback operations",
        "Program production workflow",
        "Creating a complete 2-5 minute TV program",
      ],
      practicalExperience: [
        "Hands-on multi-camera studio operations",
        "Live vision mixing and switching exercises",
        "Camera operation in multi-camera setup",
        "Lighting setup and control practice",
        "Audio mixing and control exercises",
        "Talkback system usage",
        "Recording and playback operations",
        "Complete TV program production from concept to completion",
        "Individual 2-5 minute program creation",
      ],
      learningOutcomes: [
        "Comprehensive understanding of multi-camera TV production",
        "Proficiency in vision mixing and live switching",
        "Skills in multi-camera setup and signal flow",
        "Knowledge of studio lighting techniques",
        "Ability to operate cameras in multi-camera environment",
        "Competence in audio control and mixing",
        "Understanding of talkback and communication systems",
        "Experience in recording and playback operations",
        "Practical skills in TV program production",
        "Portfolio piece: Your own 2-5 minute TV program",
        "Foundation for career in television production",
      ],
      aboutInstructor:
        "Prof. Sandeep Shahare – Head of TV Engineering Department and Dean (TV) at FTII with 29 years of professional and teaching experience. He holds an M.E. in Electronics & Telecommunication from College of Engineering, Pune (COEP). With nearly three decades of expertise in television engineering and production, Prof. Shahare brings invaluable industry knowledge and technical expertise to guide aspiring TV production professionals.",
      instructorExperience: [
        "Head of TV Engineering Department at FTII",
        "Dean (TV) at Film and Television Institute of India",
        "29 years of professional and teaching experience",
        "M.E. in Electronics & Telecommunication from COEP",
        "Expert in multi-camera television production",
        "Extensive experience in broadcast engineering",
        "Trained numerous professionals in TV production",
        "Deep understanding of studio operations and workflows",
      ],
      uniqueExperience: [
        "Exclusive training at India's premier film institute",
        "Learn from Head of TV Engineering with 29 years experience",
        "Hands-on experience in professional TV studio",
        "Small batch ensures personalized attention (20 seats)",
        "Create and take home your own TV program",
        "Comprehensive coverage of all technical aspects",
        "Professional-grade equipment and facilities",
        "FTII certificate adds credibility to your portfolio",
        "Optional on-campus hostel accommodation",
      ],
      targetAudience: [
        "Aspiring television production professionals",
        "Camera operators wanting to learn multi-camera setup",
        "Video editors interested in live production",
        "Content creators expanding to TV production",
        "Film students seeking television production skills",
        "Anyone passionate about television broadcasting",
        "Technical enthusiasts interested in broadcast engineering",
      ],
      workshopPolicies: [
        "Non-residential program (hostel optional)",
        "Participants arrange own meals",
        "Professional conduct expected in studio environment",
        "Active participation required in all practical sessions",
        "Attendance mandatory for certification",
        "Equipment provided during workshop sessions",
        "Minimum 16 participants required for workshop to proceed",
      ],
      contactInfo: [
        "Mr. Milindkumar Joshi - Assistant Outreach Officer, FTII",
        "Email: info.cfol@ftii.ac.in / ftiicfol@gmail.com",
        "Phone: 020–25580085 (working days, office hours only)",
      ],
      additionalInfo:
        "This intensive 5-day workshop at FTII provides aspiring television professionals with comprehensive hands-on training in multi-camera technical operations. Step inside a professional TV studio and learn the complete workflow from setup to final program production. Under the guidance of Prof. Sandeep Shahare, Head of TV Engineering with 29 years of experience, you'll master vision mixing, live switching, audio control, and all technical aspects of television production. The highlight of the workshop is creating your own 2-5 minute TV program, which you'll receive a copy of along with your FTII certificate. With small batch sizes and professional-grade equipment, this workshop offers an exceptional opportunity to gain practical skills in television production.",
    },
  },
  {
    id: 39,
    title: "FTII Chennai: Basic Film Appreciation Course",
    trainer: "Dr. Milind Damle",
    institution: "Film and Television Institute of India (FTII)",
    location: "Chennai",
    state: "Tamil Nadu",
    date: "17–21 November 2025",
    time: "10 AM – 6 PM",
    description:
      "🎬 See films not just as stories — but as language, rhythm, and truth. Learn the art and language of cinema, film history, how images and sound create meaning, and the relationship between cinema, culture, and society. Includes film screenings, discussions, and guided analysis led by Dr. Milind Damle with 20+ years of experience.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-film-appreciation-course-in-chennai-17-21-november-2025",
    featured: true,
    price: "₹4,000",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+",
    venue: "SA College of Arts & Science, Thiruverkadu, Chennai",
    includes: "Film screenings + Discussions + Guided analysis + FTII Certificate",
    highlights: [
      "Art & Language of Cinema",
      "Film History & Evolution",
      "Images, Sound & Editing",
      "Cinema & Culture",
      "Film Screenings",
      "Expert Analysis",
    ],
    fullDetails: {
      venue: "SA College of Arts & Science, Thiruverkadu, Chennai",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "5 days (17–21 November 2025)",
      medium: "English & Hindi",
      courseDirector:
        "Dr. Milind Damle (Associate Professor at FTII Pune, Film Editor, Writer, and Educator with 20+ years of experience in Radio, Cinema & Television. Ph.D. on Song Picturization in Vijay Anand Films)",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Nationality: Indian",
        "Passion for cinema and storytelling",
        "Interest in understanding film as an art form",
        "No prior film education required",
        "Open to students, professionals, and cinema enthusiasts",
      ],
      applicationDeadline: "30 October 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "70 seats",
      courseFee: "₹4,000 per person (excludes meals)",
      certification: "FTII participation certificate",
      keyHighlights: [
        "See films not just as stories — but as language, rhythm, and truth",
        "Learn the art and language of cinema",
        "Understand film history and evolution of cinematic form",
        "Discover how images, sound, and editing create meaning",
        "Explore the journey from idea to screen",
        "Study the relationship between cinema, culture, and society",
        "Film screenings with expert analysis",
        "Interactive discussions and guided analysis",
        "Led by Dr. Milind Damle with 20+ years experience",
        "Ph.D. expertise on song picturization in Indian cinema",
        "FTII certificate upon completion",
        "Large batch size for diverse perspectives (70 seats)",
      ],
      curriculum: [
        "Introduction to film as an art form",
        "The language of cinema: visual storytelling",
        "Film history and evolution of cinematic form",
        "Understanding mise-en-scène and composition",
        "The role of cinematography in storytelling",
        "Sound design and its impact on narrative",
        "Film editing: rhythm, pace, and meaning",
        "The journey from idea to screen",
        "Cinema and culture: social context",
        "Cinema and society: reflection and influence",
        "Genre studies and conventions",
        "Auteur theory and directorial vision",
        "Song picturization in Indian cinema",
        "Contemporary cinema and new forms",
      ],
      practicalExperience: [
        "Curated film screenings",
        "Scene-by-scene analysis sessions",
        "Group discussions on film techniques",
        "Comparative studies of different cinematic styles",
        "Analysis of sound and image relationships",
        "Exploration of editing patterns",
        "Cultural context discussions",
        "Interactive Q&A with Dr. Milind Damle",
      ],
      learningOutcomes: [
        "Comprehensive understanding of cinema as an art form",
        "Ability to analyze films beyond surface narratives",
        "Knowledge of film history and evolution",
        "Understanding of visual language and composition",
        "Appreciation of sound design and its narrative role",
        "Insight into editing techniques and their effects",
        "Awareness of cinema's relationship with culture and society",
        "Critical thinking skills for film analysis",
        "Enhanced appreciation for cinematic craft",
        "Foundation for further film studies or criticism",
        "Ability to articulate film analysis effectively",
      ],
      aboutInstructor:
        "Dr. Milind Damle – Associate Professor at Film and Television Institute of India (FTII), Pune. A distinguished Film Editor, Writer, and Educator with over 20 years of experience in Radio, Cinema, and Television. Dr. Damle holds a Ph.D. on Song Picturization in Vijay Anand Films, bringing unique expertise in understanding the intersection of music, visuals, and narrative in Indian cinema. His extensive experience across multiple media forms provides students with a comprehensive perspective on film appreciation and analysis.",
      instructorExperience: [
        "Associate Professor at FTII Pune",
        "20+ years in Radio, Cinema & Television",
        "Ph.D. on Song Picturization in Vijay Anand Films",
        "Film Editor with extensive industry experience",
        "Writer and researcher in film studies",
        "Expert in Indian cinema and song picturization",
        "Educator with deep understanding of film language",
        "Experienced in conducting film appreciation courses",
      ],
      uniqueExperience: [
        "Training from India's premier film institute (FTII)",
        "Learn from a Ph.D. expert in Indian cinema",
        "Unique focus on song picturization in films",
        "Comprehensive coverage of film as language",
        "Curated film screenings with expert analysis",
        "Interactive discussions with experienced educator",
        "20+ years of instructor's industry experience",
        "FTII certificate adds credibility",
        "Large batch allows diverse perspectives",
        "Held in Chennai, expanding FTII's reach",
      ],
      targetAudience: [
        "Cinema enthusiasts wanting deeper understanding",
        "Students considering film studies or filmmaking",
        "Aspiring film critics and writers",
        "Content creators seeking to understand film language",
        "Teachers and educators interested in film education",
        "Anyone passionate about cinema as an art form",
        "Professionals from other fields exploring cinema",
        "Film club members and organizers",
      ],
      workshopPolicies: [
        "Non-residential program",
        "Participants arrange own meals and accommodation",
        "Punctuality expected for film screenings",
        "Active participation encouraged in discussions",
        "Respectful engagement during analysis sessions",
        "Mobile phones on silent during screenings",
        "Note-taking encouraged",
        "Certificate awarded upon completion",
      ],
      contactInfo: [
        "Mr. Milindkumar Joshi - Assistant Outreach Officer, FTII",
        "Email: info.cfol@ftii.ac.in / ftiicfol@gmail.com",
        "Phone: 020–25580085 (working days, office hours only)",
      ],
      additionalInfo:
        "This 5-day Basic Film Appreciation Course at FTII Chennai offers cinema enthusiasts a transformative journey into understanding film as an art form. Led by Dr. Milind Damle, Associate Professor at FTII with a Ph.D. on Song Picturization in Vijay Anand Films, the course goes beyond surface-level storytelling to explore cinema as language, rhythm, and truth. Through curated film screenings, guided analysis, and interactive discussions, participants will learn how images, sound, and editing create meaning, understand film history and evolution, and explore the deep relationship between cinema, culture, and society. With 20+ years of experience across Radio, Cinema, and Television, Dr. Damle brings unique insights into the craft of filmmaking and the art of film appreciation. This course is perfect for anyone who wants to see films with new eyes and understand the profound language of cinema.",
    },
  },
  {
    id: 40,
    title: "FTII Pune: Basic Course in Screen Acting (Hindi)",
    trainer: "Rispal Singh Vikal & Harsh Prasad",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "10–22 November 2025",
    time: "10:30 AM – 5:00 PM",
    description:
      "🎭 Find your truth before the camera. Break inhibitions. Express freely. Live the character. Learn freedom from inhibition, classical & modern acting approaches, memory & imagination work, voice & mime training, and theatre games. Led by veteran theatre director Rispal Singh Vikal with 45+ years of experience.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-screen-acting-in-hindi-in-pune-10-22-november-2025",
    featured: true,
    price: "₹12,000 (Hostel optional: ₹4,200 for 14 days, triple share)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+",
    venue: "Vijay Tendulkar Writers' Academy Campus, Kothrud, Pune",
    includes:
      "Freedom from inhibition training + Classical & modern acting approaches + Voice & mime training + Theatre games + FTII Certificate",
    highlights: [
      "Screen Acting",
      "Freedom from Inhibition",
      "Classical & Modern Acting",
      "Memory & Imagination",
      "Voice & Mime Training",
      "Theatre Games",
    ],
    fullDetails: {
      venue: "Vijay Tendulkar Writers' Academy Campus, Kothrud, Pune",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "12 days (10–22 November 2025, Sunday off)",
      medium: "Hindi",
      courseDirector:
        "Rispal Singh Vikal (Veteran theatre director with 45+ years of experience, Writer-Director of acclaimed plays Poster, Kokh, and Dhadhak, Awarded by Home Minister P.C. Sethi in 1980–81, Founder of Virat Acting Lab) & Harsh Prasad (Co-Course Director, Senior cinema & theatre personality)",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Nationality: Indian",
        "Passion for acting and screen performance",
        "Willingness to explore emotional depth",
        "No prior acting experience required",
        "Open to beginners and aspiring actors",
        "Comfortable working in Hindi language",
      ],
      applicationDeadline: "21 October 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "20 seats (Minimum 16 participants required)",
      courseFee: "₹12,000 per person (excludes meals)",
      hostelFee: "₹4,200 for 14 days (triple sharing, optional)",
      certification: "FTII participation certificate",
      keyHighlights: [
        "Find your truth before the camera",
        "Break inhibitions and express freely",
        "Live the character authentically",
        "Freedom from inhibition & body-mind alignment",
        "Classical, modern & method-free acting approaches",
        "Memory, imagination & emotional expression",
        "Observation, improvisation & four-dimensional concentration",
        "Voice, mime & psycho-physical training",
        "Theatre games for stamina, focus & trust",
        "Practical, exploratory, performance-driven training",
        "Designed specifically for screen acting",
        "Led by veteran director with 45+ years experience",
        "Small batch size for personalized attention (20 seats)",
        "Optional hostel accommodation available",
      ],
      curriculum: [
        "Freedom from inhibition techniques",
        "Body-mind alignment exercises",
        "Classical acting approaches",
        "Modern acting methodologies",
        "Method-free acting exploration",
        "Memory work and recall techniques",
        "Imagination development exercises",
        "Emotional expression and authenticity",
        "Observation skills for character building",
        "Improvisation techniques",
        "Four-dimensional concentration training",
        "Voice training and modulation",
        "Mime and physical expression",
        "Psycho-physical training methods",
        "Theatre games for stamina building",
        "Focus and concentration exercises",
        "Trust-building activities",
        "Screen acting techniques",
        "Camera awareness and presence",
        "Character development for screen",
      ],
      practicalExperience: [
        "Daily acting exercises and drills",
        "Improvisation sessions",
        "Scene work and character exploration",
        "Voice and speech training",
        "Physical theatre exercises",
        "Theatre games and ensemble work",
        "Camera acting practice",
        "Emotional memory exercises",
        "Observation and character study",
        "Performance-driven training sessions",
        "Individual and group work",
        "Feedback and guidance from mentors",
      ],
      learningOutcomes: [
        "Freedom from inhibition in performance",
        "Strong body-mind connection",
        "Understanding of classical and modern acting techniques",
        "Enhanced memory and imagination skills",
        "Authentic emotional expression",
        "Improved observation and improvisation abilities",
        "Four-dimensional concentration skills",
        "Voice control and modulation",
        "Physical expression through mime",
        "Increased stamina and focus",
        "Trust in ensemble work",
        "Screen acting confidence",
        "Camera presence and awareness",
        "Character development skills",
        "Professional acting foundation",
      ],
      aboutInstructor:
        "Rispal Singh Vikal – Veteran theatre director with 45+ years of experience in Indian theatre. Writer-Director of acclaimed plays including Poster, Kokh, and Dhadhak. Awarded by Home Minister P.C. Sethi in 1980–81 for outstanding contribution to theatre. Founder of Virat Acting Lab, dedicated to training actors in authentic, truth-based performance. Known for his unique approach that combines classical techniques with modern sensibilities, emphasizing freedom from inhibition and genuine emotional expression. Co-Course Director Harsh Prasad is a senior cinema and theatre personality bringing additional industry expertise to the program.",
      instructorExperience: [
        "45+ years in theatre direction and training",
        "Writer-Director of Poster, Kokh, Dhadhak",
        "Awarded by Home Minister P.C. Sethi (1980–81)",
        "Founder of Virat Acting Lab",
        "Expert in classical and modern acting approaches",
        "Specialist in freedom from inhibition techniques",
        "Experienced in screen acting training",
        "Co-directed with Harsh Prasad (senior cinema & theatre personality)",
      ],
      uniqueExperience: [
        "Training from India's premier film institute (FTII)",
        "Learn from veteran director with 45+ years experience",
        "Unique focus on freedom from inhibition",
        "Combines classical, modern & method-free approaches",
        "Practical, exploratory, performance-driven training",
        "Specifically designed for screen acting",
        "Small batch ensures personalized attention",
        "Intensive 12-day immersive experience",
        "Optional on-campus hostel accommodation",
        "FTII certificate adds professional credibility",
        "Training at historic Vijay Tendulkar Writers' Academy",
        "Focus on authentic, truth-based performance",
      ],
      targetAudience: [
        "Aspiring screen actors",
        "Theatre actors wanting to transition to screen",
        "Beginners with passion for acting",
        "Content creators seeking acting skills",
        "Film and TV enthusiasts",
        "Anyone wanting to break performance inhibitions",
        "Hindi language speakers interested in acting",
        "Individuals seeking authentic self-expression",
      ],
      workshopPolicies: [
        "Punctuality expected for all sessions",
        "Active participation mandatory",
        "Respectful engagement with fellow participants",
        "Willingness to explore emotional depth required",
        "Physical exercises may be demanding",
        "Comfortable clothing recommended",
        "Hostel accommodation optional (triple sharing)",
        "Meals not included in course fee",
        "Sunday off for rest and reflection",
        "Certificate awarded upon completion",
      ],
      contactInfo: [
        "Mr. Milindkumar Joshi - Assistant Outreach Officer, FTII",
        "Email: info.cfol@ftii.ac.in / ftiicfol@gmail.com",
        "Phone: 020–25580085 (working days, office hours only)",
      ],
      additionalInfo:
        "This 12-day Basic Course in Screen Acting (Hindi) at FTII Pune offers aspiring actors a transformative journey into authentic screen performance. Led by veteran theatre director Rispal Singh Vikal with 45+ years of experience and co-directed by senior cinema personality Harsh Prasad, the course emphasizes finding your truth before the camera. Through a unique combination of classical, modern, and method-free acting approaches, participants will break inhibitions, develop body-mind alignment, and learn to express freely and authentically. The intensive training includes freedom from inhibition techniques, memory and imagination work, observation and improvisation, voice and mime training, psycho-physical exercises, and theatre games designed to build stamina, focus, and trust. With practical, exploratory, and performance-driven training specifically designed for screen acting, this course provides a solid foundation for anyone serious about pursuing acting in films, television, or web series. The small batch size of 20 participants ensures personalized attention, and optional hostel accommodation makes it accessible for outstation participants.",
    },
  },
  // ADD NEW WORKSHOPS HERE
  {
    id: 41,
    title: "FTII Pune: Basic Course on Creating Films & AV Content using AI",
    trainer: "Dr. Alwin Anuse",
    institution: "Film and Television Institute of India (FTII)",
    location: "Online",
    state: "Maharashtra",
    date: "10–14 November 2025",
    time: "10:30 AM – 12:30 PM & 2:30 PM – 4:30 PM",
    description:
      "🤖 The camera is evolving. Now the imagination directs the machine. Learn generative AI for storytelling, script ideation, prompt design, AI-based image/video/sound creation, storyboarding, editing, and ethical AI use. Led by Dr. Alwin Anuse with 20+ years experience, 2 patents, and expertise in AI & deep learning.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/ftii-online-1/basic-course-on-creating-films-audio-visual-contents-using-artificial-intelligence-ai-10-14-november-2025",
    featured: true,
    price: "₹9,000",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+, Laptop/Desktop (min. 4GB RAM, Intel i3+), 10 Mbps Internet, Headphones + HD Webcam",
    venue: "Online (Google Classroom + Google Meet)",
    includes:
      "Generative AI for storytelling + Script ideation & prompt design + AI-based image/video/sound creation + Storyboarding & editing with AI + Ethical AI use + Guided demos + Assignments + Group projects",
    highlights: [
      "AI Filmmaking",
      "Generative AI",
      "Script Ideation",
      "Prompt Design",
      "AI Video Creation",
      "Ethical AI Use",
    ],
    fullDetails: {
      venue: "Online (Google Classroom + Google Meet)",
      organizer: "Film and Television Institute of India (FTII), Pune – Centre for Open Learning (CFOL)",
      duration: "5 days (10–14 November 2025) – 20 hours total",
      medium: "English / Hindi",
      courseDirector:
        "Dr. Alwin Anuse (Associate Professor, FTII Pune, Ph.D. from COEP, Researcher in AI, Deep Learning & Visual Media, 20+ years teaching & industry experience, Published with Springer & Elsevier, Holds 2 patents in technology innovation)",
      eligibilityCriteria: [
        "Age: 18+ years",
        "Nationality: Indian",
        "Technical Requirements: Laptop/Desktop (minimum 4GB RAM, Intel i3 or higher processor)",
        "Internet: Minimum 10 Mbps stable connection",
        "Equipment: Headphones + HD Webcam (mandatory)",
        "Mobile-only access NOT allowed",
        "Basic computer literacy required",
        "Interest in AI and filmmaking",
        "No prior AI or filmmaking experience required",
        "Willingness to learn and experiment with AI tools",
      ],
      applicationDeadline: "30 October 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      capacity: "30 seats (Minimum 24 participants required)",
      courseFee: "₹9,000 per person",
      certification: "FTII participation certificate",
      keyHighlights: [
        "The camera is evolving – imagination now directs the machine",
        "Learn generative AI for storytelling and visualization",
        "Master script ideation and prompt design techniques",
        "Create AI-based images, videos, and sound",
        "Storyboarding, editing, and post-production with AI",
        "Understand ethical AI use and creative responsibility",
        "Guided demos, assignments, and group projects",
        "Learn from AI expert with 20+ years experience and 2 patents",
        "Online format with live interactive sessions",
        "Practical, hands-on approach to AI filmmaking",
        "No prior AI or filmmaking experience required",
        "Certificate from India's premier film institute",
      ],
      curriculum: [
        "Introduction to AI in filmmaking and content creation",
        "Understanding generative AI and its applications",
        "AI for storytelling and narrative development",
        "Script ideation using AI tools",
        "Prompt engineering and design techniques",
        "AI-based image generation and manipulation",
        "AI-powered video creation and editing",
        "Sound design and music creation with AI",
        "Storyboarding with AI assistance",
        "AI tools for pre-production planning",
        "Post-production techniques using AI",
        "Color grading and visual effects with AI",
        "Ethical considerations in AI content creation",
        "Copyright and attribution in AI-generated content",
        "Creative responsibility and AI limitations",
        "Industry trends and future of AI in filmmaking",
        "Practical workflow integration",
        "Best practices for AI-assisted filmmaking",
      ],
      practicalExperience: [
        "Hands-on AI tool demonstrations",
        "Script writing exercises with AI assistance",
        "Image generation projects",
        "Video creation assignments",
        "Sound design experiments",
        "Storyboard development with AI",
        "Group collaborative projects",
        "Individual creative assignments",
        "Real-time problem-solving sessions",
        "Peer review and feedback",
        "Portfolio development guidance",
        "Live Q&A with instructor",
      ],
      learningOutcomes: [
        "Understand the role of AI in modern filmmaking",
        "Master generative AI tools for content creation",
        "Develop effective prompt engineering skills",
        "Create compelling scripts with AI assistance",
        "Generate high-quality images using AI",
        "Produce videos with AI-powered tools",
        "Design sound and music using AI platforms",
        "Build storyboards efficiently with AI",
        "Apply AI in editing and post-production",
        "Navigate ethical considerations in AI content",
        "Understand copyright and attribution issues",
        "Integrate AI tools into creative workflow",
        "Balance AI assistance with human creativity",
        "Recognize AI limitations and opportunities",
        "Build a foundation for AI-assisted filmmaking career",
      ],
      aboutInstructor:
        "Dr. Alwin Anuse – Associate Professor at FTII Pune with a Ph.D. from COEP (College of Engineering, Pune). A leading researcher in Artificial Intelligence, Deep Learning, and Visual Media with over 20 years of combined teaching and industry experience. His work has been published in prestigious international journals by Springer and Elsevier, and he holds 2 patents in technology innovation. Dr. Anuse brings cutting-edge AI knowledge combined with deep understanding of filmmaking and visual storytelling, making him uniquely qualified to teach the intersection of AI and cinema. His teaching philosophy emphasizes practical application, ethical responsibility, and maintaining human creativity at the center of AI-assisted content creation.",
      instructorExperience: [
        "20+ years in teaching and industry",
        "Associate Professor at FTII Pune",
        "Ph.D. from COEP (College of Engineering, Pune)",
        "Researcher in AI, Deep Learning & Visual Media",
        "Published with Springer & Elsevier",
        "Holds 2 patents in technology innovation",
        "Expert in AI applications for creative industries",
        "Specialist in generative AI and content creation",
        "Experienced in online teaching and mentorship",
      ],
      uniqueExperience: [
        "Learn from India's premier film institute (FTII)",
        "Instructor with 20+ years experience and 2 patents",
        "Cutting-edge AI tools and techniques",
        "Practical, hands-on approach to learning",
        "Live interactive online sessions",
        "Guided demos and real-time problem solving",
        "Individual assignments and group projects",
        "Focus on ethical AI use and creative responsibility",
        "Balance between AI assistance and human creativity",
        "No prior AI or filmmaking experience required",
        "Accessible online format from anywhere in India",
        "FTII certificate adds professional credibility",
      ],
      targetAudience: [
        "Aspiring filmmakers interested in AI",
        "Content creators wanting to leverage AI tools",
        "Film students exploring new technologies",
        "Video editors seeking AI skills",
        "Screenwriters interested in AI assistance",
        "Digital artists and designers",
        "Marketing professionals creating video content",
        "Educators teaching media and technology",
        "Anyone curious about AI in creative fields",
        "Professionals wanting to upskill in AI filmmaking",
      ],
      workshopPolicies: [
        "Punctuality required for all online sessions",
        "Active participation in demos and discussions mandatory",
        "Completion of assignments required for certificate",
        "Stable internet connection essential",
        "Laptop/Desktop mandatory (mobile not allowed)",
        "Headphones and HD webcam required",
        "Minimum 4GB RAM and Intel i3+ processor needed",
        "Google Classroom and Google Meet will be used",
        "Recording of sessions may be available",
        "Certificate awarded upon 90% attendance and assignment completion",
      ],
      contactInfo: [
        "Mr. Milindkumar Joshi - Assistant Outreach Officer, FTII",
        "Email: info.cfol@ftii.ac.in / ftiicfol@gmail.com",
        "Phone: 020–25580085 (working days, office hours only)",
      ],
      additionalInfo:
        "This 5-day online Basic Course on Creating Films & AV Content using AI at FTII Pune represents the future of filmmaking education. As the camera evolves and imagination begins to direct the machine, this course offers a comprehensive introduction to AI-powered content creation. Led by Dr. Alwin Anuse, an Associate Professor at FTII with a Ph.D., 20+ years of experience, 2 patents, and publications in Springer and Elsevier, participants will explore the cutting edge of generative AI for storytelling and visualization. The course covers script ideation and prompt design, AI-based image, video, and sound creation, storyboarding, editing, and post-production with AI, all while emphasizing ethical AI use and creative responsibility. Through guided demos, practical assignments, and collaborative group projects, students will gain hands-on experience with the latest AI tools while maintaining human creativity at the center of the process. The online format makes this accessible to participants across India, requiring only a laptop/desktop with minimum 4GB RAM, stable 10 Mbps internet, and headphones with HD webcam. With 20 hours of intensive training spread across 5 days, this course provides a solid foundation for anyone looking to integrate AI into their filmmaking or content creation workflow.",
    },
  },
  // ADD NEW WORKSHOPS HERE
  // Format:
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

  // Function to get workshop by ID, handling potential string ID
  const getWorkshopById = (workshopId: number | string) => {
    // Ensure workshopId is treated as a number if it's a string representation of a number
    const numericId = typeof workshopId === "string" ? Number.parseInt(workshopId, 10) : workshopId
    return workshops.find((w) => w.id === numericId) || null
  }

  useEffect(() => {
    const foundWorkshop = getWorkshopById(id)
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
    // Redundant check, already covered by the above. Removed to avoid confusion.
    // if (workshop.institution === "Threads & Tales") {
    //   return "/images/threads-tales-logo.png"
    // }
    return workshop.image || "/images/acting-workshop.png"
  }

  const detailImageSrc = getDetailImageSource()
  const isParadoxStudios = workshop.institution === "Paradox Studios"
  const isIIET = workshop.institution === "Indian Institute of Educational Theatre (IIET)"
  const isThreadsTales = workshop.institution === "Threads & Tales"
  const isNSD = workshop.institution === "National School of Drama (NSD)"
  const isFTII = workshop.institution === "Film and Television Institute of India (FTII)"

  return (
    <div className="container py-6 md:py-12">
      <Link href="/workshops" className="inline-flex items-center text-primary hover:underline mb-4 md:mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Workshops
      </Link>

      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="relative h-48 md:h-64 w-full">
          <div
            className={`absolute inset-0 ${isParadoxStudios || isThreadsTales ? "bg-white" : isIIET ? "bg-gray-900" : isNSD ? "bg-gradient-to-br from-orange-100 to-red-100" : isFTII ? "bg-gradient-to-br from-blue-100 to-indigo-100" : "bg-gray-900"}`}
          >
            <Image
              src={detailImageSrc || "/placeholder.svg"}
              alt={workshop.title}
              fill
              className={`${isParadoxStudios || isThreadsTales ? "object-contain p-6" : isIIET ? "object-contain p-8" : isNSD || isFTII ? "object-cover" : "object-cover"}`}
              sizes="100vw"
              priority
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/placeholder.svg?height=400&width=800&text=Workshop+Image"
              }}
            />
          </div>
          <div
            className={`absolute inset-0 ${isParadoxStudios || isThreadsTales ? "bg-gradient-to-t from-black/60 via-transparent to-transparent" : isIIET ? "bg-gradient-to-t from-black/80 via-black/40 to-transparent" : isNSD ? "bg-gradient-to-t from-black/70 via-black/30 to-transparent" : isFTII ? "bg-gradient-to-t from-black/70 via-black/30 to-transparent" : "bg-gradient-to-t from-black/80 via-black/30 to-transparent"}`}
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
              ) : isFTII ? (
                <Link
                  href="https://ftii.ac.in"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-blue-200 underline transition-colors"
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

              {/* Privacy Notice for FTII workshops */}
              {(workshop.id === 23 ||
                workshop.id === 24 ||
                workshop.id === 25 ||
                workshop.id === 26 ||
                workshop.id === 27 ||
                workshop.id === 28 ||
                workshop.id === 34 ||
                workshop.id === 35 ||
                workshop.id === 36 ||
                workshop.id === 37 ||
                workshop.id === 38 ||
                workshop.id === 39 ||
                workshop.id === 40 ||
                workshop.id === 41) && (
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
                    workshop.id === 33 ||
                    workshop.id === 34 ||
                    workshop.id === 35 ||
                    workshop.id === 36 ||
                    workshop.id === 37 ||
                    workshop.id === 38 ||
                    workshop.id === 39 ||
                    workshop.id === 40 ||
                    workshop.id === 41) &&
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
                                  : workshop.id === 34
                                    ? "About the Course Director"
                                    : workshop.id === 35
                                      ? "About the Course Director"
                                      : workshop.id === 36
                                        ? "About the Course Director"
                                        : workshop.id === 37
                                          ? "About the Course Director"
                                          : workshop.id === 38
                                            ? "About the Instructor"
                                            : workshop.id === 39
                                              ? "About the Instructor"
                                              : workshop.id === 40
                                                ? "About the Instructors"
                                                : workshop.id === 41
                                                  ? "About the Course Director"
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

                  {workshop.fullDetails.instructorExperience &&
                    (workshop.id === 34 ||
                      workshop.id === 36 ||
                      workshop.id === 37 ||
                      workshop.id === 39 ||
                      workshop.id === 40) && (
                      <div>
                        <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">
                          {workshop.id === 40 ? "Instructors' Experience" : "Instructor Experience"}
                        </h3>
                        <ul className="space-y-2">
                          {workshop.fullDetails.instructorExperience.map((experience: string, index: number) => (
                            <li key={index} className="flex items-start">
                              <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-700">{experience}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                  {workshop.fullDetails.batchDetails && (workshop.id === 34 || workshop.id === 35) && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Batch Details</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.batchDetails.map((batch: string, index: number) => (
                          <li key={index} className="flex items-start">
                            <Clock className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{batch}</span>
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
                    workshop.id === 33 ||
                    workshop.id === 34 ||
                    workshop.id === 35 ||
                    workshop.id === 36 ||
                    workshop.id === 37 ||
                    workshop.id === 38 ||
                    workshop.id === 39 ||
                    workshop.id === 40 ||
                    workshop.id === 41) && (
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
                        workshop.id === 33 ||
                        workshop.id === 34 ||
                        workshop.id === 35 ||
                        workshop.id === 36 ||
                        workshop.id === 37 ||
                        workshop.id === 38 ||
                        workshop.id === 39 ||
                        workshop.id === 40 ||
                        workshop.id === 41
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
                              : workshop.id === 34 ||
                                  workshop.id === 35 ||
                                  workshop.id === 36 ||
                                  workshop.id === 37 ||
                                  workshop.id === 38 ||
                                  workshop.id === 39 ||
                                  workshop.id === 40 ||
                                  workshop.id === 41
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : workshop.id === 38
                                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                                  : workshop.id === 39
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
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
                          : workshop.id === 36
                            ? "Register Now"
                            : workshop.id === 37
                              ? "Register Now"
                              : workshop.id === 38
                                ? "Register Now"
                                : workshop.id === 39
                                  ? "Register Now"
                                  : workshop.id === 40
                                    ? "Register Now"
                                    : workshop.id === 41
                                      ? "Register Now"
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
