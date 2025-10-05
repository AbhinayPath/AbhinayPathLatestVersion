import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/abhinaypath-logo.png"
                alt="Abhinayपथ Logo"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
              <span className="text-xl font-bold text-primary">Abhinayपथ</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              India's premier platform connecting creative artists with opportunities across theatre, film, and web.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link
                href="https://www.instagram.com/abhinaypath/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary"
              >
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Youtube className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Opportunities */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Opportunities</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/auditions" className="text-muted-foreground hover:text-primary">
                  Auditions & Casting
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="text-muted-foreground hover:text-primary">
                  Workshops & Training
                </Link>
              </li>
              <li>
                <Link href="/recruitment" className="text-muted-foreground hover:text-primary">
                  Jobs & Internships
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="text-muted-foreground hover:text-primary">
                  Institute Prep
                </Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Community</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/networking" className="text-muted-foreground hover:text-primary">
                  Networking Events
                </Link>
              </li>
              <li>
                <Link href="/talent-directory" className="text-muted-foreground hover:text-primary">
                  Talent Directory
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-muted-foreground hover:text-primary">
                  Resources & Articles
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="mb-4 text-sm font-semibold">Support</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Abhinayपथ. All rights reserved.</p>
          <p className="mt-2">
            Made with ❤️ for the creative community of India | Generated by{" "}
            <a
              href="https://v0.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-primary hover:underline"
            >
              v0.dev
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
