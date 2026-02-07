// app/buscar/components/filter-inputs.tsx
"use client";

import { ChevronDown, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { SelectOption } from "../types";

// =============================================================================
// FILTER SELECT
// =============================================================================

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  icon?: React.ElementType;
}

export function FilterSelect({
  label,
  value,
  onChange,
  options,
  icon: Icon,
}: FilterSelectProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={label} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        )}
        <select
          id={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            "w-full appearance-none rounded-xl border-2 border-slate-200 bg-white",
            "py-3 pr-10 text-sm text-slate-800",
            "focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20",
            "transition-all duration-200",
            Icon ? "pl-10" : "pl-4"
          )}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      </div>
    </div>
  );
}

// =============================================================================
// FILTER INPUT
// =============================================================================

interface FilterInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon?: React.ElementType;
  type?: string;
}

export function FilterInput({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  type = "text",
}: FilterInputProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={label} className="text-sm font-medium text-slate-700">
        {label}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
        )}
        <input
          id={label}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "w-full rounded-xl border-2 border-slate-200 bg-white",
            "py-3 pr-4 text-sm text-slate-800 placeholder:text-slate-400",
            "focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20",
            "transition-all duration-200",
            Icon ? "pl-10" : "pl-4"
          )}
        />
      </div>
    </div>
  );
}

// =============================================================================
// RATING FILTER
// =============================================================================

interface RatingFilterProps {
  value: string;
  onChange: (value: string) => void;
}

export function RatingFilter({ value, onChange }: RatingFilterProps) {
  const ratings = ["", "4", "4.5"];

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-slate-700">Calificación mínima</label>
      <div className="flex gap-2">
        {ratings.map((rating) => (
          <button
            key={rating}
            onClick={() => onChange(rating)}
            type="button"
            className={cn(
              "flex-1 py-2.5 px-3 rounded-xl text-sm font-medium",
              "border-2 transition-all duration-200",
              value === rating
                ? "border-amber-400 bg-amber-50 text-amber-700"
                : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
            )}
          >
            {rating === "" ? "Todas" : `${rating}+`}
            {rating && <Star className="inline w-3 h-3 ml-1 fill-amber-400 text-amber-400" />}
          </button>
        ))}
      </div>
    </div>
  );
}