import { InputType, Field } from '@nestjs/graphql'
import { CreatePizzaOrderInput } from 'src/resources/order/dto/create-pizzaOrder.input'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'
import { OrderStatus } from '../entities/order.entity'

@InputType()
export class CreateOrderInput {
  @Field(() => [CreatePizzaOrderInput])
  items: Pizza[]

  @Field(() => OrderStatus)
  status: OrderStatus

  @Field()
  total: number // TODO: calculate total based on items
}
