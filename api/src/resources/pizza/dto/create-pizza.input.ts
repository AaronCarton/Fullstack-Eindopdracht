import { InputType, Field } from '@nestjs/graphql'
import { PizzaSize, PizzaType } from '../entities/pizza.entity'

@InputType()
export class CreatePizzaInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field(() => PizzaType)
  type: PizzaType

  @Field(() => PizzaSize)
  size: PizzaSize

  @Field(() => [String])
  toppingsIds: string[]

  @Field()
  basePrice: number // TODO: calculate price based on toppings
}
