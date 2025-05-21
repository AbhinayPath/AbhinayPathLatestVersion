"use client"

import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface ActiveFiltersProps {
  filters: {
    search: string
    city: string
    state: string
    trainer: string
    institution: string
  }
  handleFilterChange: (key: string, value: string) => void
  clearFilters: () => void
}

export default function ActiveFilters({ filters, handleFilterChange, clearFilters }: ActiveFiltersProps) {
  const activeFilters = Object.entries(filters).filter(([_, value]) => value !== "")

  if (activeFilters.length === 0) return null

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium">Active Filters:</h3>
        <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
          Clear All
        </Button>
      </div>
      <div className="flex flex-wrap gap-2">
        {activeFilters.map(([key, value]) => (
          <Button
            key={key}
            variant="outline"
            size="sm"
            onClick={() => handleFilterChange(key, "")}
            className="h-7 text-xs rounded-full flex items-center gap-1 bg-gray-50"
          >
            {key === "search" ? "Search" : key.charAt(0).toUpperCase() + key.slice(1)}: {value}
            <X className="h-3 w-3" />
          </Button>
        ))}
      </div>
    </div>
  )
}
