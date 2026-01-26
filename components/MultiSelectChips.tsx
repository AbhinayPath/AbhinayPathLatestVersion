import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface MultiSelectChipsProps<T extends string> {
  options: readonly T[];
  selected: T[];
  onChange: (selected: T[]) => void;
  className?: string;
}

export function MultiSelectChips<T extends string>({
  options,
  selected,
  onChange,
  className,
}: MultiSelectChipsProps<T>) {
  const toggleOption = (option: T) => {
    if (selected.includes(option)) {
      onChange(selected.filter((item) => item !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {options.map((option) => {
        const isSelected = selected.includes(option);
        return (
          <button
            key={option}
            type="button"
            onClick={() => toggleOption(option)}
            className={cn(
              "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200",
              "border focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
              isSelected
                ? "bg-primary text-primary-foreground border-primary shadow-soft"
                : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-secondary"
            )}
          >
            {isSelected && <Check className="w-3.5 h-3.5" />}
            {option}
          </button>
        );
      })}
    </div>
  );
}
