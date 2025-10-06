import Link from "next/link"
import Image from "next/image"
import { Instagram, Linkedin, PhoneIcon as WhatsApp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
  return (
    <footer className="bg-[#2D1A54] text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative h-10 w-10 bg-white rounded-md p-1">
                <Image
                  src="/images/logo.png"
                  alt="AbhinayPath Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </div>
              <span className="font-playfair text-xl font-bold">AbhinayPath</span>
            </Link>
            <p className="text-sm text-white">
              India's creative platform to discover auditions, workshops & prep support — across theatre, film & web.
            </p>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-white hover:text-white hover:underline transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-white hover:text-white hover:underline transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/join-community"
                  className="text-sm text-white hover:text-white hover:underline transition-colors"
                >
                  Join
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-white hover:text-white hover:underline transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-bold mb-4">Coming Soon</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-sm text-white">Networking Platform</span>
              </li>
              <li>
                <span className="text-sm text-white">Backstage Opportunities</span>
              </li>
              <li>
                <span className="text-sm text-white">Resources Library</span>
              </li>
              <li>
                <span className="text-sm text-white">Artist Profiles</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-playfair text-lg font-bold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/abhinay_path"
                className="text-white hover:text-white hover:opacity-80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="https://chat.whatsapp.com/FNMVzWZsM6K3bt4DJZzvUp"
                className="text-white hover:text-white hover:opacity-80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsApp className="h-5 w-5" />
                <span className="sr-only">WhatsApp</span>
              </a>
              <a
                href="https://www.linkedin.com/company/abhinaypath"
                className="text-white hover:text-white hover:opacity-80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
            <div className="mt-4">
              <p className="text-sm text-white">Subscribe to our newsletter</p>
              <form className="mt-2 flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="w-full rounded-l-full px-4 py-2 text-sm text-black focus:outline-none"
                />
                <Button
                  type="submit"
                  className="rounded-r-full bg-[#7E1F2E] px-4 py-2 text-sm font-medium text-white hover:bg-[#6a1a27]"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-8 text-center">
          <p className="text-sm text-white">&copy; {new Date().getFullYear()} AbhinayPath. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
