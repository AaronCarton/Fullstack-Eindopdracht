export default interface Order {
  id: string
  status: 'pending' | 'cooking' | 'delivering' | 'delivered'
  items: Pizza[]
  createdAt: string
  total: number
}

export interface Pizza {
  id: string
  name: string
  type: 'classic' | 'pan'
  size: 'small' | 'medium' | 'large'
  basePrice: number
  toppings: Topping[]
  total: number
}

export interface Topping {
  name: string
  default: boolean
}
