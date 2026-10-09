"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Lang, Text } from "@/lib/types";
import { L, tr, formatTaka, type DictKey } from "@/lib/i18n";

/* ---------- language ---------- */
const LangCtx = createContext<Lang>("en");
export function useLang() {
  const lang = useContext(LangCtx);
  return useMemo(
    () => ({
      lang,
      t: (k: DictKey, v?: Record<string, string | number>) => tr(lang, k, v),
      l: (x: Text | undefined) => L(x, lang),
      money: (n: number) => formatTaka(n, lang),
    }),
    [lang]
  );
}

/* ---------- cart ---------- */
export interface CartLine {
  key: string;
  productId: string;
  variantId: string;
  qty: number;
  name: Text;
  slug: string;
  size: string;
  color: string;
  price: number;
  image: string;
  ratio: string;
  focal: string;
  stock: number | null;
}
interface CartApi {
  lines: CartLine[];
  ready: boolean;
  count: number;
  subtotal: number;
  add: (l: Omit<CartLine, "key" | "qty">, qty?: number) => void;
  setQty: (key: string, qty: number) => void;
  remove: (key: string) => void;
  clear: () => void;
  toast: string | null;
  notify: (m: string) => void;
}
const CartCtx = createContext<CartApi | null>(null);
export const useCart = () => {
  const c = useContext(CartCtx);
  if (!c) throw new Error("CartProvider missing");
  return c;
};
const KEY = "ln_cart_v1";

export function Providers({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(lines)); } catch {}
  }, [lines, ready]);
  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(null), 3500);
    return () => clearTimeout(id);
  }, [toast]);

  const add: CartApi["add"] = useCallback((l, qty = 1) => {
    const key = `${l.productId}:${l.variantId}`;
    setLines((cur) => {
      const ex = cur.find((x) => x.key === key);
      const max = l.stock ?? 20;
      if (ex) return cur.map((x) => (x.key === key ? { ...x, ...l, qty: Math.min(x.qty + qty, max, 20) } : x));
      return [...cur, { ...l, key, qty: Math.min(qty, max, 20) }];
    });
  }, []);
  const setQty = useCallback((key: string, qty: number) => {
    setLines((cur) => cur.map((x) => (x.key === key ? { ...x, qty: Math.max(1, Math.min(qty, x.stock ?? 20, 20)) } : x)));
  }, []);
  const remove = useCallback((key: string) => setLines((c) => c.filter((x) => x.key !== key)), []);
  const clear = useCallback(() => setLines([]), []);

  const api: CartApi = {
    lines, ready, add, setQty, remove, clear, toast, notify: setToast,
    count: lines.reduce((a, l) => a + l.qty, 0),
    subtotal: lines.reduce((a, l) => a + l.qty * l.price, 0),
  };
  return (
    <LangCtx.Provider value={lang}>
      <CartCtx.Provider value={api}>{children}</CartCtx.Provider>
    </LangCtx.Provider>
  );
}
