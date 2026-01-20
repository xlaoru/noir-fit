export interface IShortedCloth {
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
  category: string
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
  category: string
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
  category: string
  material: string
  fit: string
  care: string
  origin: string
}