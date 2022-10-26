import Pizza from './pizza.interface'

export default interface Order {
  id: string
  status: 'pending' | 'cooking' | 'delivering' | 'delivered'
  items: Pizza[]
  createdAt: string
  total: number
}
