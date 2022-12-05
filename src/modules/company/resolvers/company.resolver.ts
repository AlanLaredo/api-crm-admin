/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateCompanyInput, UpdateCompanyInput, GetCompanyArgs } from '../shared/dtos/company'
import { UserEntity } from 'src/entities/user'
import { CompanyEntity } from 'src/entities/company'
import { CompanyService } from 'src/database/mongoose/services/company'

@UseGuards(JwtAuthGuard)
@Resolver(() => CompanyEntity)
export class CompanyResolver {
  constructor (
    private readonly companyService: CompanyService) { }

  @Query(() => CompanyEntity, { nullable: true })
  async company (@Args() data: GetCompanyArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyEntity> {
    return this.companyService.getOne(data)
  }

  @Query(() => [CompanyEntity])
  async jobVacancies (@Args() data: GetCompanyArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyEntity[]> {
    return this.companyService.get(data)
  }

  @Query(() => [CompanyEntity])
  async getCompanyFind (@Args() data: GetCompanyArgs): Promise<CompanyEntity[]> {
    return this.companyService.find(data)
  }

  @Mutation(() => CompanyEntity)
  async createCompany (@Args('createCompanyData') createCompanyData: CreateCompanyInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyEntity> {
    return this.companyService.create({ ...createCompanyData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => CompanyEntity)
  async updateCompany (@Args('updateCompanyData') updateCompanyData: UpdateCompanyInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyEntity> {
    const { id, ...data } = updateCompanyData
    return this.companyService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => CompanyEntity)
  async deleteCompany (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyEntity> {
    return this.companyService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
