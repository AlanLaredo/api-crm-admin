/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context, ResolveField, Parent } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateCustomerInput, UpdateCustomerInput, GetCustomerArgs } from '../shared/dtos/customer'
import { UserEntity } from 'src/entities/user'
import { CustomerEntity, ProcessEntity } from 'src/entities/process'
import { CustomerService, ProcessService } from 'src/database/mongoose/services/process'
import { ClientEntity } from 'src/entities/client'
import { ClientService } from 'src/database/mongoose/services/client'

@UseGuards(JwtAuthGuard)
@Resolver(() => CustomerEntity)
export class CustomerResolver {
  constructor (
    private readonly customerService: CustomerService,
    private readonly clientService: ClientService,
    private readonly processService: ProcessService) { }

  @Query(() => CustomerEntity, { nullable: true })
  async customer (@Args() data: GetCustomerArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<CustomerEntity> {
    return this.customerService.getOne(data)
  }

  @Query(() => [CustomerEntity])
  async customers (@Args() data: GetCustomerArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<CustomerEntity[]> {
    return this.customerService.get(data)
  }

  @Query(() => [CustomerEntity])
  async getCustomerFind (@Args() data: GetCustomerArgs): Promise<CustomerEntity[]> {
    return this.customerService.find(data)
  }

  @ResolveField(() => ClientEntity)
  async client (data: CustomerEntity) {
    return this.clientService.getById(data.clientId)
  }

  @ResolveField(() => ProcessEntity)
  async process (@Parent() data: CustomerEntity) {
    return this.processService.getById(data.processId)
  }

  @Mutation(() => CustomerEntity)
  async createCustomer (@Args('createCustomerData') createCustomerData: CreateCustomerInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CustomerEntity> {
    return this.customerService.create({ ...createCustomerData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => CustomerEntity)
  async updateCustomer (@Args('updateCustomerData') updateCustomerData: UpdateCustomerInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CustomerEntity> {
    const { id, ...data } = updateCustomerData
    return this.customerService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => CustomerEntity)
  async deleteCustomer (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CustomerEntity> {
    return this.customerService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
