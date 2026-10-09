import "server-only";
import { promises as fs } from "fs";
import path from "path";
import { seedStore, seedSettings } from "@/data/seed";
import type { Order, Product, Category, Settings, Store } from "./types";

/**
 * Persistence layer. Default adapter = JSON file at data/runtime/store.json
 * (works on a normal server / VPS / local machine). On serverless hosts with a
 * read-only or ephemeral filesystem (e.g. Vercel) swap these four functions for
 * a database adapter (see README, "Going to production").
 */
const FILE = process.env.STORE_FILE || path.join(process.cwd(), "data", "runtime", "store.json");

let writeQueue: Promise<unknown> = Promise.resolve();

function mergeSettings(saved: Partial<Settings> | undefined): Settings {
  const s = saved ?? {};
  return {
    ...seedSettings,
    ...s,
    announcement: { ...seedSettings.announcement, ...s.announcement },
    hero: { ...seedSettings.hero, ...s.hero },
    brandStory: { ...seedSettings.brandStory, ...s.brandStory },
    contact: { ...seedSettings.contact, ...s.contact },
    shipping: { ...seedSettings.shipping, ...s.shipping },
    payment: { ...seedSettings.payment, ...s.payment },
    sections: { ...seedSettings.sections, ...s.sections },
    campaigns: s.campaigns ?? seedSettings.campaigns,
    trust: s.trust ?? seedSettings.trust,
    gallery: s.gallery ?? seedSettings.gallery,
  };
}

export async function readStore(): Promise<Store> {
  try {
    const raw = await fs.readFile(FILE, "utf8");
    const d = JSON.parse(raw) as Partial<Store>;
    const seed = seedStore();
    return {
      settings: mergeSettings(d.settings),
      categories: d.categories ?? seed.categories,
      products: d.products ?? seed.products,
      orders: d.orders ?? [],
    };
  } catch {
    return seedStore();
  }
}

/** Serialised read-modify-write so concurrent admin/order writes don't clobber each other. */
export function mutate<T>(fn: (s: Store) => T | Promise<T>): Promise<T> {
  const run = writeQueue.then(async () => {
    const s = await readStore();
    const out = await fn(s);
    await fs.mkdir(path.dirname(FILE), { recursive: true });
    const tmp = `${FILE}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(s, null, 2));
    await fs.rename(tmp, FILE);
    return out;
  });
  writeQueue = run.catch(() => undefined);
  return run;
}

export const activeCategories = (s: Store) => s.categories.filter((c) => c.active).sort((a, b) => a.order - b.order);
export const activeProducts = (s: Store) => s.products.filter((p) => p.active);
/** Categories that are active AND have at least one active product. */
export function stockedCategories(s: Store): Category[] {
  const prods = activeProducts(s);
  return activeCategories(s).filter((c) => prods.some((p) => p.categoryIds.includes(c.id)));
}
export type { Order, Product };
