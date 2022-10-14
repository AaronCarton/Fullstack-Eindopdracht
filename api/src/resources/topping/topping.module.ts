import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ToppingService } from './topping.service'
import { ToppingResolver } from './topping.resolver'
import { Topping } from './entities/topping.entity'
import { PizzaService } from '../pizza/pizza.service'
import { Pizza } from '../pizza/entities/pizza.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Topping, Pizza])],
  providers: [ToppingResolver, ToppingService, PizzaService],
})
export class ToppingModule {}
