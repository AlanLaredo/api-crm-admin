/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateCompanyGroupInput, UpdateCompanyGroupInput, GetCompanyGroupArgs } from '../shared/dtos/company-group'
import { UserEntity } from 'src/entities/user'
import { CompanyGroupEntity } from 'src/entities/company'
import { CompanyGroupService } from 'src/database/mongoose/services/company'

@UseGuards(JwtAuthGuard)
@Resolver(() => CompanyGroupEntity)
export class CompanyGroupResolver {
  constructor (
    private readonly companyGroupService: CompanyGroupService) { }

  @Query(() => CompanyGroupEntity, { nullable: true })
  async companyGroup (@Args() data: GetCompanyGroupArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyGroupEntity> {
    return this.companyGroupService.getOne(data)
  }

  @Query(() => [CompanyGroupEntity])
  async companyGroups (@Args() data: GetCompanyGroupArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyGroupEntity[]> {
    return this.companyGroupService.get(data)
  }

  @Query(() => [CompanyGroupEntity])
  async getCompanyGroupFind (@Args() data: GetCompanyGroupArgs): Promise<CompanyGroupEntity[]> {
    return this.companyGroupService.find(data)
  }

  @Mutation(() => CompanyGroupEntity)
  async createCompanyGroup (@Args('createCompanyGroupData') createCompanyGroupData: CreateCompanyGroupInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyGroupEntity> {
    return this.companyGroupService.create({ ...createCompanyGroupData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => CompanyGroupEntity)
  async updateCompanyGroup (@Args('updateCompanyGroupData') updateCompanyGroupData: UpdateCompanyGroupInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyGroupEntity> {
    const { id, ...data } = updateCompanyGroupData
    return this.companyGroupService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => CompanyGroupEntity)
  async deleteCompanyGroup (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyGroupEntity> {
    return this.companyGroupService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
