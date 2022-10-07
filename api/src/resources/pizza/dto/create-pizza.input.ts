import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreatePizzaInput {
  @Field()
  name: string

  @Field()
  description: string

  @Field()
  type: 'classic' | 'pan'

  @Field()
  size: 'small' | 'medium' | 'large'

  @Field()
  cheesyCrust: boolean

  @Field(() => [String])
  toppingsIds: string[]

  @Field()
  price: number // TODO: calculate price based on toppings
}
