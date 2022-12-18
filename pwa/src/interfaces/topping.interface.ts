export default interface Topping {
  id: string
  name: string
  description: string
  category: 'vegetable' | 'meat' | 'cheese' | 'sauce'
  price: number
  stock: number
  default: boolean

  createdAt: string
  updatedAt: string
}
