"use client";
import { useState } from "react";
import type { Review } from "@/lib/types";
import { useLang } from "./Providers";
import type { DictKey } from "@/lib/i18n";
import { num } from "@/lib/i18n";

const Stars = ({ n }: { n: number }) => <span className="stars" aria-hidden>{"★".repeat(n)}<span style={{ color: "#d9cfba" }}>{"★".repeat(5 - n)}</span></span>;

export function Reviews({ reviews, products }: { reviews: Review[]; products: { id: string; name: string }[] }) {
  const { t, lang } = useLang();
  const [f, setF] = useState({ name: "", text: "", rating: 0, productId: "" });
  const [errs, setErrs] = useState<Record<string, DictKey>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [fail, setFail] = useState(false);
  const avg = reviews.length ? reviews.reduce((a, r) => a + r.rating, 0) / reviews.length : 0;
  const nameOf = (id: string) => products.find((p) => p.id === id)?.name;

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFail(false);
    const er: Record<string, DictKey> = {};
    if (f.name.trim().length < 2) er.name = "errReviewName";
    if (f.text.trim().length < 5) er.text = "errReviewText";
    if (!f.rating) er.rating = "errRating";
    setErrs(er);
    if (Object.keys(er).length) return;
    setBusy(true);
    try {
      const r = await fetch("/api/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(f) });
      if (r.ok) { setDone(true); setF({ name: "", text: "", rating: 0, productId: "" }); } else setFail(true);
    } catch { setFail(true); } finally { setBusy(false); }
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
        {done ? <div className="banner" role="status">{t("reviewThanks")}</div> : (
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
            {fail && <div className="banner banner--err" role="alert">{t("errGeneric")}</div>}
            <button className="btn" type="submit" disabled={busy}>{t("sendReview")}</button>
            <p className="note">{t("reviewsNote")}</p>
          </>
        )}
      </form>
    </div>
  );
}
