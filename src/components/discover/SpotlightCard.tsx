import Link from "next/link";
import type { User } from "@/types";

interface SpotlightCardProps {
  user: User;
}

export default function SpotlightCard({ user }: SpotlightCardProps) {
  return (
    <Link href={`/p/${user.username}`} className="card spotlight fade-up">
      <div className={`card-avatar ${user.avatarVariant}`}>{user.initial}</div>
      <div className="spot-content">
        <div className="spot-tag">{user.spotlightTag}</div>
        <div className="card-name">{user.name}</div>
        <div className="card-role">{user.role} · {user.location}</div>
        <p className="spot-desc">{user.bio}</p>
        <div className="card-skills">
          {user.skills.map((skill) => (
            <span key={skill} className="mini-chip">{skill}</span>
          ))}
        </div>
      </div>
    </Link>
  );
}
