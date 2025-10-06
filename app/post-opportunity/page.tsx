"use client"

import Link from "next/link"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import {
  Briefcase,
  MapPin,
  CalendarIcon,
  DollarSign,
  Users,
  FileText,
  Clock,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Eye,
  EyeOff,
  Info,
} from "lucide-react"
import { toast } from "sonner"

type OpportunityType = "audition" | "workshop" | "job" | "networking"

interface FormData {
  // Basic Info
  type: OpportunityType | ""
  title: string
  organization: string
  location: string
  description: string

  // Details
  requirements: string
  deadline: Date | undefined
  startDate: Date | undefined
  endDate: Date | undefined
  compensation: string
  compensationType: string

  // Additional
  applicationUrl: string
  contactEmail: string
  experienceLevel: string
  languages: string[]
  skills: string[]
  isRemote: boolean
  isPaid: boolean
}

const initialFormData: FormData = {
  type: "",
  title: "",
  organization: "",
  location: "",
  description: "",
  requirements: "",
  deadline: undefined,
  startDate: undefined,
  endDate: undefined,
  compensation: "",
  compensationType: "fixed",
  applicationUrl: "",
  contactEmail: "",
  experienceLevel: "",
  languages: [],
  skills: [],
  isRemote: false,
  isPaid: false,
}

const opportunityTypes = [
  { value: "audition", label: "Audition", icon: "🎭" },
  { value: "workshop", label: "Workshop", icon: "📚" },
  { value: "job", label: "Job Opportunity", icon: "💼" },
  { value: "networking", label: "Networking Event", icon: "🤝" },
]

const experienceLevels = ["Beginner", "Intermediate", "Advanced", "Professional", "Any"]

const commonLanguages = ["Hindi", "English", "Tamil", "Telugu", "Marathi", "Bengali", "Kannada", "Malayalam"]

const commonSkills = [
  "Acting",
  "Dancing",
  "Singing",
  "Direction",
  "Screenplay Writing",
  "Cinematography",
  "Editing",
  "Production",
]

export default function PostOpportunityPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<FormData>(initialFormData)
  const [showPreview, setShowPreview] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 3
  const progress = (currentStep / totalSteps) * 100

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleArrayItem = (field: "languages" | "skills", item: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(item) ? prev[field].filter((i) => i !== item) : [...prev[field], item],
    }))
  }

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        if (!formData.type || !formData.title || !formData.organization) {
          toast.error("Please fill in all required fields in Step 1")
          return false
        }
        return true
      case 2:
        if (!formData.description || !formData.requirements) {
          toast.error("Please fill in all required fields in Step 2")
          return false
        }
        return true
      case 3:
        if (!formData.contactEmail) {
          toast.error("Please provide a contact email")
          return false
        }
        return true
      default:
        return true
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1))
  }

  const handleSubmit = async () => {
    if (!validateStep(3)) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSubmitting(false)

    toast.success("Opportunity posted successfully!")
    router.push("/")
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-3">
              <Label htmlFor="type" className="text-sm sm:text-base">
                Opportunity Type <span className="text-red-500">*</span>
              </Label>
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3">
                {opportunityTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => updateFormData("type", type.value)}
                    className={cn(
                      "p-3 sm:p-4 rounded-xl sm:rounded-2xl border-2 transition-all text-left min-h-[80px] sm:min-h-[100px] touch-manipulation",
                      formData.type === type.value
                        ? "border-purple-500 bg-purple-50 shadow-md"
                        : "border-gray-200 hover:border-gray-300 hover:bg-gray-50",
                    )}
                  >
                    <div className="text-2xl sm:text-3xl mb-1 sm:mb-2">{type.icon}</div>
                    <div className="text-xs sm:text-sm font-medium">{type.label}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="title" className="text-sm sm:text-base">
                Opportunity Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="e.g., Lead Role in Theatre Production"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                className="h-11 sm:h-12 text-sm sm:text-base"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="organization" className="text-sm sm:text-base">
                  Organization/Company <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="organization"
                  placeholder="e.g., National School of Drama"
                  value={formData.organization}
                  onChange={(e) => updateFormData("organization", e.target.value)}
                  className="h-11 sm:h-12 text-sm sm:text-base"
                />
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="location" className="text-sm sm:text-base">
                  Location
                </Label>
                <Input
                  id="location"
                  placeholder="e.g., Mumbai, Maharashtra"
                  value={formData.location}
                  onChange={(e) => updateFormData("location", e.target.value)}
                  className="h-11 sm:h-12 text-sm sm:text-base"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 pt-2">
              <Checkbox
                id="isRemote"
                checked={formData.isRemote}
                onCheckedChange={(checked) => updateFormData("isRemote", checked)}
                className="h-5 w-5 sm:h-4 sm:w-4"
              />
              <label
                htmlFor="isRemote"
                className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                This is a remote opportunity
              </label>
            </div>
          </div>
        )

      case 2:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="description" className="text-sm sm:text-base">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Provide a detailed description of the opportunity..."
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                rows={5}
                className="resize-none text-sm sm:text-base min-h-[120px]"
              />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="requirements" className="text-sm sm:text-base">
                Requirements <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="requirements"
                placeholder="List the requirements and qualifications..."
                value={formData.requirements}
                onChange={(e) => updateFormData("requirements", e.target.value)}
                rows={5}
                className="resize-none text-sm sm:text-base min-h-[120px]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm sm:text-base">Application Deadline</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-11 sm:h-12 text-sm sm:text-base",
                        !formData.deadline && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {formData.deadline ? format(formData.deadline, "PPP") : "Pick a date"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.deadline}
                      onSelect={(date) => updateFormData("deadline", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label htmlFor="experienceLevel" className="text-sm sm:text-base">
                  Experience Level
                </Label>
                <Select
                  value={formData.experienceLevel}
                  onValueChange={(value) => updateFormData("experienceLevel", value)}
                >
                  <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    {experienceLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm sm:text-base">Required Languages</Label>
              <div className="flex flex-wrap gap-2">
                {commonLanguages.map((lang) => (
                  <Badge
                    key={lang}
                    variant={formData.languages.includes(lang) ? "default" : "outline"}
                    className="cursor-pointer px-3 py-2 text-xs sm:text-sm touch-manipulation min-h-[36px] sm:min-h-[32px]"
                    onClick={() => toggleArrayItem("languages", lang)}
                  >
                    {lang}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <Label className="text-sm sm:text-base">Required Skills</Label>
              <div className="flex flex-wrap gap-2">
                {commonSkills.map((skill) => (
                  <Badge
                    key={skill}
                    variant={formData.skills.includes(skill) ? "default" : "outline"}
                    className="cursor-pointer px-3 py-2 text-xs sm:text-sm touch-manipulation min-h-[36px] sm:min-h-[32px]"
                    onClick={() => toggleArrayItem("skills", skill)}
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm sm:text-base">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-11 sm:h-12 text-sm sm:text-base",
                        !formData.startDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {formData.startDate ? format(formData.startDate, "PPP") : "Pick a date"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.startDate}
                      onSelect={(date) => updateFormData("startDate", date)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2 sm:space-y-3">
                <Label className="text-sm sm:text-base">End Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal h-11 sm:h-12 text-sm sm:text-base",
                        !formData.endDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4 flex-shrink-0" />
                      <span className="truncate">
                        {formData.endDate ? format(formData.endDate, "PPP") : "Pick a date"}
                      </span>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.endDate}
                      onSelect={(date) => updateFormData("endDate", date)}
                      initialFocus
                      disabled={(date) => (formData.startDate ? date < formData.startDate : false)}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isPaid"
                  checked={formData.isPaid}
                  onCheckedChange={(checked) => updateFormData("isPaid", checked)}
                  className="h-5 w-5 sm:h-4 sm:w-4"
                />
                <label
                  htmlFor="isPaid"
                  className="text-sm sm:text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  This is a paid opportunity
                </label>
              </div>

              {formData.isPaid && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 pl-0 sm:pl-6">
                  <div className="space-y-2 sm:space-y-3">
                    <Label htmlFor="compensation" className="text-sm sm:text-base">
                      Compensation Amount
                    </Label>
                    <Input
                      id="compensation"
                      placeholder="e.g., 50000"
                      value={formData.compensation}
                      onChange={(e) => updateFormData("compensation", e.target.value)}
                      className="h-11 sm:h-12 text-sm sm:text-base"
                    />
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    <Label htmlFor="compensationType" className="text-sm sm:text-base">
                      Payment Type
                    </Label>
                    <Select
                      value={formData.compensationType}
                      onValueChange={(value) => updateFormData("compensationType", value)}
                    >
                      <SelectTrigger className="h-11 sm:h-12 text-sm sm:text-base">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                        <SelectItem value="daily">Daily Rate</SelectItem>
                        <SelectItem value="monthly">Monthly Salary</SelectItem>
                        <SelectItem value="project">Project-based</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="applicationUrl" className="text-sm sm:text-base">
                Application URL
              </Label>
              <Input
                id="applicationUrl"
                type="url"
                placeholder="https://..."
                value={formData.applicationUrl}
                onChange={(e) => updateFormData("applicationUrl", e.target.value)}
                className="h-11 sm:h-12 text-sm sm:text-base"
              />
            </div>

            <div className="space-y-2 sm:space-y-3">
              <Label htmlFor="contactEmail" className="text-sm sm:text-base">
                Contact Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="contact@example.com"
                value={formData.contactEmail}
                onChange={(e) => updateFormData("contactEmail", e.target.value)}
                className="h-11 sm:h-12 text-sm sm:text-base"
              />
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const renderPreview = () => {
    const typeInfo = opportunityTypes.find((t) => t.value === formData.type)

    return (
      <Card className="border-2 shadow-lg">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="secondary" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
                  {typeInfo?.icon} {typeInfo?.label}
                </Badge>
                {formData.isPaid && (
                  <Badge variant="default" className="bg-green-500 text-xs sm:text-sm px-2 sm:px-3 py-1">
                    💰 Paid
                  </Badge>
                )}
                {formData.isRemote && (
                  <Badge variant="outline" className="text-xs sm:text-sm px-2 sm:px-3 py-1">
                    🌐 Remote
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl sm:text-2xl mb-2 break-words">
                {formData.title || "Untitled Opportunity"}
              </CardTitle>
              <CardDescription className="text-sm sm:text-base break-words">
                {formData.organization && (
                  <span className="block">
                    <Briefcase className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    {formData.organization}
                  </span>
                )}
                {formData.location && (
                  <span className="block mt-1">
                    <MapPin className="inline h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                    {formData.location}
                  </span>
                )}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
          {formData.description && (
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base flex items-center gap-2">
                <FileText className="h-4 w-4 flex-shrink-0" />
                Description
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-wrap break-words">{formData.description}</p>
            </div>
          )}

          {formData.requirements && (
            <div>
              <h3 className="font-semibold mb-2 text-sm sm:text-base flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                Requirements
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 whitespace-pre-wrap break-words">
                {formData.requirements}
              </p>
            </div>
          )}

          {(formData.languages.length > 0 || formData.skills.length > 0) && (
            <div className="space-y-3">
              {formData.languages.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 text-xs sm:text-sm">Languages</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {formData.languages.map((lang) => (
                      <Badge key={lang} variant="outline" className="text-xs px-2 py-1">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {formData.skills.length > 0 && (
                <div>
                  <h4 className="font-medium mb-2 text-xs sm:text-sm">Skills</h4>
                  <div className="flex flex-wrap gap-1.5 sm:gap-2">
                    {formData.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs px-2 py-1">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4 border-t">
            {formData.deadline && (
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Clock className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 text-xs">Deadline</div>
                  <div className="font-medium">{format(formData.deadline, "PPP")}</div>
                </div>
              </div>
            )}

            {formData.experienceLevel && (
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Users className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 text-xs">Experience</div>
                  <div className="font-medium">{formData.experienceLevel}</div>
                </div>
              </div>
            )}

            {formData.isPaid && formData.compensation && (
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <DollarSign className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <div>
                  <div className="text-gray-500 text-xs">Compensation</div>
                  <div className="font-medium">₹{formData.compensation}</div>
                </div>
              </div>
            )}

            {formData.contactEmail && (
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <Info className="h-4 w-4 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-gray-500 text-xs">Contact</div>
                  <div className="font-medium truncate">{formData.contactEmail}</div>
                </div>
              </div>
            )}
          </div>

          {formData.applicationUrl && (
            <Button className="w-full mt-4 h-11 sm:h-12 text-sm sm:text-base touch-manipulation" asChild>
              <a href={formData.applicationUrl} target="_blank" rel="noopener noreferrer">
                Apply Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 py-4 sm:py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="mb-4 text-sm sm:text-base h-10 sm:h-auto px-3 sm:px-4 touch-manipulation"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Post an Opportunity</h1>
          <p className="text-sm sm:text-base text-gray-600">Share opportunities with the theatre community</p>
        </div>

        {/* Progress Bar */}
        <Card className="mb-6 sm:mb-8 shadow-md">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <h2 className="text-base sm:text-lg font-semibold">
                  Step {currentStep} of {totalSteps}
                </h2>
                <span className="text-xs sm:text-sm text-gray-500">
                  {currentStep === 1 && "Basic Information"}
                  {currentStep === 2 && "Details & Requirements"}
                  {currentStep === 3 && "Additional Information"}
                </span>
              </div>
              <Progress value={progress} className="h-2 sm:h-3" />
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 sm:gap-8">
          {/* Form Section */}
          <div className={cn("lg:col-span-3", showPreview && "hidden lg:block")}>
            <Card className="shadow-lg">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="text-lg sm:text-xl">
                  {currentStep === 1 && "Basic Information"}
                  {currentStep === 2 && "Details & Requirements"}
                  {currentStep === 3 && "Additional Information"}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  {currentStep === 1 && "Start by selecting the type of opportunity and providing basic details"}
                  {currentStep === 2 && "Add a detailed description and specify requirements"}
                  {currentStep === 3 && "Add dates, compensation, and contact information"}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-4 sm:p-6">{renderStepContent()}</CardContent>
            </Card>

            {/* Navigation Buttons */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex-1 h-12 sm:h-11 text-sm sm:text-base touch-manipulation order-2 sm:order-1 bg-transparent"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Previous
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  className="flex-1 h-12 sm:h-11 text-sm sm:text-base touch-manipulation order-1 sm:order-2"
                >
                  Next
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-12 sm:h-11 text-sm sm:text-base touch-manipulation order-1 sm:order-2"
                >
                  {isSubmitting ? "Publishing..." : "Publish Opportunity"}
                  {!isSubmitting && <CheckCircle2 className="ml-2 h-4 w-4" />}
                </Button>
              )}
            </div>

            {/* Mobile Preview Toggle */}
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="w-full mt-3 lg:hidden h-12 text-sm touch-manipulation"
            >
              {showPreview ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  Back to Form
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </>
              )}
            </Button>
          </div>

          {/* Preview Section */}
          <div className={cn("lg:col-span-2", !showPreview && "hidden lg:block")}>
            <div className="lg:sticky lg:top-20">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base sm:text-lg font-semibold">Live Preview</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPreview(false)}
                  className="lg:hidden h-10 px-3 touch-manipulation"
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Form
                </Button>
              </div>
              {renderPreview()}
            </div>
          </div>
        </div>

        {/* Footer - Mobile Optimized */}
        <footer className="mt-12 sm:mt-16 text-center text-xs sm:text-sm text-gray-600 space-y-2 px-4">
          <p>© Abhinayपथ • Minimal form, maximal clarity.</p>
          <div className="flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <Link href="/privacy" className="hover:text-purple-600 transition-colors touch-manipulation">
              Privacy Policy
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/terms" className="hover:text-purple-600 transition-colors touch-manipulation">
              Terms
            </Link>
            <span className="hidden sm:inline">•</span>
            <Link href="/report" className="hover:text-purple-600 transition-colors touch-manipulation">
              Report Misuse
            </Link>
          </div>
        </footer>
      </div>
    </div>
  )
}
