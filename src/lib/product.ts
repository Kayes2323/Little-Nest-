import type { Product, Variant } from "./types";

export const variantAvailable = (v: Variant) => v.stock == null || v.stock > 0;
/** Products with no variants listed (sizes not set yet) are treated as available; ordering happens via WhatsApp. */
export const productAvailable = (p: Product) => p.variants.length === 0 || p.variants.some(variantAvailable);
export const purchasable = (p: Product) => p.price != null && productAvailable(p);
export const uniqueSizes = (p: Product) => [...new Set(p.variants.map((v) => v.size))];
export const uniqueColors = (p: Product) => {
  const m = new Map<string, string>();
  p.variants.forEach((v) => v.color && !m.has(v.color) && m.set(v.color, v.colorHex));
  return [...m].map(([name, hex]) => ({ name, hex }));
};
/** A product can be quick-added only when there is nothing left to choose. */
export const singleVariant = (p: Product): Variant | null => {
  const avail = p.variants.filter(variantAvailable);
  return p.variants.length === 1 && avail.length === 1 ? avail[0] : null;
};
