import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parse a submission deadline string and return a Date object
 * Handles various formats like "15 Jan 2026", "9 Nov 2025", "Expected: August–September 2025", etc.
 */
export function parseSubmissionDeadline(deadline: string): Date | null {
  // Handle "Submission Closed" or similar
  if (deadline.toLowerCase().includes('closed') || deadline.toLowerCase().includes('tba')) {
    return null
  }

  // Handle "Expected:" prefix - treat as upcoming, return null to skip auto-expiry
  if (deadline.toLowerCase().includes('expected')) {
    return null
  }

  // Handle "Open (check website)" - treat as open
  if (deadline.toLowerCase().includes('open') || deadline.toLowerCase().includes('check')) {
    return null
  }

  // Extract date patterns
  const datePatterns = [
    // "15 Jan 2026", "9 Nov 2025", "4 Feb 2026"
    /(\d{1,2})\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})/i,
    // "January 15, 2026"
    /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{1,2}),?\s+(\d{4})/i,
    // "15th January 2026"
    /(\d{1,2})(?:st|nd|rd|th)?\s+(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+(\d{4})/i,
  ]

  const monthMap: { [key: string]: number } = {
    jan: 0, feb: 1, mar: 2, apr: 3, may: 4, jun: 5,
    jul: 6, aug: 7, sep: 8, oct: 9, nov: 10, dec: 11
  }

  for (const pattern of datePatterns) {
    const match = deadline.match(pattern)
    if (match) {
      let day: number, month: string, year: number
      
      if (pattern === datePatterns[1]) {
        // "January 15, 2026" format
        month = match[1].toLowerCase().slice(0, 3)
        day = parseInt(match[2])
        year = parseInt(match[3])
      } else {
        // "15 Jan 2026" format
        day = parseInt(match[1])
        month = match[2].toLowerCase().slice(0, 3)
        year = parseInt(match[3])
      }
      
      const monthIndex = monthMap[month]
      if (monthIndex !== undefined) {
        // Set to end of day (23:59:59) for the deadline
        return new Date(year, monthIndex, day, 23, 59, 59)
      }
    }
  }

  return null
}

/**
 * Check if a deadline has passed
 */
export function isDeadlinePassed(deadline: string): boolean {
  const deadlineDate = parseSubmissionDeadline(deadline)
  if (!deadlineDate) return false
  
  const now = new Date()
  return now > deadlineDate
}

/**
 * Get days until deadline (negative if passed)
 */
export function getDaysUntilDeadline(deadline: string): number | null {
  const deadlineDate = parseSubmissionDeadline(deadline)
  if (!deadlineDate) return null
  
  const now = new Date()
  const diffTime = deadlineDate.getTime() - now.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

/**
 * Determine event status based on submission deadline
 */
export type EventStatus = "open" | "upcoming" | "past" | "closing-soon"

export function getEventStatus(submissionDeadline: string, originalStatus: EventStatus): EventStatus {
  // If already marked as past, keep it
  if (originalStatus === "past") return "past"
  
  const deadlineDate = parseSubmissionDeadline(submissionDeadline)
  
  // If we can't parse the deadline, return original status
  if (!deadlineDate) return originalStatus
  
  const now = new Date()
  const daysUntil = getDaysUntilDeadline(submissionDeadline)
  
  // If deadline has passed, mark as past
  if (now > deadlineDate) {
    return "past"
  }
  
  // If deadline is within 7 days, mark as closing soon
  if (daysUntil !== null && daysUntil <= 7 && daysUntil > 0) {
    return "closing-soon"
  }
  
  // Otherwise return open if it was open/upcoming
  return originalStatus === "upcoming" ? "upcoming" : "open"
}
