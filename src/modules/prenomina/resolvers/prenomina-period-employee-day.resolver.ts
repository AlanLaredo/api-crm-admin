/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreatePrenominaPeriodEmployeeDayInput, UpdatePrenominaPeriodEmployeeDayInput, GetPrenominaPeriodEmployeeDayArgs } from '../shared/dtos/prenomina-period-employee-day'
import { UserEntity } from 'src/entities/user'
import { PrenominaPeriodEmployeeDayEntity } from 'src/entities/prenomina'
import { PrenominaPeriodEmployeeDayService } from 'src/database/mongoose/services/prenomina'

@UseGuards(JwtAuthGuard)
@Resolver(() => PrenominaPeriodEmployeeDayEntity)
export class PrenominaPeriodEmployeeDayResolver {
  constructor (
    private readonly prenominaPeriodEmployeeDayService: PrenominaPeriodEmployeeDayService) { }

  @Query(() => PrenominaPeriodEmployeeDayEntity, { nullable: true })
  async prenominaPeriodEmployeeDay (@Args() data: GetPrenominaPeriodEmployeeDayArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEmployeeDayEntity> {
    return this.prenominaPeriodEmployeeDayService.getOne(data)
  }

  @Query(() => [PrenominaPeriodEmployeeDayEntity])
  async prenominaPeriodEmployeeDays (@Args() data: GetPrenominaPeriodEmployeeDayArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEmployeeDayEntity[]> {
    return this.prenominaPeriodEmployeeDayService.get(data)
  }

  @Query(() => [PrenominaPeriodEmployeeDayEntity])
  async getPrenominaPeriodEmployeeDayFind (@Args() data: GetPrenominaPeriodEmployeeDayArgs): Promise<PrenominaPeriodEmployeeDayEntity[]> {
    return this.prenominaPeriodEmployeeDayService.find(data)
  }

  @Mutation(() => PrenominaPeriodEmployeeDayEntity)
  async createPrenominaPeriodEmployeeDay (@Args('createPrenominaPeriodEmployeeDayData') createPrenominaPeriodEmployeeDayData: CreatePrenominaPeriodEmployeeDayInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEmployeeDayEntity> {
    return this.prenominaPeriodEmployeeDayService.create({ ...createPrenominaPeriodEmployeeDayData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => PrenominaPeriodEmployeeDayEntity)
  async updatePrenominaPeriodEmployeeDay (@Args('updatePrenominaPeriodEmployeeDayData') updatePrenominaPeriodEmployeeDayData: UpdatePrenominaPeriodEmployeeDayInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEmployeeDayEntity> {
    const { id, ...data } = updatePrenominaPeriodEmployeeDayData
    return this.prenominaPeriodEmployeeDayService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => PrenominaPeriodEmployeeDayEntity)
  async deletePrenominaPeriodEmployeeDay (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEmployeeDayEntity> {
    return this.prenominaPeriodEmployeeDayService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
