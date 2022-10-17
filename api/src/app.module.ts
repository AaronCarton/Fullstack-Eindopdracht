import { Module } from '@nestjs/common'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { ToppingModule } from './resources/topping/topping.module'
import { PizzaModule } from './resources/pizza/pizza.module'
import { OrderModule } from './resources/order/order.module'
import { DatabaseSeedModule } from './seed/seed.module'
import { UserModule } from './resources/user/user.module'

@Module({
  imports: [
    BootstrapModule,
    ToppingModule,
    PizzaModule,
    OrderModule,
    UserModule,
    DatabaseSeedModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
