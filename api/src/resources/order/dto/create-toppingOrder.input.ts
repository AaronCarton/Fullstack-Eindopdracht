import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateToppingOrderInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field()
  category: string

  @Field({ nullable: true, defaultValue: false })
  default: boolean

  @Field()
  price: number
}
