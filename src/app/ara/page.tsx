"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { searchUsers } from "@/lib/auth-api";
import { searchUserToUser } from "@/lib/profile-mapper";
import { useConnectedUsersState } from "@/lib/mock-social";
import { isApiErrorResponse } from "@/types/auth";
import type { User } from "@/types";

const categories = [
  { id: "design", label: "Tasarım", count: 412 },
  { id: "software", label: "Yazılım", count: 890 },
  { id: "art", label: "Sanat & İllüstrasyon", count: 204 },
  { id: "writing", label: "Yazarlık", count: 156 },
  { id: "photo", label: "Fotoğraf", count: 178 },
  { id: "music", label: "Müzik & Ses", count: 92 },
  { id: "data", label: "Veri & Araştırma", count: 143 },
];

const cityOptions = ["İstanbul", "Ankara", "İzmir", "Bursa", "Berlin", "Londra"];

function matchesCategory(role: string, catId: string) {
  const normalizedRole = role.toLowerCase();
  if (catId === "design") return normalizedRole.includes("tasar") || normalizedRole.includes("ux") || normalizedRole.includes("ui");
  if (catId === "software") return normalizedRole.includes("yaz") || normalizedRole.includes("geli") || normalizedRole.includes("muhendis");
  if (catId === "art") return normalizedRole.includes("illustrat") || normalizedRole.includes("sanat") || normalizedRole.includes("cizer") || normalizedRole.includes("3b");
  if (catId === "writing") return normalizedRole.includes("yazar") || normalizedRole.includes("editor");
  if (catId === "photo") return normalizedRole.includes("foto");
  if (catId === "music") return normalizedRole.includes("ses") || normalizedRole.includes("muzik");
  if (catId === "data") return normalizedRole.includes("veri") || normalizedRole.includes("bilim");
  return false;
}

function toggle(values: string[], item: string) {
  return values.includes(item) ? values.filter((value) => value !== item) : [...values, item];
}

function ConnectButton({ userId }: { userId: string }) {
  const { connectedUserIds, toggleConnectedUserId } = useConnectedUsersState();
  const isConnected = connectedUserIds.includes(userId);

  return (
    <button
      type="button"
      className={`sh-connect${isConnected ? " sent" : ""}`}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggleConnectedUserId(userId);
      }}
    >
      {isConnected ? "✓ Eklendi" : "+ Ekle"}
    </button>
  );
}

export default function SearchPage() {
  const [query, setQuery] = useState(() => {
    if (typeof window === "undefined") return "";
    return new URLSearchParams(window.location.search).get("q") ?? "";
  });
  const [activeCats, setActiveCats] = useState<string[]>([]);
  const [activeCities, setActiveCities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("name");
  const [visibleCount, setVisibleCount] = useState(6);
  const [fetchedUsers, setFetchedUsers] = useState<User[]>([]);
  const [searchError, setSearchError] = useState("");

  // Debounced backend search: free text -> name, first selected city -> city.
  // Category filtering stays client-side (no matching backend field).
  useEffect(() => {
    let cancelled = false;

    const timeout = window.setTimeout(async () => {
      const resp = await searchUsers({
        name: query.trim() || undefined,
        city: activeCities[0],
        limit: 50,
      });
      if (cancelled) return;

      if (isApiErrorResponse(resp)) {
        setSearchError(resp.error?.message ?? "Arama yapılamadı.");
        setFetchedUsers([]);
      } else {
        setSearchError("");
        setFetchedUsers(resp.users.map(searchUserToUser));
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [query, activeCities]);

  const filteredUsers = useMemo(() => {
    return fetchedUsers
      .filter((user) => {
        if (activeCats.length > 0 && !activeCats.some((cat) => matchesCategory(user.role, cat))) return false;
        return true;
      })
      .sort((firstUser, secondUser) => {
        if (sortBy === "name") return firstUser.name.localeCompare(secondUser.name);
        if (sortBy === "city") return firstUser.location.localeCompare(secondUser.location);
        return 0;
      });
  }, [fetchedUsers, activeCats, sortBy]);

  const displayedUsers = filteredUsers.slice(0, visibleCount);

  const activeChips = [
    ...activeCats.map((cat) => ({
      label: categories.find((category) => category.id === cat)?.label ?? cat,
      remove: () => {
        setActiveCats((current) => current.filter((value) => value !== cat));
        setVisibleCount(6);
      },
    })),
    ...activeCities.map((city) => ({
      label: city,
      remove: () => {
        setActiveCities((current) => current.filter((value) => value !== city));
        setVisibleCount(6);
      },
    })),
  ];

  const resetAll = () => {
    setQuery("");
    setActiveCats([]);
    setActiveCities([]);
    setSortBy("name");
    setVisibleCount(6);
  };

  return (
    <div className="wrap">
      <Navbar activePath="/ara" />

      <div className="sh-body">
        <aside className="sh-sidebar">
          <div className="sh-fgroup">
            <div className="sh-fhead">
              Kategori
              {activeCats.length > 0 ? (
                <span
                  className="sh-fclear"
                  onClick={() => {
                    setActiveCats([]);
                    setVisibleCount(6);
                  }}
                >
                  temizle
                </span>
              ) : null}
            </div>
            {categories.map((category) => (
              <label
                key={category.id}
                className={`sh-check-item${activeCats.includes(category.id) ? " on" : ""}`}
                onClick={() => {
                  setActiveCats((current) => toggle(current, category.id));
                  setVisibleCount(6);
                }}
              >
                <span className="sh-check" />
                {category.label}
                <span className="sh-check-count">{category.count}</span>
              </label>
            ))}
          </div>

          <div className="sh-fgroup">
            <div className="sh-fhead">Şehir</div>
            <div className="sh-pills">
              {cityOptions.map((city) => (
                <button
                  type="button"
                  key={city}
                  className={`sh-pill${activeCities.includes(city) ? " on" : ""}`}
                  onClick={() => {
                    setActiveCities((current) => toggle(current, city));
                    setVisibleCount(6);
                  }}
                >
                  {city}
                </button>
              ))}
            </div>
          </div>

          <button type="button" className="sh-reset" onClick={resetAll}>Tüm filtreleri sıfırla</button>
        </aside>

        <main className="sh-results" id="search-results">
          <div className="sh-results-head">
            <div className="sh-results-count">
              <b>{filteredUsers.length}</b> sonuç
              {query ? <span className="sh-results-q"> • &ldquo;{query}&rdquo;</span> : null}
              {searchError ? <span className="sh-results-q"> • {searchError}</span> : null}
            </div>
            <div className="sh-results-controls">
              <input
                type="text"
                className="search"
                placeholder="İsim, yetenek, rol veya şehir ara..."
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(6);
                }}
              />
              <div className="sh-sort">
                <span className="sh-sort-label">Sırala:</span>
                <select
                  aria-label="Sıralama"
                  value={sortBy}
                  onChange={(event) => {
                    setSortBy(event.target.value);
                    setVisibleCount(6);
                  }}
                  className="sh-sort-select"
                >
                  <option value="name">Alfabetik</option>
                  <option value="city">Şehre göre</option>
                </select>
              </div>
            </div>
          </div>

          {activeChips.length > 0 ? (
            <div className="sh-active-filters">
              {activeChips.map((chip, index) => (
                <span key={index} className="sh-af-chip">
                  {chip.label}
                  <span className="sh-af-x" onClick={chip.remove}>×</span>
                </span>
              ))}
            </div>
          ) : null}

          {filteredUsers.length > 0 ? (
            <>
              {displayedUsers.map((user, index) => (
                <Link
                  key={user.id}
                  href={`/profil/${user.id}`}
                  className="sh-result fade-up"
                  style={{ "--delay": `${index * 0.05}s` } as React.CSSProperties}
                >
                  <div className={`sh-r-avatar ${user.avatarVariant}`}>{user.initial}</div>
                  <div className="sh-r-info">
                    <div className="sh-r-top">
                      <span className="sh-r-name">{user.name}</span>
                    </div>
                    <div className="sh-r-role">
                      {user.role}
                      <span className="sh-r-loc">{user.location}</span>
                    </div>
                    <p className="sh-r-bio">{user.bio}</p>
                    <div className="sh-r-skills">
                      {user.skills.map((skill) => (
                        <span key={skill} className="sh-r-chip">{skill}</span>
                      ))}
                    </div>
                  </div>
                  <div className="sh-r-actions">
                    <ConnectButton userId={user.id} />
                    <div className="sh-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                </Link>
              ))}

              {visibleCount < filteredUsers.length ? (
                <button type="button" className="sh-load-more" onClick={() => setVisibleCount((current) => current + 6)}>
                  Daha fazla göster ↓
                </button>
              ) : null}
            </>
          ) : (
            <div className="network-empty">
              <div className="network-empty-icon">◌</div>
              <p>Aramana uygun bir profil bulunamadı.</p>
              <button type="button" className="btn-ghost network-empty-link" onClick={resetAll}>
                Filtreleri Sıfırla
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
