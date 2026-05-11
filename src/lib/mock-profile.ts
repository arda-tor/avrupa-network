import type { AvatarVariant, User } from "@/types";

export interface EditableProfileLink {
  id: string;
  type: string;
  value: string;
}

export interface EditableProfile {
  avatarVariant: AvatarVariant;
  avatarImage: string | null;
  firstName: string;
  lastName: string;
  username: string;
  role: string;
  location: string;
  workStyle: string;
  shortBio: string;
  bio: string;
  bioTone: string;
  keywords: string[];
  skills: string[];
  links: EditableProfileLink[];
  showcaseWorks: string[];
  discoverable: boolean;
  connectionsOnlyEmail: boolean;
  profileViewNotifications: boolean;
  collaborationOpen: boolean;
  weeklyDigest: boolean;
}

export const MOCK_PROFILE_EVENT = "nexus-profile-change";

const PROFILE_DRAFT_KEY = "nexus-profile-draft";
const PROFILE_PUBLISHED_KEY = "nexus-profile-published";

export const defaultEditableProfile: EditableProfile = {
  avatarVariant: "a1",
  avatarImage: null,
  firstName: "Ayşe",
  lastName: "Yılmaz",
  username: "ayseyilmaz",
  role: "Ürün Tasarımcısı",
  location: "İstanbul",
  workStyle: "Her ikisi de — uzaktan & ofis",
  shortBio: "Erişilebilir dijital ürünler tasarlayan biri.",
  bio: "Dijital ürünler tasarlıyorum. Erişilebilirlik ve tipografi en büyük tutkum. Son 4 yıldır bir fintech şirketinde çalışıyorum, haftada bir de bağımsız projeler yapıyorum. Yeni insanlarla fikir alışverişine her zaman açığım.",
  bioTone: "Profesyonel",
  keywords: ["Erişilebilirlik"],
  skills: [
    "UI Tasarım",
    "Figma",
    "Tipografi",
    "Prototipleme",
    "Kullanıcı Araştırması",
    "Erişilebilirlik",
    "Motion",
    "HTML/CSS",
  ],
  links: [
    { id: "website", type: "Website", value: "https://ayseyilmaz.studio" },
    { id: "dribbble", type: "Dribbble", value: "https://dribbble.com/ayseyilmaz" },
    { id: "github", type: "GitHub", value: "https://github.com/ayseyilmaz" },
    { id: "email", type: "E-posta", value: "ayse@ayseyilmaz.studio" },
  ],
  showcaseWorks: ["Akış Revamp", "Design System Sprint", "Fintech Onboarding"],
  discoverable: true,
  connectionsOnlyEmail: true,
  profileViewNotifications: true,
  collaborationOpen: true,
  weeklyDigest: true,
};

function cloneProfile(profile: EditableProfile) {
  return JSON.parse(JSON.stringify(profile)) as EditableProfile;
}

function safeParseProfile(raw: string | null) {
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as EditableProfile;
    return {
      ...cloneProfile(defaultEditableProfile),
      ...parsed,
      keywords: Array.isArray(parsed.keywords) ? parsed.keywords : defaultEditableProfile.keywords,
      skills: Array.isArray(parsed.skills) ? parsed.skills : defaultEditableProfile.skills,
      links: Array.isArray(parsed.links) ? parsed.links : defaultEditableProfile.links,
      showcaseWorks: Array.isArray(parsed.showcaseWorks)
        ? parsed.showcaseWorks
        : defaultEditableProfile.showcaseWorks,
    };
  } catch {
    return null;
  }
}

export function emitProfileChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(MOCK_PROFILE_EVENT));
}

export function readPublishedProfile() {
  if (typeof window === "undefined") return cloneProfile(defaultEditableProfile);

  return safeParseProfile(window.localStorage.getItem(PROFILE_PUBLISHED_KEY)) ?? cloneProfile(defaultEditableProfile);
}

export function readProfileDraft() {
  if (typeof window === "undefined") return cloneProfile(defaultEditableProfile);

  return safeParseProfile(window.localStorage.getItem(PROFILE_DRAFT_KEY)) ?? readPublishedProfile();
}

export function writeProfileDraft(profile: EditableProfile) {
  if (typeof window === "undefined") return profile;

  window.localStorage.setItem(PROFILE_DRAFT_KEY, JSON.stringify(profile));
  emitProfileChange();
  return profile;
}

export function publishProfile(profile: EditableProfile) {
  if (typeof window === "undefined") return profile;

  window.localStorage.setItem(PROFILE_DRAFT_KEY, JSON.stringify(profile));
  window.localStorage.setItem(PROFILE_PUBLISHED_KEY, JSON.stringify(profile));
  emitProfileChange();
  return profile;
}

export function resetDraftToPublished() {
  const published = readPublishedProfile();
  writeProfileDraft(published);
  return published;
}

export function getProfileName(profile: EditableProfile) {
  return `${profile.firstName} ${profile.lastName}`.trim() || "İsimsiz Kullanıcı";
}

export function getProfileInitial(profile: EditableProfile) {
  const source = profile.firstName.trim() || profile.lastName.trim() || "A";
  return source.charAt(0).toUpperCase();
}

export function getProfileSummarySkills(profile: EditableProfile, limit = 4) {
  if (profile.skills.length <= limit) return profile.skills;

  const visibleSkills = profile.skills.slice(0, limit);
  return [...visibleSkills, `+${profile.skills.length - limit} daha`];
}

export function profileToUser(profile: EditableProfile): User {
  return {
    id: "me",
    name: getProfileName(profile),
    initial: getProfileInitial(profile),
    role: profile.role,
    location: profile.location,
    bio: profile.bio,
    skills: profile.skills,
    avatarVariant: profile.avatarVariant,
  };
}

export function normalizeProfileLinkHref(link: EditableProfileLink) {
  const rawValue = link.value.trim();
  if (!rawValue) return "";

  if (link.type === "E-posta") {
    return `mailto:${rawValue}`;
  }

  if (link.type === "Telefon") {
    return `tel:${rawValue.replace(/[^\d+]/g, "")}`;
  }

  if (/^https?:\/\//i.test(rawValue)) {
    return rawValue;
  }

  if (rawValue.startsWith("mailto:") || rawValue.startsWith("tel:")) {
    return rawValue;
  }

  return `https://${rawValue.replace(/^\/+/, "")}`;
}

export function formatProfileLinkValue(link: EditableProfileLink) {
  const href = normalizeProfileLinkHref(link);
  return href
    .replace(/^https?:\/\//i, "")
    .replace(/^mailto:/i, "")
    .replace(/^tel:/i, "");
}

export function getPrimaryEmailHref(links: EditableProfileLink[]) {
  const emailLink = links.find((link) => link.type === "E-posta" && link.value.trim());
  return emailLink ? normalizeProfileLinkHref(emailLink) : "";
}
