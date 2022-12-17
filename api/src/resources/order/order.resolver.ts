import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { CreateOrderInput } from './dto/create-order.input'
import { Order, OrderStatus } from './entities/order.entity'
import { OrderService } from './order.service'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserRecord } from 'firebase-admin/auth'
import { HttpException, HttpStatus, UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/auth/guards/firebase.guard'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { Role } from '../user/entities/user.entity'
import { Review } from '../review/entities/review.entity'
import { ReviewService } from '../review/review.service'
import { ToppingService } from '../topping/topping.service'
import { ItemService } from '../item/item.service'

@Resolver(() => Order)
export class OrderResolver {
  constructor(
    private readonly orderService: OrderService,
    private readonly reviewService: ReviewService,
    private readonly toppingService: ToppingService,
    private readonly itemService: ItemService,
  ) {}

  //////* FIELD RESOLVERS ///////

  @ResolveField()
  async review(@Parent() order: Order): Promise<Review> {
    const rev = await this.reviewService.findOne(order.reviewId)
    console.log('order review', rev, order.id)
    return rev
  }

  //////* USER ROUTES ///////

  @UseGuards(FirebaseGuard)
  @Mutation(() => Order)
  async createOrder(
    @CurrentUser() user: UserRecord,
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    const order = await this.orderService.create(user.uid, createOrderInput)

    // verify and lower stock of toppings
    const decTop = {}
    for (const item of order.items) {
      for (const t of item.toppings) {
        const topping = await this.toppingService.findByName(t.name)
        if (!topping) throw new HttpException('TOPPING_NOT_FOUND', HttpStatus.BAD_REQUEST)

        decTop[topping.id] = decTop[topping.id] ? decTop[topping.id] + 1 : 1
        await this.toppingService.decreaseStock(topping.id, decTop[topping.id])
      }
    }

    // verify and lower stock of extras
    const decItem = {}
    for (const extra of order.extras) {
      const item = await this.itemService.findByName(extra.name)
      if (!item) throw new HttpException('ITEM_NOT_FOUND', HttpStatus.BAD_REQUEST)

      decItem[item.id] = decTop[item.id] ? decTop[item.id] + 1 : 1
      await this.itemService.decreaseStock(item.id, decItem[item.id])
    }

    return order
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
  async updateOrderStatus(
    @Args('id', { type: () => String }) id: string,
    @Args('status', { type: () => OrderStatus }) status: OrderStatus,
  ) {
    await this.orderService.updateStatus(id, status)
    return this.orderService.findOne(id)
  }

  @UseGuards(FirebaseGuard, RolesGuard(Role.DRIVER))
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
