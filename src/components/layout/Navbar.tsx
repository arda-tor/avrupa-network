"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { logout as logoutRequest } from "@/lib/auth-api";
import { useAuth } from "@/store/auth";

interface NavbarProps {
  activePath?: string;
  rightContent?: ReactNode;
  rightClassName?: string;
}

const navItems = [
  { href: "/", label: "Kesfet" },
  { href: "/ara", label: "Ara" },
  { href: "/agim", label: "Favorilerim" },
  { href: "/profil/duzenle", label: "Profilim" },
];

export default function Navbar({ activePath, rightContent, rightClassName = "nav-actions" }: NavbarProps) {
  const user = useAuth((state) => state.user);
  const clearUser = useAuth((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    await logoutRequest();
    clearUser();
    router.push("/giris");
  };

  return (
    <nav>
      <div className="logo">
        <div className="logo-mark">N</div>
        Nexus
      </div>
      <div className="nav-links">
        {navItems.map((item) => (
          <Link key={item.href} href={item.href} className={activePath === item.href ? "active" : undefined}>
            {item.label}
          </Link>
        ))}
      </div>
      <div className={cn(rightClassName)}>
        {rightContent}
        <div className="flex items-center gap-2">
          {
            user ? (
              <div className="flex items-center gap-2">
                <span
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-transparent px-4 text-[13px] font-semibold text-ink transition "
                >
                  {user.fullName}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-transparent px-4 text-[13px] font-semibold text-ink transition hover:border-line hover:bg-bg-2"
                >
                  Çıkış
                </button>
              </div>
            ) : (
              <>
                  <Link
                  href="/giris"
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-transparent px-4 text-[13px] font-semibold text-ink transition hover:border-line hover:bg-bg-2"
                >
                  Login
                </Link>
                <Link
                  href="/kayit"
                  className="inline-flex min-h-10 items-center justify-center rounded-full border border-ink bg-ink px-4 text-[13px] font-semibold text-bg transition hover:border-accent hover:bg-accent"
                >
                  Register
                </Link>
              </>
            )
          }
          
        </div>
      </div>
    </nav>
  );
}
