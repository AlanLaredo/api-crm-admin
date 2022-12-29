/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context, ResolveField, Parent } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateClientInput, UpdateClientInput, GetClientArgs } from '../shared/dtos/client'
import { UserEntity } from 'src/entities/user'
import { ClientService } from 'src/database/mongoose/services/client'
import { ClientEntity } from 'src/entities/client'
import { CompanyEntity } from 'src/entities/company'
import { CompanyService } from 'src/database/mongoose/services/company'
import { CustomerEntity } from 'src/entities/process'
import { CustomerService } from 'src/database/mongoose/services/process'

@UseGuards(JwtAuthGuard)
@Resolver(() => ClientEntity)
export class ClientResolver {
  constructor (
    private readonly clientService: ClientService,
    private readonly customerService: CustomerService,
    private readonly companyService: CompanyService) { }

  @Query(() => ClientEntity, { nullable: true })
  async client (@Args() data: GetClientArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientEntity> {
    return this.clientService.getOne(data)
  }

  @Query(() => [ClientEntity])
  async clients (@Args() data: GetClientArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientEntity[]> {
    return this.clientService.get(user.isAdmin ? data : { ...data, companyId: user.companyId })
  }

  @Query(() => [ClientEntity])
  async getClientFind (@Args() data: GetClientArgs): Promise<ClientEntity[]> {
    return this.clientService.find(data)
  }

  @ResolveField(() => CompanyEntity)
  async company (@Parent() data: ClientEntity) {
    return this.companyService.getById(data.companyId)
  }

  @ResolveField(() => CustomerEntity)
  async customer (@Parent() data: ClientEntity) {
    return this.customerService.getOne({ clientId: data.id })
  }

  @Mutation(() => ClientEntity)
  async createClient (@Args('createClientData') createClientData: CreateClientInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ClientEntity> {
    console.log(createClientData)

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
