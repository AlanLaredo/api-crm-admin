/* eslint-disable no-useless-constructor */
import { Resolver, Query, Args, Mutation, Context, ResolveField } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'

import { JwtAuthGuard } from 'src/modules/auth/shared/guards'
import { UserDataPipe } from 'src/modules/common/shared/pipes'
import { DeleteIDInput } from 'src/modules/common/shared/dtos'

import { CreateCompanyInput, UpdateCompanyInput, GetCompanyArgs } from '../shared/dtos/company'
import { UserEntity } from 'src/entities/user'
import { CompanyEntity, CompanyGroupEntity, CompanyUserEntity } from 'src/entities/company'
import { CompanyGroupService, CompanyService, CompanyUserService } from 'src/database/mongoose/services/company'
import { UserSessionService } from 'src/database/mongoose/services/user'
import { ConfigService } from '@nestjs/config'
import { Types } from 'mongoose'

@UseGuards(JwtAuthGuard)
@Resolver(() => CompanyEntity)
export class CompanyResolver {
  constructor (
    private readonly companyService: CompanyService,
    private readonly companyGroupService: CompanyGroupService,
    private readonly companyUserService: CompanyUserService,
    private readonly configService: ConfigService,
    private readonly usersService: UserSessionService) { }

  @Query(() => CompanyEntity, { nullable: true })
  async company (@Args() data: GetCompanyArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyEntity> {
    return this.companyService.getOne(data)
  }

  @Query(() => [CompanyEntity])
  async companies (@Args() data: GetCompanyArgs,
  @Context(UserDataPipe) user: UserEntity): Promise<CompanyEntity[]> {
    return this.companyService.get(data)
  }

  @Query(() => [CompanyEntity])
  async getCompanyFind (@Args() data: GetCompanyArgs): Promise<CompanyEntity[]> {
    return this.companyService.find(data)
  }

  @ResolveField(() => CompanyGroupEntity)
  async companyGroup (data: CompanyEntity) {
    return this.companyGroupService.getById(data.companyGroupId)
  }

  @ResolveField(() => CompanyEntity)
  async companyParent (data: CompanyEntity) {
    return this.companyService.getById(data.companyId)
  }

  // @ResolveField(() => [UserEntity])
  // async users (data: CompanyEntity) {
  //   // const companies: CompanyEntity[] = await this.companyService.get()
  //   // const companiesDescendList = this.getChilds(String(data.id), companies)
  //   // // companiesDescendList.unshift(data)

  //   // const companiesDescendIds: Types.ObjectId[] = companiesDescendList.map(element => new Types.ObjectId(element.id))
  //   // console.log(companiesDescendList)
  //   // // console.log(companiesDescendIds)
  //   // const companyUserRelations: CompanyUserEntity[] = await this.companyUserService.getByIds(companiesDescendIds)
  //   // const companyUserRelationsIds = companyUserRelations.map(element => new Types.ObjectId(element.id))
  //   return this.usersService.get()
  // }

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

  getChilds (companyId: string, data: CompanyEntity[]) {
    let childs: CompanyEntity[] = data.filter((element: CompanyEntity) => String(element.companyId) === companyId)
    if (childs) {
      childs.forEach((element: CompanyEntity) => {
        childs = [...childs, ...this.getChilds(String(element.id), data)]
      })
    }
    return childs
  }
}
