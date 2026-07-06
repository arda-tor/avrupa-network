"use client";

import { useState } from "react";
import { disconnectLinkedIn, getLinkedInConnectUrl } from "@/lib/auth-api";
import { isApiErrorResponse } from "@/types/auth";

interface ConnectLinkedInButtonProps {
  connected?: boolean;
  onError?: (message: string) => void;
  onDisconnected?: () => void;
}

export default function ConnectLinkedInButton({
  connected = false,
  onError,
  onDisconnected,
}: ConnectLinkedInButtonProps) {
  const [loading, setLoading] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  async function handleConnect() {
    setLoading(true);

    try {
      const resp = await getLinkedInConnectUrl();
      if (isApiErrorResponse(resp)) {
        onError?.(resp.error?.message ?? "LinkedIn bağlantısı başlatılamadı.");
        setLoading(false);
        return;
      }

      window.location.href = resp.authorizationUrl;
    } catch {
      onError?.("LinkedIn'e yönlendirme başarısız oldu.");
      setLoading(false);
    }
  }

  async function handleDisconnect() {
    setDisconnecting(true);

    const resp = await disconnectLinkedIn();
    if (isApiErrorResponse(resp)) {
      onError?.(resp.error?.message ?? "LinkedIn bağlantısı kaldırılamadı.");
      setDisconnecting(false);
      return;
    }

    onDisconnected?.();
    setDisconnecting(false);
  }

  if (connected) {
    return (
      <div className="flex items-center gap-3">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#2D4A3E]/30 bg-[#2D4A3E]/10 px-4 py-2 text-[13px] font-semibold text-[#2D4A3E]">
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Bağlı
        </span>
        <button
          type="button"
          onClick={handleDisconnect}
          disabled={disconnecting}
          className="text-[13px] font-semibold text-[#E11D48] transition hover:underline disabled:cursor-not-allowed disabled:opacity-60"
        >
          {disconnecting ? "Kaldırılıyor..." : "Bağlantıyı kes"}
        </button>
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={handleConnect}
      disabled={loading}
      className="inline-flex min-h-10 items-center justify-center gap-2 rounded-full bg-ink px-4 text-[13px] font-semibold text-bg transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? "Yönlendiriliyor..." : "LinkedIn ile bağla"}
    </button>
  );
}
