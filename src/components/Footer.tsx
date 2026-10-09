import Link from "next/link";
import type { Lang, Settings } from "@/lib/types";
import { L, tr } from "@/lib/i18n";
import { Logo } from "./Logo";

export function Footer({ settings, categories, lang }: { settings: Settings; categories: { slug: string; name: string }[]; lang: Lang }) {
  const c = settings.contact;
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__grid">
          <div>
            <Logo />
            <p style={{ marginTop: 14 }}>{L(settings.hero.sub, lang)}</p>
          </div>
          <div>
            <h4>{t("shop")}</h4>
            <ul>
              <li><Link href="/shop">{t("all")}</Link></li>
              {categories.map((x) => <li key={x.slug}><Link href={`/collections/${x.slug}`}>{x.name}</Link></li>)}
            </ul>
          </div>
          <div>
            <h4>{t("support")}</h4>
            <ul>
              {settings.trust.map((x) => <li key={x.id}><Link href={`/#info-${x.id}`}>{L(x.title, lang)}</Link></li>)}
              {c.whatsapp && <li><a href={`https://wa.me/${c.whatsapp.replace(/\D/g, "")}`}>WhatsApp</a></li>}
              {c.phone && <li><a href={`tel:${c.phone}`}>{c.phone}</a></li>}
              {c.email && <li><a href={`mailto:${c.email}`}>{c.email}</a></li>}
              {L(c.address, lang) && <li>{L(c.address, lang)}</li>}
              {!c.whatsapp && !c.phone && !c.email && <li style={{ opacity: .7 }}>{t("contact")}: —</li>}
            </ul>
            {(c.facebook || c.instagram) && (
              <ul style={{ marginTop: 14 }}>
                {c.facebook && <li><a href={c.facebook} rel="noopener noreferrer" target="_blank">Facebook</a></li>}
                {c.instagram && <li><a href={c.instagram} rel="noopener noreferrer" target="_blank">Instagram</a></li>}
              </ul>
            )}
          </div>
          <div>
            <h4>{t("newsletter")}</h4>
            <form style={{ display: "flex", gap: 8 }}>
              <label className="vh" htmlFor="nl">{t("emailPlaceholder")}</label>
              <input id="nl" className="field" type="email" placeholder={t("emailPlaceholder")} disabled />
              <button className="btn" type="button" disabled>{t("subscribe")}</button>
            </form>
            <p style={{ marginTop: 8, fontSize: 12 }}>{t("newsletterNote")}</p>
          </div>
        </div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Little Nest</span>
        </div>
      </div>
    </footer>
  );
}
