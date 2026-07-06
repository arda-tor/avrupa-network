"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import ConnectLinkedInButton from "@/components/auth/ConnectLinkedInButton";
import {
  formatProfileLinkValue,
  getProfileInitial,
  getProfileName,
  getProfileSummarySkills,
  normalizeProfileLinkHref,
  profileToUser,
  writeProfileDraft,
  type EditableProfile,
} from "@/lib/mock-profile";
import { deleteAccount, getMe, updateProfile as updateProfileRequest } from "@/lib/auth-api";
import { currentUserToEditable, editableToUpdateFields, emptyEditableProfile } from "@/lib/profile-mapper";
import { useAuth } from "@/store/auth";
import { isApiErrorResponse } from "@/types/auth";
import type { AvatarVariant } from "@/types";

const MAX_AVATAR_BYTES = 500 * 1024;

const avatarVariants: AvatarVariant[] = ["a1", "a2", "a3", "a4", "a5", "a6"];
const toneOptions = ["Profesyonel", "Arkadaş canlısı", "Minimal", "Hikâye odaklı"];
const keywordOptions = ["Erişilebilirlik", "Fintech", "Tasarım sistemi", "Mentorluk", "Ürün stratejisi"];

function getAvatarStyle(profile: EditableProfile) {
  if (!profile.avatarImage) return undefined;

  return {
    backgroundImage: `url(${profile.avatarImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  } as const;
}

function getVisibleProfileSnapshot(profile: EditableProfile) {
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    username: profile.username,
    role: profile.role,
    location: profile.location,
    avatarVariant: profile.avatarVariant,
    avatarImage: profile.avatarImage,
    shortBio: profile.shortBio,
    bio: profile.bio,
    bioTone: profile.bioTone,
    keywords: profile.keywords,
    skills: profile.skills,
    links: profile.links,
    discoverable: profile.discoverable,
    connectionsOnlyEmail: profile.connectionsOnlyEmail,
    profileViewNotifications: profile.profileViewNotifications,
    collaborationOpen: profile.collaborationOpen,
    weeklyDigest: profile.weeklyDigest,
  };
}

function getChangedSectionCount(profile: EditableProfile, publishedProfile: EditableProfile) {
  const sections = [
    JSON.stringify({
      firstName: profile.firstName,
      lastName: profile.lastName,
      username: profile.username,
      role: profile.role,
      location: profile.location,
      avatarVariant: profile.avatarVariant,
      avatarImage: profile.avatarImage,
    }) !== JSON.stringify({
      firstName: publishedProfile.firstName,
      lastName: publishedProfile.lastName,
      username: publishedProfile.username,
      role: publishedProfile.role,
      location: publishedProfile.location,
      avatarVariant: publishedProfile.avatarVariant,
      avatarImage: publishedProfile.avatarImage,
    }),
    JSON.stringify({
      shortBio: profile.shortBio,
      bio: profile.bio,
      bioTone: profile.bioTone,
      keywords: profile.keywords,
    }) !== JSON.stringify({
      shortBio: publishedProfile.shortBio,
      bio: publishedProfile.bio,
      bioTone: publishedProfile.bioTone,
      keywords: publishedProfile.keywords,
    }),
    JSON.stringify(profile.skills) !== JSON.stringify(publishedProfile.skills),
    JSON.stringify(profile.links) !== JSON.stringify(publishedProfile.links),
    JSON.stringify({
      discoverable: profile.discoverable,
      connectionsOnlyEmail: profile.connectionsOnlyEmail,
      profileViewNotifications: profile.profileViewNotifications,
      collaborationOpen: profile.collaborationOpen,
      weeklyDigest: profile.weeklyDigest,
    }) !== JSON.stringify({
      discoverable: publishedProfile.discoverable,
      connectionsOnlyEmail: publishedProfile.connectionsOnlyEmail,
      profileViewNotifications: publishedProfile.profileViewNotifications,
      collaborationOpen: publishedProfile.collaborationOpen,
      weeklyDigest: publishedProfile.weeklyDigest,
    }),
  ];

  return sections.filter(Boolean).length;
}

export default function ProfilDuzenle() {
  const router = useRouter();
  const clearUser = useAuth((state) => state.logout);
  const setUserState = useAuth((state) => state.setUserState);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [profile, setProfile] = useState<EditableProfile>(emptyEditableProfile);
  const [publishedProfile, setPublishedProfile] = useState<EditableProfile>(emptyEditableProfile);
  const [skillInput, setSkillInput] = useState("");
  const [previewMode, setPreviewMode] = useState<"card" | "full">("card");
  const [flashMessage, setFlashMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [linkedInConnected, setLinkedInConnected] = useState(false);
  const [shareHost, setShareHost] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareHost(window.location.host);
    }
  }, []);

  const handleCopyProfileUrl = async (): Promise<void> => {
    const handle = profile.username.trim();
    if (!handle) {
      setFlashMessage("Kopyalamak için önce bir kullanıcı adı seç.");
      return;
    }

    const origin = typeof window !== "undefined" ? window.location.origin : `https://${shareHost}`;
    const url = `${origin}/p/${encodeURIComponent(handle)}`;

    try {
      await navigator.clipboard.writeText(url);
      setFlashMessage("Profil URL'i panoya kopyalandı.");
    } catch {
      setFlashMessage("URL kopyalanamadı, elle seçip kopyalayabilirsin.");
    }
  };

  // Load the live profile from the backend as the source of truth.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const resp = await getMe();
      if (cancelled) return;

      if (isApiErrorResponse(resp)) {
        router.push("/giris");
        return;
      }

      const editable = currentUserToEditable(resp.user);
      setProfile(editable);
      setPublishedProfile(editable);
      setLinkedInConnected(resp.user.linkedInConnected);
      writeProfileDraft(editable);
      setLoading(false);
    })();

    return () => {
      cancelled = true;
    };
  }, [router]);

  // Mirror the working draft into localStorage so the "Onizle" route can render it.
  useEffect(() => {
    if (loading) return;
    writeProfileDraft(profile);
  }, [profile, loading]);

  useEffect(() => {
    if (!flashMessage) return;

    const timeout = window.setTimeout(() => setFlashMessage(""), 2800);
    return () => window.clearTimeout(timeout);
  }, [flashMessage]);

  const dirty = JSON.stringify(getVisibleProfileSnapshot(profile)) !== JSON.stringify(getVisibleProfileSnapshot(publishedProfile));
  const changeCount = useMemo(
    () => getChangedSectionCount(profile, publishedProfile),
    [profile, publishedProfile]
  );

  const previewUser = profileToUser(profile);
  const previewLinks = profile.links.filter((link) => link.value.trim());
  const summarySkills = getProfileSummarySkills(profile, 3);

  if (loading) {
    return (
      <div className="wrap">
        <Navbar activePath="/profil/duzenle" />
        <div className="page-head">
          <div>
            <h1>Profil yükleniyor...</h1>
            <p>Profilin hazırlanıyor.</p>
          </div>
        </div>
      </div>
    );
  }

  const updateProfile = <K extends keyof EditableProfile>(key: K, value: EditableProfile[K]) => {
    setProfile((current) => ({ ...current, [key]: value }));
  };

  const toggleKeyword = (keyword: string) => {
    updateProfile(
      "keywords",
      profile.keywords.includes(keyword)
        ? profile.keywords.filter((item) => item !== keyword)
        : [...profile.keywords, keyword]
    );
  };

  const addSkill = (rawSkill: string) => {
    const nextSkill = rawSkill.trim();
    if (!nextSkill || profile.skills.includes(nextSkill)) return;

    updateProfile("skills", [...profile.skills, nextSkill]);
    setSkillInput("");
  };

  const removeSkill = (skill: string) => {
    updateProfile("skills", profile.skills.filter((item) => item !== skill));
  };

  const addLink = () => {
    if (profile.links.length >= 6) return;

    updateProfile("links", [
      ...profile.links,
      { id: `link-${Date.now()}`, type: "Website", value: "" },
    ]);
  };

  const updateLink = (id: string, field: "type" | "value", value: string) => {
    updateProfile(
      "links",
      profile.links.map((link) => (link.id === id ? { ...link, [field]: value } : link))
    );
  };

  const removeLink = (id: string) => {
    updateProfile("links", profile.links.filter((link) => link.id !== id));
  };

  const cycleAvatarVariant = () => {
    const currentIndex = avatarVariants.indexOf(profile.avatarVariant);
    const nextVariant = avatarVariants[(currentIndex + 1) % avatarVariants.length];
    updateProfile("avatarVariant", nextVariant);
    updateProfile("avatarImage", null);
  };

  const handlePublish = async () => {
    if (saving) return;
    setSaving(true);

    try {
      const resp = await updateProfileRequest(editableToUpdateFields(profile));
      if (isApiErrorResponse(resp)) {
        setFlashMessage(resp.error?.message ?? "Profil kaydedilemedi.");
        return;
      }

      const editable = currentUserToEditable(resp.user);
      setProfile(editable);
      setPublishedProfile(editable);
      writeProfileDraft(editable);
      setUserState(resp.user);
      setFlashMessage("Değişiklikler yayınlandı.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setProfile(publishedProfile);
    writeProfileDraft(publishedProfile);
    setFlashMessage("Taslak son yayınlanan sürüme döndürüldü.");
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm("Hesabın kalıcı olarak silinecek. Bu işlem geri alınamaz. Devam edilsin mi?")) {
      return;
    }

    const resp = await deleteAccount();
    if (isApiErrorResponse(resp)) {
      setFlashMessage(resp.error?.message ?? "Hesap silinemedi.");
      return;
    }

    clearUser();
    router.push("/giris");
  };

  const handlePreview = () => {
    writeProfileDraft(profile);
    router.push("/profil/me?preview=1");
  };

  return (
    <div className="wrap">
      <Navbar
        activePath="/profil/duzenle"
        rightClassName="nav-right"
        rightContent={<span className="autosave"><span className="dot"></span> {dirty ? "taslak açık" : "yayın ile senkron"}</span>}
      />

      <div className="breadcrumb">
        <Link href="/profil/me">Profilim</Link>
        <span className="sep">/</span>
        <Link href="/profil/me">{getProfileName(profile)}</Link>
        <span className="sep">/</span>
        <span className="current">Düzenle</span>
      </div>

      <div className="page-head">
        <div>
          <h1>Profilini <em>şekillendir.</em></h1>
          <p>Yetenekler, bağlantılar ve biyografi. Başkalarının seni ilk gördüğünde anlayacağı şeyler burada.</p>
          {flashMessage ? <p className="field-hint">{flashMessage}</p> : null}
        </div>
        <div className="head-actions">
          <button type="button" className="btn-secondary" onClick={handlePreview}>Önizle</button>
          <button type="button" className="btn-primary" onClick={handlePublish} disabled={saving}>{saving ? "Yayınlanıyor..." : "Değişiklikleri Yayınla →"}</button>
        </div>
      </div>

      <div className="edit-layout">
        <aside className="sidebar">
          <div className="side-label">Bölümler</div>
          <div className="side-nav">
            <a href="#temel-bilgiler" className="side-item active complete">Temel Bilgiler</a>
            <a href="#biyografi" className="side-item complete">Biyografi</a>
            <a href="#yetenekler" className="side-item">Yetenekler <span className="badge">{profile.skills.length}</span></a>
            <a href="#baglantilar" className="side-item">Bağlantılar <span className="badge">{previewLinks.length}</span></a>
            <a href="#bildirimler" className="side-item">Bildirimler</a>
            <a href="#gizlilik" className="side-item">Gizlilik</a>
          </div>
        </aside>

        <main className="edit-main">
          <section id="temel-bilgiler" className="form-section fade-up">
            <div className="form-section-title">
              <span className="num">01</span>
              Temel Bilgiler
            </div>
            <p className="form-section-desc">Başkalarının seni arama sonuçlarında gördüğü ilk bilgiler.</p>

            <div className="avatar-block">
              <div className={`avatar-big ${profile.avatarVariant}`} style={getAvatarStyle(profile)}>
                {profile.avatarImage ? null : getProfileInitial(profile)}
                <div className="avatar-edit">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M12 20h9M16.5 3.5a2.12 2.12 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>
              </div>
              <div className="avatar-info">
                <strong>Profil fotoğrafı</strong>
                <span>PNG veya JPG - En az 400x400px - Maks 5MB</span>
                <div className="avatar-actions">
                  <button type="button" className="btn-mini" onClick={() => fileInputRef.current?.click()}>Yeni fotoğraf yükle</button>
                  <button type="button" className="btn-mini danger" onClick={() => updateProfile("avatarImage", null)}>Kaldır</button>
                </div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;

                    if (file.size > MAX_AVATAR_BYTES) {
                      setFlashMessage("Fotoğraf 500KB'dan küçük olmalı (şu an base64 olarak saklanıyor).");
                      event.target.value = "";
                      return;
                    }

                    const reader = new FileReader();
                    reader.onload = () => {
                      updateProfile("avatarImage", typeof reader.result === "string" ? reader.result : null);
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Ad <span className="count">{profile.firstName.length}/40</span></label>
                <input type="text" value={profile.firstName} onChange={(event) => updateProfile("firstName", event.target.value)} />
              </div>
              <div className="field">
                <label>Soyad <span className="count">{profile.lastName.length}/40</span></label>
                <input type="text" value={profile.lastName} onChange={(event) => updateProfile("lastName", event.target.value)} />
              </div>
            </div>

            <div className="field-row">
              <div className="field">
                <label>Kullanıcı adı</label>
                <div className="username-input-row">
                  <input
                    type="text"
                    value={profile.username}
                    onChange={(event) => updateProfile("username", event.target.value.replace(/\s+/g, "").toLowerCase())}
                    aria-describedby="username-hint"
                  />
                  <button
                    type="button"
                    className="copy-btn"
                    onClick={() => void handleCopyProfileUrl()}
                    disabled={!profile.username}
                    aria-label="Profil URL'ini kopyala"
                  >
                    URL Kopyala
                  </button>
                </div>
                <span id="username-hint" className="field-hint">{shareHost || ""}/p/{profile.username || "kullaniciadi"}</span>
              </div>
              <div className="field">
                <label>Meslek / Rol <span className="count">{profile.role.length}/60</span></label>
                <input type="text" value={profile.role} onChange={(event) => updateProfile("role", event.target.value)} />
              </div>
            </div>

            <div className="field">
              <label>Şehir</label>
              <input type="text" value={profile.location} onChange={(event) => updateProfile("location", event.target.value)} />
            </div>
          </section>

          <section id="biyografi" className="form-section fade-up">
            <div className="form-section-title">
              <span className="num">02</span>
              Biyografi
            </div>
            <p className="form-section-desc">Kim olduğunu kendi sözlerinle anlat. Kısa, net ve karakterli bir metin burada daha iyi çalışır.</p>

            <div className="bio-tone-wrap">
              <div className="bio-tone-head">
                <span className="bio-mini-title">Biyografi tonu</span>
                <span className="bio-mini-hint">Seçimin önizlemedeki metin hissini etkiler.</span>
              </div>
              <div className="bio-tone-options">
                {toneOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    className={`bio-tone-chip${profile.bioTone === option ? " active" : ""}`}
                    onClick={() => updateProfile("bioTone", option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>

            <div className="bio-grid">
              <div className="bio-editor">
                <div className="field">
                  <label>Tek cümle özet <span className="count">{profile.shortBio.length}/80</span></label>
                  <input type="text" value={profile.shortBio} onChange={(event) => updateProfile("shortBio", event.target.value)} />
                  <span className="field-hint">Profil kartında adının altında görünür.</span>
                </div>

                <div className="field">
                  <label>Uzun biyografi <span className="count">{profile.bio.length}/500</span></label>
                  <textarea value={profile.bio} onChange={(event) => updateProfile("bio", event.target.value)} />
                  <span className="field-hint">Satır atlamak için Enter kullanabilirsin.</span>
                </div>

                <div className="bio-keywords">
                  <div className="bio-mini-title">Öne çıkan başlıklar</div>
                  <div className="bio-keyword-list">
                    {keywordOptions.map((keyword) => (
                      <button
                        key={keyword}
                        type="button"
                        className={`bio-keyword${profile.keywords.includes(keyword) ? " active" : ""}`}
                        onClick={() => toggleKeyword(keyword)}
                      >
                        {keyword}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <aside className="bio-preview-panel">
                <div className="bio-preview-label">Profilde görünüm</div>
                <p className="bio-preview-text">&quot;{profile.shortBio || "Kısa bir özet ekle."}&quot;</p>
                <div className="bio-preview-divider" />
                <div className="bio-preview-meta">
                  <span>Ton: {profile.bioTone}</span>
                  <span>Seçili başlık: {profile.keywords.length}</span>
                </div>
              </aside>
            </div>
          </section>

          <section id="yetenekler" className="form-section fade-up">
            <div className="form-section-title">
              <span className="num">03</span>
              Yetenekler
            </div>
            <p className="form-section-desc">Neler yapabildiğini etiketler halinde ekle. Başkaları bunları filtreleyerek seni bulacak.</p>

            <div className="skills-wrap">
              <div className="skills-list">
                {profile.skills.map((skill) => (
                  <span key={skill} className="skill-chip">
                    {skill}
                    <button type="button" className="x" onClick={() => removeSkill(skill)}>×</button>
                  </span>
                ))}
              </div>
              <div className="skill-add">
                <input
                  type="text"
                  placeholder="Yeni yetenek yaz ve Enter'a bas..."
                  value={skillInput}
                  onChange={(event) => setSkillInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key !== "Enter") return;
                    event.preventDefault();
                    addSkill(skillInput);
                  }}
                />
                <button type="button" onClick={() => addSkill(skillInput)}>+ Ekle</button>
              </div>
            </div>
          </section>

          <section id="baglantilar" className="form-section fade-up">
            <div className="form-section-title">
              <span className="num">04</span>
              Bağlantılar
            </div>
            <p className="form-section-desc">Portfolyo, sosyal medya, kişisel site. Maks. 6 link.</p>

            <div className="mb-6 flex items-center justify-between gap-4 rounded-2xl border border-line bg-bg p-4">
              <div className="flex items-center gap-3">
                <svg viewBox="0 0 24 24" aria-hidden="true" className="h-8 w-8 shrink-0" fill="#0A66C2">
                  <path d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.27c-.97 0-1.75-.79-1.75-1.76s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.76-1.75 1.76zm13.5 12.27h-3v-5.6c0-3.37-4-3.12-4 0v5.6h-3v-11h3v1.76c1.4-2.59 7-2.78 7 2.48v6.76z" />
                </svg>
                <div>
                  <strong className="block text-[14px] text-ink">LinkedIn</strong>
                  <span className="text-[13px] text-ink-soft">
                    {linkedInConnected
                      ? "LinkedIn hesabın bağlı."
                      : "Profilini doğrulamak için LinkedIn hesabını bağla."}
                  </span>
                </div>
              </div>
              <ConnectLinkedInButton
                connected={linkedInConnected}
                onError={setFlashMessage}
                onDisconnected={() => {
                  setLinkedInConnected(false);
                  setFlashMessage("LinkedIn bağlantısı kaldırıldı.");
                }}
              />
            </div>

            {profile.links.map((link) => (
              <div key={link.id} className="link-row">
                <select value={link.type} onChange={(event) => updateLink(link.id, "type", event.target.value)}>
                  <option>Website</option>
                  <option>Twitter</option>
                  <option>Dribbble</option>
                  <option>Behance</option>
                  <option>GitHub</option>
                  <option>Instagram</option>
                  <option>E-posta</option>
                  <option>Telefon</option>
                </select>
                <input type="text" value={link.value} onChange={(event) => updateLink(link.id, "value", event.target.value)} />
                <button type="button" className="link-del" onClick={() => removeLink(link.id)}>×</button>
              </div>
            ))}
            <button type="button" className="add-link" onClick={addLink} disabled={profile.links.length >= 6}>
              + Yeni bağlantı ekle
            </button>
          </section>

          <section id="bildirimler" className="form-section fade-up">
            <div className="form-section-title">
              <span className="num">05</span>
              Bildirimler
            </div>
            <p className="form-section-desc">Almak istediğin bildirimleri seç.</p>

            <div className="toggle-row">
              <div className="toggle-info">
                <strong>İş birliği taleplerini al</strong>
                <span>Profil detay sayfasındaki iş birliği butonunu iletişim kanallarınla eşleştirir.</span>
              </div>
              <button type="button" className={`toggle${profile.collaborationOpen ? " on" : ""}`} onClick={() => updateProfile("collaborationOpen", !profile.collaborationOpen)} />
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <strong>Haftalık özet gönder</strong>
                <span>Önizleme ve bilgilendirme metinlerinde haftalık özetlerin açık olduğunu gösterir.</span>
              </div>
              <button type="button" className={`toggle${profile.weeklyDigest ? " on" : ""}`} onClick={() => updateProfile("weeklyDigest", !profile.weeklyDigest)} />
            </div>
          </section>

          <section id="gizlilik" className="form-section fade-up">
            <div className="form-section-title">
              <span className="num">06</span>
              Gizlilik
            </div>
            <p className="form-section-desc">Profilinin kim tarafından ve nasıl görüleceğini kontrol et.</p>

            <div className="toggle-row">
              <div className="toggle-info">
                <strong>Profilim keşfet sayfasında görünsün</strong>
                <span>Kapattığında sadece doğrudan linkten ulaşılabilir olursun.</span>
              </div>
              <button type="button" className={`toggle${profile.discoverable ? " on" : ""}`} onClick={() => updateProfile("discoverable", !profile.discoverable)} />
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <strong>E-posta adresimi sadece bağlantılarım görsün</strong>
                <span>Kapalı tutarsan e-posta gizli kalır.</span>
              </div>
              <button type="button" className={`toggle${profile.connectionsOnlyEmail ? " on" : ""}`} onClick={() => updateProfile("connectionsOnlyEmail", !profile.connectionsOnlyEmail)} />
            </div>
            <div className="toggle-row">
              <div className="toggle-info">
                <strong>Kim profilimi görüntüledi bildirimi</strong>
                <span>Birisi profiline baktığında anlık bildirim al.</span>
              </div>
              <button type="button" className={`toggle${profile.profileViewNotifications ? " on" : ""}`} onClick={() => updateProfile("profileViewNotifications", !profile.profileViewNotifications)} />
            </div>
          </section>

          <div className="danger-zone">
            <div className="danger-title">Tehlikeli bölge</div>
            <p className="danger-desc">Hesap silme işlemi geri alınamaz.</p>
            <div className="danger-actions">
              <button type="button" className="btn-danger" onClick={handleDeleteAccount}>Hesabı Kalıcı Olarak Sil</button>
            </div>
          </div>

          <div className="bottom-bar">
            <div className="bar-info">
              <span className="pill">{dirty ? "KAYDEDILMEMIS" : "SENKRON"}</span>
              <span>{dirty ? `${changeCount || 1} bölümde değişiklik var - yayınlamayı unutma` : "Taslak son yayınlanan sürümle aynı"}</span>
            </div>
            <div className="bar-actions">
              <button type="button" className="bar-cancel" onClick={handleReset}>Vazgec</button>
              <button type="button" className="bar-save" onClick={handlePublish} disabled={saving}>{saving ? "Yayınlanıyor..." : "Yayınla →"}</button>
            </div>
          </div>
        </main>

        <aside className="preview">
          <div className="preview-head">
            <span className="preview-label">Canlı Önizleme</span>
            <div className="preview-toggle">
              <button type="button" className={previewMode === "card" ? "active" : ""} onClick={() => setPreviewMode("card")}>Kart</button>
              <button type="button" className={previewMode === "full" ? "active" : ""} onClick={() => setPreviewMode("full")}>Tam</button>
            </div>
          </div>

          <div className="preview-scroll">
            <div className="preview-card">
              <div className="pv-avatar-row">
                <div className={`pv-avatar ${profile.avatarVariant}`} style={getAvatarStyle(profile)}>
                  {profile.avatarImage ? null : getProfileInitial(profile)}
                </div>
                <div>
                  <div className="pv-name">{getProfileName(profile)}</div>
                  <div className="pv-role">{previewUser.role} • {previewUser.location}</div>
                </div>
              </div>
              <p className="pv-bio">{profile.shortBio || "Kısa biyografin burada görünecek."}</p>
              {previewMode === "full" ? (
                <p className="card-desc">{profile.bio}</p>
              ) : null}
              <div>
                <div className="pv-section">Yetenekler</div>
                <div className="pv-skills">
                  {(previewMode === "full" ? profile.skills : summarySkills).map((skill) => (
                    <span key={skill} className="pv-chip">{skill}</span>
                  ))}
                </div>
              </div>
              <div>
                <div className="pv-section">Bağlantılar</div>
                <div className="pv-links">
                  {previewLinks.length > 0 ? (
                    previewLinks.map((link) => (
                      <a key={link.id} href={normalizeProfileLinkHref(link)} target="_blank" rel="noreferrer">
                        {formatProfileLinkValue(link)}
                      </a>
                    ))
                  ) : (
                    <span className="field-hint">Henüz görünür bağlantı eklenmedi.</span>
                  )}
                </div>
              </div>
            </div>

            <div className="preview-footer">
              <strong>İpucu</strong>
              {dirty
                ? "Önizleme anlık olarak taslağınla güncelleniyor. Beğendiğinde yayınlayabilirsin."
                : "Yayınlanan sürümle aynı görünümde. Yeni bir değişiklik yaptığında bu alan da güncellenecek."}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
