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
import { ClientEntity } from 'src/entities/client'
import { ClientService } from 'src/database/mongoose/services/client'

@UseGuards(JwtAuthGuard)
@Resolver(() => PrenominaConfigurationEntity)
export class PrenominaConfigurationResolver {
  constructor (private readonly prenominaConfigurationService: PrenominaConfigurationService,
    private readonly prenominaPeriodService: PrenominaPeriodService,
    private readonly clientService: ClientService) { }

  @Query(() => PrenominaConfigurationEntity, { nullable: true })
  async prenominaConfiguration (@Args() data: GetPrenominaConfigurationArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaConfigurationEntity> {
    return this.prenominaConfigurationService.getOne(data)
  }

  @Query(() => [PrenominaConfigurationEntity])
  async prenominaConfigurations (@Args() data: GetPrenominaConfigurationArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaConfigurationEntity[]> {
    return this.prenominaConfigurationService.get({ ...data, companyId: user.companyId })
  }

  @Query(() => [PrenominaConfigurationEntity])
  async getPrenominaConfigurationFind (@Args() data: GetPrenominaConfigurationArgs): Promise<PrenominaConfigurationEntity[]> {
    return this.prenominaConfigurationService.find(data)
  }

  @ResolveField(() => [PrenominaPeriodEntity], { nullable: true })
  async prenominaPeriods (data: PrenominaConfigurationEntity) {
    return this.prenominaPeriodService.get({ prenominaConfigurationId: data.id })
  }

  @ResolveField(() => [ClientEntity], { nullable: true })
  async clients (data: PrenominaConfigurationEntity) {
    return this.clientService.getByIds(data.clientsIds)
  }

  @Mutation(() => PrenominaConfigurationEntity)
  async createPrenominaConfiguration (@Args('createPrenominaConfigurationData') createPrenominaConfigurationData: CreatePrenominaConfigurationInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaConfigurationEntity> {
    return this.prenominaConfigurationService.create({ ...createPrenominaConfigurationData, companyId: user.companyId, createdBy: user.id, createdAt: new Date() })
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
