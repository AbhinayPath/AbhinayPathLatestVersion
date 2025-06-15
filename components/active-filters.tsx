"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ActiveFiltersProps {
  filters: {
    search: string
    city: string
    state: string
    trainer: string
    institution: string
    mode: string // Add mode property
  }
  handleFilterChange: (key: string, value: string) => void
  clearFilters: () => void
}

export default function ActiveFilters({ filters, handleFilterChange, clearFilters }: ActiveFiltersProps) {
  const activeFilters = Object.entries(filters).filter(([_, value]) => value !== "" && value !== "all")

  if (activeFilters.length === 0) return null

  const getFilterLabel = (key: string, value: string) => {
    switch (key) {
      case "search":
        return `Search: ${value}`
      case "city":
        return `City: ${value}`
      case "state":
        return `State: ${value}`
      case "trainer":
        return `Trainer: ${value}`
      case "institution":
        return `Institution: ${value}`
      case "mode":
        return `Mode: ${value}` // Add mode case
      default:
        return value
    }
  }

  return (
    <div className="mb-4 flex flex-wrap gap-2 items-center">
      {activeFilters.map(([key, value]) => (
        <div
          key={key}
          className="bg-gray-100 text-gray-800 text-xs md:text-sm px-2 py-1 rounded-full flex items-center"
        >
          <span className="mr-1 truncate max-w-[150px]">{getFilterLabel(key, value)}</span>
          <button
            onClick={() => handleFilterChange(key, key === "search" ? "" : "all")}
            className="text-gray-500 hover:text-gray-700"
            aria-label={`Remove ${key} filter`}
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={clearFilters}
        className="text-xs md:text-sm h-6 px-2 text-gray-500 hover:text-gray-700"
      >
        Clear all
      </Button>
    </div>
  )
}
