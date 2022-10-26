import Topping from './topping.interface'

export default interface Pizza {
  id: string
  name: string
  description: string

  size: 'small' | 'medium' | 'large'
  type: 'classic' | 'pan'
  cheesyCrust: boolean
  toppings: Topping

  basePrice: number
  totalPrice: number

  createdAt: string
  updatedAt: string
}
