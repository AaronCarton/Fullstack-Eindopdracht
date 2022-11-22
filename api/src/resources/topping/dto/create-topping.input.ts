import { InputType, Field } from '@nestjs/graphql'
import { IsBoolean, IsNotEmpty, IsNumber, Min } from 'class-validator'
import { ToppingCategory } from '../entities/topping.entity'

@InputType()
export class CreateToppingInput {
  @Field()
  @IsNotEmpty()
  name: string

  @Field()
  @IsNotEmpty()
  description: string

  @Field(() => ToppingCategory)
  category: ToppingCategory

  @Field({ nullable: true, defaultValue: false })
  @IsBoolean()
  default: boolean

  @Field({ nullable: true, defaultValue: 0 })
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  stock: number

  @Field()
  @IsNumber()
  @Min(0)
  price: number
}
