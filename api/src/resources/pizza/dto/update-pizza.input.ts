import { CreatePizzaInput } from './create-pizza.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePizzaInput extends PartialType(CreatePizzaInput) {
  @Field(() => String)
  id: string
}
