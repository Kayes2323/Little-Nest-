import type { Metadata } from "next";
import { ShopGrid } from "@/components/ShopGrid";
import { activeProducts, readStore, stockedCategories } from "@/lib/store";
import { getLang } from "@/lib/lang";
import { L, tr } from "@/lib/i18n";

export const metadata: Metadata = { title: "Shop" };

export default async function Shop({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const sp = await searchParams;
  const [s, lang] = await Promise.all([readStore(), getLang()]);
  const cats = stockedCategories(s);
  const cat = cats.find((c) => c.id === sp.cat || c.slug === sp.cat)?.id ?? "";
  return (
    <div className="wrap">
      <div className="page-head"><h1>{tr(lang, "shop")}</h1></div>
      <ShopGrid
        products={activeProducts(s)}
        categories={cats.map((c) => ({ id: c.id, slug: c.slug, name: L(c.name, lang) }))}
        initial={{ q: sp.q ?? "", sort: sp.sort ?? "new", cat, size: sp.size ?? "" }}
      />
      <div style={{ height: 64 }} />
    </div>
  );
}
