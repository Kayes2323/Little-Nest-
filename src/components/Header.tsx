"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { num } from "@/lib/i18n";
import { useCart, useLang } from "./Providers";
import { IconBag, IconClose, IconMenu, IconSearch } from "./Icons";
import type { Settings } from "@/lib/types";

export function LangSwitch() {
  const { lang } = useLang();
  const router = useRouter();
  const set = (l: "en" | "bn") => {
    if (l === lang) return;
    document.cookie = `ln_lang=${l}; path=/; max-age=31536000; samesite=lax`;
    router.refresh();
  };
  return (
    <div className="lang" role="group" aria-label="Language">
      <button aria-pressed={lang === "en"} onClick={() => set("en")} lang="en">EN</button>
      <button aria-pressed={lang === "bn"} onClick={() => set("bn")} lang="bn">বাং</button>
    </div>
  );
}

export function Header({ announcement, categories }: { announcement: Settings["announcement"]; categories: { slug: string; name: string }[] }) {
  const { t, l, lang } = useLang();
  const { count } = useCart();
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  const [q, setQ] = useState("");

  useEffect(() => { setOpen(false); setSearching(false); }, [path]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const esc = (e: KeyboardEvent) => e.key === "Escape" && (setOpen(false), setSearching(false));
    window.addEventListener("keydown", esc);
    return () => { window.removeEventListener("keydown", esc); document.body.style.overflow = ""; };
  }, [open]);

  const submit = (e: React.FormEvent) => { e.preventDefault(); router.push(`/shop${q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ""}`); };
  const text = l(announcement.text);

  return (
    <>
      {announcement.enabled && text && (
        <div className="announce" role="region" aria-label="Announcement">
          {announcement.href ? <Link href={announcement.href}>{text}</Link> : text}
        </div>
      )}
      <header className="header">
        <div className="wrap header__in" style={{ position: "relative" }}>
          <button className="icon-btn menu-btn" aria-label={t("menu")} aria-expanded={open} onClick={() => setOpen(true)}><IconMenu /></button>
          <Link href="/" aria-label="Little Nest"><Logo /></Link>
          <nav className="nav" aria-label="Primary">
            <Link href="/shop" aria-current={path === "/shop" ? "page" : undefined}>{t("shop")}</Link>
            {categories.slice(0, 4).map((c) => <Link key={c.slug} href={`/collections/${c.slug}`} aria-current={path === `/collections/${c.slug}` ? "page" : undefined}>{c.name}</Link>)}
          </nav>
          <div className="header__tools">
            <LangSwitch />
            <button className="icon-btn" aria-label={t("search")} aria-expanded={searching} onClick={() => setSearching((s) => !s)}><IconSearch /></button>
            <Link className="icon-btn" href="/cart" aria-label={`${t("cart")}${count ? `, ${t("items", { n: num(count, lang) })}` : ""}`}>
              <IconBag />{count > 0 && <span className="badge">{num(count, lang)}</span>}
            </Link>
          </div>
          {searching && (
            <div className="searchbar">
              <div className="wrap">
                <form onSubmit={submit} role="search">
                  <label className="vh" htmlFor="hs">{t("search")}</label>
                  <input id="hs" className="field" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("searchPlaceholder")} />
                  <button className="btn" type="submit">{t("search")}</button>
                </form>
              </div>
            </div>
          )}
        </div>
      </header>
      {open && (
        <div className="drawer" role="dialog" aria-modal="true" aria-label={t("menu")}>
          <div className="drawer__scrim" onClick={() => setOpen(false)} />
          <div className="drawer__panel">
            <div className="drawer__top">
              <Logo size={26} />
              <button className="icon-btn" aria-label={t("close")} onClick={() => setOpen(false)}><IconClose /></button>
            </div>
            <Link className="big" href="/shop">{t("shop")}</Link>
            {categories.map((c) => <Link key={c.slug} className="big" href={`/collections/${c.slug}`}>{c.name}</Link>)}
            <Link className="big" href="/cart">{t("cart")}{count ? ` (${num(count, lang)})` : ""}</Link>
          </div>
        </div>
      )}
    </>
  );
}
