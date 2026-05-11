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
}

export interface LoginResponse {
  user: CurrentUser;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface ApiErrorResponse {
  error?: {
    code?: string;
    message?: string;
    kkdetails?: unknown;
  };
  path?: string;
  timestamp?: string;
}

export type UnifiedResponse<T> = T | ApiErrorResponse;

export function isApiErrorResponse(value: unknown): value is ApiErrorResponse {
  return typeof value === "object" && value !== null && "error" in value;
}
