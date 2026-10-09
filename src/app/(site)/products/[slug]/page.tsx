import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductCard } from "@/components/ProductCard";
import { activeProducts, readStore } from "@/lib/store";
import { getLang } from "@/lib/lang";
import { L, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const p = (await readStore()).products.find((x) => x.slug === slug && x.active);
  return { title: p?.name.en ?? "Product", description: p?.description.en || undefined };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [s, lang] = await Promise.all([readStore(), getLang()]);
  const p = s.products.find((x) => x.slug === slug && x.active);
  if (!p) notFound();
  const cat = s.categories.find((c) => p.categoryIds.includes(c.id) && c.active);
  const related = activeProducts(s).filter((x) => x.id !== p.id && x.categoryIds.some((c) => p.categoryIds.includes(c))).slice(0, 4);
  return (
    <div className="wrap">
      <nav className="crumbs" aria-label="Breadcrumb" style={{ paddingTop: 24 }}>
        <Link href="/">{tr(lang, "home")}</Link> / {cat ? <Link href={`/collections/${cat.slug}`}>{L(cat.name, lang)}</Link> : <Link href="/shop">{tr(lang, "shop")}</Link>}
      </nav>
      <ProductDetail p={p} whatsapp={s.settings.contact.whatsapp} />
      {related.length > 0 && (
        <section style={{ paddingBottom: 80 }}>
          <div className="sec-head"><h2>{tr(lang, "featured")}</h2></div>
          <div className="grid grid--4">{related.map((r) => <ProductCard key={r.id} p={r} lang={lang} />)}</div>
        </section>
      )}
    </div>
  );
}
