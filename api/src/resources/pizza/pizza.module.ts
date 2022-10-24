import { Module } from '@nestjs/common'
import { PizzaService } from './pizza.service'
import { PizzaResolver } from './pizza.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Pizza } from './entities/pizza.entity'
import { Topping } from '../topping/entities/topping.entity'
import { ToppingService } from '../topping/topping.service'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([Pizza, Topping, User])],
  providers: [PizzaResolver, PizzaService, ToppingService, UserService],
})
export class PizzaModule {}
