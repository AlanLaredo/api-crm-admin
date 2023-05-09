/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context, ResolveField, Parent } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateCustomerInput, UpdateCustomerInput, GetCustomerArgs } from '../shared/dtos/customer'
import { UserEntity } from 'src/entities/user'
import { CustomerEntity, ProcessEntity, ProcessFunctionEntity } from 'src/entities/process'
import { CustomerService, ProcessFunctionService, ProcessService } from 'src/database/mongoose/services/process'
import { ClientEntity } from 'src/entities/client'
import { ClientService } from 'src/database/mongoose/services/client'
import { EMailService } from 'src/modules/core/services'

@UseGuards(JwtAuthGuard)
@Resolver(() => CustomerEntity)
export class CustomerResolver {
  constructor (
    private readonly customerService: CustomerService,
    private readonly processFunctionService: ProcessFunctionService,
    private readonly eMailService: EMailService,
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
    if (data.emails && data.emails.length > 0) {
      const message = await this.getMessageUpdateCustomerProcess(updateCustomerData)
      const emailPromises = data.emails.map(email => {
        return this.eMailService.send(email, 'Actualización de negocio en Lead', 'changeProcessOfCustomer.pug', { message })
      })
      await Promise.all(emailPromises)

    }

    return this.customerService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => CustomerEntity)
  async deleteCustomer (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CustomerEntity> {
    return this.customerService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }

  async getMessageUpdateCustomerProcess (data: UpdateCustomerInput): Promise<string> {
    let message: string
    const customer = await this.customerService.getById(data.id)
    const previousProcess = await this.processService.getById(customer.processId)
    if (customer.processId && data.processId) {
      const newProcess = await this.processService.getById(data.processId)
      if (newProcess.functionsIds) {
        const functions: ProcessFunctionEntity[] = await this.processFunctionService.getByIds(newProcess.functionsIds)
        const found = functions.find(element => element.key === 'send-email')
        if (found) {
          message = 'El negocio ' + customer.customerName + ' a pasado del Lead ' + previousProcess.name + ' a ' + newProcess.name + '. '
        }
      }
    }
    return message
  }
}
