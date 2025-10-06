import type React from "react"
import Link from "next/link"

const Navbar: React.FC = () => {
  const navItems = [
    { label: "Home", href: "/" },
    { label: "Auditions", href: "/auditions" },
    { label: "Workshops", href: "/workshops" },
    { label: "Networking", href: "/networking" },
    { label: "Recruitment", href: "/recruitment" },
    { label: "Artists", href: "/artists" }, // Added this line
    { label: "Resources", href: "/resources" },
    { label: "Admissions", href: "/admissions" },
  ]

  return (
    <nav>
      <ul>
        {navItems.map((item, index) => (
          <li key={index}>
            <Link href={item.href}>
              <a>{item.label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Navbar
