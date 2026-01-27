
import type React from "react"
import type { Metadata } from "next"
import { Inter, Playfair_Display as PlayfairDisplay } from "next/font/google"
import { Suspense } from "react"
import "./globals.css"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/contexts/AuthContext"
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const playfair = PlayfairDisplay({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair",
})

export const metadata: Metadata = {
  title: "AbhinayPath - Platform for Creative Artists",
  description:
    "India's creative platform to discover auditions, workshops & prep support — across theatre, film & web.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
  modallogin
}: Readonly<{
  children: React.ReactNode,
  modallogin: React.ReactNode,
}>) {

  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light">
          <AuthProvider>
            {modallogin}
            <div className="flex min-h-screen flex-col">
              <Suspense fallback={<div className="h-16 border-b bg-background/95 backdrop-blur"></div>}>
                <Navbar />
              </Suspense>
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster  position="top-right"/>
          </AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
