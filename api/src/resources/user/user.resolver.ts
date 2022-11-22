import { UseGuards } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import { ClientMessage, MessageTypes } from 'src/bootstrap/entities/ClientMessage'
import { CreateUserInput } from './dto/create-user.input'
import { UpdateUserInput } from './dto/update-user.input'
import { Role, User } from './entities/user.entity'
import { UserService } from './user.service'
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { FirebaseGuard } from 'src/auth/guards/firebase.guard'
import { UserRecord } from 'firebase-admin/auth'
import { RolesGuard } from 'src/auth/guards/role.guard'

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  //////* USER ROUTES ///////

  @UseGuards(FirebaseGuard)
  @Query(() => User, { name: 'createSelf' })
  createSelf(@CurrentUser() user: UserRecord) {
    return this.userService.create({ uid: user.uid })
  }

  @UseGuards(FirebaseGuard)
  @Query(() => User)
  async self(@CurrentUser() user: UserRecord) {
    let u = await this.userService.findByUid(user.uid)
    if (!u) u = await this.userService.create({ uid: user.uid })
    return u
  }

  @UseGuards(FirebaseGuard)
  @Mutation(() => User || ClientMessage) // TODO: how to return both?
  async updateSelf(
    @CurrentUser() user: UserRecord,
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    // fetch user
    const u = await this.userService.findByUid(user.uid)
    console.log(u)

    // check if user matches JWT user
    if (u.id.toString() !== id) {
      console.log('User does not match JWT user')

      return {
        type: MessageTypes.error,
        message: 'You are not authorized to update this user',
        statusCode: 401,
      }
    }
    // update user
    return this.userService.update(id, updateUserInput)
  }

  // TODO: add self soft delete route

  //////* ADMIN ROUTES ///////

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput)
  }

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
  @Query(() => [User], { name: 'users' })
  findAll() {
    return this.userService.findAll()
  }

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
  @Query(() => User, { name: 'user' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id)
  }

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
  @Mutation(() => User)
  updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput)
  }

  @UseGuards(FirebaseGuard, RolesGuard(Role.ADMIN))
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
