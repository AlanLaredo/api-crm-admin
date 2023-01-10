/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateOperationInput, UpdateOperationInput, GetOperationArgs } from '../shared/dtos/employee'
import { UserEntity } from 'src/entities/user'
import { OperationEntity } from 'src/entities/employee'
import { OperationService } from 'src/database/mongoose/services/employee'
import { EMailService } from 'src/modules/core/services'

@UseGuards(JwtAuthGuard)
@Resolver(() => OperationEntity)
export class OperationResolver {
  constructor (
    private readonly operationService: OperationService,
    private readonly eMailService: EMailService) { }

  @Query(() => OperationEntity, { nullable: true })
  async operation (@Args() data: GetOperationArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<OperationEntity> {
    return this.operationService.getOne(data)
  }

  @Query(() => [OperationEntity])
  async operations (@Args() data: GetOperationArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<OperationEntity[]> {
    return this.operationService.get(data)
  }

  @Query(() => [OperationEntity])
  async operationsInOperation (@Args() data: GetOperationArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<OperationEntity[]> {
    return this.operationService.get(data)
  }

  @Query(() => [OperationEntity])
  async operationFind (@Args() data: GetOperationArgs): Promise<OperationEntity[]> {
    return this.operationService.find(data)
  }

  @Mutation(() => OperationEntity)
  async createOperation (@Args('createOperationData') createOperationData: CreateOperationInput,
  @Context(UserDataPipe) user: UserEntity): Promise<OperationEntity> {
    return this.operationService.create({ ...createOperationData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => OperationEntity)
  async updateOperation (@Args('updateOperationData') updateOperationData: UpdateOperationInput,
  @Context(UserDataPipe) user: UserEntity): Promise<OperationEntity> {
    const { id, ...data } = updateOperationData
    return this.operationService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => OperationEntity)
  async deleteOperation (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<OperationEntity> {
    return this.operationService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
