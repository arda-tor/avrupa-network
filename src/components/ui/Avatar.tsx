import type { AvatarVariant } from "@/types";

interface AvatarProps {
  initial: string;
  variant?: AvatarVariant;
  size?: "sm" | "md" | "lg" | "xl";
  showStatus?: boolean;
}

export default function Avatar({ initial: _initial, variant: _variant, size: _size, showStatus: _showStatus }: AvatarProps) {
  // TODO: HTML'deki .avatar / .card-avatar a1..a6 gradientlerini variant'a göre uygula
  return <div />;
}
