import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UpdateToppingInput } from './dto/update-topping.input'
import { CreateToppingInput } from './dto/create-topping.input'
import { Topping } from './entities/topping.entity'
import { ToppingService } from './topping.service'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'

@Resolver(() => Topping)
export class ToppingResolver {
  constructor(private readonly toppingService: ToppingService) {}

  @Mutation(() => Topping)
  createTopping(@Args('createToppingInput') createToppingInput: CreateToppingInput) {
    return this.toppingService.create(createToppingInput)
  }

  @Query(() => [Topping], { name: 'toppings' })
  findAll() {
    return this.toppingService.findAll()
  }

  @Query(() => Topping, { name: 'topping' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.toppingService.findOne(id)
  }

  @Mutation(() => Topping)
  updateTopping(@Args('updateToppingInput') updateToppingInput: UpdateToppingInput) {
    return this.toppingService.update(updateToppingInput.id, updateToppingInput)
  }

  @Mutation(() => ClientMessage)
  async removeTopping(@Args('id', { type: () => String }) id: string) {
    const deleted = await this.toppingService.remove(id)
    if (deleted.affected <= 1)
      return {
        type: MessageTypes.success,
        message: 'Entity deleted',
        statusCode: 200,
      }

    return {
      type: MessageTypes.error,
      message: "Couldn't delete entity",
      statusCode: 400,
    }
  }
}
