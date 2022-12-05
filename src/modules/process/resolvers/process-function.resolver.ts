/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateProcessFunctionInput, UpdateProcessFunctionInput, GetProcessFunctionArgs } from '../shared/dtos/process-function'
import { UserEntity } from 'src/entities/user'
import { ProcessFunctionEntity } from 'src/entities/process'
import { ProcessFunctionService } from 'src/database/mongoose/services/process'

@UseGuards(JwtAuthGuard)
@Resolver(() => ProcessFunctionEntity)
export class ProcessFunctionResolver {
  constructor (
    private readonly processFunctionService: ProcessFunctionService) { }

  @Query(() => ProcessFunctionEntity, { nullable: true })
  async processFunction (@Args() data: GetProcessFunctionArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessFunctionEntity> {
    return this.processFunctionService.getOne(data)
  }

  @Query(() => [ProcessFunctionEntity])
  async processFunctions (@Args() data: GetProcessFunctionArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessFunctionEntity[]> {
    return this.processFunctionService.get(data)
  }

  @Query(() => [ProcessFunctionEntity])
  async getProcessFunctionFind (@Args() data: GetProcessFunctionArgs): Promise<ProcessFunctionEntity[]> {
    return this.processFunctionService.find(data)
  }

  @Mutation(() => ProcessFunctionEntity)
  async createProcessFunction (@Args('createProcessFunctionData') createProcessFunctionData: CreateProcessFunctionInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessFunctionEntity> {
    return this.processFunctionService.create({ ...createProcessFunctionData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => ProcessFunctionEntity)
  async updateProcessFunction (@Args('updateProcessFunctionData') updateProcessFunctionData: UpdateProcessFunctionInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessFunctionEntity> {
    const { id, ...data } = updateProcessFunctionData
    return this.processFunctionService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => ProcessFunctionEntity)
  async deleteProcessFunction (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessFunctionEntity> {
    return this.processFunctionService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
