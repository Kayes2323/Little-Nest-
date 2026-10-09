"use client";
import { useRef, useState } from "react";
import type { Text } from "@/lib/types";
import { Media } from "../Media";

export function TText({ label, value, onChange, multiline = false }: { label: string; value: Text; onChange: (v: Text) => void; multiline?: boolean }) {
  const C = multiline ? "textarea" : "input";
  return (
    <div className="cols cols--2">
      <label>{label} (English)<C className="field" value={value.en} onChange={(e) => onChange({ ...value, en: e.target.value })} /></label>
      <label>{label} (বাংলা)<C className="field" lang="bn" value={value.bn} onChange={(e) => onChange({ ...value, bn: e.target.value })} /></label>
    </div>
  );
}

export function Txt({ label, value, onChange, type = "text", placeholder }: { label: string; value: string | number | null; onChange: (v: string) => void; type?: string; placeholder?: string }) {
  return <label>{label}<input className="field" type={type} value={value ?? ""} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} /></label>;
}

export function Check({ label, value, onChange }: { label: string; value: boolean; onChange: (v: boolean) => void }) {
  return <label className="check"><input type="checkbox" checked={value} onChange={(e) => onChange(e.target.checked)} />{label}</label>;
}

export function Upload({ label, accept = "image/*", onUrl }: { label: string; accept?: string; onUrl: (url: string) => void }) {
  const ref = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const pick = async (f?: File) => {
    if (!f) return;
    setBusy(true); setErr("");
    const fd = new FormData(); fd.set("file", f);
    const r = await fetch("/api/admin/upload", { method: "POST", body: fd });
    const j = await r.json().catch(() => ({}));
    setBusy(false);
    if (r.ok) onUrl(j.url); else setErr(j.error || "Upload failed");
    if (ref.current) ref.current.value = "";
  };
  return (
    <div>
      <input ref={ref} type="file" accept={accept} hidden onChange={(e) => pick(e.target.files?.[0])} />
      <button type="button" className="btn btn--ghost btn--sm" disabled={busy} onClick={() => ref.current?.click()}>{busy ? "Uploading…" : label}</button>
      {err && <div className="err" role="alert">{err}</div>}
    </div>
  );
}

export function MediaField({ label, url, onChange, video = false }: { label: string; url: string; onChange: (u: string) => void; video?: boolean }) {
  return (
    <div style={{ display: "grid", gap: 8 }}>
      <Txt label={label} value={url} onChange={onChange} placeholder="/uploads/… or https://…" />
      <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
        <Upload label={video ? "Upload video (MP4/WebM)" : "Upload image"} accept={video ? "video/mp4,video/webm" : "image/*"} onUrl={onChange} />
        {url && !video && <div className="thumb" style={{ width: 64 }}><Media src={url} alt="" /></div>}
        {url && <button type="button" className="linklike" onClick={() => onChange("")}>Clear</button>}
      </div>
    </div>
  );
}
