"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useAuth } from "@/contexts/AuthContext"
import { LoginModal } from "./LoginModal"
import { RegisterModal } from "./RegisterModal"
import { NavbarProfilePercentage } from "./navbar-profile-percentage"

export default function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [showLogin, setShowLogin] = React.useState(false)
  const [showRegister, setShowRegister] = React.useState(false)
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }

  return (
    <>
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
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

            {/* Desktop Navigation */}
            <div className="hidden items-center space-x-6 md:flex">
              <Link href="/auditions" className="text-sm font-medium transition-colors hover:text-primary">
                Auditions
              </Link>
              <Link href="/workshops" className="text-sm font-medium transition-colors hover:text-primary">
                Workshops
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-sm font-medium transition-colors hover:text-primary">
                  Resources <ChevronDown className="ml-1 h-4 w-4" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem asChild>
                    <Link href="/admissions">Institute Prep</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/recruitment">Jobs & Internships</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/resources">Articles & Guides</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="/networking" className="text-sm font-medium transition-colors hover:text-primary">
                Community
              </Link>
              <Link href="/talent-directory" className="text-sm font-medium transition-colors hover:text-primary">
                Talent Directory
              </Link>
            </div>

            {/* Auth Buttons / User Menu */}
            <div className="hidden items-center space-x-4 md:flex">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      <span className="max-w-[150px] truncate">{user.email}</span>
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{user.email}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.user_metadata?.role === "artist" ? "Artist" : "Director"}
                      </p>
                    </div>
                    <DropdownMenuItem asChild>
                      <Link href="/talent-profile" className="w-full">
                        <User className="mr-2 h-4 w-4" />
                        My Profile
                      </Link>
                    </DropdownMenuItem>
                    <NavbarProfilePercentage />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => setShowLogin(true)}>
                    Login
                  </Button>
                  <Button onClick={() => setShowRegister(true)}>Sign Up</Button>
                </>
              )}
            </div>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col space-y-4 mt-8">
                  <Link
                    href="/auditions"
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Auditions
                  </Link>
                  <Link
                    href="/workshops"
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Workshops
                  </Link>
                  <div className="space-y-2">
                    <p className="text-lg font-medium">Resources</p>
                    <div className="ml-4 space-y-2">
                      <Link
                        href="/admissions"
                        className="block text-base transition-colors hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Institute Prep
                      </Link>
                      <Link
                        href="/recruitment"
                        className="block text-base transition-colors hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Jobs & Internships
                      </Link>
                      <Link
                        href="/resources"
                        className="block text-base transition-colors hover:text-primary"
                        onClick={() => setIsOpen(false)}
                      >
                        Articles & Guides
                      </Link>
                    </div>
                  </div>
                  <Link
                    href="/networking"
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Community
                  </Link>
                  <Link
                    href="/talent-directory"
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    Talent Directory
                  </Link>
                  <div className="border-t pt-4">
                    {user ? (
                      <>
                        <div className="mb-4 rounded-lg bg-muted p-3">
                          <p className="font-medium">{user.email}</p>
                          <p className="text-sm text-muted-foreground">
                            {user.user_metadata?.role === "artist" ? "Artist" : "Director"}
                          </p>
                        </div>
                        <Link href="/talent-profile" onClick={() => setIsOpen(false)}>
                          <Button variant="outline" className="w-full mb-2 bg-transparent">
                            <User className="mr-2 h-4 w-4" />
                            My Profile
                          </Button>
                        </Link>
                        <Button variant="destructive" className="w-full" onClick={handleLogout}>
                          <LogOut className="mr-2 h-4 w-4" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="outline"
                          className="w-full mb-2 bg-transparent"
                          onClick={() => {
                            setIsOpen(false)
                            setShowLogin(true)
                          }}
                        >
                          Login
                        </Button>
                        <Button
                          className="w-full"
                          onClick={() => {
                            setIsOpen(false)
                            setShowRegister(true)
                          }}
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>

      <LoginModal open={showLogin} onClose={() => setShowLogin(false)} />
      <RegisterModal open={showRegister} onClose={() => setShowRegister(false)} />
    </>
  )
}
