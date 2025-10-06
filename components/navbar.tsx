"use client"

import { cn } from "@/lib/utils"
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Link } from "next/link"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="bg-background sticky top-0 z-40">
      <div className="container flex items-center justify-between py-6">
        <Link href="/" className="text-foreground font-bold text-lg">
          Logo
        </Link>
        <div className="hidden md:flex space-x-6">
          <Link
            href="/opportunities"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/opportunities" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Opportunities
          </Link>
          <Link
            href="/about"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/about" ? "text-foreground" : "text-foreground/60",
            )}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/contact" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Contact
          </Link>
          {/* Insert the new "Post Opportunity" link here */}
          <Link
            href="/post-opportunity"
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/post-opportunity" ? "text-foreground" : "text-foreground/60",
            )}
          >
            Post Opportunity
          </Link>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden">
              Menu
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <SheetDescription asChild>
              <div className="flex flex-col space-y-4">
                <Link
                  href="/opportunities"
                  className="block px-4 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md transition-colors"
                >
                  Opportunities
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md transition-colors"
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md transition-colors"
                >
                  Contact
                </Link>
                {/* Insert the new "Post Opportunity" link here */}
                <Link
                  href="/post-opportunity"
                  className="block px-4 py-2 text-base font-medium text-foreground/60 hover:text-foreground hover:bg-accent rounded-md transition-colors"
                >
                  Post Opportunity
                </Link>
              </div>
            </SheetDescription>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  )
}
