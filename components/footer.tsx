import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Linkedin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/images/logo.png" alt="Abhinayपथ Logo" width={32} height={32} className="h-8 w-8" />
              <span className="text-xl font-bold text-primary font-playfair">Abhinayपथ</span>
            </div>
            <p className="text-sm text-gray-600">
              Your gateway to the world of performing arts. Discover auditions, workshops, and networking opportunities.
            </p>
            <div className="flex space-x-4">
              <Link
                href="https://www.facebook.com/profile.php?id=61571315176429"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/abhinay.path/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-primary transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="https://twitter.com" className="text-gray-600 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="https://linkedin.com" className="text-gray-600 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="https://youtube.com" className="text-gray-600 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auditions" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Auditions
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/networking" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Networking
                </Link>
              </li>
              <li>
                <Link href="/recruitment" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Recruitment
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-gray-600 hover:text-primary transition-colors">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} Abhinayपथ. All rights reserved.</p>
          <p className="text-xs text-gray-500 mt-2">
            Privacy & Attribution Notice: Some images used on this website are sourced from publicly available resources
            and are the property of their respective owners. We respect all intellectual property rights and will
            promptly remove any content upon request from the rightful owner. For inquiries, please contact us at{" "}
            <a href="mailto:abhinaypath@gmail.com" className="text-primary hover:underline">
              abhinaypath@gmail.com
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
