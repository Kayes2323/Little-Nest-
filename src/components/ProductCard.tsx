import Link from "next/link";
import type { Lang, Product } from "@/lib/types";
import { L, tr, formatTaka } from "@/lib/i18n";
import { Media } from "./Media";
import { QuickAdd } from "./QuickAdd";
import { productAvailable, singleVariant, uniqueColors, uniqueSizes } from "@/lib/product";

export function ProductCard({ p, lang, priority = false }: { p: Product; lang: Lang; priority?: boolean }) {
  const name = L(p.name, lang);
  const href = `/products/${p.slug}`;
  const sizes = uniqueSizes(p);
  const colors = uniqueColors(p);
  const sold = !productAvailable(p);
  const first = p.images[0];
  const second = p.images[1];
  return (
    <article className="card">
      <Link href={href} className="card__img" style={{ aspectRatio: p.ratio }} aria-label={`${name}, ${tr(lang, "viewDetails")}`}>
        <Media src={first?.url} alt={first?.alt || name} focal={p.focal} seed={p.id} label={first ? undefined : tr(lang, "mediaSoon")} priority={priority}
          sizes="(min-width: 1100px) 25vw, (min-width: 760px) 33vw, 50vw" />
        {second && (
          <div className="alt" aria-hidden>
            <Media src={second.url} alt="" focal={p.focal} seed={p.id} sizes="(min-width: 760px) 33vw, 50vw" />
          </div>
        )}
        {sold ? <span className="tag">{tr(lang, "soldOut")}</span> : p.isNew ? <span className="tag">{tr(lang, "new")}</span> : null}
        {p.sample && <span className="tag tag--sample">{tr(lang, "sample")}</span>}
      </Link>
      <div className="card__body">
        <h3 className="card__name"><Link href={href}>{name}</Link></h3>
        {p.price != null ? <span className="price">{formatTaka(p.price, lang)}</span> : <span className="price price--muted">{tr(lang, "priceSoon")}</span>}
        {(sizes.length > 0 || colors.length > 0) && (
          <div className="sizes">
            {sizes.length > 0 && <span>{sizes.slice(0, 4).join(" · ")}{sizes.length > 4 ? " …" : ""}</span>}
            {colors.length > 0 && (
              <span className="dots" aria-label={colors.map((c) => c.name).join(", ")}>
                {colors.slice(0, 5).map((c) => <i key={c.name} className="dot" style={{ background: c.hex || "#ddd" }} title={c.name} />)}
              </span>
            )}
          </div>
        )}
        <div className="card__actions">
          {singleVariant(p) && p.price != null ? <QuickAdd p={p} /> : null}
        </div>
      </div>
    </article>
  );
}
