import { InputType, Field } from '@nestjs/graphql'
import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { PizzaSize, PizzaType } from '../entities/pizza.entity'

@InputType()
export class CreatePizzaInput {
  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsNotEmpty()
  description: string

  @Field(() => PizzaType)
  type: PizzaType

  @Field(() => PizzaSize)
  size: PizzaSize

  @Field(() => [String])
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  toppingsIds: string[]

  @Field()
  @IsNumber()
  @Min(0)
  basePrice: number // TODO: calculate price based on toppings
}
