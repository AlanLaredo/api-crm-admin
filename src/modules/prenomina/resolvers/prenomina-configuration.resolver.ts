/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context, ResolveField } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreatePrenominaConfigurationInput, UpdatePrenominaConfigurationInput, GetPrenominaConfigurationArgs } from '../shared/dtos/prenomina-configuration'
import { UserEntity } from 'src/entities/user'
import { PrenominaConfigurationEntity, PrenominaPeriodEntity } from 'src/entities/prenomina'
import { PrenominaConfigurationService, PrenominaPeriodService } from 'src/database/mongoose/services/prenomina'

@UseGuards(JwtAuthGuard)
@Resolver(() => PrenominaConfigurationEntity)
export class PrenominaConfigurationResolver {
  constructor (private readonly prenominaConfigurationService: PrenominaConfigurationService,
    private readonly prenominaPeriodService: PrenominaPeriodService) { }

  @Query(() => PrenominaConfigurationEntity, { nullable: true })
  async prenominaConfiguration (@Args() data: GetPrenominaConfigurationArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaConfigurationEntity> {
    return this.prenominaConfigurationService.getOne(data)
  }

  @Query(() => [PrenominaConfigurationEntity])
  async prenominaConfigurations (@Args() data: GetPrenominaConfigurationArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaConfigurationEntity[]> {
    return this.prenominaConfigurationService.get(data)
  }

  @Query(() => [PrenominaConfigurationEntity])
  async getPrenominaConfigurationFind (@Args() data: GetPrenominaConfigurationArgs): Promise<PrenominaConfigurationEntity[]> {
    return this.prenominaConfigurationService.find(data)
  }

  @ResolveField(() => [PrenominaPeriodEntity], { nullable: true })
  async prenominaPeriods (data: PrenominaConfigurationEntity) {
    return this.prenominaPeriodService.get({ prenominaConfigurationId: data.id })
  }

  @Mutation(() => PrenominaConfigurationEntity)
  async createPrenominaConfiguration (@Args('createPrenominaConfigurationData') createPrenominaConfigurationData: CreatePrenominaConfigurationInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaConfigurationEntity> {
    return this.prenominaConfigurationService.create({ ...createPrenominaConfigurationData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => PrenominaConfigurationEntity)
  async updatePrenominaConfiguration (@Args('updatePrenominaConfigurationData') updatePrenominaConfigurationData: UpdatePrenominaConfigurationInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaConfigurationEntity> {
    const { id, ...data } = updatePrenominaConfigurationData
    return this.prenominaConfigurationService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => PrenominaConfigurationEntity)
  async deletePrenominaConfiguration (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaConfigurationEntity> {
    return this.prenominaConfigurationService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
