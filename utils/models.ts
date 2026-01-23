export interface IShortedCloth {
  id: string
  image: string;
  title: string;
  price: number;
  category: string;
  gender: "MEN" | "WOMEN";
  slug: string;
  type: "collections" | "accessories" | "nutrition"
}

export interface ICloth {
  id: string
  images: string[]
  title: string
  price: number
  description: string
  colors: string[]
  sizes: string[]
  gender: "MEN" | "WOMEN"
  category: string
  material: string
  fit: string
  care: string
  origin: string
  slug: string
  type: "collections"
}

export interface IShortedAccessory {
  id: string
  image: string;
  title: string;
  price: number;
  category: string;
  slug: string;
  type: "collections" | "accessories" | "nutrition"
}

export interface IAccessory {
  id: string
  images: string[]
  title: string
  price: number
  description: string
  colors: string[]
  category: string
  material: string
  fit: string
  care: string
  origin: string
  slug: string
  type: "accessories"
}

export interface IShortedNutrition {
  id: string
  image: string
  title: string
  price: number
  category: string
  slug: string
  type: "collections" | "accessories" | "nutrition"
}

export interface INutrition {
  id: string
  images: string[]
  title: string
  price: number
  description: string
  category: string
  material: string
  fit: string
  care: string
  origin: string
  slug: string
  type: "nutrition"
}

export interface StoreItem {
  id: string
  title: string
  price: number
  image: string
  category: string
  slug: string
  type: "collections" | "accessories" | "nutrition"
  gender?: "MEN" | "WOMEN"
}

export interface CartItem extends StoreItem {
  quantity: number
  key: string
}

export interface ICartContext {
  items: CartItem[]
  add: (item: StoreItem) => void
  remove: (key: string) => void
  increase: (key: string) => void
  decrease: (key: string) => void
  total: number
  amount: number
}

export interface WishlistItem extends StoreItem {
  key: string
}

export interface IWishlistContext {
  items: WishlistItem[]
  toggle: (item: StoreItem) => void
  has: (key: string) => boolean
  amount: number
}

export interface IProductCardProps {
  id: string
  title: string;
  price: number
  image: string;
  category: string;
  gender?: "MEN" | "WOMEN";
  route: string
  slug: string;
  type: "collections" | "accessories" | "nutrition";
}

export interface IFiltersProps {
  categories: string[]
  activeCategory: string | null
  setActiveCategory: (activeCategory: string | null) => void
  sort: string
  setSort: (sort: string) => void
}

export interface IDescriptionCardProps {
  svgIcon: React.ReactNode;
  title: string;
  body: string
}

export interface ICategoryCardProps {
  backgroundImageUrl: string;
  title: string;
  slug: string
}

export interface IProductsPageProps {
  title: string;
  body: string;
  type: "collections" | "accessories" | "nutrition"
  gender?: string;
  initialProducts: (IShortedCloth | IShortedAccessory | IShortedNutrition)[];
  categories: string[]
}

export interface IProductPageProps {
  product: ICloth | IAccessory | INutrition
  recommended: IShortedCloth[] | IShortedAccessory[] | IShortedNutrition[]
  type: ("men" | "women") | "accessories" | "nutrition"
  backRoute: string
}

export interface ICardCardProps {
  title: string
  price: number
  image: string
  gender?: "MEN" | "WOMEN"
  slug: string
  type: "collections" | "accessories" | "nutrition"
  cartKey: string
  quantity: number
}

export interface IWishlistCardProps {
  id: string
  type: "collections" | "accessories" | "nutrition"
  title: string
  price: number
  image: string
  category: string
  slug: string
  gender?: "MEN" | "WOMEN"
}