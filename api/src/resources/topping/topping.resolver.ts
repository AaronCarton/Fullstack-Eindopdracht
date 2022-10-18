import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UpdateToppingInput } from './dto/update-topping.input'
import { CreateToppingInput } from './dto/create-topping.input'
import { Topping } from './entities/topping.entity'
import { ToppingService } from './topping.service'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'
import { PizzaService } from '../pizza/pizza.service'
import { FirebaseGuard } from 'src/auth/guards/firebase.guard'

@Resolver(() => Topping)
export class ToppingResolver {
  constructor(
    private readonly toppingService: ToppingService,
    private readonly pizzaService: PizzaService,
  ) {}

  @UseGuards(FirebaseGuard)
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

  @UseGuards(FirebaseGuard)
  @Mutation(() => Topping)
  async updateTopping(
    @Args('id', { type: () => String }) id: string,
    @Args('updateToppingInput') updateToppingInput: UpdateToppingInput,
  ) {
    await this.toppingService.update(id, updateToppingInput)
    return this.toppingService.findOne(id)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => ClientMessage)
  async removeTopping(@Args('id', { type: () => String }) id: string) {
    return new Promise((resolve) =>
      this.pizzaService
        .findAllByTopping(id) // check if topping is used by any pizza before deleting
        .then((pizzas) => {
          if (pizzas.length > 0)
            return resolve({
              type: MessageTypes.error,
              message: `Cannot delete topping with id ${id} because it is used by ${
                pizzas.length
              } pizzas (ids: ${pizzas.map((p) => p.id).join(', ')})`,
              statusCode: 400,
            })
          else
            return this.toppingService.remove(id).then(() =>
              resolve({
                statusCode: 200,
                message: `Entity ${id} was deleted.`,
                type: MessageTypes.success,
              }),
            )
        })
        .catch(() => {
          resolve({
            statusCode: 500,
            message: `Entity ${id} could not be deleted.`,
            type: MessageTypes.error,
          })
        }),
    )
  }
}
