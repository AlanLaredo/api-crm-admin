/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateProcessInput, UpdateProcessInput, GetProcessArgs } from '../shared/dtos/process'
import { UserEntity } from 'src/entities/user'
import { ProcessEntity } from 'src/entities/process'
import { ProcessService } from 'src/database/mongoose/services/process'

@UseGuards(JwtAuthGuard)
@Resolver(() => ProcessEntity)
export class ProcessResolver {
  constructor (
    private readonly processService: ProcessService) { }

  @Query(() => ProcessEntity, { nullable: true })
  async process (@Args() data: GetProcessArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessEntity> {
    return this.processService.getOne(data)
  }

  @Query(() => [ProcessEntity])
  async processs (@Args() data: GetProcessArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProcessEntity[]> {
    return this.processService.get(data)
  }

  @Query(() => [ProcessEntity])
  async getProcessFind (@Args() data: GetProcessArgs): Promise<ProcessEntity[]> {
    return this.processService.find(data)
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
