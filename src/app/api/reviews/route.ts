import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { mutate } from "@/lib/store";

const hits = new Map<string, number[]>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 60 * 60_000);
  if (recent.length >= 5) return NextResponse.json({ error: "rate" }, { status: 429 });
  const b = await req.json().catch(() => null);
  const name = String(b?.name ?? "").trim().slice(0, 60);
  const text = String(b?.text ?? "").trim().slice(0, 800);
  const rating = Math.round(Number(b?.rating));
  const fields: Record<string, string> = {};
  if (name.length < 2) fields.name = "errReviewName";
  if (text.length < 5) fields.text = "errReviewText";
  if (!(rating >= 1 && rating <= 5)) fields.rating = "errRating";
  if (Object.keys(fields).length) return NextResponse.json({ error: "validation", fields }, { status: 422 });
  hits.set(ip, [...recent, now]);
  await mutate((s) => {
    const productId = s.products.some((p) => p.id === b?.productId) ? String(b.productId) : "";
    // Always saved unapproved: nothing is shown publicly until the owner approves it.
    s.reviews.unshift({ id: `r-${Date.now().toString(36)}${randomBytes(2).toString("hex")}`, name, rating, text, productId, createdAt: new Date().toISOString(), approved: false });
  });
  return NextResponse.json({ ok: true });
}
