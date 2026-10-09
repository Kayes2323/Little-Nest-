"use client";
import Link from "next/link";
import { useState } from "react";
import { useCart, useLang } from "./Providers";
import type { Order, Settings } from "@/lib/types";
import { DISTRICTS, normalizeBdPhone, whatsappUrl } from "@/lib/bd";
import { deliveryFor } from "@/lib/pricing";
import { IconWhatsApp } from "./Icons";
import type { DictKey } from "@/lib/i18n";

export function Checkout({ shipping, codEnabled, whatsapp }: { shipping: Settings["shipping"]; codEnabled: boolean; whatsapp: string }) {
  const { lines, ready, subtotal, clear } = useCart();
  const { t, l, lang, money } = useLang();
  const [f, setF] = useState({ name: "", phone: "", address: "", district: "", note: "" });
  const [errs, setErrs] = useState<Record<string, DictKey>>({});
  const [busy, setBusy] = useState(false);
  const [fail, setFail] = useState("");
  const [done, setDone] = useState<Order | null>(null);

  const delivery = deliveryFor(shipping, f.district || null, subtotal);
  const total = delivery == null ? null : subtotal + delivery;
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });

  const validate = () => {
    const e: Record<string, DictKey> = {};
    if (f.name.trim().length < 2) e.name = "errName";
    if (!normalizeBdPhone(f.phone)) e.phone = "errPhone";
    if (f.address.trim().length < 6) e.address = "errAddress";
    if (!f.district) e.district = "errDistrict";
    setErrs(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    setFail("");
    if (!validate()) {
      requestAnimationFrame(() => (document.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus());
      return;
    }
    setBusy(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ customer: f, lang, items: lines.map((x) => ({ productId: x.productId, variantId: x.variantId, qty: x.qty })) }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.fields) setErrs(data.fields);
        else setFail(data.error === "stock" ? t("outOfStock") : t("errGeneric"));
        return;
      }
      setDone(data.order);
      clear();
    } catch {
      setFail(t("errGeneric"));
    } finally {
      setBusy(false);
    }
  };

  if (done) {
    const msg = `${lang === "bn" ? "আমার অর্ডার" : "My order"} ${done.id}\n` +
      done.items.map((i) => `• ${i.name} (${i.size}${i.color ? `, ${i.color}` : ""}) × ${i.qty}`).join("\n") +
      `\n${t("total")}: ${done.total != null ? money(done.total) : t("tbc")}\n${done.customer.name}, ${done.customer.phone}`;
    return (
      <div className="empty">
        <h2>{t("orderPlaced")}</h2>
        <p>{t("orderThanks")}</p>
        <p><strong>{t("orderNo")}: {done.id}</strong></p>
        {whatsapp && <a className="btn btn--wa" href={whatsappUrl(whatsapp, msg)} target="_blank" rel="noopener noreferrer"><IconWhatsApp />{t("confirmWa")}</a>}
        <Link className="link" href="/">{t("backHome")}</Link>
      </div>
    );
  }
  if (!ready) return <div className="empty" aria-busy="true" style={{ minHeight: 280 }} />;
  if (!lines.length)
    return (
      <div className="empty">
        <h2>{t("emptyCart")}</h2><p>{t("emptyCartHelp")}</p>
        <Link className="btn" href="/shop">{t("continueShopping")}</Link>
      </div>
    );

  const field = (k: keyof typeof f, label: string, el: (p: object) => React.ReactNode) => (
    <label>
      {label}
      {el({ id: `f-${k}`, value: f[k], onChange: set(k), "aria-invalid": errs[k] ? true : undefined, "aria-describedby": errs[k] ? `e-${k}` : undefined, className: "field" })}
      {errs[k] && <span className="err" id={`e-${k}`} role="alert">{t(errs[k])}</span>}
    </label>
  );

  return (
    <form className="split" onSubmit={submit} noValidate>
      <div className="form">
        {field("name", t("name"), (p) => <input {...p} autoComplete="name" />)}
        {field("phone", t("phone"), (p) => <input {...p} type="tel" inputMode="tel" autoComplete="tel" placeholder="01XXXXXXXXX" />)}
        {field("district", t("district"), (p) => (
          <select {...p} autoComplete="address-level1">
            <option value="">{t("selectDistrict")}</option>
            {DISTRICTS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        ))}
        {field("address", t("address"), (p) => <textarea {...p} autoComplete="street-address" />)}
        {field("note", t("note"), (p) => <textarea {...p} />)}
        <fieldset style={{ border: "1px solid var(--line)", borderRadius: 4, padding: 14 }}>
          <legend>{t("payment")}</legend>
          {codEnabled ? (
            <label style={{ display: "flex", gap: 10, alignItems: "center" }}><input type="radio" checked readOnly /> {t("cod")}</label>
          ) : <p className="err">COD unavailable</p>}
        </fieldset>
      </div>
      <aside className="summary" aria-label={t("total")}>
        {lines.map((x) => (
          <div className="row" key={x.key}><span>{l(x.name)} · {x.size}{x.color ? `/${x.color}` : ""} × {x.qty}</span><span>{money(x.price * x.qty)}</span></div>
        ))}
        <div className="row" style={{ borderTop: "1px solid var(--line)", paddingTop: 12 }}><span>{t("subtotal")}</span><span>{money(subtotal)}</span></div>
        <div className="row"><span>{t("delivery")}</span><span>{delivery == null ? t("tbc") : delivery === 0 ? t("free") : money(delivery)}</span></div>
        <div className="row row--total"><span>{t("total")}</span><span>{total == null ? t("tbc") : money(total)}</span></div>
        {delivery == null && <p className="note">{t("shipTo")}</p>}
        {fail && <div className="banner banner--err" role="alert">{fail}</div>}
        <button className="btn btn--block" type="submit" disabled={busy || !codEnabled}>{busy ? t("placing") : t("placeOrder")}</button>
      </aside>
    </form>
  );
}
