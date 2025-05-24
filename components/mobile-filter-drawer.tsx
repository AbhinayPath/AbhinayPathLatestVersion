"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X, Search } from "lucide-react"

interface MobileFilterDrawerProps {
  filters: {
    search: string
    city: string
    state: string
    trainer: string
    institution: string
  }
  cities: string[]
  states: string[]
  trainers: string[]
  institutions: string[]
  handleFilterChange: (key: string, value: string) => void
  clearFilters: () => void
}

export default function MobileFilterDrawer({
  filters,
  cities,
  states,
  trainers,
  institutions,
  handleFilterChange,
  clearFilters,
}: MobileFilterDrawerProps) {
  const [open, setOpen] = useState(false)

  const handleApplyFilters = () => {
    setOpen(false)
  }

  const handleClearFilters = () => {
    clearFilters()
    setOpen(false)
  }

  const hasActiveFilters = Object.values(filters).some((value) => value !== "")

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 md:hidden rounded-full relative" size="sm">
          <Filter className="h-4 w-4" />
          Filter
          {hasActiveFilters && (
            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
              {Object.values(filters).filter((value) => value !== "").length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-xl px-4">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center justify-between">
            <span className="text-xl font-bold">Filter Workshops</span>
            <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-8 px-2">
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-5 pb-20 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div>
            <label htmlFor="mobile-search" className="text-sm font-medium block mb-1.5">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="mobile-search"
                type="text"
                placeholder="Search workshops"
                className="pl-10 rounded-full h-10"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
              />
              {filters.search && (
                <button
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                  onClick={() => handleFilterChange("search", "")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="mobile-city" className="text-sm font-medium block mb-1.5">
              City
            </label>
            <Select value={filters.city} onValueChange={(value) => handleFilterChange("city", value)}>
              <SelectTrigger id="mobile-city" className="rounded-full h-10">
                <SelectValue placeholder="All Cities" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map((city) => (
                  <SelectItem key={city} value={city}>
                    {city}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="mobile-state" className="text-sm font-medium block mb-1.5">
              State
            </label>
            <Select value={filters.state} onValueChange={(value) => handleFilterChange("state", value)}>
              <SelectTrigger id="mobile-state" className="rounded-full h-10">
                <SelectValue placeholder="All States" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="mobile-trainer" className="text-sm font-medium block mb-1.5">
              Trainer
            </label>
            <Select value={filters.trainer} onValueChange={(value) => handleFilterChange("trainer", value)}>
              <SelectTrigger id="mobile-trainer" className="rounded-full h-10">
                <SelectValue placeholder="All Trainers" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Trainers</SelectItem>
                {trainers.map((trainer) => (
                  <SelectItem key={trainer} value={trainer}>
                    {trainer}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="mobile-institution" className="text-sm font-medium block mb-1.5">
              Institution
            </label>
            <Select value={filters.institution} onValueChange={(value) => handleFilterChange("institution", value)}>
              <SelectTrigger id="mobile-institution" className="rounded-full h-10">
                <SelectValue placeholder="All Institutions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Institutions</SelectItem>
                {institutions.map((institution) => (
                  <SelectItem key={institution} value={institution}>
                    {institution}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
          <Button onClick={handleApplyFilters} className="w-full rounded-full h-12 text-base font-medium">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
