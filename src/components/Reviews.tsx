"use client";
import { useState } from "react";
import type { Review } from "@/lib/types";
import { useLang } from "./Providers";
import { num, type DictKey } from "@/lib/i18n";
import { whatsappUrl } from "@/lib/bd";
import { IconWhatsApp } from "./Icons";

const Stars = ({ n }: { n: number }) => <span className="stars" aria-hidden>{"★".repeat(n)}<span style={{ color: "#d9cfba" }}>{"★".repeat(5 - n)}</span></span>;

/** Shows reviews from src/data/seed.ts. New reviews are sent to the shop on WhatsApp (nothing is auto-published). */
export function Reviews({ reviews, products, whatsapp }: { reviews: Review[]; products: { id: string; name: string }[]; whatsapp: string }) {
  const { t, lang } = useLang();
  const [f, setF] = useState({ name: "", text: "", rating: 0, productId: "" });
  const [errs, setErrs] = useState<Record<string, DictKey>>({});
  const [link, setLink] = useState("");
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  const nameOf = (id: string) => products.find((p) => p.id === id)?.name;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const er: Record<string, DictKey> = {};
    if (f.name.trim().length < 2) er.name = "errReviewName";
    if (f.text.trim().length < 5) er.text = "errReviewText";
    if (!f.rating) er.rating = "errRating";
    setErrs(er);
    if (Object.keys(er).length) return;
    const about = f.productId ? nameOf(f.productId) : "";
    const msg = [t("msgReview"), "★".repeat(f.rating) + "☆".repeat(5 - f.rating), f.text.trim(), about ? `(${about})` : "", `— ${f.name.trim()}`].filter(Boolean).join("\n");
    const url = whatsappUrl(whatsapp, msg);
    setLink(url);
    window.open(url, "_blank", "noopener");
  };

  return (
    <div className="reviews-grid">
      <div>
        {reviews.length > 0 ? (
          <>
            <p style={{ marginBottom: 8 }}><Stars n={Math.round(avg)} /> <strong>{num(Number(avg.toFixed(1)), lang)}</strong> <span className="note">({num(reviews.length, lang)})</span></p>
            {reviews.map((r) => (
              <article className="review" key={r.id}>
                <span role="img" aria-label={t("stars", { n: num(r.rating, lang) })}><Stars n={r.rating} /></span>
                <p>{r.text}</p>
                <small>{r.name}{r.productId && nameOf(r.productId) ? ` · ${nameOf(r.productId)}` : ""}</small>
              </article>
            ))}
          </>
        ) : (
          <div><h3 style={{ fontSize: 24, marginBottom: 6 }}>{t("noReviews")}</h3><p className="note">{t("noReviewsHelp")}</p></div>
        )}
      </div>
      <form className="form" onSubmit={submit} noValidate aria-label={t("writeReview")}>
        <h3 style={{ fontSize: 26 }}>{t("writeReview")}</h3>
        {link ? (
          <div className="form">
            <div className="banner" role="status">{t("reviewThanks")}</div>
            <a className="btn btn--wa" href={link} target="_blank" rel="noopener noreferrer"><IconWhatsApp />{t("reopenWa")}</a>
          </div>
        ) : (
          <>
            <div>
              <div id="rv-rating" style={{ fontSize: 14, marginBottom: 2 }}>{t("rating")}</div>
              <div className="starpick" role="group" aria-labelledby="rv-rating">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button type="button" key={n} className={f.rating >= n ? "on" : ""} aria-pressed={f.rating === n} aria-label={t("stars", { n: num(n, lang) })} onClick={() => setF({ ...f, rating: n })}>★</button>
                ))}
              </div>
              {errs.rating && <span className="err" role="alert">{t(errs.rating)}</span>}
            </div>
            <label>{t("yourName")}<input className="field" value={f.name} aria-invalid={errs.name ? true : undefined} onChange={(e) => setF({ ...f, name: e.target.value })} autoComplete="name" />
              {errs.name && <span className="err" role="alert">{t(errs.name)}</span>}</label>
            <label>{t("reviewFor")}<select className="field" value={f.productId} onChange={(e) => setF({ ...f, productId: e.target.value })}>
              <option value="">{t("generalReview")}</option>{products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}</select></label>
            <label>{t("yourReview")}<textarea className="field" value={f.text} aria-invalid={errs.text ? true : undefined} onChange={(e) => setF({ ...f, text: e.target.value })} />
              {errs.text && <span className="err" role="alert">{t(errs.text)}</span>}</label>
            <button className="btn btn--wa" type="submit" disabled={!whatsapp}><IconWhatsApp />{t("sendReview")}</button>
            <p className="note">{t("reviewsNote")}</p>
          </>
        )}
      </form>
    </div>
  );
}
