import { users, savedUserIds } from "@/data/users";

const savedUsers = users.filter((u) => savedUserIds.includes(u.id));

export default function Agim() {
  return (
    <div className="wrap">

      {/* NAV */}
      <nav>
        <div className="logo">
          <div className="logo-mark">N</div>
          Nexus
        </div>
        <div className="nav-links">
          <a href="/">Keşfet</a>
          <a href="/agim" className="active">Ağım</a>
          <a href="#">Mesajlar</a>
          <a href="/profil/duzenle">Profilim</a>
        </div>
        <div className="nav-actions">
          <input type="text" className="search" placeholder="Ağımda ara…" readOnly />
        </div>
      </nav>

      {/* PAGE HEAD */}
      <div className="section-head network-page-head">
        <h2>
          Ağım <em className="network-count-em">{savedUsers.length}</em>
        </h2>
        <div className="section-meta">kaydettiğin kişiler</div>
      </div>

      {/* EMPTY STATE */}
      {savedUsers.length === 0 && (
        <div className="network-empty">
          <div className="network-empty-icon">◌</div>
          <p>Henüz kimseyi kaydetmedin.</p>
          <a href="/" className="btn-ghost network-empty-link">Keşfetmeye Başla</a>
        </div>
      )}

      {/* GRID */}
      {savedUsers.length > 0 && (
        <section className="grid">
          {savedUsers.map((user) => (
            <div key={user.id} className="card fade-up">
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
                {user.skills.map((s) => (
                  <span key={s} className="mini-chip">{s}</span>
                ))}
              </div>
              <div className="card-footer">
                <div className="card-match network-connected">◆ Bağlı</div>
                <button type="button" className="card-connect network-remove">Kaldır</button>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* FOOTER */}
      <div className="foot">
        <div>© Nexus · 2026</div>
        <div className="foot-dots">
          <span></span><span></span><span></span><span></span>
        </div>
        <div>v0.4.2 · Yapan: Sen &amp; Biz</div>
      </div>

    </div>
  );
}
