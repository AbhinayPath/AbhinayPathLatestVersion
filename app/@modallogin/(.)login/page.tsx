'use client'

import { usePathname, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LoginForm } from "@/features/auth/components/LoginForm"
import Link from "next/link"
import { X } from "lucide-react"
import { useEffect } from 'react'

export default function LoginModal() {
  const router = useRouter()
  const pathname = usePathname()
  const isLoginPath = pathname === '/login';


  useEffect(() => {
    if (isLoginPath) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Restore scroll when path changes
    }

    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [isLoginPath]);


  const handleClose = () => {
    router.back()
  }
  if (!isLoginPath) {
    return null
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
      onClick={handleClose}
    >
      <Card
        className="w-full max-w-md bg-white relative animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
          <CardDescription>
            Sign in to your AbhinayPath account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <LoginForm />
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-primary font-medium hover:underline"
              onClick={handleClose}
            >
              Create account
            </Link>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}