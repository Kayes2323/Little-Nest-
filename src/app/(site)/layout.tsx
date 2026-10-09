import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { readStore, stockedCategories } from "@/lib/store";
import { getLang } from "@/lib/lang";
import { L, tr } from "@/lib/i18n";

export const dynamic = "force-dynamic";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const [s, lang] = await Promise.all([readStore(), getLang()]);
  const cats = stockedCategories(s).map((c) => ({ slug: c.slug, name: L(c.name, lang) }));
  const hasSamples = s.products.some((p) => p.sample && p.active);
  return (
    <div className="has-sticky">
      <Header announcement={s.settings.announcement} categories={cats} />
      {hasSamples && <div className="sampled" role="note">{tr(lang, "sampleBanner")}</div>}
      <main id="main">{children}</main>
      <Footer settings={s.settings} categories={cats} lang={lang} />
    </div>
  );
}
