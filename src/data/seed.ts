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
    text: T("Order on WhatsApp: 01604508268", "অর্ডার করুন হোয়াটসঅ্যাপে: 01604508268"),
    href: "https://wa.me/8801604508268",
  },
  hero: {
    videoUrl: "",
    posterUrl: "/products/yellow-floral-set-hanging.jpg",
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
      "Add Little Nest's own story here: who you are and what you care about, in your own words.",
      "এখানে লিটল নেস্টের নিজের গল্প লিখুন: আপনারা কারা এবং কী গুরুত্ব দেন, নিজের ভাষায়।"
    ),
    imageUrl: "/products/two-dresses-tile-floor.jpg",
  },
  campaigns: [
    {
      id: "campaign-1",
      active: true,
      headline: T("Dress & bloomer sets", "ড্রেস ও ব্লুমার সেট"),
      description: T(
        "Dresses with matching bloomers, ready to order on WhatsApp.",
        "ম্যাচিং ব্লুমারসহ ড্রেস, হোয়াটসঅ্যাপে অর্ডার করুন।"
      ),
      mediaUrl: "/products/handkerchief-floral-set.jpg",
      mediaType: "image",
      ctaLabel: T("Explore Collection", "কালেকশন দেখুন"),
      ctaHref: "/collections/sets",
    },
  ],
  trust: [
    { id: "delivery", title: T("Delivery", "ডেলিভারি"), body: T("Delivery areas, charges and timing will be listed here once confirmed.", "ডেলিভারি এলাকা, চার্জ ও সময় নিশ্চিত হলে এখানে জানানো হবে।") },
    { id: "ordering", title: T("How to order", "যেভাবে অর্ডার করবেন"), body: T("Message us on WhatsApp with the dress you like and we will confirm size and price with you.", "পছন্দের ড্রেসটি হোয়াটসঅ্যাপে মেসেজ করুন, সাইজ ও দাম আপনাকে জানিয়ে দেব।") },
    { id: "size", title: T("Size guide", "সাইজ গাইড"), body: T("A size chart will be added here.", "এখানে সাইজ চার্ট যোগ করা হবে।") },
    { id: "care", title: T("Care", "যত্ন"), body: T("Care instructions will be added per product.", "প্রতিটি পণ্যের যত্নের নির্দেশনা যোগ করা হবে।") },
    { id: "returns", title: T("Returns", "রিটার্ন"), body: T("Our return policy will be published here.", "আমাদের রিটার্ন নীতি এখানে প্রকাশ করা হবে।") },
  ],
  gallery: [
    { url: "/products/two-dresses-tile-floor.jpg", alt: "Two girls' dresses on wooden hangers" },
    { url: "/products/yellow-floral-set-hanging.jpg", alt: "Yellow floral dress and bloomers hanging outdoors" },
    { url: "/products/yellow-floral-tiered-dress.jpg", alt: "Yellow floral tiered dress with a bow" },
    { url: "/products/bw-polka-puff-sleeve-set.jpg", alt: "Black and white polka dot dress with bloomers" },
  ],
  contact: { whatsapp: "8801604508268", phone: "", email: "", address: T(""), facebook: "https://www.facebook.com/share/1F7ZXCzhPH/", instagram: "" },
  shipping: { insideDhaka: null, outsideDhaka: null, freeOver: null, note: T("") },
  payment: { codEnabled: true },
  sections: { gallery: true, campaigns: true },
};

const cat = (id: string, order: number, en: string, bn: string, de: string, db: string, imageUrl = "", active = true): Category => ({
  id, slug: id, order, active, imageUrl, name: T(en, bn), description: T(de, db),
});

export const seedCategories: Category[] = [
  cat("dresses", 1, "Dresses", "ড্রেস", "Everyday and occasion dresses.", "প্রতিদিন ও বিশেষ দিনের ড্রেস।", "/products/yellow-floral-tiered-dress.jpg"),
  cat("sets", 2, "Dress & Bloomer Sets", "ড্রেস ও ব্লুমার সেট", "Dresses with matching bloomers.", "ম্যাচিং ব্লুমারসহ ড্রেস।", "/products/apple-print-dress-set.jpg"),
  // Prepared for later; inactive until you have products for them.
  cat("baby-girls", 3, "Baby Girls", "বেবি গার্লস", "", "", "", false),
  cat("kids", 7, "Kids", "কিডস", "Coming later.", "পরে আসছে।", "", false),
  cat("women", 8, "Women", "উইমেন", "Coming later.", "পরে আসছে।", "", false),
  cat("men", 9, "Men", "মেন", "Coming later.", "পরে আসছে।", "", false),
];

/**
 * Real photographs, no prices yet (price: null shows "Price coming soon" and ordering goes through WhatsApp).
 * Sizes are not listed yet either, so `variants` is empty. To add a price/sizes later, set `price: 1250`
 * and e.g. variants: sizes(["0-3M","3-6M"]).
 * `isNew` is deliberately false everywhere until you decide which pieces are new arrivals.
 */
export const sizes = (list: string[], stock: number | null = null) =>
  list.map((s) => ({ id: `s-${s.toLowerCase().replace(/[^a-z0-9]/g, "")}`, size: s, color: "", colorHex: "", stock }));

let n = 0;
const item = (
  id: string, en: string, bn: string, de: string, db: string, cats: string[], images: [string, string][],
  opts: Partial<Product> = {}
): Product => ({
  id, slug: id, name: T(en, bn), description: T(de, db), careNote: T(""), categoryIds: cats, price: null,
  images: images.map(([f, alt]) => ({ url: `/products/${f}.jpg`, alt })), ratio: "4 / 5", focal: "50% 45%", variants: [],
  featured: false, isNew: false, active: true, sample: false,
  createdAt: new Date(Date.UTC(2026, 0, 1) - n++ * 86400000).toISOString(), ...opts,
});

export const seedProducts: Product[] = [
  item("apple-print-dress-set", "Apple Print Dress & Bloomer Set", "অ্যাপল প্রিন্ট ড্রেস ও ব্লুমার সেট",
    "White dress with a small apple print, wide straps and a front bow, with matching bloomers.", "ছোট আপেল প্রিন্টের সাদা ড্রেস, চওড়া স্ট্র্যাপ ও সামনে বো, সঙ্গে ম্যাচিং ব্লুমার।",
    ["sets", "dresses"], [["apple-print-dress-set", "White apple-print dress with bow and matching bloomers on pink"]], { featured: true }),
  item("yellow-floral-tiered-dress", "Yellow Floral Tiered Dress", "ইয়েলো ফ্লোরাল টায়ার্ড ড্রেস",
    "Cream dress with yellow flowers, a two-tier skirt, straps and a large front bow.", "হলুদ ফুলের ক্রিম ড্রেস, দুই স্তরের স্কার্ট, স্ট্র্যাপ ও বড় সামনের বো।",
    ["dresses"], [["yellow-floral-tiered-dress", "Yellow floral tiered dress with a large bow"]], { featured: true }),
  item("rainbow-heart-layered-dress", "Rainbow Heart Layered Dress", "রেইনবো হার্ট লেয়ার্ড ড্রেস",
    "White cap-sleeve dress with a colourful heart print, a layered skirt, a bow and back ties.", "রঙিন হার্ট প্রিন্টের সাদা ক্যাপ-স্লিভ ড্রেস, লেয়ার্ড স্কার্ট, বো ও পেছনে ফিতা।",
    ["dresses"], [["rainbow-heart-layered-dress", "White dress with colourful hearts and a layered skirt"]], { featured: true, focal: "50% 60%" }),
  item("handkerchief-floral-set", "Handkerchief Floral Dress & Bloomer Set", "হ্যান্ডকারচিফ ফ্লোরাল ড্রেস ও ব্লুমার সেট",
    "Sleeveless dress with a soft handkerchief-style floral print and white bloomers.", "নরম রুমাল-স্টাইল ফুলের প্রিন্টের হাতাহীন ড্রেস ও সাদা ব্লুমার।",
    ["sets", "dresses"], [["handkerchief-floral-set", "Floral dress with white bloomers"]], { featured: true, ratio: "5 / 4" }),
  item("yellow-floral-set", "Yellow Floral Dress & Bloomer Set", "ইয়েলো ফ্লোরাল ড্রেস ও ব্লুমার সেট",
    "Cream dress with yellow flowers, straps, a peplum waist and a front bow, with matching bloomers.", "হলুদ ফুলের ক্রিম ড্রেস, স্ট্র্যাপ, পেপ্লাম কোমর ও সামনে বো, সঙ্গে ম্যাচিং ব্লুমার।",
    ["sets", "dresses"], [["yellow-floral-set", "Yellow floral dress and bloomers"], ["yellow-floral-set-hanging", "Yellow floral dress and bloomers on hangers"]]),
  item("bw-polka-puff-sleeve-set", "Black & White Polka Dot Dress Set", "ব্ল্যাক অ্যান্ড হোয়াইট পোলকা ডট ড্রেস সেট",
    "White dress with black polka dots, puff sleeves and a bow, with white bloomers.", "কালো পোলকা ডটের সাদা ড্রেস, পাফ হাতা ও বো, সঙ্গে সাদা ব্লুমার।",
    ["sets", "dresses"], [["bw-polka-puff-sleeve-set", "Polka dot dress with white bloomers"]], { ratio: "3 / 4" }),
  item("black-polka-tiered-dress", "Black Polka Dot Tiered Dress", "ব্ল্যাক পোলকা ডট টায়ার্ড ড্রেস",
    "Black dress with white polka dots, thin straps, a tiered skirt and a front bow.", "সাদা পোলকা ডটের কালো ড্রেস, চিকন স্ট্র্যাপ, টায়ার্ড স্কার্ট ও সামনে বো।",
    ["dresses"], [["black-polka-tiered-dress", "Black polka dot tiered dress with bow"]], { ratio: "1 / 1" }),
  item("pink-polka-tiered-dress", "Pink Polka Dot Tiered Dress", "পিঙ্ক পোলকা ডট টায়ার্ড ড্রেস",
    "White dress with pink polka dots, thin straps, a tiered skirt and a front bow.", "গোলাপি পোলকা ডটের সাদা ড্রেস, চিকন স্ট্র্যাপ, টায়ার্ড স্কার্ট ও সামনে বো।",
    ["dresses"], [["pink-polka-tiered-dress", "Pink polka dot tiered dress with bow"]], { ratio: "1 / 1" }),
  item("rainbow-heart-strap-dress", "Rainbow Heart Strap Dress", "রেইনবো হার্ট স্ট্র্যাপ ড্রেস",
    "White dress with colourful hearts, wide straps and a bow at the waist.", "রঙিন হার্ট প্রিন্টের সাদা ড্রেস, চওড়া স্ট্র্যাপ ও কোমরে বো।",
    ["dresses"], [["rainbow-heart-strap-dress", "White dress with colourful hearts on pink"]], { focal: "50% 40%" }),
  item("leaf-ruffle-strap-dress", "Leaf Print Ruffle Strap Dress", "লিফ প্রিন্ট রাফল স্ট্র্যাপ ড্রেস",
    "White dress with a green and blue leaf-cluster print and ruffled straps.", "সবুজ ও নীল পাতার গুচ্ছের প্রিন্ট, রাফল স্ট্র্যাপের সাদা ড্রেস।",
    ["dresses"], [["leaf-ruffle-strap-dress", "White dress with leaf print and ruffled straps"]], { ratio: "1 / 1" }),
  item("leaf-print-strap-dress", "Leaf Outline Strap Dress", "লিফ আউটলাইন স্ট্র্যাপ ড্রেস",
    "White dress with a leaf-outline print and yellow accents, with wide straps.", "পাতার আউটলাইন প্রিন্ট ও হলুদ ছোঁয়ার সাদা ড্রেস, চওড়া স্ট্র্যাপ।",
    ["dresses"], [["leaf-print-strap-dress", "White dress with leaf outline print"]], { ratio: "3 / 4" }),
  item("striped-bodice-geometric-dress", "Striped Bodice Geometric Skirt Dress", "স্ট্রাইপ বডিস জিওমেট্রিক স্কার্ট ড্রেস",
    "Cap-sleeve dress with a striped floral bodice and a geometric-print skirt with red edging.", "স্ট্রাইপ ফ্লোরাল বডিস ও লাল পাড়ের জিওমেট্রিক প্রিন্ট স্কার্টের ক্যাপ-স্লিভ ড্রেস।",
    ["dresses"], [["striped-bodice-geometric-dress", "Dress with striped floral bodice and geometric skirt"]], { ratio: "3 / 4" }),
  item("butterfly-applique-dress", "Butterfly Applique Dress", "বাটারফ্লাই অ্যাপ্লিক ড্রেস",
    "Cream bodice with a butterfly applique and embroidery, joined to a teal and peach brush-print skirt.", "প্রজাপতি অ্যাপ্লিক ও এমব্রয়ডারির ক্রিম বডিস, টিল ও পিচ ব্রাশ-প্রিন্ট স্কার্ট।",
    ["dresses"], [["butterfly-applique-dress", "Dress with butterfly applique bodice"]], { ratio: "3 / 4" }),
  item("flower-embroidery-dress", "Flower Embroidery Dress", "ফ্লাওয়ার এমব্রয়ডারি ড্রেস",
    "Cream bodice with pink and yellow flower embroidery and a blue and peach brush-print skirt.", "গোলাপি ও হলুদ ফুলের এমব্রয়ডারির ক্রিম বডিস, নীল ও পিচ ব্রাশ-প্রিন্ট স্কার্ট।",
    ["dresses"], [["flower-embroidery-dress", "Dress with flower embroidery"]], { ratio: "3 / 4" }),
  item("pink-green-abstract-dress", "Pink & Green Abstract Print Dress", "পিঙ্ক অ্যান্ড গ্রিন অ্যাবস্ট্রাক্ট প্রিন্ট ড্রেস",
    "Cap-sleeve dress in a pink and green brush-print with a lace-trimmed hem.", "গোলাপি ও সবুজ ব্রাশ-প্রিন্ট, লেস-ট্রিম হেমের ক্যাপ-স্লিভ ড্রেস।",
    ["dresses"], [["pink-green-abstract-dress", "Pink and green abstract print dress"]], { ratio: "3 / 4" }),
  item("lavender-floral-pleated-dress", "Lavender Floral Pleated Dress", "ল্যাভেন্ডার ফ্লোরাল প্লিটেড ড্রেস",
    "Lavender dress with a lace-textured bodice and a pleated floral skirt.", "লেস-টেক্সচার বডিস ও প্লিটেড ফ্লোরাল স্কার্টের ল্যাভেন্ডার ড্রেস।",
    ["dresses"], [["lavender-floral-pleated-dress", "Lavender floral pleated dress"]], { ratio: "3 / 4" }),
];

export const seedStore = (): Store => ({
  settings: structuredClone(seedSettings),
  categories: structuredClone(seedCategories),
  products: structuredClone(seedProducts),
  orders: [],
  reviews: [],
});
