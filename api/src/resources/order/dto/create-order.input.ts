import { InputType, Field } from '@nestjs/graphql'
import { ArrayMinSize, IsDate, IsNotEmpty, IsString } from 'class-validator'
import { CreateItemInput } from 'src/resources/item/dto/create-item.input'
import { CreatePizzaOrderInput } from 'src/resources/pizza/dto/create-pizzaOrder.input'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'

@InputType()
export class CreateOrderInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  address: string

  @Field()
  @IsDate()
  deliveryTime: Date

  @Field(() => [CreatePizzaOrderInput])
  @ArrayMinSize(1)
  items: Pizza[]

  @Field(() => [CreateItemInput])
  @ArrayMinSize(0)
  extras: CreateItemInput[]
}
