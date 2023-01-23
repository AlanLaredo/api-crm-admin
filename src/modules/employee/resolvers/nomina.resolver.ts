/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateNominaInput, UpdateNominaInput, GetNominaArgs } from '../shared/dtos/nomina'
import { UserEntity } from 'src/entities/user'
import { NominaEntity } from 'src/entities/employee'
import { NominaService } from 'src/database/mongoose/services/employee'

@UseGuards(JwtAuthGuard)
@Resolver(() => NominaEntity)
export class NominaResolver {
  constructor (
    private readonly nominaService: NominaService) { }

  @Query(() => NominaEntity, { nullable: true })
  async nomina (@Args() data: GetNominaArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<NominaEntity> {
    return this.nominaService.getOne(data)
  }

  @Query(() => [NominaEntity])
  async nominas (@Args() data: GetNominaArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<NominaEntity[]> {
    return this.nominaService.get(data)
  }

  @Query(() => [NominaEntity])
  async nominaFind (@Args() data: GetNominaArgs): Promise<NominaEntity[]> {
    return this.nominaService.find(data)
  }

  @Mutation(() => NominaEntity)
  async createNomina (@Args('createNominaData') createNominaData: CreateNominaInput,
  @Context(UserDataPipe) user: UserEntity): Promise<NominaEntity> {
    return this.nominaService.create({ ...createNominaData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => NominaEntity)
  async updateNomina (@Args('updateNominaData') updateNominaData: UpdateNominaInput,
  @Context(UserDataPipe) user: UserEntity): Promise<NominaEntity> {
    const { id, ...data } = updateNominaData
    return this.nominaService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => NominaEntity)
  async deleteNomina (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<NominaEntity> {
    return this.nominaService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
