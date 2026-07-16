"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { searchUsers } from "@/lib/auth-api";
import { searchUserToUser } from "@/lib/profile-mapper";
import { useConnectedUsersState } from "@/lib/social";
import { isApiErrorResponse } from "@/types/auth";
import type { User } from "@/types";

const DEBOUNCE_MS = 300;

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const { connectedUserIds, toggleConnectedUserId } = useConnectedUsersState();

  useEffect(() => {
    let cancelled = false;

    const timeout = window.setTimeout(async () => {
      const resp = await searchUsers({
        name: query.trim() || undefined,
        limit: 50,
      });
      if (cancelled) return;

      if (isApiErrorResponse(resp)) {
        setError(resp.error?.message ?? "Arama yapılamadı.");
        setUsers([]);
      } else {
        setError("");
        setUsers(resp.users.map(searchUserToUser));
      }
      setLoaded(true);
    }, DEBOUNCE_MS);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [query]);

  return (
    <div className="wrap">
      <Navbar activePath="/ara" />

      <div className="section-head network-page-head">
        <h2>Toplulukta ara</h2>
        <div className="section-meta">isimle ara, sonuçlar aşağıda</div>
      </div>

      <div className="filters" style={{ marginBottom: 24 }}>
        <input
          type="text"
          className="search"
          placeholder="İsim, yetenek, rol veya şehir ara..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Toplulukta ara"
        />
      </div>

      {error ? (
        <div className="network-empty">
          <div className="network-empty-icon">!</div>
          <p>{error}</p>
        </div>
      ) : null}

      {!error && loaded && users.length === 0 ? (
        <div className="network-empty">
          <div className="network-empty-icon">◌</div>
          <p>Aramana uygun bir profil bulunamadı.</p>
        </div>
      ) : null}

      {users.length > 0 ? (
        <section className="grid">
          {users.map((user) => {
            const isConnected = connectedUserIds.includes(user.id);

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
                  <div className="network-status">{isConnected ? "◆ Bağlı" : null}</div>
                  <button
                    type="button"
                    className={`card-connect${isConnected ? " connected" : ""}`}
                    onClick={() => void toggleConnectedUserId(user.id)}
                  >
                    {isConnected ? "✓ Eklendi" : "+ Ekle"}
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
