"use client";

import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { useConnectedUsersState, useSavedUsersState } from "@/lib/social";
import type { User } from "@/types";

export default function Agim() {
  const { savedUserIds, removeUserFromNetwork } = useSavedUsersState();
  const { connectedUserIds } = useConnectedUsersState();

  const savedUsers: User[] = [];

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
      )}
    </div>
  );
}
