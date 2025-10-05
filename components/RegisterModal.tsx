"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/contexts/AuthContext"
import { getSupabaseBrowserClient } from "@/lib/supabase"
import { toast } from "@/hooks/use-toast"
import { Eye, EyeOff } from "lucide-react"

interface RegisterModalProps {
  isOpen: boolean
  onClose: () => void
  mode?: "register" | "edit"
  initialData?: {
    firstName: string
    lastName: string
    email: string
    profession: string
  }
}

export default function RegisterModal({ isOpen, onClose, mode = "register", initialData }: RegisterModalProps) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    profession: "",
  })
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const { refreshUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setFormData({
        firstName: initialData?.firstName || "",
        lastName: initialData?.lastName || "",
        email: initialData?.email || "",
        password: "",
        profession: initialData?.profession || "",
      })
    }
  }, [isOpen, initialData])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleProfessionChange = (value: string) => {
    setFormData((prev) => ({ ...prev, profession: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const supabase = getSupabaseBrowserClient()

    try {
      if (mode === "register") {
        const response = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            firstName: formData.firstName,
            lastName: formData.lastName,
            email: formData.email,
            password: formData.password,
            profession: formData.profession,
          }),
        })

        const result = await response.json()

        if (!response.ok) {
          toast({
            title: "Registration Error",
            description: result?.message || result?.error || "Registration failed",
            variant: "destructive",
          })
          throw new Error(result.error || "Registration failed")
        }

        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        })

        if (signInError) {
          toast({
            title: "Login Error",
            description: "Registration successful but login failed. Please try logging in.",
            variant: "destructive",
          })
          throw new Error("Registration successful but login failed. Please try logging in.")
        }

        const userName =
          `${formData.lastName} ${formData.firstName}`.trim() || data.user?.email?.split("@")[0] || "there"

        toast({
          title: "Registration Successful!",
          description: `Welcome to AbhinayPath, ${userName}! 👋`,
        })

        await refreshUser()
        onClose()

        setTimeout(() => {
          if (formData.profession === "Artist") {
            toast({
              title: `Welcome, ${userName}! 👋`,
              description: "Let's complete your talent profile to start applying for auditions.",
              duration: 5000,
            })
            router.push("/talent-profile")
          } else if (formData.profession === "Organization") {
            toast({
              title: `Welcome, ${userName}! 👋`,
              description: "Let's set up your organization profile to start posting opportunities.",
              duration: 5000,
            })
            router.push("/organization-profile")
          }
        }, 1000)
      } else {
        const { error } = await supabase.auth.updateUser({
          data: {
            first_name: formData.firstName,
            last_name: formData.lastName,
            profession: formData.profession,
          },
        })

        if (error) {
          toast({
            title: "Profile Update Error",
            description: error.message,
            variant: "destructive",
          })
          throw new Error(error.message)
        }

        toast({
          title: "Profile Updated!",
          description: "Your profile has been updated successfully.",
        })
        await refreshUser()
        onClose()
      }
    } catch (error) {
      console.error("Error:", error)
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    onClose()
  }

  const handleClose = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      profession: "",
    })
    setLoading(false)
    setShowPassword(false)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{mode === "register" ? "Register for AbhinayPath" : "Edit Profile"}</DialogTitle>
          <DialogDescription>
            {mode === "register"
              ? "Create your account to join the AbhinayPath community and access exclusive opportunities."
              : "Update your profile information and preferences."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
                placeholder="Enter your first name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
              disabled={mode === "edit"}
              placeholder="Enter your email address"
            />
          </div>

          {mode === "register" && (
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
                  minLength={6}
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="profession">I am a/an</Label>
            <Select value={formData.profession} onValueChange={handleProfessionChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Artist">Artist / Performer</SelectItem>
                <SelectItem value="Organization">Organization / Production House</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="submit" disabled={loading} className="flex-1">
              {loading ? "Processing..." : mode === "register" ? "Register" : "Update"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={loading}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
