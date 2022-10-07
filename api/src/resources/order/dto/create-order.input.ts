import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateOrderInput {
  @Field(() => [String])
  itemsIds: string[]

  @Field()
  status: 'pending' | 'cooking' | 'delivering' | 'delivered'

  @Field()
  total: number // TODO: calculate total based on items
}
