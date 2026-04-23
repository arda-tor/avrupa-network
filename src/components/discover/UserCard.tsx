"use client";

import type { User } from "@/types";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user: _user }: UserCardProps) {
  // TODO: HTML'deki .card (spotlight olmayan) bloğunu buraya taşı
  // Bağlan butonu: HTML'deki script bloğundaki toggle davranışını useState ile yap
  return <article />;
}
