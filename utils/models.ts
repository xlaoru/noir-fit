export interface IShortedCollection {
  image: string;
  title: string;
  price: number;
  category: string;
  type: "COLLECTIONS" | "ACCESSORIES" | "NUTRITION"
  gender: "MEN" | "WOMEN";
  slug: string;
}

export interface ICloth {
  images: string[]
  title: string
  price: number
  description: string
  colors: string[]
  sizes: string[]
  slug: string
  gender: "MEN" | "WOMEN"
  category:
    | "TSHIRT"
    | "TANK"
    | "HOODIE"
    | "SWEATSHIRT"
    | "JOGGERS"
    | "SHORTS"
    | "COMPRESSION"
    | "LEGGINGS"
    | "OUTERWEAR"
    | "SEAMLESS"
    | "OVERSIZE"
    | "TRAINING"
    | "RUNNING"
    | "POWERLIFTING"
    | "CROSSFIT"
    | "RECOVERY"
    | "SPORT_BRA"
    | "TSHIRT"
    | "TANK"
    | "HOODIE"
    | "CROP"
    | "LEGGINGS"
    | "SHORTS"
    | "SEAMLESS"
    | "HIGHWAIST"
    | "GYM_SET"
    | "RUNNING"
    | "YOGA"
    | "COMPRESSION"
    | "RECOVERY"
  material: string
  fit: string
  care: string
  origin: string
}

export interface IShortedAccessory {
  image: string;
  title: string;
  price: number;
  category: string;
  type: "COLLECTIONS" | "ACCESSORIES" | "NUTRITION"
  slug: string;
}

export interface IAccessory {
  images: string[]
  title: string
  price: number
  description: string
  colors: string[]
  slug: string
  category:
    | "BAG"
    | "GLOVES"
    | "STRAPS"
    | "WRAPS"
    | "BELT"
    | "SHAKER"
    | "BOTTLE"
    | "CAP"
    | "BEANIE"
    | "TOWEL"
    | "WATCH"
    | "SOCKS"
    | "KNEE_SLEEVES"
    | "WRIST_SLEEVES"
    | "BACKPACK"
    | "ESSENTIAL"
  material: string
  fit: string
  care: string
  origin: string
}

export interface IShortedNutrition {
  image: string
  title: string
  price: number
  category: string
  type: "COLLECTIONS" | "ACCESSORIES" | "NUTRITION"
  slug: string
}

export interface INutrition {
  images: string[]
  title: string
  price: number
  description: string
  slug: string
  category:
    | "PROTEIN"
    | "WHEY"
    | "ISOLATE"
    | "CASEIN"
    | "BCAA"
    | "EAA"
    | "PREWORKOUT"
    | "FATBURNER"
    | "VITAMINS"
    | "TESTOSTERONE"
    | "CREATINE"
    | "ENERGY"
    | "RECOVERY"
    | "WEIGHT_GAINER"
    | "SHRED"
    | "HEALTH"
    | "SUPPLEMENT"
  material: string
  fit: string
  care: string
  origin: string
}