/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateEmployeeReassignmentInput, UpdateEmployeeReassignmentInput, GetEmployeeReassignmentArgs } from '../shared/dtos/employee-reassignment'
import { UserEntity } from 'src/entities/user'
import { EmployeeReassignmentEntity } from 'src/entities/employee'
import { EmployeeReassignmentService } from 'src/database/mongoose/services/employee'

@UseGuards(JwtAuthGuard)
@Resolver(() => EmployeeReassignmentEntity)
export class EmployeeReassignmentResolver {
  constructor (
    private readonly employeeReassignmentService: EmployeeReassignmentService) { }

  @Query(() => EmployeeReassignmentEntity, { nullable: true })
  async employeeReassignment (@Args() data: GetEmployeeReassignmentArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeReassignmentEntity> {
    return this.employeeReassignmentService.getOne(data)
  }

  @Query(() => [EmployeeReassignmentEntity])
  async employeeReassignments (@Args() data: GetEmployeeReassignmentArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeReassignmentEntity[]> {
    return this.employeeReassignmentService.get(data)
  }

  @Query(() => [EmployeeReassignmentEntity])
  async getEmployeeReassignmentFind (@Args() data: GetEmployeeReassignmentArgs): Promise<EmployeeReassignmentEntity[]> {
    return this.employeeReassignmentService.find(data)
  }

  @Mutation(() => EmployeeReassignmentEntity)
  async createEmployeeReassignment (@Args('createEmployeeReassignmentData') createEmployeeReassignmentData: CreateEmployeeReassignmentInput,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeReassignmentEntity> {
    return this.employeeReassignmentService.create({ ...createEmployeeReassignmentData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => EmployeeReassignmentEntity)
  async updateEmployeeReassignment (@Args('updateEmployeeReassignmentData') updateEmployeeReassignmentData: UpdateEmployeeReassignmentInput,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeReassignmentEntity> {
    const { id, ...data } = updateEmployeeReassignmentData
    return this.employeeReassignmentService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => EmployeeReassignmentEntity)
  async deleteEmployeeReassignment (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeReassignmentEntity> {
    return this.employeeReassignmentService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
