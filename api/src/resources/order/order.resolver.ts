import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'
import { Pizza } from '../pizza/entities/pizza.entity'
import { PizzaService } from '../pizza/pizza.service'
import { Order } from './entities/order.entity'
import { OrderService } from './order.service'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly pizzaService: PizzaService,
  ) {}

  @ResolveField()
  items(@Parent() order: Order): Promise<Pizza>[] {
    return order.itemsIds.map((item) => this.pizzaService.findOne(item))
  }

  @Mutation(() => Order)
  createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput) {
    return this.orderService.create(createOrderInput)
  }

  @Query(() => [Order], { name: 'orders' })
  findAll() {
    return this.orderService.findAll()
  }

  @Query(() => Order, { name: 'order' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.orderService.findOne(id)
  }

  @Mutation(() => Order)
  updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
    return this.orderService.update(updateOrderInput.id, updateOrderInput)
  }

  @Mutation(() => ClientMessage)
  async removeOrder(@Args('id', { type: () => String }) id: string) {
    const deleted = await this.orderService.remove(id)
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
