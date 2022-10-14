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
  async totalPrice(@Parent() pizza: Pizza): Promise<number> {
    let price = pizza.basePrice
    for (const toppingId of pizza.toppingsIds) {
      const topping = await this.toppingService.findOne(toppingId)
      price += topping.price
    }
    return price
  }

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

  @Query(() => [Pizza], { name: 'pizzasByTopping' })
  findAllByTopping(@Args('toppingId', { type: () => String }) toppingId: string) {
    return this.pizzaService.findAllByTopping(toppingId)
  }

  @Query(() => Pizza, { name: 'pizza' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.pizzaService.findOne(id)
  }

  @Mutation(() => Pizza)
  async updatePizza(
    @Args('id', { type: () => String }) id: string,
    @Args('updatePizzaInput') updatePizzaInput: UpdatePizzaInput,
  ) {
    await this.pizzaService.update(id, updatePizzaInput)
    return this.pizzaService.findOne(id)
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
