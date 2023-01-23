/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreatePrenominaInput, UpdatePrenominaInput, GetPrenominaArgs } from '../shared/dtos/prenomina'
import { UserEntity } from 'src/entities/user'
import { PrenominaEntity } from 'src/entities/employee'
import { PrenominaService } from 'src/database/mongoose/services/employee'

@UseGuards(JwtAuthGuard)
@Resolver(() => PrenominaEntity)
export class PrenominaResolver {
  constructor (
    private readonly prenominaService: PrenominaService) { }

  @Query(() => PrenominaEntity, { nullable: true })
  async prenomina (@Args() data: GetPrenominaArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaEntity> {
    return this.prenominaService.getOne(data)
  }

  @Query(() => [PrenominaEntity])
  async prenominas (@Args() data: GetPrenominaArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaEntity[]> {
    return this.prenominaService.get(data)
  }

  @Query(() => [PrenominaEntity])
  async prenominaFind (@Args() data: GetPrenominaArgs): Promise<PrenominaEntity[]> {
    return this.prenominaService.find(data)
  }

  @Mutation(() => PrenominaEntity)
  async createPrenomina (@Args('createPrenominaData') createPrenominaData: CreatePrenominaInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaEntity> {
    return this.prenominaService.create({ ...createPrenominaData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => PrenominaEntity)
  async updatePrenomina (@Args('updatePrenominaData') updatePrenominaData: UpdatePrenominaInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaEntity> {
    const { id, ...data } = updatePrenominaData
    return this.prenominaService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => PrenominaEntity)
  async deletePrenomina (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<PrenominaEntity> {
    return this.prenominaService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
