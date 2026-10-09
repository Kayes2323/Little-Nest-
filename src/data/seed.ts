import type { Category, Product, Review, Settings, Store, Text } from "@/lib/types";

const T = (bn: string, en = ""): Text => ({ bn, en: en || bn });

/**
 * ALL site content lives here: edit, commit, redeploy.
 * Bangla (bn) is the main language; English is the fallback/secondary.
 */
export const PRICE_BDT = 350; // temporary flat price for every product until real prices are set

export const seedSettings: Settings = {
  announcement: {
    enabled: true,
    text: T("অর্ডার করতে হোয়াটসঅ্যাপ করুন: 01604508268", "Order on WhatsApp: 01604508268"),
    href: "https://wa.me/8801604508268",
  },
  hero: {
    videoUrl: "",
    posterUrl: "/products/yellow-floral-set-hanging.jpg",
    eyebrow: T("Little Nest", "Little Nest"),
    headline: T("ছোট্ট শুরুর জন্য কোমল পোশাক", "Soft things for little beginnings"),
    sub: T("শিশুদের জন্য সাজানো সুন্দর সব ফ্রক ও সেট।", "Pretty dresses and sets for little ones."),
    ctaLabel: T("এখনই কিনুন", "Shop Now"),
    ctaHref: "/shop",
    secondaryLabel: T("কালেকশন দেখুন", "Explore Collection"),
    secondaryHref: "/#collections",
  },
  brandStory: {
    title: T("ছোটদের জন্য সুন্দর পোশাক", "Beautiful clothes for little ones"),
    body: T(
      "Little Nest শিশুদের পোশাকের একটি বাংলাদেশি ব্র্যান্ড। ছোটদের জন্য সুন্দর ডিজাইনের ফ্রক ও সেট নিয়ে আমরা আপনাদের পাশে আছি। ভবিষ্যতে বড়দের পোশাকও আসবে।",
      "Little Nest is a Bangladeshi brand for children's clothing, with pretty dresses and sets for little ones. Clothing for grown-ups will follow."
    ),
    imageUrl: "/products/two-dresses-tile-floor.jpg",
  },
  campaigns: [
    {
      id: "matching-sets",
      active: true,
      headline: T("ম্যাচিং সেট", "Matching sets"),
      description: T(
        "ফ্রক বা টপের সঙ্গে মিলিয়ে ব্লুমার, প্যান্ট কিংবা লেগিংস। পছন্দের সেটটি কার্টে যোগ করুন বা সরাসরি হোয়াটসঅ্যাপে অর্ডার করুন।",
        "Dresses and tops with matching bloomers, pants or leggings. Add a set to your cart or order directly on WhatsApp."
      ),
      mediaUrl: "/products/handkerchief-floral-set.jpg",
      mediaType: "image",
      ctaLabel: T("সেটগুলো দেখুন", "See the sets"),
      ctaHref: "/collections/sets",
    },
  ],
  trust: [
    { id: "delivery", title: T("ডেলিভারি", "Delivery"), body: T("ডেলিভারির এলাকা ও চার্জ অর্ডারের সময় হোয়াটসঅ্যাপে জানিয়ে দেওয়া হবে।", "Delivery area and charge are confirmed on WhatsApp when you order.") },
    { id: "ordering", title: T("কীভাবে অর্ডার করবেন", "How to order"), body: T("পছন্দের পোশাকটি কার্টে যোগ করুন, তারপর নাম ও ঠিকানা দিন। অর্ডারটি হোয়াটসঅ্যাপে আমাদের কাছে চলে আসবে, আমরা কনফার্ম করে নেব। পেমেন্ট ক্যাশ অন ডেলিভারি।", "Add a piece to your cart, enter your name and address, and the order reaches us on WhatsApp, where we confirm it. Payment is Cash on Delivery.") },
    { id: "size", title: T("সাইজ", "Size"), body: T("সাইজ চার্ট শীঘ্রই যোগ হবে। এখন সাইজ জানতে হোয়াটসঅ্যাপে মেসেজ করুন, অর্ডারের সময় নোটে সাইজ বা বয়স লিখে দিন।", "A size chart is coming soon. Until then, message us on WhatsApp and write the size or age in your order note.") },
    { id: "care", title: T("যত্ন", "Care"), body: T("প্রতিটি পোশাকের যত্নের নির্দেশনা শীঘ্রই যোগ করা হবে।", "Care instructions will be added soon.") },
    { id: "returns", title: T("রিটার্ন", "Returns"), body: T("রিটার্ন নীতি শীঘ্রই প্রকাশ করা হবে।", "Our return policy will be published soon.") },
  ],
  gallery: [
    { url: "/products/two-dresses-tile-floor.jpg", alt: "কাঠের হ্যাঙ্গারে দুটি ফ্রক" },
    { url: "/products/yellow-floral-set-hanging.jpg", alt: "বাইরে ঝোলানো হলুদ ফুলের ফ্রক ও ব্লুমার" },
    { url: "/products/orange-blue-floral-dress-pair.jpg", alt: "কমলা ও নীল ছোট ফুলের ফ্রক" },
    { url: "/products/rainbow-heart-peplum-pants-set.jpg", alt: "রঙিন হার্ট প্রিন্টের টপ ও প্যান্ট" },
  ],
  contact: {
    whatsapp: "8801604508268",
    phone: "",
    email: "",
    address: T(""),
    facebook: "https://www.facebook.com/share/1F7ZXCzhPH/",
    instagram: "",
  },
  shipping: { insideDhaka: null, outsideDhaka: null, freeOver: null, note: T("") },
  payment: { codEnabled: true },
  sections: { gallery: true, campaigns: true },
};

const cat = (id: string, order: number, bn: string, en: string, db: string, de: string, imageUrl = "", active = true): Category => ({
  id, slug: id, order, active, imageUrl, name: T(bn, en), description: T(db, de),
});

export const seedCategories: Category[] = [
  cat("dresses", 1, "ফ্রক", "Dresses", "প্রতিদিন ও বিশেষ দিনের ফ্রক।", "Everyday and occasion dresses.", "/products/yellow-floral-tiered-dress.jpg"),
  cat("sets", 2, "সেট", "Sets", "ব্লুমার, প্যান্ট বা লেগিংসসহ ম্যাচিং সেট।", "Matching sets with bloomers, pants or leggings.", "/products/apple-print-dress-set.jpg"),
  // Prepared for later; hidden until they have products.
  cat("baby-girls", 3, "বেবি গার্লস", "Baby Girls", "", "", "", false),
  cat("kids", 7, "কিডস", "Kids", "", "", "", false),
  cat("women", 8, "নারী", "Women", "", "", "", false),
  cat("men", 9, "পুরুষ", "Men", "", "", "", false),
];

/**
 * Sizes aren't known yet, so every product has ONE implicit variant with a blank size;
 * customers write the size/age in the order note. To offer sizes later, replace `variants`
 * with e.g. sizes(["০-৩ মাস", "৩-৬ মাস"]).
 */
export const sizes = (list: string[], stock: number | null = null) =>
  list.map((s, i) => ({ id: `s${i}`, size: s, color: "", colorHex: "", stock }));
const ONE = [{ id: "std", size: "", color: "", colorHex: "", stock: null as number | null }];

let n = 0;
const item = (
  id: string, bn: string, en: string, db: string, de: string, cats: string[], images: string[], opts: Partial<Product> = {}
): Product => ({
  id, slug: id, name: T(bn, en), description: T(db, de), careNote: T(""), categoryIds: cats, price: PRICE_BDT,
  images: images.map((f) => ({ url: `/products/${f}.jpg`, alt: bn })), ratio: "4 / 5", focal: "50% 45%", variants: ONE,
  featured: false, isNew: false, active: true, sample: false,
  createdAt: new Date(Date.UTC(2026, 0, 1) - n++ * 86400000).toISOString(), ...opts,
});

export const seedProducts: Product[] = [
  item("apple-print-dress-set", "আপেল প্রিন্ট ফ্রক ও ব্লুমার সেট", "Apple Print Dress & Bloomer Set",
    "ছোট ছোট আপেলের প্রিন্টের সাদা ফ্রক, চওড়া স্ট্র্যাপ আর সামনে বো। সঙ্গে মিলিয়ে ব্লুমার।",
    "White dress with a small apple print, wide straps and a front bow, with matching bloomers.", ["sets", "dresses"], ["apple-print-dress-set"], { featured: true }),
  item("yellow-floral-tiered-dress", "হলুদ ফুলের টায়ার্ড ফ্রক", "Yellow Floral Tiered Dress",
    "হলুদ ফুলের প্রিন্টের ক্রিম রঙের ফ্রক। দুই স্তরের ঘের, স্ট্র্যাপ আর সামনে বড় একটি বো।",
    "Cream dress with yellow flowers, a two-tier skirt, straps and a large front bow.", ["dresses"], ["yellow-floral-tiered-dress"], { featured: true }),
  item("rainbow-heart-layered-dress", "রঙিন হার্ট প্রিন্ট লেয়ার্ড ফ্রক", "Rainbow Heart Layered Dress",
    "রঙিন হার্টের প্রিন্টের সাদা ফ্রক। ছোট হাতা, দুই স্তরের ঘের, সামনে বো আর পেছনে বাঁধার ফিতা।",
    "White cap-sleeve dress with colourful hearts, a layered skirt, a bow and back ties.", ["dresses"], ["rainbow-heart-layered-dress"], { featured: true, focal: "50% 60%" }),
  item("handkerchief-floral-set", "রুমাল প্রিন্ট ফুলের ফ্রক ও ব্লুমার সেট", "Handkerchief Floral Dress & Bloomer Set",
    "রুমালের মতো নরম ফুলের প্রিন্টের হাতাহীন ফ্রক, সঙ্গে সাদা ব্লুমার।",
    "Sleeveless dress in a soft handkerchief-style floral print with white bloomers.", ["sets", "dresses"], ["handkerchief-floral-set"], { featured: true, ratio: "5 / 4" }),
  item("yellow-floral-set", "হলুদ ফুলের ফ্রক ও ব্লুমার সেট", "Yellow Floral Dress & Bloomer Set",
    "হলুদ ফুলের ক্রিম ফ্রক। স্ট্র্যাপ, কোমরে ঝালর আর সামনে বো। সঙ্গে ম্যাচিং ব্লুমার।",
    "Cream dress with yellow flowers, straps, a peplum waist and a bow, with matching bloomers.", ["sets", "dresses"], ["yellow-floral-set", "yellow-floral-set-hanging"]),
  item("bw-polka-puff-sleeve-set", "সাদা-কালো পোলকা ডট ফ্রক সেট", "Black & White Polka Dot Dress Set",
    "কালো পোলকা ডটের সাদা ফ্রক। পাফ হাতা আর বো, সঙ্গে সাদা ব্লুমার।",
    "White dress with black polka dots, puff sleeves and a bow, with white bloomers.", ["sets", "dresses"], ["bw-polka-puff-sleeve-set"], { ratio: "3 / 4" }),
  item("black-polka-tiered-dress", "কালো পোলকা ডট টায়ার্ড ফ্রক", "Black Polka Dot Tiered Dress",
    "সাদা পোলকা ডটের কালো ফ্রক। চিকন স্ট্র্যাপ, দুই স্তরের ঘের আর সামনে বো।",
    "Black dress with white polka dots, thin straps, a tiered skirt and a bow.", ["dresses"], ["black-polka-tiered-dress"], { ratio: "1 / 1" }),
  item("pink-polka-tiered-dress", "গোলাপি পোলকা ডট টায়ার্ড ফ্রক", "Pink Polka Dot Tiered Dress",
    "গোলাপি পোলকা ডটের সাদা ফ্রক। চিকন স্ট্র্যাপ, দুই স্তরের ঘের আর সামনে বো।",
    "White dress with pink polka dots, thin straps, a tiered skirt and a bow.", ["dresses"], ["pink-polka-tiered-dress"], { ratio: "1 / 1" }),
  item("rainbow-heart-strap-dress", "রঙিন হার্ট প্রিন্ট স্ট্র্যাপ ফ্রক", "Rainbow Heart Strap Dress",
    "রঙিন হার্টের প্রিন্টের সাদা ফ্রক। চওড়া স্ট্র্যাপ আর কোমরে বো।",
    "White dress with colourful hearts, wide straps and a bow at the waist.", ["dresses"], ["rainbow-heart-strap-dress"], { focal: "50% 40%" }),
  item("leaf-ruffle-strap-dress", "পাতার প্রিন্ট রাফল স্ট্র্যাপ ফ্রক", "Leaf Print Ruffle Strap Dress",
    "সবুজ ও নীল পাতার গুচ্ছের প্রিন্টের সাদা ফ্রক, রাফল স্ট্র্যাপ। একই প্রিন্টে বো-স্ট্র্যাপের আরেকটি ডিজাইনও ছবিতে আছে।",
    "White dress with a green and blue leaf-cluster print and ruffled straps. A bow-strap version of the same print is shown in the second photo.", ["dresses"], ["leaf-ruffle-strap-dress", "leaf-print-dress-pair"], { ratio: "1 / 1" }),
  item("leaf-print-strap-dress", "পাতার আউটলাইন প্রিন্ট স্ট্র্যাপ ফ্রক", "Leaf Outline Strap Dress",
    "পাতার আউটলাইন প্রিন্ট আর হলুদ ছোঁয়ার সাদা ফ্রক। চওড়া স্ট্র্যাপ।",
    "White dress with a leaf-outline print and yellow accents, wide straps.", ["dresses"], ["leaf-print-strap-dress"], { ratio: "3 / 4" }),
  item("striped-bodice-geometric-dress", "স্ট্রাইপ বডিস জ্যামিতিক প্রিন্ট ফ্রক", "Striped Bodice Geometric Skirt Dress",
    "ফুলেল স্ট্রাইপ বডিস আর লাল পাড়ের জ্যামিতিক প্রিন্টের স্কার্ট। ক্যাপ হাতা।",
    "Cap-sleeve dress with a striped floral bodice and a geometric-print skirt with red edging.", ["dresses"], ["striped-bodice-geometric-dress"], { ratio: "3 / 4" }),
  item("butterfly-applique-dress", "প্রজাপতি অ্যাপ্লিক ফ্রক", "Butterfly Applique Dress",
    "ক্রিম বডিসে প্রজাপতির অ্যাপ্লিক ও সেলাই, নিচে টিল আর পিচ রঙের ব্রাশ প্রিন্ট স্কার্ট।",
    "Cream bodice with a butterfly applique, with a teal and peach brush-print skirt.", ["dresses"], ["butterfly-applique-dress"], { ratio: "3 / 4" }),
  item("flower-embroidery-dress", "ফুলের এমব্রয়ডারি ফ্রক", "Flower Embroidery Dress",
    "ক্রিম বডিসে গোলাপি ও হলুদ ফুলের এমব্রয়ডারি, নিচে নীল আর পিচ রঙের ব্রাশ প্রিন্ট স্কার্ট।",
    "Cream bodice with pink and yellow flower embroidery and a blue and peach brush-print skirt.", ["dresses"], ["flower-embroidery-dress"], { ratio: "3 / 4" }),
  item("pink-green-abstract-dress", "গোলাপি-সবুজ অ্যাবস্ট্রাক্ট প্রিন্ট ফ্রক", "Pink & Green Abstract Print Dress",
    "গোলাপি ও সবুজ ব্রাশ প্রিন্ট, লেস দেওয়া নিচের পাড়। ক্যাপ হাতা।",
    "Cap-sleeve dress in a pink and green brush print with a lace-trimmed hem.", ["dresses"], ["pink-green-abstract-dress"], { ratio: "3 / 4" }),
  item("lavender-floral-pleated-dress", "ল্যাভেন্ডার ফুলের প্লিটেড ফ্রক", "Lavender Floral Pleated Dress",
    "লেসের টেক্সচারের বডিস আর ভাঁজ দেওয়া ফুলের স্কার্ট, ল্যাভেন্ডার রঙ।",
    "Lavender dress with a lace-textured bodice and a pleated floral skirt.", ["dresses"], ["lavender-floral-pleated-dress"], { ratio: "3 / 4" }),

  // ---- second batch
  item("pink-paisley-ruffle-set", "গোলাপি পেজলি প্রিন্ট ফ্রক ও ব্লুমার সেট", "Pink Paisley Dress & Bloomer Set",
    "গোলাপি পেজলি প্রিন্টের ফ্রক। ঝালর হাতা, কোমরে বো, পেছনে বোতাম। সঙ্গে সাদা ব্লুমার।",
    "Pink paisley-print dress with ruffle sleeves, a waist bow and back buttons, with white bloomers.", ["sets", "dresses"], ["pink-paisley-ruffle-set"], { ratio: "5 / 4" }),
  item("pink-ditsy-ruffle-pants-set", "গোলাপি ছোট ফুলের ফ্রক ও সাদা প্যান্ট সেট", "Pink Ditsy Dress & White Pants Set",
    "হালকা গোলাপি ছোট প্রিন্টের ফ্রক। চৌকো গলা, ঝালর হাতা। সঙ্গে সাদা ঢিলা প্যান্ট।",
    "Light pink small-print dress with a square neck and ruffle sleeves, with loose white pants.", ["sets", "dresses"], ["pink-ditsy-ruffle-pants-set"], { ratio: "5 / 4" }),
  item("purple-floral-bow-strap-dress", "বেগুনি ফুলের বো-স্ট্র্যাপ ফ্রক", "Purple Floral Bow Strap Dress",
    "বেগুনি ছোট ফুলের প্রিন্টের ফ্রক। কাঁধে দুটি বো, বুকের কাছে লেসের পাড়।",
    "Small purple floral dress with a bow on each strap and lace trim at the chest.", ["dresses"], ["purple-floral-bow-strap-dress"], { ratio: "3 / 4" }),
  item("leaf-peplum-bloomer-set", "পাতার প্রিন্ট পেপ্লাম টপ ও ব্লুমার সেট", "Leaf Print Peplum Top & Bloomer Set",
    "পাতার প্রিন্টের পেপ্লাম টপ। ঝালর হাতা, দুই পাশে সাদা ফিতার বো। সঙ্গে একই প্রিন্টের ব্লুমার।",
    "Leaf-print peplum top with ruffle sleeves and white side bows, with matching-print bloomers.", ["sets"], ["leaf-peplum-bloomer-set"], { ratio: "3 / 4" }),
  item("purple-floral-peplum-set", "বেগুনি ফুলের পেপ্লাম টপ ও ব্লুমার সেট", "Purple Floral Peplum Top & Bloomer Set",
    "বেগুনি ফুলের প্রিন্টের পেপ্লাম টপ। ঝালর হাতা আর দুই পাশে সাদা ফিতার বো। সঙ্গে একই প্রিন্টের ব্লুমার।",
    "Purple floral peplum top with ruffle sleeves and white side bows, with matching-print bloomers.", ["sets"], ["purple-floral-peplum-set"], { ratio: "3 / 4" }),
  item("leaf-peplum-white-pants-set", "পাতার প্রিন্ট পেপ্লাম টপ ও সাদা প্যান্ট সেট", "Leaf Print Peplum Top & White Pants Set",
    "পাতার প্রিন্টের পেপ্লাম টপ, ঝালর হাতা আর দুই পাশে সাদা ফিতার বো। সঙ্গে সাদা ঢিলা প্যান্ট।",
    "Leaf-print peplum top with ruffle sleeves and white side bows, with loose white pants.", ["sets"], ["leaf-peplum-white-pants-set"], { ratio: "3 / 4" }),
  item("black-chevron-dress-leggings-set", "কালো জিগজ্যাগ প্রিন্ট ফ্রক ও লেগিংস সেট", "Black Chevron Dress & Leggings Set",
    "সাদা বৃত্তের জিগজ্যাগ প্রিন্টের কালো ফ্রক। স্ট্র্যাপ আর সামনে সাদা বো। সঙ্গে কালো লেগিংস।",
    "Black dress with a white circle chevron print, straps and a white bow, with black leggings.", ["sets", "dresses"], ["black-chevron-dress-leggings-set"], { ratio: "3 / 4" }),
  item("polka-collar-dress-set", "কলারওয়ালা পোলকা ডট ফ্রক ও ব্লুমার সেট", "Polka Dot Collar Dress & Bloomer Set",
    "ছোট পোলকা ডটের সাদা ফ্রক। গোল কলার, হাতাহীন। সঙ্গে ব্লুমার।",
    "White small polka-dot dress with a round collar, sleeveless, with bloomers.", ["sets", "dresses"], ["polka-collar-dress-set"], { ratio: "1 / 1" }),
  item("blue-square-dot-dress-set", "নীল চেক ডট ফ্রক ও ব্লুমার সেট", "Blue Square Dot Dress & Bloomer Set",
    "হালকা নীল স্ট্রাইপের ওপর গাঢ় নীল ছোট চৌকো ডটের ফ্রক। ঝালর হাতা, সামনে দুটি বো আর ভাঁজ। সঙ্গে ব্লুমার।",
    "Light blue striped dress with small navy square dots, ruffle sleeves, two bows and pleats, with bloomers.", ["sets", "dresses"], ["blue-square-dot-dress-set"], { ratio: "1 / 1" }),
  item("white-polka-lace-bib-dress", "লেস কলার পোলকা ডট ফ্রক", "Polka Dot Lace Collar Dress",
    "সাদা জমিনে কালো পোলকা ডট। লেসের গোল কলার, ছোট বো আর নিচে ভাঁজ দেওয়া ঝালর।",
    "White dress with black polka dots, a lace round collar, a small bow and a pleated ruffle hem.", ["dresses"], ["white-polka-lace-bib-dress"]),
  item("red-polka-puff-sleeve-set", "লাল পোলকা ডট পাফ হাতা ফ্রক ও ব্লুমার সেট", "Red Polka Dot Puff Sleeve Dress & Bloomer Set",
    "লাল পোলকা ডটের সাদা ফ্রক। পাফ হাতা, সামনে সাদা বো। সঙ্গে বো দেওয়া সাদা ব্লুমার।",
    "White dress with red polka dots, puff sleeves and a white bow, with white bloomers with a bow.", ["sets", "dresses"], ["red-polka-puff-sleeve-set"], { ratio: "3 / 4" }),
  item("orange-blue-floral-dress-pair", "ছোট ফুলের ফ্রক (কমলা ও নীল রঙে)", "Small Floral Dress (Orange & Blue)",
    "ছোট ফুলের প্রিন্টের হাতাহীন ফ্রক, কোমরে বো। ছবিতে পিচ-কমলা ও আকাশি নীল দুই রঙে দেখানো হয়েছে।",
    "Sleeveless small-floral dress with a waist bow, shown in peach-orange and sky blue.", ["dresses"], ["orange-blue-floral-dress-pair"]),
  item("yellow-teal-ruffle-bow-dress-pair", "ঝালর হাতা বো ফ্রক (হলুদ ও টিল)", "Ruffle Sleeve Bow Dress (Yellow & Teal)",
    "ঝালর হাতা আর সামনে বো। হলুদ পাতার প্রিন্ট ও টিল রঙের ছোট ফুলের প্রিন্ট, ছবিতে দুটিই দেখানো হয়েছে।",
    "Ruffle sleeves and a front bow, in a yellow leaf print and a teal small-floral print, both shown.", ["dresses"], ["yellow-teal-ruffle-bow-dress-pair"], { ratio: "3 / 4" }),
  item("blue-leaf-floral-ruffle-dress", "নীল পাতা-ফুলের ঝালর হাতা ফ্রক", "Blue Leaf & Floral Ruffle Sleeve Dress",
    "হালকা নীলের ওপর পাতা আর ফুলের রঙিন প্রিন্ট। ঝালর হাতা আর সামনে বো।",
    "Pale blue dress with a colourful leaf and flower print, ruffle sleeves and a front bow.", ["dresses"], ["blue-leaf-floral-ruffle-dress"]),
  item("purple-batik-dress", "বেগুনি বাটিক প্রিন্ট ফ্রক", "Purple Batik Print Dress",
    "বেগুনি রঙের ওপর সাদা বাটিক প্রিন্ট। ঘেরওয়ালা স্কার্ট আর কাঁধে মুক্তা বসানো বো।",
    "Purple dress with a white batik print, a full skirt and pearl-detail bows on the straps.", ["dresses"], ["purple-batik-dress"], { ratio: "2 / 3", focal: "50% 50%" }),
  item("rainbow-heart-peplum-pants-set", "রঙিন হার্ট প্রিন্ট টপ ও প্যান্ট সেট", "Rainbow Heart Top & Pants Set",
    "রঙিন হার্টের প্রিন্টের টপ। কাঁধে বো, সামনে বড় বো আর কোমরে ঝালর। সঙ্গে একই প্রিন্টের প্যান্ট।",
    "Rainbow-heart print top with shoulder bows, a large front bow and a ruffled waist, with matching pants.", ["sets"], ["rainbow-heart-peplum-pants-set"], { ratio: "3 / 4" }),
];

/** Customer reviews to show. Add real ones here: { id, name, rating: 1-5, text, productId: "" , createdAt }. */
export const seedReviews: Review[] = [];

export const seedStore = (): Store => ({
  settings: structuredClone(seedSettings),
  categories: structuredClone(seedCategories),
  products: structuredClone(seedProducts),
  reviews: structuredClone(seedReviews),
});
