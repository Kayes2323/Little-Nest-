import Link from "next/link";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

export default async function NotFound() {
  const lang = await getLang();
  return (
    <div className="wrap empty">
      <h2>{tr(lang, "notFound")}</h2>
      <p>{tr(lang, "notFoundHelp")}</p>
      <Link className="btn" href="/shop">{tr(lang, "shopNow")}</Link>
    </div>
  );
}
