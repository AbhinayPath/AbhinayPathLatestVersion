import Link from "next/link"

const Navbar = () => {
  const navigationLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Recruitment",
      href: "/recruitment",
    },
    {
      name: "Artists",
      href: "/artists",
    },
    {
      name: "Resources",
      href: "/resources",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ]

  const mobileNavigationLinks = [
    {
      name: "Home",
      href: "/",
    },
    {
      name: "About",
      href: "/about",
    },
    {
      name: "Recruitment",
      href: "/recruitment",
    },
    {
      name: "Artists",
      href: "/artists",
    },
    {
      name: "Resources",
      href: "/resources",
    },
    {
      name: "Contact",
      href: "/contact",
    },
  ]

  return (
    <nav>
      <div>
        {navigationLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            {link.name}
          </Link>
        ))}
      </div>
      <div>
        {mobileNavigationLinks.map((link) => (
          <Link key={link.name} href={link.href}>
            {link.name}
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar
