"use client";
import { useLang } from "./Providers";
import { ProductCard } from "./ProductCard";
import type { Product } from "@/lib/types";

/** ProductCard is server-safe; this thin wrapper lets client lists reuse it with the current language. */
export function ProductCardClient({ p, priority }: { p: Product; priority?: boolean }) {
  const { lang } = useLang();
  return <ProductCard p={p} lang={lang} priority={priority} />;
}
