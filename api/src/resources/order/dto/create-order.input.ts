import { InputType, Field } from '@nestjs/graphql'
import { CreatePizzaInput } from 'src/resources/pizza/dto/create-pizza.input'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'

@InputType()
export class CreateOrderInput {
  @Field(() => [CreatePizzaInput])
  items: Pizza[]

  @Field()
  status: 'pending' | 'cooking' | 'delivering' | 'delivered'

  @Field()
  total: number // TODO: calculate total based on items
}
