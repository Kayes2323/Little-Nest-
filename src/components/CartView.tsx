"use client";
import Link from "next/link";
import { useCart, useLang } from "./Providers";
import { Media } from "./Media";

export function CartView() {
  const { lines, ready, setQty, remove, subtotal, count } = useCart();
  const { t, l, money } = useLang();
  if (!ready) return <div className="empty" aria-busy="true" style={{ minHeight: 280 }} />;
  if (!lines.length)
    return (
      <div className="empty">
        <h2>{t("emptyCart")}</h2><p>{t("emptyCartHelp")}</p>
        <Link className="btn" href="/shop">{t("continueShopping")}</Link>
      </div>
    );
  return (
    <div className="split">
      <div>
        {lines.map((x) => (
          <div className="cart-line" key={x.key}>
            <Link className="cart-line__img" href={`/products/${x.slug}`} style={{ aspectRatio: "4 / 5" }}>
              <Media src={x.image} alt={l(x.name)} seed={x.productId} focal={x.focal} sizes="110px" />
            </Link>
            <div>
              <h3><Link href={`/products/${x.slug}`}>{l(x.name)}</Link></h3>
              <small>{t("size")}: {x.size}{x.color ? ` · ${x.color}` : ""}</small>
              <div className="qty" role="group" aria-label={t("qty")}>
                <button aria-label="−" onClick={() => setQty(x.key, x.qty - 1)} disabled={x.qty <= 1}>−</button>
                <output aria-live="polite">{x.qty}</output>
                <button aria-label="+" onClick={() => setQty(x.key, x.qty + 1)}>+</button>
              </div>
              <div><button className="linklike" onClick={() => remove(x.key)}>{t("remove")}</button></div>
            </div>
            <strong>{money(x.price * x.qty)}</strong>
          </div>
        ))}
      </div>
      <aside className="summary" aria-label={t("yourCart")}>
        <div className="row"><span>{t("subtotal")} · {t("items", { n: count })}</span><span>{money(subtotal)}</span></div>
        <p className="note">{t("shipTo")}</p>
        <Link className="btn btn--block" href="/checkout">{t("checkout")}</Link>
        <Link className="link" style={{ justifySelf: "center" }} href="/shop">{t("continueShopping")}</Link>
      </aside>
    </div>
  );
}
