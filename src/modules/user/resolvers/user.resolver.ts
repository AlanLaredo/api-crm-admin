/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

// import { DeleteIDInput } from 'src/common/shared/dtos'
// import { UserDataPipe } from 'src/common/shared/pipes/user-data-pipe'
// import { JwtAuthGuard } from 'src/auth/shared/guards/jwt-auth.guard'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { UserEntity } from 'src/entities/user'
import { UserService } from 'src/database/mongoose/services/user'
import { AuthService } from 'src/modules/auth/services'
import { CreateUserInput, UpdateUserInput, GetUserArgs } from '../shared/dtos/user'

@UseGuards(JwtAuthGuard)
@Resolver(of => UserEntity)
export class UserResolver {
  constructor (
    private readonly userService: UserService,
    private readonly authService: AuthService) { }

  @Query(() => UserEntity, { nullable: true })
  async user (@Args() data: GetUserArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<UserEntity> {
    return this.userService.getOne(data)
  }

  @Query(() => [UserEntity])
  async users (@Args() data: GetUserArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<UserEntity[]> {
    return this.userService.get(data)
  }

  @Query(() => [UserEntity])
  async getUserFind (@Args() data: GetUserArgs): Promise<UserEntity[]> {
    return this.userService.find(data)
  }

  @Mutation(() => UserEntity)
  async createUser (@Args('createUserData') createUserData: CreateUserInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserEntity> {
    if (createUserData.password) {
      createUserData.password = await this.authService.getHashPassword(createUserData.password)
    }
    return this.userService.create({ ...createUserData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => UserEntity)
  async updateUser (@Args('updateUserData') updateUserData: UpdateUserInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserEntity> {
    const { id, ...data } = updateUserData
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
