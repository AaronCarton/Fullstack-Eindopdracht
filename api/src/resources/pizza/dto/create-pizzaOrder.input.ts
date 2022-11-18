import { InputType, Field } from '@nestjs/graphql'
import { ArrayMaxSize, ArrayMinSize, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { CreateToppingOrderInput } from 'src/resources/topping/dto/create-toppingOrder.input'
import { Topping } from 'src/resources/topping/entities/topping.entity'
import { PizzaSize, PizzaType } from '../entities/pizza.entity'

@InputType()
export class CreatePizzaOrderInput {
  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsNumber()
  @Min(0)
  price: number

  @Field(() => PizzaType)
  type: PizzaType

  @Field(() => PizzaSize)
  size: PizzaSize

  @Field(() => [CreateToppingOrderInput])
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  toppings: Topping[]
}
