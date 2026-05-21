"use client"

import * as React from "react"
import DatePicker, { DatePickerProps } from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export function CustomDatePicker({ className, ...props }: DatePickerProps & { className?: string }) {
  return (
    <div className={cn("relative w-full", className)}>
      <DatePicker
        calendarIcon={<CalendarIcon className="h-4 w-4" />}
        clearIcon={null}
        className={cn(
          "flex h-11 sm:h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          "[&_.react-date-picker\_\_wrapper]:border-0 [&_.react-date-picker\_\_wrapper]:w-full",
          "[&_.react-date-picker\_\_inputGroup]:flex-1 [&_.react-date-picker\_\_inputGroup]:text-sm",
          "[&_.react-date-picker\_\_button]:p-0"
        )}
        {...props}
      />
    </div>
  )
}
