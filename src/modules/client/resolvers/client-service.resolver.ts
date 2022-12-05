/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateClientServiceInput, UpdateClientServiceInput, GetClientServiceArgs } from '../shared/dtos/client-service'
import { UserEntity } from 'src/entities/user'
import { ClientServiceEntity } from 'src/entities/client'
import { ClientServiceService } from 'src/database/mongoose/services/client'

@UseGuards(JwtAuthGuard)
@Resolver(() => ClientServiceEntity)
export class ClientServiceResolver {
  constructor (
    private readonly clientServiceService: ClientServiceService) { }

  @Query(() => ClientServiceEntity, { nullable: true })
  async clientService (@Args() data: GetClientServiceArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientServiceEntity> {
    return this.clientServiceService.getOne(data)
  }

  @Query(() => [ClientServiceEntity])
  async jobVacancies (@Args() data: GetClientServiceArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientServiceEntity[]> {
    return this.clientServiceService.get(data)
  }

  @Query(() => [ClientServiceEntity])
  async getClientServiceFind (@Args() data: GetClientServiceArgs): Promise<ClientServiceEntity[]> {
    return this.clientServiceService.find(data)
  }

  @Mutation(() => ClientServiceEntity)
  async createClientService (@Args('createClientServiceData') createClientServiceData: CreateClientServiceInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientServiceEntity> {
    return this.clientServiceService.create({ ...createClientServiceData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => ClientServiceEntity)
  async updateClientService (@Args('updateClientServiceData') updateClientServiceData: UpdateClientServiceInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientServiceEntity> {
    const { id, ...data } = updateClientServiceData
    return this.clientServiceService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => ClientServiceEntity)
  async deleteClientService (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientServiceEntity> {
    return this.clientServiceService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
