export interface IShortedCollection {
  id: string;
  image: string;
  title: string;
  price: number;
  category: string;
  gender: "MEN" | "WOMEN"
  slug: string
}

export interface ICollectionProduct {
  id: string
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
