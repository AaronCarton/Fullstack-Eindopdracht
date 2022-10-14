import { CreateToppingInput } from './create-topping.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdateToppingInput extends PartialType(CreateToppingInput) {}
