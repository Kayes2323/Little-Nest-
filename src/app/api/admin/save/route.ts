import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth";
import { mutate } from "@/lib/store";
import type { Category, OrderStatus, Product, Settings } from "@/lib/types";

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || `item-${Date.now().toString(36)}`;
const STATUSES: OrderStatus[] = ["new", "confirmed", "shipped", "delivered", "cancelled"];
const text = (t: unknown) => ({ en: String((t as any)?.en ?? ""), bn: String((t as any)?.bn ?? "") });
const numOrNull = (v: unknown) => (v === "" || v == null || Number.isNaN(Number(v)) ? null : Math.max(0, Number(v)));

export async function POST(req: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { type, action, payload } = await req.json().catch(() => ({}));
  try {
    const result = await mutate((s) => {
      if (type === "settings") {
        s.settings = payload as Settings;
        return { ok: true };
      }
      if (type === "product") {
        if (action === "delete") {
          s.products = s.products.filter((p) => p.id !== payload.id);
          return { ok: true };
        }
        const p = payload as Product;
        const id = p.id || slugify(p.name.en);
        const prev = s.products.find((x) => x.id === id);
        const slugBase = slugify(p.slug || p.name.en);
        const slug = s.products.some((x) => x.id !== id && x.slug === slugBase) ? `${slugBase}-${Date.now().toString(36).slice(-3)}` : slugBase;
        const clean: Product = {
          ...p, id: prev?.id ?? id, slug, name: text(p.name), description: text(p.description), careNote: text(p.careNote),
          price: numOrNull(p.price),
          variants: (p.variants ?? []).map((v, i) => ({
            id: v.id || `v${i}-${slugify(`${v.size}-${v.color}`)}`, size: String(v.size).trim(), color: String(v.color ?? "").trim(),
            colorHex: String(v.colorHex ?? ""), stock: numOrNull(v.stock),
          })).filter((v) => v.size),
          images: (p.images ?? []).filter((i) => i.url),
          createdAt: prev?.createdAt ?? new Date().toISOString(),
        };
        if (prev) Object.assign(prev, clean); else s.products.unshift(clean);
        return { ok: true, id: clean.id };
      }
      if (type === "category") {
        if (action === "delete") {
          s.categories = s.categories.filter((c) => c.id !== payload.id);
          s.products.forEach((p) => (p.categoryIds = p.categoryIds.filter((c) => c !== payload.id)));
          return { ok: true };
        }
        const c = payload as Category;
        const id = c.id || slugify(c.name.en);
        const existing = s.categories.find((x) => x.id === id);
        const clean: Category = { ...c, id, slug: existing?.slug ?? slugify(c.slug || c.name.en), name: text(c.name), description: text(c.description), order: Number(c.order) || 99 };
        if (existing) Object.assign(existing, clean); else s.categories.push(clean);
        return { ok: true };
      }
      if (type === "order") {
        const o = s.orders.find((x) => x.id === payload.id);
        if (!o || !STATUSES.includes(payload.status)) throw new Error("bad");
        if (payload.status === "cancelled" && o.status !== "cancelled") {
          for (const it of o.items) {
            const v = s.products.find((p) => p.id === it.productId)?.variants.find((x) => x.id === it.variantId);
            if (v && v.stock != null) v.stock += it.qty; // restock
          }
        }
        o.status = payload.status;
        return { ok: true };
      }
      if (type === "review") {
        if (action === "delete") { s.reviews = s.reviews.filter((r) => r.id !== payload.id); return { ok: true }; }
        const r = s.reviews.find((x) => x.id === payload.id);
        if (!r) throw new Error("bad");
        r.approved = Boolean(payload.approved);
        return { ok: true };
      }
      throw new Error("bad");
    });
    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Could not save" }, { status: 400 });
  }
}
