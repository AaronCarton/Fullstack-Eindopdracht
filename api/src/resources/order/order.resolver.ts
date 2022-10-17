import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'
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
  async updateOrder(
    @Args('id', { type: () => String }) id: string,
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ) {
    await this.orderService.update(id, updateOrderInput)
    return this.orderService.findOne(id)
  }

  @Mutation(() => ClientMessage)
  removeOrder(@Args('id', { type: () => String }) id: string) {
    return new Promise((resolve) =>
      this.orderService
        .remove(id)
        .then(() =>
          resolve({
            type: MessageTypes.success,
            message: 'Order deleted successfully',
            statusCode: 200,
          }),
        )
        .catch(() =>
          resolve({
            type: MessageTypes.error,
            message: 'Order could not be deleted',
            statusCode: 500,
          }),
        ),
    )
  }
}
