import "server-only";
import { cookies } from "next/headers";
import type { Lang } from "./types";

export const LANG_COOKIE = "ln_lang";
export async function getLang(): Promise<Lang> {
  const c = (await cookies()).get(LANG_COOKIE)?.value;
  return c === "bn" ? "bn" : "en";
}
