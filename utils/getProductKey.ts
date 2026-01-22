import { StoreItem } from "./models";

export function getProductKey(p: StoreItem) {
  return `${p.type}:${p.id}`
}