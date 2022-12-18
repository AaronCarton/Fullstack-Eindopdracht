import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ToppingService } from './topping.service'
import { ToppingResolver } from './topping.resolver'
import { Topping } from './entities/topping.entity'
import { PizzaService } from '../pizza/pizza.service'
import { Pizza } from '../pizza/entities/pizza.entity'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([Topping, Pizza, User])],
  providers: [ToppingResolver, ToppingService, PizzaService, UserService],
})
export class ToppingModule {}
