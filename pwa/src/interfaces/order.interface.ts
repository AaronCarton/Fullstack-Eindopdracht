import Pizza from './pizza.interface'

export default interface Order {
  id: string
  status: 'PENDING' | 'COOKING' | 'DELIVERING' | 'DELIVERED'
  customerId: string
  items: Pizza[]
  createdAt: string
}

export interface OrderItem {
  name: string
  type: string
  size: string
  basePrice: number
  toppings: {
    name: string
    category: string
    price: number
    default: boolean
  }[]
}
