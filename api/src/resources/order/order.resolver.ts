import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { CreateOrderInput } from './dto/create-order.input'
import { UpdateOrderInput } from './dto/update-order.input'
import { PizzaService } from '../pizza/pizza.service'
import { Order } from './entities/order.entity'
import { OrderService } from './order.service'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserRecord } from 'firebase-admin/auth'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/auth/guards/firebase.guard'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { Role } from '../user/entities/user.entity'

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly pizzaService: PizzaService,
  ) {}

  //////* FIELD RESOLVERS ///////

  // @ResolveField()
  // async total(@Parent() order: Order): Promise<number> {
  //   const items = await Promise.all(
  //     order.itemsIds.map((itemId) => this.pizzaService.findOne(itemId)),
  //   )
  //   console.log(items)

  //   return items.reduce((total, item) => total + item.basePrice, 0)
  // }

  // @ResolveField()
  // items(@Parent() order: Order): Promise<Pizza>[] {
  //   return order.itemsIds.map(async (itemId) => {
  //     const item = await this.pizzaService.findOne(itemId)
  //     return item
  //   })
  // }

  //////* USER ROUTES ///////

  @UseGuards(FirebaseGuard)
  @Mutation(() => Order)
  createOrder(
    @CurrentUser() user: UserRecord,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return this.orderService.create(user.uid, createOrderInput)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => [Order])
  findOwnOrders(@CurrentUser() user: UserRecord) {
    return this.orderService.findOrdersByUser(user.uid)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => Order, { name: 'order' })
  async findOne(@CurrentUser() user: UserRecord, @Args('id', { type: () => String }) id: string) {
    const order = await this.orderService.findOne(id)
    if (order.customerId === user.uid) return order
    else throw new Error('UNAUTHORIZED_ACCESS')
  }

  //////* DRIVER ROUTES ///////

  @UseGuards(FirebaseGuard, RolesGuard(Role.DRIVER))
  @Mutation(() => Order)
  async updateOrder(
    @Args('id', { type: () => String }) id: string,
    @Args('updateOrderInput') updateOrderInput: UpdateOrderInput,
  ) {
    await this.orderService.update(id, updateOrderInput)
    return this.orderService.findOne(id)
  }

  @UseGuards(FirebaseGuard, RolesGuard([Role.DRIVER]))
  @Query(() => [Order])
  findActiveOrders() {
    return this.orderService.findActiveOrders()
  }

  //////* ADMIN ROUTES ///////

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
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
