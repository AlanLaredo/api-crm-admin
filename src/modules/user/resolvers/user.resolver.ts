/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation } from '@nestjs/graphql'
import { Types } from 'mongoose'
import { UseGuards } from '@nestjs/common'

// import { DeleteIDInput } from 'src/common/shared/dtos'
// import { UserDataPipe } from 'src/common/shared/pipes/user-data-pipe'
// import { JwtAuthGuard } from 'src/auth/shared/guards/jwt-auth.guard'

import { UserEntity } from 'src/entities/user'
import { UserService } from 'src/database/mongoose/services/user'
import { CreateUserInput, GetUserArgs } from '../shared/dtos/user'
import { JwtAuthGuard } from 'src/modules/auth/shared/guards'

@UseGuards(JwtAuthGuard)
@Resolver(of => UserEntity)
export class UserResolver {
  constructor (private readonly userService: UserService) { }

  @Query(returns => UserEntity, { nullable: true })
  async user (@Args() data: GetUserArgs): Promise<UserEntity> {
    return this.userService.getOne(data)
  }

  @Query(returns => [UserEntity], { defaultValue: [] })
  async users (@Args() data: GetUserArgs): Promise<UserEntity[]> {
    return this.userService.get(data)
  }

  // @Query(returns => [UserEntity], { defaultValue: [] })
  // async getUserFind (@Args() data: GetUserArgs): Promise<UserEntity[]> {
  //   return this.userService.find(data)
  // }

  @Mutation(type => UserEntity)
  async createUser (@Args('createUserData') createUserData: CreateUserInput): Promise<UserEntity> {
    const data = { ...createUserData, createdBy: new Types.ObjectId('6168770f43ca602d2e63cf02'), createdAt: new Date() }
    return this.userService.create(data)
  }

  // @Mutation(() => UserEntity)
  // async updateUser (@Args('updateUserData') updateUserData: UpdateUserInput,
  // @Context(UserDataPipe) user: IUser): Promise<UserEntity> {
  //   const { id, ...data } = updateUserData
  //   return this.userService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  // }

  // @Mutation(() => UserEntity)
  // async deleteUser (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  // @Context(UserDataPipe) user: IUser): Promise<UserEntity> {
  //   return this.userService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  // }
}
