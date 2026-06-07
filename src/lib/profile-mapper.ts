import type { CurrentUser, ProfileField, SearchUser, UpdateProfileInput } from "@/types/auth";
import type { AvatarVariant, User } from "@/types";
import type { EditableProfile, EditableProfileLink } from "@/lib/mock-profile";

const AVATAR_VARIANTS: AvatarVariant[] = ["a1", "a2", "a3", "a4", "a5", "a6"];

/**
 * Baseline used when seeding the editor for a user that has no profile fields yet
 * (e.g. a freshly registered account). Intentionally empty — unlike the demo
 * `defaultEditableProfile`, this does not carry placeholder content.
 */
export const emptyEditableProfile: EditableProfile = {
  avatarVariant: "a1",
  avatarImage: null,
  firstName: "",
  lastName: "",
  username: "",
  role: "",
  location: "",
  workStyle: "",
  shortBio: "",
  bio: "",
  bioTone: "Profesyonel",
  keywords: [],
  skills: [],
  links: [],
  showcaseWorks: [],
  discoverable: true,
  connectionsOnlyEmail: true,
  profileViewNotifications: true,
  collaborationOpen: true,
  weeklyDigest: true,
};

function toFieldMap(fields: ProfileField[]): Map<string, string> {
  const map = new Map<string, string>();
  for (const field of fields) {
    map.set(field.key, field.rawValue);
  }
  return map;
}

function parseStringArray(raw: string | undefined, fallback: string[] = []): string[] {
  if (!raw) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : fallback;
  } catch {
    return fallback;
  }
}

function parseLinks(raw: string | undefined): EditableProfileLink[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter((item) => item && typeof item === "object")
      .map((item, index) => ({
        id: typeof item.id === "string" ? item.id : `link-${index}`,
        type: typeof item.type === "string" ? item.type : "Website",
        value: typeof item.value === "string" ? item.value : "",
      }));
  } catch {
    return [];
  }
}

function parseBoolean(raw: string | undefined, fallback: boolean): boolean {
  if (raw === undefined) return fallback;
  return raw === "true";
}

function asAvatarVariant(raw: string | undefined): AvatarVariant {
  return AVATAR_VARIANTS.includes(raw as AvatarVariant) ? (raw as AvatarVariant) : "a1";
}

function splitFullName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

/** Backend CurrentUser -> rich editor profile (round-trip in). */
export function currentUserToEditable(user: CurrentUser): EditableProfile {
  const fields = toFieldMap(user.profileFields);
  const fallbackName = splitFullName(user.fullName);

  return {
    ...emptyEditableProfile,
    avatarVariant: asAvatarVariant(fields.get("avatarVariant")),
    avatarImage: fields.get("avatarImage") ?? user.avatarUrl ?? null,
    firstName: fields.get("firstName") ?? fallbackName.firstName,
    lastName: fields.get("lastName") ?? fallbackName.lastName,
    username: fields.get("username") ?? "",
    role: fields.get("role") ?? fields.get("jobTitle") ?? "",
    location: fields.get("city") ?? "",
    workStyle: fields.get("workStyle") ?? "",
    shortBio: fields.get("shortBio") ?? "",
    bio: fields.get("bio") ?? "",
    bioTone: fields.get("bioTone") ?? emptyEditableProfile.bioTone,
    keywords: parseStringArray(fields.get("keywords")),
    skills: parseStringArray(fields.get("skills")),
    links: parseLinks(fields.get("links")),
    showcaseWorks: parseStringArray(fields.get("showcaseWorks")),
    discoverable: parseBoolean(fields.get("discoverable"), emptyEditableProfile.discoverable),
    connectionsOnlyEmail: parseBoolean(fields.get("connectionsOnlyEmail"), emptyEditableProfile.connectionsOnlyEmail),
    profileViewNotifications: parseBoolean(fields.get("profileViewNotifications"), emptyEditableProfile.profileViewNotifications),
    collaborationOpen: parseBoolean(fields.get("collaborationOpen"), emptyEditableProfile.collaborationOpen),
    weeklyDigest: parseBoolean(fields.get("weeklyDigest"), emptyEditableProfile.weeklyDigest),
  };
}

/** Rich editor profile -> backend PATCH /auth/me payload (round-trip out). */
export function editableToUpdateFields(profile: EditableProfile): UpdateProfileInput {
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  const scalar = (value: string): string | null => {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : null;
  };

  const fields: { key: string; value: string | null }[] = [
    { key: "firstName", value: scalar(profile.firstName) },
    { key: "lastName", value: scalar(profile.lastName) },
    { key: "username", value: scalar(profile.username) },
    { key: "role", value: scalar(profile.role) },
    // Mirror role into the searchable jobTitle field.
    { key: "jobTitle", value: scalar(profile.role) },
    // location is stored under the searchable city field.
    { key: "city", value: scalar(profile.location) },
    { key: "workStyle", value: scalar(profile.workStyle) },
    { key: "shortBio", value: scalar(profile.shortBio) },
    { key: "bio", value: scalar(profile.bio) },
    { key: "bioTone", value: scalar(profile.bioTone) },
    { key: "avatarVariant", value: profile.avatarVariant },
    { key: "avatarImage", value: profile.avatarImage },
    { key: "skills", value: JSON.stringify(profile.skills) },
    { key: "keywords", value: JSON.stringify(profile.keywords) },
    { key: "links", value: JSON.stringify(profile.links) },
    { key: "showcaseWorks", value: JSON.stringify(profile.showcaseWorks) },
    { key: "discoverable", value: String(profile.discoverable) },
    { key: "connectionsOnlyEmail", value: String(profile.connectionsOnlyEmail) },
    { key: "profileViewNotifications", value: String(profile.profileViewNotifications) },
    { key: "collaborationOpen", value: String(profile.collaborationOpen) },
    { key: "weeklyDigest", value: String(profile.weeklyDigest) },
  ];

  return { fullName: fullName.length > 0 ? fullName : undefined, fields };
}

/** Backend search result -> UI card model used across discovery pages. */
export function searchUserToUser(dto: SearchUser): User {
  const fields = toFieldMap(dto.profileFields);
  const name = dto.fullName.trim() || "İsimsiz Kullanıcı";

  return {
    id: dto.id,
    name,
    initial: name.charAt(0).toUpperCase(),
    role: fields.get("role") ?? fields.get("jobTitle") ?? "",
    location: fields.get("city") ?? "",
    bio: fields.get("bio") ?? "",
    skills: parseStringArray(fields.get("skills")),
    avatarVariant: asAvatarVariant(fields.get("avatarVariant")),
  };
}
