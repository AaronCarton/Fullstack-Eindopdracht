import { InputType, Field } from '@nestjs/graphql'
import { Topping } from 'src/resources/topping/entities/topping.entity'
import { PizzaSize, PizzaType } from '../../pizza/entities/pizza.entity'
import { CreateToppingOrderInput } from './create-toppingOrder.input'

@InputType()
export class CreatePizzaOrderInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field(() => PizzaType)
  type: PizzaType

  @Field(() => PizzaSize)
  size: PizzaSize

  @Field()
  cheesyCrust: boolean

  @Field(() => [CreateToppingOrderInput])
  toppings: Topping[]

  @Field()
  price: number
}
