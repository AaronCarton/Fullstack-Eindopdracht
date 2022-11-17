import { InputType, Field } from '@nestjs/graphql'
import { ArrayMinSize } from 'class-validator'
import { OrderStatus } from '../entities/order.entity'

@InputType()
export class CreateOrderInput {
  @Field(() => [String])
  @ArrayMinSize(1)
  itemsIds: string[]

  @Field(() => OrderStatus, { defaultValue: OrderStatus.PENDING })
  status: OrderStatus
}
