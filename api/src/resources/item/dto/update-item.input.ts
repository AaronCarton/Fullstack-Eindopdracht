import { CreateItemInput } from './create-item.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { ItemType } from '../entities/item.entity'

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field()
  name: string

  @Field()
  description: string

  @Field(() => Number)
  price: number

  @Field(() => Number)
  stock: number

  @Field(() => ItemType)
  category: ItemType
}
