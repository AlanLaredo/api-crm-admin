/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateRecruitInput, UpdateRecruitInput, GetRecruitArgs } from '../shared/dtos/recruit'
import { RecruitService } from 'src/database/mongoose/services/recruiment'
import { UserEntity } from 'src/entities/user'
import { RecruitEntity } from 'src/entities/recruiment'

@UseGuards(JwtAuthGuard)
@Resolver(() => RecruitEntity)
export class RecruitResolver {
  constructor (
    private readonly recruitService: RecruitService) { }

  @Query(() => RecruitEntity, { nullable: true })
  async recruit (@Args() data: GetRecruitArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<RecruitEntity> {
    return this.recruitService.getOne(data)
  }

  @Query(() => [RecruitEntity])
  async recruits (@Args() data: GetRecruitArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<RecruitEntity[]> {
    return this.recruitService.get(data)
  }

  @Query(() => [RecruitEntity])
  async getRecruitFind (@Args() data: GetRecruitArgs): Promise<RecruitEntity[]> {
    return this.recruitService.find(data)
  }

  @Mutation(() => RecruitEntity)
  async createRecruit (@Args('createRecruitData') createRecruitData: CreateRecruitInput,
  @Context(UserDataPipe) user: UserEntity): Promise<RecruitEntity> {
    return this.recruitService.create({ ...createRecruitData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => RecruitEntity)
  async updateRecruit (@Args('updateRecruitData') updateRecruitData: UpdateRecruitInput,
  @Context(UserDataPipe) user: UserEntity): Promise<RecruitEntity> {
    const { id, ...data } = updateRecruitData
    return this.recruitService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => RecruitEntity)
  async deleteRecruit (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<RecruitEntity> {
    return this.recruitService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
