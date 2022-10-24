import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class UpdateUserInput {
  @Field()
  street: string

  @Field()
  houseNumber: string

  @Field()
  city: string
}
