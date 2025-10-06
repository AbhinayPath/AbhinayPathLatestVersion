"use client"

import type React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

const Navbar: React.FC = () => {
  const { pathname } = useRouter()
  const navItems = [
    { name: "Home", href: "/" },
    { name: "Auditions", href: "/auditions" },
    { name: "Workshops", href: "/workshops" },
    { name: "Artists", href: "/artists" },
    { name: "About", href: "/about" },
    { name: "Join", href: "/join-community" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <nav>
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={`text-base font-medium transition-colors hover:text-[#7E1F2E] hover:font-medium ${
                pathname === item.href ? "text-[#7E1F2E] font-medium" : ""
              }`}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
