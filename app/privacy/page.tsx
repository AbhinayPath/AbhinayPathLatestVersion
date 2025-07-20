import type { Metadata } from "next"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Mail, FileText, Users, Database, Trash2 } from "lucide-react"

export const metadata: Metadata = {
  title: "Privacy & Data Policy - AbhinayPath",
  description:
    "Learn about AbhinayPath's data collection practices, privacy policies, and how we protect your personal information.",
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="h-8 w-8 text-[#2D1A54]" />
              <h1 className="font-playfair text-4xl font-bold text-[#2D1A54]">Privacy & Data Policy</h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your privacy is important to us. Learn how Abhinayपथ collects, uses, and protects your personal
              information.
            </p>
            <div className="mt-4 text-sm text-gray-500">
              Last updated:{" "}
              {new Date().toLocaleDateString("en-IN", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="space-y-8">
            {/* Data Usage Policy */}
            <Card className="border-l-4 border-l-[#2D1A54]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#2D1A54]">
                  <Database className="h-6 w-6" />
                  Data Usage Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Abhinayपथ is committed to protecting your privacy and maintaining the confidentiality of your personal
                  information. Our data collection practices are designed to be minimal, transparent, and focused solely
                  on providing you with the best possible experience on our platform.
                </p>

                <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-[#2D1A54] mb-2">What We Collect</h3>
                  <p className="text-gray-700">
                    We collect only the <strong>essential personal information</strong> required for audition and
                    workshop coordination, including:
                  </p>
                  <ul className="mt-2 space-y-1 text-gray-700 ml-4">
                    <li>• Name and contact information</li>
                    <li>• Professional experience and skills</li>
                    <li>• Portfolio materials (photos, videos, resumes)</li>
                    <li>• Application responses and preferences</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Third-Party Sharing Policy */}
            <Card className="border-l-4 border-l-[#7E1F2E]">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-[#7E1F2E]">
                  <Users className="h-6 w-6" />
                  Third-Party Sharing Policy
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                  <h3 className="font-semibold text-[#7E1F2E] mb-2">Our Commitment to You</h3>
                  <p className="text-gray-700">
                    <strong>Your data is NOT stored or shared with any third parties</strong> outside of the direct
                    casting directors, workshop instructors, and production collaborators who are directly involved in
                    the opportunities you apply for.
                  </p>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  When you apply for an audition or workshop through Abhinayपथ, your information is shared exclusively
                  with:
                </p>

                <ul className="space-y-2 text-gray-700 ml-4">
                  <li className="flex items-start gap-2">
                    <span className="text-[#7E1F2E] mt-1">•</span>
                    <span>
                      <strong>Casting Directors:</strong> For audition opportunities you specifically apply to
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7E1F2E] mt-1">•</span>
                    <span>
                      <strong>Workshop Instructors:</strong> For training programs you enroll in
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#7E1F2E] mt-1">•</span>
                    <span>
                      <strong>Production Teams:</strong> For projects you are selected for
                    </span>
                  </li>
                </ul>

                <p className="text-gray-700 leading-relaxed">
                  We do not sell, rent, or share your personal information with marketing companies, data brokers, or
                  any other third parties for commercial purposes.
                </p>
              </CardContent>
            </Card>

            {/* Data Removal Rights */}
            <Card className="border-l-4 border-l-green-600">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-green-700">
                  <Trash2 className="h-6 w-6" />
                  Your Data Removal Rights
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  You have complete control over your personal data. At any time, you can request the removal of your
                  submitted information from our platform and our collaborators' databases.
                </p>

                <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                  <h3 className="font-semibold text-green-700 mb-3">How to Request Data Removal</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-green-600 mt-0.5" />
                      <div>
                        <p className="text-gray-700 mb-1">
                          <strong>Email us at:</strong>
                        </p>
                        <a href="mailto:abhinaypath@gmail.com" className="text-[#2D1A54] font-semibold hover:underline">
                          abhinaypath@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="ml-8 space-y-2 text-gray-700">
                      <p>
                        <strong>Include in your email:</strong>
                      </p>
                      <ul className="space-y-1 ml-4">
                        <li>• Your full name as registered</li>
                        <li>• Email address used for applications</li>
                        <li>• Specific data you want removed</li>
                        <li>• Reason for removal (optional)</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                  <h3 className="font-semibold text-blue-700 mb-2">Response Timeline</h3>
                  <p className="text-gray-700">
                    We will process your data removal request within <strong>7 business days</strong> and send you a
                    confirmation email once your data has been successfully removed from our systems and notified to
                    relevant collaborators.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card className="border-l-4 border-l-orange-500">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-orange-600">
                  <FileText className="h-6 w-6" />
                  Additional Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-700 mb-2">Data Security</h3>
                    <p className="text-gray-700 text-sm">
                      We use industry-standard security measures to protect your personal information from unauthorized
                      access, disclosure, or misuse.
                    </p>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                    <h3 className="font-semibold text-orange-700 mb-2">Policy Updates</h3>
                    <p className="text-gray-700 text-sm">
                      We may update this privacy policy from time to time. Any changes will be posted on this page with
                      an updated revision date.
                    </p>
                  </div>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <h3 className="font-semibold text-gray-700 mb-2">Questions or Concerns?</h3>
                  <p className="text-gray-700 text-sm mb-2">
                    If you have any questions about this privacy policy or our data practices, please don't hesitate to
                    contact us:
                  </p>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-600" />
                    <a href="mailto:abhinaypath@gmail.com" className="text-[#2D1A54] font-semibold hover:underline">
                      abhinaypath@gmail.com
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm">
              This privacy policy is effective as of {new Date().toLocaleDateString("en-IN")} and applies to all users
              of the Abhinayपथ platform.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
