"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import LinkedInButton from "@/components/auth/LinkedInButton";
import { getMe, register } from "@/lib/auth-api";
import { useAuth } from "@/store/auth";
import { ApiErrorResponse, isApiErrorResponse } from "@/types/auth";

export default function RegisterPage() {
  const { setUserState, setLinkedInPrompt } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<ApiErrorResponse>();
  const [loading, setLoading] = useState(false);

  return (
    <div className="mx-auto min-h-screen max-w-[1440px] px-5 md:px-10">
      <Navbar />

      <section className="grid gap-10 py-14 md:grid-cols-[minmax(0,1fr)_460px] md:items-start md:py-16">
        <div className="animate-[fadeUp_.8s_cubic-bezier(.2,.7,.2,1)_both] md:pt-6">
          <div className="mb-6 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.15em] text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Topluluğa katıl
          </div>

          <h1 className="font-serif text-[clamp(52px,7vw,92px)] font-normal leading-[0.95] tracking-[-0.035em] text-ink">
            Yeni bir <em className="italic text-accent">hesap</em> oluştur.
          </h1>

          <p className="mt-6 max-w-xl text-[17px] leading-[1.5] text-ink-soft">
            Profilini oluştur, yeteneklerini paylaş ve yeni bağlantılar kurmaya
            başla.
          </p>
        </div>

        <div className="animate-[fadeUp_.8s_cubic-bezier(.2,.7,.2,1)_both] rounded-[24px] border border-line bg-card p-7 shadow-[0_18px_40px_rgba(26,26,26,.06)]">
          <div className="mb-6">
            <h2 className="font-serif text-[34px] font-medium tracking-[-0.03em] text-ink">
              Kayıt ol
            </h2>
            <p className="mt-2 text-sm leading-6 text-ink-soft">
              Birkaç bilgiyle hesabını hemen oluşturabilirsin.
            </p>
          </div>

          <form
            className="flex flex-col gap-4"
            onSubmit={async (event) => {
              event.preventDefault();
              setError(undefined);
              setLoading(true);

              try {
                const registerResp = await register({
                  fullName: name,
                  email,
                  password,
                });
                if (isApiErrorResponse(registerResp)) {
                  setError(registerResp);
                  return;
                }

                const resp = await getMe();
                if (isApiErrorResponse(resp)) {
                  setError(resp);
                  return;
                }

                setUserState(resp.user);
                setLinkedInPrompt(true);
                router.push("/");
              } finally {
                setLoading(false);
              }
            }}
          >
            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                Ad soyad
              </span>
              <input
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Ayse Yilmaz"
                required
                className="w-full rounded-xl border border-line bg-bg px-4 py-[15px] text-[15px] text-ink outline-none transition placeholder:text-mute focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                E-posta
              </span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="örnek@mail.com"
                required
                className="w-full rounded-xl border border-line bg-bg px-4 py-[15px] text-[15px] text-ink outline-none transition placeholder:text-mute focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
            </label>

            <label className="flex flex-col gap-2">
              <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-ink-soft">
                Şifre
              </span>
              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="En az 8 karakter"
                minLength={8}
                required
                className="w-full rounded-xl border border-line bg-bg px-4 py-[15px] text-[15px] text-ink outline-none transition placeholder:text-mute focus:border-accent focus:ring-4 focus:ring-accent/10"
              />
            </label>

            {error ? (
              <div className="rounded-xl border border-[#E11D48]/25 bg-[#E11D48]/5 px-4 py-3 text-[13px] text-[#E11D48]">
                {error?.error?.message ?? "Kayıt sırasında bir hata oluştu."}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="mt-1 min-h-12 rounded-full bg-accent px-5 text-sm font-semibold text-white transition hover:bg-ink disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "Kayıt oluşturuluyor..." : "Kayıt ol"}
            </button>
          </form>

          <div className="my-5 flex items-center gap-3">
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-[11px] uppercase tracking-[0.1em] text-mute">
              veya
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <LinkedInButton label="LinkedIn ile kaydol" onError={setError} />

          <p className="mt-5 text-[13px] text-ink-soft">
            Zaten hesabın var mı?{" "}
            <Link href="/giris" className="font-semibold text-ink transition hover:text-accent">
              Giriş yap
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
