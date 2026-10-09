import "server-only";
import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "ln_admin";
const MAX_AGE = 60 * 60 * 8;

const isProd = process.env.NODE_ENV === "production";
/** In dev a demo password is used so the admin can be explored. In production both env vars are REQUIRED. */
const PASSWORD = process.env.ADMIN_PASSWORD || (isProd ? "" : "littlenest-demo");
const SECRET = process.env.ADMIN_SECRET || (isProd ? "" : "dev-only-secret");

export const adminConfigured = () => Boolean(PASSWORD && SECRET);
export const usingDemoCredentials = () => !process.env.ADMIN_PASSWORD;

const sign = (v: string) => createHmac("sha256", SECRET).update(v).digest("hex");

export function checkPassword(input: string): boolean {
  if (!adminConfigured()) return false;
  const a = Buffer.from(input);
  const b = Buffer.from(PASSWORD);
  return a.length === b.length && timingSafeEqual(a, b);
}

export function makeToken(): string {
  const exp = String(Date.now() + MAX_AGE * 1000);
  return `${exp}.${sign(exp)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token || !adminConfigured()) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig || Number(exp) < Date.now()) return false;
  const good = sign(exp);
  return sig.length === good.length && timingSafeEqual(Buffer.from(sig), Buffer.from(good));
}

export async function isAdmin(): Promise<boolean> {
  return verifyToken((await cookies()).get(ADMIN_COOKIE)?.value);
}
export const adminCookieOptions = { httpOnly: true, sameSite: "lax" as const, secure: isProd, path: "/", maxAge: MAX_AGE };
