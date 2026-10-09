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
