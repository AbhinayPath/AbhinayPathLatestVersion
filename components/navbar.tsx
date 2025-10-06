"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Menu, X, LogOut, Edit, Plus, Briefcase, Sparkles } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import RegisterModal from "@/components/RegisterModal"
import LoginModal from "@/components/LoginModal"
import { NavbarProfilePercentage } from "@/components/navbar-profile-percentage"
import { cn } from "@/lib/utils"

export default function Navbar() {
  // TODO: Replace this mockProfileData with real profile data from context/store/API
  const mockProfileData = {
    profile: {
      full_name: "Demo User",
      email: "demo@user.com",
      city: "Mumbai",
      state: "Maharashtra",
      bio: "Actor",
      acting_skills: ["Acting"],
      languages: ["Hindi"],
      experience_level: "Beginner" as const,
    },
    education: [{ institution: "NSD", degree: "BFA" }],
    experience: [{ project_title: "Movie" }],
    training: [{ workshop_name: "Workshop" }],
    headshots: [],
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { user, loading, signOut } = useAuth()

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

  const handlePostOpportunity = () => {
    setDropdownOpen(false)
    router.push("/post-opportunity")
  }

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Join", href: "/join-community" },
    { name: "Contact", href: "/contact" },
  ]

  const isActiveRoute = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 flex-shrink-0">
          <div className="relative h-10 w-10">
            <Image
              src="/images/logo.png"
              alt="Abhinayपथ Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
          <span className="font-playfair text-xl sm:text-2xl font-bold text-[#7E1F2E]">Abhinayपथ</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "text-base font-medium transition-colors hover:text-[#7E1F2E] relative group",
                isActiveRoute(item.href) ? "text-[#7E1F2E] font-semibold" : "text-gray-700",
              )}
            >
              {item.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7E1F2E] transition-all duration-300 group-hover:w-full",
                  isActiveRoute(item.href) && "w-full",
                )}
              />
            </Link>
          ))}

          {/* Post Opportunity Button - Prominent in Main Nav */}
          {user && (
            <Link href="/post-opportunity">
              <Button
                size="sm"
                className={cn(
                  "rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md transition-all hover:shadow-lg hover:scale-105 font-medium px-4 py-2",
                  pathname === "/post-opportunity" && "ring-2 ring-purple-400 ring-offset-2 shadow-xl scale-105",
                )}
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Post Opportunity
                {pathname === "/post-opportunity" && <Sparkles className="h-3 w-3 ml-1.5 animate-pulse" />}
              </Button>
            </Link>
          )}
        </nav>

        {/* Auth Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-4">
          {user ? (
            <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
              <DropdownMenuTrigger asChild>
                <div className="cursor-pointer">
                  <NavbarProfilePercentage profileData={mockProfileData} user={user} />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64">
                <div className="px-3 py-2 border-b">
                  <p className="text-sm font-medium">{user.email}</p>
                  <p className="text-xs text-gray-500">Manage your account</p>
                </div>

                <DropdownMenuItem onClick={handleEditProfile} className="cursor-pointer py-3">
                  <Edit className="mr-2 h-4 w-4" />
                  <div>
                    <p className="font-medium">Edit Profile</p>
                    <p className="text-xs text-gray-500">Update your talent profile</p>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handlePostOpportunity}
                  className="cursor-pointer py-3 text-purple-600 focus:text-purple-700 focus:bg-purple-50"
                >
                  <Briefcase className="mr-2 h-4 w-4" />
                  <div>
                    <p className="font-medium">Post Opportunity</p>
                    <p className="text-xs text-purple-600/70">Share with community</p>
                  </div>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer py-3 text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span className="font-medium">Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Button
                variant="ghost"
                onClick={() => setShowLoginModal(true)}
                className="text-[#7E1F2E] hover:text-[#6a1a27] hover:bg-[#7E1F2E]/10 font-medium"
              >
                Login
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowRegisterModal(true)}
                className="rounded-full border-[#7E1F2E] text-[#7E1F2E] hover:bg-[#7E1F2E] hover:text-white font-medium"
              >
                Register
              </Button>
              <Link href="/join-community">
                <Button
                  size="default"
                  className="rounded-full bg-[#7E1F2E] hover:bg-[#6a1a27] text-white px-4 py-2 h-auto text-sm font-medium transition-transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Join Beta Community
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <X className="h-6 w-6 text-gray-700" /> : <Menu className="h-6 w-6 text-gray-700" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t bg-white">
          <div className="container py-4 flex flex-col gap-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* Post Opportunity - Prominent at Top for Mobile */}
            {user && (
              <div className="mb-2">
                <Link href="/post-opportunity" onClick={toggleMenu}>
                  <Button
                    className={cn(
                      "w-full rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-md transition-all hover:shadow-lg h-14 text-base font-semibold",
                      pathname === "/post-opportunity" && "ring-2 ring-purple-400 ring-offset-2",
                    )}
                  >
                    <Plus className="mr-2 h-5 w-5" />
                    Post Opportunity
                    {pathname === "/post-opportunity" && <Sparkles className="ml-2 h-4 w-4 animate-pulse" />}
                  </Button>
                </Link>
                <p className="text-xs text-gray-500 text-center mt-2">Share opportunities with the community</p>
              </div>
            )}

            {/* Navigation Links */}
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-all",
                    isActiveRoute(item.href)
                      ? "text-[#7E1F2E] bg-[#7E1F2E]/10 font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#7E1F2E]",
                  )}
                  onClick={toggleMenu}
                >
                  <div className="flex items-center justify-between">
                    {item.name}
                    {isActiveRoute(item.href) && <div className="h-2 w-2 rounded-full bg-[#7E1F2E] animate-pulse" />}
                  </div>
                </Link>
              ))}
            </div>

            {/* Auth Section */}
            <div className="pt-4 border-t mt-2">
              {user ? (
                <div className="space-y-2">
                  <div className="px-4 py-2 bg-gray-50 rounded-lg mb-3">
                    <p className="text-sm font-medium text-gray-900">{user.email}</p>
                    <p className="text-xs text-gray-500">Logged in</p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push("/talent-profile")
                      toggleMenu()
                    }}
                    className="w-full justify-start h-12 text-left font-medium"
                  >
                    <Edit className="mr-3 h-5 w-5" />
                    Edit Talent Profile
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      handleLogout()
                      toggleMenu()
                    }}
                    className="w-full justify-start h-12 text-left font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="mr-3 h-5 w-5" />
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
                    className="w-full h-12 text-base font-medium border-[#7E1F2E] text-[#7E1F2E] hover:bg-[#7E1F2E] hover:text-white"
                  >
                    Login
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowRegisterModal(true)
                      toggleMenu()
                    }}
                    className="w-full h-12 text-base font-medium"
                  >
                    Register
                  </Button>
                  <Link href="/join-community" onClick={toggleMenu}>
                    <Button className="w-full rounded-xl bg-[#7E1F2E] hover:bg-[#6a1a27] text-white h-14 text-base font-semibold shadow-md hover:shadow-lg">
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
      <RegisterModal isOpen={showRegisterModal} onClose={() => setShowRegisterModal(false)} mode="register" />

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
    </header>
  )
}
