/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateApplicantStatusInput, UpdateApplicantStatusInput, GetApplicantStatusArgs } from '../shared/dtos/applicant-status'
import { UserEntity } from 'src/entities/user'
import { ApplicantStatusEntity } from 'src/entities/recruiment'
import { ApplicantStatusService } from 'src/database/mongoose/services/recruiment'

@UseGuards(JwtAuthGuard)
@Resolver(() => ApplicantStatusEntity)
export class ApplicantStatusResolver {
  constructor (
    private readonly applicantStatusService: ApplicantStatusService) { }

  @Query(() => ApplicantStatusEntity, { nullable: true })
  async applicantStatus (@Args() data: GetApplicantStatusArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ApplicantStatusEntity> {
    return this.applicantStatusService.getOne(data)
  }

  @Query(() => [ApplicantStatusEntity])
  async applicantStatusList (@Args() data: GetApplicantStatusArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ApplicantStatusEntity[]> {
    return this.applicantStatusService.get(data)
  }

  @Query(() => [ApplicantStatusEntity])
  async getApplicantStatusFind (@Args() data: GetApplicantStatusArgs): Promise<ApplicantStatusEntity[]> {
    return this.applicantStatusService.find(data)
  }

  @Mutation(() => ApplicantStatusEntity)
  async createApplicantStatus (@Args('createApplicantStatusData') createApplicantStatusData: CreateApplicantStatusInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ApplicantStatusEntity> {
    return this.applicantStatusService.create({ ...createApplicantStatusData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => ApplicantStatusEntity)
  async updateApplicantStatus (@Args('updateApplicantStatusData') updateApplicantStatusData: UpdateApplicantStatusInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ApplicantStatusEntity> {
    const { id, ...data } = updateApplicantStatusData
    return this.applicantStatusService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => ApplicantStatusEntity)
  async deleteApplicantStatus (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ApplicantStatusEntity> {
    return this.applicantStatusService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
