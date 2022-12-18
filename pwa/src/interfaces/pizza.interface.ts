import Topping from './topping.interface'

export const isPizza = (item: any): item is Pizza => (item as Pizza).toppings !== undefined

export default interface Pizza {
  id: string
  name: string
  description: string

  size: PizzaSize
  type: PizzaType
  cheesyCrust: boolean
  toppings: Topping[]

  basePrice: number
  totalPrice: number

  createdAt: string
  updatedAt: string
}

export enum PizzaSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
}

export enum PizzaType {
  Classic = 'classic',
  Pan = 'pan',
  CheesyCrust = 'cheesyCrust',
}
