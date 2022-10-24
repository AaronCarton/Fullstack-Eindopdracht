import { CanActivate, ExecutionContext, Injectable, mixin } from '@nestjs/common'
import { GqlExecutionContext } from '@nestjs/graphql'
import { UserService } from 'src/resources/user/user.service'

export const RolesGuard = (roles: string[]) => {
  @Injectable()
  class RolesGuardMixin implements CanActivate {
    constructor(readonly usersService: UserService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const ctx = GqlExecutionContext.create(context)
      const user = ctx.getContext().req.user
      const { role } = await this.usersService.findByUid(user.uid)

      // TODO: what if there are no roles required?
      // TODO: what if there are no roles on the user?
      return roles.includes(role)
    }
  }

  const guard = mixin(RolesGuardMixin)
  return guard
}
