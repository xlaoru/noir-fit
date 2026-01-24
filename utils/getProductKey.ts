import { Type } from "./models"

export function getProductKey(type: Type, id: string) {
  return `${type}:${id}`
}