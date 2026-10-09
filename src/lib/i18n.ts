import type { Lang, Text } from "./types";

export const L = (t: Text | undefined, lang: Lang): string =>
  !t ? "" : lang === "bn" && t.bn.trim() ? t.bn : t.en;

export const dict = {
  en: {
    shop: "Shop", collections: "Collections", search: "Search", cart: "Cart", account: "Account",
    menu: "Menu", close: "Close", shopNow: "Shop Now", explore: "Explore Collection", viewDetails: "View Details",
    addToCart: "Add to Cart", orderWa: "Order via WhatsApp", shopByCollection: "Shop by collection",
    featured: "Featured", newArrivals: "New arrivals", viewAll: "View all", brandStory: "Our story",
    goodToKnow: "Good to know", gallery: "From the nest", gallerySub: "Brand photography and moments, added by Little Nest.",
    priceSoon: "Price coming soon", selectSize: "Select a size", selectColor: "Select a colour", size: "Size", colour: "Colour",
    inStock: "In stock", lowStock: "Only {n} left", outOfStock: "Out of stock", soldOut: "Sold out",
    new: "New", sample: "Sample", added: "Added to cart", chooseOptions: "Choose options",
    sort: "Sort", sortNew: "Newest", sortPriceAsc: "Price: low to high", sortPriceDesc: "Price: high to low",
    all: "All", filters: "Filters", searchPlaceholder: "Search clothes…", results: "{n} items", noResults: "Nothing matches your search",
    noResultsHelp: "Try another word, or clear the filters.", clear: "Clear", emptyCategory: "This collection is being prepared",
    emptyCategoryHelp: "New pieces will appear here soon. Meanwhile, browse everything we have.",
    yourCart: "Your cart", emptyCart: "Your cart is empty", emptyCartHelp: "Add something you love to get started.",
    subtotal: "Subtotal", delivery: "Delivery", total: "Total", tbc: "To be confirmed", free: "Free", checkout: "Checkout",
    continueShopping: "Continue shopping", remove: "Remove", qty: "Quantity", items: "{n} items",
    name: "Full name", phone: "Mobile number", address: "Delivery address", district: "District", note: "Order note (optional)",
    selectDistrict: "Select district", payment: "Payment", cod: "Cash on Delivery", placeOrder: "Place order",
    placing: "Placing order…", orderPlaced: "Order received", orderThanks: "Thank you. We have your order and will confirm it with you.",
    orderNo: "Order number", confirmWa: "Confirm on WhatsApp", backHome: "Back to home",
    errName: "Please enter your name", errPhone: "Enter a valid Bangladeshi mobile number (01XXXXXXXXX)",
    errAddress: "Please enter your full address", errDistrict: "Please select your district",
    errGeneric: "Something went wrong. Please try again.", errNoWa: "WhatsApp number is not configured yet.",
    waNotSet: "WhatsApp ordering is not set up yet", priceNeeded: "Price not set yet",
    subscribe: "Subscribe", emailPlaceholder: "Your email", newsletter: "Newsletter",
    newsletterNote: "Newsletter sign-up is a demo and is not connected yet.", support: "Support", policies: "Policies",
    contact: "Contact", followUs: "Follow us", language: "Language", skip: "Skip to content", demo: "Demo",
    sampleBanner: "Sample products are placeholders. Replace them in the admin dashboard.",
    deliveryInfo: "Delivery", sizeGuide: "Size guide", care: "Care", returns: "Returns",
    details: "Details", viewCart: "View cart", mediaSoon: "Photography coming soon",
    insideDhaka: "Inside Dhaka", outsideDhaka: "Outside Dhaka", shipTo: "Delivery charge depends on your district.",
    previous: "Previous image", next: "Next image", gotoImage: "Show image {n}", home: "Home",
    notFound: "We couldn't find that page", notFoundHelp: "It may have moved. Let's get you back to the collection.",
  },
  bn: {
    shop: "শপ", collections: "কালেকশন", search: "খুঁজুন", cart: "কার্ট", account: "অ্যাকাউন্ট",
    menu: "মেনু", close: "বন্ধ করুন", shopNow: "এখনই কিনুন", explore: "কালেকশন দেখুন", viewDetails: "বিস্তারিত দেখুন",
    addToCart: "কার্টে যোগ করুন", orderWa: "হোয়াটসঅ্যাপে অর্ডার করুন", shopByCollection: "কালেকশন অনুযায়ী কিনুন",
    featured: "বিশেষ নির্বাচন", newArrivals: "নতুন এসেছে", viewAll: "সব দেখুন", brandStory: "আমাদের গল্প",
    goodToKnow: "জেনে রাখুন", gallery: "নেস্ট থেকে", gallerySub: "লিটল নেস্টের নিজস্ব ছবি ও মুহূর্ত।",
    priceSoon: "দাম শীঘ্রই জানানো হবে", selectSize: "সাইজ বেছে নিন", selectColor: "রং বেছে নিন", size: "সাইজ", colour: "রং",
    inStock: "স্টকে আছে", lowStock: "মাত্র {n}টি বাকি", outOfStock: "স্টকে নেই", soldOut: "শেষ",
    new: "নতুন", sample: "নমুনা", added: "কার্টে যোগ হয়েছে", chooseOptions: "অপশন বেছে নিন",
    sort: "সাজান", sortNew: "নতুন আগে", sortPriceAsc: "দাম: কম থেকে বেশি", sortPriceDesc: "দাম: বেশি থেকে কম",
    all: "সব", filters: "ফিল্টার", searchPlaceholder: "পোশাক খুঁজুন…", results: "{n}টি পণ্য", noResults: "কিছু পাওয়া যায়নি",
    noResultsHelp: "অন্য শব্দ দিয়ে চেষ্টা করুন, অথবা ফিল্টার মুছে দিন।", clear: "মুছুন", emptyCategory: "এই কালেকশন প্রস্তুত হচ্ছে",
    emptyCategoryHelp: "নতুন পোশাক শীঘ্রই এখানে আসবে। ততক্ষণ বাকি সব দেখুন।",
    yourCart: "আপনার কার্ট", emptyCart: "আপনার কার্ট খালি", emptyCartHelp: "পছন্দের কিছু যোগ করে শুরু করুন।",
    subtotal: "সাবটোটাল", delivery: "ডেলিভারি", total: "মোট", tbc: "পরে জানানো হবে", free: "ফ্রি", checkout: "চেকআউট",
    continueShopping: "কেনাকাটা চালিয়ে যান", remove: "সরান", qty: "পরিমাণ", items: "{n}টি পণ্য",
    name: "পুরো নাম", phone: "মোবাইল নম্বর", address: "ডেলিভারি ঠিকানা", district: "জেলা", note: "অর্ডার নোট (ঐচ্ছিক)",
    selectDistrict: "জেলা বেছে নিন", payment: "পেমেন্ট", cod: "ক্যাশ অন ডেলিভারি", placeOrder: "অর্ডার করুন",
    placing: "অর্ডার হচ্ছে…", orderPlaced: "অর্ডার পাওয়া গেছে", orderThanks: "ধন্যবাদ। আপনার অর্ডার পেয়েছি, শীঘ্রই কনফার্ম করব।",
    orderNo: "অর্ডার নম্বর", confirmWa: "হোয়াটসঅ্যাপে কনফার্ম করুন", backHome: "হোমে ফিরুন",
    errName: "আপনার নাম লিখুন", errPhone: "সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)",
    errAddress: "পুরো ঠিকানা লিখুন", errDistrict: "জেলা বেছে নিন",
    errGeneric: "কিছু ভুল হয়েছে। আবার চেষ্টা করুন।", errNoWa: "হোয়াটসঅ্যাপ নম্বর এখনো সেট করা হয়নি।",
    waNotSet: "হোয়াটসঅ্যাপ অর্ডার এখনো চালু হয়নি", priceNeeded: "দাম এখনো নির্ধারিত হয়নি",
    subscribe: "সাবস্ক্রাইব", emailPlaceholder: "আপনার ইমেইল", newsletter: "নিউজলেটার",
    newsletterNote: "নিউজলেটার এখনো ডেমো, সংযুক্ত করা হয়নি।", support: "সহায়তা", policies: "নীতিমালা",
    contact: "যোগাযোগ", followUs: "আমাদের অনুসরণ করুন", language: "ভাষা", skip: "মূল অংশে যান", demo: "ডেমো",
    sampleBanner: "নমুনা পণ্যগুলো প্লেসহোল্ডার। অ্যাডমিন ড্যাশবোর্ড থেকে বদলে নিন।",
    deliveryInfo: "ডেলিভারি", sizeGuide: "সাইজ গাইড", care: "যত্ন", returns: "রিটার্ন",
    details: "বিবরণ", viewCart: "কার্ট দেখুন", mediaSoon: "ছবি শীঘ্রই আসছে",
    insideDhaka: "ঢাকার ভেতরে", outsideDhaka: "ঢাকার বাইরে", shipTo: "জেলা অনুযায়ী ডেলিভারি চার্জ নির্ধারিত হয়।",
    previous: "আগের ছবি", next: "পরের ছবি", gotoImage: "ছবি {n} দেখুন", home: "হোম",
    notFound: "এই পেজটি পাওয়া যায়নি", notFoundHelp: "পেজটি সরানো হয়ে থাকতে পারে। কালেকশনে ফিরে যাই।",
  },
} as const;

export type Dict = (typeof dict)["en"];
export type DictKey = keyof Dict;

export const tr = (lang: Lang, key: DictKey, vars?: Record<string, string | number>): string => {
  let s: string = dict[lang][key] ?? dict.en[key];
  if (vars) for (const [k, v] of Object.entries(vars)) s = s.replace(`{${k}}`, String(v));
  return s;
};

const BN_DIGITS = "০১২৩৪৫৬৭৮৯";
export const toBnDigits = (s: string) => s.replace(/\d/g, (d) => BN_DIGITS[+d]);

/** ৳ formatting, Bangla digits in Bangla mode, Bangladeshi grouping (1,25,000). */
export function formatTaka(n: number, lang: Lang): string {
  const s = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(n);
  return `৳${lang === "bn" ? toBnDigits(s) : s}`;
}
export const num = (n: number, lang: Lang) => (lang === "bn" ? toBnDigits(String(n)) : String(n));
