"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Menu, X, User, LogOut, Edit } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import RegisterModal from "@/components/RegisterModal"
import LoginModal from "@/components/LoginModal"
import { NavbarProfilePercentage } from "@/components/navbar-profile-percentage"
import { getProfileCompletion } from "@/components/profileCompletionUtils"

export default function Navbar() {
  // TODO: Replace this mockProfileData with real profile data from context/store/API
  const mockProfileData = {
    profile: {
      full_name: 'Demo User',
      email: 'demo@user.com',
      city: 'Mumbai',
      state: 'Maharashtra',
      bio: 'Actor',
      acting_skills: ['Acting'],
      languages: ['Hindi'],
      experience_level: 'Beginner' as 'Beginner',
    },
    education: [{ institution: 'NSD', degree: 'BFA' }],
    experience: [{ project_title: 'Movie' }],
    training: [{ workshop_name: 'Workshop' }],
    headshots: [],
  };

  debugger

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, signOut } = useAuth()




  console.log("user", user, "loading", loading)
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const handleLogout = async () => {
    setDropdownOpen(false)
    await signOut()
  }

  const handleEditProfile = () => {
    setDropdownOpen(false)
    router.push("/talent-profile")
  }

  type NavItem = { name: string; href: string };

  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Join", href: "/join-community" },
    { name: "Contact", href: "/contact" },
  ];

  // Add Dashboard for casting directors

  const navItemsWithDashboard: NavItem[] =
    user && user.user_metadata?.profession?.toLowerCase() === "director"
      ? [
          ...navItems,
          { name: "Dashboard", href: "/casting" },
        ]
      : navItems;

        console.log("navItemsWithDashboard",navItemsWithDashboard)


  const getUserInitial = () => {
    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name.charAt(0).toUpperCase()
    }
    return user?.email?.charAt(0).toUpperCase() || "U"
  }

  debugger
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <Image src="/images/logo.png" alt="AbhinayPath Logo" width={40} height={40} className="object-contain" />
          </div>
          <span className="font-playfair text-2xl font-bold text-[#7E1F2E]">AbhinayPath</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navItemsWithDashboard.map((item: NavItem) => (
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
          <>
            {user ? (
              <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                <DropdownMenuTrigger asChild>
                  <div className="cursor-pointer">
                    {/* TODO: Replace mockProfileData with real data from context/store/API */}
                    <NavbarProfilePercentage profileData={mockProfileData} user={user} />
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleEditProfile}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Talent Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={() => setShowLoginModal(true)}
                  className="text-[#7E1F2E] hover:text-[#6a1a27]"
                >
                  Login
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRegisterModal(true)}
                  className="rounded-full"
                >
                  Register
                </Button>
                <Link href="/join-community">
                  <Button
                    size="default"
                    className="rounded-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white px-4 py-2 h-auto text-sm font-medium transition-transform hover:scale-105"
                  >
                    Join Beta Community
                  </Button>
                </Link>
              </>
            )}
          </>
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
              {user ? (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push('/talent-profile')
                      toggleMenu()
                    }}
                    className="w-full"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit Talent Profile
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogout()
                      toggleMenu()
                    }}
                    className="w-full"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowLoginModal(true)
                      toggleMenu()
                    }}
                    className="w-full"
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowRegisterModal(true)
                      toggleMenu()
                    }}
                    className="w-full"
                  >
                    Register
                  </Button>
                  <Link href="/join-community" onClick={toggleMenu}>
                    <Button className="w-full rounded-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white py-5 h-auto text-base">
                      Join Beta Community
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <RegisterModal
        isOpen={showRegisterModal}
        onClose={() => setShowRegisterModal(false)}
        mode="register"
      />

      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </header>
  )
}
