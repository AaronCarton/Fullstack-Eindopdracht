import { InputType, Field } from '@nestjs/graphql'
import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator'
import { ItemType } from '../entities/item.entity'

@InputType()
export class CreateItemOrderInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  name: string

  @Field(() => ItemType)
  @IsString()
  @IsNotEmpty()
  category: ItemType

  @Field(() => Number)
  @IsNumber()
  @Min(0)
  price: number
}
