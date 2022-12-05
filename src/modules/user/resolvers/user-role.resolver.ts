/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateUserRoleInput, UpdateUserRoleInput, GetUserRoleArgs } from '../shared/dtos/user-role'
import { UserRoleService } from 'src/database/mongoose/services/user'
import { UserRoleEntity, UserEntity } from 'src/entities/user'

@UseGuards(JwtAuthGuard)
@Resolver(() => UserRoleEntity)
export class UserRoleResolver {
  constructor (
    private readonly userRoleService: UserRoleService) { }

  @Query(() => UserRoleEntity, { nullable: true })
  async userRole (@Args() data: GetUserRoleArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<UserRoleEntity> {
    return this.userRoleService.getOne(data)
  }

  @Query(() => [UserRoleEntity])
  async userRoles (@Args() data: GetUserRoleArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<UserRoleEntity[]> {
    return this.userRoleService.get(data)
  }

  @Query(() => [UserRoleEntity])
  async getUserRoleFind (@Args() data: GetUserRoleArgs): Promise<UserRoleEntity[]> {
    return this.userRoleService.find(data)
  }

  @Mutation(() => UserRoleEntity)
  async createUserRole (@Args('createUserRoleData') createUserRoleData: CreateUserRoleInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserRoleEntity> {
    return this.userRoleService.create({ ...createUserRoleData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => UserRoleEntity)
  async updateUserRole (@Args('updateUserRoleData') updateUserRoleData: UpdateUserRoleInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserRoleEntity> {
    const { id, ...data } = updateUserRoleData
    return this.userRoleService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => UserRoleEntity)
  async deleteUserRole (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserRoleEntity> {
    return this.userRoleService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
