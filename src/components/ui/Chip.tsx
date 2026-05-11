import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "accent" | "mini";
}

const variantClass: Record<string, string> = {
  default: "chip",
  accent: "chip accent",
  mini: "mini-chip",
};

export default function Chip({ variant = "default", className, ...props }: ChipProps) {
  return <span className={cn(variantClass[variant], className)} {...props} />;
}
