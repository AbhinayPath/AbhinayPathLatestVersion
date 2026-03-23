"use client"

import { useState, useEffect, useCallback } from "react"
import { Share2, Copy, Check, X, MessageSquare, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

interface ShareWorkshopButtonProps {
  workshopId?: number
  workshopTitle?: string
  workshopDescription?: string
  workshopImage?: string
  variant?: "icon" | "button"
  size?: "sm" | "default"
  shareType?: "workshop" | "page"
}

// Hook to detect mobile devices
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640 || "ontouchstart" in window)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  return isMobile
}

// Simple analytics tracking function
const trackShare = (platform: string, workshopId?: number, workshopTitle?: string) => {
  // Log share event for analytics
  if (typeof window !== "undefined") {
    const shareEvent = {
      event: "workshop_share",
      platform,
      workshopId,
      workshopTitle,
      timestamp: new Date().toISOString(),
      url: window.location.href,
    }
    // Store in localStorage for basic analytics tracking
    const shares = JSON.parse(localStorage.getItem("workshop_shares") || "[]")
    shares.push(shareEvent)
    localStorage.setItem("workshop_shares", JSON.stringify(shares.slice(-100))) // Keep last 100 shares
    
    // Console log for debugging/monitoring
    console.log("[AbhinayPath] Share tracked:", shareEvent)
  }
}

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
)

const FacebookIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
)

const XTwitterIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const TelegramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.585-.072-4.85c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.379-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.421.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.421-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
  </svg>
)

export function ShareWorkshopButton({
  workshopId,
  workshopTitle,
  workshopDescription,
  workshopImage,
  variant = "icon",
  size = "sm",
  shareType = "workshop",
}: ShareWorkshopButtonProps) {
  const [copied, setCopied] = useState(false)
  const [showCustomizeModal, setShowCustomizeModal] = useState(false)
  const [customMessage, setCustomMessage] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const baseUrl = typeof window !== "undefined" ? window.location.origin : "https://abhinaypath.com"
  
  const shareUrl = shareType === "workshop" && workshopId 
    ? `${baseUrl}/workshops/${workshopId}`
    : `${baseUrl}/workshops`
  
  const defaultShareText = shareType === "workshop" && workshopTitle
    ? `Check out "${workshopTitle}" - a theatre workshop on AbhinayPath!${workshopDescription ? `\n\n${workshopDescription.slice(0, 100)}...` : ""}`
    : "Discover theatre workshops and training programs on AbhinayPath - India's Premier Platform for Theatre!"

  // Initialize custom message with default text
  useEffect(() => {
    setCustomMessage(defaultShareText)
  }, [defaultShareText])

  const getShareText = () => customMessage || defaultShareText

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`${getShareText()}\n\n${shareUrl}`)
      setCopied(true)
      trackShare("copy", workshopId, workshopTitle)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const openCustomizeModal = (platform: string) => {
    setSelectedPlatform(platform)
    setShowCustomizeModal(true)
    setIsOpen(false)
  }

  const executeShare = (platform: string, withCustomMessage = false) => {
    const text = withCustomMessage ? getShareText() : defaultShareText
    trackShare(platform, workshopId, workshopTitle)
    
    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`, "_blank")
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(text)}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, "_blank")
        break
      case "telegram":
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`, "_blank")
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")
        break
      case "instagram":
        navigator.clipboard.writeText(`${text}\n\n${shareUrl}`).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
          window.open("https://www.instagram.com/", "_blank")
        })
        break
    }
    setShowCustomizeModal(false)
  }

  // Direct share functions for quick access on mobile
  const directShare = useCallback((platform: string) => {
    const text = defaultShareText
    trackShare(platform, workshopId, workshopTitle)
    setIsOpen(false)
    
    switch (platform) {
      case "whatsapp":
        window.open(`https://wa.me/?text=${encodeURIComponent(`${text}\n\n${shareUrl}`)}`, "_blank")
        break
      case "facebook":
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(text)}`, "_blank")
        break
      case "twitter":
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}`, "_blank")
        break
      case "telegram":
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(text)}`, "_blank")
        break
      case "linkedin":
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, "_blank")
        break
      case "instagram":
        navigator.clipboard.writeText(`${text}\n\n${shareUrl}`).then(() => {
          setCopied(true)
          setTimeout(() => setCopied(false), 2000)
          window.open("https://www.instagram.com/", "_blank")
        })
        break
    }
  }, [defaultShareText, shareUrl, workshopId, workshopTitle])

  const shareToWhatsApp = () => isMobile ? directShare("whatsapp") : openCustomizeModal("whatsapp")
  const shareToFacebook = () => isMobile ? directShare("facebook") : openCustomizeModal("facebook")
  const shareToTwitter = () => isMobile ? directShare("twitter") : openCustomizeModal("twitter")
  const shareToTelegram = () => isMobile ? directShare("telegram") : openCustomizeModal("telegram")
  const shareToLinkedIn = () => isMobile ? directShare("linkedin") : openCustomizeModal("linkedin")
  const shareToInstagram = () => isMobile ? directShare("instagram") : openCustomizeModal("instagram")

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        trackShare("native", workshopId, workshopTitle)
        setIsOpen(false)
        await navigator.share({
          title: shareType === "workshop" ? workshopTitle || "Theatre Workshop" : "Theatre Workshops",
          text: getShareText(),
          url: shareUrl,
        })
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          console.error("Error sharing:", err)
        }
      }
    }
  }

  // Mobile-optimized touch targets (minimum 44x44px for accessibility)
  const buttonSize = size === "sm" 
    ? "h-10 w-10 min-h-[44px] min-w-[44px] sm:h-8 sm:w-8 sm:min-h-0 sm:min-w-0" 
    : "h-11 w-11 min-h-[44px] min-w-[44px] sm:h-10 sm:w-10 sm:min-h-0 sm:min-w-0"
  const iconSize = size === "sm" ? "h-4 w-4 sm:h-4 sm:w-4" : "h-5 w-5 sm:h-5 sm:w-5"

  const getPlatformName = (platform: string) => {
    const names: Record<string, string> = {
      whatsapp: "WhatsApp",
      facebook: "Facebook",
      twitter: "X (Twitter)",
      telegram: "Telegram",
      linkedin: "LinkedIn",
      instagram: "Instagram",
    }
    return names[platform] || platform
  }

  // Check if native share is available
  const hasNativeShare = typeof navigator !== "undefined" && navigator.share

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        {variant === "icon" ? (
          <Button
            size="icon"
            variant="outline"
            className={`rounded-full bg-white/90 hover:bg-white active:bg-gray-100 border-gray-200 shadow-sm touch-manipulation ${buttonSize}`}
            title={shareType === "workshop" ? "Share Workshop" : "Share Workshops Page"}
            aria-label={shareType === "workshop" ? "Share Workshop" : "Share Workshops Page"}
          >
            <Share2 className={`${iconSize} text-gray-600`} />
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="rounded-lg border-2 border-primary text-primary hover:bg-primary/10 active:bg-primary/20 text-sm sm:text-base h-11 sm:h-12 px-4 sm:px-6 font-semibold touch-manipulation min-h-[44px]"
          >
            <Share2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="whitespace-nowrap">{shareType === "workshop" ? "Share" : "Share Page"}</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="w-56 sm:w-56 max-h-[70vh] overflow-y-auto"
        sideOffset={8}
      >
        {/* Native share option first on mobile for better UX */}
        {hasNativeShare && isMobile && (
          <>
            <DropdownMenuItem 
              onClick={nativeShare} 
              className="cursor-pointer text-sm py-3 px-3 min-h-[44px] touch-manipulation font-medium text-primary"
            >
              <Share2 className="h-5 w-5" />
              <span className="ml-3">Share via...</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem 
          onClick={shareToWhatsApp} 
          className="cursor-pointer text-sm py-3 px-3 min-h-[44px] touch-manipulation"
        >
          <WhatsAppIcon />
          <span className="ml-3">WhatsApp</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={shareToInstagram} 
          className="cursor-pointer text-sm py-3 px-3 min-h-[44px] touch-manipulation"
        >
          <InstagramIcon />
          <span className="ml-3">Instagram</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={shareToFacebook} 
          className="cursor-pointer text-sm py-3 px-3 min-h-[44px] touch-manipulation"
        >
          <FacebookIcon />
          <span className="ml-3">Facebook</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={shareToTwitter} 
          className="cursor-pointer text-sm py-3 px-3 min-h-[44px] touch-manipulation"
        >
          <XTwitterIcon />
          <span className="ml-3">X (Twitter)</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={shareToTelegram} 
          className="cursor-pointer text-sm py-3 px-3 min-h-[44px] touch-manipulation"
        >
          <TelegramIcon />
          <span className="ml-3">Telegram</span>
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={shareToLinkedIn} 
          className="cursor-pointer text-sm py-3 px-3 min-h-[44px] touch-manipulation"
        >
          <LinkedInIcon />
          <span className="ml-3">LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={copyToClipboard} 
          className="cursor-pointer text-sm py-3 px-3 min-h-[44px] touch-manipulation"
        >
          {copied ? (
            <>
              <Check className="h-5 w-5 text-green-500" />
              <span className="ml-3 text-green-500 font-medium">Copied!</span>
            </>
          ) : (
            <>
              <Copy className="h-5 w-5" />
              <span className="ml-3">Copy Link</span>
            </>
          )}
        </DropdownMenuItem>
        {hasNativeShare && !isMobile && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem 
              onClick={nativeShare} 
              className="cursor-pointer text-sm py-3 px-3 min-h-[44px] touch-manipulation"
            >
              <Share2 className="h-5 w-5" />
              <span className="ml-3">More Options...</span>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>

      {/* Customize Message Modal - Desktop only */}
      <Dialog open={showCustomizeModal} onOpenChange={setShowCustomizeModal}>
        <DialogContent className="w-[calc(100%-2rem)] max-w-md mx-auto max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
              <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
              <span>Share to {selectedPlatform && getPlatformName(selectedPlatform)}</span>
            </DialogTitle>
            <DialogDescription className="text-sm">
              Customize your message before sharing. Add a personal note to make it more engaging!
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2 sm:py-4">
            {/* Preview Card */}
            <div className="bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
              <div className="flex items-start gap-2 sm:gap-3">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm text-gray-900 truncate">
                    {workshopTitle || "Theatre Workshops"}
                  </h4>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                    {workshopDescription?.slice(0, 80) || "Discover amazing theatre workshops and training programs"}...
                  </p>
                  <p className="text-xs text-primary mt-1 truncate">{shareUrl}</p>
                </div>
              </div>
            </div>

            {/* Custom Message Input */}
            <div className="space-y-2">
              <Label htmlFor="customMessage" className="text-sm font-medium">
                Your Message
              </Label>
              <Textarea
                id="customMessage"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Add your personal message..."
                className="min-h-[80px] sm:min-h-[100px] resize-none text-sm"
                maxLength={500}
              />
              <p className="text-xs text-gray-500 text-right">
                {customMessage.length}/500 characters
              </p>
            </div>

            {/* Quick Templates */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Quick Templates</Label>
              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 sm:h-7 touch-manipulation"
                  onClick={() => setCustomMessage(`Hey! Check out this amazing theatre workshop: "${workshopTitle}" - I think you'd love it!`)}
                >
                  Recommend to friend
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 sm:h-7 touch-manipulation"
                  onClick={() => setCustomMessage(`Looking to improve your acting skills? This workshop might be perfect: "${workshopTitle}"`)}
                >
                  Skill improvement
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="text-xs h-8 sm:h-7 touch-manipulation"
                  onClick={() => setCustomMessage(defaultShareText)}
                >
                  Reset to default
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons - Stacked on mobile */}
          <div className="flex flex-col sm:flex-row gap-2 sm:justify-end pt-2">
            <Button
              variant="outline"
              onClick={() => setShowCustomizeModal(false)}
              className="text-sm h-10 sm:h-9 touch-manipulation order-3 sm:order-1"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              onClick={() => selectedPlatform && executeShare(selectedPlatform, false)}
              className="text-sm h-10 sm:h-9 touch-manipulation order-2"
            >
              Share Default
            </Button>
            <Button
              onClick={() => selectedPlatform && executeShare(selectedPlatform, true)}
              className="text-sm h-10 sm:h-9 bg-primary hover:bg-primary/90 touch-manipulation order-1 sm:order-3"
            >
              Share with Custom Message
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </DropdownMenu>
  )
}
