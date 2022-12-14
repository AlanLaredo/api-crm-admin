/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context, ResolveField } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateEmployeeInput, UpdateEmployeeInput, GetEmployeeArgs } from '../shared/dtos/employee'
import { UserEntity } from 'src/entities/user'
import { EmployeeEntity } from 'src/entities/employee'
import { EmployeeService } from 'src/database/mongoose/services/employee'
import { CompanyEntity } from 'src/entities/company'
import { CompanyService } from 'src/database/mongoose/services/company'
import { ClientEntity } from 'src/entities/client'
import { ClientService } from 'src/database/mongoose/services/client'

@UseGuards(JwtAuthGuard)
@Resolver(() => EmployeeEntity)
export class EmployeeResolver {
  constructor (
    private readonly employeeService: EmployeeService,
    private readonly companyService: CompanyService,
    private readonly clientService: ClientService) { }

  @Query(() => EmployeeEntity, { nullable: true })
  async employee (@Args() data: GetEmployeeArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeEntity> {
    return this.employeeService.getOne(data)
  }

  @Query(() => [EmployeeEntity])
  async employees (@Args() data: GetEmployeeArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeEntity[]> {
    return this.employeeService.get(user.isAdmin ? data : { ...data, companyId: user.companyId })
  }

  @Query(() => [EmployeeEntity])
  async employeeFind (@Args() data: GetEmployeeArgs): Promise<EmployeeEntity[]> {
    return this.employeeService.find(data)
  }

  @ResolveField(() => CompanyEntity, { nullable: true })
  async company (data: EmployeeEntity) {
    return this.companyService.getById(data.companyId)
  }

  @ResolveField(() => ClientEntity, { nullable: true })
  async client (data: EmployeeEntity) {
    return this.clientService.getById(data.clientId)
  }

  @Mutation(() => EmployeeEntity)
  async createEmployee (@Args('createEmployeeData') createEmployeeData: CreateEmployeeInput,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeEntity> {
    return this.employeeService.create({ ...createEmployeeData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => EmployeeEntity)
  async updateEmployee (@Args('updateEmployeeData') updateEmployeeData: UpdateEmployeeInput,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeEntity> {
    const { id, ...data } = updateEmployeeData
    return this.employeeService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => EmployeeEntity)
  async deleteEmployee (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<EmployeeEntity> {
    return this.employeeService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
