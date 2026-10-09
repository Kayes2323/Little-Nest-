import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ShopGrid } from "@/components/ShopGrid";
import { activeProducts, readStore } from "@/lib/store";
import { getLang } from "@/lib/lang";
import { L, tr } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const c = (await readStore()).categories.find((x) => x.slug === slug && x.active);
  return { title: c?.name.en ?? "Collection" };
}

export default async function Collection({ params, searchParams }: { params: Promise<{ slug: string }>; searchParams: Promise<Record<string, string | undefined>> }) {
  const [{ slug }, sp] = await Promise.all([params, searchParams]);
  const [s, lang] = await Promise.all([readStore(), getLang()]);
  const c = s.categories.find((x) => x.slug === slug && x.active);
  if (!c) notFound();
  const products = activeProducts(s).filter((p) => p.categoryIds.includes(c.id));
  return (
    <div className="wrap">
      <div className="page-head">
        <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">{tr(lang, "home")}</Link> / <Link href="/shop">{tr(lang, "shop")}</Link></nav>
        <h1>{L(c.name, lang)}</h1>
        {L(c.description, lang) && <p>{L(c.description, lang)}</p>}
      </div>
      <ShopGrid products={products} categories={[]} fixedCategory={c.id} initial={{ q: sp.q ?? "", sort: sp.sort ?? "new", cat: c.id, size: sp.size ?? "" }} />
      <div style={{ height: 64 }} />
    </div>
  );
}
