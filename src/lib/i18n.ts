import type { Lang, Text } from "./types";

export const L = (t: Text | undefined, lang: Lang): string =>
  !t ? "" : lang === "bn" && t.bn.trim() ? t.bn : t.en;

export const dict = {
  en: {
    shop: "Shop", collections: "Collections", search: "Search", cart: "Cart", menu: "Menu", close: "Close",
    shopNow: "Shop Now", explore: "Explore Collection", viewDetails: "View Details", addToCart: "Add to Cart",
    orderWa: "Order via WhatsApp", shopByCollection: "Shop by collection", featured: "Featured", newArrivals: "New arrivals",
    viewAll: "View all", brandStory: "Our story", goodToKnow: "Good to know", gallery: "From the nest",
    gallerySub: "Photos from Little Nest.", selectSize: "Select a size", selectColor: "Select a colour", size: "Size", colour: "Colour",
    inStock: "In stock", lowStock: "Only {n} left", outOfStock: "Out of stock", soldOut: "Sold out", new: "New", sample: "Sample",
    added: "Added to cart", sort: "Sort", sortNew: "Newest", sortPriceAsc: "Price: low to high", sortPriceDesc: "Price: high to low",
    all: "All", searchPlaceholder: "Search clothes…", results: "{n} items", noResults: "Nothing matches your search",
    noResultsHelp: "Try another word, or clear the filters.", clear: "Clear", emptyCategory: "This collection is being prepared",
    emptyCategoryHelp: "New pieces will appear here soon. Meanwhile, browse everything we have.",
    yourCart: "Your cart", emptyCart: "Your cart is empty", emptyCartHelp: "Add something you love to get started.",
    subtotal: "Subtotal", delivery: "Delivery", total: "Total", tbc: "Confirmed on WhatsApp", free: "Free", checkout: "Checkout",
    continueShopping: "Continue shopping", remove: "Remove", qty: "Quantity", items: "{n} items",
    name: "Full name", phone: "Mobile number", address: "Delivery address", district: "District",
    note: "Order note: size or age (optional)", selectDistrict: "Select district", payment: "Payment", cod: "Cash on Delivery",
    placeOrder: "Send order on WhatsApp", orderPlaced: "One last step", orderThanks: "Your order message is ready. Send it on WhatsApp and we will confirm it with you.",
    reopenWa: "Open WhatsApp again", clearAndHome: "Clear cart and go home", backHome: "Back to home",
    errName: "Please enter your name", errPhone: "Enter a valid Bangladeshi mobile number (01XXXXXXXXX)",
    errAddress: "Please enter your full address", errDistrict: "Please select your district", errGeneric: "Something went wrong. Please try again.",
    support: "Support", contact: "Contact", skip: "Skip to content", care: "Care", returns: "Returns", deliveryInfo: "Delivery",
    mediaSoon: "Photo coming soon", shipTo: "Delivery charge is confirmed on WhatsApp when you order.", viewCart: "View cart",
    previous: "Previous image", next: "Next image", gotoImage: "Show image {n}", home: "Home",
    notFound: "We couldn't find that page", notFoundHelp: "It may have moved. Let's get you back to the collection.",
    askSizePrice: "Write the size or age in the order note, or ask us on WhatsApp.",
    reviews: "Customer reviews", writeReview: "Write a review", yourName: "Your name", rating: "Rating", yourReview: "Your review",
    reviewFor: "About (optional)", generalReview: "Little Nest in general", sendReview: "Send review on WhatsApp",
    reviewThanks: "Thank you! Send the WhatsApp message and we will receive your review.", noReviews: "No reviews yet",
    noReviewsHelp: "Bought something from Little Nest? Be the first to share how it went.", errReviewName: "Please enter your name",
    errReviewText: "Please write a few words", errRating: "Choose a star rating", stars: "{n} out of 5 stars",
    reviewsNote: "Reviews you send are shown here after we check them.", waNotSet: "WhatsApp ordering is not set up yet",
    msgOrder: "New order (Little Nest)", msgSubtotal: "Subtotal", msgDelivery: "Delivery", msgPayment: "Payment", msgName: "Name",
    msgPhone: "Mobile", msgDistrict: "District", msgAddress: "Address", msgNote: "Note", msgReview: "Review for Little Nest",
    msgOrderPiece: "I'd like to order", msgDeliveryTbc: "please confirm the charge", priceSoon: "Price coming soon",
  },
  bn: {
    shop: "শপ", collections: "কালেকশন", search: "খুঁজুন", cart: "কার্ট", menu: "মেনু", close: "বন্ধ করুন",
    shopNow: "এখনই কিনুন", explore: "কালেকশন দেখুন", viewDetails: "বিস্তারিত দেখুন", addToCart: "কার্টে যোগ করুন",
    orderWa: "হোয়াটসঅ্যাপে অর্ডার করুন", shopByCollection: "কালেকশন অনুযায়ী কিনুন", featured: "বিশেষ নির্বাচন", newArrivals: "নতুন এসেছে",
    viewAll: "সব দেখুন", brandStory: "আমাদের কথা", goodToKnow: "জেনে রাখুন", gallery: "Little Nest-এর ছবি",
    gallerySub: "Little Nest-এর পোশাকের কিছু ছবি।", selectSize: "সাইজ বেছে নিন", selectColor: "রং বেছে নিন", size: "সাইজ", colour: "রং",
    inStock: "স্টকে আছে", lowStock: "মাত্র {n}টি বাকি", outOfStock: "স্টকে নেই", soldOut: "শেষ", new: "নতুন", sample: "নমুনা",
    added: "কার্টে যোগ হয়েছে", sort: "সাজান", sortNew: "নতুন আগে", sortPriceAsc: "দাম: কম থেকে বেশি", sortPriceDesc: "দাম: বেশি থেকে কম",
    all: "সব", searchPlaceholder: "পোশাক খুঁজুন…", results: "{n}টি পোশাক", noResults: "কিছু খুঁজে পাওয়া যায়নি",
    noResultsHelp: "অন্য শব্দে খুঁজুন, অথবা ফিল্টার মুছে দিন।", clear: "মুছুন", emptyCategory: "এই কালেকশন সাজানো হচ্ছে",
    emptyCategoryHelp: "নতুন পোশাক শীঘ্রই এখানে আসবে। ততক্ষণ বাকি সব দেখুন।",
    yourCart: "আপনার কার্ট", emptyCart: "আপনার কার্ট খালি", emptyCartHelp: "পছন্দের কিছু যোগ করে শুরু করুন।",
    subtotal: "মোট দাম", delivery: "ডেলিভারি", total: "সর্বমোট", tbc: "হোয়াটসঅ্যাপে জানানো হবে", free: "ফ্রি", checkout: "চেকআউট",
    continueShopping: "আরও দেখুন", remove: "সরান", qty: "পরিমাণ", items: "{n}টি পোশাক",
    name: "আপনার নাম", phone: "মোবাইল নম্বর", address: "ডেলিভারির ঠিকানা", district: "জেলা",
    note: "অর্ডার নোট: সাইজ বা বয়স (ঐচ্ছিক)", selectDistrict: "জেলা বেছে নিন", payment: "পেমেন্ট", cod: "ক্যাশ অন ডেলিভারি",
    placeOrder: "হোয়াটসঅ্যাপে অর্ডার পাঠান", orderPlaced: "আর একটি ধাপ বাকি", orderThanks: "আপনার অর্ডারের মেসেজ তৈরি। হোয়াটসঅ্যাপে মেসেজটি পাঠিয়ে দিন, আমরা কনফার্ম করে নেব।",
    reopenWa: "আবার হোয়াটসঅ্যাপ খুলুন", clearAndHome: "কার্ট খালি করে হোমে যান", backHome: "হোমে ফিরুন",
    errName: "আপনার নাম লিখুন", errPhone: "সঠিক মোবাইল নম্বর দিন (01XXXXXXXXX)",
    errAddress: "পুরো ঠিকানা লিখুন", errDistrict: "জেলা বেছে নিন", errGeneric: "কিছু একটা ভুল হয়েছে, আবার চেষ্টা করুন।",
    support: "সহায়তা", contact: "যোগাযোগ", skip: "মূল অংশে যান", care: "যত্ন", returns: "রিটার্ন", deliveryInfo: "ডেলিভারি",
    mediaSoon: "ছবি শীঘ্রই আসছে", shipTo: "ডেলিভারি চার্জ অর্ডারের সময় হোয়াটসঅ্যাপে জানানো হবে।", viewCart: "কার্ট দেখুন",
    previous: "আগের ছবি", next: "পরের ছবি", gotoImage: "{n} নম্বর ছবি দেখুন", home: "হোম",
    notFound: "এই পাতাটি খুঁজে পাওয়া যায়নি", notFoundHelp: "পাতাটি সরে গিয়ে থাকতে পারে। চলুন কালেকশনে ফিরে যাই।",
    askSizePrice: "সাইজ বা বয়স অর্ডার নোটে লিখে দিন, অথবা হোয়াটসঅ্যাপে জিজ্ঞেস করুন।",
    reviews: "গ্রাহকদের মতামত", writeReview: "আপনার মতামত লিখুন", yourName: "আপনার নাম", rating: "রেটিং", yourReview: "আপনার মতামত",
    reviewFor: "কোন পোশাক সম্পর্কে (ঐচ্ছিক)", generalReview: "Little Nest সম্পর্কে", sendReview: "হোয়াটসঅ্যাপে মতামত পাঠান",
    reviewThanks: "ধন্যবাদ! হোয়াটসঅ্যাপে মেসেজটি পাঠিয়ে দিন, আমরা আপনার মতামত পেয়ে যাব।", noReviews: "এখনো কোনো মতামত নেই",
    noReviewsHelp: "Little Nest থেকে কিছু কিনেছেন? প্রথম মতামতটি আপনিই জানান।", errReviewName: "আপনার নাম লিখুন",
    errReviewText: "কয়েকটি কথা লিখুন", errRating: "স্টার রেটিং বেছে নিন", stars: "৫ এর মধ্যে {n} স্টার",
    reviewsNote: "আপনার পাঠানো মতামত যাচাইয়ের পর এখানে দেখানো হয়।", waNotSet: "হোয়াটসঅ্যাপে অর্ডার এখনো চালু হয়নি",
    msgOrder: "নতুন অর্ডার (Little Nest)", msgSubtotal: "মোট দাম", msgDelivery: "ডেলিভারি", msgPayment: "পেমেন্ট", msgName: "নাম",
    msgPhone: "মোবাইল", msgDistrict: "জেলা", msgAddress: "ঠিকানা", msgNote: "নোট", msgReview: "Little Nest-এর জন্য মতামত",
    msgOrderPiece: "আমি এটি অর্ডার করতে চাই", msgDeliveryTbc: "চার্জ কত হবে জানাবেন", priceSoon: "দাম শীঘ্রই জানানো হবে",
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
