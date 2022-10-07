import { Module } from '@nestjs/common'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { ToppingModule } from './resources/topping/topping.module'
import { PizzaModule } from './resources/pizza/pizza.module'

@Module({
  imports: [BootstrapModule, ToppingModule, PizzaModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
