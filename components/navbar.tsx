"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet } from "components/sheet"
import { Button } from "components/button"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-background px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-foreground font-bold text-lg">
            Logo
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/about" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
            About
          </Link>
          <Link href="/services" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
            Services
          </Link>
          <Link href="/recruitment" className="text-foreground/80 hover:text-foreground transition-colors font-medium">
            Recruitment
          </Link>
          <Link
            href="/post-opportunity"
            className="text-foreground/80 hover:text-foreground transition-colors font-medium"
          >
            Post Opportunity
          </Link>
        </div>
        <Button onClick={() => setMobileMenuOpen(true)} className="md:hidden">
          Menu
        </Button>
      </div>
      <Sheet isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="p-4">
          <Link
            href="/about"
            className="block px-4 py-3 text-base font-medium hover:bg-primary/5 transition-colors rounded-lg"
          >
            About
          </Link>
          <Link
            href="/services"
            className="block px-4 py-3 text-base font-medium hover:bg-primary/5 transition-colors rounded-lg"
          >
            Services
          </Link>
          <Link
            href="/recruitment"
            className="block px-4 py-3 text-base font-medium hover:bg-primary/5 transition-colors rounded-lg"
          >
            Recruitment
          </Link>
          <Link
            href="/post-opportunity"
            className="block px-4 py-3 text-base font-medium hover:bg-primary/5 transition-colors rounded-lg"
            onClick={() => setMobileMenuOpen(false)}
          >
            Post Opportunity
          </Link>
        </div>
      </Sheet>
    </nav>
  )
}

export default Navbar
