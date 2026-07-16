"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { notFound, useParams, useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import { searchUsers, getPublicProfile } from "@/lib/auth-api";
import { searchUserToUser } from "@/lib/profile-mapper";
import type { User } from "@/types";
import {
  MOCK_PROFILE_EVENT,
  defaultEditableProfile,
  formatProfileLinkValue,
  normalizeProfileLinkHref,
  profileToUser,
  readProfileDraft,
  type EditableProfileLink,
} from "@/lib/mock-profile";
import { useConnectedUsersState } from "@/lib/social";
import { getMe } from "@/lib/auth-api";
import { emptyEditableProfile, currentUserToEditable } from "@/lib/profile-mapper";
import { useAuth } from "@/store/auth";
import { isApiErrorResponse } from "@/types/auth";
import { LinkIcon } from "@/components/ui/LinkIcon";

function slugify(name: string) {
  return name
    .toLocaleLowerCase("tr-TR")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .replace(/[^a-z0-9]/g, "");
}

function getUserAvatarStyle(avatarImage?: string | null) {
  if (!avatarImage) return undefined;

  return {
    backgroundImage: `url(${avatarImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  } as const;
}

type Tab = "about" | "skills" | "links";

function buildRelatedUsers(pool: User[], currentId: string, role: string, location: string) {
  const roleToken = role
    .toLocaleLowerCase("tr-TR")
    .split(/[ /,-]+/)
    .find((token) => token.length > 3);

  const sameCity = pool.filter((item) => item.id !== currentId && item.location === location);
  const sameRole = pool.filter(
    (item) =>
      item.id !== currentId &&
      roleToken &&
      item.role.toLocaleLowerCase("tr-TR").includes(roleToken)
  );

  const ordered = [...sameCity, ...sameRole, ...pool.filter((item) => item.id !== currentId)];
  return ordered.filter((item, index) => ordered.findIndex((entry) => entry.id === item.id) === index).slice(0, 3);
}

export default function ProfileDetailPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const previewMode = searchParams.get("preview") === "1";

  const [activeTab, setActiveTab] = useState<Tab>("about");
  const [savedMessage, setSavedMessage] = useState("");
  const [currentProfile, setCurrentProfile] = useState(() =>
    previewMode ? readProfileDraft() : emptyEditableProfile
  );
  const [otherUsers, setOtherUsers] = useState<User[]>([]);
  const [othersLoaded, setOthersLoaded] = useState(false);
  const [targetUser, setTargetUser] = useState<User | null>(null);
  const [targetUserLoaded, setTargetUserLoaded] = useState(false);

  const { connectedUsernames, toggleConnectedUserId } = useConnectedUsersState();

  const authUser = useAuth((state) => state.user);
  const setAuthUser = useAuth((state) => state.setUserState);
  const [authStatus, setAuthStatus] = useState<"checking" | "authed" | "guest">(
    authUser ? "authed" : "checking"
  );

  // Profil goruntuleme sadece giris yapmis kullanicilara acik.
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (authUser) {
        setAuthStatus("authed");
        return;
      }

      const resp = await getMe();
      if (cancelled) return;

      if (!isApiErrorResponse(resp) && resp?.user) {
        setAuthUser(resp.user);
        setAuthStatus("authed");
      } else {
        setAuthStatus("guest");
        const nextUrl = window.location.pathname + window.location.search;
        router.replace(`/giris?next=${encodeURIComponent(nextUrl)}`);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [authUser, setAuthUser, router]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const resp = await searchUsers({ limit: 50 });
      if (cancelled) return;
      if (!isApiErrorResponse(resp)) {
        setOtherUsers(resp.users.map(searchUserToUser));
      }
      setOthersLoaded(true);
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!params?.slug) return;
      
      const resp = await getPublicProfile(params.slug);
      if (cancelled) return;

      if (!isApiErrorResponse(resp) && resp.profile) {
        setTargetUser(searchUserToUser(resp.profile));
      }
      setTargetUserLoaded(true);
    })();

    return () => { cancelled = true; };
  }, [params?.slug]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Preview mode renders the unpublished draft straight from localStorage.
    if (previewMode) {
      const syncProfile = () => setCurrentProfile(readProfileDraft());
      syncProfile();
      window.addEventListener("storage", syncProfile);
      window.addEventListener(MOCK_PROFILE_EVENT, syncProfile);

      return () => {
        window.removeEventListener("storage", syncProfile);
        window.removeEventListener(MOCK_PROFILE_EVENT, syncProfile);
      };
    }

    let cancelled = false;
    (async () => {
      const resp = await getMe();
      if (cancelled) return;
      if (!isApiErrorResponse(resp)) {
        setCurrentProfile(currentUserToEditable(resp.user));
      } else {
        // Misafir: kendi profili yok, ornek kullaniciyi (Ayse Yilmaz) onizle.
        setCurrentProfile(defaultEditableProfile);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [previewMode]);

  // Misafir ise profil icerigini hic render etme; giris sayfasina yonlendiriliyor.
  if (authStatus !== "authed") {
    return (
      <div className="wrap pd-wrap">
        <Navbar activePath="/profil/duzenle" />
        <div className="pd-topbar">
          {authStatus === "checking" ? "Yükleniyor..." : "Giriş sayfasına yönlendiriliyorsun..."}
        </div>
      </div>
    );
  }

  const isMe = authUser?.username === params?.slug;

  const currentUser = profileToUser(currentProfile);
  const user = isMe && previewMode ? currentUser : targetUser;

  if (!user) {
    // DB listesi henuz gelmediyse notFound tetiklemeden bekle.
    if (!targetUserLoaded) {
      return (
        <div className="wrap pd-wrap">
          <Navbar activePath="/profil/duzenle" />
          <div className="pd-topbar">Yükleniyor...</div>
        </div>
      );
    }
    notFound();
  }

  const isCurrentUser = user.id === authUser?.id || isMe;
  const slug = isCurrentUser ? currentProfile.username : slugify(user.name);
  const isConnected = connectedUsernames.includes(user.username);
  const relatedUsers = isCurrentUser
    ? otherUsers.slice(0, 3)
    : buildRelatedUsers(otherUsers, user.id, user.role, user.location);

  const profileLinks: EditableProfileLink[] = isCurrentUser
    ? currentProfile.links.filter((link) => link.value.trim())
    : [];

  const detailLinks = profileLinks.map((link, index) => ({
    id: link.id || `detail-${index}`,
    href: normalizeProfileLinkHref(link),
    value: formatProfileLinkValue(link),
    label: link.type,
  }));

  const handleCopyProfileLink = async () => {
    const sharePath = `/p/${user.username}${previewMode ? "?preview=1" : ""}`;
    const shareUrl = typeof window === "undefined" ? sharePath : `${window.location.origin}${sharePath}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setSavedMessage("Profil bağlantısı panoya kopyalandı.");
    } catch {
      setSavedMessage("Bağlantı kopyalanamadı, adres çubuğundan paylaşabilirsin.");
    }
  };

  const handlePrimaryAction = async () => {
    if (isCurrentUser) {
      router.push("/profil/duzenle");
      return;
    }

    const nextState = await toggleConnectedUserId(user.username);
    setSavedMessage(nextState ? "Profil favorilere eklendi." : "Profil favorilerden çıkarıldı.");
  };

  const highlightedSkills = user.skills.slice(0, 4);

  return (
    <div className="wrap pd-wrap">
      <Navbar activePath="/profil/duzenle" />

      <div className="pd-topbar">
        <button
          type="button"
          className="pd-back"
          onClick={() => {
            if (previewMode) {
              router.push("/profil/duzenle");
              return;
            }

            router.back();
          }}
        >
          <span className="pd-arr">←</span> {previewMode ? "Düzenlemeye geri dön" : "Aramaya geri dön"}
        </button>
      </div>

      <section className="pd-hero">
        <div className="pd-hero-row">
          <div
            className={`pd-avatar-big ${isCurrentUser ? currentProfile.avatarVariant : user.avatarVariant}`}
            style={getUserAvatarStyle(isCurrentUser ? currentProfile.avatarImage : null)}
          >
            {isCurrentUser && currentProfile.avatarImage ? null : user.initial}
          </div>
          <div className="pd-hero-info">
            <h1 className="pd-hero-name">{user.name}</h1>
            <div className="pd-hero-meta">
              <span className="pd-hero-role">{user.role}</span>
              <span className="pd-hero-sep">•</span>
              <span className="pd-hero-loc">{user.location}</span>
            </div>
          </div>
        </div>

        <p className="pd-hero-bio">{user.bio}</p>

        <div className="pd-hero-actions">
          {isCurrentUser ? (
            <>
              <Link href="/profil/duzenle" className="pd-btn-primary">
                <span className="pd-btn-icon">✎</span>
                Profili Düzenle
              </Link>
              <button type="button" className="pd-btn-dark" onClick={handleCopyProfileLink}>
                Bağlantıyı Paylaş
              </button>
            </>
          ) : (
            <button
              type="button"
              className={`pd-btn-primary${isConnected ? " connected" : ""}`}
              onClick={handlePrimaryAction}
            >
              <span className="pd-btn-icon">{isConnected ? "✓" : "+"}</span>
              {isConnected ? "Eklendi" : "Ekle"}
            </button>
          )}
        </div>

        {savedMessage ? <p className="pd-inline-note">{savedMessage}</p> : null}
      </section>

      <div className="pd-tabs">
        {([
          { id: "about", label: "Hakkında" },
          { id: "skills", label: "Yetenekler" },
          { id: "links", label: "Bağlantılar" },
        ] as { id: Tab; label: string }[]).map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`pd-tab${activeTab === tab.id ? " on" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="pd-content">
        {activeTab === "about" && (
          <>
            <div className="pd-section">
              <div className="pd-section-label">Biyografi</div>
              <p className="pd-bio-text">{user.bio}</p>
            </div>

            <div className="pd-section">
              <div className="pd-section-label">
                Öne çıkan yetenekler
                <button type="button" className="pd-more" onClick={() => setActiveTab("skills")}>
                  Tümünü gör →
                </button>
              </div>
              <div className="pd-skill-grid pd-skill-grid-simple">
                {highlightedSkills.map((skill) => (
                  <div key={skill} className="pd-skill-card pd-skill-card-simple">
                    <span className="pd-skill-name">{skill}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "skills" && (
          <div className="pd-section">
            <div className="pd-section-label">Tüm yetenekler</div>
            <div className="pd-skills-list">
              {user.skills.map((skill) => (
                <span key={skill} className="pd-skill-chip">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {activeTab === "links" && (
          <div className="pd-section">
            <div className="pd-section-label">Bağlantılar</div>
            <div className="pd-links">
              {detailLinks.map((link) => (
                <a key={link.id} href={link.href} className="pd-link" target="_blank" rel="noreferrer">
                  <span className="pd-link-left flex items-center gap-2">
                    <LinkIcon type={link.label} className="h-[18px] w-[18px] opacity-70" />
                    {link.value}
                  </span>
                  <span className="pd-link-tag">{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {!isCurrentUser && relatedUsers.length > 0 && (
        <div className="pd-similar">
          <div className="pd-section-label">
            Aynı şehir ve meslekte olanlar için
            <Link href="/ara" className="pd-more">
              Daha fazla →
            </Link>
          </div>
          <div className="pd-similar-grid">
            {relatedUsers.map((relatedUser) => (
              <Link key={relatedUser.id} href={`/p/${relatedUser.username}`} className="pd-similar-card">
                <div className={`pd-similar-avatar ${relatedUser.avatarVariant}`}>{relatedUser.initial}</div>
                <div className="pd-similar-name">{relatedUser.name}</div>
                <div className="pd-similar-meta">{relatedUser.role}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
