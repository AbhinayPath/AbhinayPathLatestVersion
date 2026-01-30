import { NextResponse } from "next/server"
import { festivals, processAllEvents, getEventStats } from "@/lib/data/events"

/**
 * Vercel Cron Job endpoint for checking event expiry status
 * 
 * This endpoint is called automatically by Vercel Cron to:
 * 1. Process all events and compute their current status
 * 2. Identify events that have expired since last check
 * 3. Log status changes for monitoring
 * 4. Return updated statistics
 * 
 * Schedule: Runs daily at midnight UTC (configured in vercel.json)
 * Can also be triggered manually via GET request
 */

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {
  try {
    // Verify cron secret for scheduled jobs (optional security)
    const authHeader = request.headers.get("authorization")
    const cronSecret = process.env.CRON_SECRET
    
    // If CRON_SECRET is set, verify it (skip for development)
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      // Allow requests without auth in development or manual triggers
      const url = new URL(request.url)
      const isManualTrigger = url.searchParams.get("manual") === "true"
      
      if (!isManualTrigger && process.env.NODE_ENV === "production") {
        return NextResponse.json(
          { error: "Unauthorized" },
          { status: 401 }
        )
      }
    }

    const timestamp = new Date().toISOString()
    
    // Process all events with current date
    const processedEvents = processAllEvents(festivals)
    const stats = getEventStats(processedEvents)
    
    // Find events that are closing soon (within 7 days)
    const closingSoon = processedEvents
      .filter(e => e.isClosingSoon)
      .map(e => ({
        id: e.id,
        name: e.name,
        deadline: e.submissionDeadline,
        daysLeft: e.daysUntilDeadline,
      }))
    
    // Find events that have just expired (would be different from their original status)
    const recentlyExpired = processedEvents
      .filter(e => e.isExpired && e.status !== "past")
      .map(e => ({
        id: e.id,
        name: e.name,
        deadline: e.submissionDeadline,
        originalStatus: e.status,
      }))
    
    // Find events still accepting submissions
    const openEvents = processedEvents
      .filter(e => e.isOpen)
      .map(e => ({
        id: e.id,
        name: e.name,
        deadline: e.submissionDeadline,
        daysLeft: e.daysUntilDeadline,
        status: e.computedStatus,
      }))

    const response = {
      success: true,
      timestamp,
      stats,
      summary: {
        totalEvents: stats.total,
        currentlyOpen: stats.active,
        closingSoon: stats.closingSoon,
        expired: stats.past,
      },
      alerts: {
        closingSoon,
        recentlyExpired,
      },
      openEvents,
      message: `Event status check completed. ${stats.active} events accepting submissions, ${stats.closingSoon} closing soon.`,
    }

    // Log for monitoring (visible in Vercel logs)
    console.log(`[Event Expiry Check] ${timestamp}`)
    console.log(`  - Total events: ${stats.total}`)
    console.log(`  - Open: ${stats.open}`)
    console.log(`  - Closing soon: ${stats.closingSoon}`)
    console.log(`  - Expired: ${stats.past}`)
    
    if (closingSoon.length > 0) {
      console.log(`  - Events closing soon:`)
      closingSoon.forEach(e => {
        console.log(`    * ${e.name} - ${e.daysLeft} days left`)
      })
    }
    
    if (recentlyExpired.length > 0) {
      console.log(`  - Recently expired events:`)
      recentlyExpired.forEach(e => {
        console.log(`    * ${e.name} (was: ${e.originalStatus})`)
      })
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("[Event Expiry Check] Error:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check event expiry status",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}

/**
 * POST endpoint for manually triggering status updates
 * Useful for admin operations or immediate refresh needs
 */
export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}))
    const { forceRefresh = false } = body

    const timestamp = new Date().toISOString()
    const processedEvents = processAllEvents(festivals)
    const stats = getEventStats(processedEvents)

    return NextResponse.json({
      success: true,
      timestamp,
      forceRefresh,
      stats,
      message: "Event status manually refreshed",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to refresh event status",
      },
      { status: 500 }
    )
  }
}
