import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { mutate } from "@/lib/store";
import { DISTRICTS, normalizeBdPhone } from "@/lib/bd";
import { deliveryFor } from "@/lib/pricing";
import type { Order, OrderItem } from "@/lib/types";

const hits = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  if (recent.length >= 10) return NextResponse.json({ error: "rate" }, { status: 429 });
  hits.set(ip, [...recent, now]);

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "bad" }, { status: 400 });
  const c = body.customer ?? {};
  const name = String(c.name ?? "").trim().slice(0, 100);
  const phone = normalizeBdPhone(String(c.phone ?? ""));
  const address = String(c.address ?? "").trim().slice(0, 400);
  const district = String(c.district ?? "");
  const note = String(c.note ?? "").trim().slice(0, 400);
  const fields: Record<string, string> = {};
  if (name.length < 2) fields.name = "errName";
  if (!phone) fields.phone = "errPhone";
  if (address.length < 6) fields.address = "errAddress";
  if (!DISTRICTS.includes(district)) fields.district = "errDistrict";
  const lines: { productId: string; variantId: string; qty: number }[] = Array.isArray(body.items) ? body.items : [];
  if (!lines.length || lines.length > 50) return NextResponse.json({ error: "empty" }, { status: 400 });
  if (Object.keys(fields).length) return NextResponse.json({ error: "validation", fields }, { status: 422 });

  try {
    const order = await mutate((s) => {
      if (!s.settings.payment.codEnabled) throw new Error("payment");
      const items: OrderItem[] = [];
      for (const l of lines) {
        const p = s.products.find((x) => x.id === l.productId && x.active);
        const v = p?.variants.find((x) => x.id === l.variantId);
        const qty = Math.floor(Number(l.qty));
        if (!p || !v || !(qty >= 1 && qty <= 20)) throw new Error("item");
        if (p.price == null) throw new Error("price");
        if (v.stock != null && v.stock < qty) throw new Error("stock");
        items.push({ productId: p.id, name: p.name.en, variantId: v.id, size: v.size, color: v.color, qty, unitPrice: p.price });
      }
      for (const it of items) {
        const v = s.products.find((x) => x.id === it.productId)!.variants.find((x) => x.id === it.variantId)!;
        if (v.stock != null) v.stock -= it.qty;
      }
      const subtotal = items.reduce((a, i) => a + i.unitPrice * i.qty, 0);
      const delivery = deliveryFor(s.settings.shipping, district, subtotal);
      const o: Order = {
        id: `LN-${Date.now().toString(36).toUpperCase().slice(-5)}${randomBytes(1).toString("hex").toUpperCase()}`,
        createdAt: new Date().toISOString(), status: "new",
        customer: { name, phone: phone!, address, district, note },
        items, subtotal, delivery, total: delivery == null ? null : subtotal + delivery,
        payment: "cod", lang: body.lang === "bn" ? "bn" : "en",
      };
      s.orders.unshift(o);
      return o;
    });
    return NextResponse.json({ order });
  } catch (e) {
    const code = e instanceof Error ? e.message : "error";
    return NextResponse.json({ error: code }, { status: ["item", "price", "stock", "payment"].includes(code) ? 409 : 500 });
  }
}
