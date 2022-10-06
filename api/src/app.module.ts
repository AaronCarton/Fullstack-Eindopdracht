import { Module } from '@nestjs/common'
import { BootstrapModule } from './bootstrap/bootstrap.module'
import { ToppingModule } from './resources/topping/topping.module'

@Module({
  imports: [BootstrapModule, ToppingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
