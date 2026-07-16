export type AvatarVariant = "a1" | "a2" | "a3" | "a4" | "a5" | "a6";

export interface User {
  id: string;
  username: string;
  name: string;
  initial: string;
  role: string;
  location: string;
  bio: string;
  skills: string[];
  avatarVariant: AvatarVariant;
  spotlight?: boolean;
  spotlightTag?: string;
}

export interface FilterOption {
  id: string;
  label: string;
}
