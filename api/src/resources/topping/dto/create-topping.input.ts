import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateToppingInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field()
  category: string

  @Field({ nullable: true, defaultValue: false })
  default: boolean

  @Field({ nullable: true, defaultValue: 0 })
  stock: number

  @Field()
  price: number
}
