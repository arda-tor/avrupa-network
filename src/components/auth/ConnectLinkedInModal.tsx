"use client";

import { useState } from "react";
import { getLinkedInConnectUrl } from "@/lib/auth-api";
import { isApiErrorResponse } from "@/types/auth";

interface ConnectLinkedInModalProps {
  onDismiss: () => void;
}

export default function ConnectLinkedInModal({ onDismiss }: ConnectLinkedInModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleConnect() {
    setLoading(true);
    setError(null);

    try {
      const resp = await getLinkedInConnectUrl();
      if (isApiErrorResponse(resp)) {
        setError(resp.error?.message ?? "LinkedIn bağlantısı başlatılamadı.");
        setLoading(false);
        return;
      }

      window.location.href = resp.authorizationUrl;
    } catch {
      setError("LinkedIn'e yönlendirme başarısız oldu.");
      setLoading(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 px-5 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="connect-linkedin-title"
      onClick={onDismiss}
    >
      <div
        className="w-full max-w-md rounded-[24px] border border-line bg-card p-8 text-center shadow-[0_24px_60px_rgba(26,26,26,.18)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full bg-bg">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-7 w-7" fill="#0A66C2">
            <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.12-4 0v5.6h-3v-11h3v1.76c1.4-2.59 7-2.78 7 2.48v6.76z" />
          </svg>
        </div>

        <h2
          id="connect-linkedin-title"
          className="font-serif text-[26px] font-medium tracking-[-0.03em] text-ink"
        >
          LinkedIn hesabını bağla
        </h2>
        <p className="mt-3 text-[15px] leading-6 text-ink-soft">
          LinkedIn profilini bağlayarak topluluğa güvenini artır ve bağlantılarının
          seni daha kolay bulmasını sağla.
        </p>

        {error ? (
          <div className="mt-4 rounded-xl border border-[#E11D48]/25 bg-[#E11D48]/5 px-4 py-3 text-[13px] text-[#E11D48]">
            {error}
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={handleConnect}
            disabled={loading}
            className="inline-flex min-h-12 w-full items-center justify-center gap-2.5 rounded-full bg-ink px-5 text-sm font-semibold text-bg transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading ? "Yönlendiriliyor..." : "LinkedIn ile bağla"}
          </button>
          <button
            type="button"
            onClick={onDismiss}
            className="min-h-11 text-[13px] font-semibold text-ink-soft transition hover:text-ink"
          >
            Daha sonra
          </button>
        </div>
      </div>
    </div>
  );
}
