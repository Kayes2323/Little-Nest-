import Link from "next/link";
import { Hero } from "@/components/Hero";
import { Media } from "@/components/Media";
import { ProductCard } from "@/components/ProductCard";
import { activeProducts, readStore, stockedCategories } from "@/lib/store";
import { getLang } from "@/lib/lang";
import { L, tr } from "@/lib/i18n";

export default async function Home() {
  const [s, lang] = await Promise.all([readStore(), getLang()]);
  const t = (k: Parameters<typeof tr>[1]) => tr(lang, k);
  const prods = activeProducts(s);
  const cats = stockedCategories(s);
  const featured = prods.filter((p) => p.featured).slice(0, 4);
  const fresh = prods.filter((p) => p.isNew).sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 4);
  const camps = s.settings.campaigns.filter((c) => c.active);
  const st = s.settings.brandStory;

  return (
    <>
      <Hero hero={s.settings.hero} />

      {cats.length > 0 && (
        <section className="section" id="collections">
          <div className="wrap">
            <div className="sec-head"><div><span className="eyebrow">Little Nest</span><h2>{t("shopByCollection")}</h2></div></div>
            <div className="coll-grid">
              {cats.map((c, i) => (
                <Link key={c.id} href={`/collections/${c.slug}`} className="coll" aria-label={L(c.name, lang)}>
                  <Media src={c.imageUrl} alt="" seed={c.id} sizes="(min-width:760px) 33vw, 50vw" priority={i < 2} />
                  <div className="coll__label"><h3>{L(c.name, lang)}</h3><span aria-hidden>→</span></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {featured.length > 0 && (
        <section className="section section--cream">
          <div className="wrap">
            <div className="sec-head">
              <div><span className="eyebrow">Little Nest</span><h2>{t("featured")}</h2></div>
              <Link className="link" href="/shop">{t("viewAll")}</Link>
            </div>
            <div className="grid grid--4">{featured.map((p) => <ProductCard key={p.id} p={p} lang={lang} />)}</div>
          </div>
        </section>
      )}

      {fresh.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <div><span className="eyebrow">Little Nest</span><h2>{t("newArrivals")}</h2></div>
              <Link className="link" href="/shop?sort=new">{t("viewAll")}</Link>
            </div>
            <div className="grid grid--4">{fresh.map((p) => <ProductCard key={p.id} p={p} lang={lang} />)}</div>
          </div>
        </section>
      )}

      {s.settings.sections.campaigns && camps.length > 0 && (
        <section className="section section--cream">
          <div className="wrap">
            {camps.map((c) => (
              <div key={c.id} className="campaign">
                <div className="campaign__media">
                  {c.mediaType === "video" && c.mediaUrl ? (
                    <video src={c.mediaUrl} muted loop playsInline autoPlay preload="none" aria-hidden />
                  ) : (
                    <Media src={c.mediaUrl} alt={L(c.headline, lang)} seed={c.id} label={c.mediaUrl ? undefined : t("mediaSoon")} sizes="(min-width:860px) 55vw, 100vw" />
                  )}
                </div>
                <div className="campaign__text">
                  <h3>{L(c.headline, lang)}</h3>
                  <p>{L(c.description, lang)}</p>
                  {c.ctaHref && <Link className="btn" href={c.ctaHref}>{L(c.ctaLabel, lang) || t("explore")}</Link>}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap story">
          <div className="story__img"><Media src={st.imageUrl} alt="" seed="story" label={st.imageUrl ? undefined : t("mediaSoon")} sizes="(min-width:860px) 45vw, 100vw" /></div>
          <div>
            <span className="eyebrow">{t("brandStory")}</span>
            <h2>{L(st.title, lang)}</h2>
            <p>{L(st.body, lang)}</p>
          </div>
        </div>
      </section>

      <section className="section section--cream">
        <div className="wrap">
          <div className="sec-head"><div><span className="eyebrow">{t("goodToKnow")}</span><h2>{t("goodToKnow")}</h2></div></div>
          <div className="trust">
            {s.settings.trust.map((x) => (
              <div key={x.id} id={`info-${x.id}`}><h3>{L(x.title, lang)}</h3><p>{L(x.body, lang)}</p></div>
            ))}
          </div>
        </div>
      </section>

      {s.settings.sections.gallery && s.settings.gallery.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="sec-head"><div><span className="eyebrow">Little Nest</span><h2>{t("gallery")}</h2><p className="note" style={{ marginTop: 8 }}>{t("gallerySub")}</p></div></div>
            <div className="gal">{s.settings.gallery.slice(0, 8).map((g, i) => <div key={i} style={{ position: "relative" }}><Media src={g.url} alt={g.alt} seed={`g${i}`} sizes="(min-width:800px) 25vw, 50vw" /></div>)}</div>
          </div>
        </section>
      )}
    </>
  );
}
