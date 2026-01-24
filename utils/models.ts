export type Gender = "MEN" | "WOMEN"
export type Type = "collections" | "accessories" | "nutrition"

export interface IProduct {
  id: string
  image: string
  title: string
  price: number
  category: string
  gender?: Gender
  slug: string
  type: Type
}

export interface IFullProduct extends Omit<IProduct, "image"> {
  images: string[]
  description: string
  colors?: string[]
  sizes?: string[]
  material: string
  fit: string
  care: string
  origin: string
}

export interface ICartItem extends IProduct {
  quantity: number
  key: string
}

export interface ICartContext {
  items: ICartItem[]
  add: (product: IProduct) => void
  remove: (key: string) => void
  increase: (key: string) => void
  decrease: (key: string) => void
  total: number
  amount: number
}

export interface IWishlistItem extends IProduct {
  key: string
}

export interface IWishlistContext {
  items: IWishlistItem[]
  toggle: (product: IProduct) => void
  has: (key: string) => boolean
  amount: number
}

export interface IProductCardProps extends IProduct {
  route: string
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
  type: Type;
  gender?: string;
  initialProducts: IProduct[];
  categories: string[]
}

export interface IProductPageProps {
  product: IFullProduct
  recommended: IProduct[]
  type: Type;
  backRoute: string
}

export interface ICartCardProps extends Omit<ICartItem, "key" | "id" | "category"> {
  cartKey: string
}

export type IWishlistCardProps = Omit<IWishlistItem, "key">