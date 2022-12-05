/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

// import { DeleteIDInput } from 'src/common/shared/dtos'
// import { UserSessionDataPipe } from 'src/common/shared/pipes/usersession-data-pipe'
// import { JwtAuthGuard } from 'src/auth/shared/guards/jwt-auth.guard'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateUserSessionInput, UpdateUserSessionInput, GetUserSessionArgs } from '../shared/dtos/user-session'
import { UserSessionService } from 'src/database/mongoose/services/user'
import { UserSessionEntity, UserEntity } from 'src/entities/user'

@UseGuards(JwtAuthGuard)
@Resolver(() => UserSessionEntity)
export class UserSessionResolver {
  constructor (
    private readonly userSessionService: UserSessionService) { }

  @Query(() => UserSessionEntity, { nullable: true })
  async userSession (@Args() data: GetUserSessionArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<UserSessionEntity> {
    return this.userSessionService.getOne(data)
  }

  @Query(() => [UserSessionEntity])
  async userSessions (@Args() data: GetUserSessionArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<UserSessionEntity[]> {
    return this.userSessionService.get(data)
  }

  @Query(() => [UserSessionEntity])
  async getUserSessionFind (@Args() data: GetUserSessionArgs): Promise<UserSessionEntity[]> {
    return this.userSessionService.find(data)
  }

  @Mutation(() => UserSessionEntity)
  async createUserSession (@Args('createUserSessionData') createUserSessionData: CreateUserSessionInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserSessionEntity> {
    return this.userSessionService.create({ ...createUserSessionData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => UserSessionEntity)
  async updateUserSession (@Args('updateUserSessionData') updateUserSessionData: UpdateUserSessionInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserSessionEntity> {
    const { id, ...data } = updateUserSessionData
    return this.userSessionService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => UserSessionEntity)
  async deleteUserSession (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserSessionEntity> {
    return this.userSessionService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
