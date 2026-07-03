"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getMe } from "@/lib/auth-api";
import { useAuth } from "@/store/auth";
import { isApiErrorResponse } from "@/types/auth";

export default function LinkedInSuccessPage() {
  const router = useRouter();
  const { setUserState } = useAuth();

  useEffect(() => {
    let active = true;

    (async () => {
      const resp = await getMe();
      if (!active) return;

      if (isApiErrorResponse(resp)) {
        router.replace("/giris");
        return;
      }

      setUserState(resp.user);
      router.replace("/");
    })();

    return () => {
      active = false;
    };
  }, [router, setUserState]);

  return (
    <div className="flex min-h-screen items-center justify-center px-5">
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-accent" />
        <p className="text-[15px] text-ink-soft">Giriş tamamlanıyor...</p>
      </div>
    </div>
  );
}
