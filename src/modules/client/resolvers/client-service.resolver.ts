/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateClientServiceInput, UpdateClientServiceInput, GetClientServiceArgs } from '../shared/dtos/client-service'
import { UserEntity } from 'src/entities/user'
import { ClientEntity, ClientServiceEntity } from 'src/entities/client'
import { ClientServiceService, ClientService } from 'src/database/mongoose/services/client'
import { EMailService } from 'src/modules/core/services'

@UseGuards(JwtAuthGuard)
@Resolver(() => ClientServiceEntity)
export class ClientServiceResolver {
  constructor (
    private readonly eMailService: EMailService,
    private readonly _clientService: ClientService,
    private readonly clientServiceService: ClientServiceService) { }

  @Query(() => ClientServiceEntity, { nullable: true })
  async clientService (@Args() data: GetClientServiceArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientServiceEntity> {
    return this.clientServiceService.getOne(data)
  }

  @Query(() => [ClientServiceEntity])
  async clientServices (@Args() data: GetClientServiceArgs,
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
    const result = await this.clientServiceService.create({ ...createClientServiceData, createdBy: user.id, createdAt: new Date() })
    const client: ClientEntity = await this._clientService.getById(result.clientId)
    const users: UserEntity[] = await this.eMailService.getUsersForPermissionTagNotification('admin.emailNotification.newClientService', client.companyId)
    if (result && users && users.length > 0) {
      const message: string = 'Se ha creado un nuevo servicio, ' + createClientServiceData.name
      const subject: string = 'Creación de nuevo servicio'
      await Promise.all(users.map(user => this.eMailService.send(user.email, subject, 'general.pug', { message, userName: user.firstName, subject })))
    }
    return result
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
