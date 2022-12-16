import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pizza } from '../pizza/entities/pizza.entity'
import { PizzaService } from '../pizza/pizza.service'
import { OrderResolver } from './order.resolver'
import { Order } from './entities/order.entity'
import { OrderService } from './order.service'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'
import { Topping } from '../topping/entities/topping.entity'
import { ToppingService } from '../topping/topping.service'
import { Item } from '../item/entities/item.entity'
import { ItemService } from '../item/item.service'
import { Review } from '../review/entities/review.entity'
import { ReviewService } from '../review/review.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, Pizza, Topping, Item, User, Review])],
  providers: [
    OrderResolver,
    OrderService,
    PizzaService,
    ToppingService,
    ItemService,
    UserService,
    ReviewService,
  ],
})
export class OrderModule {}
