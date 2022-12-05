/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateClientInput, UpdateClientInput, GetClientArgs } from '../shared/dtos/client'
import { UserEntity } from 'src/entities/user'
import { ClientService } from 'src/database/mongoose/services/client'
import { ClientEntity, ClientServiceEntity } from 'src/entities/client'

@UseGuards(JwtAuthGuard)
@Resolver(() => ClientServiceEntity)
export class ClientResolver {
  constructor (
    private readonly clientService: ClientService) { }

  @Query(() => ClientEntity, { nullable: true })
  async client (@Args() data: GetClientArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientEntity> {
    return this.clientService.getOne(data)
  }

  @Query(() => [ClientEntity])
  async jobVacancies (@Args() data: GetClientArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientEntity[]> {
    return this.clientService.get(data)
  }

  @Query(() => [ClientEntity])
  async getClientFind (@Args() data: GetClientArgs): Promise<ClientEntity[]> {
    return this.clientService.find(data)
  }

  @Mutation(() => ClientEntity)
  async createClient (@Args('createClientData') createClientData: CreateClientInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientEntity> {
    return this.clientService.create({ ...createClientData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => ClientEntity)
  async updateClient (@Args('updateClientData') updateClientData: UpdateClientInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientEntity> {
    const { id, ...data } = updateClientData
    return this.clientService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => ClientEntity)
  async deleteClient (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientEntity> {
    return this.clientService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
