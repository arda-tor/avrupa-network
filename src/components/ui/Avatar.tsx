import type { AvatarVariant } from "@/types";
import { cn } from "@/lib/utils";

interface AvatarProps {
  initial: string;
  variant?: AvatarVariant;
  size?: "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
}

const sizeClass: Record<string, string> = {
  sm: "card-avatar",
  md: "pv-avatar",
  lg: "avatar",
  xl: "avatar-big",
};

export default function Avatar({ initial, variant = "a1", size = "sm", showStatus: _showStatus }: AvatarProps) {
  const base = sizeClass[size];
  const variantClass = size === "sm" || size === "md" ? variant : "";
  return (
    <div className={cn(base, variantClass)}>
      {initial}
    </div>
  );
}
