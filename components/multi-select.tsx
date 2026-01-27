"use client"
import * as React from "react";
import { Check, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface MultiSelectProps {
  options: readonly string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyMessage?: string;
  className?: string;
  maxDisplay?: number;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select options...",
  searchPlaceholder = "Search...",
  emptyMessage = "No results found.",
  className,
  maxDisplay = 3,
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleToggle = (value: string) => {
    if (selected.includes(value)) {
      onChange(selected.filter((item) => item !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  const handleRemove = (value: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onChange(selected.filter((item) => item !== value));
  };
  const safeSelected = React.useMemo<string[]>(() => {
    return Array.isArray(selected) ? selected : [];
  }, [selected]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "flex min-h-10 w-full items-center justify-between rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background",
            "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "hover:border-primary/50 transition-colors",
            className
          )}
        >
          <div className="flex flex-wrap gap-1.5">
            {safeSelected.length === 0 && (
              <span className="text-muted-foreground">{placeholder}</span>
            )}
            {safeSelected.slice(0, maxDisplay)?.map((value) => (
              <Badge
                key={value}
                variant="default"
                className="rounded-md px-2 py-0.5 text-xs font-normal"
              >
                {value}
                <button
                  type="button"
                  className="ml-1 rounded-full outline-none hover:bg-muted-foreground/20"
                  onClick={(e) => handleRemove(value, e)}
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}

            {selected.length > maxDisplay && (
              <Badge
                variant="default"
                className="rounded-md px-2 py-0.5 text-xs font-normal"
              >
                +{selected.length - maxDisplay} more
              </Badge>
            )}
          </div>
          <ChevronDown className="h-4 w-4 shrink-0 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0" align="start">
        <Command>
          <CommandInput placeholder={searchPlaceholder} />
          <CommandList>
            <CommandEmpty>{emptyMessage}</CommandEmpty>
            <CommandGroup className="max-h-64 overflow-auto">
              {options.map((option) => (
                <CommandItem
                  key={option}
                  value={option}
                  onSelect={() => handleToggle(option)}
                  className="cursor-pointer"
                >
                  <div
                    className={cn(
                      "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                      selected.includes(option)
                        ? "bg-primary text-primary-foreground"
                        : "opacity-50"
                    )}
                  >
                    {selected.includes(option) && (
                      <Check className="h-3 w-3" />
                    )}
                  </div>
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
