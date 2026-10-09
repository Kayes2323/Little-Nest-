import type { Settings } from "./types";
import { isInsideDhaka } from "./bd";

/** Delivery charge in BDT. null = not configured yet ("to be confirmed"). 0 = free. */
export function deliveryFor(s: Settings["shipping"], district: string | null, subtotal: number): number | null {
  if (s.freeOver != null && subtotal >= s.freeOver && subtotal > 0) return 0;
  if (!district) return null;
  return isInsideDhaka(district) ? s.insideDhaka : s.outsideDhaka;
}
