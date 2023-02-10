/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreatePrenominaPeriodEmployeeInput, UpdatePrenominaPeriodEmployeeInput, GetPrenominaPeriodEmployeeArgs } from '../shared/dtos/prenomina-period-employee'
import { UserEntity } from 'src/entities/user'
import { PrenominaPeriodEmployeeDayEntity, PrenominaPeriodEmployeeEntity } from 'src/entities/prenomina'
import { PrenominaPeriodEmployeeDayService, PrenominaPeriodEmployeeService } from 'src/database/mongoose/services/prenomina'
import { EmployeeEntity } from 'src/entities/employee'
import { Parent, ResolveField } from '@nestjs/graphql/dist/decorators'
import { EmployeeService } from 'src/database/mongoose/services/employee'

@UseGuards(JwtAuthGuard)
@Resolver(() => PrenominaPeriodEmployeeEntity)
export class PrenominaPeriodEmployeeResolver {
  constructor (
    private readonly prenominaPeriodEmployeeService: PrenominaPeriodEmployeeService,
    private readonly prenominaPeriodEmployeeDayService: PrenominaPeriodEmployeeDayService,
    private readonly employeeService: EmployeeService) { }

  @Query(() => PrenominaPeriodEmployeeEntity, { nullable: true })
  async prenominaPeriodEmployee (@Args() data: GetPrenominaPeriodEmployeeArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEmployeeEntity> {
    return this.prenominaPeriodEmployeeService.getOne(data)
  }

  @Query(() => [PrenominaPeriodEmployeeEntity])
  async prenominaPeriodEmployees (@Args() data: GetPrenominaPeriodEmployeeArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEmployeeEntity[]> {
    return this.prenominaPeriodEmployeeService.get(data)
  }

  @Query(() => [PrenominaPeriodEmployeeEntity])
  async getPrenominaPeriodEmployeeFind (@Args() data: GetPrenominaPeriodEmployeeArgs): Promise<PrenominaPeriodEmployeeEntity[]> {
    return this.prenominaPeriodEmployeeService.find(data)
  }

  @ResolveField(() => EmployeeEntity)
  async employee (@Parent() data: PrenominaPeriodEmployeeEntity) {
    return this.employeeService.getById(data.employeeId)
  }

  @ResolveField(() => [PrenominaPeriodEmployeeDayEntity], { nullable: true })
  async prenominaPeriodEmployeeDays (data: PrenominaPeriodEmployeeEntity) {
    return this.prenominaPeriodEmployeeDayService.get({ prenominaPeriodEmployeeId: data.id })
  }

  @Mutation(() => PrenominaPeriodEmployeeEntity)
  async createPrenominaPeriodEmployee (@Args('createPrenominaPeriodEmployeeData') createPrenominaPeriodEmployeeData: CreatePrenominaPeriodEmployeeInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEmployeeEntity> {
    return this.prenominaPeriodEmployeeService.create({ ...createPrenominaPeriodEmployeeData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => PrenominaPeriodEmployeeEntity)
  async updatePrenominaPeriodEmployee (@Args('updatePrenominaPeriodEmployeeData') updatePrenominaPeriodEmployeeData: UpdatePrenominaPeriodEmployeeInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEmployeeEntity> {
    const { id, ...data } = updatePrenominaPeriodEmployeeData
    return this.prenominaPeriodEmployeeService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => PrenominaPeriodEmployeeEntity)
  async deletePrenominaPeriodEmployee (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEmployeeEntity> {
    return this.prenominaPeriodEmployeeService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
