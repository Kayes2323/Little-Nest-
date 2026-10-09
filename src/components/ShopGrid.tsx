"use client";
import { useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useLang } from "./Providers";
import { ProductCardClient } from "./ProductCardClient";
import { uniqueSizes } from "@/lib/product";

export interface CatLite { id: string; slug: string; name: string }

export function ShopGrid({ products, categories, initial, fixedCategory }: {
  products: Product[]; categories: CatLite[]; fixedCategory?: string;
  initial: { q: string; sort: string; cat: string; size: string };
}) {
  const { t, l } = useLang();
  const router = useRouter();
  const path = usePathname();
  const [q, setQ] = useState(initial.q);
  const [sort, setSort] = useState(initial.sort);
  const [cat, setCat] = useState(fixedCategory ?? initial.cat);
  const [size, setSize] = useState(initial.size);

  const sizes = useMemo(() => [...new Set(products.flatMap(uniqueSizes))], [products]);

  const sync = (next: Partial<{ q: string; sort: string; cat: string; size: string }>) => {
    const v = { q, sort, cat, size, ...next };
    const p = new URLSearchParams();
    if (v.q) p.set("q", v.q);
    if (v.sort && v.sort !== "new") p.set("sort", v.sort);
    if (!fixedCategory && v.cat) p.set("cat", v.cat);
    if (v.size) p.set("size", v.size);
    router.replace(`${path}${p.toString() ? `?${p}` : ""}`, { scroll: false });
  };

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    let r = products.filter((p) => {
      if (cat && !p.categoryIds.includes(cat)) return false;
      if (size && !p.variants.some((v) => v.size === size)) return false;
      if (needle && !`${p.name.en} ${p.name.bn} ${p.description.en}`.toLowerCase().includes(needle)) return false;
      return true;
    });
    if (sort === "price-asc") r = [...r].sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    else if (sort === "price-desc") r = [...r].sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    else r = [...r].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return r;
  }, [products, q, sort, cat, size]);

  const filtered = Boolean(q || size || (!fixedCategory && cat));
  const clear = () => { setQ(""); setSize(""); if (!fixedCategory) setCat(""); sync({ q: "", size: "", cat: "" }); };

  return (
    <>
      <div className="toolbar">
        {!fixedCategory && (
          <div className="chips" role="group" aria-label={t("collections")}>
            <button className="chip" aria-pressed={!cat} onClick={() => { setCat(""); sync({ cat: "" }); }}>{t("all")}</button>
            {categories.map((c) => (
              <button key={c.id} className="chip" aria-pressed={cat === c.id} onClick={() => { setCat(c.id); sync({ cat: c.id }); }}>{c.name}</button>
            ))}
          </div>
        )}
        <div className="tool-row" style={{ marginLeft: fixedCategory ? 0 : "auto" }}>
          <label className="vh" htmlFor="sq">{t("search")}</label>
          <input id="sq" className="field" type="search" value={q} placeholder={t("searchPlaceholder")}
            onChange={(e) => { setQ(e.target.value); }} onBlur={() => sync({})} onKeyDown={(e) => e.key === "Enter" && sync({})} />
          {sizes.length > 1 && (
            <>
              <label className="vh" htmlFor="sz">{t("size")}</label>
              <select id="sz" className="field" value={size} onChange={(e) => { setSize(e.target.value); sync({ size: e.target.value }); }}>
                <option value="">{t("size")}: {t("all")}</option>
                {sizes.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </>
          )}
          <label className="vh" htmlFor="so">{t("sort")}</label>
          <select id="so" className="field" value={sort} onChange={(e) => { setSort(e.target.value); sync({ sort: e.target.value }); }}>
            <option value="new">{t("sortNew")}</option>
            <option value="price-asc">{t("sortPriceAsc")}</option>
            <option value="price-desc">{t("sortPriceDesc")}</option>
          </select>
        </div>
      </div>
      <p className="count" aria-live="polite" style={{ marginBottom: 20 }}>{t("results", { n: list.length })}</p>
      {list.length > 0 ? (
        <div className="grid">{list.map((p, i) => <ProductCardClient key={p.id} p={p} priority={i < 4} />)}</div>
      ) : (
        <div className="empty">
          {filtered || products.length > 0 ? (
            <>
              <h2>{t("noResults")}</h2><p>{t("noResultsHelp")}</p>
              <button className="btn" onClick={clear}>{t("clear")}</button>
            </>
          ) : (
            <>
              <h2>{t("emptyCategory")}</h2><p>{t("emptyCategoryHelp")}</p>
              <Link className="btn" href="/shop">{t("shopNow")}</Link>
            </>
          )}
        </div>
      )}
      <span className="vh">{l(undefined)}</span>
    </>
  );
}
