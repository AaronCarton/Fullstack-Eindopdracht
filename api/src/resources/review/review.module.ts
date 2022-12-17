import { Module } from '@nestjs/common'
import { ReviewService } from './review.service'
import { ReviewResolver } from './review.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Review } from './entities/review.entity'
import { OrderService } from '../order/order.service'
import { Order } from '../order/entities/order.entity'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([Review, Order, User])],
  providers: [ReviewResolver, ReviewService, OrderService, UserService],
})
export class ReviewModule {}
