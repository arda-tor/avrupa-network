export interface CsrfResponse {
  csrfToken: string;
  headerName: string;
  cookieName: string;
}

export interface ProfileField {
  key: string;
  rawValue: string;
  normalizedValue: string | null;
  resolvedUrl: string | null;
  source: "MANUAL" | "PROVIDER_LINKEDIN";
}

export interface CurrentUser {
  id: string;
  fullName: string;
  email: string | null;
  avatarUrl: string | null;
  profileFields: ProfileField[];
  linkedInConnected: boolean;
}

export interface SearchUser {
  id: string;
  fullName: string;
  avatarUrl: string | null;
  profileFields: ProfileField[];
}

export interface LoginResponse {
  user: CurrentUser;
}

export interface AuthorizationUrlResponse {
  authorizationUrl: string;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  email: string;
  password: string;
  fullName: string;
}

export interface UpdateProfileInput {
  fullName?: string;
  fields: { key: string; value: string | null }[];
}

export interface SearchUsersParams {
  name?: string;
  city?: string;
  country?: string;
  jobTitle?: string;
  company?: string;
  interest?: string;
  limit?: number;
}

export interface ApiErrorResponse {
  error?: {
    code?: string;
    message?: string;
    details?: unknown;
  };
  path?: string;
  timestamp?: string;
}

export type UnifiedResponse<T> = T | ApiErrorResponse;

export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return typeof value === "object" && value !== null && "error" in value;
}
