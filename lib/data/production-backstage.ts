// Centralized skills list - single source of truth
export const PRODUCTION_SKILLS = [
  "Assistant Director",
  "Production Manager",
  "Production Assistant",
  "Set Designer",
  "Lighting Designer",
  "Costume Designer",
  "Sound Designer",
  "Makeup & Hair Designer",
  "Lighting Technician",
  "Sound Operator",
  "Stage Manager",
  "Props Master",
  "Technical Crew",
  "Technical Support",
  "Photographer",
  "Videographer",
  "Animator"
] as const

export type ProductionSkill = typeof PRODUCTION_SKILLS[number]

export interface ProductionProfessional {
  id: string
  name: string
  image: string
  location: string
  state: string
  email?: string
  whatsapp: string
  skills: ProductionSkill[]
  experience: string
  productions: string[]
  instagram?: string
  workLink?: string
  youtube?: string
  auditionVideo?: string
  facebook?: string
}

export const productionProfessionals: ProductionProfessional[] = [
  {
    id: "vatsala-choubey",
    name: "Vatsala Choubey",
    image: "/images/vatsala-profile.jpg",
    location: "Murugeshpalya, Bangalore",
    state: "Karnataka",
    email: "vatsalachoubey027@gmail.com",
    whatsapp: "9113153576",
    skills: ["Lighting Designer"],
    experience: "3 years",
    productions: [
      "Court Martial",
      "San 2025",
      "Mai bhi Maa Ban gaya",
      "Tafteesh",
      "Tax Free - The Blind Man's Club",
      "The Good Doctor",
      "4ced Humor (4plays)",
      "One For The Road [@Jagriti, @Rangashankara, @Medai, @Vyoma]",
    ],
    instagram: "https://www.instagram.com/vibhor_vats18/",
    workLink: "https://drive.google.com/drive/folders/1nt0x1CZEaNiGmedOao0syHIU2vJmPkEU",
  },
  {
    id: "pragnesh-pandya",
    name: "Pragnesh Pandya",
    image: "/images/pragnesh-profile.webp",
    location: "Zundal, Gandhinagar",
    state: "Gujarat",
    email: "Pragneshpandya18@gmail.com",
    whatsapp: "9106510538",
    skills: [
      "Set Designer",
      "Costume Designer",
      "Props Master",
      "Stage Manager",
      "Production Assistant",
      "Production Manager",
      "Assistant Director",
      "Makeup & Hair Designer",
    ],
    experience: "7 years",
    productions: ["Performers Cultural Society of Udaipur"],
    instagram: "https://www.instagram.com/p/DHL5rqwSck3/?igsh=YnJ0NzhjemhkbWNk",
    youtube: "https://www.youtube.com/@lighthouseproduction6571",
    auditionVideo: "https://youtube.com/shorts/tUkFpuSgCWY?si=22O2bJH-H929WBXP",
  },
  {
    id: "madhurima-gupta",
    name: "Madhurima Gupta",
    image: "/images/madhurima-gupta.jpg",
    location: "Koramangala, Bangalore",
    state: "Karnataka",
    email: "madhurima.g@gmail.com",
    whatsapp: "9830079293",
    skills: ["Sound Designer", "Sound Operator", "Assistant Director", "Animator"],
    experience: "8 years",
    productions: [
      "Animation mixed media production for BLT production ' The Anklet'",
      "Sound and foley design for multiple stage shows and short films",
    ],
    facebook: "https://www.facebook.com/share/17xg3cqxdW/",
    workLink: "https://drive.google.com/file/d/1BsfzMhRfEWXTB4KEpCL1I6KH64RtY2pm/view",
  },
  {
    id: "yunus-parvez",
    name: "Yunus Parvez",
    image: "/images/yunus-parvez.jpg",
    location: "Hebbal, Bangalore",
    state: "Karnataka",
    whatsapp: "9845428007",
    skills: ["Technical Crew"],
    experience: "0-1 years",
    productions: ["Open for Opportunities"],
  },
  {
    id: "prateek",
    name: "Prateek",
    image: "/images/prateek-profile.jpg",
    location: "Rohini Sector 19, Delhi",
    state: "Delhi",
    whatsapp: "8287820851",
    skills: [
      "Photographer",
      "Videographer",
      "Assistant Director",
      "Set Designer",
      "Lighting Technician",
      "Costume Designer",
      "Technical Support",
    ],
    experience: "0-1 years",
    productions: ["Open for Opportunities"],
    instagram: "https://www.instagram.com/Prateek.01/",
  },
  {
    id: "sonia",
    name: "Sonia",
    image: "/images/sonia-profile.jpg",
    location: "Badarpur, New Delhi",
    state: "Delhi",
    email: "soniadas521990@gmail.com",
    whatsapp: "",
    skills: ["Assistant Director"],
    experience: "5 years",
    productions: ["Bargad Theatre Group"],
  },
  // Cloned from Theatre Artists - profiles with production-related skills
  {
    id: "aaqib-jamal-production",
    name: "Aaqib Jamal",
    image: "/images/artists/aaqib-jamal.jpg",
    location: "Bengaluru",
    state: "Karnataka",
    email: "aaqib.jamal25@gmail.com",
    whatsapp: "",
    skills: ["Production Manager", "Sound Designer", "Videographer", "Photographer"],
    experience: "13+ years",
    productions: [
      "Various theatre productions as Production Manager",
      "Sound design for stage performances",
      "Video and photography documentation",
    ],
    instagram: "https://www.instagram.com/aaqib_jamal/",
  },
  {
    id: "ronak-sharma-production",
    name: "Ronak Sharma",
    image: "/images/artists/ronak-sharma.jpg",
    location: "Bengaluru",
    state: "Karnataka",
    email: "Shanu.ronak@gmail.com",
    whatsapp: "8095955140",
    skills: ["Costume Designer"],
    experience: "10 years",
    productions: [
      "Costume design for multiple plays",
      "Music videos",
      "Documentaries",
      "Mini series",
    ],
    instagram: "https://www.instagram.com/ronaksharmagupta?igsh=MWUwZnpkaGFxdGdvdw==",
  },
]
