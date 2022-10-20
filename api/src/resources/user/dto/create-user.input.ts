import { InputType, Field } from '@nestjs/graphql'

@InputType()
export class CreateUserInput {
  @Field()
  uid: string

  @Field()
  street: string

  @Field()
  houseNumber: string

  @Field()
  city: string
}
