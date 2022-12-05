/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateCompanyUserInput, UpdateCompanyUserInput, GetCompanyUserArgs } from '../shared/dtos/company-user'
import { UserEntity } from 'src/entities/user'
import { CompanyUserEntity } from 'src/entities/company'
import { CompanyUserService } from 'src/database/mongoose/services/company'

@UseGuards(JwtAuthGuard)
@Resolver(() => CompanyUserEntity)
export class CompanyUserResolver {
  constructor (
    private readonly companyUserService: CompanyUserService) { }

  @Query(() => CompanyUserEntity, { nullable: true })
  async companyUser (@Args() data: GetCompanyUserArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyUserEntity> {
    return this.companyUserService.getOne(data)
  }

  @Query(() => [CompanyUserEntity])
  async jobVacancies (@Args() data: GetCompanyUserArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyUserEntity[]> {
    return this.companyUserService.get(data)
  }

  @Query(() => [CompanyUserEntity])
  async getCompanyUserFind (@Args() data: GetCompanyUserArgs): Promise<CompanyUserEntity[]> {
    return this.companyUserService.find(data)
  }

  @Mutation(() => CompanyUserEntity)
  async createCompanyUser (@Args('createCompanyUserData') createCompanyUserData: CreateCompanyUserInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyUserEntity> {
    return this.companyUserService.create({ ...createCompanyUserData, createdBy: user.id, createdAt: new Date() })
  }

  @Mutation(() => CompanyUserEntity)
  async updateCompanyUser (@Args('updateCompanyUserData') updateCompanyUserData: UpdateCompanyUserInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyUserEntity> {
    const { id, ...data } = updateCompanyUserData
    return this.companyUserService.update(id, { ...data, modifiedBy: user.id, modifiedAt: new Date() })
  }

  @Mutation(() => CompanyUserEntity)
  async deleteCompanyUser (@Args('deleteIdData') deleteIdData: DeleteIDInput,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyUserEntity> {
    return this.companyUserService.delete(deleteIdData.id, { deletedBy: user.id, deletedAt: new Date() })
  }
}
