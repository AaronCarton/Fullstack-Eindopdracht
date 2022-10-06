import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { UpdateToppingInput } from './dto/update-topping.input'
import { CreateToppingInput } from './dto/create-topping.input'
import { Topping } from './entities/topping.entity'
import { ToppingService } from './topping.service'

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

  @Mutation(() => Topping)
  removeTopping(@Args('id', { type: () => String }) id: string) {
    return this.toppingService.remove(id)
  }
}
