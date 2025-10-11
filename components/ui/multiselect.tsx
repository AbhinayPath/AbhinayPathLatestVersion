'use client'

import * as React from "react"
import { Check, ChevronDown, Search, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "cmdk"

export interface MultiSelectOption {
  label: string
  value: string
}









interface MultiSelectProps {
  options: MultiSelectOption[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder?: string
  searchPlaceholder?: string
  className?: string
  disabled?: boolean
  maxHeight?: string
  showSearch?: boolean
  allowCustom?: boolean
  onAddCustom?: (value: string) => void
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  searchPlaceholder = "Search...",
  className,
  disabled = false,
  maxHeight = "300px",
  showSearch = true,
  allowCustom = false,
  onAddCustom,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false)
  const [searchValue, setSearchValue] = React.useState("")
  const [customValue, setCustomValue] = React.useState("")

  const filteredOptions = React.useMemo(() => {
    if (!searchValue) return options
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchValue.toLowerCase())
    )
  }, [options, searchValue])

  const handleSelect = (value: string) => {
    const newSelected = selected.includes(value)
      ? selected.filter((item) => item !== value)
      : [...selected, value]
    onChange(newSelected)
  }

  const handleRemove = (value: string) => {
    onChange(selected.filter((item) => item !== value))
  }

  const handleAddCustom = () => {
    if (customValue.trim() && onAddCustom && !selected.includes(customValue.trim())) {
      onAddCustom(customValue.trim())
      onChange([...selected, customValue.trim()])
      setCustomValue("")
    }
  }

  const selectedLabels = selected.map(value => {
    const option = options.find(opt => opt.value === value)
    return option ? option.label : value
  })

  return (
    <div className={cn("w-full", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "w-full justify-between min-h-[40px] h-auto p-2",
              selected.length === 0 && "text-muted-foreground",
              disabled && "opacity-50 cursor-not-allowed"
            )}
            disabled={disabled}
          >
            <div className="flex flex-wrap gap-1 flex-1">
              {selected.length === 0 ? (
                <span className="text-sm">{placeholder}</span>
              ) : (
                <>
                  {selectedLabels.slice(0, 2).map((label, index) => (
                    <Badge
                      key={selected[index]}
                      variant="secondary"
                      className="text-xs px-2 py-0.5 bg-primary/10 text-primary border-primary/20"
                    >
                      {label}
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          handleRemove(selected[index])
                        }}
                        className="ml-1 hover:text-primary/70"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {selected.length > 2 && (
                    <Badge variant="outline" className="text-xs px-2 py-0.5">
                      +{selected.length - 2} more
                    </Badge>
                  )}
                </>
              )}
            </div>
            <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <Command>
            {showSearch && (
              <div className="flex items-center border-b px-3">
                <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                <CommandInput
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onValueChange={setSearchValue}
                  className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            )}
            <CommandList style={{ maxHeight }}>
              <CommandEmpty>
                {allowCustom && searchValue ? (
                  <div className="p-2">
                    <div className="text-sm text-muted-foreground mb-2">
                      No results found. Add custom item?
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        placeholder="Enter custom value"
                        className="flex-1 h-8"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddCustom()
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={handleAddCustom}
                        disabled={!customValue.trim()}
                        className="h-8 px-3"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                ) : (
                  "No results found."
                )}
              </CommandEmpty>
              <CommandGroup>
                {filteredOptions.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className="cursor-pointer"
                  >
                    <div className="flex items-center space-x-2 w-full">
                      <div
                        className={cn(
                          "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          selected.includes(option.value)
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible"
                        )}
                      >
                        <Check className="h-3 w-3" />
                      </div>
                      <span className="flex-1">{option.label}</span>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
              {allowCustom && !searchValue && (
                <CommandGroup>
                  <div className="p-2 border-t">
                    <div className="text-xs text-muted-foreground mb-2">
                      Add custom item:
                    </div>
                    <div className="flex gap-2">
                      <Input
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        placeholder="Enter custom value"
                        className="flex-1 h-8"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleAddCustom()
                          }
                        }}
                      />
                      <Button
                        size="sm"
                        onClick={handleAddCustom}
                        disabled={!customValue.trim()}
                        className="h-8 px-3"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}