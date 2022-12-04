import ExtraItem from './extraItem.interface'
import Pizza from './pizza.interface'

export default interface Cart {
  items: CartItem[]
  extras: ExtraCartItem[]
}

export interface CartItem {
  id: string
  item: Pizza
}

export interface ExtraCartItem {
  id: string
  item: ExtraItem
}

export const isCartItem = (item: any): item is CartItem =>
  (item as CartItem).item.toppings !== undefined
export const isExtraCartItem = (item: any): item is ExtraCartItem =>
  (item as ExtraCartItem).item.stock !== undefined
