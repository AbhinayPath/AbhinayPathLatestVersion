import { NextResponse } from "next/server"
import { 
  festivals, 
  processAllEvents, 
  getEventStats, 
  groupByMonth,
  sortByStatusPriority,
  filterEvents,
  type EnhancedFestival 
} from "@/lib/data/events"

/**
 * API endpoint for fetching processed events
 * Returns events with computed status based on current date
 * 
 * Query Parameters:
 * - status: Filter by status (open, closing-soon, upcoming, past)
 * - scale: Filter by scale (International, National, Regional)
 * - month: Filter by month
 * - country: Filter by country
 * - search: Search query
 * - showExpired: Include expired events (default: true)
 * - grouped: Return events grouped by month (default: false)
 */

export const dynamic = "force-dynamic"
export const revalidate = 0

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    
    // Parse query parameters
    const status = url.searchParams.get("status")
    const scale = url.searchParams.get("scale")
    const month = url.searchParams.get("month")
    const country = url.searchParams.get("country")
    const searchQuery = url.searchParams.get("search")
    const showExpired = url.searchParams.get("showExpired") !== "false"
    const grouped = url.searchParams.get("grouped") === "true"
    const sortByPriority = url.searchParams.get("sortByPriority") !== "false"

    // Process all events with current timestamp
    let processedEvents = processAllEvents(festivals)

    // Apply filters
    const filters: Parameters<typeof filterEvents>[1] = {
      showExpired,
    }
    
    if (status) {
      filters.status = status.split(",") as EnhancedFestival["computedStatus"][]
    }
    if (scale) {
      filters.scale = scale.split(",")
    }
    if (month) {
      filters.month = month
    }
    if (country) {
      filters.country = country
    }
    if (searchQuery) {
      filters.searchQuery = searchQuery
    }

    processedEvents = filterEvents(processedEvents, filters)

    // Sort by status priority if requested
    if (sortByPriority) {
      processedEvents = sortByStatusPriority(processedEvents)
    }

    // Get statistics
    const stats = getEventStats(processAllEvents(festivals))
    const filteredStats = getEventStats(processedEvents)

    // Prepare response
    const response: {
      success: boolean
      timestamp: string
      stats: typeof stats
      filteredStats: typeof filteredStats
      events?: EnhancedFestival[]
      eventsByMonth?: Record<string, EnhancedFestival[]>
      totalCount: number
      filteredCount: number
    } = {
      success: true,
      timestamp: new Date().toISOString(),
      stats,
      filteredStats,
      totalCount: festivals.length,
      filteredCount: processedEvents.length,
    }

    if (grouped) {
      // Sort events within each month by priority
      const grouped = groupByMonth(processedEvents)
      Object.keys(grouped).forEach(month => {
        grouped[month] = sortByStatusPriority(grouped[month])
      })
      response.eventsByMonth = grouped
    } else {
      response.events = processedEvents
    }

    return NextResponse.json(response, {
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error) {
    console.error("[Events API] Error:", error)
    
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch events",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
