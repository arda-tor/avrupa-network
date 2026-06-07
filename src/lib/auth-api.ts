import type {
  ApiErrorResponse,
  CsrfResponse,
  CurrentUser,
  LoginInput,
  LoginResponse,
  RegisterInput,
  SearchUser,
  SearchUsersParams,
  UnifiedResponse,
  UpdateProfileInput,
} from "@/types/auth";
import { isApiErrorResponse } from "@/types/auth";
import { redirect } from "next/navigation";

const API_URL = process.env.NEXT_PUBLIC_API_URL!;

async function readError(response: Response): Promise<ApiErrorResponse> {
  const data = (await response.json().catch(() => null)) as ApiErrorResponse | null;
  if (data) return data;

  return {
    error: {
      code: response.status.toString(),
      message: "An error occurred",
      details: null,
    },
    timestamp: new Date().toISOString(),
  };
}

export async function getCsrfToken(): Promise<UnifiedResponse<CsrfResponse>> {
   const resp = await baseRequest<CsrfResponse>("/auth/csrf", "GET");
   return resp;
}

export async function login(input: LoginInput): Promise<UnifiedResponse<LoginResponse>> {
  const csrf = await getCsrfToken();
  if (isApiErrorResponse(csrf)) return csrf;

  const resp = await baseRequest<LoginResponse>("/auth/login", "POST", input, { [csrf.headerName]: csrf.csrfToken });

  return resp;
}

export async function register(input: RegisterInput): Promise<UnifiedResponse<LoginResponse>> {
  const csrf = await getCsrfToken();
  if (isApiErrorResponse(csrf)) return csrf;

  return baseRequest<LoginResponse>("/auth/register", "POST", input, { [csrf.headerName]: csrf.csrfToken });
}

export async function getMe(): Promise<UnifiedResponse<{ user: CurrentUser }>> {
  const resp = await baseRequest<{ user: CurrentUser }>("/auth/me", "GET");
  return resp;
}

export async function updateProfile(input: UpdateProfileInput): Promise<UnifiedResponse<{ user: CurrentUser }>> {
  const csrf = await getCsrfToken();
  if (isApiErrorResponse(csrf)) return csrf;

  return baseRequest<{ user: CurrentUser }>("/auth/me", "PATCH", input, { [csrf.headerName]: csrf.csrfToken });
}

export async function logout(): Promise<UnifiedResponse<void>> {
  const csrf = await getCsrfToken();
  if (isApiErrorResponse(csrf)) return csrf;

  return baseRequest<void>("/auth/logout", "POST", undefined, { [csrf.headerName]: csrf.csrfToken });
}

export async function deleteAccount(): Promise<UnifiedResponse<void>> {
  const csrf = await getCsrfToken();
  if (isApiErrorResponse(csrf)) return csrf;

  return baseRequest<void>("/auth/me", "DELETE", undefined, { [csrf.headerName]: csrf.csrfToken });
}

export async function searchUsers(params: SearchUsersParams): Promise<UnifiedResponse<{ users: SearchUser[] }>> {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && `${value}`.trim() !== "") {
      query.set(key, String(value));
    }
  });
  const suffix = query.toString() ? `?${query.toString()}` : "";

  return baseRequest<{ users: SearchUser[] }>(`/users/search${suffix}`, "GET");
}

type METHODS = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

async function baseRequest<T>(endpoint: string, method: METHODS = "GET", body?: unknown, headers?: Record<string, string>, redirectUrl?: string): Promise<UnifiedResponse<T>> {
  const response = await fetch(`${API_URL}${endpoint}`, {
      method: method,
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    if (response.status === 401) {
      redirectUrl && redirect(redirectUrl)
    };

    if (!response.ok) {
      const data = await readError(response);
      return {
        ...data,
        path: data.path ?? endpoint,
      };
    }

    // 204 No Content (logout, delete) or otherwise empty body: nothing to parse.
    if (response.status === 204 || response.headers.get("content-length") === "0") {
      return undefined as T;
    }

    return response.json();
}
