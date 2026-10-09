"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart, useLang } from "./Providers";
import type { Settings } from "@/lib/types";
import { DISTRICTS, districtLabel, normalizeBdPhone, whatsappUrl } from "@/lib/bd";
import { deliveryFor } from "@/lib/pricing";
import { IconWhatsApp } from "./Icons";
import { num, type DictKey } from "@/lib/i18n";

/**
 * Orders are placed by sending a prepared WhatsApp message to the shop (no server-side storage).
 * Payment is Cash on Delivery; the delivery charge is confirmed by the shop on WhatsApp.
 */
export function Checkout({ shipping, codEnabled, whatsapp }: { shipping: Settings["shipping"]; codEnabled: boolean; whatsapp: string }) {
  const { lines, ready, subtotal, clear } = useCart();
  const { t, l, lang, money } = useLang();
  const router = useRouter();
  const [f, setF] = useState({ name: "", phone: "", address: "", district: "", note: "" });
  const [errs, setErrs] = useState<Record<string, DictKey>>({});
  const [waLink, setWaLink] = useState("");

  const delivery = deliveryFor(shipping, f.district || null, subtotal);
  const total = delivery == null ? null : subtotal + delivery;
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => setF({ ...f, [k]: e.target.value });
  const lineText = (x: (typeof lines)[number]) => `• ${l(x.name)}${x.size ? ` (${x.size})` : ""}${x.color ? ` ${x.color}` : ""} × ${num(x.qty, lang)} = ${money(x.price * x.qty)}`;

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    const e: Record<string, DictKey> = {};
    if (f.name.trim().length < 2) e.name = "errName";
    if (!normalizeBdPhone(f.phone)) e.phone = "errPhone";
    if (f.address.trim().length < 6) e.address = "errAddress";
    if (!f.district) e.district = "errDistrict";
    setErrs(e);
    if (Object.keys(e).length) {
      requestAnimationFrame(() => (document.querySelector('[aria-invalid="true"]') as HTMLElement | null)?.focus());
      return;
    }
    const msg = [
      t("msgOrder"),
      ...lines.map(lineText),
      `${t("msgSubtotal")}: ${money(subtotal)}`,
      `${t("msgDelivery")}: ${delivery == null ? t("msgDeliveryTbc") : delivery === 0 ? t("free") : money(delivery)}`,
      `${t("msgPayment")}: ${t("cod")}`,
      "",
      `${t("msgName")}: ${f.name.trim()}`,
      `${t("msgPhone")}: ${normalizeBdPhone(f.phone)}`,
      `${t("msgDistrict")}: ${districtLabel(f.district, lang)}`,
      `${t("msgAddress")}: ${f.address.trim()}`,
      ...(f.note.trim() ? [`${t("msgNote")}: ${f.note.trim()}`] : []),
    ].join("\n");
    const url = whatsappUrl(whatsapp, msg);
    setWaLink(url);
    window.open(url, "_blank", "noopener");
  };

  if (!ready) return <div className="empty" aria-busy="true" style={{ minHeight: 280 }} />;

  if (waLink)
    return (
      <div className="empty">
        <h2>{t("orderPlaced")}</h2>
        <p>{t("orderThanks")}</p>
        <a className="btn btn--wa" href={waLink} target="_blank" rel="noopener noreferrer"><IconWhatsApp />{t("reopenWa")}</a>
        <button className="link" style={{ background: "none", border: 0, cursor: "pointer" }} onClick={() => { clear(); router.push("/"); }}>{t("clearAndHome")}</button>
      </div>
    );

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
            {DISTRICTS.map((d) => <option key={d} value={d}>{districtLabel(d, lang)}</option>)}
          </select>
        ))}
        {field("address", t("address"), (p) => <textarea {...p} autoComplete="street-address" />)}
        {field("note", t("note"), (p) => <textarea {...p} />)}
        <fieldset style={{ border: "1px solid var(--line)", borderRadius: 4, padding: 14 }}>
          <legend>{t("payment")}</legend>
          {codEnabled && <label style={{ display: "flex", gap: 10, alignItems: "center" }}><input type="radio" checked readOnly /> {t("cod")}</label>}
        </fieldset>
      </div>
      <aside className="summary" aria-label={t("total")}>
        {lines.map((x) => (
          <div className="row" key={x.key}><span>{l(x.name)}{x.size ? ` · ${x.size}` : ""} × {num(x.qty, lang)}</span><span>{money(x.price * x.qty)}</span></div>
        ))}
        <div className="row" style={{ borderTop: "1px solid var(--line)", paddingTop: 12 }}><span>{t("subtotal")}</span><span>{money(subtotal)}</span></div>
        <div className="row"><span>{t("delivery")}</span><span>{delivery == null ? t("tbc") : delivery === 0 ? t("free") : money(delivery)}</span></div>
        <div className="row row--total"><span>{t("total")}</span><span>{total == null ? `${money(subtotal)} + ${t("delivery")}` : money(total)}</span></div>
        {delivery == null && <p className="note">{t("shipTo")}</p>}
        <button className="btn btn--wa btn--block" type="submit" disabled={!codEnabled || !whatsapp}><IconWhatsApp />{t("placeOrder")}</button>
        {!whatsapp && <p className="err">{t("waNotSet")}</p>}
      </aside>
    </form>
  );
}
