"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter, X } from "lucide-react"

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

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 md:hidden rounded-full">
          <Filter className="h-4 w-4" />
          Filter Workshops
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[85vh] rounded-t-xl">
        <SheetHeader className="mb-4">
          <SheetTitle className="flex items-center justify-between">
            <span>Filter Workshops</span>
            <Button variant="ghost" size="sm" onClick={handleClearFilters} className="h-8 px-2">
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-4 pb-16">
          <div>
            <label htmlFor="mobile-search" className="text-sm font-medium block mb-1">
              Search
            </label>
            <Input
              id="mobile-search"
              type="text"
              placeholder="Search workshops"
              className="rounded-full"
              value={filters.search}
              onChange={(e) => handleFilterChange("search", e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="mobile-city" className="text-sm font-medium block mb-1">
              City
            </label>
            <Select value={filters.city} onValueChange={(value) => handleFilterChange("city", value)}>
              <SelectTrigger id="mobile-city" className="rounded-full">
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
            <label htmlFor="mobile-state" className="text-sm font-medium block mb-1">
              State
            </label>
            <Select value={filters.state} onValueChange={(value) => handleFilterChange("state", value)}>
              <SelectTrigger id="mobile-state" className="rounded-full">
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
            <label htmlFor="mobile-trainer" className="text-sm font-medium block mb-1">
              Trainer
            </label>
            <Select value={filters.trainer} onValueChange={(value) => handleFilterChange("trainer", value)}>
              <SelectTrigger id="mobile-trainer" className="rounded-full">
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
            <label htmlFor="mobile-institution" className="text-sm font-medium block mb-1">
              Institution
            </label>
            <Select value={filters.institution} onValueChange={(value) => handleFilterChange("institution", value)}>
              <SelectTrigger id="mobile-institution" className="rounded-full">
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

          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t">
            <Button onClick={handleApplyFilters} className="w-full rounded-full">
              Apply Filters
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
