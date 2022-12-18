import Order from './order.interface'

export default interface Review {
  id: string
  orderId: string
  order: Order
  customerId: string

  rating: number
  comment: string
}
