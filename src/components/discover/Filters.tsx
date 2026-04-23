"use client";

import type { FilterOption } from "@/types";

interface FiltersProps {
  options: FilterOption[];
  activeId: string;
  onChange: (id: string) => void;
}

export default function Filters({ options: _options, activeId: _activeId, onChange: _onChange }: FiltersProps) {
  // TODO: HTML'deki .filters bloğunu buraya taşı, buton aktif state'ini onChange ile yönet
  return <div />;
}
