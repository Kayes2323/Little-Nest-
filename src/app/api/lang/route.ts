import { NextResponse } from "next/server";
import { LANG_COOKIE } from "@/lib/lang";

export async function POST(req: Request) {
  const { lang } = await req.json().catch(() => ({ lang: "en" }));
  const res = NextResponse.json({ ok: true });
  res.cookies.set(LANG_COOKIE, lang === "bn" ? "bn" : "en", { path: "/", maxAge: 60 * 60 * 24 * 365, sameSite: "lax" });
  return res;
}
