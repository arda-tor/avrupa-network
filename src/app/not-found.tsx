import Link from "next/link";
import Navbar from "@/components/layout/Navbar";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-screen max-w-[1440px] flex-col px-5 md:px-10">
      <Navbar />

      <main className="flex flex-1 flex-col items-center justify-center py-20 text-center">
        <div className="animate-[fadeUp_.8s_cubic-bezier(.2,.7,.2,1)_both]">
          <div className="mx-auto mb-8 inline-flex items-center justify-center gap-2 font-mono text-[12px] uppercase tracking-[0.2em] text-mute">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Hata 404
          </div>

          <h1 className="mb-6 font-serif text-[clamp(60px,10vw,120px)] font-normal leading-[0.9] tracking-[-0.04em] text-ink">
            Kayıp mı <em className="italic text-accent">oldun?</em>
          </h1>

          <p className="mx-auto mb-10 max-w-lg text-[18px] leading-[1.6] text-ink-soft">
            Aradığın sayfayı bulamadık. Bağlantı değişmiş veya sayfa tamamen kaldırılmış olabilir. Ana sayfaya dönerek yeni bağlantılar keşfetmeye devam edebilirsin.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link 
              href="/" 
              className="inline-flex h-14 items-center justify-center rounded-full bg-ink px-8 text-[15px] font-medium text-bg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Ana Sayfaya Dön
            </Link>
            <Link 
              href="/ara" 
              className="inline-flex h-14 items-center justify-center rounded-full border border-line bg-transparent px-8 text-[15px] font-medium text-ink transition-colors hover:border-ink/20 hover:bg-card"
            >
              Keşfetmeye Başla
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
