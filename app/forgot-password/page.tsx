"use client"
import { Metadata } from "next"
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm"
import { Card } from "@/components/ui/card"



export default function ForgotPasswordPage() {
  return (
    
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto">
          <Card className="p-6">
            <h1 className="text-2xl font-bold mb-6">Forgot Password</h1>
            <ForgotPasswordForm />
          </Card>
        </div>
      </div>
    
  )
}
