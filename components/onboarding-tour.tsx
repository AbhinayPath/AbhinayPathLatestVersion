"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { X, ArrowRight, ArrowLeft, Sparkles, CheckCircle2 } from "lucide-react"
import { cn } from "@/lib/utils"

export interface OnboardingStep {
  id: string
  title: string
  description: string
  targetRef?: React.RefObject<HTMLElement>
  position?: "top" | "bottom" | "left" | "right" | "center"
  icon?: React.ReactNode
  action?: () => void
}

interface OnboardingTourProps {
  steps: OnboardingStep[]
  isOpen: boolean
  onComplete: () => void
  onSkip: () => void
  storageKey?: string
}

export function OnboardingTour({
  steps,
  isOpen,
  onComplete,
  onSkip,
  storageKey = "onboarding-completed",
}: OnboardingTourProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [isVisible, setIsVisible] = useState(isOpen)
  const [highlightPosition, setHighlightPosition] = useState({ top: 0, left: 0, width: 0, height: 0 })
  const tooltipRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(isOpen)
    if (isOpen) {
      setCurrentStep(0)
    }
  }, [isOpen])

  useEffect(() => {
    if (isVisible && steps[currentStep]?.targetRef?.current) {
      updateHighlightPosition()

      // Scroll to element
      steps[currentStep].targetRef?.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      })

      // Execute step action if any
      steps[currentStep].action?.()
    }
  }, [currentStep, isVisible, steps])

  const updateHighlightPosition = () => {
    const target = steps[currentStep]?.targetRef?.current
    if (target) {
      const rect = target.getBoundingClientRect()
      setHighlightPosition({
        top: rect.top + window.scrollY - 8,
        left: rect.left + window.scrollX - 8,
        width: rect.width + 16,
        height: rect.height + 16,
      })
    }
  }

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleComplete = () => {
    setIsVisible(false)
    if (storageKey) {
      localStorage.setItem(storageKey, "true")
    }
    onComplete()
  }

  const handleSkip = () => {
    setIsVisible(false)
    if (storageKey) {
      localStorage.setItem(storageKey, "skipped")
    }
    onSkip()
  }

  if (!isVisible) return null

  const step = steps[currentStep]
  const progress = ((currentStep + 1) / steps.length) * 100

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/60 z-[100] transition-opacity" />

      {/* Spotlight/Highlight */}
      {step?.targetRef?.current && (
        <div
          className="fixed z-[101] pointer-events-none transition-all duration-300 ease-out"
          style={{
            top: `${highlightPosition.top}px`,
            left: `${highlightPosition.left}px`,
            width: `${highlightPosition.width}px`,
            height: `${highlightPosition.height}px`,
          }}
        >
          <div className="absolute inset-0 rounded-lg border-4 border-white shadow-[0_0_0_9999px_rgba(0,0,0,0.6)] animate-pulse" />
        </div>
      )}

      {/* Tooltip/Guide */}
      <div
        ref={tooltipRef}
        className={cn(
          "fixed z-[102] transition-all duration-300",
          step?.position === "center"
            ? "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            : step?.position === "top"
              ? "bottom-full mb-4"
              : step?.position === "bottom"
                ? "top-full mt-4"
                : step?.position === "left"
                  ? "right-full mr-4"
                  : step?.position === "right"
                    ? "left-full ml-4"
                    : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
        )}
        style={
          step?.targetRef?.current && step?.position !== "center"
            ? {
                top:
                  step.position === "bottom"
                    ? `${highlightPosition.top + highlightPosition.height + 16}px`
                    : step.position === "top"
                      ? `${highlightPosition.top - 16}px`
                      : `${highlightPosition.top + highlightPosition.height / 2}px`,
                left:
                  step.position === "right"
                    ? `${highlightPosition.left + highlightPosition.width + 16}px`
                    : step.position === "left"
                      ? `${highlightPosition.left - 16}px`
                      : `${highlightPosition.left + highlightPosition.width / 2}px`,
                transform:
                  step.position === "top"
                    ? "translate(-50%, -100%)"
                    : step.position === "bottom"
                      ? "translate(-50%, 0)"
                      : step.position === "left"
                        ? "translate(-100%, -50%)"
                        : step.position === "right"
                          ? "translate(0, -50%)"
                          : "translate(-50%, -50%)",
              }
            : {}
        }
      >
        <Card className="w-[90vw] max-w-md shadow-2xl border-2 border-purple-200 animate-in fade-in zoom-in duration-300">
          <CardContent className="p-6 space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3 flex-1">
                {step?.icon && (
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-lg text-gray-900">{step?.title}</h3>
                  <p className="text-sm text-gray-500">
                    Step {currentStep + 1} of {steps.length}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm" onClick={handleSkip} className="flex-shrink-0 h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Progress */}
            <Progress value={progress} className="h-2" />

            {/* Content */}
            <p className="text-gray-700 leading-relaxed">{step?.description}</p>

            {/* Actions */}
            <div className="flex items-center justify-between gap-3 pt-2">
              <Button variant="ghost" onClick={handleSkip} className="text-gray-600 hover:text-gray-900">
                Skip Tour
              </Button>

              <div className="flex items-center gap-2">
                {currentStep > 0 && (
                  <Button variant="outline" onClick={handlePrevious} className="gap-2 bg-transparent">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                )}
                <Button
                  onClick={handleNext}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 gap-2"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      Complete
                      <CheckCircle2 className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Next
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

// Welcome Modal Component
interface OnboardingWelcomeProps {
  isOpen: boolean
  onStart: () => void
  onSkip: () => void
}

export function OnboardingWelcome({ isOpen, onStart, onSkip }: OnboardingWelcomeProps) {
  if (!isOpen) return null

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-[100] backdrop-blur-sm" />

      <div className="fixed inset-0 z-[101] flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl shadow-2xl border-2 border-purple-200 animate-in fade-in zoom-in duration-500">
          <CardContent className="p-8 space-y-6">
            {/* Header */}
            <div className="text-center space-y-4">
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold font-playfair bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Welcome to Your Actor Profile!
                </h2>
                <p className="text-gray-600 mt-2">Let's create your professional profile together</p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-lg bg-purple-100 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="font-semibold text-sm">Your Essence</h3>
                <p className="text-xs text-gray-600">Share your story and background</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-lg bg-blue-100 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-sm">Your Craft</h3>
                <p className="text-xs text-gray-600">Showcase your skills and experience</p>
              </div>

              <div className="text-center space-y-2">
                <div className="w-12 h-12 mx-auto rounded-lg bg-pink-100 flex items-center justify-center">
                  <Sparkles className="h-6 w-6 text-pink-600" />
                </div>
                <h3 className="font-semibold text-sm">Your Showcase</h3>
                <p className="text-xs text-gray-600">Display your portfolio and work</p>
              </div>
            </div>

            {/* Info */}
            <div className="bg-purple-50 rounded-lg p-4 space-y-2">
              <h4 className="font-semibold text-sm text-purple-900">What to expect:</h4>
              <ul className="space-y-1 text-sm text-purple-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Step-by-step guidance through each section</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>Tips and best practices for profile creation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
                  <span>About 5-10 minutes to complete your profile</span>
                </li>
              </ul>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Button variant="outline" onClick={onSkip} className="w-full sm:w-auto bg-transparent">
                Skip & Explore On My Own
              </Button>
              <Button
                onClick={onStart}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Start Guided Tour
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
