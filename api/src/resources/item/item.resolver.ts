import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ItemService } from './item.service'
import { Item } from './entities/item.entity'
import { CreateItemInput } from './dto/create-item.input'
import { UpdateItemInput } from './dto/update-item.input'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'
import { UseGuards } from '@nestjs/common'
import { FirebaseGuard } from 'src/auth/guards/firebase.guard'
import { RolesGuard } from 'src/auth/guards/role.guard'
import { Role } from '../user/entities/user.entity'

@Resolver(() => Item)
export class ItemResolver {
  constructor(private readonly itemService: ItemService) {}

  @Query(() => [Item], { name: 'extraItemsByCategory' })
  findByCategory(@Args('category', { type: () => String }) category: string) {
    return this.itemService.findByCategory(category)
  }

  @Query(() => [Item], { name: 'items' })
  findAll() {
    return this.itemService.findAll()
  }

  @Query(() => Item, { name: 'item' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.itemService.findOne(id)
  }

  //////* ADMIN ROUTES ///////

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
  @Mutation(() => Item)
  createItem(@Args('createItemInput') createItemInput: CreateItemInput) {
    return this.itemService.create(createItemInput)
  }

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
  @Mutation(() => Item)
  async updateItem(
    @Args('id', { type: () => String }) id: string,
    @Args('updateItemInput') updateItemInput: UpdateItemInput,
  ) {
    const item = this.itemService.findOne(id)
    await this.itemService.update(id, { ...item, ...updateItemInput })
    return this.itemService.findOne(id)
  }

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
  @Mutation(() => ClientMessage)
  removeItem(@Args('id', { type: () => String }) id: string) {
    return new Promise((resolve) =>
      this.itemService
        .remove(id)
        .then(() =>
          resolve({
            type: MessageTypes.success,
            message: 'Order deleted successfully',
            statusCode: 200,
          }),
        )
        .catch(() =>
          resolve({
            type: MessageTypes.error,
            message: 'Order could not be deleted',
            statusCode: 500,
          }),
        ),
    )
  }
}
