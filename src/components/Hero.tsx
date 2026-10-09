"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import type { Settings } from "@/lib/types";
import { useLang } from "./Providers";
import { Silhouette } from "./Media";

export function Hero({ hero }: { hero: Settings["hero"] }) {
  const { l, t } = useLang();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [videoOk, setVideoOk] = useState(Boolean(hero.videoUrl));
  const [reduced, setReduced] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const [posterBad, setPosterBad] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    const c = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    setSaveData(Boolean(c?.saveData));
  }, []);

  const useVideo = videoOk && !reduced && !saveData && Boolean(hero.videoUrl);
  useEffect(() => {
    const v = ref.current;
    if (!v || !useVideo) return;
    v.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [useVideo]);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); } else { v.pause(); setPlaying(false); }
  };

  return (
    <section className={`hero${useVideo || !hero.posterUrl || posterBad ? "" : " hero--split"}`} aria-label={l(hero.headline)}>
      {hero.posterUrl && !posterBad ? (
        <div className="hero__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={hero.posterUrl} alt="" fetchPriority="high" onError={() => setPosterBad(true)} style={{ objectFit: "cover" }} />
        </div>
      ) : (
        <div className="hero__ph" aria-hidden><Silhouette /></div>
      )}
      {useVideo && (
        <div className="hero__media">
          <video ref={ref} src={hero.videoUrl} poster={hero.posterUrl || undefined} muted loop playsInline preload="metadata"
            onError={() => setVideoOk(false)} aria-hidden />
        </div>
      )}
      <div className="wrap">
        <div className="hero__copy">
          <span className="eyebrow">{l(hero.eyebrow)}</span>
          <h1>{l(hero.headline)}</h1>
          <p className="sub">{l(hero.sub)}</p>
          <div className="hero__cta">
            <Link className="btn btn--light" href={hero.ctaHref || "/shop"}>{l(hero.ctaLabel) || t("shopNow")}</Link>
            {hero.secondaryHref && <Link className="btn btn--outline-light" href={hero.secondaryHref}>{l(hero.secondaryLabel) || t("explore")}</Link>}
          </div>
        </div>
      </div>
      {useVideo && (
        <div className="hero__ctl">
          <button onClick={toggle} aria-pressed={playing}>{playing ? "❚❚ Pause" : "▶ Play"}</button>
        </div>
      )}
    </section>
  );
}
