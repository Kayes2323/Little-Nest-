import "server-only";
import { cookies } from "next/headers";
import type { Lang } from "./types";

export const LANG_COOKIE = "ln_lang";
/** Bangla is the default; only an explicit choice of English switches it. */
export async function getLang(): Promise<Lang> {
  const c = (await cookies()).get(LANG_COOKIE)?.value;
  return c === "en" ? "en" : "bn";
}
