import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql'
import { FirebaseGuard } from 'src/auth/guards/firebase.guard'
import { UseGuards } from '@nestjs/common'
import { ReviewService } from './review.service'
import { Review } from './entities/review.entity'
import { CreateReviewInput } from './dto/create-review.input'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { Role } from '../user/entities/user.entity'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { UserRecord } from 'firebase-admin/auth'
import { OrderService } from '../order/order.service'
import { Order } from '../order/entities/order.entity'

@Resolver(() => Review)
export class ReviewResolver {
  constructor(
    private readonly reviewService: ReviewService,
    private readonly orderService: OrderService,
  ) {}

  //////* FIELD RESOLVERS ///////

  @ResolveField()
  order(@Parent() review: Review): Promise<Order> {
    return this.orderService.findOne(review.orderId)
  }

  //////* USER ROUTES ///////

  @UseGuards(FirebaseGuard)
  @Mutation(() => Review)
  async createReview(
    @CurrentUser() user: UserRecord,
    @Args('createReviewInput') createReviewInput: CreateReviewInput,
  ) {
    // check if order belongs to user
    const order = await this.orderService.findOne(createReviewInput.orderId)
    if (order?.customerId !== user.uid) {
      throw new Error('Order does not belong to user')
    }
    if (order?.status !== 'DELIVERED') {
      throw new Error('Order has not been delivered yet')
    }
    if (order?.reviewId) {
      throw new Error('Order has already been reviewed')
    }
    const review = await this.reviewService.create(user.uid, createReviewInput)
    // update order with review
    this.orderService.addReviewToOrder(createReviewInput.orderId, review.id)
    return review
  }

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
  @Query(() => [Review], { name: 'reviews' })
  findAll() {
    return this.reviewService.findAll()
  }

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
  @Query(() => Review, { name: 'review' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.reviewService.findOne(id)
  }

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
  @Mutation(() => Review)
  removeReview(@Args('id', { type: () => String }) id: string) {
    return this.reviewService.remove(id)
  }
}
