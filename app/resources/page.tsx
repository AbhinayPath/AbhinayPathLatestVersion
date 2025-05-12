import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, School, ExternalLink } from "lucide-react"

export default function ResourcesPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="font-playfair text-4xl font-bold mb-4">Resources</h1>
        <p className="text-gray-600">
          Access trusted acting institutions and self-study materials to enhance your theatrical skills.
        </p>
      </div>

      <Tabs defaultValue="institutions" className="w-full">
        <TabsList className="grid w-full grid-cols-2 rounded-md">
          <TabsTrigger
            value="institutions"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <School className="h-4 w-4 mr-2" /> Institutions
          </TabsTrigger>
          <TabsTrigger
            value="self-study"
            className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
          >
            <BookOpen className="h-4 w-4 mr-2" /> Self-Study
          </TabsTrigger>
        </TabsList>

        {/* Institutions Tab */}
        <TabsContent value="institutions" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "National School of Drama",
                location: "New Delhi",
                image: "/placeholder.svg?height=200&width=300&text=NSD",
                description:
                  "India's premier theater training institution offering comprehensive programs in various aspects of theater.",
                link: "#",
                logo: "/placeholder.svg?height=60&width=60&text=NSD",
              },
              {
                name: "Film and Television Institute of India",
                location: "Pune",
                image: "/placeholder.svg?height=200&width=300&text=FTII",
                description: "Renowned institute offering specialized courses in acting for both stage and screen.",
                link: "#",
                logo: "/placeholder.svg?height=60&width=60&text=FTII",
              },
              {
                name: "Drama School Mumbai",
                location: "Mumbai",
                image: "/placeholder.svg?height=200&width=300&text=DSM",
                description: "Modern training center focusing on contemporary theater practices and techniques.",
                link: "#",
                logo: "/placeholder.svg?height=60&width=60&text=DSM",
              },
              {
                name: "Ninasam Theatre Institute",
                location: "Karnataka",
                image: "/placeholder.svg?height=200&width=300&text=Ninasam",
                description: "Cultural organization offering training in traditional and modern theater forms.",
                link: "#",
                logo: "/placeholder.svg?height=60&width=60&text=Ninasam",
              },
              {
                name: "Shri Ram Centre for Performing Arts",
                location: "Delhi",
                image: "/placeholder.svg?height=200&width=300&text=SRC",
                description: "Prestigious institution offering training in various performing arts disciplines.",
                link: "#",
                logo: "/placeholder.svg?height=60&width=60&text=SRC",
              },
              {
                name: "Koothu-P-Pattarai",
                location: "Chennai",
                image: "/placeholder.svg?height=200&width=300&text=Koothu-P-Pattarai",
                description: "Theater laboratory focusing on Tamil theater traditions and contemporary practices.",
                link: "#",
                logo: "/placeholder.svg?height=60&width=60&text=KPP",
              },
            ].map((institution, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full card-hover"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={institution.image || "/placeholder.svg"}
                    alt={institution.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center mb-3">
                    <div className="relative h-12 w-12 mr-3 bg-gray-100 rounded-md overflow-hidden">
                      <Image
                        src={institution.logo || "/placeholder.svg"}
                        alt={`${institution.name} logo`}
                        fill
                        className="object-contain p-1"
                      />
                    </div>
                    <div>
                      <h3 className="font-playfair text-xl font-bold">{institution.name}</h3>
                      <p className="text-gray-500 text-sm">{institution.location}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4 flex-1">{institution.description}</p>
                  <Link href={institution.link} className="mt-auto">
                    <Button variant="outline" size="sm" className="rounded-md w-full">
                      Visit Website <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Self-Study Tab */}
        <TabsContent value="self-study" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "An Actor Prepares",
                author: "Constantin Stanislavski",
                type: "Book",
                image: "/placeholder.svg?height=200&width=300&text=Actor Prepares",
                description: "The classic text on method acting that has influenced generations of actors worldwide.",
                link: "#",
              },
              {
                title: "The Power of the Actor",
                author: "Ivana Chubbuck",
                type: "Book",
                image: "/placeholder.svg?height=200&width=300&text=Power of Actor",
                description: "A modern approach to acting technique focusing on using personal experiences.",
                link: "#",
              },
              {
                title: "Voice and the Actor",
                author: "Cicely Berry",
                type: "Book",
                image: "/placeholder.svg?height=200&width=300&text=Voice Actor",
                description: "Essential guide to voice techniques for stage performers from the RSC voice coach.",
                link: "#",
              },
              {
                title: "Howlround Theatre Commons",
                author: "Various Contributors",
                type: "Online Resource",
                image: "/placeholder.svg?height=200&width=300&text=Howlround",
                description:
                  "Free and open platform for theater makers worldwide, featuring articles, essays, and videos.",
                link: "https://howlround.com/",
              },
              {
                title: "Open Source Shakespeare",
                author: "George Mason University",
                type: "Online Resource",
                image: "/placeholder.svg?height=200&width=300&text=Shakespeare",
                description: "Complete works of Shakespeare with search tools and concordances for research and study.",
                link: "https://www.opensourceshakespeare.org/",
              },
              {
                title: "Digital Theatre+",
                author: "Various Contributors",
                type: "Online Resource",
                image: "/placeholder.svg?height=200&width=300&text=Digital Theatre",
                description:
                  "Extensive collection of recorded theater performances, interviews, and educational resources.",
                link: "https://www.digitaltheatreplus.com/",
              },
            ].map((resource, index) => (
              <div
                key={index}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col h-full card-hover"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={resource.image || "/placeholder.svg"}
                    alt={resource.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <span className="badge-primary mb-3">{resource.type}</span>
                  <h3 className="font-playfair text-xl font-bold mb-1">{resource.title}</h3>
                  <p className="text-gray-500 text-sm mb-3">By {resource.author}</p>
                  <p className="text-gray-600 mb-4 flex-1">{resource.description}</p>
                  <Link href={resource.link} className="mt-auto">
                    <Button variant="outline" size="sm" className="rounded-md w-full">
                      Access Resource <ExternalLink className="ml-2 h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
