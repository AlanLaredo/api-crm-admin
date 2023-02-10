/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreatePrenominaPeriodInput, UpdatePrenominaPeriodInput, GetPrenominaPeriodArgs } from '../shared/dtos/prenomina-period'
import { UserEntity } from 'src/entities/user'
import { PrenominaPeriodEmployeeEntity, PrenominaPeriodEntity } from 'src/entities/prenomina'
import { PrenominaPeriodEmployeeService, PrenominaPeriodService } from 'src/database/mongoose/services/prenomina'
import { ResolveField } from '@nestjs/graphql/dist/decorators'

@UseGuards(JwtAuthGuard)
@Resolver(() => PrenominaPeriodEntity)
export class PrenominaPeriodResolver {
  constructor (
    private readonly prenominaPeriodService: PrenominaPeriodService,
    private readonly prenominaPeriodEmployeeService: PrenominaPeriodEmployeeService) { }

  @Query(() => PrenominaPeriodEntity, { nullable: true })
  async prenominaPeriod (@Args() data: GetPrenominaPeriodArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEntity> {
    return this.prenominaPeriodService.getOne(data)
  }

  @Query(() => [PrenominaPeriodEntity])
  async prenominaPeriods (@Args() data: GetPrenominaPeriodArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEntity[]> {
    return this.prenominaPeriodService.get(data)
  }

  @Query(() => [PrenominaPeriodEntity])
  async getPrenominaPeriodFind (@Args() data: GetPrenominaPeriodArgs): Promise<PrenominaPeriodEntity[]> {
    return this.prenominaPeriodService.find(data)
  }

  @ResolveField(() => [PrenominaPeriodEmployeeEntity], { nullable: true })
  async prenominaPeriodEmployees (data: PrenominaPeriodEntity) {
    return this.prenominaPeriodEmployeeService.get({ prenominaPeriodId: data.id })
  }

  @Mutation(() => PrenominaPeriodEntity)
  async createPrenominaPeriod (@Args('createPrenominaPeriodData') createPrenominaPeriodData: CreatePrenominaPeriodInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEntity> {
    return this.prenominaPeriodService.create({ ...createPrenominaPeriodData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => PrenominaPeriodEntity)
  async updatePrenominaPeriod (@Args('updatePrenominaPeriodData') updatePrenominaPeriodData: UpdatePrenominaPeriodInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEntity> {
    const { id, ...data } = updatePrenominaPeriodData
    return this.prenominaPeriodService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => PrenominaPeriodEntity)
  async deletePrenominaPeriod (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaPeriodEntity> {
    return this.prenominaPeriodService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
