// Centralized skills list - single source of truth for Theatre Artists
// Note: Production-related skills (Production Manager, Costume Designer, Sound Designer, 
// Photographer, Videographer) are managed in the Technical & Production Artists page
export const THEATRE_ARTIST_SKILLS = [
  "Acting",
  "Direction",
  "Assistant Directing",
  "Singing",
  "Writing",
  "Lyrics Writing",
  "Music",
  "Music Composition"
] as const

export type TheatreArtistSkill = typeof THEATRE_ARTIST_SKILLS[number]

// Normalize skill names from stored data to standardized values
// Returns null for invalid skills that should be removed (e.g., "Backstage roles")
export function normalizeSkill(skill: string): string | null {
  const normalizations: Record<string, string | null> = {
    // Remove invalid entries
    "Backstage roles": null,
    // Merge duplicates
    "Directing": "Direction",
    // Rename to standardized names
    "Costume": "Costume Designer",
    "Sound Design": "Sound Designer",
    "Photography": "Photographer",
    "Videography": "Videographer",
  }
  
  // Return normalized value if mapping exists, otherwise return original
  if (skill in normalizations) {
    return normalizations[skill]
  }
  return skill
}

// Get normalized skills for an artist (filters out nulls from invalid skills)
export function getNormalizedSkills(skills: string[]): string[] {
  return skills
    .map(normalizeSkill)
    .filter((skill): skill is string => skill !== null)
}

export interface Artist {
  id: string
  name: string
  image: string
  location: string
  age?: number
  languages: string[]
  email?: string
  interests: string[]
  bio: string
  instagram?: string
  facebook?: string
  whatsapp?: string
  youtube?: string
  auditionVideo?: string
  credential?: string
}

export const artists: Artist[] = [
  {
    id: "naman-jain",
    name: "Naman Jain",
    image: "/images/artists/naman-jain.jpeg",
    location: "Bengaluru, Indiranagar",
    age: 26,
    languages: ["English", "Hindi"],
    email: "namanjn0608@gmail.com",
    interests: ["Acting", "Writing", "Assistant Directing"],
    bio: "Naman Jain is a versatile theatre artist based in Bengaluru with a passion for storytelling through performance. At 26, he brings a fresh perspective to the stage, combining his skills in acting, writing, and assistant directing. His work reflects a deep commitment to exploring human emotions and narratives, making him a valuable contributor to the theatre community. Naman is dedicated to continuous learning and collaboration, always seeking new ways to push creative boundaries.",
    instagram: "https://www.instagram.com/whatswrongnaman?igsh=NGE5aGV3MDV4ZDk%3D&utm_source=qr",
    whatsapp: "9811763837",
  },
  {
    id: "shivesh-ranjan",
    name: "Shivesh Ranjan",
    image: "/images/artists/shivesh-ranjan.jpg",
    location: "Bengaluru, BTM Layout",
    age: 35,
    languages: ["Hindi", "English"],
    email: "shiveshranjan7@gmail.com",
    interests: ["Acting", "Direction", "Writing"],
    bio: "Shivesh Ranjan is a seasoned theatre artist with 14+ years of experience and over 450 stage shows to his credit. Trained in Proscenium, improv theatre, and clowning, he brings a wealth of expertise and versatility to every performance. His extensive background in acting, direction, and writing makes him a multifaceted contributor to the theatre community, known for his dynamic stage presence and creative vision.",
    instagram: "https://www.instagram.com/shiveshranjan7",
    whatsapp: "8095876104",
  },
  {
    id: "nuhar-bansal",
    name: "Nuhar Bansal",
    image: "/images/artists/nuhar-bansal.jpeg",
    location: "Bengaluru, Jakkur",
    age: 32,
    languages: ["Hindi", "English", "Punjabi", "Kannada"],
    email: "nuharbansal@gmail.com",
    interests: ["Acting"],
    bio: "I am a 32 year old female actor with a special interest in clowning and mental health. I value honesty, kindness, and playfulness.",
    instagram: "https://www.instagram.com/abaldfatindiangirl?igsh=MmE2ZGlicjFweWow&utm_source=qr",
    whatsapp: "9916587281",
  },
  {
    id: "bhoomika-srivastava",
    name: "Dr. Bhoomika Srivastava",
    image: "/images/artists/bhoomika-srivastava.jpg",
    location: "Bengaluru, Brookfield",
    languages: ["Hindi", "English"],
    interests: ["Acting"],
    bio: "I am a trained Kathak dancer, hindi poet & theatre artist",
    instagram: "https://www.instagram.com/eternalqueenofswag?igsh=MXJ1NTFsZGpzMTQ5eg==",
  },
  {
    id: "aniruddh-jain",
    name: "Aniruddh Jain",
    image: "/images/artists/aniruddh-jain.jpg",
    location: "Bengaluru, Beratena Agrahara",
    languages: ["Hindi", "English"],
    email: "surreal.reels@gmail.com",
    interests: ["Acting", "Direction", "Writing", "Lyrics Writing", "Music Composition", "Singing"],
    bio: "An engineer by profession, artist by passion, I have been involved with theatre and films since 2012. Acted in many plays since then, I have also contributed to writing, direction, songs writing and composition and singing. I have also written, directed and produced a feature film, short film and music video (under progress). I have done many types of theatre like improv, playback, forum, complete the story, clown, devised and scripted.",
    instagram: "https://www.instagram.com/src_films?igsh=MWU0bGZ6eWI0eTE1Zw==",
    youtube: "https://youtube.com/@surrealreelscreation8951?si=DiD-z_uKjcd8LO3D",
  },
  {
    id: "deepali-sharma",
    name: "Deepali Sharma",
    image: "/images/artists/deepali-sharma.jpg",
    location: "Bengaluru, Jalahalli East",
    age: 50,
    languages: ["Hindi", "Punjabi", "English"],
    email: "deepalisharmarocky43@gmail.com",
    interests: ["Acting"],
    bio: "A passionate theatre artist with a deep love for the performing arts. With years of experience in acting, Deepali brings authenticity and dedication to every role she takes on, contributing meaningfully to the theatre community.",
    whatsapp: "9731985626",
  },
  {
    id: "sugandh-pandey",
    name: "Sugandh Pandey",
    image: "/images/artists/sugandh-pandey.jpg",
    location: "Bengaluru, J P Nagar",
    age: 33,
    languages: ["Hindi"],
    email: "Sugandhpandey5@gmail.com",
    interests: ["Acting", "Direction"],
    bio: "A dedicated theatre artist with formal training from India's most prestigious theatre institution.",
    credential: "NSD ALUMNI (DELHI) 2017-2020 BATCH",
    instagram: "https://www.instagram.com/sugandhpandey5?igsh=dHYwOXk2Mzh0OWlu",
  },
  {
    id: "mohammed-yunus-parvez",
    name: "Mohammed Yunus Parvez",
    image: "/images/artists/mohammed-yunus-parvez.jpg",
    location: "Bengaluru",
    languages: ["Urdu", "Hindi", "English", "Kannada"],
    interests: ["Acting", "Direction"],
    bio: "Fresher seeking good roles opportunity",
    whatsapp: "9845428007",
  },
  {
    id: "sangeeta-singh",
    name: "Sangeeta Singh",
    image: "/images/artists/sangeeta-singh.jpg",
    location: "Fremont, California, USA",
    languages: ["Hindi", "English", "Bhojpuri", "Urdu"],
    email: "sangeeta.xinix@gmail.com",
    interests: ["Acting", "Direction", "Backstage roles"],
    bio: 'Acted in English (Shakespeare), Bengali (Rabindranath Tagore\'s dance drama "Chandalika") and Hindi plays. A versatile theatre artist with international experience, bringing diverse cultural perspectives to every performance.',
    facebook: "https://www.facebook.com/sangeeta.singh.7330763?mibextid=ZbWKwL",
    youtube: "https://youtu.be/foXwI5jPd1M?si=WOo_AHB6kTr-pVCm",
  },
  {
    id: "ronak-sharma",
    name: "Ronak Sharma",
    image: "/images/artists/ronak-sharma.jpg",
    location: "Bengaluru",
    age: 41,
    languages: ["Hindi", "English"],
    email: "Shanu.ronak@gmail.com",
    interests: ["Directing", "Writing", "Costume"],
    bio: "I have 10 years of experience in writing directing plays, music video, documentary, podcast and mini series.",
    instagram: "https://www.instagram.com/ronaksharmagupta?igsh=MWUwZnpkaGFxdGdvdw==",
    whatsapp: "8095955140",
  },
  {
    id: "vandana-dugar",
    name: "Vandana Dugar",
    image: "/images/artists/vandana-dugar.jpg",
    location: "Bengaluru, Dr. Raj Kumar Road",
    languages: ["Hindi"],
    interests: ["Acting"],
    bio: "I am Vandana dugar Theatre enthusiast from Bangalore based theatre group Urban Chaupaal. Here to learn, explore and tell stories.",
    instagram: "https://www.instagram.com/theatrekraft?igsh=b21nMnh3eXN4Njhz&utm_source=qr",
    whatsapp: "9019760520",
  },
  {
    id: "srinivas-nayaka",
    name: "Srinivas Nayaka",
    image: "/images/artists/srinivas-nayaka.jpg",
    location: "Bengaluru",
    age: 24,
    languages: ["Kannada", "Telugu", "Hindi", "English"],
    email: "srinivasnayakame@gmail.com",
    interests: ["Direction"],
    bio: "Srinivas, Writer - Director from Bangalore. I have made 4 short films so far and one of them has been screened in BISFF 2025.",
  },
  {
    id: "ganesh-gopalan",
    name: "Ganesh Gopalan",
    image: "/images/artists/ganesh-gopalan.jpg",
    location: "Coimbatore",
    age: 45,
    languages: ["Hindi", "English", "Telugu", "Tamil"],
    email: "ganesh.thinker@gmail.com",
    interests: ["Writing", "Direction"],
    bio: "An IT professional with 12 stage plays to credit both within IT companies and in famous theatre spaces across India.",
    whatsapp: "8095225777",
  },
  {
    id: "aaqib-jamal",
    name: "Aaqib Jamal",
    image: "/images/artists/aaqib-jamal.jpg",
    location: "Bengaluru",
    age: 33,
    languages: ["English", "Hindi", "Kannada"],
    email: "aaqib.jamal25@gmail.com",
    interests: ["Direction", "Acting", "Production Manager", "Sound Design", "Videography", "Photography"],
    bio: "Bangalore based creative director, filmmaker, photographer, actor, theatre practitioner, and soft skills trainer. Started theatre in 2011 as an actor, then moved on to be an assistant director, sound designer, director, producer and production manager",
    instagram: "https://www.instagram.com/aaqib_jamal/",
  },
  {
    id: "zahoor",
    name: "Zahoor",
    image: "/images/artists/zahoor.jpg",
    location: "Bengaluru",
    age: 40,
    languages: ["Hindi", "Urdu", "English", "Kannada"],
    email: "zahoor2zahoor@gmail.com",
    interests: ["Acting", "Direction"],
    bio: "A versatile theatre artist with extensive experience in both acting and direction, bringing powerful performances to audiences across Karnataka.",
    whatsapp: "9740012345",
  },
  {
    id: "madhurima-gupta",
    name: "Madhurima Gupta",
    image: "/images/artists/madhurima-gupta.jpg",
    location: "Bengaluru, Koramangala",
    age: 45,
    languages: ["English", "Hindi", "Bengali", "Spanish"],
    email: "maddurima.g@gmail.com",
    interests: ["Acting", "Sound Design", "Music"],
    bio: "Madhurima Gupta is a versatile theatre artist with 8-9 years of acting experience across Kolkata, Bangalore, Hyderabad, and Delhi. She specializes in diverse theatrical forms including Shakespearean, Drawing room drama, Brechtian, Third Theatre, Comedy, and Absurd theatre. Beyond acting, she excels in sound design, creating soundscapes and foley for programs and short films. She has worked with renowned theatre groups including BLT, Forum 3, Dramarsis, Dramanons, Theatricians, Chandrato Collective, Kalayan, and Nilanjan Chowdhury, showcasing her multifaceted talent in singing, keyboard, and technical sound execution.",
    facebook: "https://www.facebook.com/share/17YxxrdQNx/",
    whatsapp: "9830079293",
    credential:
      "Specializations: Shakespearean, Drawing room drama, Brechtian, Third Theatre, Comedy, Absurd theatre, Sound design",
  },
  {
    id: "nimesh-kuntar",
    name: "Kuntar Nimesh Mukeshbhai",
    image: "/images/artists/nimesh-kuntar.jpg",
    location: "Ahmedabad, Gujarat",
    age: 25,
    languages: ["Hindi", "Gujarati", "English"],
    email: "nimeshkuntar7@gmail.com",
    interests: ["Acting"],
    bio: "Theatre actor trained at Gujarat College's Drama Department, with strong performance ability across Hindi and Gujarati theatre productions.",
    instagram: "https://www.instagram.com/nimesh.7/",
    youtube: "https://youtu.be/egm_KmlUMoc?si=NGVMHhb13nKk80eY",
    whatsapp: "9712022073",
    credential: "Gujarat College – Drama Department",
  },
  {
    id: "ronnie-gupta",
    name: "Ronnie Gupta",
    image: "/images/artists/ronnie-gupta.jpg",
    location: "Kanpur, Uttar Pradesh",
    languages: ["Hindi"],
    email: "ronniegupta2966@gmail.com",
    interests: ["Acting", "Direction"],
    bio: "Theatre practitioner with experience in 5 stage productions including Aakhen (Narration), Toba Tek Singh (by Saadat Hasan Manto), Chiththi, and Chaturthi Shreni (by Tarana Parveen). Actively involved in acting and direction, with a passion for meaningful storytelling.",
    instagram: "https://www.instagram.com/imronniegupta",
    youtube: "https://youtube.com/@actorronniegupta",
    auditionVideo: "https://www.youtube.com/watch?v=FKI4VXtdxlA",
    whatsapp: "9569049869",
  },
  {
    id: "saloni-gusain",
    name: "Saloni Gusain",
    image: "/images/artists/saloni-gusain.png",
    location: "Bengaluru, Karnataka",
    age: 23,
    languages: ["Hindi", "English", "Kannada"],
    email: "salonigusain09@gmail.com",
    interests: ["Acting"],
    bio: "Saloni Gusain is a 23-year-old Bangalore-based performer with a strong foundation in classical and western dance. Standing 5'6\", she is passionate about building a full-time career in acting and performance. With specializations in Classical Dance and Western Dance, Saloni brings a unique physicality and expressiveness to her stage work.",
    instagram: "https://www.instagram.com/salonigusain09",
    auditionVideo: "https://youtu.be/ULR_JFoN3Vg?si=O7w7TOybYMj4I0qV",
  },
]

export function getArtistById(id: string): Artist | undefined {
  return artists.find((artist) => artist.id === id)
}

export function getAllArtistIds(): string[] {
  return artists.map((artist) => artist.id)
}
