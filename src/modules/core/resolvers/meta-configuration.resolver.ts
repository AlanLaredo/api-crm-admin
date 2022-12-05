/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateMetaConfigurationInput, UpdateMetaConfigurationInput, GetMetaConfigurationArgs } from '../shared/dtos/meta-configuration'
import { UserEntity } from 'src/entities/user'
import { MetaConfigurationEntity } from 'src/entities/core'
import { MetaConfigurationService } from 'src/database/mongoose/services/core'

@UseGuards(JwtAuthGuard)
@Resolver(() => MetaConfigurationEntity)
export class MetaConfigurationResolver {
  constructor (
    private readonly metaConfigurationService: MetaConfigurationService) { }

  @Query(() => MetaConfigurationEntity, { nullable: true })
  async metaConfiguration (@Args() data: GetMetaConfigurationArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<MetaConfigurationEntity> {
    return this.metaConfigurationService.getOne(data)
  }

  @Query(() => [MetaConfigurationEntity])
  async jobVacancies (@Args() data: GetMetaConfigurationArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<MetaConfigurationEntity[]> {
    return this.metaConfigurationService.get(data)
  }

  @Query(() => [MetaConfigurationEntity])
  async getMetaConfigurationFind (@Args() data: GetMetaConfigurationArgs): Promise<MetaConfigurationEntity[]> {
    return this.metaConfigurationService.find(data)
  }

  @Mutation(() => MetaConfigurationEntity)
  async createMetaConfiguration (@Args('createMetaConfigurationData') createMetaConfigurationData: CreateMetaConfigurationInput,
  @Context(UserDataPipe) user: UserEntity): Promise<MetaConfigurationEntity> {
    return this.metaConfigurationService.create({ ...createMetaConfigurationData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => MetaConfigurationEntity)
  async updateMetaConfiguration (@Args('updateMetaConfigurationData') updateMetaConfigurationData: UpdateMetaConfigurationInput,
  @Context(UserDataPipe) user: UserEntity): Promise<MetaConfigurationEntity> {
    const { id, ...data } = updateMetaConfigurationData
    return this.metaConfigurationService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => MetaConfigurationEntity)
  async deleteMetaConfiguration (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<MetaConfigurationEntity> {
    return this.metaConfigurationService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
