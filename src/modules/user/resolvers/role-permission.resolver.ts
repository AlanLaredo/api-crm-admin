/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateRolePermissionInput, UpdateRolePermissionInput, GetRolePermissionArgs } from '../shared/dtos/role-permission'
import { RolePermissionService } from 'src/database/mongoose/services/user'
import { RolePermissionEntity, UserEntity } from 'src/entities/user'

@UseGuards(JwtAuthGuard)
@Resolver(() => RolePermissionEntity)
export class RolePermissionResolver {
  constructor (
    private readonly rolePermissionService: RolePermissionService) { }

  @Query(() => RolePermissionEntity, { nullable: true })
  async rolePermission (@Args() data: GetRolePermissionArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<RolePermissionEntity> {
    return this.rolePermissionService.getOne(data)
  }

  @Query(() => [RolePermissionEntity])
  async rolePermissions (@Args() data: GetRolePermissionArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<RolePermissionEntity[]> {
    return this.rolePermissionService.get(data)
  }

  @Query(() => [RolePermissionEntity])
  async getRolePermissionFind (@Args() data: GetRolePermissionArgs): Promise<RolePermissionEntity[]> {
    return this.rolePermissionService.find(data)
  }

  @Mutation(() => RolePermissionEntity)
  async createRolePermission (@Args('createRolePermissionData') createRolePermissionData: CreateRolePermissionInput,
  @Context(UserDataPipe) user: UserEntity): Promise<RolePermissionEntity> {
    return this.rolePermissionService.create({ ...createRolePermissionData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => RolePermissionEntity)
  async updateRolePermission (@Args('updateRolePermissionData') updateRolePermissionData: UpdateRolePermissionInput,
  @Context(UserDataPipe) user: UserEntity): Promise<RolePermissionEntity> {
    const { id, ...data } = updateRolePermissionData
    return this.rolePermissionService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => RolePermissionEntity)
  async deleteRolePermission (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<RolePermissionEntity> {
    return this.rolePermissionService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
