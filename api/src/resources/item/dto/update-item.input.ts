import { CreateItemInput } from './create-item.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'
import { ItemType } from '../entities/item.entity'

@InputType()
export class UpdateItemInput extends PartialType(CreateItemInput) {
  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  description: string

  @Field(() => Number, { nullable: true })
  price: number

  @Field(() => Number, { nullable: true })
  stock: number

  @Field(() => ItemType, { nullable: true })
  category: ItemType
}
