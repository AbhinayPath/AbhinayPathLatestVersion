"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Video,
  FileText,
  Calendar,
  BookOpen,
  User,
  Lightbulb,
  Search,
  Clock,
  Award,
  BookmarkCheck,
  School,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import AdmissionsBanner from "@/components/admissions-banner"
import { Card, CardContent } from "@/components/ui/card"

export default function AdmissionsPage() {
  const [activeVideoFilter, setActiveVideoFilter] = useState("all")
  const [activeArticleFilter, setActiveArticleFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Sample video data
  const videos = [
    {
      title: "NSD Entrance Exam Preparation",
      presenter: "Adil Hussain",
      role: "NSD Graduate, Actor",
      image: "/placeholder.svg?height=200&width=300&text=NSD Prep",
      description:
        "Comprehensive guide on preparing for the written test, interview, and practical rounds of the NSD entrance exam.",
      duration: "45 minutes",
      link: "#",
      category: "alumni",
      institution: "NSD",
    },
    {
      title: "FTII Acting Audition Tips",
      presenter: "Rajkummar Rao",
      role: "FTII Graduate, Actor",
      image: "/placeholder.svg?height=200&width=300&text=FTII Tips",
      description: "Insights into the FTII selection process with practical demonstrations of audition pieces.",
      duration: "38 minutes",
      link: "#",
      category: "alumni",
      institution: "FTII",
    },
    {
      title: "Monologue Preparation Masterclass",
      presenter: "Konkona Sen Sharma",
      role: "Director, Actor",
      image: "/placeholder.svg?height=200&width=300&text=Monologue",
      description: "Learn how to select, analyze, and perform the perfect monologue for drama school auditions.",
      duration: "52 minutes",
      link: "#",
      category: "tips",
      institution: "Multiple",
    },
    {
      title: "Interview Techniques for Drama Schools",
      presenter: "Naseeruddin Shah",
      role: "NSD Graduate, Actor, Director",
      image: "/placeholder.svg?height=200&width=300&text=Interview",
      description: "Expert advice on how to present yourself and answer questions during drama school interviews.",
      duration: "41 minutes",
      link: "#",
      category: "tips",
      institution: "NSD",
    },
    {
      title: "Physical Theater Audition Workshop",
      presenter: "Roysten Abel",
      role: "Theater Director",
      image: "/placeholder.svg?height=200&width=300&text=Physical",
      description: "Practical workshop on movement techniques and physical expression for auditions.",
      duration: "35 minutes",
      link: "#",
      category: "workshop",
      institution: "Multiple",
    },
    {
      title: "Voice Preparation for Drama School",
      presenter: "Lillete Dubey",
      role: "Actor, Director",
      image: "/placeholder.svg?height=200&width=300&text=Voice",
      description: "Essential voice exercises and techniques to prepare for drama school auditions.",
      duration: "29 minutes",
      link: "#",
      category: "workshop",
      institution: "Multiple",
    },
    {
      title: "My Journey at SRFTI",
      presenter: "Tannishtha Chatterjee",
      role: "SRFTI Graduate, Actor",
      image: "/placeholder.svg?height=200&width=300&text=SRFTI Journey",
      description: "Personal account of studying at SRFTI and how it shaped my career in cinema.",
      duration: "33 minutes",
      link: "#",
      category: "alumni",
      institution: "SRFTI",
    },
    {
      title: "Written Test Preparation Guide",
      presenter: "Pankaj Tripathi",
      role: "NSD Graduate, Actor",
      image: "/placeholder.svg?height=200&width=300&text=Written Test",
      description: "Detailed strategies for preparing for the written component of drama school entrance exams.",
      duration: "47 minutes",
      link: "#",
      category: "tips",
      institution: "NSD",
    },
  ]

  // Sample article data
  const articles = [
    {
      title: "My FTII Journey: From Application to Selection",
      author: "Arjun Mathur",
      role: "FTII Acting, Batch of 2022",
      image: "/placeholder.svg?height=200&width=300&text=FTII Journey",
      description:
        "A comprehensive account detailing the entire admission process, preparation strategy, and interview experience.",
      readTime: "12 min read",
      link: "#",
      category: "alumni",
      institution: "FTII",
    },
    {
      title: "How I Prepared for NSD's Written Test",
      author: "Shweta Tripathi",
      role: "NSD Graduate, Actor",
      image: "/placeholder.svg?height=200&width=300&text=NSD Written",
      description:
        "Detailed study plan and resource list that helped me crack one of the toughest theater entrance exams.",
      readTime: "15 min read",
      link: "#",
      category: "tips",
      institution: "NSD",
    },
    {
      title: "The Practical Round: What Evaluators Look For",
      author: "Piyush Mishra",
      role: "Actor, Director, NSD Alumnus",
      image: "/placeholder.svg?height=200&width=300&text=Practical Round",
      description:
        "Insights from the other side of the table - what qualities and skills examiners seek in candidates.",
      readTime: "10 min read",
      link: "#",
      category: "tips",
      institution: "NSD",
    },
    {
      title: "Building a Theater Portfolio for Admissions",
      author: "Rasika Dugal",
      role: "Actor, FTII Graduate",
      image: "/placeholder.svg?height=200&width=300&text=Portfolio",
      description: "How to document and present your theater experience effectively for drama school applications.",
      readTime: "8 min read",
      link: "#",
      category: "tips",
      institution: "FTII",
    },
    {
      title: "Recommended Reading for Drama School Aspirants",
      author: "Manoj Bajpayee",
      role: "Actor, NSD Graduate",
      image: "/placeholder.svg?height=200&width=300&text=Reading List",
      description: "A curated list of essential plays, theory books, and resources to prepare for entrance exams.",
      readTime: "14 min read",
      link: "#",
      category: "resources",
      institution: "NSD",
    },
    {
      title: "My First Year at Drama School Mumbai",
      author: "Mithila Palkar",
      role: "Actor, DSM Graduate",
      image: "/placeholder.svg?height=200&width=300&text=DSM Experience",
      description:
        "What to expect in your first year of drama school - curriculum, challenges, and growth opportunities.",
      readTime: "11 min read",
      link: "#",
      category: "alumni",
      institution: "DSM",
    },
    {
      title: "SRFTI: A Student's Perspective",
      author: "Riddhi Sen",
      role: "SRFTI Graduate, Actor",
      image: "/placeholder.svg?height=200&width=300&text=SRFTI Perspective",
      description: "An insider's view of the SRFTI experience, from admission to graduation and beyond.",
      readTime: "13 min read",
      link: "#",
      category: "alumni",
      institution: "SRFTI",
    },
    {
      title: "Entrance Exam Analysis: What to Expect",
      author: "Nimrat Kaur",
      role: "Theater Artist",
      image: "/placeholder.svg?height=200&width=300&text=Exam Analysis",
      description: "Detailed breakdown of entrance exam patterns for major drama and film schools in India.",
      readTime: "16 min read",
      link: "#",
      category: "tips",
      institution: "Multiple",
    },
  ]

  // Filter videos based on active filter and search query
  const filteredVideos = videos.filter((video) => {
    const matchesFilter = activeVideoFilter === "all" || video.category === activeVideoFilter
    const matchesSearch =
      searchQuery === "" ||
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.presenter.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.institution.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  // Filter articles based on active filter and search query
  const filteredArticles = articles.filter((article) => {
    const matchesFilter = activeArticleFilter === "all" || article.category === activeArticleFilter
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.institution.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesFilter && matchesSearch
  })

  return (
    <div className="relative">
      {/* Coming Soon Overlay */}
      <div className="absolute inset-0 bg-black/70 z-50 flex flex-col items-center justify-center text-center px-4">
        <div className="bg-white rounded-xl p-8 max-w-md shadow-2xl transform animate-fade-in">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="h-8 w-8 text-primary" />
          </div>
          <h2 className="font-playfair text-3xl font-bold mb-2">Coming Soon!</h2>
          <p className="text-gray-700 mb-6">
            We're currently working on our Admissions & Preparation resources. Check back soon for comprehensive guides,
            videos, and important dates for theater and film school admissions.
          </p>
          <Link href="/">
            <Button className="rounded-full">Return to Home</Button>
          </Link>
        </div>
      </div>

      <div className="container py-12">
        <AdmissionsBanner />

        <div className="max-w-3xl mx-auto text-center mb-8">
          <h1 className="font-playfair text-4xl font-bold mb-3 flex items-center justify-center">
            <School className="h-8 w-8 mr-3 text-primary" />
            Admissions & Preparation
          </h1>
          <p className="text-gray-600">
            Get guidance and resources to prepare for entrance exams to prestigious theater and film institutions.
          </p>
        </div>

        {/* Search bar */}
        <div className="mb-8 relative max-w-md mx-auto">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by title, presenter, or institution..."
            className="pl-10 rounded-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 rounded-md">
            <TabsTrigger
              value="videos"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Video className="h-4 w-4 mr-2" /> Video Guides
            </TabsTrigger>
            <TabsTrigger
              value="articles"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4 mr-2" /> Articles & Blogs
            </TabsTrigger>
            <TabsTrigger
              value="dates"
              className="rounded-md data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              <Calendar className="h-4 w-4 mr-2" /> Important Dates
            </TabsTrigger>
          </TabsList>

          {/* Videos Tab */}
          <TabsContent value="videos" className="mt-6">
            <div className="mb-6 flex flex-wrap gap-2 justify-center">
              <Badge
                variant={activeVideoFilter === "all" ? "default" : "outline"}
                className="cursor-pointer text-sm py-1.5 px-4"
                onClick={() => setActiveVideoFilter("all")}
              >
                All Videos
              </Badge>
              <Badge
                variant={activeVideoFilter === "alumni" ? "default" : "outline"}
                className="cursor-pointer text-sm py-1.5 px-4"
                onClick={() => setActiveVideoFilter("alumni")}
              >
                <User className="h-3 w-3 mr-1" /> Alumni Experiences
              </Badge>
              <Badge
                variant={activeVideoFilter === "tips" ? "default" : "outline"}
                className="cursor-pointer text-sm py-1.5 px-4"
                onClick={() => setActiveVideoFilter("tips")}
              >
                <Lightbulb className="h-3 w-3 mr-1" /> Application Tips
              </Badge>
              <Badge
                variant={activeVideoFilter === "workshop" ? "default" : "outline"}
                className="cursor-pointer text-sm py-1.5 px-4"
                onClick={() => setActiveVideoFilter("workshop")}
              >
                <Video className="h-3 w-3 mr-1" /> Workshops
              </Badge>
            </div>

            {filteredVideos.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((video, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow h-full"
                  >
                    <div className="relative h-40 w-full">
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 z-10">
                        <div className="bg-white bg-opacity-80 rounded-full p-2.5">
                          <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      <Image src="/images/acting-school.png" alt={video.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {video.institution}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {video.duration}
                        </div>
                      </div>
                      <h3 className="font-playfair text-lg font-bold mb-1 line-clamp-2">{video.title}</h3>
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-gray-200 mr-2"></div>
                        <div>
                          <p className="text-xs font-medium">{video.presenter}</p>
                          <p className="text-xs text-gray-500">{video.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{video.description}</p>
                      <Link href={video.link}>
                        <Button size="sm" className="rounded-md w-full">
                          Watch Video
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No videos match your current search.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setActiveVideoFilter("all")
                    setSearchQuery("")
                  }}
                  className="rounded-full"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Articles Tab */}
          <TabsContent value="articles" className="mt-6">
            <div className="mb-6 flex flex-wrap gap-2 justify-center">
              <Badge
                variant={activeArticleFilter === "all" ? "default" : "outline"}
                className="cursor-pointer text-sm py-1.5 px-4"
                onClick={() => setActiveArticleFilter("all")}
              >
                All Articles
              </Badge>
              <Badge
                variant={activeArticleFilter === "alumni" ? "default" : "outline"}
                className="cursor-pointer text-sm py-1.5 px-4"
                onClick={() => setActiveArticleFilter("alumni")}
              >
                <User className="h-3 w-3 mr-1" /> Student/Alumni Stories
              </Badge>
              <Badge
                variant={activeArticleFilter === "tips" ? "default" : "outline"}
                className="cursor-pointer text-sm py-1.5 px-4"
                onClick={() => setActiveArticleFilter("tips")}
              >
                <Lightbulb className="h-3 w-3 mr-1" /> Application Tips
              </Badge>
              <Badge
                variant={activeArticleFilter === "resources" ? "default" : "outline"}
                className="cursor-pointer text-sm py-1.5 px-4"
                onClick={() => setActiveArticleFilter("resources")}
              >
                <BookOpen className="h-3 w-3 mr-1" /> Study Resources
              </Badge>
            </div>

            {filteredArticles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article, index) => (
                  <Card
                    key={index}
                    className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow h-full"
                  >
                    <div className="relative h-40 w-full">
                      <Image src="/images/acting-school.png" alt={article.title} fill className="object-cover" />
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="outline" className="text-xs">
                          {article.institution}
                        </Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {article.readTime}
                        </div>
                      </div>
                      <h3 className="font-playfair text-lg font-bold mb-1 line-clamp-2">{article.title}</h3>
                      <div className="flex items-center mb-2">
                        <div className="h-6 w-6 rounded-full bg-gray-200 mr-2"></div>
                        <div>
                          <p className="text-xs font-medium">{article.author}</p>
                          <p className="text-xs text-gray-500">{article.role}</p>
                        </div>
                      </div>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{article.description}</p>
                      <Link href={article.link}>
                        <Button variant="outline" size="sm" className="rounded-md w-full">
                          Read Article
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No articles match your current search.</p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setActiveArticleFilter("all")
                    setSearchQuery("")
                  }}
                  className="rounded-full"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </TabsContent>

          {/* Important Dates Tab */}
          <TabsContent value="dates" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card className="overflow-hidden border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="bg-[#2D1A54] p-4 text-white flex items-center">
                    <School className="h-5 w-5 mr-2" />
                    <h2 className="font-playfair text-xl font-bold">National School of Drama (NSD)</h2>
                  </div>
                  <div className="p-5">
                    <div className="mb-4">
                      <h3 className="font-medium text-lg mb-2 flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        Key Dates
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between text-sm border-b pb-2">
                          <span className="text-gray-600">Application Start</span>
                          <span className="text-gray-900 font-medium">May 15, 2023</span>
                        </li>
                        <li className="flex justify-between text-sm border-b pb-2">
                          <span className="text-gray-600">Application Deadline</span>
                          <span className="text-gray-900 font-medium">June 30, 2023</span>
                        </li>
                        <li className="flex justify-between text-sm border-b pb-2">
                          <span className="text-gray-600">Written Test</span>
                          <span className="text-gray-900 font-medium">August 5-6, 2023</span>
                        </li>
                        <li className="flex justify-between text-sm">
                          <span className="text-gray-600">Interview & Practical</span>
                          <span className="text-gray-900 font-medium">September 10-20, 2023</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-2 flex items-center">
                        <BookmarkCheck className="h-4 w-4 text-primary mr-2" />
                        Resources
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm">
                          <BookOpen className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <Link href="#" className="text-primary hover:underline">
                            NSD Syllabus & Pattern Guide
                          </Link>
                        </li>
                        <li className="flex items-start text-sm">
                          <Video className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <Link href="#" className="text-primary hover:underline">
                            NSD Interview Preparation Video
                          </Link>
                        </li>
                        <li className="flex items-start text-sm">
                          <FileText className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <Link href="#" className="text-primary hover:underline">
                            Sample Questions & Answers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="bg-[#2D1A54] p-4 text-white flex items-center">
                    <School className="h-5 w-5 mr-2" />
                    <h2 className="font-playfair text-xl font-bold">Film and Television Institute (FTII)</h2>
                  </div>
                  <div className="p-5">
                    <div className="mb-4">
                      <h3 className="font-medium text-lg mb-2 flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        Key Dates
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between text-sm border-b pb-2">
                          <span className="text-gray-600">Application Start</span>
                          <span className="text-gray-900 font-medium">June 1, 2023</span>
                        </li>
                        <li className="flex justify-between text-sm border-b pb-2">
                          <span className="text-gray-600">Application Deadline</span>
                          <span className="text-gray-900 font-medium">July 15, 2023</span>
                        </li>
                        <li className="flex justify-between text-sm border-b pb-2">
                          <span className="text-gray-600">Written Test</span>
                          <span className="text-gray-900 font-medium">August 20, 2023</span>
                        </li>
                        <li className="flex justify-between text-sm">
                          <span className="text-gray-600">Interview & Audition</span>
                          <span className="text-gray-900 font-medium">September 25-30, 2023</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-2 flex items-center">
                        <BookmarkCheck className="h-4 w-4 text-primary mr-2" />
                        Resources
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm">
                          <BookOpen className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <Link href="#" className="text-primary hover:underline">
                            FTII Acting Course Guide
                          </Link>
                        </li>
                        <li className="flex items-start text-sm">
                          <Video className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <Link href="#" className="text-primary hover:underline">
                            Monologue Selection Tips
                          </Link>
                        </li>
                        <li className="flex items-start text-sm">
                          <FileText className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <Link href="#" className="text-primary hover:underline">
                            Film Analysis Practice Questions
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="bg-[#2D1A54] p-4 text-white flex items-center">
                    <School className="h-5 w-5 mr-2" />
                    <h2 className="font-playfair text-xl font-bold">Satyajit Ray Film & TV Institute</h2>
                  </div>
                  <div className="p-5">
                    <div className="mb-4">
                      <h3 className="font-medium text-lg mb-2 flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        Key Dates
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex justify-between text-sm border-b pb-2">
                          <span className="text-gray-600">Application Start</span>
                          <span className="text-gray-900 font-medium">June 15, 2023</span>
                        </li>
                        <li className="flex justify-between text-sm border-b pb-2">
                          <span className="text-gray-600">Application Deadline</span>
                          <span className="text-gray-900 font-medium">July 31, 2023</span>
                        </li>
                        <li className="flex justify-between text-sm border-b pb-2">
                          <span className="text-gray-600">Written Test</span>
                          <span className="text-gray-900 font-medium">August 27, 2023</span>
                        </li>
                        <li className="flex justify-between text-sm">
                          <span className="text-gray-600">Interview & Audition</span>
                          <span className="text-gray-900 font-medium">October 5-10, 2023</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-medium text-lg mb-2 flex items-center">
                        <BookmarkCheck className="h-4 w-4 text-primary mr-2" />
                        Resources
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start text-sm">
                          <BookOpen className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <Link href="#" className="text-primary hover:underline">
                            SRFTI Course Structure Overview
                          </Link>
                        </li>
                        <li className="flex items-start text-sm">
                          <Video className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <Link href="#" className="text-primary hover:underline">
                            Alumni Interview: SRFTI Experience
                          </Link>
                        </li>
                        <li className="flex items-start text-sm">
                          <FileText className="h-4 w-4 text-primary mr-2 mt-0.5" />
                          <Link href="#" className="text-primary hover:underline">
                            Previous Year Question Papers
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-sm">
                <CardContent className="p-0">
                  <div className="bg-[#2D1A54] p-4 text-white flex items-center">
                    <Award className="h-5 w-5 mr-2" />
                    <h2 className="font-playfair text-xl font-bold">Recommended Study Material</h2>
                  </div>
                  <div className="p-5">
                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          title: "The Empty Space",
                          author: "Peter Brook",
                          category: "Theater Theory",
                          description:
                            "A fundamental text on theater theory that is often referenced in entrance exams.",
                        },
                        {
                          title: "Stanislavski: An Introduction",
                          author: "Jean Benedetti",
                          category: "Acting Technique",
                          description:
                            "Clear overview of Stanislavski's system, essential for drama school interviews.",
                        },
                        {
                          title: "Indian Theatre: Traditions of Performance",
                          author: "Farley P. Richmond",
                          category: "Indian Theater",
                          description: "Essential reading on traditional Indian performance forms and history.",
                        },
                      ].map((book, index) => (
                        <div key={index} className="flex gap-3 p-3 border rounded-md">
                          <div className="h-16 w-12 bg-gray-100 rounded flex-shrink-0"></div>
                          <div className="flex-1">
                            <h3 className="font-medium text-sm mb-0.5">{book.title}</h3>
                            <p className="text-xs text-gray-500 mb-0.5">by {book.author}</p>
                            <span className="inline-block text-xs px-2 py-0.5 bg-gray-100 rounded-full mb-1">
                              {book.category}
                            </span>
                          </div>
                        </div>
                      ))}
                      <Link href="#" className="text-primary text-sm hover:underline text-center mt-2">
                        View All Recommended Books →
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
