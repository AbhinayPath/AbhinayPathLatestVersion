"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, User, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { NavbarProfilePercentage } from "./navbar-profile-percentage"

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const getUser = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
      } catch (error) {
        console.error("Error fetching user:", error)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const navItems = [
    { label: "Auditions", href: "/auditions" },
    { label: "Workshops", href: "/workshops" },
    { label: "Networking", href: "/networking" },
    { label: "Recruitment", href: "/recruitment" },
    { label: "Resources", href: "/resources" },
    { label: "Admissions", href: "/admissions" },
  ]

  const ProfileMenu = () => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 leading-none">
            <p className="font-medium text-sm">{user?.email}</p>
            <p className="text-xs text-muted-foreground">{user?.user_metadata?.role || "User"}</p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <NavbarProfilePercentage userId={user?.id} />
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/talent-profile" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/talent-directory" className="cursor-pointer">
            <User className="mr-2 h-4 w-4" />
            <span>Talent Directory</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-3">
            <Image src="/images/logo.png" alt="Abhinayपथ Logo" width={40} height={40} className="h-10 w-10" />
            <span className="text-2xl font-bold text-primary font-playfair">Abhinayपथ</span>
          </Link>

          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button variant="ghost" className="text-gray-700 hover:text-primary">
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center space-x-4">
            {!isLoading && (
              <>
                {user ? (
                  <ProfileMenu />
                ) : (
                  <>
                    <Link href="/login">
                      <Button variant="ghost">Sign In</Button>
                    </Link>
                    <Link href="/signup">
                      <Button>Get Started</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <Link key={item.href} href={item.href}>
                    <Button variant="ghost" className="w-full justify-start text-lg">
                      {item.label}
                    </Button>
                  </Link>
                ))}
                <div className="pt-4 border-t">
                  {!isLoading && (
                    <>
                      {user ? (
                        <>
                          <div className="px-2 py-2 mb-2">
                            <p className="text-sm font-medium">{user.email}</p>
                            <p className="text-xs text-muted-foreground">{user?.user_metadata?.role || "User"}</p>
                          </div>
                          <Link href="/talent-profile">
                            <Button variant="ghost" className="w-full justify-start">
                              <User className="mr-2 h-4 w-4" />
                              Profile
                            </Button>
                          </Link>
                          <Link href="/talent-directory">
                            <Button variant="ghost" className="w-full justify-start">
                              <User className="mr-2 h-4 w-4" />
                              Talent Directory
                            </Button>
                          </Link>
                          <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign out
                          </Button>
                        </>
                      ) : (
                        <>
                          <Link href="/login">
                            <Button variant="ghost" className="w-full">
                              Sign In
                            </Button>
                          </Link>
                          <Link href="/signup">
                            <Button className="w-full mt-2">Get Started</Button>
                          </Link>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
