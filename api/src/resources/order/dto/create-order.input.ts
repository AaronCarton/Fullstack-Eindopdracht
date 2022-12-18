import { InputType, Field } from '@nestjs/graphql'
import { ArrayMinSize, IsDate, IsNotEmpty, IsNumber, IsString } from 'class-validator'
import { CreateItemOrderInput } from 'src/resources/item/dto/create-itemOrder.input'
import { Item } from 'src/resources/item/entities/item.entity'
import { CreatePizzaOrderInput } from 'src/resources/pizza/dto/create-pizzaOrder.input'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'
import { DeliveryType } from '../entities/order.entity'

@InputType()
export class CreateOrderInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  address: string

  @Field()
  @IsNumber()
  lat: number

  @Field()
  @IsNumber()
  lng: number

  @Field()
  @IsDate()
  deliveryTime: Date

  @Field(() => DeliveryType)
  deliveryType: DeliveryType

  @Field()
  @IsString()
  @IsNotEmpty()
  paymentMethod: string

  @Field(() => [CreatePizzaOrderInput])
  @ArrayMinSize(1)
  items: Pizza[]

  @Field(() => [CreateItemOrderInput])
  @ArrayMinSize(0)
  extras: Item[]
}
