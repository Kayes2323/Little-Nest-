export type Lang = "en" | "bn";
/** Bilingual editable text. `bn` falls back to `en` when empty. */
export type Text = { en: string; bn: string };

export interface Category {
  id: string;
  slug: string;
  name: Text;
  description: Text;
  imageUrl: string; // "" => placeholder
  active: boolean;
  order: number;
}

export interface Variant {
  id: string;
  size: string; // e.g. "0-3M", "S", "Free"
  color: string; // display name, "" if single colour
  colorHex: string; // swatch, "" if unknown
  stock: number | null; // null = not tracked / unknown
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Product {
  id: string;
  slug: string;
  name: Text;
  description: Text;
  careNote: Text;
  categoryIds: string[];
  /** BDT. null = price not set yet (product cannot be added to cart). */
  price: number | null;
  images: ProductImage[];
  /** CSS aspect-ratio for this product's card image, e.g. "4 / 5". */
  ratio: string;
  /** Focal point for object-fit: cover, e.g. "50% 30%". */
  focal: string;
  variants: Variant[];
  featured: boolean;
  isNew: boolean;
  active: boolean;
  /** True for built-in sample products. Remove/replace with real ones. */
  sample: boolean;
  createdAt: string;
}

export interface Campaign {
  id: string;
  active: boolean;
  headline: Text;
  description: Text;
  mediaUrl: string;
  mediaType: "image" | "video";
  ctaLabel: Text;
  ctaHref: string;
}

export interface Settings {
  announcement: { enabled: boolean; text: Text; href: string };
  hero: {
    videoUrl: string;
    posterUrl: string;
    eyebrow: Text;
    headline: Text;
    sub: Text;
    ctaLabel: Text;
    ctaHref: string;
    secondaryLabel: Text;
    secondaryHref: string;
  };
  brandStory: { title: Text; body: Text; imageUrl: string };
  campaigns: Campaign[];
  trust: { id: string; title: Text; body: Text }[];
  gallery: { url: string; alt: string }[];
  contact: {
    whatsapp: string; // digits with country code, e.g. 8801XXXXXXXXX
    phone: string;
    email: string;
    address: Text;
    facebook: string;
    instagram: string;
  };
  shipping: {
    insideDhaka: number | null;
    outsideDhaka: number | null;
    freeOver: number | null;
    note: Text;
  };
  payment: { codEnabled: boolean };
  /** Section visibility toggles on the home page. */
  sections: { gallery: boolean; campaigns: boolean };
}

export type OrderStatus = "new" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface OrderItem {
  productId: string;
  name: string;
  variantId: string;
  size: string;
  color: string;
  qty: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  createdAt: string;
  status: OrderStatus;
  customer: { name: string; phone: string; address: string; district: string; note: string };
  items: OrderItem[];
  subtotal: number;
  delivery: number | null; // null = to be confirmed
  total: number | null;
  payment: "cod";
  lang: Lang;
}

export interface Review {
  id: string;
  name: string;
  rating: number; // 1-5
  text: string;
  productId: string; // "" = general
  createdAt: string;
  /** Only approved reviews are shown. Submissions arrive unapproved. */
  approved: boolean;
}

export interface Store {
  settings: Settings;
  categories: Category[];
  products: Product[];
  orders: Order[];
  reviews: Review[];
}
