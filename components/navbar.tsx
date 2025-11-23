"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const pathname = usePathname()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const navItems = [
    { name: "Events", href: "/events" },
    { name: "Theatre Artists", href: "/theatre-artists" },
    { name: "Production & Backstage", href: "/production-backstage" },
    { name: "Mentorship", href: "/admissions" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image src="/images/logo.png" alt="AbhinayPath Logo" width={40} height={40} className="object-contain" />
          </div>
          <span className="font-playfair text-2xl font-bold text-[#7E1F2E]">Abhinayपथ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-base font-medium transition-colors hover:text-[#7E1F2E] hover:font-medium ${
                pathname === item.href ? "text-[#7E1F2E] font-medium" : ""
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          <Link href="/join-community">
            <Button
              size="default"
              className="rounded-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white px-4 py-2 h-auto text-sm font-medium transition-transform hover:scale-105"
            >
              Join Beta Community
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="lg:hidden" onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t">
          <div className="container py-4 flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-3 py-2 text-base font-medium rounded-md transition-colors hover:bg-gray-100 hover:text-[#7E1F2E] ${
                  pathname === item.href ? "text-[#7E1F2E] bg-gray-50" : ""
                }`}
                onClick={toggleMenu}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 border-t mt-2">
              <Link href="/join-community" onClick={toggleMenu}>
                <Button className="w-full rounded-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white py-5 h-auto text-base">
                  Join Abhinayपथ Community
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
