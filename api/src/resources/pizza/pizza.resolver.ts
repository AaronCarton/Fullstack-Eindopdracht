import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql'
import { PizzaService } from './pizza.service'
import { Pizza } from './entities/pizza.entity'
import { CreatePizzaInput } from './dto/create-pizza.input'
import { UpdatePizzaInput } from './dto/update-pizza.input'
import { Topping } from '../topping/entities/topping.entity'
import { ToppingService } from '../topping/topping.service'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'

@Resolver(() => Pizza)
export class PizzaResolver {
  constructor(
    private readonly pizzaService: PizzaService,
    private readonly toppingService: ToppingService,
  ) {}

  @ResolveField()
  toppings(@Parent() pizza: Pizza): Promise<Topping>[] {
    return pizza.toppingsIds.map((toppingId) => this.toppingService.findOne(toppingId))
  }

  @Mutation(() => Pizza)
  createPizza(@Args('createPizzaInput') createPizzaInput: CreatePizzaInput) {
    return this.pizzaService.create(createPizzaInput)
  }

  @Query(() => [Pizza], { name: 'pizzas' })
  findAll() {
    return this.pizzaService.findAll()
  }

  @Query(() => Pizza, { name: 'pizza' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.pizzaService.findOne(id)
  }

  @Mutation(() => Pizza)
  updatePizza(@Args('updatePizzaInput') updatePizzaInput: UpdatePizzaInput) {
    return this.pizzaService.update(updatePizzaInput.id, updatePizzaInput)
  }

  @Mutation(() => ClientMessage)
  async removePizza(@Args('id', { type: () => String }) id: string) {
    const deleted = await this.pizzaService.remove(id)
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
