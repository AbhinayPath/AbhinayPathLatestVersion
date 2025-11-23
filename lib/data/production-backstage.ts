export interface ProductionProfessional {
  id: string
  name: string
  image: string
  location: string
  state: string
  email?: string
  whatsapp: string
  skills: string[]
  experience: string
  productions: string[]
  instagram?: string
  workLink?: string
  youtube?: string
  auditionVideo?: string
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
    skills: ["Light Designer"],
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
      "Props",
      "Stage Manager",
      "Production Assistant",
      "Production Manager",
      "Assistant Director",
      "Makeup & Hair",
    ],
    experience: "7 years",
    productions: ["Performers Cultural Society of Udaipur"],
    instagram: "https://www.instagram.com/p/DHL5rqwSck3/?igsh=YnJ0NzhjemhkbWNk",
    youtube: "https://www.youtube.com/@lighthouseproduction6571",
    auditionVideo: "https://youtube.com/shorts/tUkFpuSgCWY?si=22O2bJH-H929WBXP",
  },
]
