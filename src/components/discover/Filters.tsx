"use client";

import type { FilterOption } from "@/types";

interface FiltersProps {
  options: FilterOption[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function Filters({ options, activeId, onChange }: FiltersProps) {
  return (
    <div className="filters">
      <span className="filter-label">Filtrele:</span>
      {options.map((option) => (
        <button
          key={option.id}
          type="button"
          className={`filter${activeId === option.id ? " active" : ""}`}
          aria-pressed={activeId === option.id}
          onClick={() => onChange(option.id)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
