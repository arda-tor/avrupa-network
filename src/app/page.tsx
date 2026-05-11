"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Filters from "@/components/discover/Filters";
import SectionHeader from "@/components/discover/SectionHeader";
import SpotlightCard from "@/components/discover/SpotlightCard";
import UserCard from "@/components/discover/UserCard";
import Hero from "@/components/hero/Hero";
import ProfileCard from "@/components/hero/ProfileCard";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import HomeSkeleton from "@/components/ui/HomeSkeleton";
import { filters, users } from "@/data/users";
import {
  MOCK_PROFILE_EVENT,
  getProfileInitial,
  getProfileName,
  getProfileSummarySkills,
  readPublishedProfile,
  type EditableProfile,
} from "@/lib/mock-profile";
import { useConnectedUsersState } from "@/lib/mock-social";
import { useAuth } from "@/store/auth";
import { getMe } from "@/lib/auth-api";
import { isApiErrorResponse } from "@/types/auth";

function matchesHomeFilter(role: string, filterId: string, currentLocation: string) {
  const normalizedRole = role.toLowerCase();
  const normalizedLocation = currentLocation.toLowerCase();

  if (filterId === "all") return true;
  if (filterId === "design") return normalizedRole.includes("tasar") || normalizedRole.includes("illustrat");
  if (filterId === "dev") return normalizedRole.includes("yaz") || normalizedRole.includes("mimar");
  if (filterId === "writing") return normalizedRole.includes("yazar") || normalizedRole.includes("editor");
  if (filterId === "music") return normalizedRole.includes("ses") || normalizedRole.includes("muzik");
  if (filterId === "photo") return normalizedRole.includes("foto");
  if (filterId === "same-city") return normalizedLocation.includes("istanbul");
  if (filterId === "new") return ["5", "6", "7"].includes(role);

  return true;
}

function matchesUserFilter(userId: string, role: string, location: string, filterId: string, currentLocation: string) {
  if (filterId === "same-city") {
    const currentCity = currentLocation.split(",")[0]?.trim().toLowerCase() ?? currentLocation.toLowerCase();
    return location.toLowerCase().includes(currentCity);
  }

  if (filterId === "new") {
    return ["5", "6", "7"].includes(userId);
  }

  return matchesHomeFilter(role, filterId, currentLocation);
}

function getAvatarStyle(profile: EditableProfile) {
  if (!profile.avatarImage) return undefined;

  return {
    backgroundImage: `url(${profile.avatarImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  } as const;
}

export default function Home() {
  const { user, setUserState, loading, setLoading } = useAuth();
  const router = useRouter();
  const [profile, setProfile] = useState<EditableProfile>(readPublishedProfile());
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const { connectedUserIds, toggleConnectedUserId } = useConnectedUsersState();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncProfile = () => {
      setProfile(readPublishedProfile());
    };

    syncProfile();
    window.addEventListener("storage", syncProfile);
    window.addEventListener(MOCK_PROFILE_EVENT, syncProfile);

    if (!user) {
      setLoading(true);

      getMe()
        .then((me) => {
          if (isApiErrorResponse(me) || !me?.user) {
            router.push("/giris");
            return;
          }

          setUserState(me.user);
        })
        .catch(() => {
          router.push("/giris");
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }

    return () => {
      window.removeEventListener("storage", syncProfile);
      window.removeEventListener(MOCK_PROFILE_EVENT, syncProfile);
    };
  }, []);

  const visibleUsers = useMemo(
    () => users.filter((user) => matchesUserFilter(user.id, user.role, user.location, activeFilter, profile.location)),
    [activeFilter, profile.location]
  );

  const spotlightUser = visibleUsers.find((user) => user.spotlight);
  const regularUsers = visibleUsers.filter((user) => !user.spotlight);
  const summarySkills = getProfileSummarySkills(profile);
  const hasResults = Boolean(spotlightUser) || regularUsers.length > 0;
  const previewHref = "/profil/me";

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <div className="wrap">
      <Navbar
        activePath="/"
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
          title="Yetenegini"
          emphasis="goster,"
          subtitle="Profilini ac, ne yapabildigini anlat ve benzer dunyada gezen insanlarla tanis. Is degil, baglanti."
        />
        <ProfileCard
          name={getProfileName(profile)}
          role={profile.role}
          location={profile.location}
          bio={profile.shortBio || profile.bio}
          skills={summarySkills}
          avatarVariant={profile.avatarVariant}
          initial={profile.avatarImage ? "" : getProfileInitial(profile)}
          previewHref={previewHref}
          avatarStyle={getAvatarStyle(profile)}
        />
      </section>

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

      <Footer />
    </div>
  );
}
