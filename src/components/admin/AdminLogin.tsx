"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "../Logo";

export function AdminLogin({ demo }: { demo: boolean }) {
  const [pw, setPw] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const router = useRouter();
  const go = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr("");
    const r = await fetch("/api/admin/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }) });
    setBusy(false);
    if (r.ok) router.refresh(); else setErr((await r.json().catch(() => ({}))).error || "Error");
  };
  return (
    <main className="wrap" style={{ maxWidth: 420, padding: "10vh var(--gutter)" }}>
      <form className="panel" onSubmit={go}>
        <Logo />
        <h1 style={{ fontSize: 28 }}>Admin sign in</h1>
        {demo && <div className="banner">Demo mode: set ADMIN_PASSWORD. Dev password is <code>littlenest-demo</code>.</div>}
        <label>Password<input className="field" type="password" autoFocus value={pw} onChange={(e) => setPw(e.target.value)} autoComplete="current-password" /></label>
        {err && <div className="err" role="alert">{err}</div>}
        <button className="btn" disabled={busy}>Sign in</button>
      </form>
    </main>
  );
}
