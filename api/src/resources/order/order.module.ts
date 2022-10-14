import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pizza } from '../pizza/entities/pizza.entity'
import { PizzaService } from '../pizza/pizza.service'
import { OrderResolver } from './order.resolver'
import { Order } from './entities/order.entity'
import { OrderService } from './order.service'

@Module({
  imports: [TypeOrmModule.forFeature([Order, Pizza])],
  providers: [OrderResolver, OrderService, PizzaService],
})
export class OrderModule {}
