import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Instagram, Linkedin, Send } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container py-16 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12 text-center">
          <h1 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-gradient">Contact Us</h1>
          <div className="w-24 h-1 bg-gradient-to-r from-[#2D1A54] to-[#7E1F2E] mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions or want to connect with us? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h2 className="font-playfair text-2xl font-bold mb-6">Get In Touch</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Your Name
                </label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  className="rounded-lg border-gray-300 focus:border-[#2D1A54] focus:ring-[#2D1A54]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="rounded-lg border-gray-300 focus:border-[#2D1A54] focus:ring-[#2D1A54]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <Input
                  id="subject"
                  placeholder="What is this regarding?"
                  className="rounded-lg border-gray-300 focus:border-[#2D1A54] focus:ring-[#2D1A54]"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <Textarea
                  id="message"
                  placeholder="Your message here..."
                  rows={5}
                  className="rounded-lg border-gray-300 focus:border-[#2D1A54] focus:ring-[#2D1A54]"
                />
              </div>
              <Button
                type="submit"
                className="w-full rounded-lg bg-[#2D1A54] hover:bg-[#231544] text-white py-3 h-auto transition-transform hover:scale-105"
              >
                Send Message <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>

          <div>
            <h2 className="font-playfair text-2xl font-bold mb-6">Contact Information</h2>
            <div className="bg-[#2D1A54]/5 p-8 rounded-xl space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#2D1A54] p-3 rounded-full text-white">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email</h3>
                  <a href="mailto:abhinaypath@gmail.com" className="text-[#2D1A54] hover:underline">
                    abhinaypath@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-[#2D1A54] p-3 rounded-full text-white">
                  <Instagram className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Instagram</h3>
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

              <div className="flex items-start gap-4">
                <div className="bg-[#2D1A54] p-3 rounded-full text-white">
                  <Linkedin className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">LinkedIn</h3>
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
            </div>

            <div className="mt-8">
              <h2 className="font-playfair text-2xl font-bold mb-6">Connect With Us</h2>
              <p className="text-gray-600 mb-4">
                Follow us on social media to stay updated with the latest opportunities and news.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/abhinay_path"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2D1A54] p-3 rounded-full text-white hover:bg-[#231544] transition-transform hover:scale-110"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.linkedin.com/company/abhinaypath"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#2D1A54] p-3 rounded-full text-white hover:bg-[#231544] transition-transform hover:scale-110"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
