import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql'
import { PizzaService } from './pizza.service'
import { Pizza } from './entities/pizza.entity'
import { CreatePizzaInput } from './dto/create-pizza.input'
import { UpdatePizzaInput } from './dto/update-pizza.input'
import { Topping } from '../topping/entities/topping.entity'
import { ToppingService } from '../topping/topping.service'

@Resolver(() => Pizza)
export class PizzaResolver {
  constructor(
    private readonly pizzaService: PizzaService,
    private readonly toppingService: ToppingService,
  ) {}

  @ResolveField()
  toppings(@Parent() pizza: Pizza): Promise<Topping>[] {
    return this.toppingService.findAllByPizza(pizza)
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

  @Mutation(() => Pizza)
  removePizza(@Args('id', { type: () => String }) id: string) {
    return this.pizzaService.remove(id)
  }
}
