import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseSeedService } from './seed.service'
import { DatabaseSeedCommand } from './seed.command'
import { CommandModule } from 'nestjs-command' //https://www.npmjs.com/package/nestjs-command
import { Topping } from 'src/resources/topping/entities/topping.entity'
import { Order } from 'src/resources/order/entities/order.entity'
import { Pizza } from 'src/resources/pizza/entities/pizza.entity'
import { Item } from 'src/resources/item/entities/item.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Pizza, Topping, Item, Order]), CommandModule], //<---import CommandModule
  providers: [DatabaseSeedCommand, DatabaseSeedService],
})
export class DatabaseSeedModule {}
