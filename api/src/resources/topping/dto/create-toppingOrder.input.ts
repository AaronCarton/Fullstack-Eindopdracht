import { InputType, Field } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { ToppingCategory } from '../entities/topping.entity'

@InputType()
export class CreateToppingOrderInput {
  @Field()
  @IsNotEmpty()
  name: string

  @Field(() => ToppingCategory)
  category: ToppingCategory

  @Field()
  @IsNumber()
  @Min(0)
  price: number

  @Field({ nullable: true, defaultValue: false })
  @IsBoolean()
  default: boolean
}
