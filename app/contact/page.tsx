"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Mail,
  Instagram,
  Linkedin,
  Send,
  CheckCircle,
  AlertCircle,
  MessageSquare,
  Phone,
  Clock,
  Globe,
} from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
  console.log("SUPABASE ANON KEY:", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
  console.log("SUPABASE SERVICE ROLE KEY:", process.env.SUPABASE_SERVICE_ROLE_KEY);
  
  console.log("SUPABASE api ROLE KEY:", `${process.env.NEXT_PUBLIC_BASE_URL}/api/auditions`);

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({})

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit form")
      }

      setSubmitStatus({
        success: true,
        message: "Your message has been sent successfully! We will get back to you soon.",
      })

      // Reset form on success
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitStatus({
        success: false,
        message: error instanceof Error ? error.message : "Something went wrong. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12 md:py-20">
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-4 text-gradient">
            <MessageSquare className="inline-block mr-3 h-8 w-8 mb-1" />
            Contact Us
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2D1A54] to-[#7E1F2E] mx-auto mb-4"></div>
          <p className="text-lg text-gray-800 max-w-2xl mx-auto">
            Have questions or want to connect with us? We'd love to hear from you!
          </p>
        </div>

        {submitStatus.message && (
          <Alert
            className={`mb-8 ${submitStatus.success ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}
          >
            {submitStatus.success ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>{submitStatus.success ? "Success!" : "Error!"}</AlertTitle>
            <AlertDescription>{submitStatus.message}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <div className="flex items-center mb-6">
              <Send className="h-5 w-5 text-primary mr-2" />
              <h2 className="font-playfair text-2xl font-bold">Send a Message</h2>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium flex items-center text-gray-800">
                  <span className="bg-gray-100 p-1.5 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                      <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                  </span>
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  className="rounded-lg border-gray-300 focus:border-[#2D1A54] focus:ring-[#2D1A54]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium flex items-center text-gray-800">
                  <span className="bg-gray-100 p-1.5 rounded-full mr-2">
                    <Mail className="h-3.5 w-3.5" />
                  </span>
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="rounded-lg border-gray-300 focus:border-[#2D1A54] focus:ring-[#2D1A54]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium flex items-center text-gray-800">
                  <span className="bg-gray-100 p-1.5 rounded-full mr-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="m9 18 6-6-6-6"></path>
                    </svg>
                  </span>
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="What is this regarding?"
                  className="rounded-lg border-gray-300 focus:border-[#2D1A54] focus:ring-[#2D1A54]"
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium flex items-center text-gray-800">
                  <span className="bg-gray-100 p-1.5 rounded-full mr-2">
                    <MessageSquare className="h-3.5 w-3.5" />
                  </span>
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your message here..."
                  rows={5}
                  className="rounded-lg border-gray-300 focus:border-[#2D1A54] focus:ring-[#2D1A54]"
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-[#2D1A54] hover:bg-[#231544] text-white py-3 h-auto transition-transform hover:scale-105"
              >
                {isSubmitting ? "Sending..." : "Send Message"} <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          <div>
            <div className="flex items-center mb-6">
              <Phone className="h-5 w-5 text-primary mr-2" />
              <h2 className="font-playfair text-2xl font-bold">Contact Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-4 mb-8">
              <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start">
                    <div className="bg-[#2D1A54] p-4 text-white flex items-center justify-center">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">Email Us</h3>
                      <a href="mailto:abhinaypath@gmail.com" className="text-[#2D1A54] hover:underline">
                        abhinaypath@gmail.com
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start">
                    <div className="bg-[#2D1A54] p-4 text-white flex items-center justify-center">
                      <Instagram className="h-5 w-5" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">Instagram</h3>
                      <a
                        href="https://www.instagram.com/abhinay_path"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2D1A54] hover:underline"
                      >
                        @abhinay_path
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="overflow-hidden border-0 shadow-sm hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="flex items-start">
                    <div className="bg-[#2D1A54] p-4 text-white flex items-center justify-center">
                      <Linkedin className="h-5 w-5" />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-1">LinkedIn</h3>
                      <a
                        href="https://www.linkedin.com/company/abhinaypath"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#2D1A54] hover:underline"
                      >
                        AbhinayPath
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex items-center mb-4">
                <Clock className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-playfair text-xl font-bold">Response Time</h3>
              </div>
              <p className="text-gray-800 mb-4">
                We typically respond to all inquiries within 24-48 hours during business days.
              </p>

              <div className="flex items-center mb-4">
                <Globe className="h-5 w-5 text-primary mr-2" />
                <h3 className="font-playfair text-xl font-bold">Follow Us</h3>
              </div>
              <p className="text-gray-800 mb-4">
                Follow us on social media to stay updated with the latest opportunities and news.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.instagram.com/abhinay_path"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2D1A54] p-2.5 rounded-full text-white hover:bg-[#231544] transition-transform hover:scale-110"
                >
                  <Instagram className="h-4 w-4" />
                </a>
                <a
                  href="https://www.linkedin.com/company/abhinaypath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2D1A54] p-2.5 rounded-full text-white hover:bg-[#231544] transition-transform hover:scale-110"
                >
                  <Linkedin className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
