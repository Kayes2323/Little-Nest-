import type { Metadata } from "next";
import { CartView } from "@/components/CartView";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const metadata: Metadata = { title: "Cart" };
export default async function CartPage() {
  const lang = await getLang();
  return (
    <div className="wrap">
      <div className="page-head"><h1>{tr(lang, "yourCart")}</h1></div>
      <div style={{ height: 24 }} />
      <CartView />
    </div>
  );
}
