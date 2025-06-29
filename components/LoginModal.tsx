"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useAuth } from "@/contexts/AuthContext"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { refreshUser } = useAuth()
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || 'Login failed');
      }

      
      // Get user name from metadata if available
      const user = result.user || {};
      const firstName = user?.first_name || '';
      const lastName = user?.last_name || '';
      const fullName = user?.full_name || '';
      let userName = '';
      if (lastName && firstName) {
        userName = `${lastName} ${firstName}`.trim();
      } else if (fullName) {
        const nameParts = fullName.trim().split(' ');
        if (nameParts.length >= 2) {
          const fName = nameParts[0];
          const lName = nameParts.slice(1).join(' ');
          userName = `${lName} ${fName}`.trim();
        } else {
          userName = fullName;
        }
      } else {
        userName = formData.email?.split('@')[0] || 'there';
      }
      toast({
        title: "Login Successful!",
        description: `Welcome back, ${userName}! 👋`,
      });

      await refreshUser()
      setFormData({ email: "", password: "" })
      setShowPassword(false)

      setTimeout(() => {
        toast({
          title: `Welcome, ${userName}! 👋`,
          description: "Let's complete your talent profile to start applying for auditions.",
          duration: 5000,
        });
        window.location.href = '/talent-profile';
        onClose();
      }, 1000);

    } catch (error) {
      console.error('Error:', error)
      toast({
        title: "Login Failed",
        description: error instanceof Error ? error.message : "Invalid credentials",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    setFormData({ email: "", password: "" })
    setShowPassword(false)
    onClose()
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Login to AbhinayPath</DialogTitle>
          <DialogDescription>
            Sign in to your account to access your profile and exclusive opportunities.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email address"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="pr-10"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
                disabled={loading}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            <div className="flex items-center justify-between space-y-2">
              <Link 
                href="/forgot-password" 
                className="text-sm text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={loading}
              className="flex-1"
            >
              {loading ? "Logging in..." : "Login"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}