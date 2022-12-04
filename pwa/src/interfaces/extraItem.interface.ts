export default interface ExtraItem {
  id: string
  name: string
  description: string
  category: ExtraItemType
  price: number
  stock: number
  createdAt: string
  updatedAt: string
}

export enum ExtraItemType {
  DRINK = 'drink',
  DESSERT = 'dessert',
  SPECIAL = 'special',
  APPETIZER = 'appetizer',
}
