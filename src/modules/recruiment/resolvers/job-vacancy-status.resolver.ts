/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateJobVacancyStatusInput, UpdateJobVacancyStatusInput, GetJobVacancyStatusArgs } from '../shared/dtos/job-vacancy-status'
import { JobVacancyStatusService } from 'src/database/mongoose/services/recruiment'
import { UserEntity } from 'src/entities/user'
import { JobVacancyStatusEntity } from 'src/entities/recruiment'

@UseGuards(JwtAuthGuard)
@Resolver(() => JobVacancyStatusEntity)
export class JobVacancyStatusResolver {
  constructor (
    private readonly jobVacancyStatusService: JobVacancyStatusService) { }

  @Query(() => JobVacancyStatusEntity, { nullable: true })
  async jobVacancyStatus (@Args() data: GetJobVacancyStatusArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<JobVacancyStatusEntity> {
    return this.jobVacancyStatusService.getOne(data)
  }

  @Query(() => [JobVacancyStatusEntity])
  async jobVacancyStatusList (@Args() data: GetJobVacancyStatusArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<JobVacancyStatusEntity[]> {
    return this.jobVacancyStatusService.get(data)
  }

  @Query(() => [JobVacancyStatusEntity])
  async getJobVacancyStatusFind (@Args() data: GetJobVacancyStatusArgs): Promise<JobVacancyStatusEntity[]> {
    return this.jobVacancyStatusService.find(data)
  }

  @Mutation(() => JobVacancyStatusEntity)
  async createJobVacancyStatus (@Args('createJobVacancyStatusData') createJobVacancyStatusData: CreateJobVacancyStatusInput,
  @Context(UserDataPipe) user: UserEntity): Promise<JobVacancyStatusEntity> {
    return this.jobVacancyStatusService.create({ ...createJobVacancyStatusData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => JobVacancyStatusEntity)
  async updateJobVacancyStatus (@Args('updateJobVacancyStatusData') updateJobVacancyStatusData: UpdateJobVacancyStatusInput,
  @Context(UserDataPipe) user: UserEntity): Promise<JobVacancyStatusEntity> {
    const { id, ...data } = updateJobVacancyStatusData
    return this.jobVacancyStatusService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => JobVacancyStatusEntity)
  async deleteJobVacancyStatus (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<JobVacancyStatusEntity> {
    return this.jobVacancyStatusService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
