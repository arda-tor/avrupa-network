import type { CSSProperties } from "react";
import Link from "next/link";

interface ProfileCardProps {
  name: string;
  role: string;
  location: string;
  bio: string;
  skills: string[];
  avatarVariant: string;
  initial: string;
  previewHref: string;
  avatarStyle?: CSSProperties;
}

export default function ProfileCard({
  name,
  role,
  location,
  bio,
  skills,
  avatarVariant,
  initial,
  previewHref,
  avatarStyle,
}: ProfileCardProps) {
  return (
    <div className="profile-card fade-up">
      <div className="avatar-row">
        <Link
          href={previewHref}
          className={`avatar ${avatarVariant} profile-avatar-link`}
          style={avatarStyle}
        >
          {initial}
        </Link>
        <div>
          <Link href={previewHref} className="profile-name-link">
            <div className="profile-name">{name}</div>
          </Link>
          <div className="profile-role">{role} · {location}</div>
        </div>
      </div>
      <p className="bio">{bio}</p>
      <div className="skills">
        {skills.map((skill, index) => (
          <span key={skill} className={index === 0 ? "chip accent" : "chip"}>
            {skill}
          </span>
        ))}
      </div>
      <div className="profile-actions">
        <Link href="/profil/duzenle" className="btn-primary">Profili Duzenle</Link>
        <Link href={previewHref} className="btn-secondary">Onizle</Link>
      </div>
    </div>
  );
}
