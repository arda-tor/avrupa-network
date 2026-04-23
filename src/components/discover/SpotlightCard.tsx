import type { User } from "@/types";

interface SpotlightCardProps {
  user: User;
}

export default function SpotlightCard({ user: _user }: SpotlightCardProps) {
  // TODO: HTML'deki .card.spotlight bloğunu buraya taşı
  return <article />;
}
