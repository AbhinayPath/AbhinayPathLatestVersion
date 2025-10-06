"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { ChevronDown, ChevronUp, MapPin, Globe, Calendar, Briefcase, Users, X } from "lucide-react"
import { cn } from "@/lib/utils"

export default function PostOpportunityPage() {
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [contactOpen, setContactOpen] = useState(false)

  // Core fields
  const [title, setTitle] = useState("")
  const [type, setType] = useState("")
  const [deadline, setDeadline] = useState("")
  const [locationMode, setLocationMode] = useState<"city" | "online">("city")
  const [city, setCity] = useState("")
  const [venue, setVenue] = useState("")
  const [platform, setPlatform] = useState("")
  const [description, setDescription] = useState("")
  const [applicationMethod, setApplicationMethod] = useState("quick")
  const [whatsapp, setWhatsapp] = useState("")
  const [email, setEmail] = useState("")
  const [formUrl, setFormUrl] = useState("")

  // Advanced fields
  const [roles, setRoles] = useState("")
  const [gender, setGender] = useState("")
  const [ageMin, setAgeMin] = useState("")
  const [ageMax, setAgeMax] = useState("")
  const [languages, setLanguages] = useState<string[]>([])
  const [languageInput, setLanguageInput] = useState("")
  const [experience, setExperience] = useState("")
  const [fee, setFee] = useState("")
  const [amount, setAmount] = useState("")
  const [visibility, setVisibility] = useState("public")

  // Media request
  const [requestPhotos, setRequestPhotos] = useState(false)
  const [photoHelper, setPhotoHelper] = useState("")
  const [requestVideos, setRequestVideos] = useState(false)
  const [videoHelper, setVideoHelper] = useState("")

  const addLanguage = () => {
    if (languageInput && languages.length < 4 && !languages.includes(languageInput)) {
      setLanguages([...languages, languageInput])
      setLanguageInput("")
    }
  }

  const removeLanguage = (lang: string) => {
    setLanguages(languages.filter((l) => l !== lang))
  }

  const isFormValid = () => {
    return (
      title.trim() !== "" &&
      type !== "" &&
      deadline !== "" &&
      (locationMode === "city" ? city.trim() !== "" && venue.trim() !== "" : platform.trim() !== "") &&
      description.trim() !== ""
    )
  }

  const handlePublish = () => {
    if (isFormValid()) {
      alert("Opportunity published successfully!")
      // Add actual publish logic here
    }
  }

  const opportunityTypes = [
    { label: "Theatre Play", value: "theatre" },
    { label: "Short Film", value: "short-film" },
    { label: "Feature Film", value: "feature-film" },
    { label: "Advertisement", value: "ad" },
    { label: "Backstage Role", value: "backstage" },
    { label: "Job Opening", value: "job" },
  ]

  const genderOptions = [
    { label: "Any", value: "any" },
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
    { label: "Other", value: "other" },
    { label: "Prefer not to say", value: "prefer-not-to-say" },
  ]

  const experienceLevels = [
    { label: "Beginner", value: "beginner" },
    { label: "Intermediate", value: "intermediate" },
    { label: "Professional", value: "professional" },
  ]

  const feeOptions = [
    { label: "Not specified", value: "not-specified" },
    { label: "Free / Volunteer", value: "free" },
    { label: "Stipend", value: "stipend" },
    { label: "Paid", value: "paid" },
  ]

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-light tracking-tight text-gray-900">Post an Opportunity</h1>
              <p className="text-gray-500">Share your casting call or job opening with the Abhinayपथ community</p>
            </div>

            {/* Core Section */}
            <Card className="border-gray-100 shadow-sm rounded-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-1.5">
                  <h2 className="text-lg font-medium text-gray-900">Core Details</h2>
                  <p className="text-sm text-gray-500">Essential information about your opportunity</p>
                </div>

                <div className="space-y-5">
                  {/* Title */}
                  <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700">
                      Title *
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., Lead Actor for Historical Drama"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                    />
                  </div>

                  {/* Type & Deadline */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="type" className="text-sm font-medium text-gray-700">
                        Type *
                      </Label>
                      <Select value={type} onValueChange={setType}>
                        <SelectTrigger className="rounded-xl border-gray-200">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {opportunityTypes.map((t) => (
                            <SelectItem key={t.value} value={t.value}>
                              {t.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="deadline" className="text-sm font-medium text-gray-700">
                        Deadline *
                      </Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                      />
                    </div>
                  </div>

                  {/* Location Mode */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Location Mode *</Label>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setLocationMode("city")}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all",
                          locationMode === "city"
                            ? "border-gray-900 bg-gray-50 text-gray-900"
                            : "border-gray-200 text-gray-600 hover:border-gray-300",
                        )}
                      >
                        <MapPin className="w-4 h-4" />
                        City
                      </button>
                      <button
                        type="button"
                        onClick={() => setLocationMode("online")}
                        className={cn(
                          "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all",
                          locationMode === "online"
                            ? "border-gray-900 bg-gray-50 text-gray-900"
                            : "border-gray-200 text-gray-600 hover:border-gray-300",
                        )}
                      >
                        <Globe className="w-4 h-4" />
                        Online
                      </button>
                    </div>
                  </div>

                  {/* City & Venue / Platform */}
                  {locationMode === "city" ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                          City *
                        </Label>
                        <Input
                          id="city"
                          placeholder="e.g., Mumbai"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="venue" className="text-sm font-medium text-gray-700">
                          Venue *
                        </Label>
                        <Input
                          id="venue"
                          placeholder="e.g., Prithvi Theatre"
                          value={venue}
                          onChange={(e) => setVenue(e.target.value)}
                          className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label htmlFor="platform" className="text-sm font-medium text-gray-700">
                        Platform *
                      </Label>
                      <Input
                        id="platform"
                        placeholder="e.g., Zoom, Google Meet"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value)}
                        className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                      />
                    </div>
                  )}

                  {/* Description */}
                  <div className="space-y-2">
                    <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                      Description *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Describe the opportunity, requirements, and what you're looking for..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={6}
                      className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0 resize-none"
                    />
                  </div>

                  {/* Application Method */}
                  <div className="space-y-3">
                    <Label className="text-sm font-medium text-gray-700">Application Method</Label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="application"
                          value="quick"
                          checked={applicationMethod === "quick"}
                          onChange={(e) => setApplicationMethod(e.target.value)}
                          className="w-4 h-4 text-gray-900 focus:ring-gray-400"
                        />
                        <span className="text-sm text-gray-700">Quick Apply on Abhinayपथ (Recommended)</span>
                      </label>
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input
                          type="radio"
                          name="application"
                          value="contact"
                          checked={applicationMethod === "contact"}
                          onChange={(e) => setApplicationMethod(e.target.value)}
                          className="w-4 h-4 text-gray-900 focus:ring-gray-400"
                        />
                        <span className="text-sm text-gray-700">Provide contact details</span>
                      </label>
                    </div>
                  </div>

                  {/* Contact Details (Collapsible) */}
                  {applicationMethod === "contact" && (
                    <div className="space-y-4 pt-2">
                      <button
                        type="button"
                        onClick={() => setContactOpen(!contactOpen)}
                        className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
                      >
                        {contactOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        Optional Contact Information
                      </button>

                      {contactOpen && (
                        <div className="space-y-4 pl-6 border-l-2 border-gray-100">
                          <div className="space-y-2">
                            <Label htmlFor="whatsapp" className="text-sm font-medium text-gray-700">
                              WhatsApp Number
                            </Label>
                            <Input
                              id="whatsapp"
                              placeholder="+91 98765 43210"
                              value={whatsapp}
                              onChange={(e) => setWhatsapp(e.target.value)}
                              className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                              Email Address
                            </Label>
                            <Input
                              id="email"
                              type="email"
                              placeholder="casting@example.com"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="formUrl" className="text-sm font-medium text-gray-700">
                              Application Form URL
                            </Label>
                            <Input
                              id="formUrl"
                              placeholder="https://forms.google.com/..."
                              value={formUrl}
                              onChange={(e) => setFormUrl(e.target.value)}
                              className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Advanced Section */}
            <Card className="border-gray-100 shadow-sm rounded-2xl">
              <CardContent className="p-8">
                <button
                  type="button"
                  onClick={() => setAdvancedOpen(!advancedOpen)}
                  className="flex items-center justify-between w-full group"
                >
                  <div className="space-y-1.5 text-left">
                    <h2 className="text-lg font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                      Advanced Filters
                    </h2>
                    <p className="text-sm text-gray-500">Optional details to refine your search</p>
                  </div>
                  {advancedOpen ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </button>

                {advancedOpen && (
                  <div className="mt-6 space-y-5 pt-6 border-t border-gray-100">
                    {/* Roles */}
                    <div className="space-y-2">
                      <Label htmlFor="roles" className="text-sm font-medium text-gray-700">
                        Roles Needed
                      </Label>
                      <Input
                        id="roles"
                        placeholder="e.g., Lead Actor, Supporting Actress, Cinematographer"
                        value={roles}
                        onChange={(e) => setRoles(e.target.value)}
                        className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                      />
                    </div>

                    {/* Gender & Experience */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
                          Gender Preference
                        </Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger className="rounded-xl border-gray-200">
                            <SelectValue placeholder="Any" />
                          </SelectTrigger>
                          <SelectContent>
                            {genderOptions.map((g) => (
                              <SelectItem key={g.value} value={g.value}>
                                {g.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="experience" className="text-sm font-medium text-gray-700">
                          Experience Level
                        </Label>
                        <Select value={experience} onValueChange={setExperience}>
                          <SelectTrigger className="rounded-xl border-gray-200">
                            <SelectValue placeholder="Any level" />
                          </SelectTrigger>
                          <SelectContent>
                            {experienceLevels.map((e) => (
                              <SelectItem key={e.value} value={e.value}>
                                {e.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Age Range */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-gray-700">Age Range</Label>
                      <div className="grid grid-cols-2 gap-4">
                        <Input
                          placeholder="Min age"
                          type="number"
                          value={ageMin}
                          onChange={(e) => setAgeMin(e.target.value)}
                          className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                        <Input
                          placeholder="Max age"
                          type="number"
                          value={ageMax}
                          onChange={(e) => setAgeMax(e.target.value)}
                          className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>
                    </div>

                    {/* Languages */}
                    <div className="space-y-2">
                      <Label htmlFor="language" className="text-sm font-medium text-gray-700">
                        Languages (max 4)
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="language"
                          placeholder="Add a language"
                          value={languageInput}
                          onChange={(e) => setLanguageInput(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault()
                              addLanguage()
                            }
                          }}
                          disabled={languages.length >= 4}
                          className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                        <Button
                          type="button"
                          onClick={addLanguage}
                          disabled={languages.length >= 4 || !languageInput}
                          variant="outline"
                          className="rounded-xl"
                        >
                          Add
                        </Button>
                      </div>
                      {languages.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {languages.map((lang) => (
                            <span
                              key={lang}
                              className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                            >
                              {lang}
                              <button
                                type="button"
                                onClick={() => removeLanguage(lang)}
                                className="hover:text-gray-900"
                              >
                                <X className="w-3 h-3" />
                              </button>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Fee / Pay */}
                    <div className="space-y-2">
                      <Label htmlFor="fee" className="text-sm font-medium text-gray-700">
                        Fee / Pay
                      </Label>
                      <Select value={fee} onValueChange={setFee}>
                        <SelectTrigger className="rounded-xl border-gray-200">
                          <SelectValue placeholder="Not specified" />
                        </SelectTrigger>
                        <SelectContent>
                          {feeOptions.map((f) => (
                            <SelectItem key={f.value} value={f.value}>
                              {f.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {(fee === "stipend" || fee === "paid") && (
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-sm font-medium text-gray-700">
                          Amount (₹)
                        </Label>
                        <Input
                          id="amount"
                          placeholder="e.g., 5000"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          className="rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                        />
                      </div>
                    )}

                    {/* Visibility */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-gray-700">Visibility</Label>
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setVisibility("public")}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all",
                            visibility === "public"
                              ? "border-gray-900 bg-gray-50 text-gray-900"
                              : "border-gray-200 text-gray-600 hover:border-gray-300",
                          )}
                        >
                          <Users className="w-4 h-4" />
                          Public
                        </button>
                        <button
                          type="button"
                          onClick={() => setVisibility("unlisted")}
                          className={cn(
                            "flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 transition-all",
                            visibility === "unlisted"
                              ? "border-gray-900 bg-gray-50 text-gray-900"
                              : "border-gray-200 text-gray-600 hover:border-gray-300",
                          )}
                        >
                          Unlisted
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Media Request Section */}
            <Card className="border-gray-100 shadow-sm rounded-2xl">
              <CardContent className="p-8 space-y-6">
                <div className="space-y-1.5">
                  <h2 className="text-lg font-medium text-gray-900">Media Request</h2>
                  <p className="text-sm text-gray-500">Optional: Request specific media from applicants</p>
                </div>

                <div className="space-y-5">
                  {/* Request Photos */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="requestPhotos"
                        checked={requestPhotos}
                        onCheckedChange={(checked) => setRequestPhotos(checked as boolean)}
                      />
                      <Label htmlFor="requestPhotos" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Request Photos
                      </Label>
                    </div>
                    {requestPhotos && (
                      <Input
                        placeholder="e.g., Please upload recent headshots"
                        value={photoHelper}
                        onChange={(e) => setPhotoHelper(e.target.value)}
                        className="ml-7 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                      />
                    )}
                  </div>

                  {/* Request Videos */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        id="requestVideos"
                        checked={requestVideos}
                        onCheckedChange={(checked) => setRequestVideos(checked as boolean)}
                      />
                      <Label htmlFor="requestVideos" className="text-sm font-medium text-gray-700 cursor-pointer">
                        Request Video Links
                      </Label>
                    </div>
                    {requestVideos && (
                      <Input
                        placeholder="e.g., Share a link to your acting reel"
                        value={videoHelper}
                        onChange={(e) => setVideoHelper(e.target.value)}
                        className="ml-7 rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
                      />
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Publish Button */}
            <div className="flex items-center justify-between pt-4">
              <p className="text-xs text-gray-400">© Abhinayपथ • Minimal form, maximal clarity.</p>
              <Button
                onClick={handlePublish}
                disabled={!isFormValid()}
                className="rounded-xl bg-gray-900 hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed px-8 py-5 text-base"
              >
                Publish Opportunity
              </Button>
            </div>
          </div>

          {/* Live Preview Panel */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card className="border-gray-100 shadow-sm rounded-2xl">
                <CardContent className="p-6 space-y-4">
                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-500">Live Preview</h3>
                    <p className="text-xs text-gray-400">How your post will appear</p>
                  </div>

                  <div className="space-y-3 py-4 border-t border-gray-100">
                    <h4 className="text-lg font-semibold text-gray-900">{title || "Opportunity Title"}</h4>

                    <div className="flex flex-wrap gap-2">
                      {type && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                          <Briefcase className="w-3 h-3" />
                          {type.replace("-", " ")}
                        </span>
                      )}
                      {deadline && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-xs">
                          <Calendar className="w-3 h-3" />
                          {new Date(deadline).toLocaleDateString()}
                        </span>
                      )}
                    </div>

                    {(city || platform) && (
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        {locationMode === "city" ? <MapPin className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
                        <span>{locationMode === "city" ? `${city}${venue ? `, ${venue}` : ""}` : platform}</span>
                      </div>
                    )}

                    <p className="text-sm text-gray-600 line-clamp-4">
                      {description || "Your opportunity description will appear here..."}
                    </p>

                    {roles && (
                      <div className="pt-2 border-t border-gray-50">
                        <p className="text-xs text-gray-500 mb-1">Roles</p>
                        <p className="text-sm text-gray-700">{roles}</p>
                      </div>
                    )}

                    {experience && (
                      <div className="pt-2 border-t border-gray-50">
                        <p className="text-xs text-gray-500 mb-1">Experience</p>
                        <p className="text-sm text-gray-700">{experience}</p>
                      </div>
                    )}

                    {(fee === "stipend" || fee === "paid") && amount && (
                      <div className="pt-2 border-t border-gray-50">
                        <p className="text-xs text-gray-500 mb-1">Compensation</p>
                        <p className="text-sm text-gray-700">₹{amount}</p>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => setPreviewOpen(true)}
                    variant="outline"
                    className="w-full rounded-xl border-gray-200"
                  >
                    Preview Apply Flow
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Preview Apply Flow Sheet */}
      <Sheet open={previewOpen} onOpenChange={setPreviewOpen}>
        <SheetContent side="right" className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Application Preview</SheetTitle>
            <SheetDescription>This is what artists will see when applying</SheetDescription>
          </SheetHeader>

          <div className="mt-6 space-y-6">
            <div className="p-4 bg-gray-50 rounded-xl space-y-2">
              <h4 className="font-medium text-gray-900">{title || "Opportunity Title"}</h4>
              <p className="text-sm text-gray-600">{description || "Description not provided"}</p>
            </div>

            {(requestPhotos || requestVideos) && (
              <div className="space-y-4">
                <h5 className="text-sm font-medium text-gray-700">Required Media</h5>

                {requestPhotos && (
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-700">Photos</Label>
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center">
                      <p className="text-sm text-gray-500">{photoHelper || "Upload your photos"}</p>
                    </div>
                  </div>
                )}

                {requestVideos && (
                  <div className="space-y-2">
                    <Label className="text-sm text-gray-700">Video Links</Label>
                    <Input placeholder={videoHelper || "Paste video URL"} className="rounded-xl" />
                  </div>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label className="text-sm text-gray-700">Cover Letter</Label>
              <Textarea placeholder="Why are you a good fit for this role?" rows={4} className="rounded-xl" />
            </div>

            <Button className="w-full rounded-xl bg-gray-900 hover:bg-gray-800">Submit Application</Button>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}
