"use client";

import Link from "next/link";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

const ERROR_MESSAGES: Record<string, string> = {
  auth_linkedin_email_missing: "LinkedIn hesabınızdan email bilgisi alınamadı.",
  auth_linkedin_email_unverified: "LinkedIn email adresiniz doğrulanmamış.",
  auth_linkedin_email_mismatch: "LinkedIn email'iniz hesap email'inizle eşleşmiyor.",
  auth_linkedin_already_connected: "Bu LinkedIn hesabı başka bir kullanıcıya bağlı.",
  auth_linkedin_denied: "LinkedIn yetkilendirmesi reddedildi.",
  user_cancelled_login: "LinkedIn girişini iptal ettiniz.",
  user_cancelled_authorize: "LinkedIn izni verilmedi.",
};

function LinkedInErrorContent() {
  const code = useSearchParams().get("error");
  const message =
    (code && ERROR_MESSAGES[code]) ||
    "LinkedIn ile giriş sırasında bir sorun oluştu. Lütfen tekrar deneyin.";

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="w-full max-w-md rounded-[24px] border border-line bg-card p-8 text-center shadow-[0_18px_40px_rgba(26,26,26,.06)]">
        <h1 className="font-serif text-[28px] font-medium tracking-[-0.03em] text-ink">
          Giriş yapılamadı
        </h1>
        <p className="mt-3 text-[15px] leading-6 text-ink-soft">{message}</p>

        <Link
          href="/giris"
          className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-white transition hover:bg-ink"
        >
          Girişe geri dön
        </Link>
      </div>
    </div>
  );
}

export default function LinkedInErrorPage() {
  return (
    <Suspense fallback={null}>
      <LinkedInErrorContent />
    </Suspense>
  );
}
