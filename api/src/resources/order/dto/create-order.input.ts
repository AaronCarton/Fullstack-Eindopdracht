import { InputType, Field } from '@nestjs/graphql'
import { OrderStatus } from '../entities/order.entity'

@InputType()
export class CreateOrderInput {
  @Field(() => [String])
  itemsIds: string[]

  @Field(() => OrderStatus, { defaultValue: OrderStatus.pending })
  status: OrderStatus
}
