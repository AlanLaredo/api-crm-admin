/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context, ResolveField } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateOperationInput, UpdateOperationInput, GetOperationArgs } from '../shared/dtos/employee'
import { UserEntity } from 'src/entities/user'
import { EmployeeEntity, OperationEntity } from 'src/entities/employee'
import { EmployeeService, OperationService } from 'src/database/mongoose/services/employee'
import { EMailService } from 'src/modules/core/services'

@UseGuards(JwtAuthGuard)
@Resolver(() => OperationEntity)
export class OperationResolver {
  constructor (
    private readonly operationService: OperationService,
    private readonly employeeService: EmployeeService,
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

  @Query(() => Boolean)
  async operationSendEmail (@Args('message') message: string,
  @Context(UserDataPipe) user: UserEntity): Promise<boolean> {
    const subject: string = 'CRM Admin - Nueva Incidencia'
    // TODO: Actualizar este email para las incidencias
    this.eMailService.send('santiagoalan1@gmail.com', subject, 'general.pug', { message, userName: 'Administrador', subject })
    return true
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

  @ResolveField(() => EmployeeEntity, { nullable: true })
  async employee (data: OperationEntity) {
    return this.employeeService.getById(data.employeeId)
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
