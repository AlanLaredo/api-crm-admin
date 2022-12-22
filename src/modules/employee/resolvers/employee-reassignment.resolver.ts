/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context, ResolveField, Parent } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateEmployeeReassignmentInput, UpdateEmployeeReassignmentInput, GetEmployeeReassignmentArgs } from '../shared/dtos/employee-reassignment'
import { UserEntity } from 'src/entities/user'
import { EmployeeEntity, EmployeeReassignmentEntity } from 'src/entities/employee'
import { EmployeeReassignmentService, EmployeeService } from 'src/database/mongoose/services/employee'
import { CompanyService } from 'src/database/mongoose/services/company'
import { ClientService } from 'src/database/mongoose/services/client'
import { CompanyEntity } from 'src/entities/company'
import { ClientEntity } from 'src/entities/client'

@UseGuards(JwtAuthGuard)
@Resolver(() => EmployeeReassignmentEntity)
export class EmployeeReassignmentResolver {
  constructor (
    private readonly employeeReassignmentService: EmployeeReassignmentService,
    private readonly companyService: CompanyService,
    private readonly employeeService: EmployeeService,
    private readonly clientService: ClientService) { }

  @Query(() => EmployeeReassignmentEntity, { nullable: true })
  async employeeReassignment (@Args() data: GetEmployeeReassignmentArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeReassignmentEntity> {
    return this.employeeReassignmentService.getOne(data)
  }

  @Query(() => [EmployeeReassignmentEntity])
  async employeeReassignments (@Args() data: GetEmployeeReassignmentArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeReassignmentEntity[]> {
    return this.employeeReassignmentService.get(user.isAdmin ? data : { ...data, companyId: user.companyId })
  }

  @Query(() => [EmployeeReassignmentEntity])
  async getEmployeeReassignmentFind (@Args() data: GetEmployeeReassignmentArgs): Promise<EmployeeReassignmentEntity[]> {
    return this.employeeReassignmentService.find(data)
  }

  @ResolveField(() => CompanyEntity)
  async company (@Parent() data: EmployeeReassignmentEntity) {
    return this.companyService.getById(data.companyId)
  }

  @ResolveField(() => ClientEntity)
  async transmitterClient (@Parent() data: EmployeeReassignmentEntity) {
    return this.clientService.getById(data.transmitterClientId)
  }

  @ResolveField(() => ClientEntity)
  async receiverClient (@Parent() data: EmployeeReassignmentEntity) {
    return this.clientService.getById(data.receiverClientId)
  }

  @ResolveField(() => EmployeeEntity)
  async employee (@Parent() data: EmployeeReassignmentEntity) {
    return this.employeeService.getById(data.employeId)
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
