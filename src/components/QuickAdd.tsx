"use client";
import type { Product } from "@/lib/types";
import { useCart, useLang } from "./Providers";
import { singleVariant } from "@/lib/product";

export function lineFor(p: Product, variantId: string) {
  const v = p.variants.find((x) => x.id === variantId)!;
  return {
    productId: p.id, variantId: v.id, name: p.name, slug: p.slug, size: v.size, color: v.color,
    price: p.price ?? 0, image: p.images[0]?.url ?? "", ratio: p.ratio, focal: p.focal, stock: v.stock,
  };
}

/** Quick add is only offered when the product has exactly one purchasable variant. */
export function QuickAdd({ p }: { p: Product }) {
  const { add, notify } = useCart();
  const { t } = useLang();
  const v = singleVariant(p);
  if (!v || p.price == null) return null;
  return (
    <button className="btn btn--ghost" onClick={() => { add(lineFor(p, v.id)); notify(t("added")); }}>
      {t("addToCart")}
    </button>
  );
}
