import { CreateToppingInput } from './create-topping.input'
import { InputType, Field, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateToppingInput extends PartialType(CreateToppingInput) {
  @Field(() => String)
  id: string
}
