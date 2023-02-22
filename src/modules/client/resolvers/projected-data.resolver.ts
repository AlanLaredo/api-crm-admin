/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateProjectedDataInput, UpdateProjectedDataInput, GetProjectedDataArgs } from '../shared/dtos/projected-data'
import { UserEntity } from 'src/entities/user'
import { ProjectedDataEntity } from 'src/entities/client'
import { ProjectedDataService } from 'src/database/mongoose/services/client'
import { BlProjectedDataService } from '../services'

@UseGuards(JwtAuthGuard)
@Resolver(() => ProjectedDataEntity)
export class ProjectedDataResolver {
  constructor (private readonly blProjectedDataService: BlProjectedDataService,
    private readonly projectedDataService: ProjectedDataService) { }

  @Query(() => ProjectedDataEntity, { nullable: true })
  async projectedData (@Args() data: GetProjectedDataArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProjectedDataEntity> {
    return this.projectedDataService.getOne(data)
  }

  @Query(() => [ProjectedDataEntity])
  async projectedDatas (@Args() data: GetProjectedDataArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<ProjectedDataEntity[]> {
    // await this.blProjectedDataService.sync(data.projectedPeriodId)
    return this.projectedDataService.get(data)
  }

  @Query(() => [ProjectedDataEntity])
  async getProjectedDataFind (@Args() data: GetProjectedDataArgs): Promise<ProjectedDataEntity[]> {
    return this.projectedDataService.find(data)
  }

  @Mutation(() => ProjectedDataEntity)
  async createProjectedData (@Args('createProjectedDataData') createProjectedDataData: CreateProjectedDataInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProjectedDataEntity> {
    return this.projectedDataService.create({ ...createProjectedDataData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => ProjectedDataEntity)
  async updateProjectedData (@Args('updateProjectedDataData') updateProjectedDataData: UpdateProjectedDataInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProjectedDataEntity> {
    const { id, ...data } = updateProjectedDataData
    return this.projectedDataService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => ProjectedDataEntity)
  async deleteProjectedData (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<ProjectedDataEntity> {
    return this.projectedDataService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
