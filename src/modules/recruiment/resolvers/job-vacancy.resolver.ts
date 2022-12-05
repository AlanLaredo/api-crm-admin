/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateJobVacancyInput, UpdateJobVacancyInput, GetJobVacancyArgs } from '../shared/dtos/job-vacancy'
import { UserEntity } from 'src/entities/user'
import { JobVacancyEntity } from 'src/entities/recruiment'
import { JobVacancyService } from 'src/database/mongoose/services/recruiment'

@UseGuards(JwtAuthGuard)
@Resolver(() => JobVacancyEntity)
export class JobVacancyResolver {
  constructor (
    private readonly jobVacancyService: JobVacancyService) { }

  @Query(() => JobVacancyEntity, { nullable: true })
  async jobVacancy (@Args() data: GetJobVacancyArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<JobVacancyEntity> {
    return this.jobVacancyService.getOne(data)
  }

  @Query(() => [JobVacancyEntity])
  async jobVacancies (@Args() data: GetJobVacancyArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<JobVacancyEntity[]> {
    return this.jobVacancyService.get(data)
  }

  @Query(() => [JobVacancyEntity])
  async getJobVacancyFind (@Args() data: GetJobVacancyArgs): Promise<JobVacancyEntity[]> {
    return this.jobVacancyService.find(data)
  }

  @Mutation(() => JobVacancyEntity)
  async createJobVacancy (@Args('createJobVacancyData') createJobVacancyData: CreateJobVacancyInput,
  @Context(UserDataPipe) user: UserEntity): Promise<JobVacancyEntity> {
    return this.jobVacancyService.create({ ...createJobVacancyData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => JobVacancyEntity)
  async updateJobVacancy (@Args('updateJobVacancyData') updateJobVacancyData: UpdateJobVacancyInput,
  @Context(UserDataPipe) user: UserEntity): Promise<JobVacancyEntity> {
    const { id, ...data } = updateJobVacancyData
    return this.jobVacancyService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => JobVacancyEntity)
  async deleteJobVacancy (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<JobVacancyEntity> {
    return this.jobVacancyService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
