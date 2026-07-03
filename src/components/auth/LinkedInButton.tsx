"use client";

import { useState } from "react";
import { getLinkedInLoginUrl } from "@/lib/auth-api";
import { ApiErrorResponse, isApiErrorResponse } from "@/types/auth";

interface LinkedInButtonProps {
  label?: string;
  onError?: (error: ApiErrorResponse) => void;
}

export default function LinkedInButton({
  label = "LinkedIn ile devam et",
  onError,
}: LinkedInButtonProps) {
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    setLoading(true);

    try {
      const resp = await getLinkedInLoginUrl();
      if (isApiErrorResponse(resp)) {
        onError?.(resp);
        setLoading(false);
        return;
      }

      window.location.href = resp.authorizationUrl;
    } catch {
      onError?.({
        error: { message: "LinkedIn'e yönlendirme başarısız oldu." },
        timestamp: new Date().toISOString(),
      });
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full border border-line bg-bg px-5 text-sm font-semibold text-ink transition hover:border-accent hover:bg-card disabled:cursor-not-allowed disabled:opacity-70"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[18px] w-[18px]"
        fill="#0A66C2"
      >
        <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.12-4 0v5.6h-3v-11h3v1.76c1.4-2.59 7-2.78 7 2.48v6.76z" />
      </svg>
      {loading ? "Yönlendiriliyor..." : label}
    </button>
  );
}
