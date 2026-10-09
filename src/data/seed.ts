import type { Category, Product, Settings, Store, Text } from "@/lib/types";

const T = (en: string, bn = ""): Text => ({ en, bn });

/**
 * Starter content. Everything here is an editable placeholder:
 * no prices, no policies, no contact numbers and no claims are invented.
 * Edit via /admin (or replace this file).
 */
export const seedSettings: Settings = {
  announcement: {
    enabled: true,
    text: T("Delivery details coming soon. Message us on WhatsApp to order.", "ডেলিভারির তথ্য শীঘ্রই আসছে। অর্ডার করতে হোয়াটসঅ্যাপে মেসেজ করুন।"),
    href: "",
  },
  hero: {
    videoUrl: "",
    posterUrl: "",
    eyebrow: T("Little Nest", "লিটল নেস্ট"),
    headline: T("Soft things for little beginnings", "ছোট্ট শুরুর জন্য কোমল পোশাক"),
    sub: T("Thoughtfully designed clothing, starting with babies.", "ভেবেচিন্তে বানানো পোশাক, শুরু হয়েছে শিশুদের দিয়ে।"),
    ctaLabel: T("Shop Now", "এখনই কিনুন"),
    ctaHref: "/shop",
    secondaryLabel: T("Explore Collection", "কালেকশন দেখুন"),
    secondaryHref: "/#collections",
  },
  brandStory: {
    title: T("Made to be loved, worn and handed down", "ভালোবাসা, পরা আর পরের জনকে দেওয়ার জন্য"),
    body: T(
      "Replace this paragraph with Little Nest's own story in the admin dashboard. Tell customers who you are and what you care about, in your own words.",
      "অ্যাডমিন ড্যাশবোর্ড থেকে এই অনুচ্ছেদ বদলে লিটল নেস্টের নিজের গল্প লিখুন। আপনি কারা এবং কী গুরুত্ব দেন, নিজের ভাষায় বলুন।"
    ),
    imageUrl: "",
  },
  campaigns: [
    {
      id: "campaign-1",
      active: true,
      headline: T("Your next campaign lives here", "আপনার পরের ক্যাম্পেইন এখানে"),
      description: T(
        "Use this space for a handmade collection, a seasonal edit, gift ideas or matching outfits. Add a headline, a short description, an image or video and a button in the admin dashboard.",
        "হ্যান্ডমেইড কালেকশন, মৌসুমি সংগ্রহ, উপহারের আইডিয়া বা ম্যাচিং পোশাকের জন্য এই জায়গা ব্যবহার করুন। অ্যাডমিন থেকে শিরোনাম, ছোট বিবরণ, ছবি/ভিডিও ও বাটন যোগ করুন।"
      ),
      mediaUrl: "",
      mediaType: "image",
      ctaLabel: T("Explore Collection", "কালেকশন দেখুন"),
      ctaHref: "/collections/handmade",
    },
  ],
  trust: [
    { id: "delivery", title: T("Delivery", "ডেলিভারি"), body: T("Delivery areas, charges and timing will be listed here once confirmed.", "ডেলিভারি এলাকা, চার্জ ও সময় নিশ্চিত হলে এখানে জানানো হবে।") },
    { id: "ordering", title: T("How to order", "যেভাবে অর্ডার করবেন"), body: T("Choose a size, add to cart and check out with Cash on Delivery, or message us on WhatsApp.", "সাইজ বেছে কার্টে যোগ করুন, ক্যাশ অন ডেলিভারিতে চেকআউট করুন, অথবা হোয়াটসঅ্যাপে মেসেজ করুন।") },
    { id: "size", title: T("Size guide", "সাইজ গাইড"), body: T("A size chart will be added here.", "এখানে সাইজ চার্ট যোগ করা হবে।") },
    { id: "care", title: T("Care", "যত্ন"), body: T("Care instructions will be added per product.", "প্রতিটি পণ্যের যত্নের নির্দেশনা যোগ করা হবে।") },
    { id: "returns", title: T("Returns", "রিটার্ন"), body: T("Our return policy will be published here.", "আমাদের রিটার্ন নীতি এখানে প্রকাশ করা হবে।") },
  ],
  gallery: [],
  contact: { whatsapp: "", phone: "", email: "", address: T(""), facebook: "", instagram: "" },
  shipping: { insideDhaka: null, outsideDhaka: null, freeOver: null, note: T("") },
  payment: { codEnabled: true },
  sections: { gallery: true, campaigns: true },
};

const cat = (id: string, order: number, en: string, bn: string, de: string, db: string, active = true): Category => ({
  id, slug: id, order, active, imageUrl: "", name: T(en, bn), description: T(de, db),
});

export const seedCategories: Category[] = [
  cat("newborn", 1, "Newborn", "নবজাতক", "Gentle first pieces.", "প্রথম দিনের কোমল পোশাক।"),
  cat("baby-girls", 2, "Baby Girls", "বেবি গার্লস", "Dresses and everyday sets.", "ফ্রক ও প্রতিদিনের সেট।"),
  cat("baby-boys", 3, "Baby Boys", "বেবি বয়েজ", "Easy, comfortable outfits.", "আরামদায়ক পোশাক।"),
  cat("rompers", 4, "Rompers", "রোম্পার", "One-piece comfort.", "এক টুকরোয় আরাম।"),
  cat("dresses", 5, "Dresses", "ড্রেস", "For special days.", "বিশেষ দিনের জন্য।"),
  cat("handmade", 6, "Handmade Collection", "হ্যান্ডমেইড কালেকশন", "Small-batch pieces.", "সীমিত সংখ্যার পোশাক।"),
  cat("kids", 7, "Kids", "কিডস", "Coming later.", "পরে আসছে।", false),
  cat("women", 8, "Women", "উইমেন", "Coming later.", "পরে আসছে।", false),
  cat("men", 9, "Men", "মেন", "Coming later.", "পরে আসছে।", false),
];

const sizes = (list: string[], stock: number | null = null) =>
  list.map((s) => ({ id: `s-${s.toLowerCase().replace(/[^a-z0-9]/g, "")}`, size: s, color: "", colorHex: "", stock }));

const sample = (id: string, en: string, bn: string, cats: string[], opts: Partial<Product> = {}): Product => ({
  id, slug: id, name: T(en, bn), description: T("Sample product. Replace with a real description."),
  careNote: T(""), categoryIds: cats, price: null, images: [], ratio: "4 / 5", focal: "50% 40%",
  variants: sizes(["0-3M", "3-6M", "6-12M"]), featured: false, isNew: false, active: true, sample: true,
  createdAt: "2026-01-01T00:00:00.000Z", ...opts,
});

export const seedProducts: Product[] = [
  sample("sample-newborn-set", "Sample Newborn Set", "নমুনা নবজাতক সেট", ["newborn"], { featured: true, isNew: true }),
  sample("sample-ruffle-dress", "Sample Ruffle Dress", "নমুনা রাফল ফ্রক", ["baby-girls", "dresses"], { featured: true, isNew: true }),
  sample("sample-everyday-set", "Sample Everyday Set", "নমুনা এভরিডে সেট", ["baby-boys"], { featured: true }),
  sample("sample-button-romper", "Sample Button Romper", "নমুনা বোতাম রোম্পার", ["rompers", "newborn"], { featured: true, isNew: true }),
  sample("sample-festive-dress", "Sample Festive Dress", "নমুনা উৎসবের ড্রেস", ["dresses", "baby-girls"], { isNew: true }),
  sample("sample-knit-piece", "Sample Handmade Knit", "নমুনা হ্যান্ডমেইড নিট", ["handmade"], { ratio: "1 / 1" }),
];

export const seedStore = (): Store => ({
  settings: structuredClone(seedSettings),
  categories: structuredClone(seedCategories),
  products: structuredClone(seedProducts),
  orders: [],
});
