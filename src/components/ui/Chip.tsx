import type { HTMLAttributes } from "react";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "mini";
}

export default function Chip({ variant: _variant = "default", ...props }: ChipProps) {
  // TODO: HTML'deki .chip / .chip.accent / .mini-chip stillerini variant'a göre uygula
  return <span {...props} />;
}
