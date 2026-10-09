import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Hind_Siliguri, Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { Chrome } from "@/components/Chrome";
import { getLang } from "@/lib/lang";
import { tr } from "@/lib/i18n";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--f-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--f-body", display: "swap" });
const bn = Hind_Siliguri({ subsets: ["bengali", "latin"], weight: ["400", "500", "600"], variable: "--f-bn", display: "swap" });

export const metadata: Metadata = {
  title: { default: "Little Nest — Baby clothing, Bangladesh", template: "%s · Little Nest" },
  description: "Thoughtfully designed clothing, starting with babies.",
};
export const viewport: Viewport = { width: "device-width", initialScale: 1, themeColor: "#fbf7ef" };

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const lang = await getLang();
  return (
    <html lang={lang} className={`${display.variable} ${body.variable} ${bn.variable}`}>
      <body>
        <a className="skip" href="#main">{tr(lang, "skip")}</a>
        <Providers lang={lang}>
          {children}
          <Chrome />
        </Providers>
      </body>
    </html>
  );
}
