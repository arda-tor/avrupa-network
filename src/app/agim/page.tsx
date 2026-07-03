"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import { searchUsers } from "@/lib/auth-api";
import { searchUserToUser } from "@/lib/profile-mapper";
import { useConnectedUsersState, useSavedUsersState } from "@/lib/social";
import { isApiErrorResponse } from "@/types/auth";
import type { User } from "@/types";

export default function Agim() {
  const [query, setQuery] = useState("");
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const { savedUserIds, removeUserFromNetwork } = useSavedUsersState();
  const { connectedUserIds } = useConnectedUsersState();

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const resp = await searchUsers({ limit: 50 });
      if (cancelled) return;
      if (!isApiErrorResponse(resp)) {
        setAllUsers(resp.users.map(searchUserToUser));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const savedUsers = useMemo(
    () => allUsers.filter((user) => savedUserIds.includes(user.id)),
    [allUsers, savedUserIds]
  );

  const filteredUsers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return savedUsers;

    return savedUsers.filter((user) =>
      [user.name, user.role, user.location, user.bio, ...user.skills]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    );
  }, [query, savedUsers]);

  return (
    <div className="wrap">
      <Navbar
        activePath="/agim"
        rightContentRequiresAuth
        rightContent={(
          <input
            type="text"
            className="search"
            placeholder="Favorilerimde ara..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        )}
      />

      <div className="section-head network-page-head">
        <h2>
          Favorilerim <em className="network-count-em">{savedUsers.length}</em>
        </h2>
        <div className="section-meta">kaydettiğin kişiler</div>
      </div>

      {savedUsers.length === 0 ? (
        <div className="network-empty">
          <div className="network-empty-icon">◌</div>
          <p>Henüz kimseyi kaydetmedin.</p>
          <Link href="/" className="btn-ghost network-empty-link">Keşfetmeye Başla</Link>
        </div>
      ) : null}

      {savedUsers.length > 0 && filteredUsers.length === 0 ? (
        <div className="network-empty">
          <div className="network-empty-icon">◌</div>
          <p>Aramana uyan kayıtlı profil bulunamadı.</p>
          <button type="button" className="btn-ghost network-empty-link" onClick={() => setQuery("")}>
            Aramayi Temizle
          </button>
        </div>
      ) : null}

      {filteredUsers.length > 0 ? (
        <section className="grid">
          {filteredUsers.map((user) => {
            const isConnected = connectedUserIds.includes(user.id);

            return (
              <div key={user.id} className="card fade-up">
                <Link href={`/profil/${user.id}`} className="card-main-link" aria-label={`${user.name} profil detaylarını aç`}>
                  <div className="card-top">
                    <div className={`card-avatar ${user.avatarVariant}`}>{user.initial}</div>
                    <div className="card-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M7 17L17 7M17 7H7M17 7V17" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <div className="card-name">{user.name}</div>
                    <div className="card-role">{user.role}</div>
                    <div className="card-loc">{user.location}</div>
                  </div>
                  <p className="card-desc">{user.bio}</p>
                  <div className="card-skills">
                    {user.skills.map((skill) => (
                      <span key={skill} className="mini-chip">{skill}</span>
                    ))}
                  </div>
                </Link>
                <div className="card-footer">
                  <div className="network-status">{isConnected ? "◆ Bağlı" : "◆ Kaydedildi"}</div>
                  <button
                    type="button"
                    className="card-connect network-remove"
                    onClick={() => void removeUserFromNetwork(user.id)}
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      ) : null}

    </div>
  );
}
