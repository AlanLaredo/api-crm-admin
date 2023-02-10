/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context, ResolveField } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

// import { DeleteIDInput } from 'src/common/shared/dtos'
// import { UserDataPipe } from 'src/common/shared/pipes/user-data-pipe'
// import { JwtAuthGuard } from 'src/auth/shared/guards/jwt-auth.guard'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { UserEntity, UserRoleEntity } from 'src/entities/user'
import { UserRoleService, UserService } from 'src/database/mongoose/services/user'
import { AuthService } from 'src/modules/auth/services'
import { CreateUserInput, UpdateUserInput, GetUserArgs } from '../shared/dtos/user'
import { CompanyService, CompanyUserService } from 'src/database/mongoose/services/company'
import { CompanyEntity } from 'src/entities/company'

@UseGuards(JwtAuthGuard)
@Resolver(() => UserEntity)
export class UserResolver {
  constructor (
    private readonly userService: UserService,
    private readonly userRoleService: UserRoleService,
    private readonly companyService: CompanyService,
    private readonly companyUserService: CompanyUserService,
    private readonly authService: AuthService) { }

  @Query(() => UserEntity, { nullable: true })
  async user (@Args() data: GetUserArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<UserEntity> {
    return this.userService.getOne(data)
  }

  @Query(() => [UserEntity])
  async users (@Args() data: GetUserArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<UserEntity[]> {
    return this.userService.get(user.isAdmin ? data : { ...data, companyId: user.companyId })
  }

  @Query(() => [UserEntity])
  async getUserFind (@Args() data: GetUserArgs): Promise<UserEntity[]> {
    return this.userService.find(data)
  }

  @Mutation(() => UserEntity)
  async createUser (@Args('createUserData') createUserData: CreateUserInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserEntity> {
    createUserData.username = createUserData.username.trim().toLowerCase()
    if (createUserData.password) {
      createUserData.password = await this.authService.getHashPassword(createUserData.password)
    }
    return this.userService.create({ ...createUserData, createdBy: user.id, createdAt: new Date() })
  }

  @ResolveField(() => UserRoleEntity)
  async roleAccess (user: UserEntity) {
    return this.userRoleService.getById(user.roleAccessId)
  }

  @ResolveField(() => CompanyEntity, { nullable: true })
  async company (user: UserEntity) {
    return this.companyService.getById(user.companyId)
  }

  @Mutation(() => UserEntity)
  async updateUser (@Args('updateUserData') updateUserData: UpdateUserInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserEntity> {
    const { id, ...data } = updateUserData

    if (updateUserData.username) {
      updateUserData.username = updateUserData.username.trim().toLowerCase()
    }

    if (data.password) {
      data.password = await this.authService.getHashPassword(data.password)
    }
    return this.userService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => UserEntity)
  async deleteUser (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserEntity> {
    return this.userService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
