import { Module } from '@nestjs/common'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { ToppingModule } from './resources/topping/topping.module'
import { PizzaModule } from './resources/pizza/pizza.module'
import { OrderModule } from './resources/order/order.module'

@Module({
  imports: [BootstrapModule, ToppingModule, PizzaModule, OrderModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
