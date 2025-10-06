"use client"

import { useState } from "react"
import Link from "next/link"
import { Sheet } from "components/sheet"
import { Button } from "components/button"

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Join", href: "/join-community" },
    { name: "Post", href: "/post-opportunity" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav className="bg-background px-4 py-3">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link href="/" className="text-foreground font-bold text-lg">
            Logo
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-foreground/80 hover:text-foreground transition-colors font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <Button onClick={() => setMobileMenuOpen(true)} className="md:hidden">
          Menu
        </Button>
      </div>
      <Sheet isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)}>
        <div className="p-4">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="block px-4 py-3 text-base font-medium hover:bg-primary/5 transition-colors rounded-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </Sheet>
    </nav>
  )
}

export default Navbar
