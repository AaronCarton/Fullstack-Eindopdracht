import { Module } from '@nestjs/common'
import { ItemService } from './item.service'
import { ItemResolver } from './item.resolver'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Item } from './entities/item.entity'
import { User } from '../user/entities/user.entity'
import { UserService } from '../user/user.service'

@Module({
  imports: [TypeOrmModule.forFeature([Item, User])],
  providers: [ItemResolver, ItemService, UserService],
})
export class ItemModule {}
