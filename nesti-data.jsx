// Product catalog + categories + age filters for Nesti
// Imagery is intentionally placeholder (CSS-rendered "card art")
// described as a color palette + small SVG glyph keyword.

const NESTI_CATEGORIES = [
  { id: "feeding",   label: "Feeding",   glyph: "bottle" },
  { id: "nursery",   label: "Nursery",   glyph: "moon" },
  { id: "clothing",  label: "Clothing",  glyph: "shirt" },
  { id: "toys",      label: "Toys",      glyph: "rabbit" },
  { id: "bath",      label: "Bath",      glyph: "drop" },
  { id: "mom",       label: "Mom Essentials", glyph: "rose" },
  { id: "other",     label: "Other",     glyph: "sparkle" },
];

const NESTI_AGES = [
  { id: "newborn",   label: "Newborn" },
  { id: "0-3",       label: "0–3 mo" },
  { id: "3-6",       label: "3–6 mo" },
  { id: "6-12",      label: "6–12 mo" },
  { id: "1-2",       label: "1–2 yrs" },
  { id: "2+",        label: "2+ yrs" },
];

const NESTI_GENDERS = [
  { id: "all",    label: "Everyone" },
  { id: "girls",  label: "Girls" },
  { id: "boys",   label: "Boys" },
];

// Palettes used by the "placeholder" product art
const NESTI_PALETTES = {
  blush:   { bg: "#FCEBE3", fg: "#C97D67", accent: "#FFFFFF" },
  cream:   { bg: "#F5EBE2", fg: "#A37B43", accent: "#FFFFFF" },
  petal:   { bg: "#F7D9CC", fg: "#A04A38", accent: "#FCEBE3" },
  sand:    { bg: "#EEDFC3", fg: "#7C5828", accent: "#FAF5EC" },
  pearl:   { bg: "#F2EDE4", fg: "#5C443A", accent: "#FFFFFF" },
  rose:    { bg: "#EFC0AE", fg: "#7C2E20", accent: "#FCEBE3" },
  oat:     { bg: "#E9E1D0", fg: "#5C443A", accent: "#FFFFFF" },
};

const NESTI_PRODUCTS = [
  // Feeding
  { id: "p01", name: "Hush Glass Feeding Bottle",       brand: "Mori", price: 89,  cat: "feeding",  age: ["newborn","0-3","3-6"], glyph: "bottle",   color: "blush",
    desc: "A whisper-quiet anti-colic bottle in heat-tempered glass. Petal-soft silicone teat mimics the natural latch — designed with paediatric nurses." },
  { id: "p02", name: "Linen Bib, set of 3",             brand: "Petite Nest", price: 64, cat: "feeding", age: ["newborn","0-3","3-6","6-12"], glyph: "shirt", color: "cream", gender: "neutral",
    desc: "Stonewashed linen with a hidden waterproof inner lining. Reversible. Gets softer with every wash." },
  { id: "p03", name: "Stoneware First Bowl",            brand: "Mori", price: 56, cat: "feeding", age: ["6-12","1-2","2+"], glyph: "bowl", color: "oat", gender: "neutral",
    desc: "A weighted base so little hands can't tip it. Microwave + dishwasher safe. Comes with a soft bamboo spoon." },

  // Nursery
  { id: "p04", name: "Cloud Bassinet Mobile",           brand: "Lune", price: 168, cat: "nursery",  age: ["newborn","0-3","3-6"],  glyph: "moon", color: "petal", gender: "neutral",
    desc: "Hand-stitched felt clouds revolve to a 12-minute lullaby. Rechargeable; doubles as a gentle nightlight." },
  { id: "p05", name: "Organic Cot Sheet, scallop trim", brand: "Petite Nest", price: 95, cat: "nursery", age: ["newborn","0-3","3-6","6-12"], glyph: "blanket", color: "pearl", gender: "neutral",
    desc: "GOTS-certified organic cotton sateen. The scalloped trim is hand-finished in Porto." },
  { id: "p06", name: "Walnut Sleep Sound Lantern",      brand: "Lune", price: 220, cat: "nursery", age: ["newborn","0-3","3-6","6-12","1-2"], glyph: "lantern", color: "oat", gender: "neutral",
    desc: "Eight nature sounds, warm dimmable light, 18-hour battery. The walnut shell is hand-turned in Maine." },

  // Clothing
  { id: "p07", name: "Pointelle Knit Romper",           brand: "Petite Nest", price: 78, cat: "clothing", age: ["newborn","0-3","3-6"], glyph: "shirt", color: "blush", gender: "girls",
    desc: "Pima cotton pointelle with mother-of-pearl buttons down the front. Gentle on new skin." },
  { id: "p08", name: "Heirloom Knit Cardigan",          brand: "Maison Lou", price: 124, cat: "clothing", age: ["3-6","6-12","1-2"], glyph: "shirt", color: "cream", gender: "neutral",
    desc: "A four-ply merino cardigan you'll keep in tissue paper. Made by a women's cooperative in Bilbao." },
  { id: "p09", name: "Two-Pack Bamboo Sleepsuit",       brand: "Mori", price: 68,  cat: "clothing", age: ["newborn","0-3","3-6","6-12"], glyph: "shirt", color: "pearl", gender: "boys",
    desc: "Two-way zip, foldover cuffs, and built-in soft footing. Bamboo + organic cotton — temperature regulating." },

  // Toys
  { id: "p10", name: "Wooden Stacking Rings",           brand: "Forêt", price: 48, cat: "toys", age: ["6-12","1-2","2+"], glyph: "rings", color: "sand", gender: "neutral",
    desc: "Solid beech, finished with food-safe linseed oil. Each ring is sized to a Montessori grasp curriculum." },
  { id: "p11", name: "Velvet Bunny, large",             brand: "Maison Lou", price: 86, cat: "toys", age: ["newborn","0-3","3-6","6-12","1-2","2+"], glyph: "rabbit", color: "petal", gender: "girls",
    desc: "Long-eared, hand-finished velvet. Embroidered features only — safe from day one." },
  { id: "p12", name: "Felt Forest Play Mat",            brand: "Forêt", price: 142, cat: "toys", age: ["3-6","6-12","1-2"], glyph: "leaf", color: "oat", gender: "neutral",
    desc: "Eight removable felt creatures hide in the appliqued forest. Roll it up and tie it with the canvas strap." },

  // Bath
  { id: "p13", name: "Cloud Hooded Towel",              brand: "Mori", price: 72, cat: "bath", age: ["newborn","0-3","3-6","6-12"], glyph: "drop", color: "blush", gender: "girls",
    desc: "Two-ply organic muslin and brushed terry. Generously sized — meant to outgrow the bath, not the other way around." },
  { id: "p14", name: "Whisper Wash Set",                brand: "Petite Nest", price: 54, cat: "bath", age: ["newborn","0-3","3-6","6-12","1-2"], glyph: "drop", color: "cream", gender: "neutral",
    desc: "Fragrance-free top-to-toe wash and a featherweight balm. Made with cold-pressed sweet almond oil." },
  { id: "p15", name: "Soft Sponge, hand-cut",           brand: "Forêt", price: 22, cat: "bath", age: ["newborn","0-3","3-6","6-12"], glyph: "drop", color: "oat", gender: "neutral",
    desc: "Naturally absorbent sea-silk sponge, hand-trimmed to fit a small palm. Compostable when it's done its time." },

  // Mom
  { id: "p16", name: "Nursing Robe, silk-touch",        brand: "Maison Lou", price: 168, cat: "mom", age: ["newborn","0-3","3-6"], glyph: "rose", color: "petal", gender: "mom",
    desc: "A long-line wrap robe in modal-silk. Hidden side openings designed for easy night feeds." },
  { id: "p17", name: "Belly Balm, 100 ml",              brand: "Petite Nest", price: 44,  cat: "mom", age: ["newborn"], glyph: "rose", color: "blush", gender: "mom",
    desc: "Centella, rosehip, and shea. Pregnancy-tested by midwives. Comes in refillable porcelain." },
  { id: "p18", name: "Hospital Bag, quilted canvas",    brand: "Mori", price: 196, cat: "mom", age: ["newborn"], glyph: "bag", color: "sand", gender: "mom",
    desc: "Quilted organic canvas with a vegetable-tanned leather handle. Compartments laid out by a doula." },
];

// Convenience lookups
const NESTI_PRODUCT_BY_ID = Object.fromEntries(NESTI_PRODUCTS.map(p => [p.id, p]));
const NESTI_FEATURED = ["p04","p07","p10","p16","p02","p13"];
const NESTI_NEW_IN = ["p06","p08","p12","p18","p11","p03"];

Object.assign(window, {
  NESTI_CATEGORIES,
  NESTI_AGES,
  NESTI_GENDERS,
  NESTI_PALETTES,
  NESTI_PRODUCTS,
  NESTI_PRODUCT_BY_ID,
  NESTI_FEATURED,
  NESTI_NEW_IN,
});
