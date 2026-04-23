export default function Home() {
  return (
    <div className="wrap">

      {/* NAV */}
      <nav>
        <div className="logo">
          <div className="logo-mark">N</div>
          Nexus
        </div>
        <div className="nav-links">
          <a href="/" className="active">Keşfet</a>
          <a href="/agim">Ağım</a>
          <a href="#">Mesajlar</a>
          <a href="/profil/duzenle">Profilim</a>
        </div>
        <div className="nav-actions">
          <input type="text" className="search" placeholder="İsim, yetenek, şehir ara…" readOnly />
          <button type="button" className="btn-ghost">+ Paylaş</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-left fade-up">
          <div>
            <div className="hero-tag"><span className="dot"></span> Aktif · 248 yeni profil bu hafta</div>
            <h1>Yeteneğini <em>göster,</em><br />doğru insanları bul.</h1>
            <p className="hero-sub">Profilini aç, ne yapabildiğini anlat ve benzer dünyada gezen insanlarla tanış. İş değil, bağlantı.</p>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-num">12.4K</div>
              <div className="stat-label">Aktif Profil</div>
            </div>
            <div className="stat">
              <div className="stat-num">847</div>
              <div className="stat-label">Yetenek Etiketi</div>
            </div>
            <div className="stat">
              <div className="stat-num">63</div>
              <div className="stat-label">Şehir</div>
            </div>
          </div>
        </div>

        <div className="profile-card fade-up">
          <div className="avatar-row">
            <div className="avatar">A</div>
            <div>
              <div className="profile-name">Ayşe Yılmaz</div>
              <div className="profile-role">Ürün Tasarımcısı · İstanbul</div>
            </div>
          </div>
          <p className="bio">Dijital ürünler tasarlıyorum. Erişilebilirlik ve tipografi en büyük tutkum. Yeni insanlarla fikir alışverişine her zaman açığım.</p>
          <div className="skills">
            <span className="chip accent">UI Tasarım</span>
            <span className="chip">Figma</span>
            <span className="chip">Tipografi</span>
            <span className="chip">Prototipleme</span>
            <span className="chip">+8 daha</span>
          </div>
          <div className="profile-actions">
            <a href="/profil/duzenle" className="btn-primary">Profili Düzenle</a>
            <button type="button" className="btn-secondary">Önizle</button>
          </div>
        </div>
      </section>

      {/* SECTION HEADER */}
      <div className="section-head">
        <h2>Senin için <em>keşfet</em></h2>
        <div className="section-meta">24 eşleşme · bu hafta</div>
      </div>

      {/* FILTERS */}
      <div className="filters">
        <span className="filter-label">Filtrele:</span>
        <button type="button" className="filter active">Tümü</button>
        <button type="button" className="filter">Tasarım</button>
        <button type="button" className="filter">Yazılım</button>
        <button type="button" className="filter">Yazarlık</button>
        <button type="button" className="filter">Müzik</button>
        <button type="button" className="filter">Fotoğraf</button>
        <button type="button" className="filter">Aynı Şehir</button>
        <button type="button" className="filter">Yeni Katılan</button>
      </div>

      {/* GRID */}
      <section className="grid">

        {/* Spotlight card */}
        <div className="card spotlight fade-up">
          <div className="card-avatar a2">M</div>
          <div className="spot-content">
            <div className="spot-tag">◆ Öne Çıkan Profil</div>
            <div className="card-name">Mehmet Demir</div>
            <div className="card-role">Yazılım Mimarı · Berlin</div>
            <p className="spot-desc">15 yıldır açık kaynak projelerde çalışıyor, dağıtık sistemler üzerine iki kitap yazdım. Yeni mezunlara mentorluk yapıyorum.</p>
            <div className="card-skills">
              <span className="mini-chip">Go</span>
              <span className="mini-chip">Sistem Tasarımı</span>
              <span className="mini-chip">Mentorluk</span>
              <span className="mini-chip">Kubernetes</span>
            </div>
          </div>
        </div>

        <div className="card fade-up">
          <div className="card-top">
            <div className="card-avatar a3">Z</div>
            <div className="card-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
          <div>
            <div className="card-name">Zeynep Kara</div>
            <div className="card-role">İllüstratör</div>
            <div className="card-loc">Ankara</div>
          </div>
          <p className="card-desc">Çocuk kitapları ve editorial çizimler. Doğa ve mitoloji temalarını seviyorum.</p>
          <div className="card-skills">
            <span className="mini-chip">Procreate</span>
            <span className="mini-chip">Çizim</span>
            <span className="mini-chip">Storyboard</span>
          </div>
          <div className="card-footer">
            <div className="card-match"><b>87%</b> uyumlu</div>
            <button type="button" className="card-connect">+ Bağlan</button>
          </div>
        </div>

        <div className="card fade-up">
          <div className="card-top">
            <div className="card-avatar a4">E</div>
            <div className="card-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
          <div>
            <div className="card-name">Emre Aksoy</div>
            <div className="card-role">Ses Mühendisi</div>
            <div className="card-loc">İzmir</div>
          </div>
          <p className="card-desc">Film ve podcast için ses tasarımı. Alan kayıtları ve modüler sentez ile uğraşıyorum.</p>
          <div className="card-skills">
            <span className="mini-chip">Pro Tools</span>
            <span className="mini-chip">Miksaj</span>
            <span className="mini-chip">Field Recording</span>
          </div>
          <div className="card-footer">
            <div className="card-match"><b>72%</b> uyumlu</div>
            <button type="button" className="card-connect">+ Bağlan</button>
          </div>
        </div>

        <div className="card fade-up">
          <div className="card-top">
            <div className="card-avatar a5">D</div>
            <div className="card-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
          <div>
            <div className="card-name">Defne Şahin</div>
            <div className="card-role">Veri Bilimcisi</div>
            <div className="card-loc">İstanbul</div>
          </div>
          <p className="card-desc">İklim değişikliği üzerine modelleme yapıyorum. Her cumartesi atölye düzenliyorum.</p>
          <div className="card-skills">
            <span className="mini-chip">Python</span>
            <span className="mini-chip">ML</span>
            <span className="mini-chip">R</span>
            <span className="mini-chip">İklim</span>
          </div>
          <div className="card-footer">
            <div className="card-match"><b>94%</b> uyumlu</div>
            <button type="button" className="card-connect">+ Bağlan</button>
          </div>
        </div>

        <div className="card fade-up">
          <div className="card-top">
            <div className="card-avatar a6">K</div>
            <div className="card-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
          <div>
            <div className="card-name">Kaan Öztürk</div>
            <div className="card-role">Fotoğrafçı</div>
            <div className="card-loc">Antalya</div>
          </div>
          <p className="card-desc">Belgesel fotoğraf ve analog film. Karanlık odam da var, davet ediyorum.</p>
          <div className="card-skills">
            <span className="mini-chip">Analog</span>
            <span className="mini-chip">Portre</span>
            <span className="mini-chip">Sokak</span>
          </div>
          <div className="card-footer">
            <div className="card-match"><b>68%</b> uyumlu</div>
            <button type="button" className="card-connect">+ Bağlan</button>
          </div>
        </div>

        <div className="card fade-up">
          <div className="card-top">
            <div className="card-avatar a1">S</div>
            <div className="card-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
          <div>
            <div className="card-name">Selin Arslan</div>
            <div className="card-role">Yazar / Editör</div>
            <div className="card-loc">İstanbul</div>
          </div>
          <p className="card-desc">Kültür ve teknoloji üzerine yazıyorum. İki dergide editörlük yapıyorum.</p>
          <div className="card-skills">
            <span className="mini-chip">Editörlük</span>
            <span className="mini-chip">Röportaj</span>
            <span className="mini-chip">Çeviri</span>
          </div>
          <div className="card-footer">
            <div className="card-match"><b>81%</b> uyumlu</div>
            <button type="button" className="card-connect">+ Bağlan</button>
          </div>
        </div>

        <div className="card fade-up">
          <div className="card-top">
            <div className="card-avatar a2">B</div>
            <div className="card-arrow">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          </div>
          <div>
            <div className="card-name">Burak Tan</div>
            <div className="card-role">3B Sanatçı</div>
            <div className="card-loc">Eskişehir</div>
          </div>
          <p className="card-desc">Blender ve Houdini ile animasyon. Yeni başlayanlara ücretsiz ders veriyorum.</p>
          <div className="card-skills">
            <span className="mini-chip">Blender</span>
            <span className="mini-chip">Houdini</span>
            <span className="mini-chip">Animasyon</span>
          </div>
          <div className="card-footer">
            <div className="card-match"><b>76%</b> uyumlu</div>
            <button type="button" className="card-connect">+ Bağlan</button>
          </div>
        </div>

      </section>

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
