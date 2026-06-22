"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Hero from "@/components/hero/Hero";
import ClosingCta from "@/components/landing/ClosingCta";
import ForWhom from "@/components/landing/ForWhom";
import HeroCities from "@/components/landing/HeroCities";
import HowItWorks from "@/components/landing/HowItWorks";
import Principles from "@/components/landing/Principles";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HomeSkeleton from "@/components/ui/HomeSkeleton";
import { getMe } from "@/lib/auth-api";
import { useAuth } from "@/store/auth";
import { isApiErrorResponse } from "@/types/auth";

export default function Home() {
  const { user, setUserState, loading, setLoading } = useAuth();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

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
      <Navbar
        activePath="/"
        rightContentRequiresAuth
        rightContent={(
          <input
            type="text"
            className="search"
            placeholder="Isim, yetenek, sehir ara..."
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            onKeyDown={(event) => {
              if (event.key !== "Enter") return;

              const nextPath = searchQuery.trim()
                ? `/ara?q=${encodeURIComponent(searchQuery.trim())}`
                : "/ara";

              router.push(nextPath);
            }}
          />
        )}
      />

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

      {/*
        Kesfet akisi (filtreler + profil grid'i) simdilik devre disi.
        Ileride ana sayfanin altina ya da ayri bir /kesfet rotasina tasinabilir.

        <SectionHeader title="Senin icin" emphasis="kesfet" />
        <Filters options={filters} activeId={activeFilter} onChange={setActiveFilter} />
        {hasResults ? (
          <section className="grid">
            {spotlightUser ? <SpotlightCard user={spotlightUser} /> : null}
            {regularUsers.map((user) => (
              <UserCard
                key={user.id}
                user={user}
                isConnected={connectedUserIds.includes(user.id)}
                onToggleConnect={toggleConnectedUserId}
              />
            ))}
          </section>
        ) : (
          <div className="network-empty">
            <div className="network-empty-icon">◌</div>
            <p>Bu filtre icin gorunur profil bulunamadi.</p>
            <button type="button" className="btn-ghost network-empty-link" onClick={() => setActiveFilter("all")}>
              Tumunu Goster
            </button>
          </div>
        )}
      */}

      <Footer />
    </div>
  );
}
