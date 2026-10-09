"use client";
import { useState } from "react";
import Image from "next/image";

export function Silhouette() {
  return (
    <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round" aria-hidden>
      <path d="M36 14c3 5 8 8 14 8s11-3 14-8l17 9-6 15-8-3v48a4 4 0 0 1-4 4H37a4 4 0 0 1-4-4V35l-8 3-6-15 17-9Z" />
      <path d="M44 62h12" opacity=".5" />
    </svg>
  );
}

const TINTS = [
  ["#efe3d3", "#a89478"], ["#dfe6da", "#6f836d"], ["#f1ddd6", "#b98a7e"], ["#e6e1ee", "#8b83a3"],
];
const tint = (seed: string) => TINTS[[...seed].reduce((a, c) => a + c.charCodeAt(0), 0) % TINTS.length];

/** Fills its (positioned) parent. Falls back to a labelled placeholder if no src or the image fails. */
export function Media({
  src, alt, focal = "50% 40%", seed = "x", label, priority = false, sizes, fit = "cover",
}: { src?: string; alt: string; focal?: string; seed?: string; label?: string; priority?: boolean; sizes?: string; fit?: "cover" | "contain" }) {
  const [bad, setBad] = useState(false);
  const [bg, fg] = tint(seed);
  return (
    <div className="media">
      {src && !bad ? (
        src.startsWith("/") ? (
          // Local files go through the Next image optimiser (responsive sizes, WebP/AVIF, lazy below the fold).
          <Image
            src={src} alt={alt} fill sizes={sizes ?? "(min-width: 900px) 40vw, 100vw"} quality={80} priority={priority}
            style={{ objectPosition: focal, objectFit: fit }} onError={() => setBad(true)}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={alt} sizes={sizes} loading={priority ? "eager" : "lazy"} decoding="async"
            style={{ objectPosition: focal, objectFit: fit }} onError={() => setBad(true)} />
        )
      ) : (
        <div className="ph" style={{ ["--ph-bg" as string]: bg, ["--ph-fg" as string]: fg }} role={alt ? "img" : undefined} aria-label={alt || undefined}>
          <Silhouette />
          {label && <small>{label}</small>}
        </div>
      )}
    </div>
  );
}
