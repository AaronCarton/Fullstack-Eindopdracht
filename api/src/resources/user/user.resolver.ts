import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import {} from 'firebase-auth'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { User } from './entities/user.entity'
import { UserService } from './user.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { FirebaseGuard } from 'src/auth/guards/firebase.guard'
import { UserRecord } from 'firebase-admin/auth'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User || ClientMessage)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput) // TODO: catch err for duplicate uid
  }

  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll()
  }

  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id)
  }

  @UseGuards(FirebaseGuard)
  @Query(() => User)
  findUser(@CurrentUser() user: UserRecord) {
    return this.userService.findByUid(user.uid)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput)
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => ClientMessage)
  removeUser(@Args('id', { type: () => String }) id: string) {
    return new Promise((resolve) =>
      this.userService
        .remove(id)
        .then(() =>
          resolve({
            type: MessageTypes.success,
            message: 'User deleted successfully',
            statusCode: 200,
          }),
        )
        .catch(() =>
          resolve({
            type: MessageTypes.error,
            message: 'User could not be deleted',
            statusCode: 500,
          }),
        ),
    )
  }
}
