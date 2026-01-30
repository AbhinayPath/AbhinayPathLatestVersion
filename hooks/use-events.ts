"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import useSWR from "swr"
import { 
  festivals, 
  processAllEvents, 
  getEventStats, 
  groupByMonth, 
  sortByStatusPriority,
  filterEvents,
  type EnhancedFestival,
  type Festival 
} from "@/lib/data/events"
import type { EventStatus } from "@/lib/utils"

/**
 * Fetcher for SWR
 */
const fetcher = (url: string) => fetch(url).then(res => res.json())

/**
 * Hook configuration options
 */
interface UseEventsOptions {
  /** Use API endpoint instead of client-side processing */
  useApi?: boolean
  /** Refresh interval in milliseconds (default: 5 minutes) */
  refreshInterval?: number
  /** Whether to show expired events */
  showExpired?: boolean
  /** Filter by status */
  status?: EventStatus | EventStatus[]
  /** Filter by scale */
  scale?: string | string[]
  /** Filter by month */
  month?: string
  /** Filter by country */
  country?: string
  /** Search query */
  searchQuery?: string
  /** Auto-refresh on mount */
  refreshOnMount?: boolean
}

/**
 * Hook return type
 */
interface UseEventsReturn {
  /** All processed events */
  events: EnhancedFestival[]
  /** Events grouped by month */
  eventsByMonth: Record<string, EnhancedFestival[]>
  /** Event statistics */
  stats: ReturnType<typeof getEventStats>
  /** Loading state */
  isLoading: boolean
  /** Error state */
  error: Error | null
  /** Last updated timestamp */
  lastUpdated: Date | null
  /** Manually refresh events */
  refresh: () => void
  /** Filter events */
  filterBy: (filters: Parameters<typeof filterEvents>[1]) => EnhancedFestival[]
  /** Get events closing soon */
  closingSoon: EnhancedFestival[]
  /** Get open events */
  openEvents: EnhancedFestival[]
  /** Get expired events */
  expiredEvents: EnhancedFestival[]
}

/**
 * Custom hook for managing events with automatic expiry detection
 * 
 * Features:
 * - Real-time status computation based on current date
 * - Automatic refresh at configurable intervals
 * - Client-side or API-based processing
 * - Built-in filtering and sorting
 * - SWR caching and revalidation
 */
export function useEvents(options: UseEventsOptions = {}): UseEventsReturn {
  const {
    useApi = false,
    refreshInterval = 5 * 60 * 1000, // 5 minutes
    showExpired = true,
    status,
    scale,
    month,
    country,
    searchQuery,
    refreshOnMount = true,
  } = options

  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [clientProcessedEvents, setClientProcessedEvents] = useState<EnhancedFestival[]>([])

  // Build API URL with filters
  const apiUrl = useMemo(() => {
    if (!useApi) return null
    
    const params = new URLSearchParams()
    if (status) params.set("status", Array.isArray(status) ? status.join(",") : status)
    if (scale) params.set("scale", Array.isArray(scale) ? scale.join(",") : scale)
    if (month) params.set("month", month)
    if (country) params.set("country", country)
    if (searchQuery) params.set("search", searchQuery)
    if (!showExpired) params.set("showExpired", "false")
    
    const queryString = params.toString()
    return `/api/events${queryString ? `?${queryString}` : ""}`
  }, [useApi, status, scale, month, country, searchQuery, showExpired])

  // SWR for API-based fetching
  const { data: apiData, error: apiError, mutate } = useSWR(
    apiUrl,
    fetcher,
    {
      refreshInterval: useApi ? refreshInterval : 0,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
    }
  )

  // Client-side processing
  useEffect(() => {
    if (useApi) return

    const processEvents = () => {
      const processed = processAllEvents(festivals)
      setClientProcessedEvents(processed)
      setLastUpdated(new Date())
    }

    // Initial processing
    processEvents()

    // Set up interval for auto-refresh
    const interval = setInterval(processEvents, refreshInterval)

    return () => clearInterval(interval)
  }, [useApi, refreshInterval])

  // Process events based on mode
  const allEvents = useMemo((): EnhancedFestival[] => {
    if (useApi && apiData?.events) {
      return apiData.events
    }
    return clientProcessedEvents
  }, [useApi, apiData, clientProcessedEvents])

  // Apply client-side filters if not using API
  const filteredEvents = useMemo(() => {
    if (useApi) return allEvents

    return filterEvents(allEvents, {
      status,
      scale,
      month,
      country,
      searchQuery,
      showExpired,
    })
  }, [allEvents, useApi, status, scale, month, country, searchQuery, showExpired])

  // Sort events by priority
  const sortedEvents = useMemo(() => {
    return sortByStatusPriority(filteredEvents)
  }, [filteredEvents])

  // Group by month
  const eventsByMonth = useMemo(() => {
    const grouped = groupByMonth(sortedEvents)
    // Sort within each month
    Object.keys(grouped).forEach(m => {
      grouped[m] = sortByStatusPriority(grouped[m])
    })
    return grouped
  }, [sortedEvents])

  // Calculate stats
  const stats = useMemo(() => {
    if (useApi && apiData?.stats) {
      return apiData.stats
    }
    return getEventStats(allEvents)
  }, [useApi, apiData, allEvents])

  // Derived event lists
  const closingSoon = useMemo(() => 
    sortedEvents.filter(e => e.isClosingSoon),
    [sortedEvents]
  )

  const openEvents = useMemo(() => 
    sortedEvents.filter(e => e.isOpen),
    [sortedEvents]
  )

  const expiredEvents = useMemo(() => 
    sortedEvents.filter(e => e.isExpired),
    [sortedEvents]
  )

  // Refresh function
  const refresh = useCallback(() => {
    if (useApi) {
      mutate()
    } else {
      const processed = processAllEvents(festivals)
      setClientProcessedEvents(processed)
      setLastUpdated(new Date())
    }
  }, [useApi, mutate])

  // Filter function
  const filterBy = useCallback((filters: Parameters<typeof filterEvents>[1]) => {
    return filterEvents(allEvents, filters)
  }, [allEvents])

  // Update lastUpdated from API response
  useEffect(() => {
    if (apiData?.timestamp) {
      setLastUpdated(new Date(apiData.timestamp))
    }
  }, [apiData?.timestamp])

  return {
    events: sortedEvents,
    eventsByMonth,
    stats,
    isLoading: useApi ? !apiData && !apiError : false,
    error: apiError || null,
    lastUpdated,
    refresh,
    filterBy,
    closingSoon,
    openEvents,
    expiredEvents,
  }
}

/**
 * Hook for subscribing to event deadline alerts
 */
export function useDeadlineAlerts(daysThreshold: number = 7) {
  const { closingSoon, events } = useEvents({ showExpired: false })

  const alerts = useMemo(() => {
    return events
      .filter(e => e.daysUntilDeadline !== null && e.daysUntilDeadline <= daysThreshold && e.daysUntilDeadline > 0)
      .sort((a, b) => (a.daysUntilDeadline || 0) - (b.daysUntilDeadline || 0))
  }, [events, daysThreshold])

  return {
    alerts,
    hasAlerts: alerts.length > 0,
    urgentCount: alerts.filter(e => (e.daysUntilDeadline || 0) <= 3).length,
  }
}
