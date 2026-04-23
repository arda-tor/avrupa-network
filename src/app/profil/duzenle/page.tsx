export default function ProfilDuzenle() {
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
          <a href="#">Ağım</a>
          <a href="#">Mesajlar</a>
          <a href="#" className="active">Profilim</a>
        </div>
        <div className="nav-right">
          <span className="autosave"><span className="dot"></span> 3 sn önce kaydedildi</span>
        </div>
      </nav>

      {/* BREADCRUMB */}
      <div className="breadcrumb">
        <a href="#">Profilim</a>
        <span className="sep">/</span>
        <a href="#">Ayşe Yılmaz</a>
        <span className="sep">/</span>
        <span className="current">Düzenle</span>
      </div>

      {/* PAGE HEAD */}
      <div className="page-head">
        <div>
          <h1>Profilini <em>şekillendir.</em></h1>
          <p>Yetenekler, bağlantılar, bir cümlelik biyografiler. Başkalarının seni ilk gördüğünde anlayacağı her şey.</p>
        </div>
        <div className="head-actions">
          <button type="button" className="btn-secondary">Önizle</button>
          <button type="button" className="btn-primary">Değişiklikleri Yayınla →</button>
        </div>
      </div>

      {/* MAIN LAYOUT */}
      <div className="edit-layout">

        {/* SIDEBAR */}
        <aside className="sidebar">
          <div className="side-label">Bölümler</div>
          <div className="side-nav">
            <div className="side-item active complete">Temel Bilgiler</div>
            <div className="side-item complete">Biyografi</div>
            <div className="side-item">Yetenekler <span className="badge">12</span></div>
            <div className="side-item">Bağlantılar <span className="badge">4</span></div>
            <div className="side-item">Çalışmalar</div>
            <div className="side-item">Gizlilik</div>
            <div className="side-item">Bildirimler</div>
          </div>

          <div className="progress-block">
            <div className="progress-top">
              <span>Profil tamamlanma</span>
              <span>72%</span>
            </div>
            <div className="progress-bar"><div className="progress-fill"></div></div>
            <p className="progress-hint">3 çalışma örneği ekle → %100&apos;e ulaş. Profilin %40 daha fazla görüntülenir.</p>
          </div>
        </aside>

        {/* CENTER FORM */}
        <main className="edit-main">

          {/* 01 Temel Bilgiler */}
          <section className="form-section fade-up">
            <div className="form-section-title">
              <span className="num">01</span>
              Temel Bilgiler
            </div>
            <p className="form-section-desc">Başkalarının seni arama sonuçlarında gördüğü ilk bilgiler.</p>

            <div className="avatar-block">
              <div className="avatar-big">
                A
                <div className="avatar-edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
              </div>
              <div className="avatar-info">
                <strong>Profil fotoğrafı</strong>
                <span>PNG veya JPG · En az 400×400px · Maks 5MB</span>
                <div className="avatar-actions">
                  <button type="button" className="btn-mini">Yeni fotoğraf yükle</button>
                  <button type="button" className="btn-mini">Harf oluştur</button>
                  <button type="button" className="btn-mini danger">Kaldır</button>
                </div>
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Ad <span className="count">7/40</span></label>
                <input type="text" defaultValue="Ayşe" />
              </div>
              <div className="field">
                <label>Soyad <span className="count">6/40</span></label>
                <input type="text" defaultValue="Yılmaz" />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Kullanıcı adı</label>
                <input type="text" defaultValue="@ayseyilmaz" />
                <span className="field-hint">nexus.app/ayseyilmaz</span>
              </div>
              <div className="field">
                <label>Meslek / Rol <span className="count">18/60</span></label>
                <input type="text" defaultValue="Ürün Tasarımcısı" />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Şehir</label>
                <input type="text" defaultValue="İstanbul, Türkiye" />
              </div>
              <div className="field">
                <label>Çalışma tarzı</label>
                <select defaultValue="Her ikisi de — uzaktan & ofis">
                  <option>Her ikisi de — uzaktan &amp; ofis</option>
                  <option>Sadece uzaktan</option>
                  <option>Sadece ofis / yüz yüze</option>
                  <option>Hibrit</option>
                </select>
              </div>
            </div>
          </section>

          {/* 02 Biyografi */}
          <section className="form-section fade-up">
            <div className="form-section-title">
              <span className="num">02</span>
              Biyografi
            </div>
            <p className="form-section-desc">Kim olduğunu kendi sözlerinle anlat. Kısa ve dürüst işe yarıyor.</p>

            <div className="field">
              <label>Tek cümle özet <span className="count">52/80</span></label>
              <input type="text" defaultValue="Erişilebilir dijital ürünler tasarlayan biri." />
              <span className="field-hint">Profilinin üstünde, adının altında görünür.</span>
            </div>

            <div className="field">
              <label>Uzun biyografi <span className="count">186/500</span></label>
              <textarea defaultValue="Dijital ürünler tasarlıyorum. Erişilebilirlik ve tipografi en büyük tutkum. Son 4 yıldır bir fintech şirketinde çalışıyorum, haftada bir de bağımsız projeler yapıyorum. Yeni insanlarla fikir alışverişine her zaman açığım." />
              <span className="field-hint">Markdown destekli. Satır atlamak için Enter&apos;a bas.</span>
            </div>
          </section>

          {/* 03 Yetenekler */}
          <section className="form-section fade-up">
            <div className="form-section-title">
              <span className="num">03</span>
              Yetenekler
            </div>
            <p className="form-section-desc">Neler yapabildiğini etiketler halinde ekle. Başkaları bunları filtreleyerek seni bulacak.</p>

            <div className="skills-wrap">
              <div className="skills-list">
                <span className="skill-chip">UI Tasarım <span className="level">İleri</span> <span className="x">×</span></span>
                <span className="skill-chip">Figma <span className="level">İleri</span> <span className="x">×</span></span>
                <span className="skill-chip">Tipografi <span className="level">İleri</span> <span className="x">×</span></span>
                <span className="skill-chip">Prototipleme <span className="level">Orta</span> <span className="x">×</span></span>
                <span className="skill-chip">Kullanıcı Araştırması <span className="level">Orta</span> <span className="x">×</span></span>
                <span className="skill-chip">Erişilebilirlik <span className="level">İleri</span> <span className="x">×</span></span>
                <span className="skill-chip">Motion <span className="level">Başlangıç</span> <span className="x">×</span></span>
                <span className="skill-chip">HTML/CSS <span className="level">Orta</span> <span className="x">×</span></span>
              </div>
              <div className="skill-add">
                <input type="text" placeholder="Yeni yetenek yaz ve Enter'a bas..." />
                <button type="button">+ Ekle</button>
              </div>
              <div className="suggested">
                <div className="suggested-label">Rolüne göre öneriler</div>
                <div className="sug-list">
                  <button type="button" className="sug">Design Systems</button>
                  <button type="button" className="sug">Wireframing</button>
                  <button type="button" className="sug">User Testing</button>
                  <button type="button" className="sug">Sketch</button>
                  <button type="button" className="sug">Framer</button>
                  <button type="button" className="sug">İkon Tasarım</button>
                </div>
              </div>
            </div>
          </section>

          {/* 04 Bağlantılar */}
          <section className="form-section fade-up">
            <div className="form-section-title">
              <span className="num">04</span>
              Bağlantılar
            </div>
            <p className="form-section-desc">Portfolyo, sosyal medya, kişisel site. Maks. 6 link.</p>

            <div className="link-row">
              <select defaultValue="Website">
                <option>Website</option>
                <option>Twitter</option>
                <option>Dribbble</option>
                <option>Behance</option>
              </select>
              <input type="text" defaultValue="https://ayseyilmaz.studio" />
              <button type="button" className="link-del">×</button>
            </div>
            <div className="link-row">
              <select defaultValue="Dribbble">
                <option>Dribbble</option>
                <option>Behance</option>
                <option>Instagram</option>
              </select>
              <input type="text" defaultValue="https://dribbble.com/ayseyilmaz" />
              <button type="button" className="link-del">×</button>
            </div>
            <div className="link-row">
              <select defaultValue="GitHub">
                <option>GitHub</option>
                <option>Twitter</option>
                <option>Website</option>
              </select>
              <input type="text" defaultValue="https://github.com/ayseyilmaz" />
              <button type="button" className="link-del">×</button>
            </div>
            <div className="link-row">
              <select defaultValue="E-posta">
                <option>E-posta</option>
                <option>Telefon</option>
              </select>
              <input type="text" defaultValue="ayse@ayseyilmaz.studio" />
              <button type="button" className="link-del">×</button>
            </div>
            <button type="button" className="add-link">+ Yeni bağlantı ekle</button>
          </section>

          {/* 05 Gizlilik */}
          <section className="form-section fade-up">
            <div className="form-section-title">
              <span className="num">05</span>
              Gizlilik
            </div>
            <p className="form-section-desc">Profilinin kim tarafından ve nasıl görüleceğini kontrol et.</p>

            <div className="toggle-row">
              <div className="toggle-info">
                <strong>Profilim keşfet sayfasında görünsün</strong>
                <span>Kapattığında sadece doğrudan linkten ulaşılabilir olursun.</span>
              </div>
              <div className="toggle on"></div>
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <strong>E-posta adresimi sadece bağlantılarım görsün</strong>
                <span>Kapalı tutarsan sadece &apos;bağlan&apos; butonu görünür, e-posta gizlenir.</span>
              </div>
              <div className="toggle on"></div>
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <strong>Yetenek uyumu yüzdesi göster</strong>
                <span>Diğer kullanıcılar seninle ne kadar uyumlu olduklarını görebilir.</span>
              </div>
              <div className="toggle"></div>
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <strong>Kim profilimi görüntüledi bildirimi</strong>
                <span>Birisi profiline baktığında anlık bildirim al.</span>
              </div>
              <div className="toggle on"></div>
            </div>
          </section>

          {/* DANGER ZONE */}
          <div className="danger-zone">
            <div className="danger-title">Tehlikeli bölge</div>
            <p className="danger-desc">Hesabını dondurursan profilin geçici olarak gizlenir, istediğin zaman aktifleştirebilirsin. Silme işlemi geri alınamaz.</p>
            <div className="danger-actions">
              <button type="button" className="btn-danger">Hesabı Dondur</button>
              <button type="button" className="btn-danger">Hesabı Kalıcı Olarak Sil</button>
            </div>
          </div>

          {/* STICKY BOTTOM BAR */}
          <div className="bottom-bar">
            <div className="bar-info">
              <span className="pill">KAYDEDİLMEMİŞ</span>
              <span>3 değişiklik var — yayınlamayı unutma</span>
            </div>
            <div className="bar-actions">
              <button type="button" className="bar-cancel">Vazgeç</button>
              <button type="button" className="bar-save">Yayınla →</button>
            </div>
          </div>

        </main>

        {/* RIGHT PREVIEW */}
        <aside className="preview">
          <div className="preview-head">
            <span className="preview-label">Canlı Önizleme</span>
            <div className="preview-toggle">
              <button type="button" className="active">Kart</button>
              <button type="button">Tam</button>
            </div>
          </div>

          <div className="preview-card">
            <div className="pv-avatar-row">
              <div className="pv-avatar">A</div>
              <div>
                <div className="pv-name">Ayşe Yılmaz</div>
                <div className="pv-role">Ürün Tasarımcısı · İstanbul</div>
              </div>
            </div>
            <p className="pv-bio">Erişilebilir dijital ürünler tasarlayan biri.</p>
            <div>
              <div className="pv-section">◆ Yetenekler</div>
              <div className="pv-skills">
                <span className="pv-chip">UI Tasarım</span>
                <span className="pv-chip">Figma</span>
                <span className="pv-chip">Tipografi</span>
                <span className="pv-chip">+5 daha</span>
              </div>
            </div>
            <div>
              <div className="pv-section">◆ Bağlantılar</div>
              <div className="pv-links">
                <a href="#">ayseyilmaz.studio</a>
                <a href="#">dribbble.com/ayseyilmaz</a>
                <a href="#">github.com/ayseyilmaz</a>
              </div>
            </div>
          </div>

          <div className="preview-footer">
            <strong>İpucu</strong>
            Profilin %72 tamamlandı. Çalışma örneği eklemek profilini 2× daha ziyaretçiye ulaştırır.
          </div>
        </aside>

      </div>
    </div>
  );
}
