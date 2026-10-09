"use client";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/types";
import { useCart, useLang } from "./Providers";
import { Media } from "./Media";
import { IconChevL, IconChevR, IconWhatsApp } from "./Icons";
import { lineFor } from "./QuickAdd";
import { variantAvailable } from "@/lib/product";
import { whatsappUrl } from "@/lib/bd";

export function ProductDetail({ p, whatsapp }: { p: Product; whatsapp: string }) {
  const { t, l, lang, money } = useLang();
  const { add, notify } = useCart();
  const name = l(p.name);
  const sizes = useMemo(() => [...new Set(p.variants.map((v) => v.size))], [p]);
  const colors = useMemo(() => {
    const m = new Map<string, string>();
    p.variants.forEach((v) => v.color && !m.has(v.color) && m.set(v.color, v.colorHex));
    return [...m].map(([n, hex]) => ({ n, hex }));
  }, [p]);
  const [size, setSize] = useState(sizes.length === 1 ? sizes[0] : "");
  const [color, setColor] = useState(colors.length === 1 ? colors[0].n : "");
  const [img, setImg] = useState(0);
  const [hint, setHint] = useState(false);

  const needColor = colors.length > 0;
  const variant = p.variants.find((v) => v.size === size && (v.color || "") === (needColor ? color : ""));
  const comboAvail = (s: string, c: string) => p.variants.some((v) => v.size === s && (!needColor || v.color === c) && variantAvailable(v));
  const ready = Boolean(size && (!needColor || color) && variant);
  const canBuy = ready && variant && variantAvailable(variant) && p.price != null;
  const imgs = p.images;
  const n = Math.max(imgs.length, 1);

  const stockLine = () => {
    if (!variant) return null;
    if (!variantAvailable(variant)) return <p className="stockline stockline--out">{t("outOfStock")}</p>;
    if (variant.stock != null && variant.stock <= 3) return <p className="stockline stockline--low">{t("lowStock", { n: variant.stock })}</p>;
    return <p className="stockline stockline--ok">{t("inStock")}</p>;
  };

  const addToCart = () => {
    if (!canBuy || !variant) { setHint(true); return; }
    add(lineFor(p, variant.id));
    notify(t("added"));
  };
  const waMsg = `${lang === "bn" ? "আমি এটি অর্ডার করতে চাই" : "I'd like to order"}: ${name}${size ? ` / ${t("size")} ${size}` : ""}${color ? ` / ${color}` : ""}${p.price != null ? ` / ${money(p.price)}` : ""}\n${typeof window !== "undefined" ? window.location.href : ""}`;

  return (
    <div className="pdp">
      <div className="gallery">
        <div className="gallery__main" style={{ aspectRatio: p.ratio }}>
          <Media src={imgs[img]?.url} alt={imgs[img]?.alt || name} fit="contain" seed={p.id} label={imgs.length ? undefined : t("mediaSoon")} priority sizes="(min-width:900px) 55vw, 100vw" />
          {imgs.length > 1 && (
            <>
              <button className="gallery__nav gallery__nav--l" aria-label={t("previous")} onClick={() => setImg((img - 1 + n) % n)}><IconChevL /></button>
              <button className="gallery__nav gallery__nav--r" aria-label={t("next")} onClick={() => setImg((img + 1) % n)}><IconChevR /></button>
            </>
          )}
        </div>
        {imgs.length > 1 && (
          <div className="thumbs">
            {imgs.map((im, i) => (
              <button key={i} aria-label={t("gotoImage", { n: i + 1 })} aria-current={i === img} onClick={() => setImg(i)}>
                <Media src={im.url} alt="" seed={p.id} sizes="72px" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="pdp__info">
        {p.sample && <span className="pill pill--warn">{t("sample")}</span>}
        <h1>{name}</h1>
        {p.price != null ? <span className="price">{money(p.price)}</span> : <span className="price price--muted">{t("priceSoon")}</span>}
        {l(p.description) && <p className="pdp__desc">{l(p.description)}</p>}

        {sizes.length > 0 && (
          <div className="opt">
            <div className="opt__label"><span id="lbl-size">{t("size")}</span>{hint && !size && <span className="err" role="alert">{t("selectSize")}</span>}</div>
            <div className="opt__row" role="group" aria-labelledby="lbl-size">
              {sizes.map((s) => (
                <button key={s} className="opt__btn" aria-pressed={size === s} disabled={needColor && color ? !comboAvail(s, color) : !p.variants.some((v) => v.size === s && variantAvailable(v))} onClick={() => setSize(s)}>{s}</button>
              ))}
            </div>
          </div>
        )}
        {needColor && (
          <div className="opt">
            <div className="opt__label"><span id="lbl-col">{t("colour")}{color ? `: ${color}` : ""}</span>{hint && !color && <span className="err" role="alert">{t("selectColor")}</span>}</div>
            <div className="opt__row" role="group" aria-labelledby="lbl-col">
              {colors.map((c) => (
                <button key={c.n} className="swatch" aria-pressed={color === c.n} aria-label={c.n} title={c.n}
                  disabled={size ? !comboAvail(size, c.n) : false} onClick={() => setColor(c.n)}>
                  <span style={{ background: c.hex || "#ddd" }} />
                </button>
              ))}
            </div>
          </div>
        )}
        {stockLine()}

        <div className="pdp__buy">
          {p.price != null ? (
            <button className="btn btn--block" onClick={addToCart} aria-disabled={ready && !canBuy}>{ready && variant && !variantAvailable(variant) ? t("outOfStock") : t("addToCart")}</button>
          ) : (
            <button className="btn btn--block" disabled>{t("priceNeeded")}</button>
          )}
          {whatsapp ? (
            <a className="btn btn--wa btn--block" href={whatsappUrl(whatsapp, waMsg)} target="_blank" rel="noopener noreferrer"><IconWhatsApp />{t("orderWa")}</a>
          ) : (
            <button className="btn btn--ghost btn--block" disabled title={t("waNotSet")}>{t("orderWa")}</button>
          )}
          {!whatsapp && <p className="note">{t("waNotSet")}</p>}
        </div>

        <div className="accordion">
          {l(p.careNote) && <details><summary>{t("care")}</summary><p>{l(p.careNote)}</p></details>}
          <details><summary>{t("deliveryInfo")} · {t("returns")}</summary><p>{t("shipTo")}</p></details>
        </div>
      </div>
    </div>
  );
}
