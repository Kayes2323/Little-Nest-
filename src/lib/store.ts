import { seedStore } from "@/data/seed";
import type { Category, Store } from "./types";

/**
 * Content source. The site is fully static: all products, categories and copy live in src/data/seed.ts.
 * (An earlier version had a JSON-file/admin backend; it is in git history, commit 12125c4.)
 */
export async function readStore(): Promise<Store> {
  return seedStore();
}

export const activeCategories = (s: Store) => s.categories.filter((c) => c.active).sort((a, b) => a.order - b.order);
export const activeProducts = (s: Store) => s.products.filter((p) => p.active);
/** Categories that are active AND have at least one active product. */
export function stockedCategories(s: Store): Category[] {
  const prods = activeProducts(s);
  return activeCategories(s).filter((c) => prods.some((p) => p.categoryIds.includes(c.id)));
}
