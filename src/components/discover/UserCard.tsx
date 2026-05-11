"use client";

import Link from "next/link";
import type { User } from "@/types";

interface UserCardProps {
  user: User;
  isConnected: boolean;
  onToggleConnect: (id: string) => void;
}

export default function UserCard({ user, isConnected, onToggleConnect }: UserCardProps) {
  return (
    <div className="card fade-up">
      <Link href={`/profil/${user.id}`} className="card-main-link" aria-label={`${user.name} profil detaylarini ac`}>
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
        <button
          type="button"
          className={`card-connect${isConnected ? " connected" : ""}`}
          onClick={() => onToggleConnect(user.id)}
        >
          {isConnected ? "Eklendi" : "+ Ekle"}
        </button>
      </div>
    </div>
  );
}
