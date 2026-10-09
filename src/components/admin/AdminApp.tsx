"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Campaign, Category, Order, OrderStatus, Product, Settings, Store } from "@/lib/types";
import { Logo } from "../Logo";
import { Check, MediaField, TText, Txt, Upload } from "./kit";
import { Media } from "../Media";
import { formatTaka } from "@/lib/i18n";

type Tab = "orders" | "products" | "categories" | "home" | "shop";
const emptyText = () => ({ en: "", bn: "" });
const blankProduct = (): Product => ({
  id: "", slug: "", name: emptyText(), description: emptyText(), careNote: emptyText(), categoryIds: [], price: null, images: [],
  ratio: "4 / 5", focal: "50% 40%", variants: [{ id: "", size: "", color: "", colorHex: "", stock: null }],
  featured: false, isNew: true, active: true, sample: false, createdAt: "",
});
const STATUSES: OrderStatus[] = ["new", "confirmed", "shipped", "delivered", "cancelled"];

async function api(type: string, action: string, payload: unknown) {
  const r = await fetch("/api/admin/save", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ type, action, payload }) });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).error || "Save failed");
  return r.json();
}

export function AdminApp({ store, demoCreds }: { store: Store; demoCreds: boolean }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("orders");
  const [msg, setMsg] = useState("");
  const flash = (m: string) => { setMsg(m); setTimeout(() => setMsg(""), 2800); };
  const run = async (fn: () => Promise<unknown>, ok = "Saved") => {
    try { await fn(); flash(ok); router.refresh(); return true; } catch (e) { flash((e as Error).message); return false; }
  };
  const logout = async () => { await fetch("/api/admin/logout", { method: "POST" }); router.refresh(); };
  const tabs: [Tab, string][] = [["orders", `Orders (${store.orders.filter((o) => o.status === "new").length} new)`], ["products", "Products"], ["categories", "Categories"], ["home", "Homepage"], ["shop", "Shop info"]];

  return (
    <>
      <header className="admin__bar">
        <div className="wrap">
          <Link href="/" aria-label="Storefront"><Logo size={26} /></Link>
          <div className="tabs" role="tablist">
            {tabs.map(([k, label]) => <button key={k} role="tab" aria-selected={tab === k} onClick={() => setTab(k)}>{label}</button>)}
          </div>
          <button className="btn btn--ghost btn--sm" onClick={logout}>Sign out</button>
        </div>
      </header>
      <div className="wrap" style={{ paddingBottom: 80 }}>
        {demoCreds && <div className="banner" style={{ marginTop: 16 }}>Demo credentials in use. Set ADMIN_PASSWORD and ADMIN_SECRET before going live.</div>}
        {tab === "orders" && <Orders orders={store.orders} run={run} />}
        {tab === "products" && <Products store={store} run={run} />}
        {tab === "categories" && <Categories cats={store.categories} run={run} />}
        {tab === "home" && <HomeSettings s={store.settings} run={run} />}
        {tab === "shop" && <ShopSettings s={store.settings} run={run} />}
      </div>
      {msg && <div className="toastbar" role="status">{msg}</div>}
    </>
  );
}
type Run = (fn: () => Promise<unknown>, ok?: string) => Promise<boolean>;

/* ---------------- Orders ---------------- */
function Orders({ orders, run }: { orders: Order[]; run: Run }) {
  return (
    <section className="panel">
      <h2>Orders</h2>
      {orders.length === 0 ? <p className="note">No orders yet. Orders placed at checkout appear here.</p> : (
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Order</th><th>Customer</th><th>Items</th><th>Total</th><th>Status</th></tr></thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td><strong>{o.id}</strong><br /><span className="note">{new Date(o.createdAt).toLocaleString()}</span></td>
                  <td>{o.customer.name}<br /><a href={`tel:${o.customer.phone}`}>{o.customer.phone}</a><br /><span className="note">{o.customer.address}, {o.customer.district}</span>{o.customer.note && <><br /><em className="note">“{o.customer.note}”</em></>}</td>
                  <td>{o.items.map((i, k) => <div key={k}>{i.name} ({i.size}{i.color ? `, ${i.color}` : ""}) × {i.qty}</div>)}</td>
                  <td>{o.total != null ? formatTaka(o.total, "en") : <span className="pill pill--warn">Delivery TBC</span>}<br /><span className="note">Subtotal {formatTaka(o.subtotal, "en")} · COD</span></td>
                  <td>
                    <select className="field" aria-label={`Status for ${o.id}`} value={o.status} onChange={(e) => run(() => api("order", "status", { id: o.id, status: e.target.value }), "Status updated")}>
                      {STATUSES.map((s) => <option key={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

/* ---------------- Products ---------------- */
function Products({ store, run }: { store: Store; run: Run }) {
  const [edit, setEdit] = useState<Product | null>(null);
  if (edit) return <ProductForm key={edit.id || "new"} initial={edit} cats={store.categories} onClose={() => setEdit(null)} run={run} />;
  return (
    <section className="panel">
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <h2>Products</h2><button className="btn btn--sm" onClick={() => setEdit(blankProduct())}>+ New product</button>
      </div>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th></th><th>Name</th><th>Price</th><th>Stock</th><th>Flags</th><th></th></tr></thead>
          <tbody>
            {store.products.map((p) => (
              <tr key={p.id}>
                <td><div className="thumb"><Media src={p.images[0]?.url} alt="" seed={p.id} /></div></td>
                <td>{p.name.en}{p.sample && <> <span className="pill pill--warn">Sample</span></>}</td>
                <td>{p.price != null ? formatTaka(p.price, "en") : <span className="pill pill--warn">Not set</span>}</td>
                <td>{p.variants.map((v) => `${v.size}${v.color ? "/" + v.color : ""}: ${v.stock ?? "∞"}`).join(", ")}</td>
                <td>{!p.active && <span className="pill pill--warn">Hidden</span>} {p.featured && <span className="pill">Featured</span>} {p.isNew && <span className="pill">New</span>}</td>
                <td><button className="btn btn--ghost btn--sm" onClick={() => setEdit(structuredClone(p))}>Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ProductForm({ initial, cats, onClose, run }: { initial: Product; cats: Category[]; onClose: () => void; run: Run }) {
  const [p, setP] = useState<Product>(initial);
  const up = <K extends keyof Product>(k: K, v: Product[K]) => setP((x) => ({ ...x, [k]: v }));
  const save = async () => {
    if (!p.name.en.trim()) return run(() => Promise.reject(new Error("English name is required")));
    if (await run(() => api("product", "upsert", p))) onClose();
  };
  const del = async () => { if (confirm("Delete this product?") && (await run(() => api("product", "delete", { id: p.id }), "Deleted"))) onClose(); };
  return (
    <section className="panel">
      <h2>{p.id ? "Edit product" : "New product"}</h2>
      {p.sample && <div className="banner">This is a sample product. Edit it into a real one (and untick “Sample”) or delete it.</div>}
      <TText label="Name" value={p.name} onChange={(v) => up("name", v)} />
      <TText label="Description" value={p.description} onChange={(v) => up("description", v)} multiline />
      <TText label="Care note" value={p.careNote} onChange={(v) => up("careNote", v)} multiline />
      <div className="cols cols--3">
        <Txt label="Price (৳) — leave empty until decided" type="number" value={p.price} onChange={(v) => up("price", v === "" ? null : Number(v))} />
        <label>Image ratio<select className="field" value={p.ratio} onChange={(e) => up("ratio", e.target.value)}>
          <option value="4 / 5">Portrait 4:5 (default)</option><option value="3 / 4">Portrait 3:4</option><option value="1 / 1">Square 1:1</option><option value="2 / 3">Tall 2:3</option>
        </select></label>
        <label>Focal point<select className="field" value={p.focal} onChange={(e) => up("focal", e.target.value)}>
          <option value="50% 40%">Centre (default)</option><option value="50% 15%">Top</option><option value="50% 85%">Bottom</option><option value="20% 40%">Left</option><option value="80% 40%">Right</option>
        </select></label>
      </div>
      <div>
        <strong>Collections</strong>
        <div className="cols cols--3">{cats.map((c) => <Check key={c.id} label={c.name.en + (c.active ? "" : " (inactive)")} value={p.categoryIds.includes(c.id)} onChange={(on) => up("categoryIds", on ? [...p.categoryIds, c.id] : p.categoryIds.filter((x) => x !== c.id))} />)}</div>
      </div>
      <div>
        <strong>Photos</strong> <span className="note">First photo is the main image; the second shows on hover. Use clean, evenly lit shots; the full garment should be visible.</span>
        <div className="imgrow" style={{ marginTop: 10 }}>
          {p.images.map((im, i) => (
            <div key={i}>
              <div className="thumb"><Media src={im.url} alt="" seed={p.id} /></div>
              <input className="field" style={{ minHeight: 34, padding: "4px 8px", fontSize: 12 }} placeholder="Alt text" value={im.alt} onChange={(e) => up("images", p.images.map((x, k) => (k === i ? { ...x, alt: e.target.value } : x)))} />
              <div style={{ display: "flex", gap: 6 }}>
                <button className="linklike" disabled={i === 0} onClick={() => { const a = [...p.images]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; up("images", a); }}>←</button>
                <button className="linklike" onClick={() => up("images", p.images.filter((_, k) => k !== i))}>Remove</button>
              </div>
            </div>
          ))}
          <Upload label="+ Add photo" onUrl={(url) => up("images", [...p.images, { url, alt: p.name.en }])} />
        </div>
      </div>
      <div>
        <strong>Sizes / colours / stock</strong> <span className="note">Leave stock empty if you don’t track it.</span>
        {p.variants.map((v, i) => (
          <div key={i} className="cols cols--3" style={{ gridTemplateColumns: undefined, marginTop: 8, alignItems: "end" }}>
            <Txt label="Size" value={v.size} onChange={(x) => up("variants", p.variants.map((y, k) => (k === i ? { ...y, size: x } : y)))} />
            <Txt label="Colour name (optional)" value={v.color} onChange={(x) => up("variants", p.variants.map((y, k) => (k === i ? { ...y, color: x } : y)))} />
            <label>Swatch<input type="color" className="field" value={v.colorHex || "#dddddd"} onChange={(e) => up("variants", p.variants.map((y, k) => (k === i ? { ...y, colorHex: e.target.value } : y)))} /></label>
            <Txt label="Stock" type="number" value={v.stock} onChange={(x) => up("variants", p.variants.map((y, k) => (k === i ? { ...y, stock: x === "" ? null : Number(x) } : y)))} />
            <button className="btn btn--danger btn--sm" onClick={() => up("variants", p.variants.filter((_, k) => k !== i))}>Remove</button>
          </div>
        ))}
        <button className="btn btn--ghost btn--sm" style={{ marginTop: 10 }} onClick={() => up("variants", [...p.variants, { id: "", size: "", color: "", colorHex: "", stock: null }])}>+ Add variant</button>
      </div>
      <div className="cols cols--3">
        <Check label="Visible in shop" value={p.active} onChange={(v) => up("active", v)} />
        <Check label="Featured on homepage" value={p.featured} onChange={(v) => up("featured", v)} />
        <Check label="New arrival" value={p.isNew} onChange={(v) => up("isNew", v)} />
        <Check label="Sample (shows “Sample” tag)" value={p.sample} onChange={(v) => up("sample", v)} />
      </div>
      <div className="row-end">
        {p.id && <button className="btn btn--danger btn--sm" onClick={del}>Delete</button>}
        <button className="btn btn--ghost btn--sm" onClick={onClose}>Cancel</button>
        <button className="btn btn--sm" onClick={save}>Save product</button>
      </div>
    </section>
  );
}

/* ---------------- Categories ---------------- */
function Categories({ cats, run }: { cats: Category[]; run: Run }) {
  const [list, setList] = useState(cats);
  const [fresh, setFresh] = useState<Category>({ id: "", slug: "", name: emptyText(), description: emptyText(), imageUrl: "", active: true, order: cats.length + 1 });
  const upd = (id: string, patch: Partial<Category>) => setList((l) => l.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  return (
    <section className="panel">
      <h2>Categories & collections</h2>
      <p className="note">A category shows on the storefront only when it is active and has at least one visible product. Add Kids, Women or Men here later; no redesign needed.</p>
      {list.map((c) => (
        <div key={c.id} className="panel" style={{ margin: 0 }}>
          <TText label="Name" value={c.name} onChange={(v) => upd(c.id, { name: v })} />
          <TText label="Short description" value={c.description} onChange={(v) => upd(c.id, { description: v })} />
          <MediaField label="Cover image" url={c.imageUrl} onChange={(u) => upd(c.id, { imageUrl: u })} />
          <div className="cols cols--3">
            <Check label="Active" value={c.active} onChange={(v) => upd(c.id, { active: v })} />
            <Txt label="Order" type="number" value={c.order} onChange={(v) => upd(c.id, { order: Number(v) })} />
          </div>
          <div className="row-end">
            <button className="btn btn--danger btn--sm" onClick={() => confirm("Delete category?") && run(() => api("category", "delete", { id: c.id }), "Deleted")}>Delete</button>
            <button className="btn btn--sm" onClick={() => run(() => api("category", "upsert", c))}>Save</button>
          </div>
        </div>
      ))}
      <div className="panel" style={{ margin: 0, background: "var(--cream)" }}>
        <h3>New category</h3>
        <TText label="Name" value={fresh.name} onChange={(v) => setFresh({ ...fresh, name: v })} />
        <div className="row-end"><button className="btn btn--sm" onClick={async () => {
          if (!fresh.name.en.trim()) return run(() => Promise.reject(new Error("English name is required")));
          await run(() => api("category", "upsert", fresh), "Category added");
          setFresh({ ...fresh, name: emptyText() });
        }}>Add category</button></div>
      </div>
    </section>
  );
}

/* ---------------- Homepage settings ---------------- */
function HomeSettings({ s, run }: { s: Settings; run: Run }) {
  const [v, setV] = useState<Settings>(s);
  const set = <K extends keyof Settings>(k: K, val: Settings[K]) => setV((x) => ({ ...x, [k]: val }));
  const camp = (id: string, patch: Partial<Campaign>) => set("campaigns", v.campaigns.map((c) => (c.id === id ? { ...c, ...patch } : c)));
  return (
    <>
      <section className="panel">
        <h2>Announcement bar</h2>
        <Check label="Show announcement bar" value={v.announcement.enabled} onChange={(x) => set("announcement", { ...v.announcement, enabled: x })} />
        <TText label="Text" value={v.announcement.text} onChange={(x) => set("announcement", { ...v.announcement, text: x })} />
        <Txt label="Link (optional)" value={v.announcement.href} onChange={(x) => set("announcement", { ...v.announcement, href: x })} />
      </section>
      <section className="panel">
        <h2>Hero</h2>
        <p className="note">Use only video you own or have a licence for. Keep it short (5–15 s), muted, under ~6 MB for mobile. The poster image shows while loading, if video fails, with reduced motion or Data Saver.</p>
        <MediaField label="Hero video URL (MP4/WebM)" url={v.hero.videoUrl} video onChange={(x) => set("hero", { ...v.hero, videoUrl: x })} />
        <MediaField label="Poster image" url={v.hero.posterUrl} onChange={(x) => set("hero", { ...v.hero, posterUrl: x })} />
        <TText label="Eyebrow" value={v.hero.eyebrow} onChange={(x) => set("hero", { ...v.hero, eyebrow: x })} />
        <TText label="Headline" value={v.hero.headline} onChange={(x) => set("hero", { ...v.hero, headline: x })} />
        <TText label="Supporting copy" value={v.hero.sub} onChange={(x) => set("hero", { ...v.hero, sub: x })} />
        <TText label="Primary button" value={v.hero.ctaLabel} onChange={(x) => set("hero", { ...v.hero, ctaLabel: x })} />
        <Txt label="Primary link" value={v.hero.ctaHref} onChange={(x) => set("hero", { ...v.hero, ctaHref: x })} />
        <TText label="Secondary button" value={v.hero.secondaryLabel} onChange={(x) => set("hero", { ...v.hero, secondaryLabel: x })} />
        <Txt label="Secondary link" value={v.hero.secondaryHref} onChange={(x) => set("hero", { ...v.hero, secondaryHref: x })} />
      </section>
      <section className="panel">
        <h2>Campaign sections</h2>
        <Check label="Show campaigns on homepage" value={v.sections.campaigns} onChange={(x) => set("sections", { ...v.sections, campaigns: x })} />
        {v.campaigns.map((c) => (
          <div key={c.id} className="panel" style={{ margin: 0 }}>
            <Check label="Active" value={c.active} onChange={(x) => camp(c.id, { active: x })} />
            <TText label="Headline" value={c.headline} onChange={(x) => camp(c.id, { headline: x })} />
            <TText label="Description" value={c.description} onChange={(x) => camp(c.id, { description: x })} multiline />
            <label>Media type<select className="field" value={c.mediaType} onChange={(e) => camp(c.id, { mediaType: e.target.value as "image" | "video" })}><option value="image">Image</option><option value="video">Video</option></select></label>
            <MediaField label="Media URL" url={c.mediaUrl} video={c.mediaType === "video"} onChange={(x) => camp(c.id, { mediaUrl: x })} />
            <TText label="Button label" value={c.ctaLabel} onChange={(x) => camp(c.id, { ctaLabel: x })} />
            <Txt label="Button link" value={c.ctaHref} onChange={(x) => camp(c.id, { ctaHref: x })} />
            <div className="row-end"><button className="btn btn--danger btn--sm" onClick={() => set("campaigns", v.campaigns.filter((x) => x.id !== c.id))}>Remove campaign</button></div>
          </div>
        ))}
        <button className="btn btn--ghost btn--sm" onClick={() => set("campaigns", [...v.campaigns, { id: `campaign-${Date.now().toString(36)}`, active: true, headline: emptyText(), description: emptyText(), mediaUrl: "", mediaType: "image", ctaLabel: { en: "Explore Collection", bn: "কালেকশন দেখুন" }, ctaHref: "/shop" }])}>+ Add campaign</button>
      </section>
      <section className="panel">
        <h2>Brand story</h2>
        <TText label="Title" value={v.brandStory.title} onChange={(x) => set("brandStory", { ...v.brandStory, title: x })} />
        <TText label="Story" value={v.brandStory.body} onChange={(x) => set("brandStory", { ...v.brandStory, body: x })} multiline />
        <MediaField label="Image" url={v.brandStory.imageUrl} onChange={(x) => set("brandStory", { ...v.brandStory, imageUrl: x })} />
      </section>
      <section className="panel">
        <h2>Gallery</h2>
        <Check label="Show gallery on homepage" value={v.sections.gallery} onChange={(x) => set("sections", { ...v.sections, gallery: x })} />
        <div className="imgrow">
          {v.gallery.map((g, i) => (
            <div key={i}><div className="thumb"><Media src={g.url} alt="" seed={`g${i}`} /></div><button className="linklike" onClick={() => set("gallery", v.gallery.filter((_, k) => k !== i))}>Remove</button></div>
          ))}
          <Upload label="+ Add photo" onUrl={(url) => set("gallery", [...v.gallery, { url, alt: "Little Nest" }])} />
        </div>
      </section>
      <div className="row-end"><button className="btn" onClick={() => run(() => api("settings", "save", v))}>Save homepage settings</button></div>
    </>
  );
}

/* ---------------- Shop info ---------------- */
function ShopSettings({ s, run }: { s: Settings; run: Run }) {
  const [v, setV] = useState<Settings>(s);
  const set = <K extends keyof Settings>(k: K, val: Settings[K]) => setV((x) => ({ ...x, [k]: val }));
  const money = (x: string) => (x === "" ? null : Number(x));
  return (
    <>
      <section className="panel">
        <h2>Contact & WhatsApp</h2>
        <Txt label="WhatsApp number with country code, digits only (e.g. 8801XXXXXXXXX)" value={v.contact.whatsapp} onChange={(x) => set("contact", { ...v.contact, whatsapp: x.replace(/\D/g, "") })} />
        <div className="cols cols--2">
          <Txt label="Phone" value={v.contact.phone} onChange={(x) => set("contact", { ...v.contact, phone: x })} />
          <Txt label="Email" type="email" value={v.contact.email} onChange={(x) => set("contact", { ...v.contact, email: x })} />
          <Txt label="Facebook URL" value={v.contact.facebook} onChange={(x) => set("contact", { ...v.contact, facebook: x })} />
          <Txt label="Instagram URL" value={v.contact.instagram} onChange={(x) => set("contact", { ...v.contact, instagram: x })} />
        </div>
        <TText label="Address" value={v.contact.address} onChange={(x) => set("contact", { ...v.contact, address: x })} />
      </section>
      <section className="panel">
        <h2>Delivery & payment</h2>
        <p className="note">Leave a charge empty to show “To be confirmed” at checkout. Enter 0 for free delivery.</p>
        <div className="cols cols--3">
          <Txt label="Inside Dhaka (৳)" type="number" value={v.shipping.insideDhaka} onChange={(x) => set("shipping", { ...v.shipping, insideDhaka: money(x) })} />
          <Txt label="Outside Dhaka (৳)" type="number" value={v.shipping.outsideDhaka} onChange={(x) => set("shipping", { ...v.shipping, outsideDhaka: money(x) })} />
          <Txt label="Free delivery over (৳, optional)" type="number" value={v.shipping.freeOver} onChange={(x) => set("shipping", { ...v.shipping, freeOver: money(x) })} />
        </div>
        <Check label="Cash on Delivery enabled" value={v.payment.codEnabled} onChange={(x) => set("payment", { codEnabled: x })} />
      </section>
      <section className="panel">
        <h2>Shopping information (delivery, size guide, care, returns)</h2>
        <p className="note">Only publish what is true. Edit each block with your real policy.</p>
        {v.trust.map((t) => (
          <div key={t.id} className="panel" style={{ margin: 0 }}>
            <TText label="Title" value={t.title} onChange={(x) => set("trust", v.trust.map((y) => (y.id === t.id ? { ...y, title: x } : y)))} />
            <TText label="Text" value={t.body} onChange={(x) => set("trust", v.trust.map((y) => (y.id === t.id ? { ...y, body: x } : y)))} multiline />
          </div>
        ))}
      </section>
      <div className="row-end"><button className="btn" onClick={() => run(() => api("settings", "save", v))}>Save shop info</button></div>
    </>
  );
}
