import { Order, OrderItem, OrderStatus, Role } from "@/app/generated/prisma"

export type Gender = "MEN" | "WOMEN"
export type Type = "APPAREL" | "ACCESSORIES" | "NUTRITION"

export interface IProduct {
  id: string
  images: string[]
  title: string
  price: number
  category: string
  gender?: Gender
  slug: string
  type: Type
}

export interface IFullProduct extends IProduct {
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
}

export interface ICartContext {
  items: ICartItem[]
  add: (product: IProduct) => void
  remove: (id: string) => void
  increase: (id: string) => void
  decrease: (id: string) => void
  clear: () => void
  subtotal: number
  shipping: number
  total: number
  amount: number
}

export interface IHeaderProps {
  slug: string
  userRole: Role
}

export interface IProductCardProps extends IProduct {
  isSaved: boolean
  route: string
}

export interface IFiltersProps {
  categories: string[]
}

export interface IDescriptionCardProps {
  svgIcon: React.ReactNode
  title: string
  body: string
}

export interface ICategoryCardProps {
  backgroundImageUrl: string
  title: string
  slug: string
}

export interface IProductsPageProps {
  title: string
  body: string
  type: Type
  gender?: string
  products: (IProduct & { isSaved: boolean })[]
  categories: string[]
}

export interface IProductPageProps {
  product: IFullProduct & { isSaved: boolean }
  recommended: (IProduct & { isSaved: boolean })[]
  type: Type
  backRoute: string
}

export interface ICartCardProps extends Omit<ICartItem, "category"> {}

export type IWishlistCardProps = IProduct & {
  onRemove: (id: string) => void
}

export interface IWishlistPageProps {
  products: (IProduct & { isSaved: boolean })[]
}

export interface ICheckoutPageProps {
  email: string
  phoneNumber: string
  firstName: string
  lastName: string
  address: string
  city: string
  country: string
  zipCode: string
}

export interface ICheckoutCardProps {
  image: string
  title: string
  price: number
  quantity: number
}

export interface IPaymentPageProps {
  cardNumber: string
  expireDate: string
  cvv: string
  nameOfCard: string
}

export interface ISuccessPageProps {
  orderId: string
}

type OrderWithItems = Order & {
  items: OrderItem[]
}

export interface IUserPageProps extends ICheckoutPageProps {
  cardNumber: string
  expireDate: string
  cvv: string
  nameOfCard: string
  orders: OrderWithItems[]
  slug: string
  statuses: OrderStatus[]
}

export interface IUserInfoTabProps {
  slug: string
  tabs: string[]
  currentTab: string
}

export interface ITabIconProps {
  tabName: string
}

export interface IProfileProps extends Omit<
  IUserPageProps,
  "orders" | "slug" | "statuses"
> {}

export interface IOrdersProps {
  orders: Omit<OrderWithItems, "userId">[]
  slug: string
  statuses: OrderStatus[]
}

export interface ISettingsProps {}

export interface ISignOutProps {}

export interface IShippingFormProps {
  phoneNumber: string
  address: string
  city: string
  country: string
  zipCode: string
  setEditingShipping: (isEditing: boolean) => void
}

export interface IPaymentFormProps {
  cardNumber: string
  expireDate: string
  cvv: string
  nameOfCard: string
  setEditingPayment: (isEditing: boolean) => void
}

export interface IOrderItemProps extends Omit<OrderWithItems, "userId"> {
  slug: string
}
