"use client"

import { useState, useEffect, useCallback } from "react"
import { 
  LayoutDashboard, 
  User, 
  Users, 
  Briefcase, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Plus,
  Loader2,
  Calendar,
  Mail,
  Phone,
  CheckCircle2,
  XCircle,
  ExternalLink,
  ChevronRight,
  MoreVertical
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { MergedOrganisationForm } from "@/features/organisation/components/MergedOrganisationForm"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { 
  Globe, 
  Instagram, 
  Youtube, 
  Video,
  MapPin as MapPinIcon,
  Languages,
  Award,
  Film as FilmIcon,
  Music as MusicIcon,
  Star as StarIcon
} from "lucide-react"

interface DashboardStats {
  total_auditions_created: number
  total_applications_received: number
  active_auditions: number
  closed_auditions: number
}

interface Applicant {
  id: string
  user_name: string
  email: string
  phone_number: string
  applied_audition: string
  application_status: string
  applied_date: string
  opportunity_id: string
  profile: any // Full profile data
}

interface Audition {
  id: string
  title: string
  type: string
  status: string
  deadline: string
  created_at: string
}

export default function OrganisationDashboardContent({ user, profile }: { user: any, profile: any }) {
  const [activeTab, setActiveTab] = useState("overview")
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [applicants, setApplicants] = useState<Applicant[]>([])
  const [auditions, setAuditions] = useState<Audition[]>([])
  const [loading, setLoading] = useState(true)
  const [profileData, setProfileData] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedApplicant, setSelectedApplicant] = useState<Applicant | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  
  // Filters
  const [applicantSearch, setApplicantSearch] = useState("")
  const [auditionFilter, setAuditionFilter] = useState("all")
  
  const router = useRouter()

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/organisation/dashboard/stats")
      if (res.ok) {
        const data = await res.json()
        setStats(data.metrics)
      }
    } catch (error) {
      console.error("Failed to fetch stats", error)
    }
  }, [])

  const fetchApplicants = useCallback(async (search = "", opportunityId = "") => {
    try {
      let url = "/api/organisation/dashboard/applicants"
      const params = new URLSearchParams()
      if (search) params.append("search", search)
      if (opportunityId && opportunityId !== "all") params.append("opportunityId", opportunityId)
      
      if (params.toString()) url += `?${params.toString()}`
      
      const res = await fetch(url)
      if (res.ok) {
        const data = await res.json()
        setApplicants(data.applicants)
      }
    } catch (error) {
      console.error("Failed to fetch applicants", error)
    }
  }, [])

  const fetchAuditions = useCallback(async () => {
    try {
      const res = await fetch(`/api/opportunities?userId=${user.id}&limit=50&status=all`)
      if (res.ok) {
        const data = await res.json()
        setAuditions(data.opportunities || [])
      }
    } catch (error) {
      console.error("Failed to fetch auditions", error)
    }
  }, [user.id])

  const fetchProfile = useCallback(async () => {
    try {
      const res = await fetch("/api/organisations/me")
      if (res.ok) {
        const data = await res.json()
        setProfileData(data)
      }
    } catch (error) {
      console.error("Failed to fetch profile", error)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await Promise.all([
        fetchStats(),
        fetchApplicants(),
        fetchAuditions(),
        fetchProfile()
      ])
      setLoading(false)
    }
    init()
  }, [fetchStats, fetchApplicants, fetchAuditions, fetchProfile])

  const openApplicantDetails = (applicant: Applicant) => {
    setSelectedApplicant(applicant)
    setIsDetailsModalOpen(true)
  }

  const handleProfileSubmit = async (data: any) => {
    try {
      setIsSubmitting(true)
      const formData = new FormData()
      const { pastProductions, imagesToDelete, keyPeople, ...restData } = data
      
      formData.append("data", JSON.stringify({
        ...restData,
        keyPeople: keyPeople || []
      }))
      
      if (imagesToDelete?.length > 0) {
          formData.append("imagesToDelete", JSON.stringify(imagesToDelete))
      }

      const productionsMetadata: any[] = []
      if (pastProductions?.length > 0) {
          pastProductions.forEach((prod: any, idx: number) => {
              productionsMetadata.push({
                  name: prod.name,
                  videoUrl: prod.videoUrl || "",
                  existingImageUrls: prod.imageUrls || [],
                  newImagesCount: prod.images?.length || 0,
              })
              if (prod.images?.length > 0) {
                  prod.images.forEach((file: File) => {
                      formData.append(`production_${idx}_images`, file, file.name)
                  })
              }
          })
      }
      formData.append("productions", JSON.stringify(productionsMetadata))

      const res = await fetch("/api/organisations/me", {
          method: "PUT",
          body: formData,
      })

      if (!res.ok) throw new Error("Failed to update profile")
      
      toast.success("Profile updated successfully!")
      fetchProfile()
    } catch (error: any) {
      toast.error(error.message || "Something went wrong")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteAudition = async (id: string, title: string) => {
    if (!confirm(`Are you sure you want to delete "${title}"?`)) return
    
    try {
      const res = await fetch(`/api/opportunities?id=${id}`, { method: 'DELETE' })
      if (res.ok) {
        toast.success("Audition deleted")
        fetchAuditions()
        fetchStats()
      } else {
        throw new Error("Failed to delete")
      }
    } catch (error) {
      toast.error("Error deleting audition")
    }
  }

  const transformProfileData = (apiData: any) => {
    if (!apiData || !apiData.organisation) return null
    const org = apiData.organisation
    return {
      organisation_name: org.organisation_name || '',
      organisation_types: org.organisation_types || [],
      city: org.city || '',
      state: org.state || '',
      country: org.country || '',
      primary_languages: org.primary_languages || [],
      core_work: org.core_work || [],
      contact_email: org.contact_email || '',
      instagram: org.instagram || '',
      short_description: org.short_description || '',
      founded_year: org.founded_year || '',
      website: org.website || '',
      youtube: org.youtube || '',
      keyPeople: (org.organisation_key_people || []).map((p: any) => ({ name: p.name, role: p.role })),
      pastProductions: (org.organisation_past_productions || []).map((prod: any) => ({
        name: prod.name,
        videoUrl: prod.video_url,
        imageUrls: prod.image_urls,
        images: []
      })),
      imagesToDelete: []
    }
  }

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-2">
            <LayoutDashboard className="h-8 w-8 text-purple-600" />
            Organisation Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Manage your profile, auditions, and track applicants</p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700 shadow-lg">
          <Link href="/post-opportunity">
            <Plus className="h-4 w-4 mr-2" /> Post New Audition
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="overview" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white border p-1 rounded-xl shadow-sm w-full md:w-auto h-auto grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview" className="rounded-lg py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
            <LayoutDashboard className="h-4 w-4 mr-2 transition-colors" /> Overview
          </TabsTrigger>
          <TabsTrigger value="auditions" className="rounded-lg py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
            <Briefcase className="h-4 w-4 mr-2 transition-colors" /> Auditions
          </TabsTrigger>
          <TabsTrigger value="applicants" className="rounded-lg py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
            <Users className="h-4 w-4 mr-2 transition-colors" /> Applicants
          </TabsTrigger>
          <TabsTrigger value="profile" className="rounded-lg py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
            <User className="h-4 w-4 mr-2 transition-colors" /> Profile
          </TabsTrigger>
        </TabsList>

        {/* Overview Section */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              title="Total Auditions" 
              value={stats?.total_auditions_created || 0} 
              icon={<Briefcase className="h-6 w-6 text-blue-600" />} 
              bgColor="bg-blue-50"
            />
            <StatsCard 
              title="Total Applicants" 
              value={stats?.total_applications_received || 0} 
              icon={<Users className="h-6 w-6 text-purple-600" />} 
              bgColor="bg-purple-50"
            />
            <StatsCard 
              title="Active Auditions" 
              value={stats?.active_auditions || 0} 
              icon={<CheckCircle2 className="h-6 w-6 text-green-600" />} 
              bgColor="bg-green-50"
            />
            <StatsCard 
              title="Closed Auditions" 
              value={stats?.closed_auditions || 0} 
              icon={<XCircle className="h-6 w-6 text-orange-600" />} 
              bgColor="bg-orange-50"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-50 flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-bold">Recent Auditions</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("auditions")} className="text-purple-600">View All</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-50 text-sm">
                  {auditions.slice(0, 5).map((aud) => (
                    <div key={aud.id} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="font-bold text-gray-900 truncate">{aud.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{aud.type || "Audition"} • {new Date(aud.created_at).toLocaleDateString()}</p>
                      </div>
                      <Badge className={aud.status === 'published' ? 'bg-green-100 text-green-700 hover:bg-green-100 border-none' : 'bg-gray-100 text-gray-700 hover:bg-gray-100 border-none'}>
                        {aud.status}
                      </Badge>
                    </div>
                  ))}
                  {auditions.length === 0 && (
                    <div className="p-8 text-center text-gray-500 italic">No auditions created yet</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-50 flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-bold">Recent Applicants</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("applicants")} className="text-purple-600">View All</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-50 text-sm">
                  {applicants.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold shrink-0">
                        {app.user_name.charAt(0)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-900 truncate">{app.user_name}</p>
                        <p className="text-xs text-gray-500 truncate mt-0.5">Applied for: {app.applied_audition}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <Badge variant="outline" className="text-[10px] uppercase font-bold text-purple-600 border-purple-200">
                          {app.application_status}
                        </Badge>
                        <p className="text-[10px] text-gray-400 mt-1">{new Date(app.applied_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                  {applicants.length === 0 && (
                    <div className="p-8 text-center text-gray-500 italic">No applications received yet</div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Auditions Section */}
        <TabsContent value="auditions" className="space-y-4">
          <Card className="rounded-2xl shadow-sm border-none overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-50">
              <CardTitle className="text-xl">Manage Auditions</CardTitle>
              <CardDescription>Track and manage your posted opportunities</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-gray-50/80 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4">Deadline</th>
                      <th className="px-6 py-4">Applications</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {auditions.map((aud) => (
                      <tr key={aud.id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900">{aud.title}</td>
                        <td className="px-6 py-4">
                          <Badge className={aud.status === 'published' ? 'bg-green-100 text-green-700 border-none' : 'bg-gray-100 text-gray-700 border-none'}>
                            {aud.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-gray-500 flex items-center gap-1.5 whitespace-nowrap">
                          {aud.deadline ? (
                            <>
                              <Calendar className="h-3.5 w-3.5" />
                              {new Date(aud.deadline).toLocaleDateString()}
                            </>
                          ) : "No deadline"}
                        </td>
                        <td className="px-6 py-4">
                           {/* Would need counts per audition in API ideally */}
                           <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-none px-2.5">
                             View Applicants
                           </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="icon" asChild className="text-blue-600 hover:text-blue-700 hover:bg-blue-50">
                              <Link href={`/auditions/${aud.id}`} target="_blank">
                                <ExternalLink className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-gray-600 hover:text-purple-600" asChild>
                              <Link href={`/post-opportunity?id=${aud.id}`}>
                                <Edit className="h-4 w-4" />
                              </Link>
                            </Button>
                            <Button variant="ghost" size="icon" className="text-red-500 hover:bg-red-50" onClick={() => handleDeleteAudition(aud.id, aud.title)}>
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Applicants Section */}
        <TabsContent value="applicants" className="space-y-6">
          <Card className="rounded-2xl shadow-sm border-none">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input 
                    placeholder="Search applicants by name..." 
                    value={applicantSearch}
                    onChange={(e) => {
                      setApplicantSearch(e.target.value)
                      fetchApplicants(e.target.value, auditionFilter)
                    }}
                    className="pl-10 rounded-xl"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select 
                    className="h-10 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                    onChange={(e) => {
                      setAuditionFilter(e.target.value)
                      fetchApplicants(applicantSearch, e.target.value)
                    }}
                  >
                    <option value="all">All Auditions</option>
                    {auditions.map(aud => (
                      <option key={aud.id} value={aud.id}>{aud.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="rounded-xl border border-gray-100 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-gray-50/80 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4">Applicant</th>
                        <th className="px-6 py-4">Contact</th>
                        <th className="px-6 py-4">Applied Audition</th>
                        <th className="px-6 py-4">Date</th>
                        <th className="px-6 py-4">Status</th>
                        <th className="px-6 py-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {applicants.map((app) => (
                        <tr key={app.id} className="hover:bg-gray-50/30 transition-colors">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs">
                                {app.user_name.charAt(0)}
                              </div>
                              <span className="font-bold text-gray-900">{app.user_name}</span>
                            </div>
                          </td>
                          <td className="px-6 py-4 space-y-1">
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Mail className="h-3 w-3" /> {app.email}
                            </div>
                            <div className="flex items-center gap-1.5 text-xs text-gray-600">
                              <Phone className="h-3 w-3" /> {app.phone_number}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="text-gray-700 font-medium">{app.applied_audition}</span>
                          </td>
                          <td className="px-6 py-4 text-gray-500 text-xs">
                            {new Date(app.applied_date).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4">
                            <Badge variant="secondary" className="bg-purple-50 text-purple-700 border-none capitalize">
                              {app.application_status}
                            </Badge>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-purple-600 font-bold"
                              onClick={() => openApplicantDetails(app as Applicant)}
                            >
                              Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                      {applicants.length === 0 && (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center text-gray-500 bg-gray-50/20">
                            No applicants found matching your criteria
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Section */}
        <TabsContent value="profile">
          <Card className="rounded-2xl shadow-sm border-none p-2 sm:p-6 lg:p-8">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900">Organisation Profile</h2>
              <p className="text-gray-500">Update your business details and showcase your work</p>
            </div>
            <MergedOrganisationForm 
              initialData={transformProfileData(profileData) as any}
              handleFormSubmit={handleProfileSubmit}
              isSubmitting={isSubmitting}
              profileId={profile.id}
            />
          </Card>
        </TabsContent>
      </Tabs>
      {/* Applicant Details Modal */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center gap-3">
              {selectedApplicant?.profile?.profile_image_url ? (
                <img 
                  src={selectedApplicant.profile.profile_image_url} 
                  alt={selectedApplicant.user_name}
                  className="h-12 w-12 rounded-full object-cover border-2 border-purple-100"
                />
              ) : (
                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-lg border-2 border-purple-100">
                  {selectedApplicant?.user_name.charAt(0)}
                </div>
              )}
              {selectedApplicant?.user_name}
            </DialogTitle>
            <DialogDescription>
              Applicant details for {selectedApplicant?.applied_audition}
            </DialogDescription>
          </DialogHeader>

          <div className="overflow-y-auto max-h-[calc(90vh-120px)] pr-4 -mr-4">
            <div className="space-y-8 py-4">
              {/* Basic Info Section */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 border-b pb-1 flex items-center gap-2">
                    <User className="h-4 w-4 text-purple-600" /> Contact Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Email:</span>
                      <span className="font-medium">{selectedApplicant?.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Phone:</span>
                      <span className="font-medium">{selectedApplicant?.phone_number}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium">
                        {selectedApplicant?.profile?.city}, {selectedApplicant?.profile?.state}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-gray-900 border-b pb-1 flex items-center gap-2">
                    <Award className="h-4 w-4 text-purple-600" /> Professional Summary
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Exp Level:</span>
                      <Badge variant="outline" className="capitalize">{selectedApplicant?.profile?.experience_level || 'N/A'}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Years of Exp:</span>
                      <span className="font-medium">{selectedApplicant?.profile?.years_of_experience || 0} Years</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Gender / Age:</span>
                      <span className="font-medium capitalize">
                        {selectedApplicant?.profile?.gender || 'N/A'} / {
                          selectedApplicant?.profile?.date_of_birth ? 
                          (new Date().getFullYear() - new Date(selectedApplicant.profile.date_of_birth).getFullYear()) : 
                          'N/A'
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Height:</span>
                      <span className="font-medium">{selectedApplicant?.profile?.height || 'N/A'} cm</span>
                    </div>
                  </div>
                </div>
              </section>

              {/* Bio Section */}
              <section className="space-y-2">
                <h3 className="font-bold text-gray-900 border-b pb-1 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-purple-600" /> About the Artist
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed italic">
                  "{selectedApplicant?.profile?.bio || 'No bio provided'}"
                </p>
              </section>

              {/* Skills & Styles */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <StarIcon className="h-4 w-4 text-purple-600" /> Acting Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplicant?.profile?.acting_skills?.length > 0 ? (
                      selectedApplicant.profile.acting_skills.map((skill: string) => (
                        <Badge key={skill} variant="secondary" className="bg-blue-50 text-blue-700 border-none">{skill}</Badge>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">No skills listed</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <MusicIcon className="h-4 w-4 text-purple-600" /> Dance Styles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplicant?.profile?.dance_styles?.length > 0 ? (
                      selectedApplicant.profile.dance_styles.map((style: string) => (
                        <Badge key={style} variant="secondary" className="bg-pink-50 text-pink-700 border-none">{style}</Badge>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">No styles listed</span>
                    )}
                  </div>
                </div>
              </section>

              {/* Languages & Roles */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <Languages className="h-4 w-4 text-purple-600" /> Languages
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplicant?.profile?.languages?.length > 0 ? (
                      selectedApplicant.profile.languages.map((lang: string) => (
                        <Badge key={lang} variant="secondary" className="bg-green-50 text-green-700 border-none">{lang}</Badge>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">No languages listed</span>
                    )}
                  </div>
                </div>

                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-gray-700 flex items-center gap-2">
                    <FilmIcon className="h-4 w-4 text-purple-600" /> Preferred Roles
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedApplicant?.profile?.preferred_roles?.length > 0 ? (
                      selectedApplicant.profile.preferred_roles.map((role: string) => (
                        <Badge key={role} variant="secondary" className="bg-amber-50 text-amber-700 border-none">{role}</Badge>
                      ))
                    ) : (
                      <span className="text-xs text-gray-400">No roles listed</span>
                    )}
                  </div>
                </div>
              </section>

              {/* Portfolio Media */}
              {(selectedApplicant?.profile?.portfolio_images?.length > 0 || selectedApplicant?.profile?.portfolio_videos?.length > 0) && (
                <section className="space-y-4">
                  <h3 className="font-bold text-gray-900 border-b pb-1 flex items-center gap-2">
                    <Video className="h-4 w-4 text-purple-600" /> Portfolio Media
                  </h3>
                  
                  {selectedApplicant?.profile?.portfolio_images?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Images</p>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {selectedApplicant.profile.portfolio_images.map((img: string, idx: number) => (
                          <div key={idx} className="aspect-square rounded-lg overflow-hidden border bg-gray-50">
                            <img src={img} alt={`Portfolio ${idx}`} className="w-full h-full object-cover" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedApplicant?.profile?.portfolio_videos?.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-semibold text-gray-500 uppercase">Videos</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {selectedApplicant.profile.portfolio_videos.map((vid: string, idx: number) => (
                          <div key={idx} className="aspect-video rounded-lg overflow-hidden border bg-black shadow-sm">
                            <video src={vid} controls className="w-full h-full" />
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </section>
              )}

              {/* Social Links */}
              <section className="space-y-3">
                <h3 className="font-bold text-gray-900 border-b pb-1 flex items-center gap-2">
                  <Globe className="h-4 w-4 text-purple-600" /> Portfolio & Socials
                </h3>
                <div className="flex flex-wrap gap-4">
                  {selectedApplicant?.profile?.instagram_url && (
                    <a href={selectedApplicant.profile.instagram_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-pink-600 hover:underline">
                      <Instagram className="h-4 w-4" /> Instagram
                    </a>
                  )}
                  {selectedApplicant?.profile?.youtube_url && (
                    <a href={selectedApplicant.profile.youtube_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-red-600 hover:underline">
                      <Youtube className="h-4 w-4" /> YouTube
                    </a>
                  )}
                  {selectedApplicant?.profile?.website_url && (
                    <a href={selectedApplicant.profile.website_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-blue-600 hover:underline">
                      <Globe className="h-4 w-4" /> Website
                    </a>
                  )}
                </div>
              </section>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

function StatsCard({ title, value, icon, bgColor }: { title: string, value: number, icon: React.ReactNode, bgColor: string }) {
  return (
    <Card className="rounded-2xl border-none shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mt-1">{value}</h3>
        </div>
        <div className={`p-4 ${bgColor} rounded-2xl`}>
          {icon}
        </div>
      </CardContent>
    </Card>
  )
}
