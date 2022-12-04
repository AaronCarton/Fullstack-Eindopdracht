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
