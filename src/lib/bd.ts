export const DISTRICTS = [
  "Dhaka","Gazipur","Narayanganj","Narsingdi","Manikganj","Munshiganj","Tangail","Kishoreganj","Faridpur","Gopalganj","Madaripur","Rajbari","Shariatpur",
  "Chattogram","Cox's Bazar","Cumilla","Brahmanbaria","Chandpur","Feni","Lakshmipur","Noakhali","Khagrachhari","Rangamati","Bandarban",
  "Rajshahi","Bogura","Joypurhat","Naogaon","Natore","Chapainawabganj","Pabna","Sirajganj",
  "Khulna","Bagerhat","Chuadanga","Jashore","Jhenaidah","Kushtia","Magura","Meherpur","Narail","Satkhira",
  "Barishal","Barguna","Bhola","Jhalokathi","Patuakhali","Pirojpur",
  "Sylhet","Habiganj","Moulvibazar","Sunamganj",
  "Rangpur","Dinajpur","Gaibandha","Kurigram","Lalmonirhat","Nilphamari","Panchagarh","Thakurgaon",
  "Mymensingh","Jamalpur","Netrokona","Sherpur",
];

/** Normalises 01XXXXXXXXX / +8801… / 8801… (Bangla or English digits) to 01XXXXXXXXX. Returns null if invalid. */
export function normalizeBdPhone(input: string): string | null {
  const bn = "০১২৩৪৫৬৭৮৯";
  let s = input.replace(/[০-৯]/g, (d) => String(bn.indexOf(d))).replace(/[\s\-()]/g, "");
  if (s.startsWith("+880")) s = "0" + s.slice(4);
  else if (s.startsWith("880")) s = "0" + s.slice(3);
  return /^01[3-9]\d{8}$/.test(s) ? s : null;
}

export const isInsideDhaka = (district: string) => district === "Dhaka";

export function whatsappUrl(number: string, message: string): string {
  const n = number.replace(/\D/g, "");
  return `https://wa.me/${n}?text=${encodeURIComponent(message)}`;
}

const BN_NAMES = "ঢাকা,গাজীপুর,নারায়ণগঞ্জ,নরসিংদী,মানিকগঞ্জ,মুন্সীগঞ্জ,টাঙ্গাইল,কিশোরগঞ্জ,ফরিদপুর,গোপালগঞ্জ,মাদারীপুর,রাজবাড়ী,শরীয়তপুর,চট্টগ্রাম,কক্সবাজার,কুমিল্লা,ব্রাহ্মণবাড়িয়া,চাঁদপুর,ফেনী,লক্ষ্মীপুর,নোয়াখালী,খাগড়াছড়ি,রাঙ্গামাটি,বান্দরবান,রাজশাহী,বগুড়া,জয়পুরহাট,নওগাঁ,নাটোর,চাঁপাইনবাবগঞ্জ,পাবনা,সিরাজগঞ্জ,খুলনা,বাগেরহাট,চুয়াডাঙ্গা,যশোর,ঝিনাইদহ,কুষ্টিয়া,মাগুরা,মেহেরপুর,নড়াইল,সাতক্ষীরা,বরিশাল,বরগুনা,ভোলা,ঝালকাঠি,পটুয়াখালী,পিরোজপুর,সিলেট,হবিগঞ্জ,মৌলভীবাজার,সুনামগঞ্জ,রংপুর,দিনাজপুর,গাইবান্ধা,কুড়িগ্রাম,লালমনিরহাট,নীলফামারী,পঞ্চগড়,ঠাকুরগাঁও,ময়মনসিংহ,জামালপুর,নেত্রকোনা,শেরপুর".split(",");
/** Bangla district label for an English district name (the English name stays the stored value). */
export const districtLabel = (d: string, lang: "en" | "bn") => (lang === "bn" ? BN_NAMES[DISTRICTS.indexOf(d)] ?? d : d);
