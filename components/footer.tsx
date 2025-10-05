import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-r from-[#2D1A54] via-[#4A2A82] to-[#2D1A54] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo.png"
                alt="Abhinayपथ Logo"
                width={40}
                height={40}
                className="h-10 w-auto brightness-0 invert"
              />
              <span className="text-2xl font-bold font-playfair">Abhinayपथ</span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed">
              India's premier platform for discovering auditions, workshops, and career opportunities in theatre, film,
              and web series.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5A623] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5A623] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://instagram.com/abhinaypath"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5A623] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5A623] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F5A623] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/auditions" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  Auditions
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  Workshops
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  Institute Prep
                </Link>
              </li>
              <li>
                <Link href="/recruitment" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  Jobs & Opportunities
                </Link>
              </li>
              <li>
                <Link href="/networking" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">About</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/join-community" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  Join Beta
                </Link>
              </li>
              <li>
                <Link href="/talent-directory" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  Talent Directory
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-gray-300 hover:text-[#F5A623] transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm text-gray-300">
                <Mail className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="mailto:hello@abhinaypath.com" className="hover:text-[#F5A623] transition-colors">
                  hello@abhinaypath.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-300">
                <Phone className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <a href="tel:+919876543210" className="hover:text-[#F5A623] transition-colors">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm text-gray-300">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-300">
            &copy; {currentYear} Abhinayपथ. All rights reserved. | Empowering artists across India.
          </p>
        </div>
      </div>
    </footer>
  )
}
