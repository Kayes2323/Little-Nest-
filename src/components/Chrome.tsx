"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart, useLang } from "./Providers";

/** Toast + mobile cart summary bar (shown only when the cart has items, and not on cart/checkout/admin). */
export function Chrome() {
  const { toast, count, subtotal, ready } = useCart();
  const { t, money } = useLang();
  const path = usePathname();
  const showBar = ready && count > 0 && !/^\/(cart|checkout|admin|order)/.test(path);
  return (
    <>
      {toast && (
        <div className="toast" role="status">
          <span>{toast}</span>
          <Link href="/cart">{t("viewCart")}</Link>
        </div>
      )}
      {showBar && (
        <div className="sticky-cart">
          <div><strong>{t("items", { n: count })}</strong><div className="note">{money(subtotal)}</div></div>
          <Link className="btn" href="/checkout">{t("checkout")}</Link>
        </div>
      )}
    </>
  );
}
