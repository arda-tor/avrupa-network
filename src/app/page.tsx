"use client";

import Link from "next/link";
import { useEffect } from "react";
import Hero from "@/components/hero/Hero";
import ClosingCta from "@/components/landing/ClosingCta";
import ForWhom from "@/components/landing/ForWhom";
import HeroCities from "@/components/landing/HeroCities";
import HowItWorks from "@/components/landing/HowItWorks";
import Principles from "@/components/landing/Principles";
import Navbar from "@/components/layout/Navbar";
import ConnectLinkedInModal from "@/components/auth/ConnectLinkedInModal";
import HomeSkeleton from "@/components/ui/HomeSkeleton";
import { getMe } from "@/lib/auth-api";
import { useAuth } from "@/store/auth";
import { isApiErrorResponse } from "@/types/auth";

export default function Home() {
  const { user, setUserState, loading, setLoading, linkedInPrompt, setLinkedInPrompt } = useAuth();

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!user) {
      setLoading(true);

      // Landing herkese acik: oturum yoksa login'e zorlamiyoruz, sadece
      // oturum varsa store'u dolduruyoruz. Misafir kullanici sayfayi gorur.
      getMe()
        .then((me) => {
          if (!isApiErrorResponse(me) && me?.user) {
            setUserState(me.user);
          }
        })
        .catch(() => {
          // Misafir olarak devam et.
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="wrap">
      <Navbar activePath="/" rightContentRequiresAuth />

      <section className="hero">
        <Hero
          tag="Davet usulü topluluk"
          title="Tanıdıktan"
          emphasis="tanıdığa."
          subtitle="Turkhub, Avrupa'da yaşayan Türklerin davetle kurulan kapalı topluluğu. Herkes birinin kefaletiyle içeride — bu yüzden tanıştığın herkese güvenebilirsin."
          actions={(
            <>
              <Link href="/kayit" className="btn-primary">Başvur</Link>
              <Link href="/giris" className="btn-secondary">Giriş yap</Link>
            </>
          )}
        />
        <HeroCities />
      </section>

      <HowItWorks />

      <Principles />

      <ForWhom />

      <ClosingCta />

      {user && linkedInPrompt ? (
        <ConnectLinkedInModal onDismiss={() => setLinkedInPrompt(false)} />
      ) : null}
    </div>
  );
}
