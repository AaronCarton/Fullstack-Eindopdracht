import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { ItemType } from '../entities/item.entity'

@InputType()
export class CreateItemInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string

  @Field()
  @IsString()
  @IsNotEmpty()
  description: string

  @Field(() => ItemType)
  @IsString()
  @IsNotEmpty()
  category: ItemType

  @Field(() => Number)
  @IsNumber()
  @Min(0)
  price: number

  @Field(() => Number)
  @IsNumber({ maxDecimalPlaces: 0 })
  @Min(0)
  stock: number
}
