import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pizza } from '../pizza/entities/pizza.entity'
import { PizzaService } from '../pizza/pizza.service'
import { OrderResolver } from './order.resolver'
import { Order } from './entities/order.entity'
import { OrderService } from './order.service'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, Pizza, User])],
  providers: [OrderResolver, OrderService, PizzaService, UserService],
})
export class OrderModule {}
