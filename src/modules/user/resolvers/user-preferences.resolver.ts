/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateUserPreferencesInput, UpdateUserPreferencesInput, GetUserPreferencesArgs } from '../shared/dtos/user-preferences'
import { UserPreferencesService } from 'src/database/mongoose/services/user'
import { UserPreferencesEntity, UserEntity } from 'src/entities/user'

@UseGuards(JwtAuthGuard)
@Resolver(() => UserPreferencesEntity)
export class UserPreferencesResolver {
  constructor (
    private readonly userPreferencesService: UserPreferencesService) { }

  @Query(() => UserPreferencesEntity, { nullable: true })
  async userPreferences (@Args() data: GetUserPreferencesArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<UserPreferencesEntity> {
    return this.userPreferencesService.getOne(data)
  }

  @Query(() => [UserPreferencesEntity])
  async userPreferencesList (@Args() data: GetUserPreferencesArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<UserPreferencesEntity[]> {
    return this.userPreferencesService.get(data)
  }

  @Query(() => [UserPreferencesEntity])
  async getUserPreferencesFind (@Args() data: GetUserPreferencesArgs): Promise<UserPreferencesEntity[]> {
    return this.userPreferencesService.find(data)
  }

  @Mutation(() => UserPreferencesEntity)
  async createUserPreferences (@Args('createUserPreferencesData') createUserPreferencesData: CreateUserPreferencesInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserPreferencesEntity> {
    return this.userPreferencesService.create({ ...createUserPreferencesData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => UserPreferencesEntity)
  async updateUserPreferences (@Args('updateUserPreferencesData') updateUserPreferencesData: UpdateUserPreferencesInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserPreferencesEntity> {
    const { id, ...data } = updateUserPreferencesData
    return this.userPreferencesService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => UserPreferencesEntity)
  async deleteUserPreferences (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<UserPreferencesEntity> {
    return this.userPreferencesService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
