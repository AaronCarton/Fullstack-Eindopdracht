import { CreatePizzaInput } from './create-pizza.input'
import { InputType, PartialType } from '@nestjs/graphql'

@InputType()
export class UpdatePizzaInput extends PartialType(CreatePizzaInput) {}
