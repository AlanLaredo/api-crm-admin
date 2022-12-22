/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context, ResolveField, Parent } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateProcessInput, UpdateProcessInput, GetProcessArgs } from '../shared/dtos/process'
import { UserEntity } from 'src/entities/user'
import { CustomerEntity, ProcessEntity, ProcessFunctionEntity } from 'src/entities/process'
import { CustomerService, ProcessFunctionService, ProcessService } from 'src/database/mongoose/services/process'
import { CompanyEntity } from 'src/entities/company'
import { CompanyService } from 'src/database/mongoose/services/company'

@UseGuards(JwtAuthGuard)
@Resolver(() => ProcessEntity)
export class ProcessResolver {
  constructor (
    private readonly processService: ProcessService,
    private readonly customerService: CustomerService,
    private readonly processFunctionService: ProcessFunctionService,
    private readonly companyService: CompanyService) { }

  @Query(() => ProcessEntity, { nullable: true })
  async process (@Args() data: GetProcessArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessEntity> {
    return this.processService.getOne(data)
  }

  @Query(() => [ProcessEntity])
  async processList (@Args() data: GetProcessArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessEntity[]> {
    return this.processService.get(data)
  }

  @Query(() => [ProcessEntity])
  async getProcessFind (@Args() data: GetProcessArgs): Promise<ProcessEntity[]> {
    return this.processService.find(data)
  }

  @ResolveField(() => CompanyEntity)
  async company (data: ProcessEntity): Promise<CompanyEntity> {
    return this.companyService.getById(data.companyId)
  }

  @ResolveField(() => [ProcessFunctionEntity])
  async functions (data: ProcessEntity): Promise<ProcessFunctionEntity[]> {
    return this.processFunctionService.getByIds(data.functionsIds)
  }

  @ResolveField(() => [CustomerEntity])
  async customers (@Parent() data: ProcessEntity, @Context(UserDataPipe) user: UserEntity): Promise<CustomerEntity[]> {
    return this.customerService.get({ processId: data.id, createdBy: user.id })
  }

  @Mutation(() => ProcessEntity)
  async createProcess (@Args('createProcessData') createProcessData: CreateProcessInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessEntity> {
    return this.processService.create({ ...createProcessData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => ProcessEntity)
  async updateProcess (@Args('updateProcessData') updateProcessData: UpdateProcessInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessEntity> {
    const { id, ...data } = updateProcessData
    return this.processService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => ProcessEntity)
  async deleteProcess (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessEntity> {
    return this.processService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
