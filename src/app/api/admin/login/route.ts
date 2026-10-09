import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminCookieOptions, checkPassword, makeToken } from "@/lib/auth";

const attempts = new Map<string, { n: number; t: number }>();

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ?? "local";
  const a = attempts.get(ip);
  if (a && Date.now() - a.t < 15 * 60_000 && a.n >= 8) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });
  const { password } = await req.json().catch(() => ({ password: "" }));
  if (!checkPassword(String(password ?? ""))) {
    attempts.set(ip, { n: (a && Date.now() - a.t < 15 * 60_000 ? a.n : 0) + 1, t: a?.t ?? Date.now() });
    return NextResponse.json({ error: "Wrong password" }, { status: 401 });
  }
  attempts.delete(ip);
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, makeToken(), adminCookieOptions);
  return res;
}
