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
    trainer: "Prof. Sandeep Shahare (Head of TV Engineering, FTII)",
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
        "Prof. Sandeep Shahare (Head of TV Engineering and Dean (TV), FTII with 29 years of professional & teaching experience, M.E. in Electronics & Telecom from COEP)",
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
        "Recording and playback operations",
        "Program production workflow",
        "Creating a complete 2-5 minute TV program",
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
        "Anyone interested in television broadcasting",
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
    id: 42,
    title: "ACT IT OUT – 7 Days Theatre Workshop",
    trainer: "Mr. Arun Srivastava",
    institution: "Vinod Rastogi Smriti Sansthan",
    location: "Prayagraj",
    state: "Uttar Pradesh",
    date: "24th October 2025",
    time: "Everyday 10:00 AM",
    description:
      "🎭 Unleash your hidden performer & step into the world of stage! A comprehensive 7-day theatre workshop covering basic understanding of theatre & human activities, physical exercises & theatre games, script reading, pronunciation & diction, work on Rasa's & Bhava, and improvisation & performance techniques. Under the supervision of Ajay Mukherjee and mentored by Mr. Arun Srivastava (Research Scholar, University of Rajasthan | Alumnus – Mandi School of Drama & Pondicherry University).",
    image: "/images/acting-workshop.png",
    registrationLink: "https://forms.gle/9Dw8N1eJDCNpE3Mb7",
    featured: true,
    price: "₹500",
    contact: "+91 7783912449",
    email: "Via registration form",
    eligibility: "Open to all",
    venue: "Maharashtra Lok Sewa Mandal, Alopibagh, Prayagraj",
    includes: "Certificate + Comprehensive theatre training",
    highlights: [
      "Basic understanding of theatre & human activities",
      "Physical exercises & theatre games",
      "Script reading, pronunciation & diction",
      "Work on Rasa's & Bhava",
      "Improvisation & performance techniques",
    ],
    fullDetails: {
      description:
        "🎭 Unleash your hidden performer & step into the world of stage! ACT IT OUT is a comprehensive 7-day theatre workshop designed to introduce participants to the fundamentals of theatre arts and performance. Whether you're a complete beginner or have some experience, this workshop will help you discover your inner performer and develop essential theatre skills.",
      venue: "Maharashtra Lok Sewa Mandal, Alopibagh, Prayagraj",
      organizer: "Vinod Rastogi Smriti Sansthan",
      duration: "7 days (Starting 24th October 2025)",
      medium: "Hindi & English",
      supervisor: "Ajay Mukherjee",
      courseDirector:
        "Mr. Arun Srivastava (Research Scholar, University of Rajasthan | Alumnus – Mandi School of Drama & Pondicherry University). An accomplished theatre practitioner and educator with extensive training from prestigious institutions, Mr. Srivastava brings a wealth of knowledge in classical and contemporary theatre practices. Under the supervision of Ajay Mukherjee, this workshop benefits from experienced leadership committed to nurturing new talent in the performing arts.",
      eligibilityCriteria: [
        "Open to all age groups",
        "No prior theatre experience required",
        "Passion for performing arts and willingness to learn",
        "Commitment to attend all 7 days of the workshop",
        "Physical fitness for movement and exercise activities",
        "Open mind and readiness to explore creative expression",
      ],
      applicationDeadline: "Registration open until workshop starts",
      selectionProcess: "First-Come, First-Served basis",
      courseFee: "₹500 per person (highly affordable)",
      certification: "Certificate of Participation will be provided",
      keyHighlights: [
        "Comprehensive 7-day intensive theatre training",
        "Learn from experienced theatre professionals",
        "Hands-on practical training in all aspects of theatre",
        "Focus on classical Indian theatre concepts (Rasa & Bhava)",
        "Modern improvisation and performance techniques",
        "Small batch size for personalized attention",
        "Affordable fee of only ₹500",
        "Certificate upon completion",
        "Supervised by Ajay Mukherjee",
        "Mentored by alumnus of Mandi School of Drama & Pondicherry University",
        "Perfect for beginners and enthusiasts",
        "Build confidence and stage presence",
      ],
      curriculum: [
        "Introduction to theatre and its role in human activities",
        "Understanding the basics of dramatic arts",
        "Theatre history and evolution",
        "Physical exercises for actors",
        "Body awareness and movement training",
        "Theatre games for ensemble building",
        "Trust and collaboration exercises",
        "Script reading techniques",
        "Understanding dramatic text",
        "Pronunciation and diction training",
        "Voice modulation and projection",
        "Articulation exercises",
        "Introduction to Rasa (aesthetic emotions)",
        "Understanding Bhava (emotional states)",
        "Classical Indian theatre concepts",
        "Improvisation fundamentals",
        "Spontaneity and creativity exercises",
        "Performance techniques for stage",
        "Character development basics",
        "Stage presence and confidence building",
      ],
      practicalExperience: [
        "Daily physical warm-up and exercises",
        "Interactive theatre games and activities",
        "Script reading practice sessions",
        "Voice and diction exercises",
        "Rasa and Bhava exploration through exercises",
        "Improvisation workshops",
        "Group performance activities",
        "Individual presentation opportunities",
        "Peer feedback and discussion sessions",
        "Final showcase or presentation",
      ],
      learningOutcomes: [
        "Understand the fundamentals of theatre arts",
        "Develop physical awareness and stage presence",
        "Master basic voice and diction techniques",
        "Learn classical Indian theatre concepts (Rasa & Bhava)",
        "Build improvisation and spontaneity skills",
        "Gain confidence in public performance",
        "Develop teamwork and collaboration abilities",
        "Understand script reading and interpretation",
        "Build a foundation for further theatre training",
        "Connect with fellow theatre enthusiasts",
        "Discover your creative potential",
        "Overcome stage fright and inhibitions",
      ],
      aboutInstructor:
        "Mr. Arun Srivastava is a dedicated theatre practitioner and educator currently pursuing research at the University of Rajasthan. As an alumnus of both Mandi School of Drama and Pondicherry University, he brings a unique blend of traditional and contemporary theatre knowledge. His training encompasses classical Indian theatre forms as well as modern performance techniques, making him well-equipped to guide students through a comprehensive theatre education. Under the supervision of Ajay Mukherjee, this workshop benefits from experienced leadership committed to nurturing new talent in the performing arts.",
      instructorExperience: [
        "Research Scholar at University of Rajasthan",
        "Alumnus of Mandi School of Drama",
        "Alumnus of Pondicherry University",
        "Trained in classical Indian theatre forms",
        "Experienced in contemporary performance techniques",
        "Expertise in Rasa and Bhava theory and practice",
        "Expertise in improvisation and devised theatre",
        "Passionate about theatre education",
      ],
      uniqueExperience: [
        "Learn from alumni of prestigious theatre institutions",
        "Affordable workshop fee of only ₹500",
        "Comprehensive 7-day intensive training",
        "Focus on both classical and modern techniques",
        "Small batch size for personalized attention",
        "Hands-on practical approach to learning",
        "Explore classical Indian theatre concepts",
        "Build confidence through performance",
        "Certificate of participation",
        "Supportive and encouraging learning environment",
        "Perfect for beginners with no experience",
        "Located in the cultural city of Prayagraj",
      ],
      workshopPolicies: [
        "Punctuality required for all sessions (10:00 AM daily)",
        "Commitment to attend all 7 days mandatory",
        "Comfortable clothing suitable for movement required",
        "Active participation in all activities expected",
        "Respectful and supportive behavior towards fellow participants",
        "Mobile phones to be kept on silent during sessions",
        "Certificate awarded upon 100% attendance",
        "Registration fee of ₹500 to be paid in advance",
        "Follow all instructions from workshop facilitators",
        "Maintain discipline and focus during sessions",
      ],
      contactInfo: [
        "Contact: +91 7783912449",
        "Registration: https://forms.gle/9Dw8N1eJDCNpE3Mb7",
        "Social Media: @Officialvrss",
        "Organized by: Vinod Rastogi Smriti Sansthan",
      ],
      additionalInfo:
        "ACT IT OUT is a 7-day theatre workshop organized by Vinod Rastogi Smriti Sansthan, designed to make quality theatre education accessible to everyone. With an incredibly affordable fee of just ₹500, this workshop removes financial barriers to learning the performing arts. Under the supervision of Ajay Mukherjee and mentored by Mr. Arun Srivastava (Research Scholar at University of Rajasthan and alumnus of Mandi School of Drama & Pondicherry University), participants will receive comprehensive training in theatre fundamentals. The workshop covers essential topics including basic understanding of theatre and human activities, physical exercises and theatre games, script reading with focus on pronunciation and diction, classical Indian theatre concepts of Rasa and Bhava, and modern improvisation and performance techniques. Starting from 24th October 2025 at 10:00 AM daily, the workshop will be held at Maharashtra Lok Sewa Mandal, Alopibagh, Prayagraj. This intensive 7-day program is perfect for complete beginners, students, working professionals, or anyone interested in exploring their creative potential through theatre. With hands-on practical training, small batch sizes for personalized attention, and a supportive learning environment, participants will build confidence, develop stage presence, and gain a solid foundation in theatre arts. A certificate of participation will be awarded upon completion, recognizing your commitment to learning and growth in the performing arts.",
    },
  },
  {
    id: 43,
    title: "NSD Job: Theatre Experts for Children's Theatre Workshops",
    trainer: "National School of Drama",
    institution: "National School of Drama (NSD)",
    location: "New Delhi",
    state: "Delhi",
    date: "Application Deadline: 9 November 2025",
    time: "Short-term engagement",
    description:
      "💼 Job Opportunity: NSD seeks qualified theatre professionals for Children's Theatre Workshops. 4 positions available: Workshop Director (₹1,00,000 + benefits, 35 days), Assistant Director (₹45,000 + benefits, 35 days), Centre Coordinator (₹30,000 + benefits, 35 days), Assistant Coordinator PMU (₹45,000/month, 60 days). Apply by 9 Nov 2025.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://nsd.gov.in/delhi/index.php/engagement-of-theatre-experts-for-the-upcoming-children-theatre-workshops-and-festivals/",
    featured: true,
    price: "₹30,000 - ₹1,00,000 (based on position)",
    contact: "011-23389402 / 23387916",
    email: "registrarnsd@gmail.com",
    eligibility: "NSD Graduate or equivalent degree in Theatre / Formal training with relevant experience",
    venue: "Various locations for Children's Theatre Workshops",
    includes: "Honorarium + T.A./D.A./Conveyance as per NSD norms",
    fullDetails: {
      description:
        "💼 National School of Drama (NSD), New Delhi invites applications for short-term engagement of qualified and experienced theatre professionals for upcoming Children's Theatre Workshops and Festivals. This is a prestigious opportunity to work with India's premier theatre institution and contribute to children's theatre education across the country.",
      venue: "Various locations for Children's Theatre Workshops and Festivals",
      organizer: "National School of Drama (NSD), New Delhi",
      duration: "35-60 days (based on position)",
      medium: "As per workshop requirements",
      applicationDeadline: "9 November 2025",
      selectionProcess: "Based on qualification and experience; interviews may be conducted",
      eligibilityCriteria: [
        "Position-specific eligibility (see positions below)",
        "Relevant theatre education and experience",
        "Proven track record in theatre work",
        "Ability to work with children (for relevant positions)",
        "Strong organizational and coordination skills (for coordinator positions)",
      ],
      keyHighlights: [
        "Work with National School of Drama (NSD)",
        "Short-term project-based engagement",
        "Competitive honorarium packages",
        "T.A./D.A./Conveyance benefits as per NSD norms",
        "Opportunity to contribute to children's theatre",
        "Work on prestigious NSD projects",
        "Gain experience with India's premier drama institution",
        "Multiple positions available across different roles",
      ],
      positions: [
        {
          title: "Workshop Director",
          posts: "4 Posts",
          eligibility:
            "NSD Graduate or equivalent degree in Theatre / Expert with proven experience in Children's Theatre",
          duration: "35 days",
          honorarium: "₹1,00,000 + T.A./D.A./Conveyance as per NSD norms",
          responsibilities: [
            "Direct and oversee Children's Theatre Workshops",
            "Develop workshop curriculum and content",
            "Lead training sessions for participants",
            "Ensure quality delivery of workshop objectives",
            "Coordinate with NSD and partner organizations",
            "Supervise assistant directors and coordinators",
          ],
        },
        {
          title: "Assistant Director",
          posts: "4 Posts",
          eligibility: "NSD Graduate or equivalent degree in Theatre / Expert with experience in Children's Theatre",
          duration: "35 days",
          honorarium: "₹45,000 + T.A./D.A./Conveyance as per NSD norms",
          responsibilities: [
            "Assist Workshop Director in conducting workshops",
            "Support in curriculum development and delivery",
            "Conduct training sessions under supervision",
            "Coordinate workshop activities and logistics",
            "Maintain workshop documentation",
            "Support in participant management",
          ],
        },
        {
          title: "Centre Coordinator",
          posts: "4 Posts",
          eligibility:
            "Formal training in Theatre with minimum one year experience in coordination or organizational work",
          duration: "35 days",
          honorarium: "₹30,000 + Conveyance",
          responsibilities: [
            "Coordinate workshop logistics and operations",
            "Manage venue arrangements and facilities",
            "Coordinate with participants and stakeholders",
            "Handle administrative tasks",
            "Support directors in workshop execution",
            "Maintain records and documentation",
          ],
        },
        {
          title: "Assistant Coordinator (PMU)",
          posts: "1 Post",
          eligibility:
            "Formal training in Theatre with minimum one year experience in coordination, clerical work, computer literacy, and payment-related paperwork",
          duration: "60 days",
          honorarium: "₹45,000 per month",
          responsibilities: [
            "Coordinate Project Management Unit (PMU) activities",
            "Handle clerical and administrative work",
            "Manage payment-related paperwork and documentation",
            "Maintain digital records and databases",
            "Support overall project coordination",
            "Assist in financial documentation and reporting",
          ],
        },
      ],
      generalTerms: [
        "Engagement is purely temporary and project-based",
        "No employer-employee relationship will be established",
        "Selection based on qualification and experience",
        "Interviews may be conducted for shortlisted candidates",
        "NSD reserves the right to cancel or modify the advertisement",
        "Decision of NSD regarding eligibility and selection will be final and binding",
        "Selected candidates must be available for the entire duration",
        "Professional conduct and commitment expected throughout engagement",
      ],
      applicationProcess: [
        "Prepare your updated CV with detailed experience",
        "Gather relevant educational certificates and documents",
        "Include a recent passport-size photograph",
        "Clearly mention the position you're applying for",
        "Send complete application to: registrarnsd@gmail.com",
        "Ensure all documents are properly scanned and attached",
        "Submit application before deadline: 9 November 2025",
        "Keep a copy of your application for reference",
      ],
      requiredDocuments: [
        "Updated CV/Resume with detailed experience",
        "Educational certificates (NSD/Theatre degree or equivalent)",
        "Experience certificates from previous theatre work",
        "Recent passport-size photograph",
        "Identity proof (Aadhaar/PAN/Passport)",
        "Any awards or recognition certificates (if applicable)",
        "Portfolio of theatre work (if available)",
        "References from theatre professionals (recommended)",
      ],
      learningOutcomes: [
        "Gain experience working with NSD",
        "Contribute to children's theatre education",
        "Develop professional theatre expertise",
        "Build network with theatre professionals",
        "Enhance workshop facilitation skills",
        "Work on prestigious national-level projects",
        "Add NSD experience to professional portfolio",
        "Develop organizational and coordination skills",
      ],
      aboutNSD:
        "National School of Drama (NSD) is India's premier theatre training institution and a leading center for theatre research and practice. Established in 1959, NSD has been at the forefront of theatre education in India, producing some of the finest theatre practitioners, actors, directors, and designers. The institution is renowned for its comprehensive theatre training programs, research initiatives, and commitment to promoting theatre arts across the country. Working with NSD provides an unparalleled opportunity to contribute to India's rich theatre tradition and gain experience with the nation's most prestigious drama institution.",
      uniqueExperience: [
        "Work with India's premier theatre institution",
        "Contribute to children's theatre development",
        "Competitive honorarium packages",
        "Additional benefits (T.A./D.A./Conveyance)",
        "Short-term project-based engagement",
        "Multiple positions across different roles",
        "Opportunity to work on national-level projects",
        "Enhance professional credentials",
        "Network with leading theatre professionals",
        "Gain NSD work experience",
      ],
      targetAudience: [
        "NSD graduates and alumni",
        "Theatre professionals with relevant degrees",
        "Experienced children's theatre practitioners",
        "Theatre coordinators and administrators",
        "Theatre educators and trainers",
        "Professionals with organizational experience in theatre",
        "Individuals with formal theatre training",
        "Theatre experts seeking short-term engagements",
      ],
      contactInfo: [
        "Email: registrarnsd@gmail.com",
        "Phone: 011-23389402 / 23387916",
        "Registration Link: https://nsd.gov.in/delhi/index.php/engagement-of-theatre-experts-for-the-upcoming-children-theatre-workshops-and-festivals/",
        "Organization: National School of Drama (NSD), New Delhi",
      ],
      additionalInfo:
        "This is a unique opportunity to work with National School of Drama (NSD), India's premier theatre institution, on Children's Theatre Workshops and Festivals. NSD is seeking qualified and experienced theatre professionals for four different positions: Workshop Director (4 posts, ₹1,00,000 + benefits for 35 days), Assistant Director (4 posts, ₹45,000 + benefits for 35 days), Centre Coordinator (4 posts, ₹30,000 + conveyance for 35 days), and Assistant Coordinator PMU (1 post, ₹45,000/month for 60 days). All positions come with additional benefits including T.A./D.A./Conveyance as per NSD norms. The engagement is purely temporary and project-based, with selection based on qualification and experience. Interviews may be conducted for shortlisted candidates. Eligible candidates should have NSD graduation or equivalent theatre degree, or formal theatre training with relevant experience depending on the position. This is an excellent opportunity to contribute to children's theatre education, work with India's most prestigious drama institution, and enhance your professional portfolio. Applications must be submitted by 9 November 2025 via email to registrarnsd@gmail.com with complete CV, relevant documents, and a recent photograph. NSD reserves the right to cancel or modify the advertisement, and the decision of NSD regarding eligibility and selection will be final and binding.",
    },
  },
  {
    id: 44,
    title: "Support For Actors, Storytellers & Presenters — Speech Coaching",
    trainer: "Creative Director (MA English, Former HOD of English)",
    institution: "Paradox Studios",
    location: "Online",
    state: "Karnataka",
    date: "Ongoing",
    time: "Flexible scheduling",
    description:
      "🎤 FREE Speech Coaching! Auditioning for a play? Starting a podcast? Want to improve your speech and diction? Paradox Studios offers two free coaching sessions to sharpen your speech delivery. Led by an MA English degree-holder, former HOD of English, and seasoned public speaking coach.",
    image: "/images/paradox-studios-logo.png",
    registrationLink:
      "https://docs.google.com/forms/d/e/1FAIpQLSfwqU9RF-zABbUxNPpN-G4KSBJ8ZV2nDf1tsLp3LsPQuF6e_w/viewform",
    featured: true,
    price: "Free (2 coaching sessions)",
    contact: "Via registration form",
    email: "Via registration form",
    eligibility: "Open to all actors, storytellers, and presenters",
    venue: "Online Sessions",
    includes: "Speech coaching + Diction improvement + Audition preparation + Podcast tips",
    fullDetails: {
      description:
        "🎤 Paradox Studios is offering FREE speech coaching support for actors, storytellers, and presenters! Whether you're auditioning for a play, looking for tips to start your own podcast, or simply want to improve your general speech and diction, these two complimentary coaching sessions will help you sharpen your speech delivery and boost your confidence. Led by Paradox Studios' Creative Director — an MA English degree-holder, former Head of Department (HOD) of English, and a seasoned public speaking coach with extensive experience in training performers and communicators.",
      venue: "Online Sessions (Flexible scheduling)",
      organizer: "Paradox Studios",
      duration: "2 free coaching sessions",
      medium: "Online (Video call sessions)",
      applicationDeadline: "Ongoing - Register anytime",
      selectionProcess: "First-Come, First-Served basis",
      eligibilityCriteria: [
        "Open to all actors, storytellers, and presenters",
        "Suitable for beginners and experienced performers",
        "Anyone preparing for auditions",
        "Aspiring podcasters and content creators",
        "Individuals looking to improve speech and diction",
        "Public speakers seeking professional guidance",
        "No prior experience required",
      ],
      keyHighlights: [
        "Completely FREE - Two coaching sessions at no cost",
        "Led by MA English degree-holder and former HOD of English",
        "Seasoned public speaking coach with extensive experience",
        "Flexible online sessions - convenient scheduling",
        "Personalized one-on-one coaching",
        "Focus on practical speech improvement",
        "Audition preparation support",
        "Podcast and presentation tips",
        "Professional diction training",
        "Boost confidence in public speaking",
      ],
      coachingAreas: [
        {
          title: "Audition Preparation",
          description: "Get expert guidance for theatre and film auditions",
          topics: [
            "Script reading and interpretation",
            "Voice modulation for character work",
            "Clear articulation and pronunciation",
            "Emotional delivery techniques",
            "Confidence building for auditions",
            "Handling audition nerves",
          ],
        },
        {
          title: "Podcast & Content Creation",
          description: "Learn essential skills for starting and improving your podcast",
          topics: [
            "Voice training for audio content",
            "Engaging storytelling techniques",
            "Microphone techniques and voice projection",
            "Pacing and rhythm in speech",
            "Creating compelling audio narratives",
            "Professional presentation skills",
          ],
        },
        {
          title: "Speech & Diction Improvement",
          description: "Enhance your overall speech quality and clarity",
          topics: [
            "Pronunciation and articulation exercises",
            "Accent neutralization (if desired)",
            "Breathing techniques for speech",
            "Voice modulation and tone control",
            "Eliminating filler words",
            "Building vocal confidence",
          ],
        },
        {
          title: "Public Speaking & Presentation",
          description: "Master the art of effective communication",
          topics: [
            "Structuring compelling presentations",
            "Engaging your audience",
            "Body language and vocal presence",
            "Handling Q&A sessions",
            "Overcoming stage fright",
            "Professional communication skills",
          ],
        },
      ],
      aboutCoach:
        "The coaching sessions are led by Paradox Studios' Creative Director, who brings a wealth of academic and practical experience to the table. With an MA in English and having served as Head of Department (HOD) of English, the coach combines deep linguistic knowledge with extensive teaching experience. As a seasoned public speaking coach, they have trained numerous actors, presenters, and communicators, helping them develop clear, confident, and compelling speech delivery. Their approach is personalized, practical, and focused on achieving tangible improvements in a short time.",
      sessionStructure: [
        "Initial assessment of your current speech patterns and goals",
        "Personalized coaching plan based on your specific needs",
        "Practical exercises and techniques for immediate improvement",
        "Focused work on your areas of concern (auditions/podcasts/diction)",
        "Real-time feedback and corrections",
        "Actionable tips and practice recommendations",
        "Follow-up guidance for continued improvement",
        "Two comprehensive sessions tailored to your requirements",
      ],
      learningOutcomes: [
        "Improved speech clarity and articulation",
        "Enhanced confidence in public speaking",
        "Better audition performance skills",
        "Professional podcast presentation techniques",
        "Stronger vocal presence and projection",
        "Effective communication strategies",
        "Reduced speech anxiety and nervousness",
        "Practical tools for ongoing improvement",
        "Personalized feedback and guidance",
        "Professional speech coaching experience",
      ],
      whoShouldAttend: [
        "Actors preparing for auditions",
        "Aspiring podcasters and content creators",
        "Theatre performers seeking voice improvement",
        "Storytellers and narrators",
        "Public speakers and presenters",
        "Anyone wanting to improve speech and diction",
        "Professionals needing communication skills",
        "Students preparing for performances",
        "Voice-over artists and dubbing artists",
        "Anyone seeking confident speech delivery",
      ],
      uniqueExperience: [
        "Completely free - no hidden costs",
        "Expert coaching from MA English degree-holder",
        "Former HOD of English with academic excellence",
        "Seasoned public speaking coach",
        "Personalized one-on-one attention",
        "Flexible online scheduling",
        "Practical, results-oriented approach",
        "Focus on immediate improvement",
        "Supportive and encouraging environment",
        "Professional guidance at no cost",
      ],
      registrationProcess: [
        "Visit the registration form link",
        "Fill in your basic details and contact information",
        "Specify your area of interest (audition prep/podcast/diction/presentation)",
        "Mention your current experience level",
        "Share your specific goals and challenges",
        "Submit the form",
        "Wait for Paradox Studios to contact you",
        "Schedule your two free coaching sessions",
      ],
      additionalInfo:
        "This is a rare opportunity to receive professional speech coaching absolutely free! Paradox Studios is committed to supporting actors, storytellers, and presenters in their journey to becoming more confident and effective communicators. Whether you're preparing for an important audition, planning to launch your podcast, or simply want to speak more clearly and confidently, these two free coaching sessions provide personalized guidance from an experienced professional. The Creative Director brings both academic credentials (MA English, former HOD) and practical expertise as a seasoned public speaking coach. Sessions are conducted online for your convenience, with flexible scheduling to accommodate your availability. Don't miss this chance to sharpen your speech delivery, improve your diction, and boost your confidence — all at no cost. Register now through the Google Form and take the first step toward becoming a more powerful and persuasive communicator!",
      contactInfo: [
        "Registration: https://docs.google.com/forms/d/e/1FAIpQLSfwqU9RF-zABbUxNPpN-G4KSBJ8ZV2nDf1tsLp3LsPQuF6e_w/viewform",
        "Organization: Paradox Studios",
        "Mode: Online Sessions",
        "Cost: Completely FREE (2 coaching sessions)",
      ],
    },
  },
  {
    id: 45,
    title: "FTII Foundation Course in Filmmaking – Goa",
    trainer: "Avinash & Jasmine Roy (National Award-winning filmmakers)",
    institution: "Film and Television Institute of India (FTII) & Arthouse Film Academy",
    location: "Saligao, Goa",
    state: "Goa",
    date: "10–23 December 2025",
    time: "10 AM – 5 PM",
    description:
      "🎬 Learn filmmaking hands-on in Goa! A comprehensive 14-day intensive course covering writing, direction, cinematography & editing under National Award-winning filmmakers Avinash & Jasmine Roy. Perfect for aspiring filmmakers seeking practical skills in a short-term program. Limited to 18 seats only.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/foundation-course-in-filmmaking-in-goa-10-23-december-2025",
    featured: true,
    price: "₹29,000 (excludes food & accommodation)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+",
    mode: "Offline",
    applicationDeadline: "20 November 2025 (First-Come, First-Served basis)",
    selection: "First-Come, First-Served basis",
    capacity: "18 seats only",
    language: "Hindi & English",
    certification: "FTII Certificate on completion",
    venue: "Villa Azavado, Saligao, Goa",
    duration: "14 days (Intensive full-time program)",
    courseDirector: "Avinash & Jasmine Roy (National Award-winning filmmakers)",
    includes: "Writing + Direction + Cinematography + Editing + FTII Certificate",
    fullDetails: {
      description:
        "🎬 The FTII Foundation Course in Filmmaking offers aspiring filmmakers a unique opportunity to learn the complete filmmaking process in the beautiful setting of Goa. This intensive 14-day program, conducted by FTII Pune in collaboration with Arthouse Film Academy, provides hands-on training in all core aspects of filmmaking — from writing and direction to cinematography and editing. Led by National Award-winning filmmakers Avinash & Jasmine Roy, this course combines theoretical knowledge with practical application, giving participants real-world skills they can immediately apply to their filmmaking journey. With only 18 seats available, this exclusive program ensures personalized attention and immersive learning in an inspiring creative environment.",
      venue: "Villa Azavado, Saligao, Goa",
      organizer: "Film and Television Institute of India (FTII) Pune & Arthouse Film Academy",
      duration: "14 days (10–23 December 2025)",
      schedule: "Daily sessions from 10 AM to 5 PM",
      medium: "Offline (On-location in Goa)",
      applicationDeadline: "20 November 2025",
      selectionProcess: "First-Come, First-Served basis",
      eligibilityCriteria: [
        "Minimum age: 18 years",
        "Open to all aspiring filmmakers",
        "No prior filmmaking experience required",
        "Passion for cinema and storytelling",
        "Commitment to attend full 14-day program",
        "Willingness to engage in hands-on practical work",
        "Basic understanding of Hindi and/or English",
      ],
      keyHighlights: [
        "🏆 Taught by National Award-winning filmmakers Avinash & Jasmine Roy",
        "🎥 Comprehensive hands-on training in all filmmaking aspects",
        "📍 Exclusive Goa location at Villa Azavado, Saligao",
        "👥 Limited to 18 seats for personalized attention",
        "📜 FTII Certificate upon successful completion",
        "🎬 Complete filmmaking pipeline: Writing → Direction → Cinematography → Editing",
        "⚡ Intensive 14-day immersive program",
        "🌟 Collaboration between FTII Pune & Arthouse Film Academy",
        "💡 Practical, project-based learning approach",
        "🎓 Learn from India's premier film institute",
      ],
      courseModules: [
        {
          title: "Writing & Storytelling",
          description: "Master the fundamentals of screenplay writing and narrative structure",
          topics: [
            "Story development and concept creation",
            "Character development and arc",
            "Screenplay structure and formatting",
            "Dialogue writing techniques",
            "Visual storytelling principles",
            "Scene construction and pacing",
            "Theme and subtext",
            "Script analysis and breakdown",
          ],
        },
        {
          title: "Direction",
          description: "Learn the art and craft of directing for cinema",
          topics: [
            "Director's vision and interpretation",
            "Working with actors and performance",
            "Shot composition and framing",
            "Blocking and staging",
            "Directing for camera",
            "Scene coverage and continuity",
            "Creative decision-making",
            "Collaboration with crew",
          ],
        },
        {
          title: "Cinematography",
          description: "Understand the visual language of cinema through camera and lighting",
          topics: [
            "Camera operation and techniques",
            "Composition and framing principles",
            "Lighting fundamentals and setups",
            "Exposure and color theory",
            "Camera movement and angles",
            "Visual storytelling through cinematography",
            "Working with natural and artificial light",
            "Creating mood and atmosphere",
          ],
        },
        {
          title: "Editing & Post-Production",
          description: "Discover the power of editing in shaping the final narrative",
          topics: [
            "Editing software and tools",
            "Continuity and rhythm",
            "Montage and sequence building",
            "Pacing and timing",
            "Sound design basics",
            "Color grading fundamentals",
            "Storytelling through editing",
            "Final output and delivery",
          ],
        },
      ],
      aboutMentors:
        "🏆 Avinash & Jasmine Roy are National Award-winning filmmakers with extensive experience in Indian cinema. Their work has been recognized at national and international film festivals, and they bring a wealth of practical knowledge from their years in the industry. As educators, they are passionate about nurturing new talent and sharing their expertise with aspiring filmmakers. Their teaching philosophy combines technical proficiency with creative exploration, ensuring students not only learn the craft but also develop their unique artistic voice. With their guidance, participants will gain insights into both the artistic and practical aspects of filmmaking, learning from real-world experiences and industry best practices.",
      learningApproach: [
        "Hands-on practical training with real equipment",
        "Project-based learning methodology",
        "Individual and group exercises",
        "Live demonstrations and workshops",
        "Immediate feedback and guidance",
        "Collaborative filmmaking projects",
        "Theory integrated with practice",
        "Creative problem-solving sessions",
        "Industry insights and best practices",
        "Personalized mentorship from award-winning filmmakers",
      ],
      learningOutcomes: [
        "Complete understanding of the filmmaking process",
        "Practical skills in writing, direction, cinematography, and editing",
        "Ability to conceptualize and execute short film projects",
        "Confidence in working with camera and lighting equipment",
        "Understanding of visual storytelling techniques",
        "Knowledge of screenplay structure and formatting",
        "Experience in directing actors and crew",
        "Basic editing and post-production skills",
        "Industry-standard workflows and practices",
        "FTII Certificate validating your training",
      ],
      whoShouldAttend: [
        "Aspiring filmmakers looking for intensive training",
        "Content creators wanting to upgrade to cinema",
        "Theatre artists transitioning to film",
        "Photographers interested in moving images",
        "Writers wanting to direct their own stories",
        "Anyone passionate about cinema and storytelling",
        "Students considering filmmaking as a career",
        "Creative professionals seeking new skills",
        "Independent filmmakers wanting formal training",
        "Anyone aged 18+ with a passion for films",
      ],
      uniqueExperience: [
        "Learn at the scenic Villa Azavado in Goa",
        "Training by FTII Pune — India's premier film institute",
        "National Award-winning filmmakers as mentors",
        "Intimate batch size of only 18 students",
        "Complete filmmaking pipeline in 14 days",
        "Hands-on practical approach, not just theory",
        "Collaborative learning environment",
        "FTII Certificate adds credibility to your profile",
        "Networking with fellow aspiring filmmakers",
        "Immersive creative experience in inspiring location",
      ],
      practicalDetails: [
        "📅 Dates: 10–23 December 2025 (14 consecutive days)",
        "⏰ Schedule: 10 AM – 5 PM daily",
        "📍 Venue: Villa Azavado, Saligao, Goa",
        "💰 Fee: ₹29,000 (course fee only)",
        "🍽️ Food & Accommodation: Not included (arrange separately)",
        "👥 Batch Size: 18 students only",
        "📝 Application Deadline: 20 November 2025",
        "🎟️ Selection: First-Come, First-Served basis",
        "🗣️ Languages: Hindi & English",
        "📜 Certificate: FTII Certificate on completion",
      ],
      importantNotes: [
        "⚠️ Limited to 18 seats only — register early to secure your spot",
        "📌 First-Come, First-Served basis — no auditions or interviews",
        "🏠 Accommodation and meals are NOT included in the course fee",
        "🍽️ Participants must arrange their own stay and food in Goa",
        "✈️ Travel to and from Goa is participant's responsibility",
        "📅 Full attendance required for all 14 days to receive certificate",
        "🎥 Basic equipment will be provided during training",
        "💻 Participants may bring their own laptops for editing sessions",
        "📸 Photography and videography of sessions may be restricted",
        "📧 Confirmation email will be sent after successful registration",
      ],
      registrationProcess: [
        "Visit the official FTII registration link",
        "Fill in your personal details and contact information",
        "Provide your age proof (must be 18+)",
        "Submit your application before 20 November 2025",
        "Pay the course fee of ₹29,000 as per instructions",
        "Opt for hostel accommodation if needed (₹1,800 additional)",
        "Receive confirmation email with joining details",
        "Arrive at Villa Azavado, Saligao on 10 December 2025",
        "Begin your intensive filmmaking journey!",
      ],
      additionalInfo:
        "This FTII Foundation Course in Filmmaking represents a rare opportunity to receive world-class film education in an intimate, hands-on setting. With only 18 seats available, participants will benefit from personalized attention from National Award-winning filmmakers Avinash & Jasmine Roy. The course is designed to take you through the complete filmmaking process — from conceptualizing a story to delivering a finished film. Set in the inspiring environment of Goa, this 14-day intensive program combines the academic rigor of FTII Pune with the creative energy of Arthouse Film Academy. Whether you're a complete beginner or have some experience, this course will equip you with practical skills and industry knowledge to kickstart your filmmaking career. The FTII Certificate you receive upon completion adds significant credibility to your profile and demonstrates your commitment to learning the craft. Don't miss this chance to learn from the best at a beautiful location with a small, focused group of fellow film enthusiasts. Register before 20 November 2025 on a first-come, first-served basis!",
      contactInfo: [
        "📞 Phone: 020–25580085",
        "📧 Email: info.cfol@ftii.ac.in / ftiicfol@gmail.com",
        "🔗 Registration: https://ftii.ac.in/p/vtwa/foundation-course-in-filmmaking-in-goa-10-23-december-2025",
        "🏛️ Organizers: FTII Pune & Arthouse Film Academy",
        "📍 Venue: Villa Azavado, Saligao, Goa",
      ],
    },
  },
  {
    id: 46,
    title: "FTII Short-Term Course – Multi-Camera TV Production",
    trainer: "Prof. Sandeep Shahare (Head of TV Engineering, FTII)",
    institution: "Film and Television Institute of India (FTII)",
    location: "Pune",
    state: "Maharashtra",
    date: "1–5 December 2025",
    time: "9 AM – 6:30 PM",
    description:
      "📺 Master multi-camera technical operations for live TV! Learn hands-on with professional equipment — cameras, audio & lighting consoles, vision mixers, teleprompters. Produce your own 5-min TV program under expert guidance. Perfect for aspiring TV production professionals.",
    image: "/images/acting-workshop.png",
    registrationLink:
      "https://ftii.ac.in/p/vtwa/introduction-to-multi-camera-technical-operations-for-tv-program-production-01-05-december-2025",
    featured: true,
    price: "₹5,000 (Hostel optional: ₹1,800 for 6 days)",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+",
    mode: "Offline",
    applicationDeadline: "10 November 2025, 6:00 PM IST",
    selection: "First-Come, First-Served basis",
    capacity: "20 seats only",
    language: "Hindi & English",
    certification: "FTII & CFOL participation certificate",
    venue: "FTII Pune",
    duration: "5 days (Intensive)",
    courseDirector: "Prof. Sandeep Shahare (Head of TV Engineering, FTII)",
    includes:
      "Multi-camera operations + Professional equipment training + 5-min TV program production + FTII Certificate",
    fullDetails: {
      description:
        "📺 The FTII Short-Term Course in Multi-Camera TV Production offers a comprehensive introduction to the technical operations used in live television production. This intensive 5-day program provides hands-on training with professional broadcast equipment including multi-camera setups, audio and lighting consoles, vision mixers, and teleprompters. Led by Prof. Sandeep Shahare, Head of TV Engineering at FTII, participants will learn the complete workflow of live TV production and culminate the course by producing their own 5-minute TV program. This course is perfect for aspiring TV production professionals, content creators looking to upgrade their skills, and anyone interested in understanding the technical side of television broadcasting. With only 20 seats available and an affordable fee of ₹5,000, this is an exceptional opportunity to learn from India's premier film and television institute.",
      venue: "Film and Television Institute of India (FTII), Pune",
      organizer: "Film and Television Institute of India (FTII) - Centre for Online Learning (CFOL)",
      duration: "5 days (1–5 December 2025)",
      schedule: "Daily sessions from 9 AM to 6:30 PM",
      medium: "Offline (On-campus at FTII Pune)",
      applicationDeadline: "10 November 2025, 6:00 PM IST",
      selectionProcess: "First-Come, First-Served basis",
      eligibilityCriteria: [
        "Minimum age: 18 years",
        "Open to all aspiring TV production professionals",
        "No prior technical experience required",
        "Interest in television production and broadcasting",
        "Commitment to attend all 5 days of intensive training",
        "Willingness to work with professional broadcast equipment",
        "Basic understanding of Hindi and/or English",
      ],
      keyHighlights: [
        "🎓 Taught by Prof. Sandeep Shahare, Head of TV Engineering at FTII",
        "📹 Hands-on training with professional multi-camera setups",
        "🎛️ Learn to operate vision mixers, audio & lighting consoles",
        "📺 Work with teleprompters and broadcast equipment",
        "🎬 Produce your own 5-minute TV program",
        "👥 Limited to 20 seats for personalized attention",
        "💰 Affordable fee of only ₹5,000",
        "🏠 Optional hostel accommodation available (₹1,800 for 6 days)",
        "📜 FTII & CFOL participation certificate",
        "⚡ Intensive 5-day immersive program",
      ],
      courseModules: [
        {
          title: "Multi-Camera Operations",
          description: "Master the fundamentals of multi-camera television production",
          topics: [
            "Introduction to multi-camera systems",
            "Camera positioning and angles for live TV",
            "Coordinating multiple camera operators",
            "Camera switching and transitions",
            "Shot composition for multi-camera setups",
            "Live switching techniques",
            "Camera communication protocols",
            "Multi-camera workflow and best practices",
          ],
        },
        {
          title: "Vision Mixing & Control",
          description: "Learn to operate professional vision mixers for live broadcasts",
          topics: [
            "Vision mixer interface and controls",
            "Live switching between cameras",
            "Transitions and effects",
            "Picture-in-picture and split screens",
            "Graphics and lower thirds integration",
            "Color correction and matching",
            "Live broadcast workflow",
            "Real-time decision making",
          ],
        },
        {
          title: "Audio & Lighting Consoles",
          description: "Understand audio mixing and lighting control for TV production",
          topics: [
            "Audio console operation",
            "Microphone placement and management",
            "Audio mixing for live TV",
            "Lighting console basics",
            "Studio lighting setups",
            "Three-point lighting for TV",
            "Audio-visual synchronization",
            "Troubleshooting common issues",
          ],
        },
        {
          title: "Teleprompter & Studio Equipment",
          description: "Work with teleprompters and other essential studio equipment",
          topics: [
            "Teleprompter setup and operation",
            "Script formatting for teleprompters",
            "Cueing and timing",
            "Studio floor management",
            "Talkback systems",
            "Monitoring and playback systems",
            "Studio safety protocols",
            "Equipment maintenance basics",
          ],
        },
        {
          title: "Live TV Program Production",
          description: "Produce your own 5-minute TV program from concept to broadcast",
          topics: [
            "Program planning and rundown creation",
            "Pre-production for live TV",
            "Rehearsal and blocking",
            "Live production execution",
            "Team coordination and communication",
            "Problem-solving during live production",
            "Post-production review",
            "Final program presentation",
          ],
        },
      ],
      aboutMentor:
        "🎓 Prof. Sandeep Shahare is the Head of TV Engineering at the Film and Television Institute of India (FTII), Pune. With extensive experience in television production and broadcast technology, Prof. Shahare has trained numerous professionals who have gone on to successful careers in the television industry. His expertise spans multi-camera operations, live broadcasting, studio management, and technical direction. As an educator, he combines theoretical knowledge with practical, hands-on training, ensuring students gain real-world skills they can immediately apply in professional settings. Under his guidance, participants will learn industry-standard practices and gain insights into the technical aspects of television production that are essential for anyone aspiring to work in live TV, sports broadcasting, or studio productions.",
      learningApproach: [
        "Hands-on training with professional broadcast equipment",
        "Practical exercises with multi-camera setups",
        "Live production simulations",
        "Individual and team-based projects",
        "Real-time problem-solving scenarios",
        "Industry-standard workflows and practices",
        "Immediate feedback from experienced instructor",
        "Collaborative learning environment",
        "Culminating project: 5-minute TV program production",
        "Theory integrated with extensive practical work",
      ],
      learningOutcomes: [
        "Proficiency in multi-camera technical operations",
        "Ability to operate vision mixers and switchers",
        "Understanding of audio and lighting console operations",
        "Experience with teleprompters and studio equipment",
        "Knowledge of live TV production workflows",
        "Skills in coordinating multi-camera shoots",
        "Confidence in working in live broadcast environments",
        "Practical experience producing a complete TV program",
        "Understanding of studio floor management",
        "FTII Certificate validating your technical training",
      ],
      whoShouldAttend: [
        "Aspiring TV production professionals",
        "Content creators wanting to learn live production",
        "Videographers looking to expand into multi-camera work",
        "Theatre technicians transitioning to television",
        "Event production professionals",
        "Students interested in broadcast technology",
        "Freelancers wanting to add TV production skills",
        "Anyone interested in live television production",
        "Sports production enthusiasts",
        "Anyone aged 18+ passionate about TV broadcasting",
      ],
      uniqueExperience: [
        "Learn at FTII Pune — India's premier film & TV institute",
        "Training by Head of TV Engineering",
        "Hands-on with professional broadcast equipment",
        "Intimate batch size of only 20 students",
        "Produce your own 5-minute TV program",
        "Intensive 5-day immersive training",
        "Affordable fee of just ₹5,000",
        "Optional hostel accommodation available",
        "FTII Certificate adds credibility to your profile",
        "Networking with fellow TV production enthusiasts",
      ],
      practicalDetails: [
        "📅 Dates: 1–5 December 2025 (5 consecutive days)",
        "⏰ Schedule: 9 AM – 6:30 PM daily",
        "📍 Venue: FTII Pune",
        "💰 Fee: ₹5,000 (course fee only)",
        "🏠 Hostel (optional): ₹1,800 for 6 days (triple sharing)",
        "👥 Batch Size: 20 students only",
        "📝 Application Deadline: 10 November 2025, 6:00 PM IST",
        "🎟️ Selection: First-Come, First-Served basis",
        "🗣️ Languages: Hindi & English",
        "📜 Certificate: FTII & CFOL participation certificate",
      ],
      importantNotes: [
        "⚠️ Limited to 20 seats only — register early to secure your spot",
        "📌 First-Come, First-Served basis — no auditions or interviews",
        "🏠 Hostel accommodation is optional at ₹1,800 for 6 days",
        "🍽️ Hostel fee does not include meals",
        "✈️ Travel to and from Pune is participant's responsibility",
        "📅 Full attendance required for all 5 days to receive certificate",
        "🎥 Professional broadcast equipment will be provided",
        "💻 No need to bring personal equipment",
        "📸 Photography and videography of sessions may be restricted",
        "📧 Confirmation email will be sent after successful registration",
      ],
      registrationProcess: [
        "Visit the official FTII registration link",
        "Fill in your personal details and contact information",
        "Provide your age proof (must be 18+)",
        "Submit your application before 10 November 2025, 6:00 PM IST",
        "Pay the course fee of ₹5,000 as per instructions",
        "Opt for hostel accommodation if needed (₹1,800 additional)",
        "Receive confirmation email with joining details",
        "Arrive at FTII Pune on 1 December 2025",
        "Begin your intensive TV production training!",
      ],
      additionalInfo:
        "This intensive 5-day workshop at FTII provides aspiring television professionals with comprehensive hands-on training in multi-camera technical operations. Step inside a professional TV studio and learn the complete workflow from setup to final program production. Under the guidance of Prof. Sandeep Shahare, Head of TV Engineering with 29 years of experience, you'll master vision mixing, live switching, audio control, and all technical aspects of television production. The highlight of the workshop is creating your own 2-5 minute TV program, which you'll receive a copy of along with your FTII certificate. With small batch sizes and professional-grade equipment, this workshop offers an exceptional opportunity to gain practical skills in television production.",
      contactInfo: [
        "Mr. Milindkumar Joshi - Assistant Outreach Officer, FTII",
        "Email: info.cfol@ftii.ac.in / ftiicfol@gmail.com",
        "Phone: 020–25580085 (working days, office hours only)",
      ],
    },
  },
  {
    id: 47,
    title: "FTII Basic Course in Smartphone Filmmaking – Delhi",
    trainer: "Sanjeev Sood (Veteran Cinematographer & FTII Alumnus)",
    institution: "Film and Television Institute of India (FTII)",
    location: "Delhi",
    state: "Delhi",
    date: "15–19 December 2025",
    time: "10 AM – 5 PM",
    description:
      "📱 Turn your phone into a powerful filmmaking tool! Learn to shoot, light, edit & tell stories using just your smartphone. Create your own short film in 5 days under veteran cinematographer Sanjeev Sood, FTII alumnus. Perfect for aspiring filmmakers on a budget.",
    image: "/images/acting-workshop.png",
    registrationLink: "https://ftii.ac.in/p/vtwa/basic-course-in-smartphone-filmmaking-in-delhi-15-19-december-2025",
    featured: true,
    price: "₹7,000",
    contact: "020–25580085",
    email: "info.cfol@ftii.ac.in / ftiicfol@gmail.com",
    eligibility: "Age 18+",
    mode: "Offline",
    applicationDeadline: "10 November 2025 (First-Come, First-Served basis)",
    selection: "First-Come, First-Served basis",
    capacity: "30 seats only",
    language: "Hindi & English",
    certification: "FTII Certificate on completion",
    venue: "Triveni Kala Sangam, Mandi House, Delhi",
    duration: "5 days (Intensive)",
    courseDirector: "Sanjeev Sood (Veteran Cinematographer & FTII Alumnus)",
    includes: "Smartphone filmmaking techniques + Short film creation + FTII Certificate + Stay assistance available",
    fullDetails: {
      description:
        "📱 The FTII Basic Course in Smartphone Filmmaking empowers aspiring filmmakers to create professional-quality content using just their smartphones. This innovative 5-day program, conducted in Delhi at the prestigious Triveni Kala Sangam, demonstrates that you don't need expensive equipment to tell compelling stories. Led by veteran cinematographer and FTII alumnus Sanjeev Sood, participants will learn the complete filmmaking process — from shooting and lighting to editing and storytelling — all using mobile devices. The course culminates in creating your own short film, giving you a finished project to showcase. With an affordable fee of ₹7,000 and 30 available seats, this course democratizes filmmaking education and proves that creativity matters more than equipment. Perfect for content creators, aspiring filmmakers, social media professionals, and anyone passionate about visual storytelling.",
      venue: "Triveni Kala Sangam, Mandi House, Delhi",
      organizer: "Film and Television Institute of India (FTII) Pune - Centre for Online Learning (CFOL)",
      duration: "5 days (15–19 December 2025)",
      schedule: "Daily sessions from 10 AM to 5 PM",
      medium: "Offline (On-location in Delhi)",
      applicationDeadline: "10 November 2025",
      selectionProcess: "First-Come, First-Served basis",
      eligibilityCriteria: [
        "Minimum age: 18 years",
        "Open to all aspiring filmmakers and content creators",
        "No prior filmmaking experience required",
        "Must have a smartphone with camera capabilities",
        "Passion for storytelling and visual content",
        "Commitment to attend all 5 days of training",
        "Willingness to experiment and learn",
        "Basic understanding of Hindi and/or English",
      ],
      keyHighlights: [
        "📱 Learn to create films using just your smartphone",
        "🎥 Taught by veteran cinematographer Sanjeev Sood (FTII Alumnus)",
        "🎬 Create your own short film in 5 days",
        "📍 Prestigious venue: Triveni Kala Sangam, Mandi House, Delhi",
        "👥 30 seats available for broader participation",
        "💰 Affordable fee of only ₹7,000",
        "🏠 Stay assistance available near venue",
        "📜 FTII Certificate upon completion",
        "⚡ Intensive 5-day hands-on program",
        "🎓 Learn from India's premier film institute",
      ],
      courseModules: [
        {
          title: "Smartphone Cinematography Fundamentals",
          description: "Master the art of shooting professional-quality footage with your phone",
          topics: [
            "Understanding your smartphone camera capabilities",
            "Manual controls and camera apps",
            "Composition and framing for mobile",
            "Camera movements and stabilization techniques",
            "Shooting in different lighting conditions",
            "Lens attachments and accessories",
            "Resolution, frame rates, and formats",
            "Best practices for smartphone cinematography",
          ],
        },
        {
          title: "Lighting for Smartphone Filmmaking",
          description: "Learn to light your scenes effectively using available and portable light sources",
          topics: [
            "Working with natural light",
            "Portable LED lights for smartphones",
            "Three-point lighting on a budget",
            "Creating mood with limited equipment",
            "Reflectors and diffusers",
            "Indoor and outdoor lighting techniques",
            "Color temperature and white balance",
            "Problem-solving with available light",
          ],
        },
        {
          title: "Audio Recording & Sound Design",
          description: "Capture clean audio and enhance your film's sound",
          topics: [
            "External microphones for smartphones",
            "Recording dialogue and ambient sound",
            "Audio levels and monitoring",
            "Reducing background noise",
            "Basic sound design principles",
            "Music selection and integration",
            "Audio editing on mobile devices",
            "Syncing audio and video",
          ],
        },
        {
          title: "Mobile Editing & Post-Production",
          description: "Edit your film entirely on your smartphone",
          topics: [
            "Mobile editing apps and tools",
            "Cutting and assembling footage",
            "Transitions and effects",
            "Color grading on mobile",
            "Adding titles and graphics",
            "Audio mixing and sound effects",
            "Export settings and formats",
            "Workflow optimization for mobile editing",
          ],
        },
        {
          title: "Storytelling & Short Film Creation",
          description: "Develop your story and create a complete short film",
          topics: [
            "Story development for short films",
            "Scriptwriting basics",
            "Planning and shot listing",
            "Directing for smartphone cinema",
            "Working with actors on location",
            "Continuity and coverage",
            "Pacing and rhythm in editing",
            "Finalizing and presenting your film",
          ],
        },
      ],
      aboutMentor:
        "🎥 Sanjeev Sood is a veteran cinematographer and proud alumnus of the Film and Television Institute of India (FTII), Pune. With decades of experience in the film industry, Sanjeev has worked on numerous feature films, documentaries, and commercial projects. His expertise spans traditional cinematography as well as modern mobile filmmaking techniques. As an educator, Sanjeev is passionate about democratizing filmmaking and believes that powerful stories can be told with any camera, including smartphones. His teaching philosophy emphasizes creativity over equipment, encouraging students to focus on storytelling fundamentals while mastering the technical aspects of mobile filmmaking. Under his guidance, participants will learn not just the technical skills but also the artistic vision needed to create compelling cinema with minimal resources. Sanjeev's real-world experience and FTII training make him the perfect mentor for aspiring filmmakers looking to break into the industry without expensive equipment.",
      learningApproach: [
        "Hands-on practical training with smartphones",
        "Project-based learning methodology",
        "Individual short film creation",
        "Live demonstrations and workshops",
        "Immediate feedback on your work",
        "Collaborative learning environment",
        "Theory integrated with extensive practice",
        "Real-world shooting scenarios",
        "Mobile editing workflow training",
        "Personalized mentorship from veteran cinematographer",
      ],
      learningOutcomes: [
        "Proficiency in smartphone cinematography",
        "Ability to shoot professional-quality footage on mobile",
        "Understanding of lighting techniques for smartphones",
        "Skills in mobile audio recording and sound design",
        "Competence in mobile editing and post-production",
        "Knowledge of storytelling and narrative structure",
        "Confidence in creating complete short films",
        "Portfolio piece: Your own finished short film",
        "Understanding of budget filmmaking workflows",
        "FTII Certificate validating your training",
      ],
      whoShouldAttend: [
        "Aspiring filmmakers on a budget",
        "Content creators for social media",
        "YouTubers and vloggers",
        "Journalists and documentary makers",
        "Marketing and advertising professionals",
        "Students interested in filmmaking",
        "Independent storytellers",
        "Anyone wanting to create video content",
        "Photographers transitioning to video",
        "Anyone aged 18+ with a smartphone and passion for stories",
      ],
      uniqueExperience: [
        "Learn at iconic Triveni Kala Sangam in Delhi",
        "Training by FTII Pune — India's premier film institute",
        "Veteran cinematographer as your mentor",
        "Create a complete short film in just 5 days",
        "Affordable and accessible filmmaking education",
        "No expensive equipment required",
        "Practical, hands-on approach",
        "30 seats for broader participation",
        "Stay assistance available for outstation participants",
        "FTII Certificate adds credibility to your profile",
      ],
      practicalDetails: [
        "📅 Dates: 15–19 December 2025 (5 consecutive days)",
        "⏰ Schedule: 10 AM – 5 PM daily",
        "📍 Venue: Triveni Kala Sangam, Mandi House, Delhi",
        "💰 Fee: ₹7,000 (course fee only)",
        "🏠 Stay: Assistance available near venue",
        "👥 Batch Size: 30 students",
        "📝 Application Deadline: 10 November 2025",
        "🎟️ Selection: First-Come, First-Served basis",
        "🗣️ Languages: Hindi & English",
        "📜 Certificate: FTII Certificate on completion",
      ],
      importantNotes: [
        "⚠️ Limited to 30 seats — register early to secure your spot",
        "📌 First-Come, First-Served basis — no auditions or interviews",
        "📱 Must bring your own smartphone with camera capabilities",
        "🔋 Ensure your phone is fully charged daily",
        "💾 Have sufficient storage space on your device",
        "🏠 Accommodation assistance available for outstation participants",
        "🍽️ Meals not included in course fee",
        "✈️ Travel to and from Delhi is participant's responsibility",
        "📅 Full attendance required for all 5 days to receive certificate",
        "🎧 Recommended: Bring earphones/headphones for editing",
        "📧 Confirmation email will be sent after successful registration",
      ],
      registrationProcess: [
        "Visit the official FTII registration link",
        "Fill in your personal details and contact information",
        "Provide your age proof (must be 18+)",
        "Submit your application before 10 November 2025",
        "Pay the course fee of ₹7,000 as per instructions",
        "Receive confirmation email with joining details",
        "If needed, contact for stay assistance near venue",
        "Arrive at Triveni Kala Sangam on 15 December 2025",
        "Begin your smartphone filmmaking journey!",
      ],
      equipmentRequired: [
        "📱 Smartphone with good camera (minimum 1080p video capability)",
        "🔋 Power bank or extra battery",
        "💾 Minimum 32GB free storage space",
        "🎧 Earphones or headphones",
        "📝 Notebook and pen for notes",
        "Optional: Smartphone tripod or stabilizer",
        "Optional: External microphone (if available)",
        "Optional: Portable LED light (if available)",
      ],
      additionalInfo:
        "This FTII Basic Course in Smartphone Filmmaking represents a revolutionary approach to film education — proving that you don't need expensive cameras to tell powerful stories. Led by veteran cinematographer and FTII alumnus Sanjeev Sood, this 5-day intensive program in Delhi will transform your smartphone into a professional filmmaking tool. You'll learn everything from cinematography and lighting to editing and storytelling, all using mobile devices. The course is designed to be accessible and affordable at ₹7,000, with 30 seats available to accommodate more aspiring filmmakers. Set in the culturally rich environment of Triveni Kala Sangam in Mandi House, Delhi, you'll be surrounded by artistic inspiration as you create your own short film. This hands-on program emphasizes practical skills over theory, ensuring you leave with a finished film you can showcase. Whether you're a content creator, aspiring filmmaker, journalist, or simply someone passionate about visual storytelling, this course will equip you with the skills to create professional-quality content with the device in your pocket. Stay assistance is available for outstation participants, making it easier to attend. The FTII Certificate you receive upon completion validates your training and demonstrates your commitment to the craft. In today's digital age, smartphone filmmaking is not just a budget alternative — it's a legitimate and powerful medium used by professionals worldwide. Don't miss this opportunity to learn from the best at one of India's most prestigious film institutes. Register before 10 November 2025 on a first-come, first-served basis!",
      contactInfo: [
        "📞 Phone: 020–25580085",
        "📧 Email: info.cfol@ftii.ac.in / ftiicfol@gmail.com",
        "🔗 Registration: https://ftii.ac.in/p/vtwa/basic-course-in-smartphone-filmmaking-in-delhi-15-19-december-2025",
        "🏛️ Organizer: FTII Pune (Centre for Online Learning)",
        "📍 Venue: Triveni Kala Sangam, Mandi House, Delhi",
        "🏠 Stay Assistance: Available upon request",
      ],
    },
  },
  {
    id: 48,
    title: "The Essential Body: Journey of the Neutral Mask",
    trainer: "Ana Mirtha Sariego (Sariego Theatre)",
    institution: "Sariego Theatre",
    location: "Bengaluru",
    state: "Karnataka",
    date: "15–16 November 2025",
    time: "11 AM – 7 PM (Full day or one slot)",
    description:
      "🎭 An immersive 16-hour physical theatre workshop inspired by Jacques Lecoq's pedagogy, exploring body awareness, rhythm, neutrality, and authentic presence through the Neutral Mask. Participants will learn to dissolve inner blockages and connect mind, emotion, and action to achieve a truly alive stage presence. Led by renowned Spanish actress, director & founder of Sariego Theatre, Ana Mirtha Sariego, with global experience across Europe, the Americas & India.",
    image: "/images/sariego-theatre-logo.png",
    registrationLink: "https://wa.me/447810802938",
    featured: true,
    price: "₹4,500 (Early Bird) / ₹5,000 (On Spot)",
    contact: "+44 7810 802938",
    email: "info@sariegotheatre.com",
    eligibility: "Actors, dancers, movers & students of all levels",
    duration: "16 hours",
    mode: "Offline",
    venue: "Laya Abhinaya Centre for Performing Arts, JP Nagar 8th Phase, Bengaluru",
    includes: "Neutral Mask work + Physical expression + Body awareness techniques",
    fullDetails: {
      description:
        "🎭 An immersive 16-hour physical theatre workshop inspired by Jacques Lecoq's pedagogy, exploring body awareness, rhythm, neutrality, and authentic presence through the Neutral Mask. Participants will learn to dissolve inner blockages and connect mind, emotion, and action to achieve a truly alive stage presence. Led by renowned Spanish actress, director & founder of Sariego Theatre, Ana Mirtha Sariego, with global experience across Europe, the Americas & India.",
      venue: "Laya Abhinaya Centre for Performing Arts, JP Nagar 8th Phase, Bengaluru",
      organizer: "Sariego Theatre",
      duration: "2 days (16 hours total)",
      medium: "English",
      workshopDates: "15–16 November 2025",
      timings: "11 AM – 7 PM (Full day or one slot)",
      eligibilityCriteria: [
        "Actors, dancers, movers & students",
        "All experience levels welcome",
        "Individuals seeking authentic stage presence",
        "Those interested in Jacques Lecoq's pedagogy",
        "Participants willing to engage in physical exploration",
      ],
      feeStructure: {
        earlyBird: {
          amount: 4500,
          description: "Early Bird",
        },
        onSpot: {
          amount: 5000,
          description: "On Spot Registration",
        },
      },
      keyHighlights: [
        "Authentic Presence: Develop genuine, alive stage presence through Neutral Mask work",
        "Body Awareness: Discover new dimensions of physical expression and movement",
        "Dissolve Blockages: Release inner tensions and connect mind, emotion, and action",
        "Jacques Lecoq Pedagogy: Learn from one of theatre's most influential training methodologies",
        "International Expert: Train with Ana Mirtha Sariego, renowned across Europe, the Americas & India",
        "All Levels Welcome: Open to actors, dancers, movers & students of all experience levels",
      ],
      whatYouWillLearn: [
        "The Neutral Mask: Discover the power of neutrality as a foundation for authentic expression",
        "Body Awareness & Rhythm: Develop heightened physical consciousness and organic movement",
        "Mind-Body-Emotion Connection: Unite thought, feeling, and physical action",
        "Dissolving Inner Blockages: Release tensions and habits that limit authentic presence",
        "Jacques Lecoq Principles: Understand and apply foundational physical theatre techniques",
        "Alive Stage Presence: Cultivate genuine, compelling presence in performance",
      ],
      aboutInstructor:
        "✨ Renowned Spanish actress, director & founder of Sariego Theatre, with global experience across Europe, the Americas & India. Ana Mirtha brings the authentic pedagogy of Jacques Lecoq to Bengaluru, offering participants a rare opportunity to train in physical theatre techniques that have shaped some of the world's most innovative performers. Her work focuses on the essential connection between body, mind, and emotion, using the Neutral Mask as a transformative tool for discovering authentic presence on stage. With years of international teaching experience, Ana Mirtha creates a safe, supportive environment for exploration and growth.",
      contactInfo: {
        whatsapp: "+44 7810 802938",
        instagram: ["https://www.instagram.com/anamirtha.theatre", "https://www.instagram.com/sariegotheatre"],
        website: ["https://sariegotheatre.com", "https://anamirtha.com"],
      },
    },
  },
]

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Calendar,
  MapPin,
  GraduationCap,
  CheckCircle,
  Clock,
  ChevronLeft,
  Star,
  Check,
  Users,
  BookOpen,
  DollarSign,
  Phone,
  ExternalLink,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

interface WorkshopDetailContentProps {
  id: number | string // Allow string ID for flexibility, convert internally
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

  // Special handling for workshop ID "48" to render custom component
  if (id === "48") {
    return (
      <div className="container py-16 px-6">
        <Link
          href="/workshops"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to Workshops
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <div className="flex items-start gap-6 mb-6">
              <div className="relative w-48 h-48 rounded-xl overflow-hidden shadow-lg flex-shrink-0">
                <Image
                  src="/images/sariego-theatre-logo.png" // Updated path
                  alt="The Essential Body Workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1">
                <h1 className="font-playfair text-4xl font-bold mb-4 text-gray-800">
                  The Essential Body: Journey of the Neutral Mask
                </h1>
                <div className="flex flex-wrap gap-2 mb-4">
                  <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                    Physical Theatre
                  </Badge>
                  <Badge variant="secondary" className="bg-primary/10 text-primary">
                    Jacques Lecoq Pedagogy
                  </Badge>
                  <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                    Neutral Mask
                  </Badge>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>Bengaluru, Karnataka</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>16 hours</span>
                  </div>
                </div>
                <div className="text-2xl font-bold text-primary mb-2">
                  ₹4,500 <span className="text-lg text-gray-600">(Early Bird)</span>
                </div>
                <div className="text-lg text-gray-600 mb-4">₹5,000 (On Spot)</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl mb-8">
              <p className="text-gray-700 leading-relaxed">
                🎭 An immersive 16-hour physical theatre workshop inspired by Jacques Lecoq's pedagogy, exploring body
                awareness, rhythm, neutrality, and authentic presence through the Neutral Mask. Participants will learn
                to dissolve inner blockages and connect mind, emotion, and action to achieve a truly alive stage
                presence. Led by renowned Spanish actress, director & founder of Sariego Theatre, Ana Mirtha Sariego,
                with global experience across Europe, the Americas & India.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Workshop Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Dates</p>
                    <p className="font-semibold">15–16 November 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Timings</p>
                    <p className="font-semibold">11 AM – 7 PM (Full day or one slot)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Duration</p>
                    <p className="font-semibold">2 days (16 hours total)</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mode</p>
                    <p className="font-semibold">Offline</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" />
                    Venue Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Location</p>
                    <p className="font-semibold">
                      Laya Abhinaya Centre for Performing Arts
                      <br />
                      JP Nagar 8th Phase, Bengaluru
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">State</p>
                    <p className="font-semibold">Karnataka</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-secondary" />
                  Why This Workshop?
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Authentic Presence:</strong> Develop genuine, alive stage presence through Neutral Mask
                      work
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Body Awareness:</strong> Discover new dimensions of physical expression and movement
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Dissolve Blockages:</strong> Release inner tensions and connect mind, emotion, and action
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Jacques Lecoq Pedagogy:</strong> Learn from one of theatre's most influential training
                      methodologies
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>International Expert:</strong> Train with Ana Mirtha Sariego, renowned across Europe, the
                      Americas & India
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>All Levels Welcome:</strong> Open to actors, dancers, movers & students of all experience
                      levels
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  About Ana Mirtha Sariego
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ✨ <strong>Renowned Spanish actress, director & founder of Sariego Theatre</strong>, with global
                  experience across Europe, the Americas & India. Ana Mirtha brings the authentic pedagogy of Jacques
                  Lecoq to Bengaluru, offering participants a rare opportunity to train in physical theatre techniques
                  that have shaped some of the world's most innovative performers.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Her work focuses on the essential connection between body, mind, and emotion, using the Neutral Mask
                  as a transformative tool for discovering authentic presence on stage. With years of international
                  teaching experience, Ana Mirtha creates a safe, supportive environment for exploration and growth.
                </p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <a
                    href="https://www.instagram.com/anamirtha.theatre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    @anamirtha.theatre
                  </a>
                  <a
                    href="https://www.instagram.com/sariegotheatre"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    @sariegotheatre
                  </a>
                  <a
                    href="https://sariegotheatre.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    sariegotheatre.com
                  </a>
                  <a
                    href="https://anamirtha.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    anamirtha.com
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-primary" />
                  What You'll Learn
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span>
                      <strong>The Neutral Mask:</strong> Discover the power of neutrality as a foundation for authentic
                      expression
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span>
                      <strong>Body Awareness & Rhythm:</strong> Develop heightened physical consciousness and organic
                      movement
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span>
                      <strong>Mind-Body-Emotion Connection:</strong> Unite thought, feeling, and physical action
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span>
                      <strong>Dissolving Inner Blockages:</strong> Release tensions and habits that limit authentic
                      presence
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span>
                      <strong>Jacques Lecoq Principles:</strong> Understand and apply foundational physical theatre
                      techniques
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                    <span>
                      <strong>Alive Stage Presence:</strong> Cultivate genuine, compelling presence in performance
                    </span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Fee Structure
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-sm text-gray-600 mb-1">Early Bird</p>
                      <p className="text-2xl font-bold text-green-700">₹4,500</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-600 mb-1">On Spot Registration</p>
                      <p className="text-2xl font-bold text-gray-700">₹5,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Eligibility & Requirements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Open To</p>
                    <p className="font-semibold">Actors, dancers, movers & students</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Experience Level</p>
                    <p className="font-semibold">All levels welcome</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Language</p>
                    <p className="font-semibold">English</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">What to Bring</p>
                    <p className="font-semibold">Comfortable movement clothes, open mind</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  Registration & Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600 mb-2">Register via WhatsApp</p>
                  <a
                    href="https://wa.me/447810802938"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold"
                  >
                    <Phone className="h-4 w-4" />
                    +44 7810 802938
                  </a>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-2">More Information</p>
                  <div className="flex flex-wrap gap-4">
                    <a
                      href="https://www.instagram.com/sariegotheatre"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      @sariegotheatre
                    </a>
                    <a
                      href="https://www.instagram.com/anamirtha.theatre"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      @anamirtha.theatre
                    </a>
                    <a
                      href="https://sariegotheatre.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      sariegotheatre.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-gradient-to-r from-primary to-secondary p-8 rounded-xl text-white text-center">
              <h3 className="font-playfair text-2xl font-bold mb-4">Ready to Transform Your Practice?</h3>
              <p className="mb-6 max-w-2xl mx-auto">
                Join this rare opportunity to train in Jacques Lecoq's pedagogy with an internationally renowned expert.
                Discover your essential body and authentic presence.
              </p>
              <a
                href="https://wa.me/447810802938"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-white text-primary px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
              >
                <Phone className="h-5 w-5" />
                Register via WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
                workshop.id === 45 ||
                workshop.id === 46 ||
                workshop.id === 47) && (
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
                    workshop.id === 41 ||
                    workshop.id === 45 ||
                    workshop.id === 46 ||
                    workshop.id === 47) &&
                    workshop.fullDetails.aboutInstructor && (
                      <div>
                        <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">
                          {workshop.id === 29
                            ? "About the Program"
                            : workshop.id === 30
                              ? "About the Theatre Group"
                              : workshop.id === 31
                                ? "About IIET"
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
                                                    : workshop.id === 45
                                                      ? "About the Mentors"
                                                      : workshop.id === 46
                                                        ? "About the Instructor"
                                                        : workshop.id === 47
                                                          ? "About the Mentor"
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
                    workshop.id === 41 ||
                    workshop.id === 45 ||
                    workshop.id === 46 ||
                    workshop.id === 47) && (
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

                  {workshop.id === 45 && workshop.fullDetails.courseModules && (
                    <div className="space-y-6">
                      {workshop.fullDetails.courseModules.map((module, index) => (
                        <div key={index}>
                          <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">{module.title}</h3>
                          <p className="text-gray-700 leading-relaxed mb-3">{module.description}</p>
                          <ul className="space-y-2">
                            {module.topics.map((topic, topicIndex) => (
                              <li key={topicIndex} className="flex items-start">
                                <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                                <span className="text-gray-700">{topic}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}

                  {workshop.id === 45 && workshop.fullDetails.learningApproach && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Learning Approach</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.learningApproach.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.id === 45 && workshop.fullDetails.whoShouldAttend && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Who Should Attend?</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.whoShouldAttend.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <GraduationCap className="h-5 w-5 text-secondary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.id === 45 && workshop.fullDetails.practicalDetails && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Practical Details</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.practicalDetails.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <Calendar className="h-5 w-5 text-primary mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {workshop.id === 47 && workshop.fullDetails.equipmentRequired && (
                    <div>
                      <h3 className="font-playfair text-lg md:text-xl font-bold mb-3">Equipment Required</h3>
                      <ul className="space-y-2">
                        {workshop.fullDetails.equipmentRequired.map((item, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{item}</span>
                          </li>
                        ))}
                      </ul>
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
                        {workshop.id === 15 || workshop.id === 16
                          ? "Trainer"
                          : workshop.id === 23 ||
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
                              workshop.id === 41 ||
                              workshop.id === 45 ||
                              workshop.id === 46 ||
                              workshop.id === 47
                            ? "Organizer"
                            : workshop.id === 29
                              ? "Program"
                              : workshop.id === 30
                                ? "Theatre Group"
                                : workshop.id === 31
                                  ? "Trainer"
                                  : workshop.id === 32
                                    ? "Organizer"
                                    : workshop.id === 33
                                      ? "Trainer"
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
                              : workshop.id === 36
                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                : workshop.id === 37
                                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                                  : workshop.id === 38
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : workshop.id === 39
                                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                                      : workshop.id === 40
                                        ? "bg-blue-600 hover:bg-blue-700 text-white"
                                        : workshop.id === 41
                                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                                          : workshop.id === 42
                                            ? "bg-blue-600 hover:bg-blue-700 text-white"
                                            : workshop.id === 43
                                              ? "bg-orange-600 hover:bg-orange-700 text-white"
                                              : workshop.id === 45
                                                ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                : workshop.id === 46
                                                  ? "bg-blue-600 hover:bg-blue-700 text-white"
                                                  : workshop.id === 47
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
                                      : workshop.id === 42
                                        ? "Register Now"
                                        : workshop.id === 43
                                          ? "Apply Now"
                                          : workshop.id === 45
                                            ? "Register Now"
                                            : workshop.id === 46
                                              ? "Register Now"
                                              : workshop.id === 47
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
