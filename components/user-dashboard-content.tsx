"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { 
  LayoutDashboard, 
  User, 
  Briefcase, 
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  MapPin,
  Mail,
  Phone,
  Star,
  Globe,
  FileCheck,
  Search
} from "lucide-react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface DashboardStats {
  total_auditions_applied: number
  active_applications: number
  shortlisted_applications: number
  rejected_applications: number
}

interface AppliedAudition {
  id: string
  opportunity_id: string
  audition_title: string
  organisation_name: string
  location: string
  date: string
  application_status: string
  applied_date: string
}

function StatsCard({ title, value, icon, bgColor }: { title: string, value: number, icon: React.ReactNode, bgColor: string }) {
  return (
    <Card className="rounded-2xl border-none shadow-sm overflow-hidden relative">
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
          </div>
          <div className={`h-12 w-12 rounded-full ${bgColor} flex items-center justify-center`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function UserDashboardContent({ user, profile, talentProfile }: { user: any, profile: any, talentProfile: any }) {
  const [activeTab, setActiveTab] = useState("profile")
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [applications, setApplications] = useState<AppliedAudition[]>([])
  const [loading, setLoading] = useState(true)
  
  // Profile Editable Fields
  const [editMode, setEditMode] = useState(false)
  const [formData, setFormData] = useState({
    full_name: talentProfile?.full_name || '',
    phone: talentProfile?.phone || '',
    city: talentProfile?.city || '',
    state: talentProfile?.state || '',
    bio: talentProfile?.bio || '',
    acting_skills: talentProfile?.acting_skills?.join(', ') || '',
    languages: talentProfile?.languages?.join(', ') || '',
  })
  
  const router = useRouter()

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/user/dashboard/stats")
      if (res.ok) {
        const data = await res.json()
        setStats(data.metrics)
      }
    } catch (error) {
      console.error("Failed to fetch stats", error)
    }
  }, [])

  const fetchApplications = useCallback(async () => {
    try {
      const res = await fetch("/api/user/dashboard/applied-auditions")
      if (res.ok) {
        const data = await res.json()
        setApplications(data.applied_auditions || [])
      }
    } catch (error) {
      console.error("Failed to fetch applications", error)
    }
  }, [])

  useEffect(() => {
    const init = async () => {
      setLoading(true)
      await Promise.all([
        fetchStats(),
        fetchApplications()
      ])
      setLoading(false)
    }
    init()
  }, [fetchStats, fetchApplications])

  const completionMetrics = useMemo(() => {
    if (!talentProfile) return { percentage: 0, missing: ['Profile needs to be built'] }
    
    const requiredFields = [
      { key: 'full_name', name: 'Full Name' },
      { key: 'phone', name: 'Phone Number' },
      { key: 'city', name: 'City' },
      { key: 'state', name: 'State' },
      { key: 'bio', name: 'Bio' },
      { key: 'acting_skills', name: 'Acting Skills', isArray: true },
      { key: 'languages', name: 'Languages', isArray: true },
      { key: 'portfolio_images', name: 'Portfolio Images', isArray: true },
      { key: 'portfolio_videos', name: 'Portfolio Videos', isArray: true }
    ]

    let completed = 0;
    const missing: string[] = [];

    requiredFields.forEach(field => {
      const val = talentProfile[field.key]
      if (field.isArray) {
        if (val && val.length > 0) completed++;
        else missing.push(field.name);
      } else {
        if (val && val.trim().length > 0) completed++;
        else missing.push(field.name);
      }
    });

    const percentage = Math.round((completed / requiredFields.length) * 100);
    return { percentage, missing };
  }, [talentProfile])

  const handleUpdateProfile = async () => {
    try {
      // Basic text fields update, for media we redirect to main profile builder
      const payload = {
        profile: {
          ...talentProfile,
          full_name: formData.full_name,
          phone: formData.phone,
          city: formData.city,
          state: formData.state,
          bio: formData.bio,
          acting_skills: formData.acting_skills.split(',').map((s: string) => s.trim()).filter(Boolean),
          languages: formData.languages.split(',').map((s: string) => s.trim()).filter(Boolean),
        }
      }

      const res = await fetch("/api/talent-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      if (res.ok) {
        toast.success("Profile basic fields updated!")
        setEditMode(false)
        router.refresh() // Refresh page to reflect server changes
      } else {
        toast.error("Failed to update profile")
      }
    } catch (e) {
      toast.error("Error updating profile")
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
            Dashboard
          </h1>
          <p className="text-gray-500 mt-1">Manage your profile and track applied auditions</p>
        </div>
        <Button asChild className="bg-purple-600 hover:bg-purple-700 shadow-lg">
          <Link href="/auditions">
            <Search className="h-4 w-4 mr-2" /> Find Auditions
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="profile" onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-white border p-1 rounded-xl shadow-sm w-full md:w-auto h-auto grid grid-cols-2 md:grid-cols-4">
          <TabsTrigger value="overview" className="rounded-lg py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
            <LayoutDashboard className="h-4 w-4 mr-2 transition-colors" /> Overview
          </TabsTrigger>
          <TabsTrigger value="applications" className="rounded-lg py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
            <Briefcase className="h-4 w-4 mr-2 transition-colors" /> Applications
          </TabsTrigger>
          <TabsTrigger value="profile" className="rounded-lg py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
            <User className="h-4 w-4 mr-2 transition-colors" /> Talent Profile
          </TabsTrigger>
          <TabsTrigger value="completion" className="rounded-lg py-2.5 data-[state=active]:bg-purple-600 data-[state=active]:text-white data-[state=active]:shadow-md transition-all">
            <FileCheck className="h-4 w-4 mr-2 transition-colors" /> Profile Score
          </TabsTrigger>
        </TabsList>

        {/* Overview Section */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard 
              title="Total Applied" 
              value={stats?.total_auditions_applied || 0} 
              icon={<Briefcase className="h-6 w-6 text-blue-600" />} 
              bgColor="bg-blue-50"
            />
            <StatsCard 
              title="Active Applications" 
              value={stats?.active_applications || 0} 
              icon={<Clock className="h-6 w-6 text-purple-600" />} 
              bgColor="bg-purple-50"
            />
            <StatsCard 
              title="Shortlisted" 
              value={stats?.shortlisted_applications || 0} 
              icon={<CheckCircle2 className="h-6 w-6 text-green-600" />} 
              bgColor="bg-green-50"
            />
            <StatsCard 
              title="Rejected" 
              value={stats?.rejected_applications || 0} 
              icon={<XCircle className="h-6 w-6 text-orange-600" />} 
              bgColor="bg-orange-50"
            />
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-50 flex flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-bold">Recent Applications</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setActiveTab("applications")} className="text-purple-600">View All</Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-gray-50 text-sm">
                  {applications.slice(0, 5).map((app) => (
                    <div key={app.id} className="flex items-center justify-between p-4 hover:bg-gray-50/50 transition-colors">
                      <div className="flex-1 min-w-0 pr-4">
                        <p className="font-bold text-gray-900 truncate">{app.audition_title}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{app.organisation_name} • {new Date(app.applied_date).toLocaleDateString()}</p>
                      </div>
                      <Badge className={
                        app.application_status === 'shortlisted' ? 'bg-green-100 text-green-700' : 
                        app.application_status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }>
                        {app.application_status}
                      </Badge>
                    </div>
                  ))}
                  {applications.length === 0 && (
                    <div className="p-8 text-center text-gray-500 italic">No applications yet</div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border-none shadow-sm overflow-hidden">
              <CardHeader className="bg-white border-b border-gray-50 pb-4">
                <CardTitle className="text-lg font-bold">Profile Completion</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-gray-600 mb-2">Your profile is {completionMetrics.percentage}% complete.</p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                  <div className="bg-green-600 h-2.5 rounded-full transition-all" style={{ width: `${completionMetrics.percentage}%` }}></div>
                </div>
                {completionMetrics.missing.length > 0 ? (
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Needs attention:</p>
                    <ul className="list-disc pl-5 text-sm text-gray-500 space-y-1">
                      {completionMetrics.missing.slice(0, 3).map((item, idx) => (
                        <li key={idx}>Add {item}</li>
                      ))}
                      {completionMetrics.missing.length > 3 && <li>And more...</li>}
                    </ul>
                    <Button variant="outline" className="mt-4 w-full" onClick={() => setActiveTab("completion")}>
                      View details
                    </Button>
                  </div>
                ) : (
                  <p className="text-green-600 font-medium flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5" /> All set! Your profile stands out.
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Applications Section */}
        <TabsContent value="applications" className="space-y-4">
          <Card className="rounded-2xl shadow-sm border-none overflow-hidden">
            <CardHeader className="bg-white border-b border-gray-50">
              <CardTitle className="text-xl">Applied Auditions</CardTitle>
              <CardDescription>Review the status of your applications</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm border-collapse">
                  <thead className="bg-gray-50/80 text-gray-500 uppercase text-[10px] font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Title</th>
                      <th className="px-6 py-4">Organisation</th>
                      <th className="px-6 py-4">Location</th>
                      <th className="px-6 py-4">Applied Date</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {applications.map((app) => (
                      <tr key={app.id} className="hover:bg-gray-50/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-gray-900">{app.audition_title}</td>
                        <td className="px-6 py-4 text-gray-600">{app.organisation_name}</td>
                        <td className="px-6 py-4 text-gray-500">{app.location || 'Remote/TBD'}</td>
                        <td className="px-6 py-4 text-gray-500">
                           {new Date(app.applied_date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                           <Badge className={
                            app.application_status === 'shortlisted' ? 'bg-green-100 text-green-700 border-none' : 
                            app.application_status === 'rejected' ? 'bg-red-100 text-red-700 border-none' :
                            'bg-blue-100 text-blue-700 border-none'
                          }>
                            {app.application_status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="ghost" size="icon" asChild className="text-purple-600 hover:text-purple-700 hover:bg-purple-50">
                            <Link href={`/auditions/${app.opportunity_id}`}>
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    ))}
                    {applications.length === 0 && (
                      <tr>
                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                          You haven't applied to any auditions yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Profile Section */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="rounded-2xl shadow-sm border-none p-2 sm:p-6 lg:p-8">
            <div className="mb-8 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Talent Profile</h2>
                <p className="text-gray-500">Manage your quick artist profile information</p>
              </div>
              <div>
                <Button variant="outline" className="mr-2" onClick={() => setEditMode(!editMode)}>
                  {editMode ? 'Cancel Edit' : 'Quick Edit'}
                </Button>
                <Button asChild className="bg-purple-600 hover:bg-purple-700">
                  <Link href="/talent-profile">
                    Open Advanced Editor
                  </Link>
                </Button>
              </div>
            </div>
            
            {editMode ? (
              <div className="space-y-6 max-w-2xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone</label>
                    <Input value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">City</label>
                    <Input value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">State</label>
                    <Input value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio (short description)</label>
                  <Textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} rows={3} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Acting Skills (comma-separated)</label>
                  <Input value={formData.acting_skills} onChange={e => setFormData({...formData, acting_skills: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Languages (comma-separated)</label>
                  <Input value={formData.languages} onChange={e => setFormData({...formData, languages: e.target.value})} />
                </div>
                
                <p className="text-xs text-blue-600 bg-blue-50 p-3 rounded-lg flex items-start gap-2">
                  <Globe className="h-4 w-4 shrink-0 mt-0.5" />
                  To manage Portfolio Images, Videos, Education, and Experience, please use the Advanced Editor.
                </p>

                <Button onClick={handleUpdateProfile} className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                  Save Changes
                </Button>
              </div>
            ) : (
              <div className="space-y-8 max-w-4xl">
                {talentProfile ? (
                  <>
                    <div className="flex gap-6 items-start border-b pb-6">
                      {talentProfile.profile_image_url ? (
                        <img src={talentProfile.profile_image_url} alt="Profile" className="w-24 h-24 rounded-full object-cover shadow-sm border border-gray-100" />
                      ) : (
                        <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 text-2xl font-bold">
                          {talentProfile.full_name?.charAt(0) || 'U'}
                        </div>
                      )}
                      <div>
                        <h3 className="text-2xl font-bold">{talentProfile.full_name || 'No Name Set'}</h3>
                        <p className="text-gray-500 flex items-center gap-2 mt-1">
                          <MapPin className="h-4 w-4" /> {talentProfile.city || 'City'}, {talentProfile.state || 'State'}
                        </p>
                        <p className="text-gray-500 flex items-center gap-2 mt-1 hidden sm:flex">
                          <Mail className="h-4 w-4" /> {talentProfile.email}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div>
                        <h4 className="font-semibold mb-3 border-b pb-1 text-gray-700">About Me</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{talentProfile.bio || 'No bio written yet.'}</p>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2 border-b pb-1 text-gray-700">Acting Skills</h4>
                          <div className="flex flex-wrap gap-2">
                            {talentProfile.acting_skills?.length ? talentProfile.acting_skills.map((s: string, i: number) => (
                              <Badge key={i} variant="secondary" className="bg-purple-50 text-purple-700 border-none">{s}</Badge>
                            )) : <span className="text-sm text-gray-400">Not provided</span>}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2 border-b pb-1 text-gray-700">Languages</h4>
                          <div className="flex flex-wrap gap-2">
                            {talentProfile.languages?.length ? talentProfile.languages.map((s: string, i: number) => (
                              <Badge key={i} variant="secondary" className="bg-green-50 text-green-700 border-none">{s}</Badge>
                            )) : <span className="text-sm text-gray-400">Not provided</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <User className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                    <h3 className="text-lg font-medium text-gray-900">No Profile Data Found</h3>
                    <p className="text-gray-500 mb-4">You haven't built your talent profile yet.</p>
                    <Button asChild>
                      <Link href="/talent-profile">Build Profile Now</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </Card>
        </TabsContent>

        {/* Completion Section */}
        <TabsContent value="completion" className="space-y-6">
          <Card className="rounded-2xl shadow-sm border-none p-6">
            <CardHeader className="p-0 mb-6">
              <CardTitle className="text-xl flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-500" />
                Profile Completion Score
              </CardTitle>
              <CardDescription>A complete profile attracts more casting directors.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-8 border-b pb-8 border-gray-100">
                <div className="relative h-40 w-40 flex items-center justify-center shrink-0">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-gray-100" />
                    <circle 
                      cx="80" cy="80" r="70" stroke="currentColor" strokeWidth="10" fill="transparent" 
                      className={`${completionMetrics.percentage > 75 ? 'text-green-500' : completionMetrics.percentage > 40 ? 'text-yellow-500' : 'text-red-500'}`}
                      strokeDasharray="440" 
                      strokeDashoffset={440 - (440 * completionMetrics.percentage) / 100}
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl font-bold">{completionMetrics.percentage}%</span>
                  </div>
                </div>
                
                <div className="flex-1 space-y-4">
                  <h3 className="text-lg font-semibold">What's missing?</h3>
                  {completionMetrics.missing.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {completionMetrics.missing.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-red-50 text-red-700 p-3 rounded-lg text-sm font-medium border border-red-100/50">
                          <XCircle className="h-4 w-4" /> Add {item}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-green-50 text-green-700 p-4 rounded-xl flex items-center gap-3 border border-green-100/50">
                      <CheckCircle2 className="h-6 w-6" /> 
                      <p className="font-semibold">Incredible! You have filled out all recommended fields. Your profile looks great.</p>
                    </div>
                  )}
                  
                  <div className="pt-4">
                    <Button asChild className="bg-purple-600 hover:bg-purple-700 w-full sm:w-auto">
                      <Link href="/talent-profile">Complete Profile in Advanced Editor</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
