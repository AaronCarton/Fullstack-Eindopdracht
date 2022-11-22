import { InputType, Field } from '@nestjs/graphql'
import { ArrayMinSize } from 'class-validator'
import { CreatePizzaOrderInput } from 'src/resources/pizza/dto/create-pizzaOrder.input'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'

@InputType()
export class CreateOrderInput {
  @Field(() => [CreatePizzaOrderInput])
  @ArrayMinSize(1)
  items: Pizza[]
}
