import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ToppingService } from './topping.service'
import { ToppingResolver } from './topping.resolver'
import { Topping } from './entities/topping.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Topping])],
  providers: [ToppingResolver, ToppingService],
})
export class ToppingModule {}
