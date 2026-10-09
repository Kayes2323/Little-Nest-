import type { Metadata } from "next";
import { Checkout } from "@/components/Checkout";
import { readStore } from "@/lib/store";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export const metadata: Metadata = { title: "Checkout" };
export default async function CheckoutPage() {
  const [s, lang] = await Promise.all([readStore(), getLang()]);
  return (
    <div className="wrap">
      <div className="page-head"><h1>{tr(lang, "checkout")}</h1></div>
      <div style={{ height: 24 }} />
      <Checkout shipping={s.settings.shipping} codEnabled={s.settings.payment.codEnabled} whatsapp={s.settings.contact.whatsapp} />
    </div>
  );
}
