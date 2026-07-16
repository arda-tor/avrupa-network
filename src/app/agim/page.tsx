"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { getPublicProfile } from "@/lib/auth-api";
import { searchUserToUser } from "@/lib/profile-mapper";
import { useConnectedUsersState, useSavedUsersState } from "@/lib/social";
import { isApiErrorResponse } from "@/types/auth";
import type { User } from "@/types";

export default function Agim() {
  const { savedUsernames, removeUserFromNetwork, loading: savedLoading } = useSavedUsersState();
  const { connectedUsernames, loading: connectedLoading } = useConnectedUsersState();

  const [savedUsers, setSavedUsers] = useState<User[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (savedLoading) return;

    let cancelled = false;

    if (savedUsernames.length === 0) {
      setSavedUsers([]);
      setLoaded(true);
      return;
    }

    (async () => {
      const promises = savedUsernames.map(async (username) => {
        const resp = await getPublicProfile(username);
        if (isApiErrorResponse(resp)) return null;
        return resp.profile;
      });

      const profiles = await Promise.all(promises);
      if (cancelled) return;

      const validProfiles = profiles.filter((p): p is NonNullable<typeof p> => p !== null);
      const users = validProfiles.map(searchUserToUser);
      
      users.sort((a, b) => savedUsernames.indexOf(a.username) - savedUsernames.indexOf(b.username));
      setSavedUsers(users);
      setLoaded(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [savedUsernames, savedLoading]);

  if (!loaded) {
    return (
      <div className="wrap">
        <Navbar activePath="/agim" rightContentRequiresAuth />
        <div className="section-head network-page-head">
          <h2>Yükleniyor...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="wrap">
      <Navbar activePath="/agim" rightContentRequiresAuth />

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
      ) : (
        <section className="grid">
          {savedUsers.map((user) => {
            const isConnected = connectedUsernames.includes(user.username);

            return (
              <div key={user.id} className="card fade-up">
                <Link href={`/p/${user.username}`} className="card-main-link" aria-label={`${user.name} profil detaylarını aç`}>
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
                    onClick={() => void removeUserFromNetwork(user.username)}
                  >
                    Kaldır
                  </button>
                </div>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}
